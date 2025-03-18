export interface TableCrud<T, TCreate, TUpdate> {
    init: () => void;
    getAll: () => T[];
    getOne: (id: string) => T | null;
    create: (obj: TCreate) => T | null;
    update: (id: string, updates: TUpdate) => T | null;
    delete: (id: string) => boolean;
    dropTable: () => void;
    createTable: () => void;
}