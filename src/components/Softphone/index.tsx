import React from 'react'

import { Badge, Button, Flex, Popover } from 'antd'

import { useReactive } from 'ahooks'

import { useTranslation } from 'react-i18next'

import {
  CallEvent,
  CallManagerEvent,
  RejectMode,
  type Call,
} from '@voximplant/websdk/modules/call-manager'
import { StreamType } from '@voximplant/websdk/modules/stream'

import { TelephonySoftphoneGroup } from '@api/models/telephonySoftphone/queryGroup'
import { useAPIQuery } from '@api/useAPIQuery'

import { ActionButton } from '@components/ActionButton'
import { CustomAvatar, type Employee } from '@components/CustomAvatar'
import { SoftphoneCallTimer } from './SoftphoneCallTimer'
import { SoftphoneSettings } from './SoftphoneSettings'

import { getIcon } from '@utils/getIcon'
import {
  PHONE_PREFIX_META,
  PHONE_PREFIXES,
  composeE164,
  digitsOnly,
  formatE164Display,
  isValidE164,
} from '@utils/phoneE164'
import { pickRingtoneUrl } from '@utils/telephonyAudio'
import {
  getCallManager,
  getDeviceTracker,
  getVoximplantCore,
  resolveConnectionNode,
} from '@utils/voximplantSdk'

import type { Prefix } from '@redux/PhonePrefix/types'

import styles from './index.module.scss'

type SoftphoneView = 'dial' | 'incoming' | 'active' | 'ended'

type SoftphoneState = {
  open: boolean
  loggedIn: boolean
  connecting: boolean
  authStatusKey: string
  authStatusDetail: string
  voxUser: string
  voxPassword: string
  fromOperatorProfile: boolean
  dialPrefix: Prefix
  dialDigits: string
  prefixOpen: boolean
  activeCall: Call | null
  pendingIncomingCall: Call | null
  incomingLabel: string
  peerLabel: string
  incomingVisible: boolean
  callActive: boolean
  endedVisible: boolean
  endedSeconds: number
  micMuted: boolean
  speakerMuted: boolean
  incomingHandlerAttached: boolean
}

const DIAL_KEYS: ReadonlyArray<readonly [string, string]> = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
  ['*', ''],
  ['0', '+'],
  ['#', ''],
]

const incomingLabelFromCall = (
  call: Call,
  headers?: Record<string, string>
) => {
  const bits: string[] = []

  const displayName = call.remoteDisplayName.value
  if (displayName) {
    bits.push(displayName)
  }

  if (headers && Object.keys(headers).length) {
    bits.push(JSON.stringify(headers))
  }

  if (call.destination) {
    bits.push(call.destination)
  }

  return bits.length ? bits.join(' | ') : '—'
}

const applyDialMask = (digits: string, mask: string): string => {
  let out = ''
  let di = 0

  for (const ch of mask) {
    if (di >= digits.length) {
      break
    }

    if (ch === '0') {
      out += digits[di]
      di += 1
    } else {
      out += ch
    }
  }

  return out
}

const formatCallTime = (total: number): string => {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, '0')
  const s = (total % 60).toString().padStart(2, '0')

  return `${m}:${s}`
}

const looksLikePhone = (value: string): boolean => {
  const digits = digitsOnly(value)

  return digits.length >= 8 && /^[\d\s+\-()]+$/.test(value.trim())
}

const toE164Candidate = (value: string): string | null => {
  const trimmed = value.trim()
  const digits = digitsOnly(trimmed)

  if (digits.length < 8) {
    return null
  }

  const candidate = trimmed.startsWith('+') ? `+${digits}` : `+${digits}`

  return isValidE164(candidate) ? candidate : null
}

const peerPresentation = (
  label: string
): { employee: Employee; nameLine: string; phoneLine: string } => {
  const parts = label
    .split('|')
    .map(part => part.trim())
    .filter(Boolean)
  const primary = parts[0] || label || '—'

  let phoneLine = ''

  for (const part of parts) {
    const e164 = toE164Candidate(part)

    if (e164) {
      phoneLine = formatE164Display(e164)
      break
    }
  }

  if (primary.startsWith('{')) {
    return {
      employee: { id: 0, name: phoneLine || '—', surname: '·' },
      nameLine: phoneLine || '—',
      phoneLine: '',
    }
  }

  if (looksLikePhone(primary)) {
    const display = phoneLine || formatE164Display(toE164Candidate(primary)) || primary

    return {
      employee: { id: 0, name: display, surname: '·' },
      nameLine: display,
      phoneLine: '',
    }
  }

  const nameParts = primary.split(/\s+/).filter(Boolean)
  const name = nameParts[0] || '—'
  const surname = nameParts.slice(1).join(' ') || '·'

  return {
    employee: { id: 0, name, surname },
    nameLine: primary,
    phoneLine,
  }
}

const setRemotePlaybackMuted = (call: Call, muted: boolean) => {
  for (const stream of call.remoteStreams.value) {
    if (stream.type === StreamType.Audio) {
      stream.track.enabled = !muted
    }
  }
}

const SoftphoneComponent: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  const ringtoneRef = React.useRef<HTMLAudioElement | null>(null)
  const callSecondsRef = React.useRef(0)

  const { data: credentialsResult, refetch: refetchCredentials } = useAPIQuery(
    TelephonySoftphoneGroup,
    'credentials',
    {},
    true
  )

  const onPreferencesChanged = React.useCallback(() => {
    void refetchCredentials()
  }, [refetchCredentials])

  const state = useReactive<SoftphoneState>({
    open: false,
    loggedIn: false,
    connecting: false,
    authStatusKey: 'Softphone.status_disconnected',
    authStatusDetail: '',
    voxUser: '',
    voxPassword: '',
    fromOperatorProfile: false,
    dialPrefix: 7,
    dialDigits: '',
    prefixOpen: false,
    activeCall: null,
    pendingIncomingCall: null,
    incomingLabel: '',
    peerLabel: '',
    incomingVisible: false,
    callActive: false,
    endedVisible: false,
    endedSeconds: 0,
    micMuted: false,
    speakerMuted: false,
    incomingHandlerAttached: false,
  })

  React.useEffect(() => {
    const credentials = credentialsResult as
      | {
          available?: boolean
          reason?: string | null
          vox_username?: string | null
          vox_password?: string | null
        }
      | undefined
    if (!credentials || state.loggedIn || state.connecting) {
      return
    }

    if (credentials.vox_username) {
      state.voxUser = credentials.vox_username
      state.fromOperatorProfile = true
    }

    if (credentials.available && credentials.vox_password) {
      state.voxPassword = credentials.vox_password
      state.authStatusDetail = ''
      state.authStatusKey = 'Softphone.status_ready_from_profile'
      void connectSdk(credentials.vox_username, credentials.vox_password)
      return
    }

    if (credentials.reason) {
      state.authStatusDetail = ''
      state.authStatusKey = credentials.reason
    }
  }, [credentialsResult])

  const hideIncomingCard = () => {
    state.incomingVisible = false
    state.pendingIncomingCall = null
    stopRingtone()
  }

  const stopRingtone = () => {
    const audio = ringtoneRef.current
    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
    ringtoneRef.current = null
  }

  const playRingtone = () => {
    stopRingtone()
    const audio = new Audio(pickRingtoneUrl())
    audio.loop = true
    ringtoneRef.current = audio
    void audio.play().catch(() => {})
  }

  React.useEffect(() => () => stopRingtone(), [])

  const setCallControlsEnabled = (on: boolean) => {
    state.callActive = on
  }

  const resetMediaState = () => {
    state.micMuted = false
    state.speakerMuted = false
  }

  const enterEnded = () => {
    state.endedSeconds = callSecondsRef.current
    state.endedVisible = true
    callSecondsRef.current = 0
  }

  const clearEnded = () => {
    state.endedVisible = false
    state.endedSeconds = 0
  }

  const attachCallListeners = (call: Call) => {
    const onRemoteMediaAdded = (event: {
      payload: { stream: { type: StreamType; track: MediaStreamTrack } }
    }) => {
      if (state.speakerMuted && event.payload.stream.type === StreamType.Audio) {
        event.payload.stream.track.enabled = false
      }
    }

    const onEnd = () => {
      call.removeEventListener(CallEvent.RemoteMediaAdded, onRemoteMediaAdded)
      call.removeEventListener(CallEvent.Disconnected, onEnd)
      call.removeEventListener(CallEvent.Failed, onEnd)
      state.activeCall = null
      hideIncomingCard()
      enterEnded()
      setCallControlsEnabled(false)
      resetMediaState()
      void getDeviceTracker().clear().catch(() => {})
    }

    call.addEventListener(CallEvent.RemoteMediaAdded, onRemoteMediaAdded)
    call.addEventListener(CallEvent.Disconnected, onEnd)
    call.addEventListener(CallEvent.Failed, onEnd)
  }

  const connectSdk = async (username?: string, password?: string) => {
    if (state.loggedIn || state.connecting) {
      return
    }

    const loginUser = (username ?? state.voxUser).trim()
    const loginPassword = password ?? state.voxPassword

    if (!loginUser || !loginPassword) {
      state.authStatusKey = 'Softphone.status_credentials_required'
      return
    }

    try {
      state.connecting = true
      state.authStatusKey = 'Softphone.status_connecting'
      const core = getVoximplantCore()
      const callManager = getCallManager()

      await core.client.connect({ node: resolveConnectionNode() })
      await core.client.login({
        username: loginUser,
        password: loginPassword,
      })

      state.voxUser = loginUser
      state.voxPassword = loginPassword
      state.loggedIn = true
      state.authStatusKey = 'Softphone.status_connected'

      if (!state.incomingHandlerAttached) {
        state.incomingHandlerAttached = true
        callManager.addEventListener(CallManagerEvent.IncomingCall, event => {
          const call = callManager.getCalls().get(event.payload.callId)

          if (!call) {
            return
          }

          if (state.activeCall || state.pendingIncomingCall) {
            try {
              call.reject(RejectMode.Decline)
            } catch {
              /* ignore */
            }
            return
          }

          clearEnded()
          state.pendingIncomingCall = call
          state.incomingLabel = incomingLabelFromCall(call, event.payload.headers)
          state.peerLabel = state.incomingLabel
          state.incomingVisible = true
          state.open = true
          playRingtone()

          const onEnd = () => {
            if (state.pendingIncomingCall === call) {
              hideIncomingCard()
            }
            call.removeEventListener(CallEvent.Disconnected, onEnd)
            call.removeEventListener(CallEvent.Failed, onEnd)
          }

          call.addEventListener(CallEvent.Disconnected, onEnd)
          call.addEventListener(CallEvent.Failed, onEnd)
        })
      }
    } catch (error) {
      state.loggedIn = false
      let detail = ''
      if (error instanceof Error) {
        detail = error.message
      } else if (error && typeof error === 'object') {
        const record = error as Record<string, unknown>
        detail = String(record.message ?? record.code ?? record.name ?? '')
      } else if (typeof error === 'string') {
        detail = error
      }
      state.authStatusKey = 'Softphone.status_connection_error'
      state.authStatusDetail = detail

      try {
        await getVoximplantCore().client.disconnect()
      } catch {
        /* ignore */
      }
    } finally {
      state.connecting = false
    }
  }

  const resolveOutgoingE164 = (): string | null =>
    composeE164(state.dialPrefix, state.dialDigits)

  const startOutgoing = async () => {
    const e164 = resolveOutgoingE164()
    const raw = e164 ? digitsOnly(e164) : ''

    if (!state.loggedIn || !raw || state.callActive) {
      return
    }

    try {
      clearEnded()
      const callManager = getCallManager()
      const deviceTracker = getDeviceTracker()
      const call = callManager.createCall(raw, {
        receiveVideo: false,
      })

      await deviceTracker.attachCall(call)
      await call.start()

      state.peerLabel = formatE164Display(e164) || e164 || raw
      state.activeCall = call
      callSecondsRef.current = 0
      setCallControlsEnabled(true)
      attachCallListeners(call)
    } catch {
      state.authStatusKey = 'Softphone.status_connection_error'
    }
  }

  const hangup = () => {
    state.activeCall?.hangup()
  }

  const toggleMic = () => {
    if (!state.activeCall) {
      return
    }

    if (state.micMuted) {
      state.activeCall.unmuteMicrophone()
      state.activeCall.sendMessage('microphone_unmuted')
      state.micMuted = false
    } else {
      state.activeCall.muteMicrophone()
      state.activeCall.sendMessage('microphone_muted')
      state.micMuted = true
    }
  }

  const toggleSpeaker = () => {
    if (!state.activeCall) {
      return
    }

    if (state.speakerMuted) {
      setRemotePlaybackMuted(state.activeCall, false)
      state.speakerMuted = false
    } else {
      setRemotePlaybackMuted(state.activeCall, true)
      state.speakerMuted = true

      if (!state.micMuted) {
        state.activeCall.muteMicrophone()
        state.activeCall.sendMessage('microphone_muted')
        state.micMuted = true
      }
    }
  }

  const answerIncoming = async () => {
    if (!state.pendingIncomingCall) {
      return
    }

    if (state.callActive) {
      try {
        state.pendingIncomingCall.reject(RejectMode.Busy)
      } catch {
        /* ignore */
      }
      hideIncomingCard()
      return
    }

    const call = state.pendingIncomingCall
    const listenOnly =
      String(call.remoteDisplayName?.value || state.incomingLabel || '')
        .toLowerCase()
        .includes('listen-only')
    state.peerLabel = state.incomingLabel
    hideIncomingCard()
    clearEnded()

    try {
      await getDeviceTracker().attachCall(call)
      await call.answer()

      state.activeCall = call
      callSecondsRef.current = 0
      setCallControlsEnabled(true)
      attachCallListeners(call)

      if (listenOnly) {
        call.muteMicrophone()
        call.sendMessage('microphone_muted')
        state.micMuted = true
      }
    } catch {
      state.authStatusKey = 'Softphone.status_connection_error'
    }
  }

  const declineIncoming = () => {
    try {
      state.pendingIncomingCall?.reject(RejectMode.Decline)
    } catch {
      /* ignore */
    }
    hideIncomingCard()
  }

  const onPrefixSelect = (prefix: Prefix) => {
    const meta = PHONE_PREFIX_META[prefix]
    state.dialPrefix = prefix
    state.dialDigits = state.dialDigits.slice(0, meta.length)
    state.prefixOpen = false
  }

  const onDigitsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const meta = PHONE_PREFIX_META[state.dialPrefix]
    state.dialDigits = digitsOnly(event.target.value).slice(0, meta.length)
  }

  const appendDialDigit = (key: string) => {
    if (!/^[0-9]$/.test(key)) {
      return
    }

    const meta = PHONE_PREFIX_META[state.dialPrefix]
    state.dialDigits = (state.dialDigits + key).slice(0, meta.length)
  }

  const eraseDigit = () => {
    state.dialDigits = state.dialDigits.slice(0, -1)
  }

  const view: SoftphoneView = state.incomingVisible
    ? 'incoming'
    : state.callActive
      ? 'active'
      : state.endedVisible
        ? 'ended'
        : 'dial'

  const peer = peerPresentation(state.peerLabel || state.incomingLabel)
  const prefixMeta = PHONE_PREFIX_META[state.dialPrefix]
  const canDial =
    state.loggedIn && !state.callActive && Boolean(resolveOutgoingE164())

  const muteHints = [
    state.micMuted ? translated_phrase('Softphone.mute_mic') : null,
    state.speakerMuted ? translated_phrase('Softphone.mute_speaker') : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const renderPeerHeader = () => (
    <div className={styles.peer_block}>
      <CustomAvatar employee={peer.employee} />
      <div className={styles.peer_name}>{peer.nameLine}</div>
      {peer.phoneLine ? (
        <div className={styles.peer_phone}>{peer.phoneLine}</div>
      ) : null}
    </div>
  )

  const dialView = (
    <>
      <div className={styles.title}>
        <span>{translated_phrase('Softphone.new_call')}</span>
      </div>

      <div className={styles.phone_row}>
        <i className={`${getIcon('PHONE')} ${styles.phone_icon}`} />
        <div
          className={styles.prefix_wrap}
          onClick={() => {
            state.prefixOpen = !state.prefixOpen
          }}
        >
          <span className={styles.prefix_value}>+{state.dialPrefix}</span>
          <i className={`${getIcon('CHEVRON_DOWN')} ${styles.prefix_chevron}`} />
          {state.prefixOpen ? (
            <div className={styles.prefix_dropdown}>
              {PHONE_PREFIXES.map(prefix => (
                <div
                  key={prefix}
                  className={`${styles.prefix_option}${
                    prefix === state.dialPrefix
                      ? ` ${styles.prefix_option_active}`
                      : ''
                  }`}
                  onClick={event => {
                    event.stopPropagation()
                    onPrefixSelect(prefix)
                  }}
                >
                  +{prefix}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.phone_sep} />
        <input
          className={styles.phone_input}
          inputMode='numeric'
          value={applyDialMask(state.dialDigits, prefixMeta.mask)}
          onChange={onDigitsInput}
          placeholder={prefixMeta.placeholder}
          disabled={!state.loggedIn || state.callActive}
        />
      </div>

      <div className={styles.dial_pad}>
        {DIAL_KEYS.map(([key, letters]) => (
          <div
            key={key}
            className={styles.dial_key}
            onClick={() => appendDialDigit(key)}
          >
            <div>{key}</div>
            {letters ? (
              <div className={styles.dial_letters}>{letters}</div>
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.actions_row}>
        <span className={styles.click_wrap} onClick={eraseDigit}>
          <ActionButton
            title={translated_phrase('Softphone.erase')}
            icon={getIcon('DELETE_LEFT')}
            shape='circle'
            className='transparent'
          />
        </span>
        <button
          type='button'
          className={styles.round_btn}
          title={translated_phrase('Softphone.call')}
          disabled={!canDial}
          onClick={() => void startOutgoing()}
        >
          <i className={getIcon('PHONE')} />
        </button>
      </div>
    </>
  )

  const incomingView = (
    <>
      <div className={styles.title_accent}>
        {translated_phrase('Softphone.incoming_call')}
      </div>
      {renderPeerHeader()}
      <div className={styles.actions_row_wide}>
        <button
          type='button'
          className={`${styles.round_btn} ${styles.round_btn_danger}`}
          title={translated_phrase('Softphone.decline')}
          onClick={declineIncoming}
        >
          <i className={getIcon('PHONE_SLASH')} />
        </button>
        <button
          type='button'
          className={`${styles.round_btn} ${styles.round_btn_success}`}
          title={translated_phrase('Softphone.answer')}
          onClick={() => void answerIncoming()}
        >
          <i className={getIcon('PHONE')} />
        </button>
      </div>
    </>
  )

  const activeView = (
    <>
      <div className={styles.status_active}>
        {translated_phrase('Softphone.in_progress')}
      </div>
      {renderPeerHeader()}
      {muteHints ? <div className={styles.mute_hints}>{muteHints}</div> : null}
      <SoftphoneCallTimer
        active={state.callActive}
        secondsRef={callSecondsRef}
      />
      <div className={styles.actions_row_controls}>
        <span className={styles.click_wrap} onClick={toggleMic}>
          <ActionButton
            title={translated_phrase(
              state.micMuted ? 'Softphone.unmute_mic' : 'Softphone.mute_mic'
            )}
            icon={getIcon(
              state.micMuted ? 'MICROPHONE_SLASH' : 'MICROPHONE'
            )}
            shape='circle'
            className={state.micMuted ? 'danger transparent' : 'transparent'}
          />
        </span>
        <span className={styles.click_wrap} onClick={toggleSpeaker}>
          <ActionButton
            title={translated_phrase(
              state.speakerMuted
                ? 'Softphone.unmute_speaker'
                : 'Softphone.mute_speaker'
            )}
            icon={getIcon(state.speakerMuted ? 'VOLUME_XMARK' : 'VOLUME_HIGH')}
            shape='circle'
            className={
              state.speakerMuted ? 'danger transparent' : 'transparent'
            }
          />
        </span>
        <span className={styles.click_wrap_disabled}>
          <ActionButton
            title={translated_phrase('Softphone.on_hold')}
            icon={getIcon('PAUSE')}
            shape='circle'
            className='transparent'
          />
        </span>
        <span className={styles.click_wrap_disabled}>
          <ActionButton
            title={translated_phrase('Softphone.dial_pad')}
            icon={getIcon('DIAL_PAD')}
            shape='circle'
            className='transparent'
          />
        </span>
      </div>
      <div className={styles.actions_row}>
        <button
          type='button'
          className={`${styles.round_btn} ${styles.round_btn_danger}`}
          title={translated_phrase('Softphone.hangup')}
          onClick={hangup}
        >
          <i className={getIcon('PHONE_SLASH')} />
        </button>
      </div>
    </>
  )

  const endedView = (
    <>
      <div className={styles.ended_card}>
        <div className={styles.ended_status}>
          {translated_phrase('Softphone.call_ended')}
        </div>
        {renderPeerHeader()}
        <div className={styles.ended_duration}>
          {translated_phrase('Softphone.duration', {
            time: formatCallTime(state.endedSeconds),
          })}
        </div>
      </div>
      <div className={styles.actions_row}>
        <span
          className={styles.click_wrap}
          onClick={() => void startOutgoing()}
        >
          <ActionButton
            title={translated_phrase('Softphone.call_again')}
            icon={getIcon('PHONE')}
            className='success'
          />
        </span>
        <span className={styles.click_wrap} onClick={clearEnded}>
          <ActionButton
            title={translated_phrase('Softphone.close')}
            icon={getIcon('CLOSE')}
            className='transparent'
          />
        </span>
      </div>
    </>
  )

  const panel = (
    <div className={styles.shell}>
      {view === 'incoming'
        ? incomingView
        : view === 'active'
          ? activeView
          : view === 'ended'
            ? endedView
            : dialView}

      {view === 'dial' || view === 'ended' ? (
        <div className={styles.status_line}>
          {translated_phrase(state.authStatusKey)}
          {state.authStatusDetail ? ` (${state.authStatusDetail})` : ''}
          {state.voxUser ? ` · ${state.voxUser}` : ''}
        </div>
      ) : null}

      {view === 'dial' || view === 'ended' ? (
        <SoftphoneSettings onPreferencesChanged={onPreferencesChanged} />
      ) : null}
    </div>
  )

  return (
    <Popover
      trigger='click'
      placement='bottomRight'
      open={state.open}
      onOpenChange={open => {
        state.open = open
        if (!open) {
          state.prefixOpen = false
        }
      }}
      title={
        <Flex align='center' gap={8}>
          <i className={getIcon('CALLS')}></i>
          {translated_phrase('Softphone.title')}
        </Flex>
      }
      content={panel}
    >
      <Badge
        dot={state.incomingVisible}
        status={state.loggedIn && !state.incomingVisible ? 'success' : undefined}
        offset={[-8, 18]}
      >
        <Button
          className={styles.header_btn}
          type='text'
          aria-label={translated_phrase('Softphone.title')}
          icon={<i className={getIcon('CALLS')}></i>}
        />
      </Badge>
    </Popover>
  )
}

/** Memo: TopHeader parent re-renders must not rebuild Vox SDK UI tree. */
export const Softphone = React.memo(SoftphoneComponent)
