import Datastore from 'nedb';
import path from 'path';
import { account, accountExt } from '../../domain/account.interface';
import { doc, docExt } from '../../domain/doc.interface';
import { server, serverExt } from '../../domain/server.interface';
import { user, userExt } from '../../domain/user.interface';
import DataManagerInterface from '../interfaces/dataManager.interface';

class DataManager implements DataManagerInterface {

  private _path: string;

  private _servers: Datastore;
  private _accounts: Datastore;
  private _users: Datastore;
  private _docs: Datastore;

  private _curDB: Datastore;

  constructor() {
    this._path = `${path.resolve()}/server/data`;

    this._servers = new Datastore({ filename: `${this._path}/servers.db`, autoload: true });
    this._accounts = new Datastore({ filename: `${this._path}/accounts.db`, autoload: true });
    this._users = new Datastore({ filename: `${this._path}/users.db`, autoload: true });
    this._docs = new Datastore({ filename: `${this._path}/docs.db`, autoload: true });

    this._curDB = this._servers; // default
  }

  private matchDB(type: string): void {
    if (type.includes('server')) {
      this._curDB = this._servers;
    } else if (type.includes('account')) {
      this._curDB = this._accounts;
    } else if (type.includes('user')) {
      this._curDB = this._users;
    } else if (type.includes('doc')) {
      this._curDB = this._docs;
    } else {
      throw new Error('Invalid type.');
    }
  }

  private getNextIdx(type: string): Promise<any> {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.find({}).sort({ idx: -1 }).limit(1).exec((err, results) => {
        if (err) reject(new Error(`Get max index error. cause: ${err}`));

        if (results.length > 0) {
          resolve(++results[0].idx);
        } else {
          resolve(1);
        }
      });
    });
  }

  async insert(type: string, doc: account | doc | server | user): Promise<any> {
    this.matchDB(type);

    let docExt: accountExt | docExt | serverExt | userExt = { ...doc, ...{ idx: await this.getNextIdx(type) } };

    return new Promise<any>((resolve, reject) => {
      this._curDB.insert(docExt, (err, result) => {
        if (err) reject(new Error(`Insert error. cause: ${err}`));

        resolve(result);
      });
    });
  }

  select(type: string, group?: string): Promise<any> {
    this.matchDB(type);

    if (type.includes('account') && group) {
      return new Promise<any>((resolve, reject) => {
        this._curDB.findOne({ group: { $in: [group] } }, (err, result) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(result);
        });
      });
    } else if (group) {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({ group: group }).sort({ idx: 1 }).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(results);
        });
      });
    } else {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({}).sort({ idx: type.includes('doc') ? -1 : 1 }).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(results);
        });
      });
    }
  }

  update(type: string, idx: number, doc: account | doc | server | user): Promise<any> {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.update({ idx: idx }, { $set: doc }, {}, (err, result) => {
        if (err) reject(new Error(`Update error. cause: ${err}`));

        resolve(result);
      });
    });
  }

  delete(type: string, idx: number): Promise<any> {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.remove({ idx: idx }, (err, result) => {
        if (err) reject(new Error(`Delete error. cause: ${err}`));

        resolve(result);
      });
    });
  }
}

export default DataManager;