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

const defaultColumn = [
  {
    title: '單號',
    dataIndex: 'id',
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
    dataIndex: 'user',
    align: 'center',
    width: 100,
  },
  {
    title: '結案時間',
    dataIndex: 'endtime',
    align: 'center',
    width: 200,
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

const modeViewType = Object.freeze(
  {
    orderlistView: 'orderlistView', neworderView: 'myOrder', joinView: 'joinOrder',
  },
);

const dataSource = [
  {
    id: '202104210000',
    name: '西湖区湖底公园1号',
    user: 'Gina',
    endtime: '2021/01/21 16:21:02',
    dscribe: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
  },
  {
    id: '1',
    name: '10910305',
    user: '10910305',
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
  {
    id: '1',
    name: '胡彦斌',
    user: 32,
    endtime: '西湖区湖底公园1号',
    dscribe: '',
  },
];
const dataSource2 = [];

export {
  SYSTEM_TITLE,
  LoginRouter,
  HeaderPageRouter,
  modeViewType,
  defaultColumn,
  dataSource,
};
