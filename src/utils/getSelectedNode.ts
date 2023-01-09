import { cleanNodeLines } from "./getTransformation";
import { SelectedNode, Tree } from "../interfaces/interfaces";

export const getSelectedNode = ({ graph, isSelected }: SelectedNode) =>
  [...graph.children]
    .forEach(({ childNodes }) => [...childNodes]
      .forEach((element) => {
        (element as HTMLElement).style.background = isSelected ? "#228B22" : "#fff";
        (element as HTMLElement).style.color = isSelected ? "#fff" : "#000";
      }));

export const cleanNodes = (graph: HTMLDivElement|Element) => {
  cleanNodeLines(graph);
  const nodes = [...graph.children];

  nodes.forEach((node: Element) => {
    if ([...node.children].length) {
      return cleanNodes(node);
    }

    nodes.forEach((child) => {
      if (child.className && child.className !== "line") {
        (child as HTMLElement).style.background = "#fff";
        (child as HTMLElement).style.color = "#000";
      }
    });
  });
};

export const moveBlock = (childNode: HTMLElement, treeNode: Tree) => {
  const previousElement = childNode?.previousElementSibling! as HTMLElement;
  if (previousElement) moveBlock(previousElement, treeNode);

  if (previousElement) {
    childNode.style.alignSelf = "stretch";
    previousElement.style.alignSelf = "stretch";
    childNode.style.marginTop = "15px";
    previousElement.style.marginTop = "15px";
  }
};
