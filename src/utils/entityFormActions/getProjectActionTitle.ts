export const getProjectActionTitle = (
  translate: (key: string) => string,
  label?: string
) =>
  label
    ? `${translate('MenuItems.project')}: ${label}`
    : translate('MenuItems.project')
