import { Spin } from 'antd'

// CustomSpin (src/components/CustomSpin) reads spin.isSpinning from Redux;
// its stories toggle that via per-story parameters.reduxState, which
// design-sync's static provider wrap (.design-sync/config.json cfg.provider)
// can't vary per story — see .design-sync/NOTES.md. This preview mirrors the
// story's intent (what the fullscreen overlay looks like) directly instead.
export const Spinning = () => <Spin spinning fullscreen />
