import {
  ActionParams, Mapping, SourceParams,
  TransformationParams, TreeParams,
} from "../interfaces/interfaces";
import { changeBlockPosition } from "./getSelectedNode";

export const cleanNodeLines = (node: HTMLDivElement|Element) =>
  [...node.children].forEach((childNode) => {
    cleanNodeLines(childNode);

    if (childNode.className === "line") {
      childNode.remove();
    }
  });

const getPrevNodes = (mapping: Mapping, nodes: (SourceParams | ActionParams)[], currentNode: SourceParams | ActionParams): (SourceParams | ActionParams)[] => {
  const prevNodes = [];

  if ("prev" in currentNode) {
    currentNode.prev?.map((id: string) => {
      const actions = mapping.actions.filter((action) => action.id === id);
      const sources = mapping.sources.filter((source) => source.id === id);
      const nextNode = [...sources, ...actions][0];

      prevNodes.push(...getPrevNodes(mapping, [...nodes, currentNode], nextNode));
    });
  } else {
    prevNodes.push(...mapping.sources.filter((source) => source.id === currentNode.id));
  }

  return [...nodes, ...prevNodes];
};

export const getTransformations = (mapping: Mapping): TransformationParams[] => {
  const transformations: TransformationParams[] = [];

  mapping.targets.forEach((target) => {
    const lastAction = mapping.actions.find((_) => _.next === target.id);

    if (lastAction) {
      const prevNodes = getPrevNodes(mapping, [], lastAction);
      const actions: ActionParams[] = [...new Set(prevNodes.filter((prevNode) => "prev" in prevNode) as ActionParams[])];
      const sources: SourceParams[] = prevNodes.filter((prevNode) => "name" in prevNode) as SourceParams[];

      transformations.push({
        actions,
        sources,
        target,
      });
    }
  });

  return transformations;
};

export const getCurrentTransformations = (value:Mapping) => {
  const initialTransformations: TransformationParams[] = getTransformations(value);

  return initialTransformations.map(({ actions, target, sources }) => {
    const reversedActions: ActionParams[] = [...actions].reverse();

    return {
      target,
      sources,
      actions: reversedActions,
    };
  });
};

type GetDeepestChildrenParams = (graph: HTMLElement, treeNodes: TreeParams) => void;

export const getDeepestChildren: GetDeepestChildrenParams = (graph, treeNodes) => [...graph.children].forEach((child) => {
  if (child instanceof HTMLElement) {
    getDeepestChildren(child, treeNodes);
  }

  const { prev: previousNodes } = treeNodes;
  previousNodes?.forEach((node) => {
    if (previousNodes?.length > 1 && !node.startsWith("src")) {
      if (node === child.className) {
        cleanNodeLines(graph);
        changeBlockPosition(child, treeNodes);
      }
    }
  });
});
