import type { ApiChecklistItem } from '../services/api'

export default function remoteParser(remoteChecklist: ApiChecklistItem) {
  return {
    id: remoteChecklist._id ?? 100000,
    type: remoteChecklist.type,
    milkProduced: Number(remoteChecklist.amount_of_milk_produced),
    cowsHead: Number(remoteChecklist.number_of_cows_head),
    farmerCity: remoteChecklist.farmer.city,
    farmerName: remoteChecklist.farmer.name,
    from: remoteChecklist.from.name,
    to: remoteChecklist.to.name,
    hadSupervision: remoteChecklist.had_supervision,
    latitude: remoteChecklist.location.latitude,
    longitude: remoteChecklist.location.longitude,
    createdAt: remoteChecklist.created_at,
    updatedAt: remoteChecklist.updated_at,
    isSynced: true,
  }
}