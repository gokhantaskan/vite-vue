<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 class="mb-4 text-6xl font-bold">Oops!</h1>
    <router-view />
    <button @click="$router.push({ name: 'Home' })">Return home</button>
  </div>
</template>
