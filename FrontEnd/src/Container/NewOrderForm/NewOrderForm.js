/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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

// import { verify } from '../../service/API';
import {
  SYSTEM_TITLE,
  LoginRouter, HeaderPageRouter,
  dataSource, defaultColumn,
} from '../../utils/define';
import './NewOrderForm.less';
import imgAddOrder from '../../../img/add-button.png';

const { Search } = Input;
class NewOrderForm extends React.Component {
  refStep1 = React.createRef();

  initState = {
    username: sessionStorage.getItem('emplid'),
    orderid: this.props.orderid,
    orderName: '',
    orderNum: '',
    orderDiscribe: '',
    orderLimit: '',
    orderCode: '',
    orderManu: '',

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

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }

  // #region mount
  componentWillMount = () => { }

  componentDidMount = async () => {
    console.log('123');
    // const { username } = this.state;
    // console.log(username);
    // if (await this.IsNullOrEmpty(username)) {
    //   const { history } = this.props;
    //   history.push(LoginRouter);
    // } else {
    //   try {
    //     // await this.fnSetColumnHeader();
    //     // await this.fnGetmyList();
    //     // await this.fnGetallList();
    //   } catch (e) {
    //     message.error(e.message);
    //   }
    // }
  }

  componentWillUpdate = () => { }

  componentDidUpdate = (lastProps, lastState) => { }

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
          <Button size="middle" onClick={() => this.btnEditOrderList()}>
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

  fnReload = async (path) => {
    const { fnReload } = this.props;
    await fnReload();
  }

  render() {
    const {
      orderid,
    } = this.state;
    return (
      <div>
        my id="{orderid}"
        <Button size="middle" onClick={() => this.fnReload()}>
        return
        </Button>
    </div>
      //   <div>
      //     <div className="panel-style" style={{ height: 290 }}>
      //       <div style={{ marginTop: 5, width: '100%' }}>
      //         <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
      //           我建立的訂單2
      //         </span>
      //         <Tooltip placement="topLeft" title="建立訂單">
      //           <a onClick={() => this.btnAddOrderList()}>
      //             <img alt="icon" src={imgAddOrder} style={{ width: 25, marginLeft: 10 }} />
      //           </a>
      //         </Tooltip>
      //       </div>
      //       <div style={{ marginTop: 5, width: '100%', height: 180 }}>
      //         <Table
      //           columns={myOrderListColumn}
      //           dataSource={myOrderListArray}
      //           bordered
      //           size="small"
      //           pagination={{
      //             defaultPageSize: 3,
      //           }}
      //           scroll={{ x: 'max-content' }}
      //           locale={{ emptyText: '快來揪團 > <' }}
      //         />
      //       </div>
      //     </div>
      //     <Divider style={{ width: '60%', backgroundColor: '#92a69f', marginTop: 0 }} />

      //     <div className="panel-style">
      //       <div style={{ marginTop: 5, width: '100%' }}>
      //         <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
      //           所有訂單
      //         </span>
      //         <Search
      //           style={{ width: 200, marginLeft: 10 }}
      //           allowClear="true"
      //           placeholder="input search text"
      //           onSearch={this.btnOnSearch}
      //         />
      //       </div>
      //       <div style={{ marginTop: 5, width: '100%', height: 180 }}>
      //         <Table
      //           columns={allOrderListColumn}
      //           dataSource={allOrderListArray}
      //           bordered
      //           size="small"
      //           pagination={{
      //             defaultPageSize: 10,
      //           }}
      //           scroll={{ x: 'max-content' }}
      //         />
      //       </div>
      //     </div>

      //   </div>
    );
  }
}

NewOrderForm.propTypes = {
  // jumpRoute: PropTypes.func,
  // history: PropTypes.func,
};

NewOrderForm.defaultProps = {
  // jumpRoute: null,
  // history: null,
};

export default NewOrderForm;
