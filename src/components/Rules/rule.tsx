import { Rule } from "@prisma/client";
import React from "react";
import { useRules } from "~/api";
import { Loading } from "../ui/Loading";

interface RulesProps {}

export const RuleContent: React.FC<RulesProps> = ({}) => {
  const { data: ruleData, error: ruleError } = useRules();

  if (ruleError != null) return <div>Error loading Rules... 😠</div>;
  if (ruleData == null) return <Loading />;

  return (
    <ol>
      {ruleData.map((rule: Rule, idx: number) => {
        return (
          <li
            key={idx}
            className="text-xl mb-5 p-2 text-black border-l-8 shadow-md"
            style={{
              backgroundColor: "rgb(243, 195, 195)",
              borderColor: "rgb(239, 68, 68)",
            }}
          >
            <p>
              {rule?.title != "" && <span className="font-bold underline">{rule.title}:</span>}{" "}
              {rule.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
};
