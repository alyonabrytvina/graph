import React from "react";
import "./Source.scss";
import { SourceItem } from "../../interfaces/interfaces";

export const Source = ({ id }: SourceItem) => (
  <div className={id}>
    {id}
  </div>
);
