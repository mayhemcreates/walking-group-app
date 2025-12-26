<script setup lang="ts">
import type { AppTypes } from "../types/app";
import { useWalkStore } from "#imports";

const walkStore = useWalkStore();
const errorMessage = ref("");

const newWalk: AppTypes.walk = reactive({
  date: "",
  location: "",
  leader: "",
  postcode: "",
  organiser: { id: "", name: "", email: "" },
  description: "",
  id: 0,
  contact: "",
});

const submitWalk = async (walk: AppTypes.walk) => {
  const result = await walkStore.createWalk(walk);
  if (!result.success) {
    errorMessage.value = result.message ?? "";
  } else {
    errorMessage.value = "";
  }
};
</script>

<template>
  <h1>Add a walk</h1>

  <form class="flex flex-col lg:grid grid-cols-2 gap-y-2 gap-x-10" @submit.prevent="submitWalk(newWalk)">
    <div>
      <label for="date">Date</label>
      <input id="date" type="date" v-model="newWalk.date" class="bg-light-grey rounded w-full p-4 mt-2" min="2025-12-04" step="7" />
      <span class="text-red-900 bg-red-200">{{ errorMessage }}</span>
    </div>

    <div>
      <label for="location">Location</label>
      <input id="location" type="text" v-model="newWalk.location" class="bg-light-grey rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="postcode">Postcode</label>
      <input id="postcode" type="text" v-model="newWalk.postcode" class="bg-light-grey rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="organiser-name">Organiser Name</label>
      <input id="organiser-name" v-model="newWalk.leader" class="bg-light-grey rounded w-full p-4 mt-2" />
    </div>

    <div>
      <label for="organiser-email">contact</label>
      <input id="organiser-email" v-model="newWalk.contact" class="bg-light-grey rounded w-full p-4 mt-2" />
    </div>

    <input type="submit" value="Save" class="bg-teal-900 rounded-lg h-12 lg:self-end mt-5 lg:mt-0 text-white hover:bg-teal-800 cursor-pointer transition-colors delay-300 ease-in" />
  </form>
</template>
