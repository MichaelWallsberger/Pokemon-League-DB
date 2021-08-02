import React, { useState } from "react";
import { TimeEventTrainerMatches, useTrainerMatchesFromEvent } from "~/api";
import { Loading } from "../../ui/Loading";
import { TrainerMatch } from "@prisma/client";
import { EditTrainerMatch } from "./EditTrainerMatch";
import { EditCard } from "~/components/ui/EditCard";
import { BackButton } from "~/components/ui/BackButton";

interface EditMatchesProps {
  event: TimeEventTrainerMatches;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const EditMatches: React.FC<EditMatchesProps> = ({ event, setTab }) => {
  const { data: matchData, error: matchError } = useTrainerMatchesFromEvent(event.event);
  const [trainerMatch, setTrainerMatch] = useState<TrainerMatch>(null);

  /* loading Data */
  if (!matchData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading matches from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (matchError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Matches from DB
      </div>
    );
  }

  return (
    <div className="">
      {/* render List of Trainer-Matches */}
      {trainerMatch == null && (
        <div>
          <BackButton setTab={() => setTab("")} />

          <div
            className="text-center grid gap-2 justify-items-center"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
          >
            {matchData.map((match: TrainerMatch) => {
              return (
                <EditCard
                  key={match.id}
                  keyCard={match.id}
                  onClick={() => {
                    setTrainerMatch(match);
                    setTab("edit");
                  }}
                  header={
                    <p className="mb-1">
                      {match.trainer1} <span className="font-normal">vs</span> {match.trainer2}
                    </p>
                  }
                  subtext={`Winner: ${match.winnerName}`}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* render Edit of Trainer-Match */}
      {trainerMatch != null && (
        <EditTrainerMatch trainerMatch={trainerMatch} setTab={setTrainerMatch} />
      )}
    </div>
  );
};
