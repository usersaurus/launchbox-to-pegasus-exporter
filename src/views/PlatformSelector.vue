<template>
  <template v-for="(platform, index) in platforms" :key="index">
    <input type="checkbox" :name="platform.name" />
    {{ platform.name }}
  </template>
</template>

<script setup lang="ts">
import { getPlatforms } from '../services/getPlatforms'
import { IPlatformData } from '../stores/app'
import { onBeforeMount, ref } from 'vue'

const platforms = ref<IPlatformData[]>([])

onBeforeMount(async () => {
  platforms.value = await getPlatforms()
})
</script>

<style></style>
