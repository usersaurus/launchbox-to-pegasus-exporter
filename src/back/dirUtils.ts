import fs from 'fs'
import parser from 'xml2json'
import { IGame, IPlatform } from '../stores/app'

enum File {
  Platforms = 'Data/Platforms.xml',
}

enum Dir {
  Platforms = 'Data/Platforms',
  Games = 'Games',
  NewPegasusDataStructure = 'Pegasus',
}

export const getCurrentPlatforms = async (baseDir: string) => {
  return fs.promises.readFile(`${baseDir}/${File.Platforms}`).then((data) => {
    const json = parser.toJson(data)

    return json
  })
}

export const getGames = async (baseDir: string, platform: string) => {
  return fs.promises
    .readFile(`${baseDir}/${Dir.Platforms}/${platform}.xml`)
    .then((data) => {
      const json = parser.toJson(data)

      return json
    })
}

export const createMetadata = async (
  baseDir: string,
  platformData: IPlatform[]
) => {
  cleanDir(baseDir)
  await createFolderStructure(baseDir, platformData)
  await copyRomFiles(baseDir, platformData)
  await copyAssets(baseDir, platformData)

  return { response: 200 }
}

const createFolderStructure = async (
  baseDir: string,
  platformData: IPlatform[]
) => {
  const dirs = [
    'boxFront',
    'boxBack',
    'boxSpine',
    'box',
    'cartridge',
    'logo',
    'marquee',
    'bezel',
    'panel',
    'banner',
    'background',
    'music',
    'screenshot',
    'titlescreen',
    'video',
  ]

  if (!fs.existsSync(`${baseDir}/${Dir.NewPegasusDataStructure}`)) {
    fs.mkdirSync(`${baseDir}/${Dir.NewPegasusDataStructure}`)
  }

  platformData.forEach((platform) => {
    fs.mkdirSync(`${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}`)

    dirs.forEach((dir) =>
      fs.mkdirSync(
        `${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}/${dir}`
      )
    )
  })
}

const copyRomFiles = async (baseDir: string, platformData: IPlatform[]) => {
  platformData.forEach(async (platform) => {
    const games = platform.games

    games.forEach(async (game) => {
      const romPath = `${baseDir}/${game.path}`
      const romName = game.path.split('\\').pop()

      if (fs.existsSync(romPath)) {
        fs.copyFileSync(
          romPath,
          `${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}/${romName}`
        )
      }
    })
  })
}

const cleanDir = (baseDir: string) => {
  fs.rmSync(`${baseDir}/${Dir.NewPegasusDataStructure}`, {
    recursive: true,
    force: true,
  })
}

const sanitizeGameName = (gameName: string) => {
  return gameName.replace(/[^a-zA-Z0-9-,! ]/g, '_')
}

const copyAssets = (baseDir: string, platformData: IPlatform[]) => {
  platformData.forEach((platform) => {
    const platformGames = platform.games
    const platformAssets = platform.assets

    platformGames.forEach((game) => {
      platformAssets?.forEach((asset) => {
        if (!asset.pegasusFolder) return
        let assetsFolder = `${baseDir}/${asset.folder}/${game.region
          .split(',')[0]
          .trim()}/`

        let filesInAssetFolder = getFileListFromFolder(assetsFolder)

        if (filesInAssetFolder) {
          copyAssetFile(
            filesInAssetFolder,
            game,
            assetsFolder,
            baseDir,
            asset,
            platform
          )
        } else {
          assetsFolder = `${baseDir}/${asset.folder}/`

          filesInAssetFolder = getFileListFromFolder(assetsFolder)

          if (filesInAssetFolder) {
            copyAssetFile(
              filesInAssetFolder,
              game,
              assetsFolder,
              baseDir,
              asset,
              platform
            )
          }
        }
      })
    })
  })
}

const getFileListFromFolder = (folder: string) => {
  return fs.existsSync(folder) && fs.readdirSync(folder)
}

const copyAssetFile = (
  filesInAssetFolder: string[],
  game: IGame,
  assetsFolder: string,
  baseDir: string,
  asset: {
    mediaType?: string
    folder: string
    pegasusFolder: string | undefined
  },
  platform: IPlatform
) => {
  const gameName = sanitizeGameName(game.title)
  const assetFile = filesInAssetFolder.find((file) => file.includes(gameName))

  if (assetFile) {
    fs.copyFileSync(
      `${assetsFolder}/${assetFile}`,
      `${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}/${asset.pegasusFolder}/${assetFile}`
    )
  }
}
