import { cleanNodeLines } from "./getTransformation";
import { SelectedNode } from "../interfaces/interfaces";

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
        (child as HTMLElement).style.color = "#847F98";
      }
    });
  });
};
