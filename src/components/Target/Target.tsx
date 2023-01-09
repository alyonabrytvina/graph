import React, { useContext, useEffect } from "react";
import "./Target.scss";
import { depthFirstSearch } from "../../utils/depthFirstSearch";
import { TargetRoot } from "../../interfaces/interfaces";
import { Context } from "../../context/StateWidthProvider";
import { getDeepestChildren } from "../../utils/getTransformation";

export const Target = ({
  graphRef, target, sources, actions, currentTransformation,
}: TargetRoot) => {
  const tree = [...actions, ...sources, target]; // convert to single array with objects
  const value = useContext(Context);
  const { windowWidth } = value;

  useEffect(() => {
    if (graphRef) {
      tree.forEach((treeNodes) => {
        if ("prev" in treeNodes) {
          getDeepestChildren(graphRef, treeNodes);
        }
      });

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
