export const getDirectionActionTitle = (
  translate: (key: string) => string,
  label?: string
) =>
  label
    ? `${translate('MenuItems.direction')}: ${label}`
    : translate('MenuItems.direction')
