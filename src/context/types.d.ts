import { Checklist } from '../services/db/models/Checklist'
import Realm from '../services/db'

export interface CreateChecklistParams {
  latitude: number
  longitude: number
  farmerCity: string
  farmerName: string
  type: string
  from: string
  to: string
  hadSupervision: boolean
  cowsHead: number
  milkProduced: number
}

export interface EditChecklistParams {
  id: number
  latitude: number
  longitude: number
  createdAt: Date
  farmerCity: string
  farmerName: string
  type: string
  from: string
  to: string
  hadSupervision: boolean
  cowsHead: number
  milkProduced: number
}

export interface ChecklistsContextType {
  isRefreshing: boolean
  localChecklists: Checklist[] | Realm.Results<Checklist>
  updateLocalChecklists: () => void
  createChecklist: (checklist: CreateChecklistParams) => void
  editChecklist: (checklist: EditChecklistParams) => void
  deleteChecklist: (id: number) => void
}
