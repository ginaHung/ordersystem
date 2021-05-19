/* eslint-disable react/no-deprecated */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Table, Button, Divider, Input, message, Modal, Form, Spin } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';

import { getMyOrder, getAllOrderList } from '../../service/API';
import {
  LoginRouter, HeaderPageRouter, modeViewType,
  defaultColumn,
} from '../../utils/define';
import NewOrderForm from '../NewOrderForm/NewOrderForm';
import './OrderListPage.less';

const { Search } = Input;

class OrderListPage extends React.Component {

  formRef = React.createRef();

  initState = {
    userid: sessionStorage.getItem('emplid'),
    username: sessionStorage.getItem('emplidname'),
    ViewType: modeViewType.orderlistView,
    myOrderListArray: [],
    allOrderListArray: [],
    allOrderListArrayShow: [],

    myOrderListColumn: [], // 我建立的訂單 table header
    allOrderListColumn: [], // 所有訂單 table header

    myOrderId: '',
    tempOrderItem: null,
    visibleModel: {
      codeModel: false,
      codeModelErrorStr: false,
      loading: false,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount ------------------------------------

  // componentWillMount = () => {
  // }

  componentDidMount = async () => {
    const { userid } = this.state;
    const { view } = this.props.match.params;

    if (await this.IsNullOrEmpty(userid)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else {
      try {
        await this.fnSetModelVisible(true, 'loading');
        const tempView = view === undefined || Object.values(modeViewType).indexOf(view) < 0 ? modeViewType.orderlistView : view;
        const tempOrderId = await this.IsNullOrEmpty(sessionStorage.getItem('OrderId')) ? '' : sessionStorage.getItem('OrderId');
        this.setState({
          ViewType: tempView,
          myOrderId: tempView === modeViewType.orderlistView ? '' : tempOrderId,
        });

        const { ViewType } = this.state;
        if (ViewType === modeViewType.orderlistView) {
          await this.fnSetColumnHeader();
          await this.fnGetmyList();
          await this.fnGetallList();
        }
      } catch (e) {
        message.error(`componentDidMount:${e.message}`);
      }
      await this.fnSetModelVisible(false, 'loading');
    }
  }

  // props update
  componentWillReceiveProps = async (nextProps) => {
    const { view } = nextProps.match.params;
    try {
      const tempView = view === undefined || Object.values(modeViewType).indexOf(view) < 0 ? modeViewType.orderlistView : view;
      const tempOrderId = await this.IsNullOrEmpty(sessionStorage.getItem('OrderId')) ? '' : sessionStorage.getItem('OrderId');
      this.setState({
        ViewType: tempView,
        myOrderId: tempView === modeViewType.orderlistView ? '' : tempOrderId,
      });

      const { ViewType } = this.state;
      if (ViewType === modeViewType.orderlistView) {
        await this.fnSetModelVisible(true, 'loading');
        await this.fnSetColumnHeader();
        await this.fnGetmyList();
        await this.fnGetallList();
        await this.fnSetModelVisible(false, 'loading');
      }
    } catch (err) {
      message.error(`componentWillReceiveProps:${err.message}`);
    }
  }

  // componentWillUpdate = () => { }

  // componentDidUpdate = async () => { }

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
          <Button size="middle" onClick={() => this.btnAddorEditOrderList(record.id)}>
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
            // disabled={new Date(`${record.endtime}:59`) < new Date()}
            onClick={() => this.btnJoin(record)}
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
    try {
      this.handlePage(HeaderPageRouter);
      await this.fnSetModelVisible(true, 'loading');
      await this.handleSessionStorage('', '');
      await this.fnGetmyList();
      await this.fnGetallList();
      await this.fnSetModelVisible(false, 'loading');
    } catch (err) {
      message.error(`fnReload:${err.message}`);
    }
  }

  fnGetmyList = async () => {
    const { userid } = this.state;
    let result = null;

    const data = { user_id: userid };
    result = await getMyOrder(data);
    if (result.data.success) {
      const myList = result.data.result;
      this.setState({
        myOrderListArray: myList,
      });
    } else {
      throw new Error(result.data.errorCode);
    }
  }

  fnGetallList = async () => {
    let result = null;
    result = await getAllOrderList();
    if (result.data.success) {
      const myList = result.data.result;
      this.setState({
        allOrderListArray: myList,
        allOrderListArrayShow: myList,
      });
    } else {
      throw new Error(result.data.errorCode);
    }
  }

  // #endregion get list ------------------------------


  // #region btn --------------------------------------

  btnAddorEditOrderList = async (id) => {
    this.setState({
      myOrderId: id,
      ViewType: modeViewType.neworderView,
    });
    await this.handleSessionStorage(modeViewType.neworderView, id);
    this.handlePage(`${HeaderPageRouter}/${modeViewType.neworderView}`);
  }

  btnOnSearch = async (value) => {
    const { allOrderListArray } = this.state;
    let tempArray = [];
    const compareAtt = ['id_num', 'name', 'user_name', 'endtime']; // 'user_id'

    try {
      if (await this.IsNullOrEmpty(value)) {
        tempArray = allOrderListArray;
      } else {
        for (let i = 0; i < allOrderListArray.length; i += 1) {
          let str = '';
          for (let j = 0; j < compareAtt.length; j += 1) {
            if (allOrderListArray[i][compareAtt[j]] !== null) {
              str = `${str}${allOrderListArray[i][compareAtt[j]]}`;
            }
          }

          if (str.toUpperCase().includes(value)) {
            tempArray.push(allOrderListArray[i]);
          }
        }
      }

      this.setState({
        allOrderListArrayShow: tempArray,
      });
    } catch (err) {
      message.error(`btnOnSearch:${err.message}`);
    }
  }

  btnJoin = async (record) => {
    this.setState({
      myOrderId: record.id,
      tempOrderItem: record,
    });
    await this.fnSetModelVisible(true, 'codeModel');
  }

  btnCheckInviteCode = async () => {
    const { myOrderId, tempOrderItem } = this.state;

    this.formRef.current.validateFields()
      .then(async (values) => {
        if (values.code !== undefined
          && (tempOrderItem.invite_code === undefined || values.code.trim() === tempOrderItem.invite_code)) {
          await this.handleSessionStorage(modeViewType.joinView, myOrderId);
          this.formRef.current.resetFields();
          await this.fnSetModelVisible(false);
          this.handlePage(`${HeaderPageRouter}/${modeViewType.joinView}`);
        } else {
          await this.fnSetModelVisible(true, 'codeModelErrorStr');
        }
      })
      .catch((err) => {
        message.error(`btnCheckInviteCode: ${err}`);
      });
  }

  btnCancelCheckInviteCode = async () => {
    this.setState({
      myOrderId: '',
      tempOrderItem: null,
      ViewType: modeViewType.orderlistView,
    });
    await this.handleSessionStorage('', '');
    await this.fnSetModelVisible(false);
  }

  fnSetModelVisible = async (visible, model) => {
    const { visibleModel } = this.state;
    let tempModel = visibleModel;

    if (model === undefined) {
      tempModel = {
        codeModel: false,
        codeModelErrorStr: false,
        loading: false,
      };
    } else {
      tempModel[model] = visible;
    }

    this.setState({
      visibleModel: tempModel,
    });
  }

  handleCodeModalKeyDown = async (e) => {
    // console.log(`e.key=${e.key}`);
    if (e.key === 'Enter') {
      await this.btnCheckInviteCode();
    }
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

  handleSessionStorage = async (view, id) => {
    // console.log(`View=${view},orderid=${id}`);
    sessionStorage.setItem('View', view);
    sessionStorage.setItem('OrderId', id);
  }


  render() {
    const {
      ViewType,
      myOrderListColumn, allOrderListColumn,
      myOrderListArray, allOrderListArray, allOrderListArrayShow, tempOrderItem,
      myOrderId,
      visibleModel,
    } = this.state;
    return (
      <div>
        {ViewType === modeViewType.orderlistView ? (
          <div>
            <Spin spinning={visibleModel.loading}>
              <div className="panel-style" style={{ height: 300 }}>
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
                      onClick={() => this.btnAddorEditOrderList('')}
                    />
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
                    style={{ width: 250, marginLeft: 10 }}
                    allowClear="true"
                    placeholder="input search text"
                    onSearch={this.btnOnSearch}
                  />
                </div>
                <div style={{ marginTop: 5, width: '100%' }}>
                  <Table
                    columns={allOrderListColumn}
                    dataSource={allOrderListArrayShow}
                    bordered
                    size="small"
                    pagination={{
                      defaultPageSize: 10,
                    }}
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </div>
            </Spin>
          </div>
        ) : <div />}

        {ViewType === modeViewType.neworderView ? (
          <NewOrderForm
            view={modeViewType.neworderView}
            orderid={myOrderId}
            fnReload={this.fnReload}
          />
        ) : <div />}

        {ViewType === modeViewType.joinView ? (
          <NewOrderForm
            view={modeViewType.joinView}
            orderid={myOrderId}
            fnReload={this.fnReload}
          />
        ) : <div />}

        <Modal
          visible={visibleModel.codeModel}
          title={`請輸入 [${tempOrderItem && tempOrderItem.name ? tempOrderItem.name : ''}] 邀請碼`}
          destroyOnClose
          footer={[
            <Button onClick={() => this.btnCheckInviteCode()}>確認</Button>,
            <Button onClick={() => this.btnCancelCheckInviteCode(false)}>取消</Button>,
          ]}
          onCancel={() => this.btnCancelCheckInviteCode(false)}
        >
          <Form ref={this.formRef}>
            <Form.Item name="code">
              <Input
                autoFocus
                allowClear
                placeholder="輸入邀請碼"
                onKeyDown={this.handleCodeModalKeyDown}
              />
            </Form.Item>
          </Form>
          <div style={{ width: '100%', height: 10, textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
            {visibleModel.codeModelErrorStr ? ('邀請碼錯誤') : (<div />)}
          </div>
        </Modal>
      </div>
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
