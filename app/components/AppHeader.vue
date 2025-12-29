<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();
const mobNavIsOpen = ref(false);

const topLineClass = computed(() => (mobNavIsOpen.value ? "rotate-45 translate-y-0 bg-white" : "-translate-y-2.5"));
const bottomLineClass = computed(() => (mobNavIsOpen.value ? "-rotate-45 translate-y-0 bg-white" : "translate-y-2.5"));

const logout = async () => {
  mobNavIsOpen.value = false;
  try {
    const { error } = await supabase.auth.signOut();
  } catch (error) {
    console.error(`${error}`);
  } finally {
    router.push("/login");
  }
};

const toggleNav = () => {
  mobNavIsOpen.value = !mobNavIsOpen.value;
};
</script>
<template>
  <header class="h-auto shadow-2xl text-white px-5 lg:px-10 py-4">
    <div class="flex justify-between">
      <div v-if="user">
        <NuxtLink to="/schedule" class="flex">
          <span class="text-4xl w-1/2">Walking Group</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-20 h-20">
            <path d="M320 144C350.9 144 376 118.9 376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144zM233.4 291.9L256 269.3L256 338.6C256 366.6 268.2 393.3 289.5 411.5L360.9 472.7C366.8 477.8 370.7 484.8 371.8 492.5L384.4 580.6C386.9 598.1 403.1 610.3 420.6 607.8C438.1 605.3 450.3 589.1 447.8 571.6L435.2 483.5C431.9 460.4 420.3 439.4 402.6 424.2L368.1 394.6L368.1 279.4L371.9 284.1C390.1 306.9 417.7 320.1 446.9 320.1L480.1 320.1C497.8 320.1 512.1 305.8 512.1 288.1C512.1 270.4 497.8 256.1 480.1 256.1L446.9 256.1C437.2 256.1 428 251.7 421.9 244.1L404 221.7C381 192.9 346.1 176.1 309.2 176.1C277 176.1 246.1 188.9 223.4 211.7L188.1 246.6C170.1 264.6 160 289 160 314.5L160 352C160 369.7 174.3 384 192 384C209.7 384 224 369.7 224 352L224 314.5C224 306 227.4 297.9 233.4 291.9zM245.8 471.3C244.3 476.5 241.5 481.3 237.7 485.1L169.4 553.4C156.9 565.9 156.9 586.2 169.4 598.7C181.9 611.2 202.2 611.2 214.7 598.7L283 530.4C294.5 518.9 302.9 504.6 307.4 488.9L309.6 481.3L263.6 441.9C261.1 439.7 258.6 437.5 256.2 435.1L245.8 471.3z" fill="white" />
          </svg>
        </NuxtLink>
      </div>
      <div v-else><NuxtLink to="/login">Walking Group</NuxtLink></div>
      <button type="button" class="relative w-[25px] h-[25px] group lg:hidden z-50" aria-controls="mobile-nav" aria-label="open main menu" :aria-expanded="mobNavIsOpen" @click="toggleNav">
        <span aria-hidden="true" class="block absolute bg-white h-0.5 w-[25px] transform transition duration-300 ease-in- origin-center" :class="topLineClass"></span>
        <span aria-hidden="true" class="block absolute bg-white h-0.5 w-[25px] transform transition duration-300 ease-in-out" :class="[mobNavIsOpen ? 'hidden' : '']"></span>
        <span aria-hidden="true" class="block absolute bg-white h-0.5 w-[25px] transform transition duration-300 ease-in-out origin-center" :class="bottomLineClass"></span>
      </button>
      <nav :class="[mobNavIsOpen ? 'flex' : 'hidden']" class="fixed top-0 left-0 lg:static w-screen h-screen bg-teal-900 lg:bg-transparent lg:w-auto lg:h-auto lg:flex">
        <div class="flex justify-center w-full pt-20 lg:pt-0">
          <ul class="flex flex-col lg:flex-row gap-6">
            <li v-if="user">
              <NuxtLink @click.native="mobNavIsOpen = false" to="/schedule" class="flex items-center gap-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4">
                    <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" fill="white" />
                  </svg> </span
                >Schedule</NuxtLink
              >
            </li>
            <li v-if="user">
              <NuxtLink @click.native="mobNavIsOpen = false" to="/createwalk" class="flex items-center gap-2">
                <span class="relative border-2 border-white rounded-full w-4 h-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-2 h-2">
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" fill="white" />
                  </svg>
                </span>
                Add Walk</NuxtLink
              >
            </li>
            <li v-if="!user"><NuxtLink @click.native="mobNavIsOpen = false" to="/login">Login</NuxtLink></li>
            <li v-if="user">
              <button class="cursor-pointer flex items-center gap-2" @click="logout">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4">
                    <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" fill="white"/>
                  </svg> </span
                >Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
