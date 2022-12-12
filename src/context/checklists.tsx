import React, { useCallback, useContext, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import localParser from '../utils/localParser'
import remoteParser from '../utils/remoteParser'
import getChecklists from '../services/api/getChecklists'
import remoteEditChecklist from '../services/api/editChecklist'
import remoteCreateChecklist from '../services/api/createChecklist'
import remoteDeleteChecklist from '../services/api/deleteChecklist'
import { Checklist } from '../services/db/models/Checklist'
import Realm from '../services/db'

import type {
  ChecklistsContextType,
  CreateChecklistParams,
  EditChecklistParams,
} from './types'

export const ChecklistsContext = React.createContext<ChecklistsContextType>(
  {} as ChecklistsContextType
)

export const ChecklistsProvider: React.FC = ({ children }: any) => {
  const realm = Realm.useRealm()
  // @ts-ignore
  const result = Realm.useQuery(Checklist)

  const localChecklists = useMemo(() => {
    if (result.length === 0) return [] as Checklist[]

    return result.sorted('updatedAt', true)
  }, [result])

  const persister = createSyncStoragePersister({
    storage: global.localStorage,
  })

  const reactQueryClient = useQueryClient()

  const getChecklistsQuery = useQuery({
    queryKey: ['getChecklists'],
    queryFn: getChecklists,
    onSuccess: (remoteChecklists) => {
      realm.write(() => {
        realm.deleteAll()

        remoteChecklists.forEach((remoteChecklist) => {
          if (!remoteChecklist._id) return

          realm.create(
            'Checklist',
            // @ts-ignore
            Checklist.generate(remoteParser(remoteChecklist))
          )
        })
      })
    },
  })

  const createChecklistMutation = useMutation({
    mutationKey: ['createChecklist'],
    mutationFn: remoteCreateChecklist,
    onSuccess: () => {
      reactQueryClient.invalidateQueries({ queryKey: ['getChecklists'] })
    },
  })

  const editChecklistMutation = useMutation({
    mutationKey: ['editChecklist'],
    mutationFn: remoteEditChecklist,
    onSuccess: () => {
      reactQueryClient.invalidateQueries({ queryKey: ['getChecklists'] })
    },
  })

  const deleteChecklistMutation = useMutation({
    mutationKey: ['deleteChecklist'],
    mutationFn: remoteDeleteChecklist,
    onSuccess: () => {
      reactQueryClient.invalidateQueries({ queryKey: ['getChecklists'] })
    },
  })

  const isRefreshing = getChecklistsQuery.isFetching

  const updateLocalChecklists = () => getChecklistsQuery.refetch()

  const createChecklist = useCallback(
    (checklist: CreateChecklistParams): void => {
      const adicionalChecklistData = {
        id: Math.floor(Math.random() * 90000 + 10000),
        createdAt: new Date(),
        updatedAt: new Date(),
        isSynced: true,
      }

      realm.write(() => {
        realm.create(
          'Checklist',
          Checklist.generate({
            ...checklist,
            ...adicionalChecklistData,
          })
        )
      })

      createChecklistMutation.mutate([
        localParser({
          ...checklist,
          ...adicionalChecklistData,
        }),
      ])
    },
    [realm]
  )

  const editChecklist = useCallback(
    (checklist: EditChecklistParams): void => {
      const adicionalChecklistData = {
        updatedAt: new Date(),
        isSynced: true,
      }

      realm.write(() => {
        const realmObj = realm.objectForPrimaryKey(
          'Checklist',
          checklist.id
        ) as Checklist

        realmObj.updatedAt = adicionalChecklistData.updatedAt
        realmObj.farmerCity = checklist.farmerCity
        realmObj.farmerName = checklist.farmerName
        realmObj.type = checklist.type
        realmObj.from = checklist.from
        realmObj.to = checklist.to
        realmObj.hadSupervision = checklist.hadSupervision
        realmObj.cowsHead = checklist.cowsHead
        realmObj.milkProduced = checklist.milkProduced
      })

      editChecklistMutation.mutate(
        localParser({
          ...checklist,
          ...adicionalChecklistData,
        })
      )
    },
    [realm]
  )

  const deleteChecklist = useCallback(
    (id: number): void => {
      realm.write(() => {
        realm?.delete(realm?.objectForPrimaryKey('Checklist', id))
      })

      deleteChecklistMutation.mutate(id)
    },
    [realm]
  )

  return (
    <PersistQueryClientProvider
      client={reactQueryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        reactQueryClient.resumePausedMutations().then(() => {
          reactQueryClient.invalidateQueries()
        })
      }}
    >
      <ChecklistsContext.Provider
        value={{
          isRefreshing,
          localChecklists,
          updateLocalChecklists,
          createChecklist,
          editChecklist,
          deleteChecklist,
        }}
      >
        {children}
      </ChecklistsContext.Provider>
    </PersistQueryClientProvider>
  )
}

export const useChecklists = () => useContext(ChecklistsContext)
