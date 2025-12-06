<script setup>
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabasePublishableKey);

const walks = ref([]);

async function getSchedule() {
  const { data } = await supabase.from("Walks").select();

  walks.value = data;
  console.log(walks.value);
}

onMounted(() => {
  getSchedule();
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
