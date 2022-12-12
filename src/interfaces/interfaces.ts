export interface Source {
    id: string;
    name: string;
}

export interface Action {
    id: string;
    prev: string[];
    next: string;
}

export interface Target {
    id: string;
    name: string;
}

export interface Transformation {
    sources: Source[];
    actions: Action[];
    target: Target;
}

export interface Mapping {
    sources: Source[];
    actions: Action[];
    targets: Target[];
}
