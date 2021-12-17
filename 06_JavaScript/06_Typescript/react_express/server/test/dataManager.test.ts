import DataManager from '../src/service/implements/dataManager'

describe('Test DataManger methods.', () => {

  // account
  // {"id":"test_id_1","password":"test_pw_1","group":["group_1"]}

  // doc
  // {"title": "title_1", "url": "url_1"}

  // server
  // {"name":"test_server_1","key":"server_key_1","cpu":4,"memory":16,"disk":50,"group":"group_1","active":true,"publicIp":"123.123.123.123"}

  // user
  // {"name":"test_1"}

  const accountDataManager = new DataManager('account');

  it.skip('Insert test', async () => {

    let account = {
      "id": "test_id_2", "password": "test_pw_2", "group": ["group_2"]
    }

    await expect(accountDataManager.insert(account)).resolves.toBe(1);
  });

  it.skip('Select all test', async () => {
    await expect(accountDataManager.select()).resolves.toEqual([
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":1,"_id":"7cwB5ilSPV4W3n4H"},
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":2,"_id":"1I69XNSmhxz4oprE"},
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":3,"_id":"HZRuA7lD2O4tZ604"},
      {"id":"test_id_2","password":"test_pw_2","group":["group_2"],"idx":4,"_id":"GybYEBYJ7rqKr2Wc"}
    ]);
  });

  it.skip('Select idx test', async () => {
    await expect(accountDataManager.select(1)).resolves.toEqual(
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":1,"_id":"7cwB5ilSPV4W3n4H"}
    );
  });

  it.skip('Select group test', async () => {
    await expect(accountDataManager.select('group_1')).resolves.toEqual([
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":1,"_id":"7cwB5ilSPV4W3n4H"},
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":2,"_id":"1I69XNSmhxz4oprE"},
      {"id":"test_id_1","password":"test_pw_1","group":["group_1"],"idx":3,"_id":"HZRuA7lD2O4tZ604"}
    ]);
  });

  it.skip('Update test', async () => {
    await expect(accountDataManager.update(4, {"id":"test_id_2","password":"test_pw_2","group":["group_2"]})).resolves.toBe(1);
  });

  it.skip('Delete test', async () => {
    await expect(accountDataManager.delete(4)).resolves.toBe(1);
  });

});