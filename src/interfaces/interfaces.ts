export interface SourceChild {
    sourceName: string;
}

export interface TargetChild {
    targetName: string;
}

export interface Source {
    id: string;
    name: string;
    key?: string;
}

export interface ActionRoot {
    id: string;
    prev: string[];
    next: string;
    actionIndex?: number;
}

export interface Target {
    id: string;
    name: string;
}

export interface Transformation {
    sources: Source[];
    actions: ActionRoot[];
    target: Target;
}

export interface Mapping {
    sources: Source[];
    actions: ActionRoot[];
    targets: Target[];
}
