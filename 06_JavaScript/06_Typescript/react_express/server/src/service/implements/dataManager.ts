import Datastore from 'nedb';
import path from 'path';
import { account, accountExt } from '../../domain/account.interface';
import { doc, docExt } from '../../domain/doc.interface';
import { server, serverExt } from '../../domain/server.interface';
import { user, userExt } from '../../domain/user.interface';
import DataManagerInterface from '../interfaces/dataManager.interface';

class DataManager implements DataManagerInterface {

  private _path: string;
  readonly _curDB: Datastore;

  constructor(type: string) {
    this._path = `${path.dirname(__filename)}/../../../data`;

    if (type.includes('account')) {
      this._curDB = new Datastore({ filename: `${this._path}/accounts.db`,  autoload: true });
    } else if (type.includes('doc')) {
      this._curDB = new Datastore({ filename: `${this._path}/docs.db`,      autoload: true });
    } else if (type.includes('server')) {
      this._curDB = new Datastore({ filename: `${this._path}/servers.db`,   autoload: true });
    } else if (type.includes('user')) {
      this._curDB = new Datastore({ filename: `${this._path}/users.db`,     autoload: true });
    } else {
      throw new Error('Invalid type.');
    }

  }

  private getNextIdx(): Promise<any> {

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

  public async insert(doc: account | doc | server | user): Promise<any> {

    let docExt: accountExt | docExt | serverExt | userExt = { ...doc, ...{ idx: await this.getNextIdx() } };

    return new Promise<any>((resolve, reject) => {
      this._curDB.insert(docExt, (err, result) => {
        if (err) reject(new Error(`Insert error. cause: ${err}`));

        if (result) {
          resolve(1); // sucess
        } else {
          resolve(0); // fail?
        }
      });
    });
  }

  // overloading
  public select(idxOrGroup: number|string): Promise<any|any[]> {
    if (typeof idxOrGroup === 'number') {
      return new Promise<any>((resolve, reject) => {
        this._curDB.findOne({ idx: idxOrGroup }, (err, result) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(result);
        });
      });
    } else {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({ group: idxOrGroup }).sort({ idx: 1}).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(results);
        });
      });
    }
  }

  public update(idx: number, doc: account | doc | server | user): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.update({ idx: idx }, { $set: doc }, {}, (err, result) => {
        if (err) reject(new Error(`Update error. cause: ${err}`));

        resolve(result);
      });
    });
  }

  public delete(idx: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.remove({ idx: idx }, (err, result) => {
        if (err) reject(new Error(`Delete error. cause: ${err}`));

        resolve(result);
      });
    });
  }
}

export default DataManager;