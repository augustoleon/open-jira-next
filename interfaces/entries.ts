

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}

// type para definir tipos que no van a expandirse
export type EntryStatus = 'pending' | 'in-progress' | 'done'