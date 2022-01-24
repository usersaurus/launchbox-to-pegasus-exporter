import { postData } from '../../lib/fetch'
import { IPlatform } from '../../stores/app'

export const createMetadata = async (
  path: string,
  platforms: IPlatform[]
): Promise<JSON> => {
  const res = (await postData('/createMetadata', { path, platforms })) as JSON

  return res
}
