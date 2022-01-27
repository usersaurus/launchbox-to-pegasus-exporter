import { defineStore, acceptHMRUpdate } from 'pinia'

/**
 * Game data structure
 */
export interface IGame {
  title: string
  platform: string
  /** Path to the rom game. Follows the format: `Games\[platform]\[game].[ext]` */
  path: string
  publisher: string
  version: string
  region: string
  notes: string
  rating: string
  releaseDate: string
}

/**
 * Current platforms are available in the Launchbox/Data/Platforms.xml file.
 */
export interface IPlatform {
  name: string
  releaseDate: string
  developer: string
  manufacturer: string
  notes: string
  assets?: {
    mediaType: string
    folder: string
    pegasusFolder: string | undefined
  }[]
  games: IGame[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    launchboxPath: '',
    availableGames: null as IPlatform | null,
    selectedGames: [] as IPlatform[],
    platformList: [] as IPlatform[],
    selectedPlatforms: [] as IPlatform[],
  }),

  actions: {
    setPath(path: string) {
      this.launchboxPath = path
    },

    setAvailableGames(games: IPlatform) {
      this.availableGames = games
    },

    setAvailablePlatforms(platforms: IPlatform[]) {
      this.platformList = platforms
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
