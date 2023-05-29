<template>
  <div class="border-t bg-gray-50 py-4">
    <div class="container">
      <p class="text-center">
        {{ $appName }}
        <span class="text-gray-500">{{ $appVersion }}</span>
        ©{{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>
