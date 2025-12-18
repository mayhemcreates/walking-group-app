<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
  } catch (error) {
    console.error(`${error}`);
  } finally {
    router.push("/login");
  }
};
</script>
<template>
  <header class="w-full h-40 bg-teal-950 text-white px-10 py-4">
    <div class="flex justify-between">
      <div v-if="user"><NuxtLink to="/schedule">Walking Group</NuxtLink></div>
      <div v-else><NuxtLink to="/login">Walking Group</NuxtLink></div>

      <nav>
        <ul class="flex gap-4">
          <li v-if="user"><NuxtLink to="/schedule">Schedule</NuxtLink></li>
          <li v-if="user"><NuxtLink to="/createwalk">Add Walk</NuxtLink></li>
          <li v-if="!user"><NuxtLink to="/login">Login</NuxtLink></li>
          <li v-if="user"><button class="cursor-pointer" @click="logout">Logout</button></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
