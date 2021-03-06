import React from 'react';
import moment from 'moment';

const AAD_CLIENT_ID = '225a8ec0-122d-46d2-9caa-852a641a12af';
const SYSTEM_TITLE = '下午茶點餐系統';
const LoginRouter = '/login';
const HeaderPageRouter = '/orderlist';

const modeViewType = Object.freeze(
  {
    orderlistView: 'orderlistView', neworderView: 'myOrder', joinView: 'joinOrder',
  },
);

const defaultColumn = [
  {
    title: '單號',
    dataIndex: 'id_num',
    align: 'center',
    width: 130,
    sorter: {
      compare: (a, b) => a.id_num.localeCompare(b.id_num),
      multiple: 1,
    },
  },
  {
    title: '名稱',
    dataIndex: 'name',
    align: 'center',
    width: 200,
    sorter: {
      compare: (a, b) => a.id_num.localeCompare(b.id_num),
      multiple: 2,
    },
  },
  {
    title: '建立者',
    dataIndex: 'user_name',
    align: 'center',
    width: 130,
    sorter: {
      compare: (a, b) => a.id_num.localeCompare(b.id_num),
      multiple: 3,
    },
  },
  {
    title: '結案時間',
    dataIndex: 'endtime',
    align: 'center',
    width: 150,
    sorter: {
      compare: (a, b) => moment(a.endtime).unix() - moment(b.endtime).unix(),
      multiple: 4,
    },
  },
  {
    title: '狀態',
    dataIndex: 'endtime',
    align: 'center',
    width: 100,
    render: (text, record) => (
      <div>
        {(new Date(`${record.endtime}:59`) > new Date())
          ? (<span style={{ color: 'red' }}>進行中</span>) : (<span style={{ color: 'green' }}>已結單</span>)}
      </div>
    ),
  },
  {
    title: '描述',
    dataIndex: 'describe',
    align: 'left',
    render: (text, record) => (
      <div>
        {(record.describe && record.describe.length > 20) ? `${record.describe.slice(0, 20)}...` : record.describe}
      </div>
    ),
  },
];

// #region xxxxx
/*
 const NewOrderdata = [{
  id: '1',
  heaader_id: '1',
  user_name: 'fanftzu',
  item_name: 'item_name_1',
  class_1: 'class_1_1',
  class_2: 'class_2_1',
  class_3: 'class_3_1',
  class_4: 'class_4_1',
  class_5: 'class_5_1',
  remark: 'remark_1',
  price: '90',
  create_user: '10905306',
}, {
  id: '2',
  heaader_id: '1',
  user_name: 'Gina',
  item_name: 'item_name_1',
  class_1: 'class_1_2',
  class_2: 'class_2_2',
  class_3: 'class_3_2',
  class_4: 'class_4_2',
  class_5: 'class_5_2',
  remark: 'remark_2',
  price: '145',
  create_user: '10910305',
}, {
  id: '3',
  heaader_id: '1',
  user_name: 'Fangtzu',
  item_name: 'item_name_3',
  class_1: 'class_1_3',
  class_2: 'class_2_3',
  class_3: 'class_3_3',
  class_4: 'class_4_3',
  class_5: 'class_5_3',
  remark: 'remark_3',
  price: '359',
  create_user: '10905306',
}, {
  id: '4',
  heaader_id: '1',
  user_name: 'Gina',
  item_name: 'item_name_4',
  class_1: 'class_1_4',
  class_2: 'class_2_4',
  class_3: 'class_3_4',
  class_4: 'class_4_4',
  class_5: 'class_5_4',
  remark: 'remark_4',
  price: '420',
  create_user: '10910305',
}, {
  id: '5',
  heaader_id: '1',
  user_name: 'Gina',
  item_name: 'item_name_1',
  class_1: 'class_1_5',
  class_2: 'class_2_5',
  class_3: 'class_3_5',
  class_4: 'class_4_5',
  class_5: 'class_5_5',
  remark: 'remark_5',
  price: '201',
  create_user: '10910305',
},
];

const dataSource = [
  {
    id: '1',
    id_num: '20210421-0001',
    name: '西湖区湖底公园1号',
    user_id: '10910305',
    user_name: 'Gina',
    endtime: '2021/05/29 10:59',
    describe: `西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公
    园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号
    
    https://ant.design/components/icon-cn/#API
    1234`,
    invite_code: '12345',
    class_1: 'c1-1',
    class_2: 'c2-1',
    class_3: '',
    class_4: 'c4-1',
    class_5: '',
    orderManu: '',
  }, {
    id: '2',
    id_num: '20210421-0002',
    name: '訂單 2號',
    user_id: '10910305',
    user_name: 'Gina',
    endtime: '2021/05/01 10:59',
    describe: `12345
    123456
    123
    12345678`,
    invite_code: '12345',
    class_1: 'c1-2',
    class_2: 'c2-2',
    class_3: 'c3-2',
    class_4: '',
    class_5: '',
  }, {
    id: '3',
    id_num: '20210421-0003',
    name: '訂單 3號',
    user_id: '10905306',
    user_name: 'Fangtzu',
    endtime: '2021/06/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-3',
    class_2: 'c2-3',
    class_3: '',
    class_4: '',
    class_5: '',
  }, {
    id: '4',
    id_num: '20210421-0004',
    name: '訂單 4號',
    user_id: '10905306',
    user_name: 'Fangtzu',
    endtime: '2021/04/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-4',
    class_2: 'c2-4',
    class_3: 'c3-4',
    class_4: '',
    class_5: '',
  }, {
    id: '5',
    id_num: '20210421-0005',
    name: '訂單 5號',
    user_id: '10910305',
    user_name: 'Gina',
    endtime: '2021/04/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-5',
    class_2: 'c2-5',
    class_3: 'c3-5',
    class_4: 'c4-5',
    class_5: 'c5-5',
  }, {
    id: '6',
    id_num: '20210421-0006',
    name: '訂單 6號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2021/05/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-6',
    class_2: 'c2-6',
    class_3: 'c3-6',
    class_4: '',
    class_5: '',
  }, {
    id: '7',
    id_num: '20210421-0007',
    name: '訂單 7號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2021/05/05 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-7',
    class_2: 'c2-7',
    class_3: 'c3-7',
    class_4: '',
    class_5: '',
  }, {
    id: '8',
    id_num: '20210421-0008',
    name: '訂單 8號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2020/05/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-8',
    class_2: 'c2-8',
    class_3: 'c3-8',
    class_4: '',
    class_5: '',
  }, {
    id: '9',
    id_num: '20210421-0009',
    name: '訂單 9號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2020/05/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-9',
    class_2: 'c2-9',
    class_3: 'c3-9',
    class_4: '',
    class_5: '',
  }, {
    id: '10',
    id_num: '20210421-00010',
    name: '訂單 10號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2021/04/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-10',
    class_2: 'c2-10',
    class_3: 'c3-10',
    class_4: '',
    class_5: '',
  }, {
    id: '11',
    id_num: '20210421-00011',
    name: '訂單 11號',
    user_id: '',
    user_name: 'Gina',
    endtime: '2021/03/29 10:59',
    describe: '',
    invite_code: '12345',
    class_1: 'c1-11',
    class_2: 'c2-11',
    class_3: 'c3-11',
    class_4: '',
    class_5: '',
  },
]; */
// #endregion

export {
  AAD_CLIENT_ID,
  SYSTEM_TITLE,
  LoginRouter, HeaderPageRouter,
  modeViewType,
  defaultColumn,
};
