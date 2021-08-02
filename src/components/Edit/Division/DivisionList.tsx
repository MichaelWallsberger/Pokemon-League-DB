import React, { useState } from "react";
import Head from "next/head";
import { useDivision } from "~/api";
import { Loading } from "../../ui/Loading";
import { Division } from "@prisma/client";
import { EditDivision } from "./EditDivision";
import { AddDivision } from "./AddDivision";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface DivisionListProps {}

export const DivisionList: React.FC<DivisionListProps> = () => {
  const { data: divisionData, error: divisionError } = useDivision();
  const [tab, setTab] = useState<string>("");
  const [division, setDivision] = useState<Division>();

  /* loading Data */
  if (!divisionData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading divisions from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (divisionError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Rules from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Divisions</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Divisions */}
            <AddButton text={"Add Division"} setTab={() => setTab("add")} />

            {/* Divisions */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {divisionData.map((divi: Division) => {
                return (
                  <EditCard
                    key={divi.name}
                    keyCard={divi.name}
                    onClick={() => {
                      setDivision(divi);
                      setTab("edit");
                    }}
                    header={`${divi.index}. ${divi.name}`}
                    subtext={`${divi.header}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditDivision division={division} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddDivision setTab={setTab} />}
      </main>
    </div>
  );
};
