import * as React from 'react'
import { Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

export default function EditChecklistButton({ tintColor }: HeaderButtonProps) {
  const { id } = useRoute().params as { id: number }
  const navigation = useNavigation()

  return (
    <Pressable
      android_ripple={{ borderless: true }}
      hitSlop={{
        top: 16,
        bottom: 16,
        right: 16,
        left: 16,
      }}
      // @ts-ignore
      onPress={() => navigation.navigate('EditChecklist', { id })}
    >
      <Ionicons
        name={Platform.OS === 'ios'
          ? 'ios-create-outline'
          : 'md-create-outline'
        }
        color={tintColor}
        size={24}
      />
    </Pressable>
  )
}
