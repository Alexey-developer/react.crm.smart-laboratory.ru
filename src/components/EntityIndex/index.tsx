import React from 'react'

import {
  Row,
  Space,
  Input,
  type InputRef,
  Flex,
  Popover,
  Button,
  Checkbox,
  Tag,
  type GetProp,
} from 'antd'
const { Search } = Input

import { useReactive } from 'ahooks'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { selectPerPage } from '@redux/CurrentUser/selectors'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import type { GroupClass } from '@api/common/types/TGroups'
import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { FormCard } from './FormCard'
import { FormActions } from './FormActions'
import { DefaultCard } from '@components/DefaultCard'
import { type Filters, Filter } from '@components/Filter'
import { CustomPagination } from '@components/CustomPagination'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle } from '@utils/helpers'
import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'
import { CustomSearch } from './CustomSearch'

type EntityIndexProps = {
  pageTitleCode: string
  groupClass: GroupClass
  entityFilters: Filters
  FormContent: (entity: any) => React.ReactNode
  actionIndexes: number[]
}

export const EntityIndex: React.FC<EntityIndexProps> = ({
  pageTitleCode,
  groupClass,
  entityFilters,
  FormContent,
  actionIndexes,
}) => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase(pageTitleCode))

  const dispatch = useDispatch()
  const perPage = useSelector(selectPerPage)

  const searchRef = React.useRef<InputRef>(null)

  const requestPageState = useReactive<{
    value: number
  }>({
    value: 1,
  })

  const requestQueryState = useReactive<{
    value: string
  }>({
    value: '',
  })

  const requestQueryFieldsState = useReactive<{
    value: string[]
  }>({
    value: [],
  })

  const filters = useGetStateCurrentPageFilters()
  //   console.log('FILTERS: ', filters)

  const { data, isLoading, isFetching, refetch, isRefetching, isPending } =
    useAPIQuery(groupClass, getMethod('INDEX'), {
      page: requestPageState.value,
      query: requestQueryState.value,
      query_fields: requestQueryFieldsState.value,
      filters: filters,
    })

  //   console.log('isLoading: ', isLoading)
  //   console.log('isFetching: ', isFetching)
  //   console.log('isRefetching: ', isRefetching)
  //   console.log('isPending: ', isPending)
  //   console.log('------------------------------------')

  const {
    //
    mutateAsync: mutateAsyncDelete,
    isPending: isPendingMutationDelete,
  } = useAPIMutation(groupClass, getMethod('DESTROY'), {})
  const {
    mutateAsync: mutateAsyncRestore,
    isPending: isPendingMutationRestore,
  } = useAPIMutation(groupClass, getMethod('RESTORE'), {})

  //   React.useEffect(() => {
  //     refetch()
  //   }, [requestPageState.value])

  //   React.useEffect(() => {
  //     refetch().then(() => {
  //       setTimeout(() => {
  //         searchRef.current?.focus()
  //       }, 1)
  //     })
  //   }, [requestQueryState.value])

  //   React.useEffect(() => {
  //     if (requestQueryState.value) refetch()
  //   }, [requestQueryFieldsState.value])

  console.log('data: ', data)

  //   const checkedListState = useReactive<{
  //     value: string[]
  //   }>({
  //     value: data?.meta.search_attributes,
  //   })

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  const Card: React.FC<{ entity: any }> = ({ entity }) => {
    return FormCard({
      isLoading: isLoading,
      entity: entity,
      FormContent: FormContent,
      cardActions: FormActions(
        entity.id,
        entity.deleted_at ? [3] : actionIndexes,
        () => {
          entity.deleted_at
            ? mutateAsyncRestore(entity.id).then(() => refetch())
            : mutateAsyncDelete(entity.id).then(() => refetch())
        }
      ),
    })
  }

  return (
    <>
      <Flex justify='space-between'>
        <Space>
          <Filter
            filters={entityFilters}
            isLoading={isLoading || isFetching}
            refetch={refetch}
            total={data?.meta.total}
          />
        </Space>
        {/* <Flex justify='flex-center'>
          <Tag
            className={'success'}
            // icon={<i className={getIcon('RUBLE')}></i>}
          >
            {data?.meta.total}
          </Tag>
        </Flex> */}
        <CustomSearch
          requestQueryState={requestQueryState}
          requestQueryFieldsState={requestQueryFieldsState}
          //   checkedListState={checkedListState}
          isLoading={isLoading || isFetching}
          searchAttributes={data?.meta.search_attributes}
        />
      </Flex>
      <CustomPagination
        requestPageState={requestPageState}
        total={data?.meta.total}
      />
      <Row style={{ marginTop: 20 }} justify='start'>
        {!isLoading /*&& !isFetching */ &&
          data?.data?.map((entity: any, i: number) => (
            <Card key={i} entity={entity} />
          ))}
        {
          /*(*/ isLoading /* || isFetching)*/ &&
            [...Array(perPage)]?.map((skeleton, i) => (
              <DefaultCard
                isLoading={isLoading || isFetching}
                key={i}
                title=''
                content={<></>}
              />
            ))
        }
      </Row>
      <CustomPagination
        requestPageState={requestPageState}
        total={data?.meta.total}
      />
    </>
  )
}
