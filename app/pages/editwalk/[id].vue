<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWalkStore } from "~/stores/walkStore";
import type { AppTypes } from "~/types/app";

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
  organiserId: "",
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

const submitForm = () => {
  walkStore.updateWalk(walkObj);
};
</script>

<template>
  <h1>Edit {{ walkObj.location }}</h1>

  <form class="flex flex-col gap-4" @submit.prevent="submitForm">
    <div>
      <label for="date">Date</label>
      <input id="date" type="date" v-model="walkObj.date" class="border-2 border-black" />
    </div>

    <div>
      <label for="location">Location</label>
      <input id="location" type="text" v-model="walkObj.location" class="border-2 border-black" />
    </div>

    <div>
      <label for="postcode">Postcode</label>
      <input id="postcode" type="text" v-model="walkObj.postcode" class="border-2 border-black" />
    </div>

    <div>
      <label for="organiser-name">Organiser Name</label>
      <input id="organiser-name" v-model="walkObj.organiser.name" class="border-2 border-black" />
    </div>

    <div>
      <label for="organiser-email">Organiser Email</label>
      <input id="organiser-email" v-model="walkObj.organiser.email" class="border-2 border-black" />
    </div>

    <input type="submit" value="Save" class="border-2 border-teal-200" />
  </form>
</template>
