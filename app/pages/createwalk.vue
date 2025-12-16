<script setup lang="ts">
import type { AppTypes } from "../types/app";
import { useWalkStore } from "#imports";

const walkStore = useWalkStore();

const newWalk: AppTypes.walk = reactive({
  date: "",
  location: "",
  postcode: "",
  organiser: { id: "", name: "", email: "" },
  description: "",
  id: 0,
  contact: "",
});

</script>
<template>
  <form class="flex flex-col items-center" @submit.prevent="walkStore.createWalk(newWalk)">
    <div>
      <label for="date">Date</label>
      <input id="date" type="date" v-model="newWalk.date" class="border-2 border-black" min="2025-12-04" step="7" />
    </div>

    <div>
      <label for="location">Location</label>
      <input id="location" type="text" v-model="newWalk.location" class="border-2 border-black" />
    </div>

    <div>
      <label for="postcode">Postcode</label>
      <input id="postcode" type="text" v-model="newWalk.postcode" class="border-2 border-black" />
    </div>

    <div>
      <label for="organiser-name">Organiser Name</label>
      <input id="organiser-name" v-model="newWalk.organiser.name" class="border-2 border-black" />
    </div>

    <div>
      <label for="organiser-email">Organiser Email</label>
      <input id="organiser-email" v-model="newWalk.organiser.email" class="border-2 border-black" />
    </div>

    <input type="submit" value="Save" class="border-2 border-teal-200" />
  </form>
</template>
