import { JobSearchDatabase } from './contracts/job-search-database.interface.js';
import JobSearchSqliteDatabase from './implementations/sqliteDatabase/index.js';

// Change this reference to switch to new data source
const db: JobSearchDatabase = new JobSearchSqliteDatabase();

export default db;