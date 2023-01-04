import { connect } from "./getOffset";
import { DepthFirstSearch } from "../interfaces/interfaces";

export const depthFirstSearch = ({
  graph, rootNode, tree,
}: DepthFirstSearch) => {
  const graphTreeNodes = [...graph]?.flatMap((nod) =>
    [...nod.children]?.map((element) => element)); // get all grand children for current graph
  const queue = [];
  queue.push(rootNode.id);

  let currentNode = queue[0];
  let targetElement:HTMLElement;
  let sibling:HTMLElement;

  tree.forEach((node) => {
    if ("next" in node && currentNode === node.next) {
      sibling = graphTreeNodes.find((element) => element.className === node.id)! as HTMLElement;

      targetElement = graphTreeNodes.find((element) => {
        if (currentNode === element.className) {
          return element;
        }
      })! as HTMLElement;

      if (targetElement && sibling) {
        targetElement.innerHTML += connect({
          element: sibling,
          targetElement,
        });
      }

      queue.push(node.id);
      currentNode = node.id;
    }

    if ("prev" in node) {
      targetElement = graphTreeNodes.find((element) => element.className === node.id)! as HTMLElement;

      if (node.id === targetElement?.className) {
        node.prev!.forEach((pr) => {
          sibling = graphTreeNodes.find((element) => pr === element.className)! as HTMLElement;

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
