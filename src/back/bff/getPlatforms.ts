import { postData } from '../../lib/fetch'
import { IPlatform } from '../../stores/app'
import { groupBy } from 'lodash'

export const getPlatforms = async (path: string): Promise<IPlatform[]> => {
  const res = await postData('/getPlatforms', { path })

  const assetsArray = groupBy(res.LaunchBox.PlatformFolder, 'Platform')

  return res.LaunchBox.Platform.map((platform: Record<string, string>) =>
    transformPlatform(platform, assetsArray)
  )
}

const transformPlatform = (
  platform: Record<string, string>,
  assets: { [key: string]: Record<string, string>[] }
): IPlatform => {
  const imageFolders: { [key: string]: string } = {
    boxFront: 'Box - Front',
    boxBack: 'Box - Back',
    box: 'Box - 3D',
    cartridge: 'Cart - 3D',
    logo: 'Clear Logo',
    marquee: 'Arcade - Marquee',
    bezel: 'Arcade - Cabinet',
    panel: 'Arcade - Control Panel',
    banner: 'Banner',
    background: 'Screenshot - Game Title',
    screenshot: 'Screenshot - Gameplay',
    titlescreen: 'Screenshot - Game Title',
    video: 'Video',
    music: 'Music',
  }

  const getPegasusFolder = (launchboxFolder: string) => {
    return Object.keys(imageFolders).find(
      (folder) => imageFolders[folder] === launchboxFolder
    )
  }

  return {
    name: platform.Name,
    releaseDate: platform.ReleaseDate,
    developer: platform.Developer,
    manufacturer: platform.Manufacturer,
    notes: platform.Notes,
    assets: assets[platform.Name].map((asset: Record<string, string>) => ({
      mediaType: asset.MediaType,
      folder: asset.FolderPath,
      pegasusFolder: getPegasusFolder(asset.MediaType),
    })),
    games: [],
  }
}
