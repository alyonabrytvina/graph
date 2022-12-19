import React from "react";
import "./Target.scss";

export interface TargetChild {
    targetName: string;
}

export const Target = ({ targetName }: TargetChild) => (
  <div className={targetName}>
    {targetName}
  </div>
);
