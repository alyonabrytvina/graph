import React from "react";
import "./Target.scss";
import { TargetParams } from "../../interfaces/interfaces";

export const Target = ({ id }: TargetParams) => (
  <div className={id}>
    {id}
  </div>
);
