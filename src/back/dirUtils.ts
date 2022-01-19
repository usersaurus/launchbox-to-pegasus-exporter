/**
 * Flow
 * - pick Launchbox base directory
 * - read platform list
 */

import fs from 'fs'
import parser from 'xml2json'

enum File {
  Platforms = 'Data/Platforms.xml',
}

enum Dir {
  Platforms = 'Data/Platforms',
  Games = 'Games',
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
