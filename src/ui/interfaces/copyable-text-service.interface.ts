export interface CopyableTextServiceContract {
    getAll: () => Promise<CopyableText[]>
    create: (item: CreateCopyableText) => Promise<CopyableText | null>;
    update: (item: Partial<CopyableText>) => Promise<CopyableText | null>;
}