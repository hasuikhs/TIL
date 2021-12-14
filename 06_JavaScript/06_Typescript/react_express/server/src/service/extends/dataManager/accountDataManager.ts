import path from 'path';
import DataManager from '../../implements/dataManager';

class AccountDataManager extends DataManager {

  constructor() {
    super('account');
  }

  select(idx: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._curDB.findOne({ idx: idx }, (err, result) => {
        if (err) reject(new Error(`Account select error. cause${err}`));

        resolve(result);
      });
    });
  }
}

export default AccountDataManager;