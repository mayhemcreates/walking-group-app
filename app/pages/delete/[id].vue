<script setup lang="ts">
import type { AppTypes } from "~/types/app";
import { useWalkStore } from "#imports";

const route = useRoute();

const walkStore = useWalkStore();
const walkId = Number(route.params.id);
if (isNaN(walkId)) throw new Error("Invalid walk ID");

const walkObj = reactive<AppTypes.walk>({
  id: walkId,
  date: "",
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
</script>
<template>
  <h1>Are you sure you want to delete this walk?</h1>
  <h2>Location: {{ walkObj.location }}</h2>
  <h2>Date: {{ walkObj.date }}</h2>
  <button type="button" class="bg-teal-900 rounded-lg h-12 w-80 mt-5 text-white hover:bg-teal-800 cursor-pointer transition-colors delay-300 ease-in" @click="walkStore.deleteWalk(walkObj.id.toString())">Delete walk</button>
</template>
