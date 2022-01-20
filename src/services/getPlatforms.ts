import { IPlatformData } from '../stores/app'

export const getPlatforms = async (): Promise<IPlatformData[]> => {
  const res = await fetch('/getPlatforms')
  const data = await res.json()

  return data.LaunchBox.Platform.map((platform: Record<string, string>) =>
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
