import React from "react";
import "./Source.scss";
import { SourceChild } from "../../interfaces/interfaces";

export const Source = ({ sourceName }: SourceChild) => (
  <div className={sourceName}>
    {sourceName}
  </div>
);
