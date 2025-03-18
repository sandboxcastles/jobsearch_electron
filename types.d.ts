type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
};

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
};

type EventPayloadMapping = {
    ['get-available-tokens']: AvailableToken[];
    ['insert-available-token']: AvailableToken | null;
    ['get-copyable-text']: CopyableText[];
    ['insert-copyable-text']: CopyableText | null;
};

type UnsubscribeFunction = () => void;

type ElectronAPI = {
    getAvailableTokens: () => Promise<AvailableToken[]>;
    insertAvailableToken: (createToken: CreateAvailableToken) => Promise<AvailableToken | null>;
    getCopyableText: () => Promise<CopyableText[]>;
    insertCopyableText: (createCopyableText: CreateCopyableText) => Promise<CopyableText | null>;
};

interface Window {
    electron: ElectronAPI
}

// Entities

interface BaseDbEntity {
    id: string;
    isActiveEntity: 0 | 1;
}

// tokens

interface AvailableToken extends BaseDbEntity {
    label: string;
    token: string;
    value?: string | null;
    placeholder?: string | null;
}

interface CreateAvailableToken {
    label: string;
    token: string;
    value?: string | null;
    placeholder?: string | null;
}

// copyable text

interface CopyableText extends BaseDbEntity {
    label: string;
    value: string;
    description?: string | null;
}

interface CreateCopyableText {
    label: string;
    value: string;
    description?: string;
}