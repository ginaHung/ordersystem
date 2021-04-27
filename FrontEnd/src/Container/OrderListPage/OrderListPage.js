/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import {
  Tooltip,
  Table,
  Button,
  Divider,
  Input,
  message,
} from 'antd';

import './OrderListPage.less';
// import { verify } from '../../service/API';
import {
  SYSTEM_TITLE,
  LoginRouter, HeaderPageRouter,
  dataSource,
} from '../../utils/define';
import imgAddOrder from '../../../img/add-button.png';

const { Search } = Input;
class OrderListPage extends React.Component {
  refStep1 = React.createRef();

  initState = {
    username: sessionStorage.getItem('emplid'),

    // 我建立的訂單 table header
    myOrderListColumn: [
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
      {
        title: '操作',
        width: 170,
        fixed: 'right',
        align: 'center',
        render: (text, record) => (
          <div>
            <Button size="middle" onClick={() => this.editOrderListBtn()}>
              編輯
            </Button>
            <Button size="middle" style={{ marginLeft: 5 }} onClick={() => this.deleteOrderListBtn()}>
              刪除
            </Button>
          </div>
        ),
      },
    ],

    // 所有訂單 table header
    allOrderListColumn: [
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
      {
        title: '操作',
        width: 10,
        fixed: 'right',
        align: 'center',
        render: (text, record) => (
          <div>
            <Button size="middle" onClick={() => this.joinOrderBtn()}>
              +1
            </Button>
          </div>
        ),
      },
    ],
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }

  componentWillMount = () => { }

  componentDidMount = async () => { }

  componentWillUpdate = () => { }

  componentDidUpdate = (lastProps, lastState) => { }

  changeUserName = (e) => {
    // console.log('changeDomain', e.target.value);
    this.setState({
      username: e.target.value,
    });
  }

  handlePage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  addOrderListBtn = () => { }

  editOrderListBtn = () => { }

  deleteOrderListBtn = () => { }

  onSearchBtn = (value) => { console.log(value); }

  joinOrderBtn = () => { }

  render() {
    const { myOrderListColumn, allOrderListColumn } = this.state;
    return (
      <div>
        <div className="panel-style" style={{ height: 290 }}>
          <div style={{ marginTop: 5, width: '100%' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
              我建立的訂單
            </span>
            <Tooltip placement="topLeft" title="建立訂單">
              <a onClick={() => this.addOrderListBtn()}>
                <img alt="icon" src={imgAddOrder} style={{ width: 25, marginLeft: 10 }} />
              </a>
            </Tooltip>
          </div>
          <div style={{ marginTop: 5, width: '100%', height: 180 }}>
            <Table
              columns={myOrderListColumn}
              dataSource={dataSource}
              bordered
              size="small"
              pagination={{
                defaultPageSize: 3,
              }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
        <Divider style={{ width: '60%', backgroundColor: '#92a69f', marginTop: 0 }} />

        <div className="panel-style">
          <div style={{ marginTop: 5, width: '100%' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
              所有訂單
            </span>
            <Search
              style={{ width: 200, marginLeft: 10 }}
              allowClear="true"
              placeholder="input search text"
              onSearch={this.onSearchBtn}
            />
          </div>
          <div style={{ marginTop: 5, width: '100%', height: 180 }}>
            <Table
              columns={allOrderListColumn}
              dataSource={dataSource}
              bordered
              size="small"
              pagination={{
                defaultPageSize: 10,
              }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>

      </div>
    );
  }
}

OrderListPage.propTypes = {
  jumpRoute: PropTypes.func,
  history: PropTypes.func,
};

OrderListPage.defaultProps = {
  jumpRoute: null,
  history: null,
};

export default OrderListPage;
