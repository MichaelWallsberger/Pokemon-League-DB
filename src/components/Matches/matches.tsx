// import { Division as IDivision, Trainer } from "~/types";
import { TrainerMatch } from "@prisma/client";
import React from "react";
import { TimeEventTrainerMatches, useEventWithTrainerMatches } from "~/api";
import { Accordion } from "../ui/Accordion";
import { Loading } from "../ui/Loading";

interface MatchContentProps {}

const addConditionalCss = (match: TrainerMatch, trainer: string) => {
  if (match.winnerName === null) return "";

  return match.winnerName.toLowerCase() === trainer.toLowerCase() ? "match-won" : "match-lost";
};

const matchContent = (matchData) => {
  return (
    <div className="matches-trainer-container">
      {matchData.TrainerMatch.map((match: TrainerMatch, idx: number) => {
        return (
          <div key={idx} className="match">
            <p className={"team team-left " + addConditionalCss(match, match.trainer1)}>
              {match.trainer1}
            </p>
            <p className="vs">-</p>
            <p className={"team " + addConditionalCss(match, match.trainer2)}>{match.trainer2}</p>
          </div>
        );
      })}
    </div>
  );
};

export const MatchContent: React.FC<MatchContentProps> = () => {
  const { data: eventData, error: eventError } = useEventWithTrainerMatches();

  if (eventError != null) return <div>Error loading Matches... 😠</div>;
  if (eventData == null) return <Loading />;

  return (
    <div>
      <div className="matches-container">
        {eventData.map((matchData: TimeEventTrainerMatches) => {
          return (
            <Accordion
              key={matchData.header}
              header={matchData.header}
              content={matchContent(matchData)}
            />
          );
        })}
      </div>
    </div>
  );
};
