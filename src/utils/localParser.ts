import type { CreateChecklistParams } from '../context/types'

interface LocalChecklistItem extends CreateChecklistParams {
  id: number
  createdAt: Date
  updatedAt: Date
  isSynced: boolean
}

export default function localParser(localChecklist: LocalChecklistItem) {
  return {
    id: String(localChecklist.id),
    type: localChecklist.type,
    amount_of_milk_produced: localChecklist.milkProduced,
    number_of_cows_head: localChecklist.cowsHead,
    had_supervision: localChecklist.hadSupervision,
    farmer: {
      name: localChecklist.farmerName,
      city: localChecklist.farmerCity
    },
    from: {
      name: localChecklist.from
    },
    to: {
      name: localChecklist.to
    },
    location: {
      latitude: localChecklist.latitude,
      longitude: localChecklist.longitude
    },
    created_at: localChecklist.createdAt,
    updated_at: localChecklist.updatedAt
  }
}