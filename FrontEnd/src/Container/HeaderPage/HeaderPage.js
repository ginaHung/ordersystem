/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Layout, Button } from 'antd';
import jwtDecode from 'jwt-decode';

import { logout } from '../../service/API';
import { SYSTEM_TITLE, LoginRouter, HeaderPageRouter } from '../../utils/define';
import OrderListPage from '../OrderListPage/OrderListPage';
import icon from '../../../img/icon.png';
import './HeaderPage.less';

const { Header } = Layout;

class HeaderPage extends React.Component {

  initState = {
    loginsuccess: sessionStorage.getItem('login'),
    userid: sessionStorage.getItem('emplid'),
    username: sessionStorage.getItem('emplidname'),
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    const cookieStr = window.document.cookie.split(';').map((str) => str.trim().split('='));
    const cookieObj = {};
    // console.log(cookieStr);
    cookieStr.forEach((item) => {
      const [key, val] = item;
      cookieObj[key] = val;
    });

    if (cookieObj && cookieObj.loginstr) {
      const decodeloginstr = jwtDecode(cookieObj.loginstr);
      // console.log(decodeloginstr);
      sessionStorage.setItem('login', decodeloginstr.loginsuccess);
      sessionStorage.setItem('emplid', decodeloginstr.emplid);
      sessionStorage.setItem('emplidname', decodeloginstr.username);
      this.setState({
        loginsuccess: sessionStorage.getItem('login'),
        userid: sessionStorage.getItem('emplid'),
        username: sessionStorage.getItem('emplidname'),
      });
    }
  }

  componentDidMount = async () => {
    const { loginsuccess, userid } = this.state;
    const { history } = this.props;
    // console.log(`loginsuccess=${loginsuccess}`);
    if (loginsuccess !== 'true' || await this.IsNullOrEmpty(userid)) {
      history.push(LoginRouter);
    }
  }

  // componentWillUpdate = () => { }

  // componentDidUpdate = (lastProps, lastState) => { }

  handlePage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  handleLogOut = async () => {
    const { history } = this.props;
    const result = await logout(null);
    if (result.data === 'OK') {
      history.push(LoginRouter);
    }
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === null || txt === '') {
      return true;
    }
    return false;
  }


  render() {
    const { userid, username } = this.state;
    return (
      <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Header className="header-style">
            <div style={{ marginTop: 5, float: 'left' }}>
              <a onClick={() => this.handlePage(HeaderPageRouter)}>
                <img alt="icon" src={icon} style={{ width: 80, marginLeft: 24, float: 'left' }} />
                <div style={{ marginTop: 10, float: 'left' }}>
                  <span style={{ fontSize: '28px', lineHeight: '30px', fontWeight: 'bold', color: '#45A2CD', marginLeft: 8, fontFamily: 'Microsoft JhengHei' }}>
                    {SYSTEM_TITLE}
                  </span>
                </div>
              </a>
            </div>
            <div style={{ marginTop: 15, float: 'right' }}>
              <Button
                className="btnLogout"
                style={{ float: 'right', height: '60%' }}
                onClick={this.handleLogOut}
              >
                登出
              </Button>
            </div>
            <div style={{ marginTop: 20, float: 'right' }}>
              <span style={{ fontSize: '18px', lineHeight: '30px', fontWeight: 'bold', color: '#000000', float: 'right', marginRight: 20 }}>
                {username}/{userid}
              </span>
            </div>
          </Header>
          <div className="scroll-style">
            <div className="content-style">
              <Route key="4" path={`${HeaderPageRouter}/:view?`} component={OrderListPage} />
            </div>
          </div>
          {/* <div className="footer-style">Footer</div> */}
        </Layout>
      </div>
    );
  }
}

HeaderPage.propTypes = {
  history: PropTypes.func,
};

HeaderPage.defaultProps = {
  history: null,
};

export default HeaderPage;
