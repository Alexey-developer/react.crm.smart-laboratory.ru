import { Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TFile } from '@api/models/file/type/TFile'

import { formatFileSize } from '@utils/formatFileSize'
import { getIcon } from '@utils/getIcon'

export const FormContent = (file: TFile) => {
  const [translated_phrase] = useTranslation('global')

  return (
    <>
      <Tooltip title={translated_phrase('Form.EntitiesFields.file_size')}>
        <Tag className='transparent' icon={<i className={getIcon('DOCUMENTS')}></i>}>
          {formatFileSize(file.size_bytes)}
        </Tag>
      </Tooltip>
      <Tag className='transparent'>{file.mime_type}</Tag>
      {file.created_at && (
        <Tooltip title={translated_phrase('Filters.created_at')}>
          <Tag className='transparent' icon={<i className={getIcon('CREATED_AT')}></i>}>
            {file.created_at}
          </Tag>
        </Tooltip>
      )}
    </>
  )
}
