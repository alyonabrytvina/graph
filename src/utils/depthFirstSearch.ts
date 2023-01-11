import { connect } from "./getOffset";
import { DepthFirstSearch } from "../interfaces/interfaces";

export const depthFirstSearch = ({
  graph, rootNode, tree,
}: DepthFirstSearch): void => {
  const graphTreeNodes = [...graph]?.flatMap((graphTree) =>
    [...graphTree.children]?.map((child) => child)); // get all grand children for current graph

  const queue = [];
  queue.push(rootNode.id);

  let currentNode = queue[0];
  let targetElement: HTMLElement | undefined;
  let sibling: HTMLElement | undefined;

  tree.forEach((nodeOfTree) => {
    if ("next" in nodeOfTree && currentNode === nodeOfTree.next) {
      sibling = graphTreeNodes.find((element) => element.className === nodeOfTree.id) as HTMLElement;

      targetElement = graphTreeNodes.find((element) => {
        if (currentNode === element.className) {
          return element;
        }
      }) as HTMLElement;

      if (targetElement && sibling) {
        targetElement.innerHTML += connect({
          element: sibling,
          targetElement,
        });
      }

      queue.push(nodeOfTree.id);
      currentNode = nodeOfTree.id;
    }

    if ("prev" in nodeOfTree) {
      targetElement = graphTreeNodes.find((element) => element.className === nodeOfTree.id) as HTMLElement;

      if (nodeOfTree.id === targetElement?.className) {
        nodeOfTree.prev?.forEach((node) => {
          sibling = graphTreeNodes.find((element) => node === element.className) as HTMLElement;

          if (targetElement && sibling) {
            targetElement.innerHTML += connect({
              element: sibling,
              targetElement,
            });
          }
        });
      }
    }
  });
};
