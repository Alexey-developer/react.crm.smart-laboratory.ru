import { Badge } from 'antd'

export const formCardExtra = (className: string, text: string | number) => {
  return <Badge className={className} count={text}></Badge>
}
