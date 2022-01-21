<template>
  <p>Write the absolute path to your Launchbox folder</p>

  <input v-model="launchboxPath" type="text" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const launchboxPath = ref<string>('')

onBeforeUnmount(() => {
  store.launchboxPath = launchboxPath.value
})
</script>

<style></style>
