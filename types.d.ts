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
    ['delete-available-token']: boolean;

    ['get-copyable-text']: CopyableText[];
    ['insert-copyable-text']: CopyableText | null;
    ['delete-copyable-text']: boolean;

    ['get-cover-letter-paragraphs']: CoverLetterParagraph[];
    ['insert-cover-letter-paragraph']: CoverLetterParagraph | null;
    ['delete-cover-letter-paragraph']: boolean;
};

type UnsubscribeFunction = () => void;

type ElectronAPI = {
    getAvailableTokens: () => Promise<AvailableToken[]>;
    insertAvailableToken: (createToken: CreateAvailableToken) => Promise<AvailableToken | null>;
    deleteAvailableToken: (id: string) => Promise<boolean>;

    getCopyableText: () => Promise<CopyableText[]>;
    insertCopyableText: (createCopyableText: CreateCopyableText) => Promise<CopyableText | null>;
    deleteCopyableText: (id: string) => Promise<boolean>;
    
    getCoverLetterParagraphs: () => Promise<CoverLetterParagraph[]>;
    insertCoverLetterParagraph: (item: CreateCoverLetterParagraph) => Promise<CoverLetterParagraph | null>;
    deleteCoverLetterParagraph: (id: string) => Promise<boolean>;
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

// cover letter paragraphs
interface CoverLetterParagraph extends BaseDbEntity {
    text: string;
}

interface CreateCoverLetterParagraph {
    text: string;
}
