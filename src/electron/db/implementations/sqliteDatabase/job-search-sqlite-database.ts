import { JobSearchDatabase } from "../../contracts/job-search-database.interface.js";
import { AvailableTokensTable } from "./tables/available-tokens.table.js";
import path from 'path';
import Database, {Database as DatabaseType} from 'better-sqlite3';
import { app } from 'electron';
import { CopyableTextTable } from "./tables/copyable-text.table.js";
import { CoverLetterParagraphsTable } from "./tables/cover-letter-paragraphs.table.js";

export class JobSearchSqliteDatabase implements JobSearchDatabase {
    private db: DatabaseType = new Database(path.join(app.getPath('userData'), 'database.db'), { verbose: console.log });
    availableTokens = new AvailableTokensTable(this.db);
    copyableText = new CopyableTextTable(this.db);
    coverLetterParagraphs = new CoverLetterParagraphsTable(this.db);

    constructor() {
        this.init();
    }

    init(): void {
        this.availableTokens.init();
        this.copyableText.init();
        this.coverLetterParagraphs.init();
    }
}