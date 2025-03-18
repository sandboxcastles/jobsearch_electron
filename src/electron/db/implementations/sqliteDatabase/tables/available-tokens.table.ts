import {Database as DatabaseType } from "better-sqlite3";
import { TableCrud } from "../../../contracts/table-crub.interface.js";
import { v4 as uuidv4 } from 'uuid';

export class AvailableTokensTable implements TableCrud<AvailableToken, CreateAvailableToken, AvailableToken> {
    private tableName = 'availabletokens';
    private db: DatabaseType;
    
    constructor(db: DatabaseType) {
        this.db = db;
    }

    init(): void {
        this.dropTable();
        this.createTable();
        this.create({ token: 'companyName', label: 'Company Name' });
        this.create({ token: 'jobTitle', label: 'Job Title' });
        // this.create({ token: 'jobSpecificQualifications', label: 'Job Specific Qualifications' });
    }

    getAll(): AvailableToken[] {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true`;
        return this.db.prepare(sql).all() as AvailableToken[];
    };
    getOne(id: string): AvailableToken | null {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true AND id = ?`;
        return this.db.prepare(sql).get(id) as AvailableToken;
    };
    create(item: CreateAvailableToken): AvailableToken | null {
        const sql = `INSERT INTO ${this.tableName} VALUES(@id, @token, @label, @value, @placeholder, @isActiveEntity) ON CONFLICT DO NOTHING`;
        const newItem: AvailableToken = {
            id: uuidv4(),
            token: `{${item.token}}`,
            label: item.label,
            value: item.value || null,
            placeholder: item.placeholder || null,
            isActiveEntity: 1,
        };
        const result = this.db.prepare(sql).run(newItem);
        return result.changes > 0 ? newItem : null;
    };
    update(id: string, item: Partial<AvailableToken>) {
        const propsForUpdate = ['token', 'label', 'value', 'placeholder'].filter(prop => prop in item).map(prop => `${prop} = ?`).join(', ');
        if (propsForUpdate.length < 1) {
            // TODO: error?
            return null;
        }
        const sql = `UPDATE ${this.tableName} SET ${propsForUpdate} WHERE id = ? ON CONFLICT DO NOTHING`;
        const result = this.db.prepare(sql).run(...propsForUpdate, id);
        return result.changes > 0
            ? this.getOne(id)
            // TODO: error?
            : null;
    };
    delete(id: string) {
        const sql = `UPDATE ${this.tableName} SET isActiveEntity = false WHERE id = ? ON CONFLICT DO NOTHING`;
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
            token TEXT NOT NULL UNIQUE,
            label TEXT NOT NULL,
            value TEXT,
            placeholder TEXT,
            isActiveEntity BOOLEAN
        )
        `;
        this.db.exec(sql);
    };
}