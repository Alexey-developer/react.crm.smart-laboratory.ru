import React from 'react'

import { useReactive } from 'ahooks'

import { Form, Input, Space, Switch, Tag } from 'antd'
const { TextArea } = Input

import { useTranslation } from 'react-i18next'

// import JoditEditor from 'jodit-react'
import JoditEditor, { Jodit } from 'jodit-pro-react'
// import type { Config } from 'jodit-pro/esm/config'
// import type { DeepPartial } from 'jodit-pro/esm/types'

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTheme } from '@redux/Theme/selectors'

import { constants } from '@utils/constants/constants.json'
import { getIcon } from '@utils/getIcon'

import './index.module.scss'

type Mode = 'simple' | 'advanced'

type EditableTextareaProps = {
  name: string
  value?: string
  mode?: Mode
}

export const EditableTextarea: React.FC<EditableTextareaProps> = ({
  name,
  value = '',
  mode = 'simple',
}) => {
  const [translated_phrase] = useTranslation('global')

  const currentTheme = useSelector(selectCurrentTheme)

  const sw = React.useRef<HTMLButtonElement>(null)
  // React 19: useRef<T>(null) → RefObject<T | null>. Используем instance-тип Jodit, не typeof.
  const editor = React.useRef<Jodit | null>(null)

  type SizeType = 'tiny' | 'xsmall' | 'small' | 'middle' | 'large'
  //   const sizes: SizeType[] = ['tiny', 'xsmall', 'small', 'middle', 'large']
  const state = useReactive<{ content: string; mode: Mode; size: SizeType }>({
    content: value,
    mode: mode === 'advanced' || false /*extended*/ ? 'advanced' : 'simple',
    size: 'middle',
  })
  console.log('state.content')
  console.log(state.content)

  const config = React.useMemo(
    () => ({
      theme: `${currentTheme}_custom`,
      useSplitMode: true,
      extraPlugins: ['pasteCode'],
      toolbarButtonSize: state.size,
      //   buttons: [],
      //   defaultMode: Jodit.MODE_SPLIT,
      //   sourceEditorNativeOptions: {
      //     showGutter: true,
      //     theme: 'ace/theme/idle_fingers',
      //     mode: 'ace/mode/html',
      //     wrap: true,
      //     highlightActiveLine: true,
      //   },
      //   hotkeys: {
      //     redo: 'ctrl+z',
      //     undo: 'ctrl+y,ctrl+shift+z',
      //     indent: 'ctrl+]',
      //     outdent: 'ctrl+[',
      //     bold: 'ctrl+b',
      //     italic: 'ctrl+i',
      //     removeFormat: 'ctrl+shift+m',
      //     insertOrderedList: 'ctrl+shift+7',
      //     insertUnorderedList: 'ctrl+shift+8',
      //     openSearchDialog: 'ctrl+f',
      //     openReplaceDialog: 'ctrl+r',
      //   },
      // // задача, заказчик, проект... (https://xdsoft.net/jodit/pro/docs/plugin/autocomplete/)
      //     autocomplete: {
      //       sources: [
      //         '@mary',
      //         '@jain',
      //         '@entany',
      //         //   async query =>
      //         //     fetch('./mention.php?q=' + encodeURIComponent(query)).then(resp =>
      //         //       resp.json()
      //         //     ),
      //       ],
      //     },
      //   uploader: {
      //     url: 'https://sitename.ru/connector/index.php?action=upload',
      //   },
      //   filebrowser: {
      //     ajax: {
      //       url: 'https://sitename.ru/connector/index.php',
      //     },
      //   },
    }),
    [state.size, currentTheme]
  )

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Space>
        <Switch
          ref={sw}
          checkedChildren={translated_phrase('Modes.advanced')}
          unCheckedChildren={translated_phrase('Modes.simple')}
          disabled={
            state.content.length > 0 && sw.current?.ariaChecked === 'true'
          }
          defaultChecked={state.mode === 'advanced'}
          loading={false}
          // disabled={disabled}
          onChange={(checked, event) => {
            state.mode = checked ? 'advanced' : 'simple'
            // console.log(permission.action)
            // state.isLoading = true
            // setTimeout(() => {
            //   state.isLoading = false
            // }, 600)
          }}
        />
        <Tag
          className={
            state.content.length > 0 && sw.current?.ariaChecked === 'true'
              ? 'danger transparent'
              : 'warning transparent'
          }
          icon={
            <i
              className={getIcon(
                state.content.length > 0 && sw.current?.ariaChecked === 'true'
                  ? 'ERROR'
                  : 'INFO'
              )}
            ></i>
          }
        >
          {translated_phrase(
            `Messages.${
              state.content.length > 0 && sw.current?.ariaChecked === 'true'
                ? 'Warnings.switch_textarea_mode_is_not_available'
                : 'Info.switch_textarea_mode_is_available'
            }`
          )}
        </Tag>
      </Space>

      <Form.Item name={name} noStyle>
        {state.mode === 'simple' ? (
          <TextArea
            value={state.content}
            onChange={element => (state.content = element.target.value)}
            maxLength={constants.MAX_TEXT_INPUT_LENGTH}
          />
        ) : (
          <JoditEditor
            ref={editor}
            value={state.content}
            //   onChange={newContent => {}}
            //   onBlur={newContent => (state.content = newContent)}
            onChange={newContent =>
              //   (state.content = newContent !== '<p><br></p>' ? newContent : '')
              {
                if (newContent === '<p><br></p>') {
                  editor.current.value = state.content = ''
                } else {
                  state.content = newContent
                }
              }
            }
            config={config}
          />
        )}
      </Form.Item>
    </Space>
  )
}
