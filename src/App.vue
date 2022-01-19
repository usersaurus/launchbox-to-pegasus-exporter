<script setup lang="ts">
import PathSelector from './views/PathSelector.vue'
import PlatformSelector from './views/PlatformSelector.vue'
import GameSelector from './views/GameSelector.vue'
import { ref } from 'vue'

const step = ref(0)
const steps = [PathSelector, PlatformSelector, GameSelector]

fetch('/getPlatforms')
  .then((res) => res.json())
  .then((data) => {
    data.LaunchBox.Platform.forEach((platform: any) => {
      console.log(platform.Name)
    })
  })
</script>

<template>
  <component :is="steps[step]" />
  <button @click="step < 2 && step++">Next</button>
</template>

<style></style>
