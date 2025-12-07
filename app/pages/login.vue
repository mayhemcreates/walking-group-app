<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(false);
const email = ref("");
const password = ref("");


const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
    if (error) throw error;
    alert("");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <form class="flex justify-center gap-10" @submit.prevent="handleLogin">
    <div class="">
      <label for="email">email</label>
      <input class="border-black border-2" type="text" id="email" v-model="email"/>
    </div>
    <div>
      <label for="password">password</label>
      <input class="border-black border-2" type="text" id="password" v-model="password"/>
    </div>
    <input type="submit" class="w-20 border-amber-700 border-2" :value="loading ? 'Loading' : 'sign in'" :disabled="loading" />
  </form>
</template>
