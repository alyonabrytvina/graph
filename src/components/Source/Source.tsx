import React from "react";
import "./Source.scss";

export interface SourceChild {
    sourceName: string;
}

export const Source = ({ sourceName }: SourceChild) => (
  <div className={sourceName}>
    {sourceName}
  </div>
);
