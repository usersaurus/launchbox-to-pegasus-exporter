import { defineStore, acceptHMRUpdate } from 'pinia'


export interface IGame {
    title: string,
    platform: string,
    path: string,
    publisher: string,
    version: string,
    region: string,
    notes: string,
    rating: string,
    releaseDate: string
}

/**
 * Current platforms are available in the Launchbox/Data/Platforms.xml file.
 */
export interface IPlatformData {
    name: string,
    releaseDate: string,
    developer: string,
    manufacturer: string,
    notes: string,
    assets: [{ mediaType: string, folder: string }],
}

export interface IPlatform extends IPlatformData {
    games: [IGame]
}

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        launchboxPath: '',
        availableGames: null as IPlatform | null,
        selectedGames: [] as IPlatform[],
        platformList: [] as IPlatformData[],
    }),

    actions: {
        setPath(path: string) {
            this.launchboxPath = path
        },

        setAvailableGames(games: IPlatform) {
            this.availableGames = games
        },

        setAvailablePlatforms(platforms: IPlatformData[]) {
            this.platformList = platforms
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}