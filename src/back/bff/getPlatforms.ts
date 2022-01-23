import { postData } from '../../lib/fetch'
import { IPlatformData } from '../../stores/app'
import { groupBy } from 'lodash'

export const getPlatforms = async (path: string): Promise<IPlatformData[]> => {
  const res = await postData('/getPlatforms', { path })

  const assetsArray = groupBy(res.LaunchBox.PlatformFolder, 'Platform')

  return res.LaunchBox.Platform.map((platform: Record<string, string>) =>
    transformPlatform(platform, assetsArray)
  )
}

const transformPlatform = (
  platform: Record<string, string>,
  assets: { [key: string]: Record<string, string>[] }
): IPlatformData => {
  return {
    name: platform.Name,
    releaseDate: platform.ReleaseDate,
    developer: platform.Developer,
    manufacturer: platform.Manufacturer,
    notes: platform.Notes,
    assets: assets[platform.Name].map((asset: Record<string, string>) => ({
      mediaType: asset.MediaType,
      folder: asset.FolderPath,
    })),
  }
}
