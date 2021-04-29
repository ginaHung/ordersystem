/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Route } from 'react-router-dom';
import { Tooltip, Table, Button, Divider, Input, message, DatePicker, TimePicker } from 'antd';

// import { verify } from '../../service/API';
import {
  SYSTEM_TITLE,
  LoginRouter, HeaderPageRouter, newOrderViewType,
  dataSource, defaultColumn,
} from '../../utils/define';
import './NewOrderForm.less';
// import imgAddOrder from '../../../img/add-button.png';

const { TextArea } = Input;

class NewOrderForm extends React.Component {

  initState = {
    username: sessionStorage.getItem('emplid'),
    orderId: this.props.orderid,
    viewType: this.props.viewType,
    orderNum: '',
    orderName: '',
    orderDiscribe: '',
    orderEndDate: '',
    orderEndTime: '',
    orderCode: '',
    orderManu: '',
    OrderClass: ['', '', '', '', ''],
    // myOrderListArray: [],
    // allOrderListArray: [],
    // myOrderListColumn: [], // 我建立的訂單 table header
    // allOrderListColumn: [], // 所有訂單 table header

  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount
  componentWillMount = () => { }

  componentDidMount = async () => {
    const { username, orderId, viewType } = this.state;
    if (await this.IsNullOrEmpty(username)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else {
      try {
        console.log(`orderid= ${orderId}`);
        if (await this.IsNullOrEmpty(orderId)) { // add
          this.setState({
            viewType: newOrderViewType.new,
            orderNum: await this.createOrderNum(),
          });
        } else { // edit, view
          this.setState({
            orderNum: '20210421-0000',
            orderName: '西湖区湖底公园1号',
          });
        }
      } catch (e) {
        message.error(e.message);
      }
    }
  }

  componentWillUpdate = () => { }

  componentDidUpdate = () => { }

  // #endregion mount

  // #region get list

  fnSetColumnHeader = async () => {
    // const tempMyArr = [];
    // const tempAllArr = [];

    // for (let i = 0; i < defaultColumn.length; i += 1) {
    //   tempMyArr.push(defaultColumn[i]);
    //   tempAllArr.push(defaultColumn[i]);
    // }

    // tempMyArr.push({
    //   title: '操作',
    //   width: 150,
    //   fixed: 'right',
    //   align: 'center',
    //   render: (text, record) => (
    //     <div>
    //       <Button size="middle" onClick={() => this.btnEditOrderList()}>
    //         編輯
    //       </Button>
    //       <Button size="middle" style={{ marginLeft: 5 }} onClick={() => this.btnDeleteOrderList()}>
    //         刪除
    //       </Button>
    //     </div>
    //   ),
    // });

    // tempAllArr.push({
    //   title: '操作',
    //   width: 150,
    //   fixed: 'right',
    //   align: 'center',
    //   render: (text, record) => (
    //     <div>
    //       <Button size="middle" onClick={() => this.btnJoinOrder()}>
    //         +1
    //       </Button>
    //     </div>
    //   ),
    // });

    // this.setState({
    //   myOrderListColumn: tempMyArr,
    //   allOrderListColumn: tempAllArr,
    // });
  }

  fnGetmyList = async () => {
    // this.setState({
    //   myOrderListArray: dataSource,
    // });
  }

  fnGetallList = async () => {
    // this.setState({
    //   allOrderListArray: dataSource,
    // });
  }

  // #endregion get list

  // #region btn

  btnAddOrderList = () => { }

  btnEditOrderList = () => { }

  btnDeleteOrderList = () => { }

  btnOnSearch = (value) => { console.log(value); }

  btnJoinOrder = () => { }

  // #endregion btn

  handlePage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  fnReload = async () => {
    const { fnReload } = this.props;
    await fnReload();
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }

  createOrderNum = async () => {
    const date = new Date();
    const tempM = date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : date.getMonth();
    const tempD = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const tempH = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
    const tempMin = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    const tempNum = `${date.getFullYear()}${tempM}${tempD}-${tempH}${tempMin}`;
    return tempNum;
  }

  changetxtOrderName = (e) => {
    this.setState({
      orderName: e.target.value,
    });
  }

  changetxtorderCode = (e) => {
    this.setState({
      orderCode: e.target.value,
    });
  }

  changetxtorderDiscribe = (e) => {
    this.setState({
      orderDiscribe: e.target.value,
    });
  }

  disabledDate = (current) => {
    return current && current.endOf('day') < moment().endOf('day');
  }

  changetxtorderEndDate = (date, dateString) => {
    this.setState({
      orderEndDate: dateString,
    });
  }

  changetxtorderEndTime = (time, timeString) => {
    this.setState({
      orderEndTime: timeString,
    });
  }

  render() {
    const {
      viewType,
      orderId, orderName, orderNum, orderCode, orderDiscribe, orderEndDate, orderEndTime,
    } = this.state;
    return (
      <div>
        {/* <div>
          my id="{orderid}"
          <Button size="middle" onClick={() => this.fnReload()}>
            return
          </Button>
        </div> */}

        <div className="orderheader" style={{ height: 320 }}>
          <div style={{ marginTop: 5, width: '100%' }}>
            <span style={{ color: 'red', fontSize: '28px', fontWeight: 'bold' }}>*</span>
            {viewType === newOrderViewType.new ? (
              <Input
                size="large"
                className="input-buttonborder"
                style={{ width: 250, fontSize: '20px', fontWeight: 'bold', marginLeft: 5, backgroundColor: 'inherit' }}
                placeholder="輸入訂單名稱"
                onChange={this.changetxtOrderName}
              />
            )
              : (<span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: 5 }}>{orderName}</span>
              )}
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}> ({orderNum})</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>({orderId})</span>
          </div>

          <div style={{ marginTop: 10, width: '100%', height: 180 }}>
            <table className="table_container">
              <tr>
                <td className="table-col1">
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  結單時間:
                </td>
                <td className="table-col2">
                  {viewType === newOrderViewType.new ? (
                    <div>
                      <DatePicker
                        style={{ width: '150px', marginLeft: 5, backgroundColor: 'inherit' }}
                        value={(orderEndDate === '') ? orderEndDate : moment(orderEndDate, 'YYYY/MM/DD')}
                        format="YYYY/MM/DD"
                        disabledDate={this.disabledDate}
                        onChange={this.changetxtorderEndDate}
                      />
                      <TimePicker
                        style={{ width: '150px', marginLeft: 5, backgroundColor: 'inherit' }}
                        value={(orderEndTime === '') ? orderEndTime : moment(orderEndTime, 'HH:mm')}
                        format="HH:mm"
                        minuteStep={15}
                        onChange={this.changetxtorderEndTime}
                      />
                      <span style={{ fontSize: '16px', marginLeft: 5 }}>{orderEndDate} {orderEndTime}</span>
                    </div>
                  )
                    : (<span style={{ fontSize: '16px', marginLeft: 5 }}>{orderEndDate} {orderEndTime}</span>
                    )}
                </td>
                <td>Menu</td>
              </tr>
              <tr>
                <td className="table-col1">
                  <span className="input-buttonborder" style={{ color: 'red', fontSize: '20px' }}>*</span>
                  邀請碼:
                </td>
                <td className="table-col2">
                  {viewType === newOrderViewType.new ? (
                    <div>
                      <Input
                        // className="input-allowClear"
                        style={{ width: '90%', marginLeft: 5, backgroundColor: 'inherit' }}
                        allowClear
                        placeholder="請輸入邀請碼"
                        onChange={this.changetxtorderCode}
                      />
                      <span style={{ fontSize: '16px', marginLeft: 5 }}>{orderCode}</span>
                    </div>
                  )
                    : (<span style={{ fontSize: '16px', width: '90%', marginLeft: 5 }}>{orderCode}</span>
                    )}
                </td>
                <td rowSpan="5"></td>
              </tr>
              <tr>
                <td className="table-col1"><span style={{ marginTop: '0%' }}>描述:</span></td>
                <td rowSpan="4">
                  {viewType === newOrderViewType.new ? (
                    <div>
                      <TextArea
                        style={{ width: '90%', height: '100px', fontWeight: 'bold', marginLeft: 5, backgroundColor: 'inherit' }}
                        onScroll
                        rows={5}
                        showCount
                        maxLength={500}
                        onChange={this.changetxtorderDiscribe}
                      />
                      <span style={{ fontSize: '16px', marginLeft: 5 }}>{orderDiscribe}</span>
                    </div>
                  )
                    : (<span style={{ fontSize: '16px', marginLeft: 5 }}>{orderDiscribe}</span>
                    )}
                </td>
              </tr>
              <tr><td /></tr>
              <tr><td /></tr>
              <tr><td /></tr>
            </table>
          </div>
        </div>

        {/* <Divider style={{ width: '60%', backgroundColor: '#92a69f', marginTop: 0 }} />
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
        </div> */}

      </div>
    );
  }
}

NewOrderForm.propTypes = {
  history: PropTypes.func,
};

NewOrderForm.defaultProps = {
  history: null,
};

export default NewOrderForm;
