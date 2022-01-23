<template>
  <template v-for="(platform, index) in store.selectedPlatforms" :key="index">
    <div class="game-selector__platform" @click="currentPlatform = index">
      {{ platform.name }}
    </div>
  </template>
  <suspense>
    <template #default>
      <template v-for="(game, i) in games" :key="`${i}${game.title}`">
        <input
          v-model="store.selectedPlatforms[currentPlatform].games"
          type="checkbox"
          :name="game.title"
          :value="game"
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
import { onBeforeMount, ref, watchEffect } from 'vue'

const store = useAppStore()
const games = ref<IGame[]>([])
const currentPlatform = ref(0)

onBeforeMount(async () => {
  games.value = await getGames(
    store.launchboxPath,
    store.selectedPlatforms[currentPlatform.value].name
  )
})

watchEffect(async () => {
  games.value = await getGames(
    store.launchboxPath,
    store.selectedPlatforms[currentPlatform.value].name
  )
})
</script>

<style></style>
