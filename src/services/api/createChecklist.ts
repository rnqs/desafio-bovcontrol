import { api, ApiChecklistItem } from '.'

interface ApiResponse {
  checkLists: ApiChecklistItem[]
}

export default async function (
  data: ApiChecklistItem[]
): Promise<void> {
  try {
    await api.post<ApiResponse>('checkList', {
      checklists: data
    })
  } catch (error) {
    throw new Error(error)
  }
}
