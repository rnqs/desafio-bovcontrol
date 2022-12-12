import * as React from 'react'
import { Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

export default function AddChecklistButton({ tintColor }: HeaderButtonProps) {
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
      onPress={() => navigation.navigate('NewChecklist')}
    >
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        color={tintColor}
        size={32}
      />
    </Pressable>
  )
}
