import { useGameStore } from "@/utils/store";
import supabase from "@/utils/supabase";
import { getStorageUserId, setStorageUserId } from "@/utils/utils";
import { useEffect } from "react";

export const usePlayer = () => {
  const { setCurrentPlayer } = useGameStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = getStorageUserId();

        if (userId) {
          const { data, error } = await supabase
            .from("players")
            .select("*")
            .eq("id", userId)
            .single();

          if (error) {
            console.error("Failed to load user:", error);
            return;
          }

          if (data) {
            setCurrentPlayer(data);

            await supabase
              .from("players")
              .update({ last_seen: new Date().toISOString() })
              .eq("id", data.id);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, [setCurrentPlayer]);

  const createPlayer = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("players")
        .insert([{ username }])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          console.error("Username already exists:", username);
        } else {
          console.error("Failed to create player:", error);
        }
        return false;
      }

      if (data) {
        setCurrentPlayer(data);
        setStorageUserId(data.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error creating player:", error);
      return false;
    }
  };

  return { createPlayer };
};
