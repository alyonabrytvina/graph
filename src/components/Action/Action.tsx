import React, { useEffect } from "react";
import "./Action.scss";
import { connect } from "../../utils/getOffset";
import { transformations } from "../../api/transformations";
import { ActionRoot } from "../../interfaces/interfaces";
import { DEFAULT_LENGTH, MAX_VALUE_PREV_NODES } from "../../constants";

export interface RootObject {
    props: ActionRoot;
    actionIndex: number;
}

export const Action = ({
  props, actionIndex,
}: RootObject) => {
  const {
    id: actionId,
    next: nextElement,
    prev: prevElements,
  }: ActionRoot = props;

  useEffect(() => {
    const targetElement:HTMLElement = document.querySelector(`.${actionId}`)!;//! non-null assertion

    if (prevElements && targetElement.children.length < prevElements.length) {
      prevElements.forEach((prevElementId) => {
        transformations[actionIndex].sources.forEach(({ id }) => {
          const nodes = [...document.querySelectorAll(`.${id}`)];
          const nodesLength = nodes.length;

          if (id === prevElementId) {
            const prevEl = (
                nodesLength === DEFAULT_LENGTH
                  ? nodes[0]
                  : actionIndex >= MAX_VALUE_PREV_NODES
                    ? nodes[nodesLength - DEFAULT_LENGTH]
                    : nodes[actionIndex]) as HTMLElement;

            targetElement.innerHTML += connect({
              element: prevEl,
              targetElement,
            });
          }
        });
      });
    }

    const nextEl:HTMLElement = document.querySelector(`.${nextElement}`)!;

    if (nextElement && !nextEl.children.length) {
      nextEl.innerHTML += connect({
        element: targetElement,
        targetElement: nextEl,
      });
    }
  }, []);

  return (
    <div className={actionId}>
      {actionId}
    </div>
  );
};
