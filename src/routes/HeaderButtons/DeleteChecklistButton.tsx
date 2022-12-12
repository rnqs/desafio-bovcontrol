import * as React from 'react'
import { Alert, Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

import { useChecklists } from '../../context/checklists'

export default function DeleteChecklistButton({
  tintColor,
}: HeaderButtonProps) {
  const { id } = useRoute().params as { id: number }
  const navigation = useNavigation()

  const { deleteChecklist, updateLocalChecklists } = useChecklists()

  const handleDeleteChecklist = () =>
    Alert.alert(
      'Excluir Checklist',
      'Tem certeza que deseja excluir esse Checklist? Essa ação é irreversível.',
      [
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // @ts-ignore
            navigation.navigate('ListChecklists')
            setTimeout(() => {
              deleteChecklist(id)
              updateLocalChecklists()
            }, 1000)
          },
        },
        { text: 'Cancelar', style: 'default' },
      ]
    )

  return (
    <Pressable
      onPress={handleDeleteChecklist}
      android_ripple={{ borderless: true }}
      hitSlop={{
        top: 16,
        bottom: 16,
        right: 16,
        left: 16,
      }}
    >
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash-outline'}
        color={tintColor}
        size={24}
      />
    </Pressable>
  )
}
