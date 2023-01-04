import React from "react";
import "./Action.scss";
import { ActionItem } from "../../interfaces/interfaces";

export const Action = ({ id }: ActionItem) => (
  <div className={id}>
    {id}
  </div>
);
