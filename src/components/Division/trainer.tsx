import { TrainerMatch, Trainers } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface DivisionTrainerProps {
  trainer: Trainers;
  matchData: TrainerMatch[];
  index: number;
}

export const DivisionTrainer: React.FC<DivisionTrainerProps> = ({ trainer, matchData, index }) => {
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  useEffect(() => {
    let _wins = 0;
    let _loses = 0;

    matchData.forEach((match: TrainerMatch) => {
      // game hasn't played yet
      if (match.winnerName == null) return;

      // find out if you are the winner or loser of the match
      if (
        match.trainer1.toLowerCase() === trainer.name.toLowerCase() ||
        match.trainer2.toLowerCase() === trainer.name.toLowerCase()
      ) {
        if (match.winnerName === "") return;
        else if (match.winnerName.toLowerCase() === trainer.name.toLowerCase()) _wins++;
        else _loses++;
      }
    });

    setWins(_wins);
    setLoses(_loses);
  }, [matchData]);

  return (
    <div>
      <div className={"rooster-team " + (index > 0 ? "rooster-border-top-name" : "")}>
        <p className="rooster-team-name">
          {trainer.teamNr}: {trainer.name}
        </p>
        <div className="rooster-team-scores ">
          <p className="rooster-team-games-won">{wins}</p>
          <p className="rooster-team-games-lost">{loses}</p>
        </div>
      </div>
    </div>
  );
};
