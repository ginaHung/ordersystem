// exports.CHECKLIST_CLOSE = Object.freeze(
//   {
//     OPEN: 'N', CLOSE: 'Y',
//   },
// );

// exports.SKIP_CHECK_TOKEN_URL = [
//   '/api/login/verify',
//   '/api/login/testoracle',
//   '/api/introduction/getIntroductionFile'];

import React from 'react';

const SYSTEM_TITLE = '下午茶點餐系統';
const LoginRouter = '/login';
const HeaderPageRouter = '/orderlist';

const modeViewType = Object.freeze(
  {
    orderlistView: 'orderlistView', neworderView: 'myOrder', joinView: 'joinOrder',
  },
);

const newOrderViewType = Object.freeze(
  {
    new: 'new', edit: 'edit', view: 'view',
  },
);


const defaultColumn = [
  {
    title: '單號',
    dataIndex: 'id_num',
    align: 'center',
    width: 130,
  },
  {
    title: '名稱',
    dataIndex: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: '建立者',
    dataIndex: 'user_name',
    align: 'center',
    width: 130,
  },
  {
    title: '結案時間',
    dataIndex: 'endtime',
    align: 'center',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'dscribe',
    align: 'left',
    // width: 200,
    render: (text, record) => (
      <div>
        {(record.dscribe.length > 30) ? `${record.dscribe.slice(0, 30)}...` : record.dscribe}
      </div>
    ),
  },
];

const dataSource = [
  {
    id: '1',
    id_num: '20210421-0000',
    name: '西湖区湖底公园1号',
    user_id: '10910305',
    user_name: 'Gina',
    endtime: '2021/05/29 10:59',
    dscribe: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
  },
  {
    id: '2',
    id_num: '20210421-0005',
    name: '訂單2號',
    user_id: '10910305',
    user_name: 'gina',
    endtime: '2021/05/29 10:59',
    dscribe: '訂單2號',
  },
  {
    id: '3',
    id_num: '20210421-0010',
    name: '訂單3號',
    user_id: '10910305',
    user_name: 'gina',
    endtime: '2021/05/29 10:59',
    dscribe: '訂單3號',
  },
  {
    id: '4',
    id_num: '20210421-0015',
    name: '訂單4號',
    user_id: '10905306',
    user_name: 'gangtzu',
    endtime: '2021/04/29 10:59',
    dscribe: '訂單4號',
  },
  {
    id: '5',
    id_num: '20210421-0020',
    name: '訂單5號',
    user_id: '10905306',
    user_name: 'fangtzu',
    endtime: '2021/04/29 10:59',
    dscribe: '訂單5號',
  },
  {
    id: '6',
    id_num: '20210421-0030',
    name: '訂單6號',
    user_id: '10910305',
    user_name: 'gina',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單6號',
  },
  {
    id: '7',
    id_num: '20210421-0150',
    name: '訂單2號',
    user_id: '10710058',
    user_name: 'kelvin',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單7號',
  },
  {
    id: '8',
    id_num: '20210421-1000',
    name: '訂單8號',
    user_id: '10910305',
    user_name: '4我',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單8號',
  },
  {
    id: '9',
    id_num: '20210421-0300',
    name: '訂單9號',
    user_id: '10910305',
    user_name: '你猜',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單9號',
  },
  {
    id: '10',
    id_num: '20210421-1700',
    name: '訂單10號',
    user_id: '10910305',
    user_name: '你猜',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單10號',
  },
  {
    id: '11',
    id_num: '20210421-0800',
    name: '訂單11號',
    user_id: '10910305',
    user_name: 'gina',
    endtime: '2021/01/21 16:21',
    dscribe: '訂單11號',
  },
];
const dataSource2 = [];

export {
  SYSTEM_TITLE,
  LoginRouter,
  HeaderPageRouter,
  modeViewType,
  newOrderViewType,
  defaultColumn,
  dataSource,
};
