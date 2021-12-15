import DataManager from '../src/service/implements/dataManager'

describe("Test DataManger methods.", () => {

  // account
  // {"id":"test_id_1","password":"test_pw_1","group":["group_1"]}

  // doc
  // {"title": "title_1", "url": "url_1"}

  // server
  // {"name":"test_server_1","key":"server_key_1","cpu":4,"memory":16,"disk":50,"group":"group_1","active":true,"publicIp":"123.123.123.123"}

  // user
  // {"name":"test_1"}

  const accountDataManager = new DataManager('account');

  it('Insert test', async () => {

    let account = {
      "id": "test_id_1", "password": "test_pw_1", "group": ["group_1"]
    }

    await expect(accountDataManager.insert(account)).resolves.toBe(1);
  });

  // it('Select test', () => {

  // });

  // it('Update test', () => {

  // });

  // it('Delete test', () => {

  // });

});