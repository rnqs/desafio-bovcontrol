import { api, ApiChecklistItem } from '.'

interface ApiResponse {
  checkList: ApiChecklistItem
}

export default async function (id: number | string): Promise<void> {
  try {
    await api.delete<ApiResponse>(`checkList/${id}`)
  } catch (error) {
    throw new Error(error)
  }
}
