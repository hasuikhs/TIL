import path from 'path';
import DataManager from '../../implements/dataManager';

class AccountDataManager extends DataManager {

  constructor() {
    super('account');
  }

  select(idx: string): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }
}

export default AccountDataManager;