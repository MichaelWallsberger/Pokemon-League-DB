import React, { useEffect, useState } from "react";
import { iTrainer, useTrainer } from "~/api";
import { Loading } from "~/components/ui/Loading";
import { ParticipantTable } from "~/components/ui/ParticipantTable";

interface VsModeProps {}

export const VsMode: React.FC<VsModeProps> = () => {
  const [activeTrainer1, setActiveTrainer1] = useState<iTrainer>();
  const [activeTrainer2, setActiveTrainer2] = useState<iTrainer>();
  const { data: trainerData, error: trainerError } = useTrainer();

  // set first trainer when nothing is selected
  useEffect(() => {
    if (trainerData != null && trainerData[0] != null && activeTrainer1 == undefined) {
      setActiveTrainer1(trainerData[0]);
      setActiveTrainer2(trainerData[0]);
    }
  }, [trainerData]);

  if (trainerError != null) return <div>Error loading Participants... 😠</div>;
  if (trainerData == null) return <Loading />;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-2 md:gap-5">
      {activeTrainer1 != null && (
        <ParticipantTable
          trainerData={trainerData}
          trainer={activeTrainer1}
          setTrainer={setActiveTrainer1}
        />
      )}

      {activeTrainer2 != null && (
        <ParticipantTable
          trainerData={trainerData}
          trainer={activeTrainer2}
          setTrainer={setActiveTrainer2}
        />
      )}
    </div>
  );
};
