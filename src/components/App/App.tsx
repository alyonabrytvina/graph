import React, {
  useContext, useEffect, useRef, useState,
} from "react";
import "./App.scss";
import { Source } from "../Source/Source";
import { Action } from "../Action/Action";
import { Target } from "../Target/Target";
import {
  ActionItem, NodesList, SourceItem, Transformation,
} from "../../interfaces/interfaces";
import {
  cleanNodeLines,
  getCurrentTransformation,
} from "../../utils/getTransformation";
import { cleanNodes, getSelectedNode } from "../../utils/getSelectedNode";
import { hasJsonStructure } from "../../utils/hasJsonStructure";
import { Context } from "../../context/StateWidthProvider";

export const App = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  const [nodeList, setNodeList] = useState<NodesList[]>([]);
  const [currentTransformation, setCurrentTransformation] = useState<Transformation[]>([]);

  const [currentValue, setCurrentValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const value = useContext(Context);

  useEffect(() => {
    if (currentValue.length) {
      cleanNodeLines(graphRef.current!);

      const isJson = hasJsonStructure(currentValue);
      setIsError(!isJson);
      const parsedValue = isJson && JSON.parse(currentValue);
      if (typeof parsedValue !== "object") {
        setCurrentTransformation([]);
        return;
      }

      const {
        transformation,
        nodesList,
      }: { transformation: Transformation[]; nodesList: NodesList[] } = getCurrentTransformation(parsedValue)!;

      setCurrentTransformation(transformation);
      setNodeList(nodesList);
    } else {
      setCurrentValue("");
      setCurrentTransformation([]);
    }
  }, [currentValue, value?.windowWidth]);

  const selectNode = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const parent = ((event.target as HTMLElement).parentNode as HTMLDivElement).parentNode! as HTMLDivElement;

    if (parent.className === "graph") { // check for possibilities to select elements only inside graph
      const updatedList:NodesList[] = nodeList.map((node) => {
        const { isSelected, nodeIndex } = node;

        return (index === nodeIndex) ? {
          isSelected: !isSelected,
          nodeIndex: index,
        } : node;
      });
      setNodeList(updatedList);

      updatedList.forEach(({ isSelected, nodeIndex }) => {
        if (index === nodeIndex) {
          return getSelectedNode({ graph: parent, isSelected });
        }
      });
    }
  };

  const updateCurrentValue = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentValue !== event.target.value) {
      cleanNodes(graphRef.current!);
      setCurrentValue(event.target.value);
    }
  };

  return (
    <>
      <div>
        <span>Please, enter a valid JSON. For converting Object to JSON you can use the </span>
        <a
          href="https://www.convertsimple.com/convert-javascript-to-json/"
          target="_blank"
          rel="noreferrer"
        >
          link
        </a>
      </div>
      <textarea
        style={{
          borderColor: `${isError ? "red" : "black"}`,
        }}
        onChange={updateCurrentValue}
      />
      <div ref={graphRef}>
        {currentTransformation?.map((props, index) => {
          const { sources, actions, target } = props;
          return (
            <div
              className="graph"
              onClick={(event : React.MouseEvent<HTMLElement>) => selectNode(event, index)}
            >
              <div className="graph__sources">
                {sources.map(({ id }: SourceItem) => (
                  <Source
                    key={id}
                    id={id}
                  />
                ))}
              </div>
              <div className="graph__actions">
                {actions.map(({ id }: ActionItem) => (
                  <Action
                    key={id}
                    id={id}
                  />
                ))}
              </div>
              <div className="graph__targets">
                <Target
                  graphRef={graphRef.current!}
                  target={target}
                  sources={sources}
                  actions={actions}
                  currentTransformation={currentTransformation}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
