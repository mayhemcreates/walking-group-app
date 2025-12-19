<script setup lang="ts"></script>

<template>
  <div class="gradient-green text-dark-blue">
    <AppHeader />
    <div class="min-h-[calc(100vh-240px)] p-4 lg:p-10 ">
      <div class="lg:px-[140px]">
        <div class="bg-light-green rounded-lg p-2 lg:p-10 shadow-2xl">
          <slot />
        </div>
      </div>
    </div>
    <!-- <AppFooter /> -->
  </div>
</template>
<style lang="css" scoped>
.gradient-green {
  background: rgba(10, 48, 66, 10.01);
  background: linear-gradient(157deg, rgba(10, 48, 66, 1) 0%, rgba(15, 117, 82, 1) 100%);
}

.gradient-blue {
background: #0E4A63;
background: radial-gradient(circle, rgba(14, 74, 99, 1) 0%, rgba(7, 35, 48, 1) 100%);
}
</style>
