/* eslint-disable no-await-in-loop */
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
  Tooltip, Table, Button, Divider, Input, message, DatePicker, TimePicker, Upload, InputNumber,
  Popconfirm, Modal, Spin, Form,
} from 'antd';
import {
  PlusOutlined, DoubleRightOutlined, DoubleLeftOutlined, QuestionCircleOutlined,
  PushpinTwoTone, DeleteOutlined, EyeOutlined, MehOutlined, MinusCircleOutlined,
  CheckCircleOutlined, EditOutlined, LikeOutlined, CopyOutlined,
} from '@ant-design/icons';

import { getOrderData, getOrderItem, saveOrder, saveRow, deleteOrder } from '../../service/API';
import { LoginRouter, modeViewType } from '../../utils/define';
import './NewOrderForm.less';

const { TextArea } = Input;
const HeaderClassLength = 20;
const RowClassLength = 50;

class NewOrderForm extends React.Component {
  formRef = React.createRef();

  initState = {
    userid: sessionStorage.getItem('emplid'),
    username: sessionStorage.getItem('emplidname'),
    ViewType: this.props.view,

    myOrderColumn: [],
    visibleClass: 2,
    visibleModel: {
      menuModel: false,
      saveNotifyModal: false,
      tempStr: '',
      loading: false,
    },
    orderId: this.props.orderid,
    myOrderHeader: {
      orderNum: '',
      orderName: '',
      orderuserId: sessionStorage.getItem('emplid'),
      orderuserName: sessionStorage.getItem('emplidname'),
      orderDescribe: '',
      orderEndDate: '',
      orderEndTime: '',
      orderCode: '',
      orderMenu: '',
      OrderClass: ['', '', '', '', ''],
      orderDescribeArr: [],
    },
    myOrderRow: [],
    // myOrderRow: [{
    //   id: '+0',
    //   heaader_id: '',
    //   // create_id: sessionStorage.getItem('emplid'),
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
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // #region mount ----------------------------------

  // componentWillMount = () => { }

  // componentWillUpdate = () => { }

  // componentDidUpdate = () => { }

  componentDidMount = async () => {
    const { userid, ViewType, orderId, myOrderHeader } = this.state;
    const sessionRoute = `${sessionStorage.getItem('View')}/${sessionStorage.getItem('OrderId')}`;

    if (await this.IsNullOrEmpty(userid)) {
      const { history } = this.props;
      history.push(LoginRouter);
    } else if (sessionRoute !== `${ViewType}/${orderId}` || (ViewType === modeViewType.joinView && await this.IsNullOrEmpty(orderId))) {
      await this.fnReload();
    } else {
      try {
        await this.fnSetModelVisible(true, 'loading');
        // init
        if (await this.IsNullOrEmpty(orderId)) { // add
          const dataHeaderResult = myOrderHeader;
          dataHeaderResult.orderNum = await this.createOrderNum();
          this.setState({
            orderId: '',
            ViewType: modeViewType.neworderView,
            myOrderHeader: dataHeaderResult,
          });
        } else { // edit, view
          await this.fnGetOrderList();
        }

        // table header
        await this.fnSetColumnHeader();
      } catch (e) {
        message.error(e.message);
      }
      await this.fnSetModelVisible(false, 'loading');
    }
  }

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

  // #endregion mount -------------------------------


  // #region get list ----------------------------------

  createOrderNum = async () => {
    const date = new Date();
    const tempM = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const tempD = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const tempH = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
    const tempMin = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    const tempNum = `${date.getFullYear()}${tempM}${tempD}-${tempH}${tempMin}`;
    return tempNum;
  }

  handleDescribe = async (str) => {
    const brChar = ['\r', '\n'];
    const htmlArr = [];
    let startId = 0;
    try {
      for (let i = 0; i < str.length; i += 1) {
        if (brChar.indexOf(str[i]) >= 0) {
          htmlArr.push({ str: str.substring(startId, i) });
          startId = i + 1;
        } else if (i + 1 === str.length) {
          htmlArr.push({ str: str.substring(startId, i + 1) });
        }
      }
    } catch (err) {
      message.error(err.message);
    }
    return htmlArr;
  }

  fnGetOrderList = async () => {
    const { orderId } = this.state;
    const dataHeaderResult = {};
    let result = null;
    let data = null;
    let tempheader;
    let dataRowResult;

    data = { header_id: orderId };
    result = await getOrderData(data);
    if (!result.data.success) {
      throw new Error(result.data.errorCode);
    } else {
      // eslint-disable-next-line prefer-destructuring
      tempheader = result.data.result[0];
    }

    data = { header_id: orderId };
    result = await getOrderItem(data);
    if (!result.data.success) {
      throw new Error(result.data.errorCode);
    } else {
      dataRowResult = result.data.result;
    }

    dataHeaderResult.orderNum = tempheader.id_num;
    dataHeaderResult.orderName = tempheader.name;
    dataHeaderResult.orderuserId = tempheader.user_id;
    dataHeaderResult.orderuserName = tempheader.user_name;
    dataHeaderResult.orderDescribe = tempheader.describe;
    dataHeaderResult.orderEndDate = tempheader.endtime.substring(0, 10);
    dataHeaderResult.orderEndTime = tempheader.endtime.substring(11);
    dataHeaderResult.orderCode = tempheader.invite_code;
    dataHeaderResult.orderMenu = tempheader.menu;
    dataHeaderResult.OrderClass = [tempheader.class_1, tempheader.class_2, tempheader.class_3, tempheader.class_4, tempheader.class_5];
    dataHeaderResult.orderDescribeArr = await this.handleDescribe(tempheader.describe);

    let tempvisibleClassNum = 0;
    for (let i = 0; i < dataHeaderResult.OrderClass.length; i += 1) {
      if (dataHeaderResult.OrderClass[i] || dataHeaderResult.OrderClass[i] !== '') {
        tempvisibleClassNum = i + 1;
      }
    }

    this.setState({
      myOrderHeader: dataHeaderResult,
      myOrderRow: dataRowResult,
      visibleClass: tempvisibleClassNum,
      mydelOrderRow: [],
    });
  }

  fnSetColumnHeader = async (flagAdd) => {
    const { visibleClass, myOrderHeader, myOrderRow } = this.state;
    const tempOrderHeader = myOrderHeader;
    const tempRows = myOrderRow;
    let tempV = visibleClass;

    if (flagAdd !== undefined
      && ((flagAdd && visibleClass >= 0 && visibleClass < 5) || (!flagAdd && visibleClass > 0 && visibleClass <= 5))) {
      tempV = flagAdd === true ? tempV + 1 : tempV - 1;
    }

    let tempHeader = [
      {
        dataIndex: 'id',
        align: 'center',
        width: 100,
        title:
          // eslint-disable-next-line react/jsx-indent
          <div>
            {this.fnIsCanJoin() ? (
              <Tooltip placement="topLeft" title="??????">
                <Button
                  style={{ backgroundColor: 'inherit', fontSize: '16px', fontWeight: 'bold', color: '#bf2121', border: '1px solid #bf2121' }}
                  onClick={() => this.btnAddNewOrderRow()}
                  disabled={!this.fnIsCanJoin()}
                >
                  ?????? +1
                </Button>
              </Tooltip>
            ) : '#'}
          </div>,
        render: (text, record, index) => (
          <div>
            {this.fnIsRowCanEdit(record.id) && this.fnIsRowEditType(record.id) ? (
              <div>
                <Tooltip placement="topLeft" title="??????">
                  <MinusCircleOutlined
                    className="tableCell-icon"
                    onClick={() => this.btndelOrderRow(record.id)}
                  />
                </Tooltip>
                <Tooltip placement="topLeft" title="OK">
                  <CheckCircleOutlined
                    className="tableCell-icon"
                    onClick={() => this.btnEditNewOrderRowType(record.id, '1')}
                    style={{ marginLeft: 15 }}
                  />
                </Tooltip>
              </div>
            ) : <div />}
            {this.fnIsRowCanEdit(record.id) && !this.fnIsRowEditType(record.id) ? (
              <div>
                <Tooltip placement="topLeft" title="??????">
                  <MinusCircleOutlined
                    className="tableCell-icon"
                    onClick={() => this.btndelOrderRow(record.id)}
                  />
                </Tooltip>
                <Tooltip placement="topLeft" title="??????">
                  <EditOutlined
                    className="tableCell-icon"
                    onClick={() => this.btnEditNewOrderRowType(record.id, '2')}
                    style={{ marginLeft: 15 }}
                  />
                </Tooltip>
              </div>
            ) : <div />}
            {!this.fnIsRowCanEdit(record.id) ? (
              <Tooltip placement="topLeft" title="????????????">
                <LikeOutlined className="tableCell-icon" />
              </Tooltip>
            ) : <div />}
          </div>
        ),
      }, {
        dataIndex: 'user_name',
        align: 'center',
        width: 150,
        sorter: {
          compare: (a, b) => a.user_name.localeCompare(b.user_name),
          multiple: 1,
        },
        title: <div><span style={{ color: 'red', fontSize: '20px' }}>*</span>??????</div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                // style={{ width: '100%', height: '28px', textAlign: 'center' }}
                value={record.user_name}
                maxLength={20}
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
        sorter: {
          compare: (a, b) => a.item_name.localeCompare(b.item_name),
          multiple: 2,
        },
        title:
          // eslint-disable-next-line react/jsx-indent
          <div>
            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
            ??????
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.item_name}
                maxLength={50}
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
          <div>
            {this.fnIsViewTypeMyOrder() ? (
              <Form colon={false} className="tableHeader-class" ref={this.formRef}>
                <Form.Item name="class1" initialValue={myOrderHeader.OrderClass[0]}>
                  <Input
                    style={{ width: '100%', textAlign: 'center' }}
                    maxLength={HeaderClassLength}
                    onChange={(e) => this.ChangeTableClassName(e, 0)}
                    placeholder="???"
                  />
                </Form.Item>
              </Form>
            ) : myOrderHeader.OrderClass[0]}
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.class_1}
                maxLength={RowClassLength}
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
          <div>
            {this.fnIsViewTypeMyOrder() ? (
              <Form colon={false} className="tableHeader-class" ref={this.formRef}>
                <Form.Item name="class2" initialValue={myOrderHeader.OrderClass[1]}>
                  <Input
                    style={{ width: '100%', textAlign: 'center' }}
                    maxLength={HeaderClassLength}
                    onChange={(e) => this.ChangeTableClassName(e, 1)}
                    placeholder="???"
                  />
                </Form.Item>
              </Form>
            ) : myOrderHeader.OrderClass[1]}
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.class_2}
                maxLength={RowClassLength}
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
          <div>
            {this.fnIsViewTypeMyOrder() ? (
              <Form colon={false} className="tableHeader-class" ref={this.formRef}>
                <Form.Item name="class3" initialValue={myOrderHeader.OrderClass[2]}>
                  <Input
                    style={{ width: '100%', textAlign: 'center' }}
                    maxLength={HeaderClassLength}
                    onChange={(e) => this.ChangeTableClassName(e, 2)}
                  />
                </Form.Item>
              </Form>
            ) : myOrderHeader.OrderClass[2]}
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.class_3}
                maxLength={RowClassLength}
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
          <div>
            {this.fnIsViewTypeMyOrder() ? (
              <Form colon={false} className="tableHeader-class" ref={this.formRef}>
                <Form.Item name="class4" initialValue={myOrderHeader.OrderClass[3]}>
                  <Input
                    style={{ width: '100%', textAlign: 'center' }}
                    maxLength={HeaderClassLength}
                    onChange={(e) => this.ChangeTableClassName(e, 3)}
                  />
                </Form.Item>
              </Form>
            ) : myOrderHeader.OrderClass[3]}
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.class_4}
                maxLength={RowClassLength}
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
          <div>
            {this.fnIsViewTypeMyOrder() ? (
              <Form colon={false} className="tableHeader-class" ref={this.formRef}>
                <Form.Item name="class5" initialValue={myOrderHeader.OrderClass[4]}>
                  <Input
                    style={{ width: '100%', textAlign: 'center' }}
                    maxLength={HeaderClassLength}
                    onChange={(e) => this.ChangeTableClassName(e, 4)}
                  />
                </Form.Item>
              </Form>
            ) : myOrderHeader.OrderClass[4]}
          </div>,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.class_5}
                maxLength={RowClassLength}
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
        title: <div><span style={{ color: 'red', fontSize: '20px' }}>*</span>??????</div>,
        width: 100,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <InputNumber
                className="tableCell-input"
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
        align: 'left',
        title: '??????',
        width: tempV > 3 ? 300 : null,
        render: (text, record, index) => (
          <div>
            {(this.fnIsRowEditType(record.id)) ? (
              <Input
                className="tableCell-input"
                value={record.remark}
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
    tempHeader = [...tempHeader, ...header3];

    if (flagAdd !== true) { // ????????????
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
      myOrderHeader: tempOrderHeader,
    });
  }

  // #endregion get list ----------------------------------


  // #region txt change ----------------------------------

  changeOrderHeader = (e, att) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader[att] = e.target.value;
    this.setState({
      myOrderHeader: tempHeader,
    });
  }

  changetxtorderEndDate = (date, dateString) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderEndDate = dateString;
    this.setState({
      myOrderHeader: tempHeader,
    });
  }

  changetxtorderEndTime = (time, timeString) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderEndTime = timeString;
    this.setState({
      myOrderHeader: tempHeader,
    });
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  btnchangeImgurl = (info) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;

    this.getBase64(info.file.originFileObj, (image) => {
      tempHeader.orderMenu = image;
      // console.log(image);
      this.setState({
        myOrderHeader: tempHeader,
      });
    });
  }

  btndeleteImgurl = () => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.orderMenu = '';
    this.setState({
      myOrderHeader: tempHeader,
    });
  }

  fnSetModelVisible = async (visible, model) => {
    const { visibleModel } = this.state;
    let tempModel = visibleModel;

    if (model === undefined) {
      tempModel = {
        menuModel: false,
        saveNotifyModal: false,
        tempStr: '',
        loading: false,
      };
    } else {
      tempModel[model] = visible;
    }

    this.setState({
      visibleModel: tempModel,
    });
  }

  ChangeTableClassName = (e, column) => {
    const { myOrderHeader } = this.state;
    const tempHeader = myOrderHeader;
    tempHeader.OrderClass[column] = e.target.value.trim();
    this.setState({ myOrderHeader: tempHeader });
  };

  ChangeTableCell = (e, id, column) => {
    const { myOrderRow } = this.state;
    const thisArray = myOrderRow;
    const index = myOrderRow.findIndex((p) => p.id === id);
    const temp = e.target === undefined ? e : e.target.value;

    thisArray[index][column] = temp;
    this.setState({ myOrderRow: thisArray });
  };

  btnAddNewOrderRow = async () => {
    const { userid, orderId, myOrderRow } = this.state;
    const tempRows = JSON.parse(JSON.stringify(myOrderRow));
    const newRow = {
      id: `+${myOrderRow.length}`,
      heaader_id: orderId,
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
      create_id: userid,
    };
    tempRows.unshift(newRow);

    this.setState({ myOrderRow: tempRows });
  }

  btnEditNewOrderRowType = async (id, state) => {
    const { myOrderRow } = this.state;
    const tempArray = myOrderRow;
    const index = myOrderRow.findIndex((p) => p.id === id);

    if (state === '1'
      && (await this.IsNullOrEmpty(tempArray[index].user_name)
        || await this.IsNullOrEmpty(tempArray[index].item_name)
        || await this.IsNullOrEmpty(tempArray[index].price))
    ) {
      message.warning('????????????????????????');
    } else {
      tempArray[index].type = state;
      this.setState({ myOrderRow: tempArray });
    }
  }

  btndelOrderRow = async (id) => {
    const { myOrderRow, mydelOrderRow } = this.state;
    const tempdelArray = mydelOrderRow;

    if (id.toString().substring(0, 1) !== '+') {
      tempdelArray.push(id);
    }
    this.setState({
      myOrderRow: myOrderRow.filter((item) => item.id.toString() !== id.toString()),
      mydelOrderRow: tempdelArray,
    });
  }

  btnCompleteOrder = async () => {
    const { orderId } = this.state;
    let apiResult = null;

    try {
      const data = { id: orderId };
      apiResult = await deleteOrder(data);
      if (apiResult.data.success !== true) {
        throw new Error(apiResult.data.errorCode);
      }
      await this.fnReload();
    } catch (err) {
      message.error(`btnCompleteOrder:${err.message}`);
    }
  }

  btnSaveOrder = async () => {
    const { visibleModel, orderId, myOrderHeader, myOrderRow, mydelOrderRow } = this.state;
    const tempVisibleModal = visibleModel;
    let apiResult = null;
    try {
      await this.fnSetModelVisible(true, 'loading');
      if (await this.IsNullOrEmpty(myOrderHeader.orderName)
        || await this.IsNullOrEmpty(myOrderHeader.orderEndDate)
        || await this.IsNullOrEmpty(myOrderHeader.orderEndTime)
        || await this.IsNullOrEmpty(myOrderHeader.orderCode)) {
        throw new Error('?????????????????????');
      }

      // #region header
      let data = {
        id: orderId,
        id_num: myOrderHeader.orderNum,
        name: myOrderHeader.orderName,
        user_id: myOrderHeader.orderuserId,
        user_name: myOrderHeader.orderuserName,
        describe: myOrderHeader.orderDescribe,
        endtime: `${myOrderHeader.orderEndDate} ${myOrderHeader.orderEndTime}`,
        invite_code: myOrderHeader.orderCode,
        menu: myOrderHeader.orderMenu,
        class_1: myOrderHeader.OrderClass[0],
        class_2: myOrderHeader.OrderClass[1],
        class_3: myOrderHeader.OrderClass[2],
        class_4: myOrderHeader.OrderClass[3],
        class_5: myOrderHeader.OrderClass[4],
      };
      apiResult = await saveOrder(data);
      if (apiResult.data.success !== true) {
        throw new Error(apiResult.data.errorCode);
      }
      // #endregion header

      // #region rows
      const tempId = apiResult.data.result.id;
      const addRow = [];
      const editRow = [];
      for (let i = 0; i < myOrderRow.length; i += 1) {
        if (await this.IsNullOrEmpty(myOrderRow[i].user_name)
          || await this.IsNullOrEmpty(myOrderRow[i].item_name)
          || await this.IsNullOrEmpty(myOrderRow[i].price)) {
          // eslint-disable-next-line no-continue
          continue;
        } else if (myOrderRow[i].id.toString().indexOf('+') >= 0) {
          addRow.push(myOrderRow[i]);
        } else if (myOrderRow[i].type !== undefined) {
          editRow.push(myOrderRow[i]);
        }
      }

      if (addRow.length > 0 || editRow.length > 0 || mydelOrderRow.length > 0) {
        data = {
          id: tempId,
          addRow,
          editRow,
          delRow: mydelOrderRow,
        };
        apiResult = await saveRow(data);
        if (apiResult.data.success !== true) {
          throw new Error(apiResult.data.errorCode);
        }
      }
      // #endregion rows

      tempVisibleModal.tempStr = '??????';
      this.setState({
        orderId: tempId,
        visibleModel: tempVisibleModal,
      });
      await this.fnGetOrderList();
    } catch (err) {
      tempVisibleModal.tempStr = `??????, ${err.message}`;
      this.setState({
        visibleModel: tempVisibleModal,
      });
      // message.error(`btnSaveOrder${err.message}`);
    }
    this.fnSetModelVisible(true, 'saveNotifyModal');
  }

  btnSaveOrderRow = async () => {
    const { visibleModel, orderId, myOrderRow, mydelOrderRow } = this.state;
    const tempVisibleModal = visibleModel;
    let apiResult = null;
    try {
      await this.fnSetModelVisible(true, 'loading');

      // #region rows
      const addRow = [];
      const editRow = [];
      for (let i = 0; i < myOrderRow.length; i += 1) {
        if (await this.IsNullOrEmpty(myOrderRow[i].user_name)
          || await this.IsNullOrEmpty(myOrderRow[i].item_name)
          || await this.IsNullOrEmpty(myOrderRow[i].price)) {
          // eslint-disable-next-line no-continue
          continue;
        } else if (myOrderRow[i].id.toString().indexOf('+') >= 0) {
          addRow.push(myOrderRow[i]);
        } else if (myOrderRow[i].type !== undefined) {
          editRow.push(myOrderRow[i]);
        }
      }

      if (addRow.length > 0 || editRow.length > 0 || mydelOrderRow.length > 0) {
        const data = {
          id: orderId,
          addRow,
          editRow,
          delRow: mydelOrderRow,
        };
        apiResult = await saveRow(data);
        if (apiResult.data.success !== true) {
          throw new Error(apiResult.data.errorCode);
        }
      }
      // #endregion rows

      tempVisibleModal.tempStr = '??????';
      this.setState({
        visibleModel: tempVisibleModal,
      });
      await this.fnGetOrderList();
    } catch (err) {
      tempVisibleModal.tempStr = `??????, ${err.message}`;
      this.setState({
        visibleModel: tempVisibleModal,
      });
      // message.error(`btnSaveOrder${err.message}`);
    }
    this.fnSetModelVisible(true, 'saveNotifyModal');
  }

  btnCopyInfo = async () => {
    const { myOrderHeader } = this.state;
    try {
      const textField = document.createElement('textarea');
      textField.innerText = `??????:${myOrderHeader.orderNum}, ??????:${myOrderHeader.orderName}, ?????????:${myOrderHeader.orderCode}, ????????????:${myOrderHeader.orderEndDate} ${myOrderHeader.orderEndTime}`;
      document.body.appendChild(textField);
      textField.select();
      const successful = document.execCommand('copy');
      if (successful) {
        message.success('Copy Success !');
      }
      textField.remove();
    } catch (err) {
      message.error(`btnCopyInfo:${err.message}`);
    }
  }

  // #endregion txt change ----------------------------------


  fnIsViewTypeMyOrder = () => {
    // return true ??? myOrder
    // return false ??? joinOrder
    const { ViewType } = this.state;
    let result = false;
    if (ViewType === modeViewType.neworderView) result = true;
    return result;
  }

  fnIsCanJoin = () => {
    // return true ??? ?????????/???????????????endtime
    // return false ???
    const { userid, myOrderHeader } = this.state;
    let result = true;
    if (myOrderHeader.orderuserId !== userid
      && new Date(`${myOrderHeader.orderEndDate} ${myOrderHeader.orderEndTime}:59`) < new Date()) {
      result = false;
    }
    return result;
  }

  fnIsRowCanEdit = (id) => {
    // return true ??? ?????????/row???????????????????????????endtime
    // return false ???
    const { ViewType, myOrderRow, userid, myOrderHeader } = this.state;
    const index = myOrderRow.findIndex((p) => p.id === id);
    let result = false;

    if (ViewType === modeViewType.neworderView
      || userid === myOrderHeader.orderuserId
      || (userid === myOrderRow[index].create_id
        && (new Date(`${myOrderHeader.orderEndDate} ${myOrderHeader.orderEndTime}:59`) > new Date()))) {
      result = true;
    }
    return result;
  }

  fnIsRowEditType = (id) => {
    // row type: 0:?????? 1:?????????, 2:?????????
    // return true ??? ????????????
    // return false ??? ????????????
    const { myOrderRow } = this.state;
    const tempArray = myOrderRow;
    const index = tempArray.findIndex((p) => p.id === id);
    let result = false;
    if (index >= 0 && tempArray[index].type === '2') result = true;
    return result;
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }

  handlePage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  fnReload = async () => {
    const { fnReload } = this.props;
    await fnReload();
  }


  render() {
    const { myOrderColumn, myOrderHeader, myOrderRow, visibleModel } = this.state;
    return (
      <div>
        <Spin spinning={visibleModel.loading}>
          <div className="orderheader">

            <div style={{ marginTop: 5, width: '100%' }}>
              {this.fnIsViewTypeMyOrder() ? (
                <div>
                  <span style={{ color: 'red', fontSize: '28px', fontWeight: 'bold' }}>*</span>
                  <Input
                    size="large"
                    className="input-buttonborder"
                    style={{
                      width: 250, fontSize: '20px', fontWeight: 'bold', marginLeft: 5, backgroundColor: 'inherit',
                    }}
                    value={myOrderHeader.orderName}
                    placeholder="??????????????????"
                    onChange={(e) => this.changeOrderHeader(e, 'orderName')}
                  />
                  <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: 5 }}> ({myOrderHeader.orderNum})</span>
                  <Tooltip placement="topLeft" title="Copy">
                    <CopyOutlined
                      style={{ fontSize: '20px', marginLeft: 10, color: 'gray' }}
                      onClick={() => this.btnCopyInfo()}
                    />
                  </Tooltip>

                  <Popconfirm
                    title="???????????????????????????????????????????????????????"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => this.btnCompleteOrder()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }}>????????????</Button>
                  </Popconfirm>

                  <Popconfirm
                    title="?????????????????????????????????????????????????"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => this.fnReload()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }}>??????</Button>
                  </Popconfirm>

                  <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }} onClick={() => this.btnSaveOrder()}>??????</Button>
                </div>
              ) : <div />}
              {!this.fnIsViewTypeMyOrder() && this.fnIsCanJoin() ? (
                <div>
                  <PushpinTwoTone size="large" style={{ fontSize: 28 }} twoToneColor="#e88b3f" />
                  <span style={{ fontSize: '26px', fontWeight: 'bold', marginLeft: 5 }}>{myOrderHeader.orderName}</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: 5 }}> ({myOrderHeader.orderNum})</span>
                  <Popconfirm
                    title="?????????????????????????????????????????????????"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => this.fnReload()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }}>??????</Button>
                  </Popconfirm>
                  <Button type="dashed" size="large" style={{ marginRight: 10, float: 'right' }} onClick={() => this.btnSaveOrderRow()}>??????</Button>
                </div>
              ) : <div />}
              {!this.fnIsViewTypeMyOrder() && !this.fnIsCanJoin() ? (
                <div>
                  <PushpinTwoTone size="large" style={{ fontSize: 28 }} twoToneColor="#e88b3f" />
                  <span style={{ fontSize: '26px', fontWeight: 'bold', marginLeft: 5 }}>{myOrderHeader.orderName}</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: 5 }}> ({myOrderHeader.orderNum})</span>
                  <Button
                    type="dashed"
                    size="large"
                    style={{ marginRight: 10, float: 'right' }}
                    onClick={() => this.fnReload()}
                  >
                    ??????
                  </Button>
                </div>
              ) : <div />}
            </div>

            <div style={{ marginTop: 10, width: '100%' }}>
              <table className="table_container">
                <tr>
                  <td className="table-col1">?????????:</td>
                  <td className="table-col2">
                    <span style={{ fontSize: '16px', marginLeft: 5 }}>{myOrderHeader.orderuserId} - {myOrderHeader.orderuserName}</span>
                  </td>
                  <td>
                    <span>Menu</span>
                    <EyeOutlined
                      style={{
                        color: '#e88b3f',
                        fontSize: '22px',
                        marginLeft: 15,
                        cursor: myOrderHeader.orderMenu ? 'pointer' : 'not-allowed',
                      }}
                      onClick={myOrderHeader.orderMenu ? () => this.fnSetModelVisible(true, 'menuModel') : null}
                    />
                    {this.fnIsViewTypeMyOrder() ? (
                      <DeleteOutlined
                        style={{
                          color: '#e88b3f',
                          fontSize: '22px',
                          marginLeft: 15,
                          cursor: myOrderHeader.orderMenu ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => this.btndeleteImgurl()}
                      />
                    ) : <div />}
                  </td>
                </tr>
                <tr>
                  <td className="table-col1">
                    {this.fnIsViewTypeMyOrder() ? (
                      <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                    ) : <div />}
                  ????????????:
                  </td>
                  <td className="table-col2">
                    {this.fnIsViewTypeMyOrder() ? (
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
                    ) : (
                      <div>
                        <span style={{ fontSize: '16px', marginLeft: 5 }}>{myOrderHeader.orderEndDate} {myOrderHeader.orderEndTime}</span>
                      </div>
                    )}
                  </td>
                  <td rowSpan="3" style={{ verticalAlign: 'top' }}>
                    {this.fnIsViewTypeMyOrder() ? (
                      <Upload
                        showUploadList={false}
                        beforeUpload={this.imgbeforeUpload}
                        onChange={this.btnchangeImgurl}
                      >
                        <Button className="uploadbtn">
                          {myOrderHeader.orderMenu ? <img src={myOrderHeader.orderMenu} alt="QQ" style={{ width: '100%', height: '100%' }} />
                            : (
                              <div style={{ color: '#b3aca6' }}>
                                <PlusOutlined style={{ fontSize: 16 }} />
                                <div style={{ marginTop: 8, fontSize: 16 }}>Upload</div>
                              </div>
                            )}
                        </Button>
                      </Upload>
                    ) : (
                      <div className="uploadbtn">
                        {myOrderHeader.orderMenu ? <img src={myOrderHeader.orderMenu} alt="QQ" style={{ width: '100%', height: '100%' }} />
                          : (
                            <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '80px', color: '#b3aca6' }}>
                              <MehOutlined style={{ fontSize: 32 }} />
                              <div style={{ marginTop: 8, fontSize: 16 }}>no image</div>
                            </div>
                          )}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-col1">
                    {this.fnIsViewTypeMyOrder() ? (
                      <span className="input-buttonborder" style={{ color: 'red', fontSize: '20px' }}>*</span>
                    ) : <div />}
                  ?????????:
                  </td>
                  <td className="table-col2">
                    {this.fnIsViewTypeMyOrder() ? (
                      <Input
                        style={{ width: '90%', marginLeft: 5, backgroundColor: 'inherit' }}
                        allowClear
                        value={myOrderHeader.orderCode}
                        placeholder="??????????????????"
                        onChange={(e) => this.changeOrderHeader(e, 'orderCode')}
                      />
                    ) : (
                      <div>
                        <span style={{ fontSize: '16px', marginLeft: 5, color: '#9e958d' }}>**********</span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr style={{ height: '200px' }}>
                  <td className="table-col1" style={{ verticalAlign: 'top' }}>??????:</td>
                  <td style={{ verticalAlign: 'top' }}>
                    {this.fnIsViewTypeMyOrder() ? (
                      <TextArea
                        style={{ width: '90%', marginLeft: 5, backgroundColor: 'inherit' }}
                        placeholder="url ???????????????"
                        value={myOrderHeader.orderDescribe}
                        onScroll
                        rows={7}
                        // showCount
                        maxLength={200}
                        onChange={(e) => this.changeOrderHeader(e, 'orderDescribe')}
                      />
                    ) : (
                      <div className="describetxtbox">
                        {myOrderHeader.orderDescribeArr.map((item) => {
                          return (
                            <div>
                              {/* eslint-disable-next-line no-nested-ternary */}
                              { item.str.indexOf('https://') >= 0 || item.str.indexOf('http://') >= 0 ? (
                                <a href={item.str.trim()} target="blank">{item.str}</a>
                              ) : item.str}
                            </div>
                          );
                        })}
                      </div>
                      // <div className="describetxtbox">{myOrderHeader.orderDescribe}</div>
                    )
                    }
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <Divider style={{ width: '60%', backgroundColor: '#92a69f', marginTop: 0 }} />

          <div className="orderbody">
            <div style={{ marginTop: 5, width: '100%' }}>
              {this.fnIsViewTypeMyOrder() ? (
                <div>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
                    ??????
                  </span>
                  <Tooltip placement="topLeft" title="????????????">
                    <DoubleLeftOutlined
                      style={{ marginLeft: 15, verticalAlign: 'text-top' }}
                      onClick={() => this.fnSetColumnHeader(false)}
                    />
                  </Tooltip>
                  <Tooltip placement="topLeft" title="????????????(??????5???)">
                    <DoubleRightOutlined
                      style={{ marginLeft: 8, verticalAlign: 'text-top' }}
                      onClick={() => this.fnSetColumnHeader(true)}
                    />
                  </Tooltip>
                </div>
              ) : (
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
                  ??????
                </span>
              )}
            </div>
            <div style={{ marginTop: 5, width: '100%', height: '100%' }}>
              <Table
                columns={myOrderColumn}
                dataSource={myOrderRow}
                bordered
                size="small"
                locale={{ emptyText: '????????????????????????????????? > <' }}
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
        </Spin>
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
          <img alt="QQ" style={{ width: '100%' }} src={myOrderHeader.orderMenu} />
        </Modal>

        <Modal
          visible={visibleModel.saveNotifyModal}
          // title="??????"
          width={500}
          // centered
          onCancel={() => this.fnSetModelVisible(false)}
          footer={(
            <Button onClick={() => this.fnSetModelVisible(false)}>
              OK
            </Button>
          )}
        >
          <div style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>
            ??????{visibleModel.tempStr}
          </div>
        </Modal>
      </div>
    );
  }
}

NewOrderForm.propTypes = {
  history: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
};

NewOrderForm.defaultProps = {
  history: null,
  match: {},
};

export default NewOrderForm;
