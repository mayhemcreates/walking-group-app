<script setup lang="ts">
import { useWalkStore } from "../stores/walkStore";
import { storeToRefs } from "pinia";

const walkStore = useWalkStore();
const { walks } = storeToRefs(walkStore);
const evenRowClass = "bg-slate-200";
walkStore.seedWalks();
walkStore.fetchWalks();
const lineClamp = ref("line-clamp-2");
const accordionText = ref("more");
const accordionIcons = {
  closed: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" fill="white"/></svg>',
  open: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-h h-4"><path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" fill="white"/></svg>',
};

const currentAccordionIcon = ref(accordionIcons.closed);
const sortedWalks = computed(() => {
  return [...walks.value].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
});

const renderAccordion = (locationText: string | null) => {
  if (!locationText) return;
  const textArray = locationText.split("");
  if (textArray.length > 40) {
    return true;
  }
};

const expandAccordion = () => {
  if (lineClamp.value === "line-clamp-2") {
    lineClamp.value = "";
    accordionText.value = "less";
    currentAccordionIcon.value = accordionIcons.open;
  } else {
    lineClamp.value = "line-clamp-2";
    accordionText.value = "more";
    currentAccordionIcon.value = accordionIcons.closed;
  }
};

const generateMapLink = (postcode: string | null) => {
  if (postcode) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postcode)}`;
  }
};
const formatDate = (walkDate: string, isMob: boolean) => {
  const newDate = new Date(walkDate);
  let formattedDate;
  if (isMob) {
    formattedDate = newDate.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
  } else {
    formattedDate = newDate.toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  }
  return formattedDate;
};
</script>

<template>
  <h1>Walk Schedule</h1>
  <h2 class="md:hidden mb-4">Click the telephone icon to call the walk leader</h2>

  <div class="flex justify-center">
    <table class="w-full rounded bg-grey-green table-fixed">
      <thead>
        <tr class="lg:text-lg">
          <th>Date</th>
          <th class="hidden lg:table-cell">Location</th>
          <th>Postcode</th>
          <th>Contact</th>
          <th>Leader</th>

          <th class="hidden lg:table-cell">Edit Walk</th>
          <th class="hidden lg:table-cell">Remove Walk</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(walk, index) in sortedWalks" :key="`walk-${index}`" :class="[index % 2 ? '' : 'bg-light-grey']">
          <td :class="[index === sortedWalks.length - 1 ? 'rounded-bl-lg' : '']" class="text-center lg:hidden">{{ formatDate(walk.date, true) }}</td>
          <td :class="[index === sortedWalks.length - 1 ? 'rounded-bl-lg' : '']" class="hidden lg:table-cell text-center">{{ formatDate(walk.date, false) }}</td>
          <td class="hidden lg:table-cell">
            <span :class="lineClamp">{{ walk.location }}</span>
            <button class="flex items-center gap-2 cursor-pointer bg-dark-blue text-white rounded px-3 py-2 group text-xs hover:bg-grey-blue transition-colors delay-300 ease-in" @click="expandAccordion" v-if="renderAccordion(walk.location)">Read {{ accordionText }} <span v-html="currentAccordionIcon"></span></button>
          </td>
          <td class="text-center">
            <a :href="generateMapLink(walk.postcode)">
              {{ walk.postcode }}
            </a>
          </td>
          <td :class="[index === sortedWalks.length - 1 ? 'rounded-br-lg' : '']" class="text-center">
            <span class="md:hidden">
              <a  v-if="walk.contact" :href="`tel:${walk.contact}`" class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 640 640">
                  <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" /></svg>
              </a>
            </span>
            <span class="hidden md:table">{{ walk.contact }}</span>
          </td>
          <td :class="[index === sortedWalks.length - 1 ? 'rounded-br-lg' : '']" class="text-center">{{ walk.leader }}</td>

          <td class="hidden lg:table-cell">
            <NuxtLink :to="`update/${walk.id}`" class="flex justify-center"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4"><path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" /></svg>
            </NuxtLink>
          </td>
          <td class="hidden lg:table-cell" :class="[index === sortedWalks.length - 1 ? 'rounded-br-lg' : '']">
            <NuxtLink :to="`delete/${walk.id}`" class="flex justify-center"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4">
                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" fill="black" />
              </svg>
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
td,
th {
  padding: 8px 0;
}

/* th {
  width: calc(100% / 7);
} */
</style>
