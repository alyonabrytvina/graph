import React from "react";

export interface SourceParams {
    id: string;
    name?: string;
}

export interface ActionParams {
    id: string;
    prev?: string[];
    next?: string;
}

export interface TargetParams {
    id: string;
    name?: string;
}

export interface TransformationParams {
    sources: SourceParams[];
    actions: ActionParams[];
    target: TargetParams;
}

export interface Mapping {
    sources: SourceParams[];
    actions: ActionParams[];
    targets: TargetParams[];
}

export interface NodesListParams {
    isSelected: boolean;
    nodeIndex: number;
}

export interface TreeParams {
    id: string;
    name?: string;
    prev?: string[];
    next?: string;
}

export interface DepthFirstSearch {
    graph: Array<Element>;
    rootNode: TargetParams;
    tree: TreeParams[];
}

export interface SelectedNodeParams {
    graph: HTMLElement;
    isSelected: boolean;
}

export interface WindowSizeParams {
    windowWidth: number;
    windowHeight: number;
}

export interface initialValueStateWidthContextParams {
    windowSize: WindowSizeParams;
    setWindowSize: ({ windowWidth, windowHeight }: WindowSizeParams) => void;
}

export interface MouseEvent<T extends EventTarget> extends React.MouseEvent<HTMLDivElement> {
    readonly target: T
}

export interface TransformationRootParams {
    transformationProps: TransformationParams;
    currentTransformations: TransformationParams[];
    graph: HTMLDivElement;
    transformationIndex: number;
    selectNode: (event: MouseEvent<HTMLElement>, index: number) => void;
}

export interface OffsetParams {
    top: number;
    left: number;
    right: number;
    width: number;
    height: number;
}
