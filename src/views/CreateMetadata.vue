<template>Creating metadata...</template>

<script setup lang="ts">
import { createMetadata } from '../back/bff/createMetadata'
import { onMounted } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

onMounted(async () => {
  await createMetadata(store.launchboxPath, store.selectedPlatforms)
})
</script>

<style></style>
