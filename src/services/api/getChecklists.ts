import { api, ApiChecklistItem } from '.'

export default async function(): Promise<ApiChecklistItem[]> {
  try {
    const { data } = await api.get<ApiChecklistItem[]>('checkList')

    return data
  } catch (error) {
    throw new Error(error)
  }
}
