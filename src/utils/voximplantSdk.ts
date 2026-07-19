import { ConnectionNode, Core } from '@voximplant/websdk'
import {
  CallLoader,
  callToken,
  type CallManager,
} from '@voximplant/websdk/modules/call-manager'
import {
  StreamHelper,
  StreamLoader,
  streamToken,
  type DeviceTrackerHelper,
  type StreamModule,
} from '@voximplant/websdk/modules/stream'

let core: Core | null = null
let deviceTracker: DeviceTrackerHelper | null = null

const ensureCore = (): Core => {
  if (!core) {
    core = Core.init({})
    core.registerModules([StreamLoader(), CallLoader()])
  }

  return core
}

export const getVoximplantCore = (): Core => ensureCore()

export const getCallManager = (): CallManager => {
  const manager = ensureCore().getModule(callToken)

  if (!manager) {
    throw new Error('Voximplant Call module is not registered')
  }

  return manager
}

export const getStreamModule = (): StreamModule => {
  const streamModule = ensureCore().getModule(streamToken)

  if (!streamModule) {
    throw new Error('Voximplant Stream module is not registered')
  }

  return streamModule
}

export const getDeviceTracker = (): DeviceTrackerHelper => {
  if (!deviceTracker) {
    deviceTracker = getStreamModule().createHelper(StreamHelper.DeviceTracker)
    deviceTracker.enableTracker()
  }

  return deviceTracker
}

export const resolveConnectionNode = (): ConnectionNode => {
  const raw = import.meta.env.VITE_VOXIMPLANT_CONNECTION_NODE?.trim()

  if (raw && raw in ConnectionNode) {
    return ConnectionNode[raw as keyof typeof ConnectionNode]
  }

  return ConnectionNode.NODE_4
}
