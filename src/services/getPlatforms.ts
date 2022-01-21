import { postData } from '../lib/fetch'
import { IPlatformData } from '../stores/app'

export const getPlatforms = async (path: string): Promise<IPlatformData[]> => {
  const res = await postData('/getPlatforms', { path })

  return res.LaunchBox.Platform.map((platform: Record<string, string>) =>
    transformPlatform(platform)
  )
}

const transformPlatform = (platform: Record<string, string>): IPlatformData => {
  return {
    name: platform.Name,
    releaseDate: platform.ReleaseDate,
    developer: platform.Developer,
    manufacturer: platform.Manufacturer,
    notes: platform.Notes,
  }
}
