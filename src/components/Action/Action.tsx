import React from "react";
import "./Action.scss";
import { ActionParams } from "../../interfaces/interfaces";

export const Action = ({ id }: ActionParams) => (
  <div className={id}>
    {id}
  </div>
);
