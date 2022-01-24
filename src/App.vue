<script setup lang="ts">
import PathSelector from './views/PathSelector.vue'
import PlatformSelector from './views/PlatformSelector.vue'
import GameSelector from './views/GameSelector.vue'
import CreateMetadata from './views/CreateMetadata.vue'
import { ref } from 'vue'

const step = ref(0)
const steps = [PathSelector, PlatformSelector, GameSelector, CreateMetadata]
</script>

<template>
  <component :is="steps[step]" />
  <button @click="step < 3 && step++">Next</button>
</template>

<style></style>
