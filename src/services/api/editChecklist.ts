import { api, ApiChecklistItem } from '.'

interface ApiResponse {
  checkList: ApiChecklistItem
}

export default async function (
  data: ApiChecklistItem
): Promise<void> {
  try {
    const { id, ...rest } = data
    await api.put<ApiResponse>(`checkList/${id}`, rest)
  } catch (error) {
    throw new Error(error)
  }
}
