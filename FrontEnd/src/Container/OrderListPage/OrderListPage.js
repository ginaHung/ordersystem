/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { Tooltip, Table, Button, Divider, Input, message } from 'antd';

// import { verify } from '../../service/API';
import './OrderListPage.less';
import {
  SYSTEM_TITLE,
  LoginRouter, HeaderPageRouter, modeViewType,
  defaultColumn, dataSource,
} from '../../utils/define';
import imgAddOrder from '../../../img/add-button.png';
import NewOrderForm from '../../Component/NewOrderForm/NewOrderForm';

const { Search } = Input;
// const modeViewType = Object.freeze(
//   {
//     orderlistView: 'orderlistView', neworderView: 'newOrder', joinView: 'joinOrder',
//   },
// );

class OrderListPage extends React.Component {

  initState = {
    username: sessionStorage.getItem('emplid'),
    ViewType: modeViewType.orderlistView,
    myOrderListArray: [],
    allOrderListArray: [],

    myOrderListColumn: [], // 我建立的訂單 table header
    allOrderListColumn: [], // 所有訂單 table header

    myOrderId: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount

  // componentWillMount = () => { }

  componentDidMount = async () => {
    const { username } = this.state;
    // console.log(ViewType);
    if (await this.IsNullOrEmpty(username)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else {
      try {
        await this.fnSetColumnHeader();
        await this.fnGetmyList();
        await this.fnGetallList();
      } catch (e) {
        message.error(e.message);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { view } = nextProps.match.params;
    this.setState({
      ViewType: view === undefined || Object.values(modeViewType).indexOf(view) < 0 ? modeViewType.orderlistView : view,
    });
  }

  // componentWillUpdate = () => { }

  componentDidUpdate = (lastProps, lastState) => {
    const { ViewType } = this.state;
    console.log(`u ViewType=${ViewType}`);
  }

  // #endregion mount

  // #region get list

  fnSetColumnHeader = async () => {
    const tempMyArr = [];
    const tempAllArr = [];

    for (let i = 0; i < defaultColumn.length; i += 1) {
      tempMyArr.push(defaultColumn[i]);
      tempAllArr.push(defaultColumn[i]);
    }

    tempMyArr.push({
      title: '操作',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button size="middle" onClick={() => this.btnEditOrderList(record.id)}>
            編輯
          </Button>
          <Button size="middle" style={{ marginLeft: 5 }} onClick={() => this.btnDeleteOrderList()}>
            刪除
          </Button>
        </div>
      ),
    });

    tempAllArr.push({
      title: '操作',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button size="middle" onClick={() => this.btnJoinOrder()}>
            +1
          </Button>
        </div>
      ),
    });

    this.setState({
      myOrderListColumn: tempMyArr,
      allOrderListColumn: tempAllArr,
    });
  }

  fnGetmyList = async () => {
    this.setState({
      myOrderListArray: dataSource,
    });
  }

  fnGetallList = async () => {
    this.setState({
      allOrderListArray: dataSource,
    });
  }

  // #endregion get list

  // #region btn

  btnAddOrderList = () => {
    const { history } = this.props;
    history.push(`${HeaderPageRouter}/${modeViewType.neworderView}`);
    this.setState({
      // ViewType: modeViewType.neworderView,
      myOrderId: '',
    });
  }

  btnEditOrderList = (id) => {
    const { history } = this.props;
    history.push(`${HeaderPageRouter}/${modeViewType.neworderView}`);
    this.setState({
      // ViewType: modeViewType.neworderView,
      myOrderId: id,
    });
  }

  btnDeleteOrderList = () => { }

  btnOnSearch = (value) => { console.log(value); }

  btnJoinOrder = () => { }

  // #endregion btn

  handlePage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }

  render() {
    const {
      ViewType,
      myOrderListColumn, allOrderListColumn,
      myOrderListArray, allOrderListArray,
      myOrderId,
    } = this.state;
    return (
      <div>
        { ViewType === modeViewType.orderlistView ? (
          <div>
            <div className="panel-style" style={{ height: 290 }}>
              <div style={{ marginTop: 5, width: '100%' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
                  我建立的訂單
                </span>
                <Tooltip placement="topLeft" title="建立訂單">
                  <a onClick={() => this.btnAddOrderList()}>
                    <img alt="icon" src={imgAddOrder} style={{ width: 25, marginLeft: 10 }} />
                  </a>
                </Tooltip>
              </div>
              <div style={{ marginTop: 5, width: '100%', height: 180 }}>
                <Table
                  columns={myOrderListColumn}
                  dataSource={myOrderListArray}
                  bordered
                  size="small"
                  pagination={{
                    defaultPageSize: 3,
                  }}
                  scroll={{ x: 'max-content' }}
                  locale={{ emptyText: '快來揪團 > <' }}
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
                  onSearch={this.btnOnSearch}
                />
              </div>
              <div style={{ marginTop: 5, width: '100%', height: 180 }}>
                <Table
                  columns={allOrderListColumn}
                  dataSource={allOrderListArray}
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
        )
          : <div />}

        { ViewType === modeViewType.neworderView ? (
          <NewOrderForm
            orderid={myOrderId}
          />
          // <div>123</div>
        )
          : <div />}
      </div>
    );
  }
}

OrderListPage.propTypes = {
  // jumpRoute: PropTypes.func,
  history: PropTypes.func,
  match: PropTypes.object,
  // ViewType: PropTypes.element,
};

OrderListPage.defaultProps = {
  // jumpRoute: null,
  history: null,
  match: {},
  // ViewType: '',
};

export default OrderListPage;
