<script setup lang="ts">
import generatedRotues from "virtual:generated-pages";

import Logo from "@/assets/img/logo.svg?component";

const routes = generatedRotues.filter(route => !/^\/:all\(\.\*\)\*$/.test(route.path));
</script>

<template>
  <nav class="navbar h-[64px] border-b bg-gray-50">
    <div class="container flex h-full items-center justify-between">
      <router-link
        v-slot="{ navigate }"
        custom
        to="/"
      >
        <DivButton
          class="text-primary-500 dark:text-primary-300"
          :press="navigate"
        >
          <Logo class="h-6" />
          <span class="sr-only">{{ $appName }}</span>
        </DivButton>
      </router-link>

      <ul class="flex items-center gap-4">
        <template
          v-for="(route, i) in routes"
          :key="i"
        >
          <li>
            <router-link :to="route.path">
              {{ route.name }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
