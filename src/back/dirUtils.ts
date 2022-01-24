/**
 * Flow
 * - pick Launchbox base directory
 * - read platform list
 */

import fs from 'fs'
import parser from 'xml2json'
import { IPlatform } from '../stores/app'

enum File {
  Platforms = 'Data/Platforms.xml',
}

enum Dir {
  Platforms = 'Data/Platforms',
  Games = 'Games',
  NewPegasusDataStructure = 'Pegasus',
}

export const readFilesInDir = (dir: string) => {
  const directoryPath = dir

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    files.forEach(function (file) {
      console.log(file)
    })
  })
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
  const dirsToCreate = [
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

  const assetsDir = {
    boxFront: ['Box - Front', 'Box - Front - Reconstructed'],
    boxBack: ['Box - Back', 'Box - Back - Reconstructed'],
    boxSpine: null,
    box: 'Box - 3D',
    cartridge: 'Cart - 3D',
    logo: 'Clear Logo',
    marquee: 'Arcade - Marquee',
    bezel: 'Arcade - Cabinet',
    panel: 'Arcade - Control Panel',
    banner: 'Banner',
    background: 'Screenshot - Game Title',
    music: '',
    screenshot: 'Screenshot - Gameplay',
    titlescreen: 'Screenshot - Game Title',
    video: '',
  }

  cleanDir(baseDir)
  await createFolderStructure(baseDir, dirsToCreate, platformData)
  await copyRomFiles(baseDir, platformData)

  return { response: 200 }
}

const createFolderStructure = async (
  baseDir: string,
  dirs: string[],
  platformData: IPlatform[]
) => {
  if (!fs.existsSync(`${baseDir}/${Dir.NewPegasusDataStructure}`)) {
    fs.mkdirSync(`${baseDir}/${Dir.NewPegasusDataStructure}`)
  }

  platformData.forEach(async (platform) => {
    fs.mkdirSync(`${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}`)

    await Promise.all(
      dirs.map((dir) =>
        fs.promises.mkdir(
          `${baseDir}/${Dir.NewPegasusDataStructure}/${platform.name}/${dir}`
        )
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
