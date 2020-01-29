export interface NumberPartState {
    data: NumberPartData[];
}

export interface PartAction {
    type: string;
    payload: any;
}

export type PartTypes = PartAction;