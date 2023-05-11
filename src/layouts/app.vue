<template>
  <div class="wrapper">
    <div class="top">
      <Navbar />
    </div>

    <div class="center">
      <div class="container py-4">
        <router-view />
      </div>
    </div>

    <div class="bottom">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "top" "center" "bottom";
  min-height: 100vh;
}

.top {
  grid-area: "top";
}

.center {
  grid-area: "center";
}

.bottom {
  grid-area: "bottom";
}
</style>
