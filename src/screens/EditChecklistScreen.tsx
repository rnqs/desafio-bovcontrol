import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import ChecklistForm from '../components/ChecklistForm'
import { useChecklists } from '../context/checklists'

import type { ChecklistFormData } from '../components/ChecklistForm'

export default function EditChecklistScreen() {
  const { id } = useRoute().params as { id: number }
  const navigation = useNavigation()

  const {
    localChecklists,
    editChecklist,
    updateLocalChecklists,
  } = useChecklists()

  const {
    latitude,
    longitude,
    farmerName,
    farmerCity,
    type,
    cowsHead,
    milkProduced,
    from,
    to,
    hadSupervision,
    createdAt,
  } = localChecklists?.find((checklist) => checklist.id === id)

  const onSubmit = (data: ChecklistFormData) => {
    const { hadSupervision, cowsHead, milkProduced, ...rest } = data
    editChecklist({
      ...rest,
      id,
      latitude,
      longitude,
      createdAt,
      hadSupervision: hadSupervision === 'Sim',
      cowsHead: parseInt(cowsHead),
      milkProduced: parseInt(milkProduced),
    })
    updateLocalChecklists()

    navigation.goBack()
  }

  return (
    <ChecklistForm
      onSubmit={onSubmit}
      defaultValues={{
        farmerCity,
        farmerName,
        type,
        from,
        to,
        hadSupervision: hadSupervision ? 'Sim' : 'Não',
        cowsHead: cowsHead.toString(),
        milkProduced: milkProduced.toString(),
      }}
    />
  )
}
