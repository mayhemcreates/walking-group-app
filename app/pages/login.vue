<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();
const loading = ref(false);
const email = ref("");
const password = ref("");

const passwordInputType = ref("password");
const toggleFill = ref("black");
const handleLogin = async () => {
  try {
    loading.value = true;
    await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
  } catch (e) {
    alert("issue signing in");
  } finally {
    router.push("/schedule");
    loading.value = false;
  }
};

const toggleVisibility = () => {
  passwordInputType.value = passwordInputType.value === "password" ? "text" : "password";
  toggleFill.value = toggleFill.value === "black" ? "grey" : "black";
};
</script>

<template>
  <h1>Sign In</h1>
  <form class="flex flex-col gap-10" @submit.prevent="handleLogin">
    <div class="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-10">
      <div class="">
        <label for="email">Email</label>
        <input class="bg-white rounded w-full p-4 mt-2" type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <div class="relative mt-2">
          <input class="bg-white rounded w-full p-4" :type="passwordInputType" id="password" v-model="password" />
          <div class="absolute right-1 h-5 w-5 top-1/2 -translate-1/2" @click="toggleVisibility">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" :fill="toggleFill" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <input type="submit" class="bg-teal-900 rounded-lg h-12 w-full lg:w-80 self-end text-white hover:bg-teal-800 cursor-pointer transition-colors delay-300 ease-in" :value="loading ? 'Loading' : 'Sign in'" :disabled="loading" />
  </form>
</template>
