import React from 'react'
import { View, FlatList } from 'react-native'

import ChecklistItem from '../components/ChecklistItem'

import { useChecklists } from '../context/checklists'

export default function ListChecklistsScreen() {
  const {
    isRefreshing,
    localChecklists,
    updateLocalChecklists
  } = useChecklists()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={localChecklists}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 42 }}
        refreshing={isRefreshing}
        onRefresh={() => updateLocalChecklists()}
        keyExtractor={(checklist) => String(checklist.id)}
        renderItem={({ item }) => <ChecklistItem itemData={item} />}
      />
    </View>
  )
}
