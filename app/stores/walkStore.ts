import { defineStore } from "pinia";
import { ref } from "vue";
import type { AppTypes } from "~/types/app";
import { renderError } from "#imports";

export const useWalkStore = defineStore("useWalkStore", () => {
  const walks = ref<AppTypes.WalkWithOrganiserJs[]>([]);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const userStore = useUserStore();

  let message = "";
  // Fetch all walks
  const fetchWalks = async () => {
    const { data, error } = await supabase.from("walks").select(`
      contact, 
      date, 
      description, 
      id, 
      location, 
      organiser:profiles!walks_organiser_fkey(
      id,
        name, 
        email), 
      postcode`);
    if (error) throw error;

    const mappedWalks = data.map((w: AppTypes.walk) => ({
      ...w,
    }));

    walks.value = mappedWalks;
  };

  const seedWalks = () => {
    let walksToDelete: AppTypes.WalkWithOrganiserJs[] = [];
    if (walks.value.length > 0) {
      const today = new Date(Date.now()).toISOString();
      let isodates = [];
      let stringDates = [];
      for (const { date } of walks.value) {
        const isoDate = new Date(date).toISOString();
        isodates.push(isoDate);
        stringDates.push(date);
      }

      isodates.forEach((date, index) => {
        if (date < today) {
          const oldWalk = walks.value.find((w) => w.date === stringDates[index]);
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
      const updates = {
        contact: walk.contact,
        postcode: walk.postcode,
        date: walk.date,
        description: walk.description,
        location: walk.location,
        organiser: walk.organiser.id, // FK
        id: walk.id,
      } as AppTypes.walkObj as never;

      const { data, error } = (await supabase.from("walks").update(updates).eq("id", walk.id).select()) as { data: AppTypes.walk[] | null; error: any };

      if (error) throw error;
    } catch (err) {
      let error = err as AppTypes.Error;
      if (error.code === "23505") {
        message = "This date is already taken. Please pick another date";
      }
      return { success: false, message };
    }
    router.push("/schedule");
    return { success: true };
  };

  const createWalk = async (walkObj: AppTypes.walk): Promise<AppTypes.walkResult> => {
    try {
      const updates = {
        postcode: walkObj.postcode,
        date: walkObj.date,
        location: walkObj.location,
        description: walkObj.description,
        contact: walkObj.contact,
        organiser: userStore.user?.sub,
      } as AppTypes.walkObj as never;

      const { data, error } = await supabase.from("walks").insert(updates);
      if (error) throw error;
    } catch (err) {
      let error = err as AppTypes.Error;
      if (error.code === "23505") {
        message = "This date is already taken. Please pick another date";
      }
      return { success: false, message };
    }
    router.push("/schedule");
    return { success: true };
  };

  const deleteWalk = async (walkId: string) => {
    try {
      const { error } = await supabase.from("walks").delete().eq("id", walkId);
    } catch (error) {
      console.error(`${error}`);
    } finally {
      router.push("/schedule");
    }
  };

  return { walks, fetchWalks, getWalkById, updateWalk, createWalk, seedWalks, deleteWalk };
});
