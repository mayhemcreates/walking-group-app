<script setup lang="ts">
import type { AppTypes } from "../types/app";
import { useWalkStore } from "#imports";

const walkStore = useWalkStore();
const errorMessage = ref("");

const newWalk: AppTypes.walk = reactive({
  date: "",
  location: "",
  postcode: "",
  organiser: { id: "", name: "", email: "" },
  description: "",
  id: 0,
  contact: "",
});

const submitWalk = async (walk:AppTypes.walk) => {
  const result = await walkStore.createWalk(walk);
  if (!result.success) {
    errorMessage.value = result.message ?? "";
  } else {
    errorMessage.value = "";
  }
};
</script>

<template>
  <div class="container p-10">
    <div class="px-[140px]">
      <div class="bg-slate-200 rounded-lg p-10">
        <h1>Add a walk</h1>

        <form class="grid grid-cols-2 gap-y-2 gap-x-10" @submit.prevent="submitWalk(newWalk)">
          <div>
            <label for="date">Date</label>
            <input id="date" type="date" v-model="newWalk.date" class="bg-white rounded w-full p-4 mt-2" min="2025-12-04" step="7" />
            <span class="text-red-900 bg-red-200">{{ errorMessage }}</span>
          </div>

          <div>
            <label for="location">Location</label>
            <input id="location" type="text" v-model="newWalk.location" class="bg-white rounded w-full p-4 mt-2" />
          </div>

          <div>
            <label for="postcode">Postcode</label>
            <input id="postcode" type="text" v-model="newWalk.postcode" class="bg-white rounded w-full p-4 mt-2" />
          </div>

          <div>
            <label for="organiser-name">Organiser Name</label>
            <input id="organiser-name" v-model="newWalk.organiser.name" class="bg-white rounded w-full p-4 mt-2" />
          </div>

          <div>
            <label for="organiser-email">Organiser Email</label>
            <input id="organiser-email" v-model="newWalk.organiser.email" class="bg-white rounded w-full p-4 mt-2" />
          </div>

          <input type="submit" value="Save" class="bg-teal-900 rounded-lg h-12 self-end text-white hover:bg-teal-800 cursor-pointer transition-colors delay-300 ease-in" />
        </form>
      </div>
    </div>
  </div>
</template>
