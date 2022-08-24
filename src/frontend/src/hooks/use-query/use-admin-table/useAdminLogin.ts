import { useConnect } from '@connect2ic/react'
import { BaseInterface } from '@fe/constants'
import { usePersistentState } from '@fe/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminQuery } from './useAdminQuery'

interface UseAdminLoginProps extends BaseInterface {}

export function useAdminLogin(props?: UseAdminLoginProps) {
  const { isConnected, principal } = useConnect()

  const navigate = useNavigate()

  const { state: account, setState: setAccount } = usePersistentState({
    store: 'account'
  })

  const {
    queryResult,
    state: {
      apiData: { admins },
      queryOptions: {
        search: { search, setSearch }
      }
    }
  } = useAdminQuery({
    initialProps: {
      page: 0,
      pageSize: 1
    },
    sideEffectFunctions: {
      onSuccess(data) {
        if (typeof data[0] === 'object') {
          const account = data[0]
          setAccount((prev) => ({
            ...prev,
            id: account.id,
            order: account.order,
            accountId: account.accountId,
            address: account.address,
            dateOfBirth: account.dob,
            email: account.email,
            firstName: account.firstName,
            gender: account.gender.value,
            lastName: account.lastName,
            phone: account.phone,
            principalId: account.principalId || principal,
            role: {
              id: account.role.id,
              value: account.role.value
            },
            token: {
              id: account.token.id,
              value: account.token.value
            }
          }))
        }
      }
    }
  })

  useEffect(() => {
    if (typeof principal === 'string' && principal.length > 0 && isConnected)
      setSearch(principal)
  }, [principal])

  useEffect(() => {
    if (account.accountId.length > 0 && isConnected) navigate('/app')
  }, [account])

  function login() {
    queryResult.refetch()
  }

  return { queryResult, login }
}