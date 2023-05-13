<script setup lang="ts">
const { isMobile, isTablet, isDesktop, isTabletOrHigher } = useBreakpoints();
const { count } = storeToRefs(useCounterStore());
const { increment, decrement } = useCounterStore();
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold">Home</h1>
    <p v-if="isMobile">This text should be visible on mobile</p>
    <p v-if="isTablet">This text should be visible on tablet</p>
    <p v-if="isDesktop">This text should be visible on desktop</p>
    <p
      v-if="isTabletOrHigher"
      class="text-sm italic text-gray-500"
    >
      This text should be visible on tablet or higher
    </p>
    <div>
      <button @click="decrement">-</button>
      <span class="inline-block px-2">{{ count }}</span>
      <button @click="increment">+</button>
    </div>
  </main>
</template>

<route lang="yaml">
name: Home
meta:
  layout: app
</route>
