import { postData } from '../../lib/fetch'
import { IGame } from '../../stores/app'

export const getGames = async (
  path: string,
  platform: string
): Promise<IGame[]> => {
  const res = await postData('/getGames', { path, platform })

  return res.LaunchBox.Game.map((game: Record<string, string>) =>
    transformGame(game)
  )
}

const transformGame = (game: Record<string, string>): IGame => {
  return {
    title: game.Title,
    platform: game.Platform,
    path: game.ApplicationPath,
    publisher: game.Publisher,
    version: game.Version,
    region: game.Region,
    notes: game.Notes,
    rating: game.StarRating,
    releaseDate: game.ReleaseDate,
  }
}
