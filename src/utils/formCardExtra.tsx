import { Badge } from 'antd'

import { TColorType } from '@api/common/types/TColorType'

export const formCardExtra = (className: TColorType, text: string | number) => {
  return <Badge className={className} count={text}></Badge>
}
