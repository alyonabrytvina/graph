import React, {
  useContext, useEffect, useRef, useState,
} from "react";
import "./Main.scss";
import {
  MouseEvent, NodesListParams, TransformationParams,
} from "../../interfaces/interfaces";
import {
  cleanNodeLines,
  getCurrentTransformations,
} from "../../utils/getTransformations";
import { cleanNodes, getSelectedNode } from "../../utils/getSelectedNode";
import { hasJsonStructure } from "../../utils/hasJsonStructure";
import { StateWidthContext } from "../../context/StateWidthProvider";
import { Transformation } from "../Transformation/Transformation";

type SelectNodeType = (event: MouseEvent<HTMLElement>, transformationIndex: number) => void;

export const Main = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  const [nodeList, setNodeList] = useState<NodesListParams[]>([]);
  const [currentTransformations, setCurrentTransformations] = useState<TransformationParams[]>([]);

  const [textareaValue, setTextareaValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const { windowHeight, windowWidth } = useContext(StateWidthContext).windowSize;

  useEffect(() => {
    if (textareaValue.length) {
      if (graphRef.current) {
        cleanNodeLines(graphRef.current);
      }

      const isJson = hasJsonStructure(textareaValue);
      setIsError(!isJson);
      const parsedValue = isJson && JSON.parse(textareaValue);
      if (typeof parsedValue !== "object") {
        setCurrentTransformations([]);
        return;
      }

      const transformations: TransformationParams[] = getCurrentTransformations(parsedValue)!;

      setCurrentTransformations(transformations);
      setNodeList(transformations.map((_, index) => ({
        isSelected: false,
        nodeIndex: index,
      })));
    } else {
      setTextareaValue("");
      setCurrentTransformations([]);
    }
  }, [textareaValue, windowHeight, windowWidth]);

  const selectNode: SelectNodeType = (event, transformationIndex) => {
    const selectedElement = event.target;
    const parent = event.target.parentElement?.parentElement;

    if (parent?.className === "graph") { // check for possibilities to select elements only
      // inside graph
      console.log(`You clicked on ${selectedElement?.className}`, selectedElement, `the parent is ${parent.className}`, parent);

      const updatedList:NodesListParams[] = nodeList.map((node) => {
        const { isSelected, nodeIndex } = node;

        return (transformationIndex === nodeIndex) ? {
          isSelected: !isSelected,
          nodeIndex: transformationIndex,
        } : node;
      });
      setNodeList(updatedList);

      updatedList.forEach(({ isSelected, nodeIndex }) => {
        if (transformationIndex === nodeIndex) {
          getSelectedNode({ graph: parent, isSelected });
        }
      });
    }
  };

  const updateTextareaValue = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaValue !== event.target.value) {
      if (graphRef.current) {
        cleanNodes(graphRef.current);
      }
      setTextareaValue(event.target.value);
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
        onChange={updateTextareaValue}
      />
      <div ref={graphRef}>
        {currentTransformations?.map((transformationProps, index) => graphRef.current && (
          <Transformation
            transformationProps={transformationProps}
            graph={graphRef.current}
            currentTransformations={currentTransformations}
            transformationIndex={index}
            selectNode={selectNode}
          />
        ))}
      </div>
    </>
  );
};
