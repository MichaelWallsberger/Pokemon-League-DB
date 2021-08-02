// import { Division as IDivision, Trainer } from "~/types";
import { Division, Trainers } from "@prisma/client";
import React from "react";
import { useDivision, useTrainerMatches } from "~/api";
import { Loading } from "../ui/Loading";
import { DivisionTrainer } from "./trainer";

interface DivisionContentProps {}

interface iDivision extends Division {
  Trainers: Trainers[];
}

export const DivisionContent: React.FC<DivisionContentProps> = () => {
  const { data: divisions, error: divError } = useDivision();
  const { data: eventData, error: eventError } = useTrainerMatches();

  if (divError != null || eventError != null)
    return <div>Error loading Divisions or Matches... 😠</div>;
  if (divisions == null || eventData == null) return <Loading />;

  return (
    <div>
      <div className="rooster-divisions-container">
        {divisions.map((divi: iDivision) => {
          return (
            <div
              key={divi.header}
              className="rooster-division"
              style={{
                background: divi.backgroundColor,
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: divi.borderColor,
              }}
            >
              <h2>{divi.header}</h2>
              <div className="rooster-teams">
                {divi.Trainers.map((trainer: Trainers, idx: number) => {
                  return (
                    <DivisionTrainer
                      key={trainer.name}
                      trainer={trainer}
                      matchData={eventData}
                      index={idx}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
