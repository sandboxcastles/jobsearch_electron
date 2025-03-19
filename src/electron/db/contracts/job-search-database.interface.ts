import { TableCrud } from "./table-crub.interface.js";

export interface JobSearchDatabase {
    init: () => void;
    // Add tables as they become necessary
    availableTokens: TableCrud<AvailableToken, CreateAvailableToken, AvailableToken>;
    copyableText: TableCrud<CopyableText, CreateCopyableText, CopyableText>;
    coverLetterParagraphs: TableCrud<CoverLetterParagraph, CreateCoverLetterParagraph, CoverLetterParagraph>;
}