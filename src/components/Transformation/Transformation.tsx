import React, { useContext, useEffect } from "react";
import {
  ActionParams,
  SourceParams,
  MouseEvent,
  TransformationRootParams,
} from "../../interfaces/interfaces";
import { Source } from "../Source/Source";
import { Action } from "../Action/Action";
import { Target } from "../Target/Target";
import { StateWidthContext } from "../../context/StateWidthProvider";
import { getDeepestChildren } from "../../utils/getTransformations";
import { depthFirstSearch } from "../../utils/depthFirstSearch";

export const Transformation = ({
  transformationProps, graph, currentTransformations, transformationIndex, selectNode,
}: TransformationRootParams) => {
  const { sources, actions, target } = transformationProps;
  const tree = [...actions, ...sources, target]; // convert to single array with objects

  const { windowHeight, windowWidth } = useContext(StateWidthContext).windowSize;

  useEffect(() => {
    if (graph) {
      tree.forEach((treeNodes) => {
        if ("prev" in treeNodes) {
          getDeepestChildren(graph, treeNodes);
        }
      });

      [...graph.children].forEach(({ children }) => {
        depthFirstSearch({
          graph: [...children], rootNode: target, tree,
        });
      });
    }
  }, [windowWidth, windowHeight, currentTransformations]);

  return (
    <div
      className="graph"
      onClick={(event: MouseEvent<HTMLElement>) => selectNode(event, transformationIndex)}
    >
      <div className="graph__sources">
        {sources.map(({ id }: SourceParams) => (
          <Source
            key={id}
            id={id}
          />
        ))}
      </div>
      <div className="graph__actions">
        {actions.map(({ id }: ActionParams) => (
          <Action
            key={id}
            id={id}
          />
        ))}
      </div>
      <div className="graph__targets">
        <Target
          key={target.id}
          id={target.id}
        />
      </div>
    </div>
  );
};
