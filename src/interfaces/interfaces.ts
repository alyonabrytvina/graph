export interface SourceItem {
    id: string;
    name?: string;
}

export interface ActionItem {
    id: string;
    prev?: string[];
    next?: string;
}

export interface TargetItem {
    id: string;
    name: string;
}

export interface Transformation {
    sources: SourceItem[];
    actions: ActionItem[];
    target: TargetItem;
}

export interface Mapping {
    sources: SourceItem[];
    actions: ActionItem[];
    targets: TargetItem[];
}

export interface NodesList {
    isSelected: boolean;
    nodeIndex: number;
}

export interface Tree {
    id: string;
    name?: string;
    prev?: string[];
    next?: string;
}

export interface DepthFirstSearch {
    graph: HTMLCollection;
    rootNode: TargetItem;
    tree: Tree[];
}

export interface TargetRoot {
    target: TargetItem
    sources: SourceItem[]
    actions: ActionItem[]
    currentTransformation: Transformation[]
    graphRef: HTMLDivElement
}

export interface SelectedNode {
    graph: HTMLDivElement;
    isSelected: boolean
}

export interface InitialValue {
    windowWidth: number
    setWindowWidth: (width: number) => void
}
