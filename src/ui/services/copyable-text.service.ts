import { CopyableTextServiceContract } from "../interfaces/copyable-text-service.interface";

export class CopyableTextService implements CopyableTextServiceContract {
    async getAll(): Promise<CopyableText[]> {
        return window.electron.getCopyableText();
    }

    async create(item: CreateCopyableText): Promise<CopyableText | null> {
        return window.electron.insertCopyableText(item);
    }

    async update(item: Partial<CopyableText>): Promise<CopyableText | null> {
        console.log('update copyable text not implemented: ', item);
        return new Promise((res) => res(null));
    }
}