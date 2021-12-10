import Datastore from 'nedb';
import path from 'path';

interface user {
  idx: number;
  name: string;
  group: string;
}

interface account {
  idx: number;
  id: string;
  pw: string;
}

interface DB {
  _path: string;

  _accounts: Datastore;
  _users: Datastore;

  _curDB: Datastore;

  matchDB(type: string): void;

  insert(type: string, doc: user|account): void;
  select(type: string, group: string|undefined): void;
  update(type: string, idx: number, doc: user|account): void;
  delete(type: string, idx: number): void;
}

function DB(this: DB) {

  if (!new.target) {
    throw new Error('Create DB using new operator.');
  }

  this._path      = `${path.resolve()}/server/data`;

  this._accounts  = new Datastore({filename: `${this._path}/test1.db`, autoload: true});
  this._users     = new Datastore({filename: `${this._path}/test2.db`, autoload: true});

  this._curDB   = this._accounts;  // default DB

  this.matchDB = type => {
    if (type.includes('account')) {
      this._curDB = this._accounts;
    } else if (type.includes('user')) {
      this._curDB = this._users;
    } else {
      throw new Error('Invalid DB type.');
    }
  }

  this.insert = (type, doc) => {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.insert(doc, (err, result) => {
        if (err) reject(new Error(`Insert error. cause: ${err}`));

        resolve(result);
      });
    });
  }

  this.select = (type, group) => {
    this.matchDB(type);

    if (type.includes('account') && group) {
      return new Promise<any>((resolve, reject) => {
        this._curDB.findOne({group: {$in: [group]}}, (err, result) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(result);
        });
      });
    } else if (group) {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({group: group}).sort({idx: 1}).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(results);
        });
      });
    } else {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({}).sort({idx: 1}).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${err}`));

          resolve(results);
        });
      });
    }
  }

  this.update = (type, idx, doc) => {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.update({idx: idx}, {$set: doc}, {}, (err, result) => {
        if (err) reject(new Error(`Update error. cause: ${err}`));

        resolve(result);
      });
    });
  }

  this.delete = (type, idx) => {
    this.matchDB(type);

    return new Promise<any>((resolve, reject) => {
      this._curDB.remove({idx: idx}, (err, result) => {
        if (err) reject(new Error(`Delete error. cause: ${err}`));

        resolve(result);
      });
    });
  }
}