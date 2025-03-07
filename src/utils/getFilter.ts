export enum FilterEnum {
  ID = 'id',
  DELETED = 'deleted',

  CREATED_AT = 'created_at',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(FilterEnum).find(
    ([key /*, val*/]) => key === value
  )?.[1]
}

export const getFilter = (filter: string) => {
  const f = getValueByKeyForStringEnum(filter)
  return f ?? FilterEnum.ID
}
