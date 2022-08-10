import { BaseInterface } from '@fe/constants'
import { persistentStorage } from '@fe/storages'
import { useAtom } from 'jotai'

interface useGlobalStateProps extends BaseInterface {
    store: keyof typeof persistentStorage
}

export function usePersistentState(props: useGlobalStateProps) {
    const {store: storeName} = props;
    const [state, setState] = useAtom(persistentStorage[storeName])
    return [state, setState]
}
