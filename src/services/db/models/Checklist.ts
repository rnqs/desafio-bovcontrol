import { Realm } from '@realm/react'

interface ChecklistParams {
  id: number
  type: string
  milkProduced: number
  cowsHead: number
  hadSupervision: boolean
  farmerName: string
  farmerCity: string
  from: string
  to: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
  isSynced: boolean
}

export class Checklist extends Realm.Object {
  id!: number
  type!: string
  milkProduced!: number
  cowsHead!: number
  hadSupervision!: boolean
  farmerName!: string
  farmerCity!: string
  from!: string
  to!: string
  latitude!: number
  longitude!: number
  createdAt!: Date
  updatedAt!: Date
  isSynced!: boolean

  static generate(data: ChecklistParams) {
    const {
      id,
      type,
      milkProduced,
      cowsHead,
      hadSupervision,
      farmerName,
      farmerCity,
      from,
      to,
      latitude,
      longitude,
      createdAt,
      updatedAt,
    } = data

    return {
      id,
      type,
      milkProduced,
      cowsHead,
      hadSupervision,
      farmerName,
      farmerCity,
      from,
      to,
      latitude,
      longitude,
      createdAt,
      updatedAt,
    }
  }

  static schema = {
    name: 'Checklist',
    primaryKey: 'id',
    properties: {
      id: 'int',
      type: 'string',
      milkProduced: 'int',
      cowsHead: 'int',
      hadSupervision: 'bool',
      farmerName: 'string',
      farmerCity: 'string',
      from: 'string',
      to: 'string',
      latitude: 'double',
      longitude: 'double',
      createdAt: 'date',
      updatedAt: 'date',
      isSynced: { type: 'bool', default: false },
    },
  }
}
