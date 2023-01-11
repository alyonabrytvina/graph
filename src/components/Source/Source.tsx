import React from "react";
import "./Source.scss";
import { SourceParams } from "../../interfaces/interfaces";

export const Source = ({ id }: SourceParams) => (
  <div className={id}>
    {id}
  </div>
);
