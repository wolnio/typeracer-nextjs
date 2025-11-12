import { GameRound } from "@/interfaces";
import { getSentenceForRound } from "@/utils/sentences";
import { useGameStore } from "@/utils/store";
import supabase from "@/utils/supabase";
import { useCallback, useEffect, useRef } from "react";

export const useGame = () => {
  const { currentRound, setCurrentRound, setTimeRemaining, setCurrentInput } =
    useGameStore();

  const isCreatingRoundRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);

  const startNewRound = useCallback(
    async (roundNumber: number) => {
      console.log("Starting new round:", roundNumber);

      const sentence = getSentenceForRound(roundNumber);
      const now = new Date();
      const endsAt = new Date(now.getTime() + 60000); // 60 seconds from now

      // Deactivate old rounds
      const { error: deactivateError } = await supabase
        .from("game_rounds")
        .update({ is_active: false })
        .eq("is_active", true);

      if (deactivateError) {
        console.error("Error deactivating old rounds:", deactivateError);
      }

      // Delete old sessions
      const { error: deleteError } = await supabase
        .from("active_sessions")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

      if (deleteError) {
        console.error("Error deleting old sessions:", deleteError);
      }

      const { data: newRound } = await supabase
        .from("game_rounds")
        .insert([
          {
            sentence,
            round_number: roundNumber,
            started_at: now.toISOString(),
            ends_at: endsAt.toISOString(),
            is_active: true,
          },
        ])
        .select()
        .single();

      if (newRound) {
        setCurrentRound(newRound as GameRound);
        setCurrentInput("");
      }
    },
    [setCurrentRound, setCurrentInput]
  );

  //Subscribe to game round
  useEffect(() => {
    console.log("useGame hook initialized");

    const fetchCurrentRound = async () => {
      const { data: currentRound } = await supabase
        .from("game_rounds")
        .select("*")
        .eq("is_active", true)
        .single();

      if (currentRound) {
        const endsAt = new Date(currentRound.ends_at).getTime();
        const now = new Date().getTime();
        const timeLeft = endsAt - now;

        if (timeLeft <= 0) {
          if (!isCreatingRoundRef.current) {
            isCreatingRoundRef.current = true;
            await startNewRound(currentRound.round_number + 1);
            isCreatingRoundRef.current = false;
          }
        } else {
          setCurrentRound(currentRound as GameRound);
        }
      } else {
        if (!isCreatingRoundRef.current) {
          isCreatingRoundRef.current = true;
          await startNewRound(1);
          isCreatingRoundRef.current = false;
        }
      }
    };

    fetchCurrentRound();

    //subscribe to round channel
    const roundChannel = supabase
      .channel("game_rounds_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_rounds" },
        (payload) => {
          console.log("Game round change received:", payload);
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            const newRound = payload.new as GameRound;
            if (newRound.is_active) {
              setCurrentRound(newRound);
              sessionIdRef.current = null;
            }
          }
        }
      )
      .subscribe();

    return () => {
      console.log("Unsubscribing from game rounds channel");
      roundChannel.unsubscribe();
    };
  }, [setCurrentRound, startNewRound]);

  //timer
  useEffect(() => {
    if (!currentRound) return;

    const checkRoundEnd = () => {
      const endsAt = new Date(currentRound.ends_at).getTime();
      const now = new Date().getTime();
      const timeLeft = Math.ceil((endsAt - now) / 1000);

      console.log("Time left:", timeLeft);

      setTimeRemaining(timeLeft);

      if (timeLeft <= 0 && !isCreatingRoundRef.current) {
        setTimeRemaining(0);
        isCreatingRoundRef.current = true;
        startNewRound(currentRound.round_number + 1);
        isCreatingRoundRef.current = false;
      }
    };

    // Check immediately
    checkRoundEnd();

    // Then check every second
    const interval = setInterval(checkRoundEnd, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentRound, setTimeRemaining, startNewRound]);

  return {};
};
