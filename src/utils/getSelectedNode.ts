import { cleanNodeLines } from "./getTransformations";
import { SelectedNodeParams, TreeParams } from "../interfaces/interfaces";
import { styles } from "../constants";

export const getSelectedNode = ({ graph, isSelected }: SelectedNodeParams): void => {
  const { white, black, green } = styles;

  return [...graph.children]
    .forEach(({ children }) => [...children]
      .forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.background = isSelected ? green : white;
          child.style.color = isSelected ? white : black;
        }
      }));
};

export const cleanNodes = (graph: HTMLDivElement| Element): void => {
  const { white, black } = styles;
  cleanNodeLines(graph);
  const children = [...graph.children];

  children.forEach((child: Element) => {
    cleanNodes(child);

    if (child.className && child.className !== "line" && child instanceof HTMLElement) {
      child.style.background = white;
      child.style.color = black;
    }
  });
};

export const changeBlockPosition = (child: HTMLElement | Element, treeNode: TreeParams): void => {
  const { align, marginTop } = styles;
  const previousElement = child?.previousElementSibling;

  if (previousElement) {
    changeBlockPosition(previousElement, treeNode);
  }
  if (previousElement instanceof HTMLElement && child instanceof HTMLElement) {
    child.style.alignSelf = align;
    previousElement.style.alignSelf = align;
    child.style.marginTop = marginTop;
    previousElement.style.marginTop = marginTop;
  }
};
