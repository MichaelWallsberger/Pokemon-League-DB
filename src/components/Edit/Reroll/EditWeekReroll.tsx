import React, { useState } from "react";
import { iPokemonReroll, iTimeEvent, useWeekRerolls } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { EditCard } from "~/components/ui/EditCard";
import typeColors from "~/styles/typeColors";
import { Loading } from "../../ui/Loading";
import { EditPokemonReroll } from "./EditPokemonReroll";

interface EditWeekRerollProps {
  week: iTimeEvent;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const EditWeekReroll: React.FC<EditWeekRerollProps> = ({ week, setTab }) => {
  const { data: rerollData, error: rerollError } = useWeekRerolls(week.event);
  const [reroll, setReroll] = useState<iPokemonReroll>(null);

  /* loading Data */
  if (!rerollData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading matches from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (rerollError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Matches from DB
      </div>
    );
  }

  return (
    <div className="">
      {/* render List of Trainer-Matches */}
      {reroll == null && (
        <div>
          <BackButton setTab={() => setTab("")} />

          <div
            className="text-center grid gap-2 justify-items-center"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
          >
            {rerollData.map((re: iPokemonReroll) => {
              return (
                <EditCard
                  key={re.id}
                  keyCard={re.id}
                  onClick={() => {
                    setReroll(re);
                    setTab("edit");
                  }}
                  header={`${re.typeName}`}
                  subtext={
                    <>
                      <span
                        className="p-1 rounded text-white"
                        style={{
                          backgroundColor: typeColors[re.typeName.toLowerCase()],
                          fontFamily: '"Roboto", sans-serif',
                        }}
                      >
                        {re.typeName}
                      </span>{" "}
                      {re.prevP.nameDisplay} {"->"} {re.newP.nameDisplay}
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      )}
      {/* render Edit of Trainer-Match */}
      {reroll != null && <EditPokemonReroll reroll={reroll} setTab={setReroll} />}
    </div>
  );
};
