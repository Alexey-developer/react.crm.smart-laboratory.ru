import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * Wave 2 — компоненты с Router / API / сложными зависимостями.
 * Stories добавляются отдельной задачей; не блокируют bootstrap Storybook.
 */
const meta = {
  title: 'Connected (wave 2)/README',
  parameters: {
    docs: {
      description: {
        component: `
### Очередь wave 2

| Компонент | Зависимости |
|-----------|-------------|
| \`Filter\`, \`Sort\` | Redux Filters, API |
| \`Breadcrumbs\` | react-router location |
| \`EditableTextarea\` | jodit-pro, theme |
| \`CustomSelect\`, \`CustomSimpleSelect\` | useAPIQuery, Form |
| \`PhoneInput\` | Redux PhonePrefix, Form, mask |
| \`CustomForm\`, \`EntityIndex\` | полный CRM-контекст |

### Не покрывать Storybook

App-chrome: \`Sidebar\`, \`TopHeader\`, \`Auth\`, \`Notification\`, \`HeaderProfile\` и др. — это экранные сборки, не design primitives.
        `,
      },
    },
  },
  render: () => null,
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Placeholder: Story = {}
