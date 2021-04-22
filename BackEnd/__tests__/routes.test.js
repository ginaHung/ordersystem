const request = require('supertest');
const server = require('../index.js');

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!');
});


afterAll(() => {
  // do something 在測試完畢之後
  // close the server after each test
  server.close();
  console.log('server closed!');
});

// 一般unit test會盡量跑到所有的程式碼，而第一個會寫成功的，
// 後面會再加上會導致此驗證功能會失敗的參數，以利盡量跑完全部的程式碼

// 這是打根目錄，returnString則是api會回傳的字串，所以這邊成功的條件就是回傳值跟我們傳過去的值要一樣
describe('basic route tests', () => {
  test('get home route post /api/query/returnstring', async () => {
    const response = await request(server).post('/api/query/returnstring').send({
      returnString: 'hello world',
    });
    expect(response.status).toEqual(200);
    expect(response.text).toContain('hello world');
  });
});

// 這是打根目錄，returnString則是api會回傳的字串，因為是fail test，所以這邊成功的條件就是回傳說沒有帶上returnString is undefined
describe('basic route failed tests', () => {
  test('get home route post /returnstring', async () => {
    const response = await request(server).post('/api/query/returnstring');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('returnString is undefined');
  });
});

