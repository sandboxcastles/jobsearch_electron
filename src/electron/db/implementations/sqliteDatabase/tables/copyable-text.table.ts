import {Database as DatabaseType } from "better-sqlite3";
import { TableCrud } from "../../../contracts/table-crub.interface.js";
import { v4 as uuidv4 } from 'uuid';

export class CopyableTextTable implements TableCrud<CopyableText, CreateCopyableText, CopyableText> {
    private tableName = 'copyabletext';
    private db: DatabaseType;
    
    constructor(db: DatabaseType) {
        this.db = db;
    }

    init(): void {
        this.dropTable();
        this.createTable();
        // this.create({ label: 'LinkedIn', value: 'https://www.linkedin.com/in/nicklandkamer/' });
        // this.create({ label: 'Website', value: 'https://nicklandkamer.com' });
        // this.create({ label: 'Github', value: 'http://github.com/sandboxcastles' });
    }

    getAll(): CopyableText[] {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true`;
        return this.db.prepare(sql).all() as CopyableText[];
    };

    getOne(id: string): CopyableText | null {
        const sql = `SELECT * FROM ${this.tableName} WHERE isActiveEntity = true AND id = ?`;
        return this.db.prepare(sql).get(id) as CopyableText;
    };

    create(item: CreateCopyableText): CopyableText | null {
        const sql = `INSERT INTO ${this.tableName} VALUES(@id, @label, @value, @description, @isActiveEntity) ON CONFLICT DO NOTHING`;
        const newItem: CopyableText = {
            id: uuidv4(),
            label: item.label,
            value: item.value,
            description: item.description || null,
            isActiveEntity: 1,
        };
        const result = this.db.prepare(sql).run(newItem);
        return result.changes > 0 ? newItem : null;
    };
    update(id: string, item: Partial<CopyableText>) {
        const propsForUpdate = ['label', 'value', 'description'].filter(prop => prop in item).map(prop => `${prop} = ?`).join(', ');
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
            label TEXT NOT NULL,
            value TEXT NOT NULL,
            description TEXT,
            isActiveEntity BOOLEAN
        )
        `;
        this.db.exec(sql);
    };
}