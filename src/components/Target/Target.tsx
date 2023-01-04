import React, { useContext, useEffect } from "react";
import "./Target.scss";
import { depthFirstSearch } from "../../utils/depthFirstSearch";
import { TargetRoot } from "../../interfaces/interfaces";
import { Context } from "../../context/StateWidthProvider";

export const Target = ({
  graphRef, target, sources, actions, currentTransformation,
}: TargetRoot) => {
  const tree = [...actions, ...sources, target]; // convert to single array with objects
  const value = useContext(Context);
  const { windowWidth } = value;

  useEffect(() => {
    if (graphRef) {
      return [...graphRef.children].forEach(({ children }) => {
        depthFirstSearch({
          graph: children, rootNode: target, tree,
        });
      });
    }
  }, [windowWidth, currentTransformation]);

  return (
    <div className={target.id}>
      {target.id}
    </div>
  );
};
