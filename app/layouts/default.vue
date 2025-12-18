<script setup lang="ts"></script>

<template>
  <div>
    <AppHeader />
    <div class="min-h-[calc(100vh-240px)] container p-4 lg:p-10 bg-orange-50">
      <div class="lg:px-[140px]">
        <div class="bg-slate-200 rounded-lg p-2 lg:p-10">
          <slot />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
