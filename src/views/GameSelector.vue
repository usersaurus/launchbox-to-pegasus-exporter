<template>
  <suspense>
    <template #default>
      <template v-for="(game, i) in games" :key="i">
        <input
          v-model="selectedGames"
          type="checkbox"
          :name="game.title"
          :value="i"
        />
        {{ game.title }}
      </template>
    </template>
    <template #fallback> Loading... </template>
  </suspense>
</template>

<script setup lang="ts">
import { getGames } from '../back/bff/getGames'
import { IGame, useAppStore } from '../stores/app'
import { onBeforeMount, ref, onBeforeUnmount } from 'vue'

const store = useAppStore()
const games = ref<IGame[]>([])
const currentPlatform = ref(0)
const selectedGames = ref<string[]>([])

onBeforeMount(async () => {
  games.value = await getGames(
    store.launchboxPath,
    store.selectedPlatforms[currentPlatform.value].name
  )
})
</script>

<style></style>
