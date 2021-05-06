/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Tooltip, Table, Button, Divider, Input, message, DatePicker, TimePicker, Upload, InputNumber, Popconfirm, Modal,
} from 'antd';
import {
  PlusOutlined, LoadingOutlined, DoubleRightOutlined, DoubleLeftOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';

// import { verify } from '../../service/API';
import {
  LoginRouter, HeaderPageRouter, newOrderViewType,
  defaultColumn, NewOrderdata, dataSource,
} from '../../utils/define';
import './NewOrderForm.less';
import BTN_PHOTO_DELETE_NORMAL from '../../../img/btn_photo_delete_normal.svg';
import BTN_PHOTO_VIEW_NORMAL from '../../../img/btn_photo_view_normal.svg';
import imgAddOrder from '../../../img/add-btn.png';
import imgRemoveOrder from '../../../img/minus-btn.png';
import imgEditOrder from '../../../img/edit-btn.png';
import imgOkOrder from '../../../img/ok-btn.png';

const { TextArea } = Input;

class NewOrderForm extends React.Component {
  initState = {
    // username: sessionStorage.getItem('emplid'),
    userid: sessionStorage.getItem('emplid'),
    username: sessionStorage.getItem('emplidname'),
    orderId: this.props.orderid,
    orderviewType: this.props.viewType,

    myOrderHeader: {
      orderNum: '',
      orderName: '',
      orderuserId: sessionStorage.getItem('emplid'),
      orderuserName: sessionStorage.getItem('emplidname'),
      orderDiscribe: '',
      orderEndDate: '',
      orderEndTime: '',
      orderCode: '',
      orderMenu: '',
      OrderClass: ['', '', '', '', ''],
    },

    myOrderColumn: [],
    myOrderRow: [],
    // myOrderRow: [{
    //   id: '+0',
    //   heaader_id: '',
    //   // user_id: sessionStorage.getItem('emplid'),
    //   user_name: '',
    //   item_name: '',
    //   class_1: '',
    //   class_2: '',
    //   class_3: '',
    //   class_4: '',
    //   class_5: '',
    //   remark: '',
    //   price: '',
    //   type: '2',
    // }],

    mydelOrderRow: [],

    visibleClass: 2,
    loading: false,
    visibleModel: {
      menuModel: false,
    },

  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount

  componentWillMount = () => {

  }

  componentDidMount = async () => {
    const { userid, orderviewType, orderId, myOrderHeader, myOrderRow } = this.state;
    const dataHeaderResult = myOrderHeader;
    let datarowResult = myOrderRow;

    if (await this.IsNullOrEmpty(userid)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else {
      try {
        sessionStorage.setItem('view1type', orderviewType);

        // #region init
        if (await this.IsNullOrEmpty(orderId)) { // add
          dataHeaderResult.orderNum = await this.createOrderNum();

          this.setState({
            orderviewType: newOrderViewType.new,
            orderId: '',
            myOrderHeader: dataHeaderResult,
          });
        } else { // edit, view
          const tempheader = dataSource[orderId - 1];
          datarowResult = NewOrderdata;

          dataHeaderResult.orderNum = tempheader.id_num;
          dataHeaderResult.orderName = tempheader.name;
          dataHeaderResult.orderuserId = tempheader.user_id;
          dataHeaderResult.orderuserName = tempheader.user_name;
          dataHeaderResult.orderDiscribe = tempheader.dscribe;
          dataHeaderResult.orderEndDate = tempheader.endtime.substr(0, 10);
          dataHeaderResult.orderEndTime = tempheader.endtime.substr(11);
          dataHeaderResult.orderCode = tempheader.invite_code;
          dataHeaderResult.orderMenu = tempheader.menu;
          dataHeaderResult.OrderClass = [tempheader.class_1, tempheader.class_2, tempheader.class_3, tempheader.class_4, tempheader.class_5];
          const tempvisibleClassNum = dataHeaderResult.OrderClass.lastIndexOf('') > 0 ? dataHeaderResult.OrderClass.lastIndexOf('') : 5;

          this.setState({
            myOrderHeader: dataHeaderResult,
            myOrderRow: datarowResult,
            visibleClass: tempvisibleClassNum,
          });
        }
        // #endregion init

        // #region table header
        await this.fnSetColumnHeader();
        // #endregion table header

      } catch (e) {
        message.error(e.message);
      }
    }
  }

  componentWillUpdate = () => { }

  componentDidUpdate = () => { }

  disabledDate = (current) => current && current.endOf('day') < moment().endOf('day')

  imgbeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // #endregion mount


  // #region get list

  createOrderNum = async () => {
    const date = new Date();
    const tempM = date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : date.getMonth();
    const tempD = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const tempH = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
    const tempMin = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    const tempNum = `${date.getFullYear()}${tempM}${tempD}-${tempH}${tempMin}`;
    return tempNum;
  }

  fnSetColumnHeader = async (flagAdd) => {
    const { visibleClass, myOrderHeader, myOrderRow } = this.state;
    const tempOrderHeader = myOrderHeader;
    let tempV = visibleClass;
    const tempRows = myOrderRow;

    if (flagAdd !== undefined
      && ((flagAdd && visibleClass >= 0 && visibleClass < 5) || (!flagAdd && visibleClass > 0 && visibleClass <= 5))) {
      tempV = flagAdd === true ? tempV + 1 : tempV - 1;
      // console.log(`visibleClass=${tempV},flagAdd=${flagAdd}`);
    }

    const tempHeader = [
      {
        dataIndex: 'id',
        align: 'center',
        width: 100,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Tooltip placement="topLeft" title="新增">
            <a onClick={() => this.fnAddNewOrderRow()}>
              <img alt="icon" src={imgAddOrder} style={{ width: 25 }} />
            </a>
          </Tooltip>,
        render: (text, record, index) => (
          <div>
            <Tooltip placement="topLeft" title="刪除">
              <a onClick={() => this.fndelOrderRow(record.id)}>
                <img alt="icon" src={imgRemoveOrder} style={{ width: 25, marginLeft: 5 }} />
              </a>
            </Tooltip>
            {(this.fndecideRowType(record.id)) ? (
              <Tooltip placement="topLeft" title="OK">
                <a onClick={() => this.fnEditNewOrderRow(record.id, '1')}>
                  <img alt="icon" src={imgOkOrder} style={{ width: 25, marginLeft: 15 }} />
                </a>
              </Tooltip>
            ) : (
              <Tooltip placement="topLeft" title="編輯">
                <a onClick={() => this.fnEditNewOrderRow(record.id, '2')}>
                  <img alt="icon" src={imgEditOrder} style={{ width: 25, marginLeft: 15 }} />
                </a>
              </Tooltip>
            )}
          </div>
        ),
      }, {
        dataIndex: 'user_name',
        align: 'center',
        width: 150,
        title: <div><span style={{ color: 'red', fontSize: '20px' }}>*</span>姓名</div>,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%', textAlign: 'center' }}
                value={record.user_name}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'user_name')}
              />
            )
              : record.user_name}
          </div>
        ),
      }, {
        dataIndex: 'item_name',
        align: 'center',
        width: 250,
        title:
          // eslint-disable-next-line react/jsx-indent
          <div>
            <span style={{ marginLeft: 40, color: 'red', fontSize: '20px' }}>*</span>
            品項
            <Tooltip placement="topLeft" title="刪除欄位">
              <Button
                type="text"
                icon={<DoubleLeftOutlined />}
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => this.fnSetColumnHeader(false)}
              />
            </Tooltip>
            <Tooltip placement="topLeft" title="新增欄位(最多5欄)">
              <Button
                type="text"
                icon={<DoubleRightOutlined />}
                size="small"
                // style={{ marginLeft: 1 }}
                onClick={() => this.fnSetColumnHeader(true)}
              />
            </Tooltip>
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.item_name}
                maxLength={30}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'item_name')}
              />
            )
              : record.item_name}
          </div>
        ),
      },
    ];
    const header2 = [
      {
        dataIndex: 'class_1',
        align: 'center',
        width: 150,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            value={myOrderHeader.OrderClass[0]}
            maxLength={10}
            onChange={(e) => this.ChangeTableColumnName(e, 0)}
            placeholder="糖"
          />,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.class_1}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'class_1')}
              />
            )
              : record.class_1}
          </div>
        ),
      }, {
        dataIndex: 'class_2',
        align: 'center',
        width: 150,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            value={myOrderHeader.OrderClass[1]}
            maxLength={10}
            onChange={(e) => this.ChangeTableColumnName(e, 1)}
            placeholder="冰"
          />,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.class_2}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'class_2')}
              />
            )
              : record.class_2}
          </div>
        ),
      }, {
        dataIndex: 'class_3',
        align: 'center',
        width: 150,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            value={myOrderHeader.OrderClass[2]}
            maxLength={10}
            onChange={(e) => this.ChangeTableColumnName(e, 2)}
          />,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.class_3}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'class_3')}
              />
            )
              : record.class_3}
          </div>
        ),
      }, {
        dataIndex: 'class_4',
        align: 'center',
        width: 150,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            value={myOrderHeader.OrderClass[3]}
            maxLength={10}
            onChange={(e) => this.ChangeTableColumnName(e, 3)}
          />,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.class_4}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'class_4')}
              />
            )
              : record.class_4}
          </div>
        ),
      }, {
        dataIndex: 'class_5',
        align: 'center',
        width: 150,
        title:
          // eslint-disable-next-line react/jsx-indent
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            value={myOrderHeader.OrderClass[4]}
            maxLength={10}
            onChange={(e) => this.ChangeTableColumnName(e, 4)}
          />,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <Input
                style={{ width: '100%' }}
                value={record.class_5}
                maxLength={10}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'class_5')}
              />
            )
              : record.class_5}
          </div>
        ),
      },
    ];
    const header3 = [
      {
        dataIndex: 'price',
        align: 'center',
        title: <div><span style={{ color: 'red', fontSize: '20px' }}>*</span>價錢</div>,
        width: 100,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <InputNumber
                style={{ width: '100%' }}
                value={record.price}
                min={0}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'price')}
              />
            )
              : record.price}
          </div>
        ),
      }, {
        dataIndex: 'remark',
        align: 'center',
        title: '備註',
        width: tempV > 3 ? 300 : null,
        render: (text, record, index) => (
          <div>
            {(this.fndecideRowType(record.id)) ? (
              <TextArea
                style={{ width: '100%' }}
                value={record.remark}
                rows={1}
                maxLength={200}
                onChange={(e) => this.ChangeTableCell(e, record.id, 'remark')}
              />
            )
              : record.remark}
          </div>
        ),
      },
    ];


    for (let i = 0; i < tempV; i += 1) {
      tempHeader.push(header2[i]);
    }
    for (let i = 0; i < header3.length; i += 1) {
      tempHeader.push(header3[i]);
    }

    if (!flagAdd) {
      for (let i = 0; i < tempRows.length; i += 1) {
        for (let j = tempV + 1; j <= 5; j += 1) {
          tempRows[i][`class_${j}`] = '';
        }
      }
      for (let j = tempV; j < 5; j += 1) {
        tempOrderHeader.OrderClass[j] = '';
      }
    }

    this.setState({
      myOrderColumn: tempHeader,
      visibleClass: tempV,
      myOrderRow: tempRows,
    });
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


  // #region txt change

  changeOrderHeader = (e, att) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader[att] = e.target.value;
    this.setState({
      myOrderHeader: tempHeader,
    });
    // console.log(myOrderHeader);
  }

  changetxtorderEndDate = (date, dateString) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderEndDate = dateString;
    this.setState({
      myOrderHeader: tempHeader,
    });
    // console.log(myOrderHeader);
  }

  changetxtorderEndTime = (time, timeString) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderEndTime = timeString;
    this.setState({
      myOrderHeader: tempHeader,
    });
    // console.log(myOrderHeader);
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  changeImgurl = (info) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    this.getBase64(info.file.originFileObj, (image) => {
      tempHeader.orderMenu = image;
      this.setState({
        myOrderHeader: tempHeader,
        loading: false,
      });
    });

    // console.log(myOrderHeader);
  }

  deleteImgurl = () => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderMenu = '';
    this.setState({
      myOrderHeader: tempHeader,
    });
    // console.log(myOrderHeader);
  }

  fnSetModelVisible = (visible, model) => {
    const { visibleModel } = this.state;
    let tempModel = visibleModel;

    if (model === undefined) {
      tempModel = {
        menuModel: false,
      };
    } else {
      tempModel[model] = visible;
    }

    this.setState({
      visibleModel: tempModel,
    });

  }

  ChangeTableColumnName = (e, column) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.OrderClass[column] = e.target.value.trim();
    this.setState({ myOrderHeader: tempHeader });
    // console.log(myOrderHeader);
  };

  ChangeTableCell = (e, id, column) => {
    // console.log(e);
    // console.log(`id=${id},index=${column}`);
    const { myOrderRow } = this.state;
    const thisArray = myOrderRow;
    const index = myOrderRow.findIndex((p) => p.id === id);
    // console.log(`id=${id},index=${index}`);

    const temp = e.target === undefined ? e : e.target.value;
    thisArray[index][column] = temp;
    this.setState({ myOrderRow: thisArray });
    // console.log(thisArray);
  };

  fnAddNewOrderRow = async () => {
    const { orderId, myOrderRow } = this.state;
    const tempRows = JSON.parse(JSON.stringify(myOrderRow));
    const newRow = {
      id: `+${myOrderRow.length}`,
      heaader_id: orderId,
      // user_id: sessionStorage.getItem('emplid'),
      user_name: '',
      item_name: '',
      class_1: '',
      class_2: '',
      class_3: '',
      class_4: '',
      class_5: '',
      remark: '',
      price: '',
      type: '2',
    };
    tempRows.unshift(newRow);

    // console.log(tempRows);
    this.setState({ myOrderRow: tempRows });
  }

  fndecideRowType = (id) => {
    const { myOrderRow } = this.state;
    const tempArray = myOrderRow;
    const index = tempArray.findIndex((p) => p.id === id);
    let result = false;

    // console.log(`index=${index}`);
    if (index >= 0 && tempArray[index].type === '2') result = true;
    // console.log(`index=${index},result=${result}`);
    return result;
  }

  fnEditNewOrderRow = async (id, state) => {
    const { myOrderRow } = this.state;
    const tempArray = myOrderRow;
    const index = myOrderRow.findIndex((p) => p.id === id);

    if (state === '1'
      && (await this.IsNullOrEmpty(tempArray[index].user_name)
        || await this.IsNullOrEmpty(tempArray[index].item_name)
        || await this.IsNullOrEmpty(tempArray[index].price))
    ) {
      message.warning('部分內容不可為空');
    } else {
      tempArray[index].type = state;
    }
    this.setState({ myOrderRow: tempArray });
  }

  fndelOrderRow = async (id) => {
    const { myOrderRow, mydelOrderRow } = this.state;
    // const tempArray = myOrderRow;
    const tempdelArray = mydelOrderRow;
    // const index = tempArray.findIndex((p) => p.id === id);
    // console.log(`index=${index}`);

    if (id.substring(0, 1) !== '+') {
      tempdelArray.push(id);
    }
    // tempArray.splice(index, 1);
    console.log(tempdelArray);

    this.setState({
      myOrderRow: myOrderRow.filter((item) => item.id !== id),
      mydelOrderRow: tempdelArray,
    });
  }

  // #endregion txt change

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


  render() {
    const {
      orderviewType,
      orderId, myOrderColumn, myOrderHeader, myOrderRow,
      loading, visibleModel,
    } = this.state;
    return (
      <div>
        <div className="orderheader">
          <div style={{ marginTop: 5, width: '100%' }}>
            <span style={{ color: 'red', fontSize: '28px', fontWeight: 'bold' }}>*</span>
            <Input
              size="large"
              className="input-buttonborder"
              style={{
                width: 250, fontSize: '20px', fontWeight: 'bold', marginLeft: 5, backgroundColor: 'inherit',
              }}
              value={myOrderHeader.orderName}
              placeholder="輸入訂單名稱"
              onChange={(e) => this.changeOrderHeader(e, 'orderName')}
            />
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}> ({myOrderHeader.orderNum})</span>
            {/* <span style={{ fontSize: '20px', fontWeight: 'bold' }}>({orderId})</span> */}
            <Popconfirm
              title="訂單完成後將會刪除紀錄，確定要完成嗎?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => this.fnReload()}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }}>完成訂單</Button>
            </Popconfirm>

            <Popconfirm
              title="可能有未儲存的內容，確定要離開嗎?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => this.fnReload()}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }}>取消</Button>
            </Popconfirm>

            <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }} onClick={() => this.fnReload()}>儲存</Button>
          </div>

          <div style={{ marginTop: 10, width: '100%' }}>
            <table className="table_container">
              <tr>
                <td className="table-col1">建立者:</td>
                <td className="table-col2">
                  <span style={{ fontSize: '16px', marginLeft: 5 }}>{myOrderHeader.orderuserId} - {myOrderHeader.orderuserName}</span>
                </td>
                <td>
                  <span>Menu</span>
                  <img
                    alt="BTN_PHOTO_DELETE_NORMAL"
                    src={BTN_PHOTO_DELETE_NORMAL}
                    style={{
                      marginLeft: 10,
                      cursor: myOrderHeader.orderMenu ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => this.deleteImgurl()}
                  />
                  <img
                    alt="BTN_PHOTO_VIEW_NORMAL"
                    src={BTN_PHOTO_VIEW_NORMAL}
                    style={{
                      marginLeft: 10,
                      cursor: myOrderHeader.orderMenu ? 'pointer' : 'not-allowed',
                    }}
                    onClick={myOrderHeader.orderMenu ? () => this.fnSetModelVisible(true, 'menuModel') : null}
                  />
                </td>
              </tr>
              <tr>
                <td className="table-col1">
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  結單時間:
                </td>
                <td className="table-col2">
                  <div>
                    <DatePicker
                      style={{ width: '150px', marginLeft: 5, backgroundColor: 'inherit' }}
                      value={(myOrderHeader.orderEndDate === '') ? '' : moment(myOrderHeader.orderEndDate, 'YYYY/MM/DD')}
                      format="YYYY/MM/DD"
                      disabledDate={this.disabledDate}
                      onChange={this.changetxtorderEndDate}
                    />
                    <TimePicker
                      style={{ width: '150px', marginLeft: 5, backgroundColor: 'inherit' }}
                      value={(myOrderHeader.orderEndTime === '') ? '' : moment(myOrderHeader.orderEndTime, 'HH:mm')}
                      format="HH:mm"
                      minuteStep={15}
                      onChange={this.changetxtorderEndTime}
                    />
                  </div>
                </td>
                <td rowSpan="3" style={{ verticalAlign: 'top' }}>
                  <Upload
                    showUploadList={false}
                    beforeUpload={this.imgbeforeUpload}
                    onChange={this.changeImgurl}
                  >
                    <Button className="uploadbtn">
                      {myOrderHeader.orderMenu ? <img src={myOrderHeader.orderMenu} alt="avatar" style={{ width: '100%', height: '100%' }} />
                        : (
                          <div>
                            {loading ? <LoadingOutlined style={{ fontSize: 16 }} /> : <PlusOutlined style={{ fontSize: 16 }} />}
                            <div style={{ marginTop: 8, fontSize: 16 }}>Upload</div>
                          </div>
                        )}
                    </Button>
                  </Upload>
                </td>
              </tr>
              <tr>
                <td className="table-col1">
                  <span className="input-buttonborder" style={{ color: 'red', fontSize: '20px' }}>*</span>
                  邀請碼:
                </td>
                <td className="table-col2">
                  <div>
                    <Input
                      style={{ width: '90%', marginLeft: 5, backgroundColor: 'inherit' }}
                      allowClear
                      value={myOrderHeader.orderCode}
                      placeholder="請輸入邀請碼"
                      onChange={(e) => this.changeOrderHeader(e, 'orderCode')}
                    />
                    {/* <span style={{ fontSize: '16px', marginLeft: 5 }}>{orderCode}</span> */}
                  </div>
                </td>
              </tr>
              <tr style={{ height: '200px' }}>
                <td className="table-col1" style={{ verticalAlign: 'top' }}>描述:</td>
                <td style={{ verticalAlign: 'top' }}>
                  <div>
                    <TextArea
                      style={{
                        width: '90%', fontWeight: 'bold', marginLeft: 5, backgroundColor: 'inherit',
                      }}
                      value={myOrderHeader.orderDiscribe}
                      onScroll
                      rows={5}
                      showCount
                      maxLength={500}
                      onChange={(e) => this.changeOrderHeader(e, 'orderDiscribe')}
                    />
                    {/* <span style={{ fontSize: '16px', marginLeft: 5 }}>{orderDiscribe}</span> */}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <Divider style={{ width: '60%', backgroundColor: '#92a69f', marginTop: 0 }} />

        <div className="orderbody">
          <div style={{ marginTop: 5, width: '100%' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
              訂單樣式
            </span>
            {/* <Tooltip placement="topLeft" title="新增">
              <a onClick={() => this.fnAddNewOrderRow()}>
                <img alt="icon" src={imgAddOrder} style={{ width: 25, marginLeft: 10 }} />
              </a>
            </Tooltip> */}
          </div>
          <div style={{ marginTop: 5, width: '100%', height: '100%' }}>
            <Table
              columns={myOrderColumn}
              dataSource={myOrderRow}
              bordered
              size="small"
              locale={{ emptyText: '點選左上角新增圖示來訂飲料 > <' }}
              pagination={{
                total: myOrderRow.length,
                pageSize: myOrderRow.length,
                hideOnSinglePage: true,
              }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
        <div style={{ height: '25px' }} />

        <Modal
          visible={visibleModel.menuModel}
          title="Menu"
          width="70%"
          onCancel={() => this.fnSetModelVisible(false, 'menuModel')}
          footer={(
            <Button onClick={() => this.fnSetModelVisible(false, 'menuModel')}>
              OK
            </Button>
          )}
        >
          <img alt="example" style={{ width: '100%' }} src={myOrderHeader.orderMenu} />
        </Modal>
      </div>
    );
  }
}

NewOrderForm.propTypes = {
  history: PropTypes.func,
  match: PropTypes.object,
};

NewOrderForm.defaultProps = {
  history: null,
  match: {},
};

export default NewOrderForm;
