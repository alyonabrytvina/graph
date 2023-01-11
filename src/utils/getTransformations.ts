import {
  ActionItem, Mapping, NodesList,
  SourceItem, Transformation, Tree,
} from "../interfaces/interfaces";
import { moveBlock } from "./getSelectedNode";

export const cleanNodeLines = (node: HTMLDivElement|Element) =>
  [...node.children].forEach((childNode) => {
    cleanNodeLines(childNode);

    if (childNode.className === "line") {
      childNode.remove();
    }
  });

const getPrevNodes = (mapping: Mapping, nodes: (SourceItem | ActionItem)[], currentNode: SourceItem | ActionItem): (SourceItem | ActionItem)[] => {
  const prevNodes = [];

  if ("prev" in currentNode) {
    currentNode.prev!.map((id: string) => {
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

export const getTransformations = (mapping: Mapping): Transformation[] => {
  const transformations: Transformation[] = [];

  mapping.targets.forEach((target) => {
    const lastAction = mapping.actions.find((_) => _.next === target.id);

    if (lastAction) {
      const prevNodes = getPrevNodes(mapping, [], lastAction);
      const actions: ActionItem[] = [...new Set(prevNodes.filter((prevNode) => "prev" in prevNode) as ActionItem[])];
      const sources: SourceItem[] = prevNodes.filter((prevNode) => "name" in prevNode) as SourceItem[];

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
  const initialTransformation = getTransformations(value);
  if (initialTransformation) {
    const transformations: Transformation[] = initialTransformation.map((props) => {
      const { actions, target, sources } = props;
      const reversedActions = [...actions].reverse();

      return {
        target,
        sources,
        actions: reversedActions,
      };
    });

    const nodesList: NodesList[] = transformations.map((node, index) => ({
      isSelected: false,
      nodeIndex: index,
    }));

    return {
      transformations,
      nodesList,
    };
  }
};

export const getDeepestChildren = (graph:Element, treeNodes: Tree) => [...graph.children].forEach((childNode) => {
  getDeepestChildren(childNode, treeNodes);
  const { prev } = treeNodes;
  prev?.forEach((node) => {
    if (prev?.length > 1 && !node.startsWith("src")) {
      if (node === childNode.className) {
        cleanNodeLines(graph);
        const child = childNode as HTMLElement;
        moveBlock(child, treeNodes);
      }
    }
  });
});
