import React from 'react'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'

import ChecklistForm from '../components/ChecklistForm'
import { useChecklists } from '../context/checklists'
import type { ChecklistFormData } from '../components/ChecklistForm'

export default function NewChecklistScreen() {
  const navigation = useNavigation()

  const { createChecklist, updateLocalChecklists } = useChecklists()

  const handleCreateNewChecklist = async (data: ChecklistFormData) => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') return onSubmit(data)

    let location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords

    createChecklist({
      farmerName: data.farmerName,
      farmerCity: data.farmerCity,
      type: data.type,
      from: data.from,
      to: data.to,
      latitude,
      longitude,
      hadSupervision: data.hadSupervision === 'Sim',
      cowsHead: parseInt(data.cowsHead),
      milkProduced: parseInt(data.milkProduced),
    })
    updateLocalChecklists()

    // @ts-ignore
    navigation.navigate('ListChecklists')
  }

  const onSubmit = (data: ChecklistFormData) => {
    Alert.alert(
      'Adicione sua localização para salvar',
      'Para salvar o checklist, você precisa permitir usar sua localização.',
      [
        {
          text: 'Ok, vou permitir',
          onPress: () => handleCreateNewChecklist(data),
        },
      ]
    )
  }

  return <ChecklistForm onSubmit={onSubmit} />
}
