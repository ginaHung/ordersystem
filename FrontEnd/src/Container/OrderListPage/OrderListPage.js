/* eslint-disable react/no-deprecated */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { Tooltip, Table, Button, Divider, Input, message } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';

// import { verify } from '../../service/API';
import './OrderListPage.less';
import {
  LoginRouter, HeaderPageRouter, modeViewType, newOrderViewType,
  defaultColumn, dataSource,
} from '../../utils/define';
import imgAddOrder from '../../../img/add-btn.png';
import NewOrderForm from '../NewOrderForm/NewOrderForm';

const { Search } = Input;

class OrderListPage extends React.Component {

  initState = {
    username: sessionStorage.getItem('emplid'),
    ViewType: modeViewType.orderlistView,
    myOrderListArray: [],
    allOrderListArray: [],

    myOrderListColumn: [], // 我建立的訂單 table header
    allOrderListColumn: [], // 所有訂單 table header

    newOrderView: newOrderViewType.new,
    myOrderId: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount ------------------------------------

  // componentWillMount = () => { }

  componentDidMount = async () => {
    const { username, ViewType } = this.state;
    const { view, id } = this.props.match.params;
    // console.log(`'2' ${ViewType}`);

    if (await this.IsNullOrEmpty(username)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else {
      try {
        this.setState({
          ViewType: view === undefined || Object.values(modeViewType).indexOf(view) < 0 ? modeViewType.orderlistView : view,
          myOrderId: await this.IsNullOrEmpty(id) ? '' : id,
        });
        // console.log(`'1' ${ViewType}`);
        await this.fnSetColumnHeader();
        await this.fnGetmyList();
        await this.fnGetallList();

      } catch (e) {
        message.error(e.message);
      }
    }
  }

  // props update
  componentWillReceiveProps = async (nextProps) => {
    const { view } = nextProps.match.params;
    // console.log(`'componentWillReceiveProps' ${view} ${ViewType}`);
    this.setState({
      ViewType: view === undefined || Object.values(modeViewType).indexOf(view) < 0 ? modeViewType.orderlistView : view,
    });

    const { ViewType } = this.state;
    if (ViewType === modeViewType.orderlistView) {
      await this.fnSetColumnHeader();
      await this.fnGetmyList();
      await this.fnGetallList();
    }
  }

  // componentWillUpdate = () => { }

  componentDidUpdate = async () => {
    // const { ViewType } = this.state;
    // console.log(`u ViewType=${ViewType}`);
  }

  // #endregion mount ---------------------------------


  // #region get list ---------------------------------

  fnSetColumnHeader = async () => {
    const tempMyArr = [];
    const tempAllArr = [];

    for (let i = 0; i < defaultColumn.length; i += 1) {
      tempMyArr.push(defaultColumn[i]);
      tempAllArr.push(defaultColumn[i]);
    }

    tempMyArr.push({
      title: '操作',
      width: 130,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button size="middle" onClick={() => this.btnEditOrderList(record.id)}>
            編輯 - 完成
          </Button>
        </div>
      ),
    });

    tempAllArr.push({
      title: '操作',
      width: 130,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            size="middle"
            disabled={new Date(`${record.endtime}:59`) < new Date()}
            onClick={() => this.btnJoinOrder()}
          >
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

  fnReload = async () => {
    console.log('reload');
    this.handlePage(HeaderPageRouter);
    await this.fnGetmyList();
    await this.fnGetallList();
  }

  fnGetmyList = async () => {
    // console.log('get list');
    this.setState({
      myOrderListArray: dataSource,
    });
  }

  fnGetallList = async () => {
    this.setState({
      allOrderListArray: dataSource,
    });
  }

  // #endregion get list ------------------------------


  // #region btn --------------------------------------

  btnAddOrderList = () => {
    const { history } = this.props;

    this.setState({
      myOrderId: '',
      newOrderView: newOrderViewType.new,
    });
    history.push(`${HeaderPageRouter}/${modeViewType.neworderView}`);
  }

  btnEditOrderList = async (id) => {
    this.setState({
      myOrderId: id,
      newOrderView: newOrderViewType.edit,
    });
    this.handlePage(`${HeaderPageRouter}/${modeViewType.neworderView}/${id}`);
  }

  btnDeleteOrderList = () => {

  }

  btnOnSearch = (value) => {
    console.log(value);
  }

  btnJoinOrder = () => {

  }

  // #endregion btn ----------------------------------


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
      myOrderId, newOrderView,
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
                  <Button
                    shape="circle"
                    type="danger"
                    icon={<FileAddOutlined />}
                    size="large"
                    style={{ marginLeft: 10 }}
                    onClick={() => this.btnAddOrderList()}
                  />
                </Tooltip>
                {/* <Tooltip placement="topLeft" title="建立訂單">
                  <a onClick={() => this.btnAddOrderList()}>
                    <img alt="icon" src={imgAddOrder} style={{ width: 25, marginLeft: 10 }} />
                  </a>
                </Tooltip> */}

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
              <div style={{ marginTop: 5, width: '100%' }}>
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
          : <div />
        }

        {
          ViewType === modeViewType.neworderView ? (
            <NewOrderForm
              orderid={myOrderId}
              viewType={newOrderView}
              fnReload={this.fnReload}
            />
          )
            : <div />
        }
      </div >
    );
  }
}

OrderListPage.propTypes = {
  history: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
};

OrderListPage.defaultProps = {
  history: null,
  match: {},
};

export default OrderListPage;
