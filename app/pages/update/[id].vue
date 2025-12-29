<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWalkStore } from "~/stores/walkStore";
import type { AppTypes } from "~/types/app";

const route = useRoute();
const walkStore = useWalkStore();

const walkId = Number(route.params.id);
if (isNaN(walkId)) throw new Error("Invalid walk ID");
const errorMessage = ref("");

const walkObj = reactive<AppTypes.walk>({
  id: walkId,
  date: "",
  leader: "",
  postcode: "",
  location: "",
  description: "",
  organiser: { id: "", name: "", email: "" },
  contact: "",
});

onMounted(async () => {
  try {
    const walk = await walkStore.getWalkById(walkId);
    if (walk) {
      Object.assign(walkObj, walk);
    }
  } catch (error) {
    console.error("Failed to load walk:", error);
  }
});

const submitForm = async (walk: AppTypes.walk) => {
  const result = await walkStore.updateWalk(walk);
  if (!result.success) {
    errorMessage.value = result.message ?? "";
  } else {
    errorMessage.value = "";
  }
};
</script>

<template>
  <h1>Edit walk</h1>

  <form class="flex flex-col lg:grid grid-cols-2 gap-x-10 gap-y-2" @submit.prevent="submitForm(walkObj)">
    <div class="">
      <label for="date">Date</label>
      <input id="date" type="date" v-model="walkObj.date" class="bg-white rounded w-full p-4 mt-2" min="2025-12-04" step="7" />
      <span class="text-red-900 bg-red-200">{{ errorMessage }}</span>
    </div>

    <div>
      <label for="location">Location</label>
      <input id="location" type="text" v-model="walkObj.location" class="bg-white rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="postcode">Postcode</label>
      <input id="postcode" type="text" v-model="walkObj.postcode" class="bg-white rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="organiser-name">Leader</label>
      <input id="organiser-name" v-model="walkObj.leader" class="bg-white rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="organiser-email">Contact</label>
      <div class="text-xs">Enter a mobile contact mobile number in the format 07********* (no spaces)</div>
      <input id="organiser-email" v-model="walkObj.contact" class="bg-white rounded w-full p-4 mt-2" />
    </div>

    <input type="submit" value="Save" class="bg-teal-900 rounded-lg h-12 self-end text-white hover:bg-teal-800 cursor-pointer transition-colors delay-300 ease-in" />
  </form>
</template>
