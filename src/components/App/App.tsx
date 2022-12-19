import React from "react";
import "./App.scss";
import { Source } from "../Source/Source";
import { Action } from "../Action/Action";
import { transformations } from "../../api/transformations";
import { Target } from "../Target/Target";
import { ActionRoot } from "../../interfaces/interfaces";

export const App = () => (
  <>
    {transformations.map(({ sources, actions, target }, index: number) => {
      const { id: targetId } = target;

      return (
        <div className="graph">
          <div className="graph__sources">
            {sources.map(({ id }: Record<string, string>) => (
              <Source
                key={id}
                sourceName={id}
              />
            ))}
          </div>
          <div className="graph__actions">
            {actions.map((props: ActionRoot) => (
              <Action
                key={props.id}
                props={props}
                actionIndex={index}
              />
            ))}
          </div>
          <div className="graph__targets">
            <Target targetName={targetId} />
          </div>
        </div>
      );
    })}
  </>
);
