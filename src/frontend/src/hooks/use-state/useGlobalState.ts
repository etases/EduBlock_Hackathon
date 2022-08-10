import { BaseInterface } from '@fe/constants'
import { sessionStorage } from '@fe/storages'
import { useAtom } from 'jotai'

interface useGlobalStateProps extends BaseInterface {
    store: keyof typeof sessionStorage
}

export function useGlobalState(props: useGlobalStateProps) {
    const {store: storeName} = props;
    const [state, setState] = useAtom(sessionStorage[storeName])
    return [state, setState]
}
