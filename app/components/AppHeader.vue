<script setup lang="ts">
const user = useSupabaseUser()
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
  <header class="w-full h-40 bg-teal-950 text-white">
    <div class="">Walking group</div>
    <nav>
      <ul>
        <li v-if="user"><NuxtLink to="/schedule">Schedule</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/createwalk">Add Walk</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/login">Login</NuxtLink></li>
        <li v-if="user"><button class="cursor-pointer" @click="logout">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>
