import { Tag } from 'antd'

import type { TCallExtension } from '@api/models/callExtension/type/TCallExtension'

import { getIcon } from '@utils/getIcon'
import { formatE164Display } from '@utils/phoneE164'

export const FormContent = (callExtension: TCallExtension) => {
  const title =
    callExtension.display_name ||
    callExtension.vox_username ||
    formatE164Display(callExtension.phone_number?.e164) ||
    callExtension.code

  return (
    <>
      <h2>
        {callExtension.code}
        {title !== callExtension.code ? ` — ${title}` : ''}
      </h2>
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {callExtension.created_at}
      </Tag>
    </>
  )
}
