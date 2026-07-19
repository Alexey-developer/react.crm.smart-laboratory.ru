/** Softphone UI ringtone (Vite `public/`). Voice (yulduz|kirill) is chosen only in crm-tel Vox scenario. */

export const RINGTONE_URLS = ['/audio/ringtones/incoming_01.wav']

export const pickRingtoneUrl = (): string =>
  RINGTONE_URLS[Math.floor(Math.random() * RINGTONE_URLS.length)]
