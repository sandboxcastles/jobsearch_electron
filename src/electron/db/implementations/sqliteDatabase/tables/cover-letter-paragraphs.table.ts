import {Database as DatabaseType } from "better-sqlite3";
import { TableCrud } from "../../../contracts/table-crub.interface.js";
import { v4 as uuidv4 } from 'uuid';

export class CoverLetterParagraphsTable implements TableCrud<CoverLetterParagraph, CreateCoverLetterParagraph, CoverLetterParagraph> {
    private tableName = 'coverletterparagraphs';
    private db: DatabaseType;
    
    constructor(db: DatabaseType) {
        this.db = db;
    }

    init(): void {
        // this.dropTable();
        this.createTable();
        // this.create({ label: 'LinkedIn', value: 'https://www.linkedin.com/in/nicklandkamer/' });
        // this.create({ label: 'Website', value: 'https://nicklandkamer.com' });
        // this.create({ label: 'Github', value: 'http://github.com/sandboxcastles' });
    }

    getAll(): CoverLetterParagraph[] {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true`;
        return this.db.prepare(sql).all() as CoverLetterParagraph[];
    };

    getOne(id: string): CoverLetterParagraph | null {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true AND id = ?`;
        return this.db.prepare(sql).get(id) as CoverLetterParagraph;
    };

    create(item: CreateCoverLetterParagraph): CoverLetterParagraph | null {
        const sql = `INSERT INTO ${this.tableName} VALUES(@id, @label, @value, @description, @isActiveEntity) ON CONFLICT DO NOTHING`;
        const newItem: CoverLetterParagraph = {
            id: uuidv4(),
            text: item.text,
            isActiveEntity: 1,
        };
        const result = this.db.prepare(sql).run(newItem);
        return result.changes > 0 ? newItem : null;
    };
    update(id: string, item: Partial<CoverLetterParagraph>) {
        if (!('text' in item)) {
            // TODO: error?
            return null;
        }
        const sql = `UPDATE ${this.tableName} SET text = ? WHERE id = ?`;
        const result = this.db.prepare(sql).run(item.text, id);
        return result.changes > 0
            ? this.getOne(id)
            // TODO: error?
            : null;
    };
    delete(id: string) {
        const sql = `UPDATE ${this.tableName} SET isActiveEntity = false WHERE id = ?`;
        const result = this.db.prepare(sql).run(id);
        return result.changes > 0;
    };
    

    dropTable() {
        this.db.exec(`DROP table IF EXISTS ${this.tableName}`);
    };
    
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            isActiveEntity BOOLEAN
        )
        `;
        this.db.exec(sql);
    };
}