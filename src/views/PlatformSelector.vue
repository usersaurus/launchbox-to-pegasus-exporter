<template>
  <suspense>
    <template #default>
      <template v-for="(platform, i) in platforms" :key="i">
        <input
          v-model="selectedPlatforms"
          type="checkbox"
          :name="platform.name"
          :value="i"
        />
        {{ platform.name }}
      </template>
    </template>
    <template #fallback> Loading... </template>
  </suspense>
</template>

<script setup lang="ts">
import { getPlatforms } from '../back/bff/getPlatforms'
import { IPlatformData, useAppStore } from '../stores/app'
import { onBeforeMount, ref, onBeforeUnmount } from 'vue'

const store = useAppStore()
const platforms = ref<IPlatformData[]>([])
const selectedPlatforms = ref<string[]>([])

onBeforeMount(async () => {
  platforms.value = await getPlatforms(store.launchboxPath)
  store.platformList = platforms.value
})

onBeforeUnmount(() => {
  store.selectedPlatforms = selectedPlatforms.value.map(
    (index) => platforms.value[parseInt(index)]
  )
})
</script>

<style></style>
