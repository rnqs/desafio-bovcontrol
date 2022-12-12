import * as React from 'react'
import {
  QueryClient,
  MutationCache,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { ChecklistsProvider } from './src/context/checklists'
import RealmContext from './src/services/db'
import Routes from './src/routes'

const { RealmProvider } = RealmContext

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: 'offlineFirst',
      retry: true,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Ação salva no servidor com sucesso!',
      })
    },
    onError: () => {
      Toast.show({
        type: 'info',
        text1: 'Sem conexão a internet.',
        text2: 'Sua ação será consolidada assim que tiver acesso a internet.',
      })
    },
  }),
})

export default function App() {
  if (!RealmProvider) return null

  return (
    <>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      {/* @ts-ignore */}
      <RealmProvider>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <ChecklistsProvider>
            <Routes />
          </ChecklistsProvider>
        </QueryClientProvider>
      </RealmProvider>
      <Toast position="bottom" />
    </>
  )
}
