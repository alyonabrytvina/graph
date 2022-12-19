import React from "react";
import "./Target.scss";
import { TargetChild } from "../../interfaces/interfaces";

export const Target = ({ targetName }: TargetChild) => (
  <div className={targetName}>
    {targetName}
  </div>
);
