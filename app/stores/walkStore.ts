import { defineStore } from "pinia";
import { ref } from "vue";
import type { AppTypes } from "~/types/app";

export const useWalkStore = defineStore("useWalkStore", () => {
  const walks = ref<AppTypes.WalkWithOrganiserJs[]>([]);
  const supabase = useSupabaseClient();

  // Fetch all walks
  const fetchWalks = async () => {
    const { data: walkData, error: walksError } = await supabase.from("walks").select("*");
    const { data: profileData, error: profilesError } = await supabase.from("profiles").select("*");

    console.log(walkData);
    if (walksError) throw walksError;
    if (profilesError) throw walksError;

    const mappedWalks = walkData.map((w: AppTypes.walk) => ({
      ...w,
      organiser: profileData.find((p: AppTypes.user) => p.id === w.organiser.id) ?? null,
    }));

    walks.value = mappedWalks;
  };

  const seedWalks = () => {
    let walksToDelete: AppTypes.WalkWithOrganiserJs[] = [];
    if (walks.value.length > 0) {
      const today = new Date(Date.now()).toISOString();
      let isodates = [];
      let stringDates = [];
      for (const { walkDate } of walks.value) {
        const isoDate = new Date(walkDate).toISOString();
        isodates.push(isoDate);
        stringDates.push(walkDate);
      }

      isodates.forEach((date, index) => {
        if (date < today) {
          const oldWalk = walks.value.find((w) => w.walkDate === stringDates[index]);
          if (oldWalk) {
            walksToDelete.push(oldWalk);
          }
        }
      });

      walksToDelete.forEach((walk) => {
        try {
          const response = supabase.from("walks").delete().eq("id", walk.id);
        } catch (error) {
          console.error(`could not find walk to delete ${error}`);
        }
      });
    }
  };
  // Get walk by ID
  const getWalkById = async (id: number) => {
    await fetchWalks();
    return walks.value.find((w) => w.id === id);
  };

  // Update a walk
  const updateWalk = async (walk: AppTypes.walk) => {
    try {
      const updates: AppTypes.walk = {
        postcode: walk.postcode,
        date: walk.date,
        location: walk.location,
        description: walk.description,
        organiser: walk.organiser, // FK
        id: walk.id,
        organiserId: walk.organiser.id,
      };

      const { data, error } = await supabase.from("walks").update(updates).eq("id", walk.id).select();

      if (error) throw error;

      console.log("Updated walk:");
    } catch (err) {
      console.error("Error updating walk:", err);
    }
  };

  const createWalk = async (walkObj: AppTypes.walk) => {
    try {
      const updates = {
        starting_postcode: walkObj.postcode,
        date: walkObj.date,
        location: walkObj.location,
        description: walkObj.description,
        organiser: walkObj.organiser.id,
      };
      const { data, error } = await supabase.from("walks").insert(updates);
      if (error) throw error;

      console.log("Updated walk: ", data);
    } catch (err) {
      console.error("Error updating walk:", err);
    }
  };

  return { walks, fetchWalks, getWalkById, updateWalk, createWalk, seedWalks };
});
