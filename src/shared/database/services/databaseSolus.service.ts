// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Injectable, Logger } from '@nestjs/common';
// import * as oracledb from 'oracledb';
// import { IDatabase } from 'src/shared/interfaces/IDatabase';

// @Injectable()
// export class DatabaseSolusService implements IDatabase {
//     private logger = new Logger('DatabaseService');

//     public oracle: typeof oracledb & { OBJECT: number };
//     private poolAlias = 'solus';

//     constructor() {
//         this.oracle = oracledb as typeof oracledb & { OBJECT: number };

//         // this.oracle.fetchAsBuffer = [oracledb.BLOB] as any;
//         // this.oracle.fetchAsString = [oracledb.CLOB] as any;

//         (async () => {
//             await this.createPool();
//         })();

//         // oracledb.initOracleClient();
//     }

//     async createPool() {
//         try {
//             await this.oracle.createPool({
//                 user: process.env.DB_USER_SOLUS,
//                 password: process.env.DB_PASSWORD_SOLUS,
//                 connectString: `${process.env.DB_HOST_SOLUS}:${process.env.DB_PORT_SOLUS}/${process.env.DB_DATABASE_SOLUS}`,
//                 poolIncrement: 3,
//                 poolMax: 25,
//                 poolMin: 3,
//                 poolPingInterval: 1,
//                 poolTimeout: 60,
//                 poolAlias: this.poolAlias,
//             });

//             this.logger.warn(`Conexão Solus iniciada!`);

//             process
//                 .once('SIGTERM', this.closePoolAndExit)
//                 .once('SIGINT', this.closePoolAndExit);
//         } catch (err) {
//             this.logger.error(
//                 'createPool: Ocorreu um erro ao iniciar a conexão',
//                 err,
//             );
//         }
//     }

//     async open(): Promise<oracledb.Connection> {
//         try {
//             return await this.oracle.getConnection(this.poolAlias);
//         } catch (err) {
//             this.logger.error(`open: ${err.stack}`);
//             throw new Error(err);
//         }
//     }

//     async close(connection: any) {
//         try {
//             if (!connection) {
//                 return;
//             }

//             await connection.close();
//         } catch (err) {
//             throw new Error(err);
//         }
//     }

//     async commitAndClose(connection: oracledb.Connection) {
//         try {
//             if (!connection) {
//                 this.logger.error('commitAndClose: Conexão não encontrada.');
//                 return;
//             }

//             await connection.commit();
//             await connection.close();
//         } catch (err) {
//             this.logger.error(`commitAndClose: ${err.stack}`);
//             throw new Error(err);
//         }
//     }

//     async findOne<T = any>(sql: string, binds: any = [], transaction = null) {
//         const one = await this.query<T>(sql, binds, transaction);
//         if (one.length >= 1) {
//             return one[0];
//         }
//         return null;
//     }

//     async rollbackAndClose(connection: oracledb.Connection) {
//         try {
//             if (!connection) {
//                 this.logger.error('rollbackAndClose: Conexão não encontrada.');
//                 return;
//             }

//             await connection.rollback();

//             await connection.close();
//         } catch (err) {
//             this.logger.error(`rollbackAndClose: ${err.stack}`);
//             throw new Error(err);
//         }
//     }

//     async query<T>(
//         sql: string,
//         binds: oracledb.BindParameters = {},
//         connection?: oracledb.Connection | null,
//     ): Promise<T[]> {
//         let isOpenTransaction = true;

//         const isLogging = process.env.DB_LOGGING_SOLUS as string;

//         if (!connection) {
//             connection = await this.open();
//             isOpenTransaction = false;
//         }

//         try {
//             const options = {
//                 outFormat: this.oracle.OBJECT,
//                 maxRows: 1000,
//                 dir: this.oracle.BIND_IN,
//                 autoCommit: false,
//             };

//             const result = await connection.execute(sql, binds, options);

//             let rows: T[] = [];

//             if (result && result.rows && result.rows.length > 0) {
//                 rows = result.rows.map((one: Record<string, unknown>) => {
//                     const newValues: Record<string, unknown> = {};

//                     Object.keys(one).forEach(
//                         (key: string) =>
//                             (newValues[key.toLowerCase()] = one[key]),
//                     );

//                     return newValues;
//                 }) as T[];
//             }

//             if (!isOpenTransaction) this.commitAndClose(connection);
//             if (isLogging) this.logger.debug(sql);

//             return rows;
//         } catch (err) {
//             if (isLogging) this.logger.debug(`query: ${sql}`);
//             this.logger.error(`query: ${err.stack}`);
//             throw new Error(err);
//         }
//     }

//     async queryBindOut<T>(
//         sql: string,
//         binds: oracledb.BindParameters = {},
//         connection: oracledb.Connection | null = null,
//     ): Promise<oracledb.Result<T>> {
//         let isOpenTransaction = true;

//         const isLogging = process.env.DB_LOGGING_SOLUS as string;

//         try {
//             if (!connection) {
//                 connection = await this.open();
//                 isOpenTransaction = false;
//             }

//             const options = {
//                 outFormat: this.oracle.OBJECT,
//                 maxRows: 1000,
//                 dir: this.oracle.BIND_IN,
//                 autoCommit: false,
//             };

//             const result = await connection.execute<T>(sql, binds, options);

//             if (!isOpenTransaction) this.commitAndClose(connection);
//             if (isLogging) this.logger.debug(sql);

//             return result;
//         } catch (err) {
//             if (isLogging) this.logger.debug(`queryBindOut: ${sql}`);
//             this.logger.error(`queryBindOut: ${err.stack}`);
//             throw new Error(err);
//         }
//     }

//     async closePoolAndExit() {
//         try {
//             await this.oracle.getPool(this.poolAlias).close(10);

//             this.logger.warn('queryBindOut: Conexão encerrada.');

//             process.exit(0);
//         } catch (err) {
//             process.exit(1);
//         }
//     }

//     async whereBuilder(
//         params: {
//             type?: 'like' | 'in' | 'between';
//             table: string;
//             column: string;
//             value: string | number | undefined;
//             value2?: string | number | undefined;
//             arrayValue?: string[];
//             empty?: 'true' | 'false';
//             upper?: 'true' | 'false';
//         }[],
//         or?: 'true' | 'false',
//     ) {
//         const conditions: string[] = [];

//         for (const param of params) {
//             if (param.value || param.arrayValue) {
//                 let condition = '';
//                 if (param.empty != 'true') {
//                     if (param.type === 'like') {
//                         condition = `LIKE '%${param.value}%'`;
//                     } else if (param.type === 'in') {
//                         condition = param.arrayValue
//                             ? `IN (${param.arrayValue})`
//                             : `IN (${param.value})`;
//                     } else if (param.type === 'between') {
//                         condition = `BETWEEN ${param.value} AND ${param.value2}`;
//                     } else {
//                         condition = `= '${param.value}'`;
//                     }
//                     const conditionPart = param.upper
//                         ? `UPPER(${param.table}.${param.column}) ${condition}`
//                         : `${param.table}.${param.column} ${condition}`;
//                     conditions.push(conditionPart);
//                 }
//             }
//         }
//         if (conditions.length === 0) {
//             return '';
//         }
//         if (or == 'true') {
//             return `WHERE ${conditions.join(' OR ')}`;
//         }
//         return `WHERE ${conditions.join(' AND ')}`;
//     }

//     async execute<T = any>(
//         sql: string,
//         binds: any = [],
//         connection: any = null,
//     ): Promise<T> {
//         let isOpenTransaction = true;
//         try {
//             if (!connection) {
//                 connection = await this.open();
//                 isOpenTransaction = false;
//             }

//             const options: oracledb.ExecuteOptions & { dir: any } = {
//                 outFormat: this.oracle.OBJECT,
//                 maxRows: 1000,
//                 dir: this.oracle.BIND_IN,
//                 autoCommit: false,
//             };

//             const result = await connection.execute(sql, binds, options);

//             if (!isOpenTransaction) {
//                 this.commitAndClose(connection);
//             }

//             return result;
//         } catch (err) {
//             this.rollbackAndClose(connection);
//             throw new Error(err);
//         }
//     }

//     async executeManyRecords<T>(
//         sql: string,
//         records: oracledb.BindParameters[],
//         connection?: oracledb.Connection | null,
//     ): Promise<{ updates: number }> {
//         let isOpenTransaction = true;

//         const isLogging = process.env.DB_LOGGING_SOLUS === 'true';

//         if (!connection) {
//             connection = await this.open();
//             isOpenTransaction = false;
//         }

//         try {
//             const options: oracledb.ExecuteManyOptions = {
//                 autoCommit: !isOpenTransaction,
//                 batchErrors: true,
//             };

//             const result = await connection.executeMany(sql, records, options);

//             if (!isOpenTransaction) {
//                 await this.commitAndClose(connection);
//             }

//             if (isLogging) {
//                 this.logger.debug(sql);
//             }

//             return { updates: result.rowsAffected ? result.rowsAffected : 404 };
//         } catch (err) {
//             if (isLogging) {
//                 this.logger.debug(`executeMany: ${sql}`);
//             }
//             this.logger.error(`executeMany: ${err.stack}`);
//             throw new Error(err);
//         }
//     }
// }
