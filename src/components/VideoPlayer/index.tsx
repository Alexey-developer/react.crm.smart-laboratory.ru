import React, { useEffect, useRef } from 'react'

import { Button, Dropdown, Slider } from 'antd'
import type { MenuProps } from 'antd'
import { useReactive } from 'ahooks'
import { useTranslation } from 'react-i18next'

import type { TFile } from '@api/models/file/type/TFile'
import { formatFileSize } from '@utils/formatFileSize'
import { getIcon } from '@utils/getIcon'

import styles from './index.module.scss'

export type VideoPlayerProps = {
  file: TFile
  previewUrl?: string
}

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

type PlayerState = {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  rate: number
  isFullscreen: boolean
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60

  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  file,
  previewUrl,
}) => {
  const [translated_phrase] = useTranslation('global')
  const videoRef = useRef<HTMLVideoElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  const state = useReactive<PlayerState>({
    playing: false,
    muted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    rate: 1,
    isFullscreen: false,
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video || !previewUrl) {
      return
    }

    video.playbackRate = state.rate
  }, [previewUrl, state.rate])

  useEffect(() => {
    const onFullscreenChange = () => {
      state.isFullscreen = Boolean(document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [state])

  if (!file.mime_type.startsWith('video/') || !previewUrl) {
    return null
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.paused) {
      void video.play()
      state.playing = true
    } else {
      video.pause()
      state.playing = false
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.muted = !video.muted
    state.muted = video.muted
  }

  const setVolume = (value: number) => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const next = Math.min(1, Math.max(0, value / 100))
    video.volume = next
    video.muted = next === 0
    state.volume = next
    state.muted = video.muted
  }

  const seek = (value: number) => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.currentTime = value
    state.currentTime = value
  }

  const toggleFullscreen = () => {
    const shell = shellRef.current
    if (!shell) {
      return
    }

    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }

    void shell.requestFullscreen()
  }

  const rateMenuItems: MenuProps['items'] = PLAYBACK_RATES.map(rate => ({
    key: String(rate),
    label: `${rate}×`,
    onClick: () => {
      state.rate = rate
      if (videoRef.current) {
        videoRef.current.playbackRate = rate
      }
    },
  }))

  return (
    <figure className={styles.player}>
      <div className={styles.shell} ref={shellRef}>
        <video
          ref={videoRef}
          className={styles.video}
          preload='metadata'
          playsInline
          src={previewUrl}
          onClick={togglePlay}
          onPlay={() => {
            state.playing = true
          }}
          onPause={() => {
            state.playing = false
          }}
          onTimeUpdate={event => {
            state.currentTime = event.currentTarget.currentTime
          }}
          onLoadedMetadata={event => {
            state.duration = event.currentTarget.duration || 0
            state.volume = event.currentTarget.volume
            state.muted = event.currentTarget.muted
          }}
          onVolumeChange={event => {
            state.volume = event.currentTarget.volume
            state.muted = event.currentTarget.muted
          }}
        />

        <div className={styles.controls}>
          <Slider
            className={styles.progress}
            min={0}
            max={state.duration || 0}
            step={0.1}
            value={state.currentTime}
            tooltip={{ formatter: value => formatTime(Number(value ?? 0)) }}
            onChange={seek}
          />

          <div className={styles.toolbar}>
            <div className={styles.toolbar_left}>
              <Button
                type='text'
                className={styles.control_btn}
                icon={
                  <i
                    className={getIcon(state.playing ? 'PAUSE' : 'PLAY')}
                  />
                }
                onClick={togglePlay}
                aria-label={translated_phrase(
                  state.playing
                    ? 'VideoPlayer.pause'
                    : 'VideoPlayer.play'
                )}
              />

              <Button
                type='text'
                className={styles.control_btn}
                icon={
                  <i
                    className={getIcon(
                      state.muted || state.volume === 0
                        ? 'VOLUME_XMARK'
                        : 'VOLUME_HIGH'
                    )}
                  />
                }
                onClick={toggleMute}
                aria-label={translated_phrase(
                  state.muted ? 'VideoPlayer.unmute' : 'VideoPlayer.mute'
                )}
              />

              <Slider
                className={styles.volume}
                min={0}
                max={100}
                value={state.muted ? 0 : Math.round(state.volume * 100)}
                onChange={setVolume}
              />

              <span className={styles.time}>
                {formatTime(state.currentTime)} / {formatTime(state.duration)}
              </span>
            </div>

            <div className={styles.toolbar_right}>
              <Dropdown menu={{ items: rateMenuItems }} trigger={['click']}>
                <Button
                  type='text'
                  className={styles.rate_btn}
                  icon={<i className={getIcon('GAUGE')} />}
                  aria-label={translated_phrase('VideoPlayer.playback_rate')}
                >
                  {state.rate}×
                </Button>
              </Dropdown>

              <Button
                type='text'
                className={styles.control_btn}
                icon={
                  <i
                    className={getIcon(
                      state.isFullscreen ? 'COMPRESS' : 'EXPAND'
                    )}
                  />
                }
                onClick={toggleFullscreen}
                aria-label={translated_phrase(
                  state.isFullscreen
                    ? 'VideoPlayer.exit_fullscreen'
                    : 'VideoPlayer.fullscreen'
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <figcaption className={styles.caption}>
        {file.original_name} · {formatFileSize(file.size_bytes)}
      </figcaption>
    </figure>
  )
}
