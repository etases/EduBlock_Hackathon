import { BaseInterface } from '@fe/constants'
import { useDebounce, usePersistentState } from '@fe/hooks'
import { useQuery } from '@fe/hooks/use-query/core'
import { useState } from 'react'

interface UseStudentQueryProps extends BaseInterface {
  initialProps: {
    page: number
    pageSize: number
    search?: string
  }
  sideEffectFunctions?: {
    onError?: (error) => void
    onSuccess?: (data) => void
    onSettled?: (data, error) => void
  }
}

const apiFields = [
  {
    localPropName: 'id',
    remotePropName: 'id'
  },
  {
    localPropName: 'order',
    remotePropName: 'order'
  },
  {
    localPropName: 'accountId',
    remotePropName: 'AccountId'
  },
  {
    localPropName: 'firstName',
    remotePropName: 'FirstName'
  },
  {
    localPropName: 'lastName',
    remotePropName: 'LastName'
  },
  {
    localPropName: 'dob',
    remotePropName: 'DateOfBirth'
  },
  {
    localPropName: 'address',
    remotePropName: 'Address'
  },
  {
    localPropName: 'principalId',
    remotePropName: 'PrincipalId'
  },
  {
    localPropName: 'role',
    remotePropName: '_Role'
  },
  {
    localPropName: 'token',
    remotePropName: '_Token'
  },
  {
    localPropName: 'phone',
    remotePropName: 'Phone'
  },
  {
    localPropName: 'email',
    remotePropName: 'Email'
  },
  {
    localPropName: 'gender',
    remotePropName: 'Gender'
  },
  {
    localPropName: 'ethnic',
    remotePropName: 'Ethnic'
  }
]

const specialProps = ['role', 'token']

const ENDPOINT = 'rows/table/91163/'

export function useStudentQuery(props: UseStudentQueryProps) {
  const {
    state: {
      token: { value: token }
    }
  } = usePersistentState({
    store: 'account'
  })
  const {
    initialProps,
    sideEffectFunctions: {
      onError: onErrorCallback,
      onSuccess: onSuccessCallback,
      onSettled: onSettledCallback
    }
  }: UseStudentQueryProps = {
    ...props,
    ...(typeof props.sideEffectFunctions === 'undefined'
      ? {
          sideEffectFunctions: {
            onError(error) {},
            onSuccess(data) {},
            onSettled(data, error) {}
          }
        }
      : props.sideEffectFunctions)
  }
  const [students, setStudents] = useState<any[]>([])
  const [pagination, setPagination] = useState({})

  const [page, setPage] = useState(initialProps.page)
  const [pageSize, setPageSize] = useState(initialProps.pageSize)
  const [search, setSearch] = useState(initialProps.search)

  const { debouncedValue: searchDebounced } = useDebounce({
    value: search,
    delay: 500
  })

  const queryResult = useQuery({
    options: {
      enabled: false,
      queryKey: [
        {
          endpoint: ENDPOINT,
          page,
          pageSize
          // search: searchDebounced
        }
      ],
      onSettled(data, error) {
        if (typeof onSettledCallback === 'function')
          onSettledCallback(data, error)
      },
      onError(error) {
        if (typeof onErrorCallback === 'function') onErrorCallback(error)
      },
      onSuccess(data: any) {
        const {
          data: { count, next, previous, results }
        } = data
        setStudents((_) => {
          // format data and return formatted data
          const formattedResult = Array.isArray(results)
            ? results.map((admin) =>
                apiFields.reduce((prev, { localPropName, remotePropName }) => {
                  const isSpecialProps = specialProps.some(
                    (prop) => prop === localPropName
                  )
                  return {
                    ...prev,
                    [localPropName]: isSpecialProps
                      ? admin[remotePropName][0]
                      : admin[remotePropName]
                  }
                }, {})
              )
            : []

          if (typeof onSuccessCallback === 'function')
            onSuccessCallback(formattedResult)
          // console.log(formattedResult)
          return formattedResult
        }),
          setPagination((_) => {
            // format data and return formatted data
            return { count, next, previous }
          })
      }
    },
    requestOptions: {
      endpoint: ENDPOINT,
      method: 'GET',
      token: token.length > 0 ? token : 'mf7zLekECjwD0lzPgcbpJZ6hapILXhuI',
      query: {
        user_field_names: true,
        page: page + 1,
        size: pageSize,
        ...(typeof search === 'string' && search.length > 0 ? { search } : {})
      }
    }
  })

  return {
    queryResult,
    state: {
      apiData: {
        students: {
          students
          // setAdmins
        },
        pagination: {
          pagination
          // setPagination
        }
      },
      queryOptions: {
        page: { page, setPage },
        pageSize: { pageSize, setPageSize },
        search: { search, setSearch }
      }
    }
  }
}
