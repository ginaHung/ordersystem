/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import { Button, Input, message } from 'antd';

import './LoginPage.less';
import cover from '../../../img/cover.png';
import { verify } from '../../service/API';
import { SYSTEM_TITLE, HeaderPageRouter } from '../../utils/define';
// import NowTime from '../../Component/DateTime';

class LoginPage extends React.Component {

  initState = {
    username: '',
    password: '',
  }

  constructor(props) {
    super(props);
    sessionStorage.clear();
    this.state = {
      ...this.initState,
    };
  }

  componentWillMount = () => {
    // console.log('WillMount LoginPage');
  }

  componentDidMount = () => {
    // console.log('DidMount LoginPage');
  }

  componentWillUpdate = () => {
    // console.log('WillUpdat LoginPage');
  }

  componentDidUpdate = () => {
    // console.log('DidUpdate LoginPage');
  }

  IsNullOrEmpty = async (txt) => {
    if (txt === undefined || txt === '') {
      return true;
    }
    return false;
  }

  changeUserName = (e) => {
    // console.log('changeDomain', e.target.value);
    this.setState({
      username: e.target.value,
    });
  }

  changePassword = (e) => {
    // console.log('changeDomain', e.target.value);
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin = async () => {
    const { username } = this.state;
    let { password } = this.state;
    const { history } = this.props;

    if (await this.IsNullOrEmpty(username) || await this.IsNullOrEmpty(password)) {
      message.error('請輸入工號與密碼');
    } else {
      const secret = '9Xb%,fZ4)G!k9XS;';
      const iv = new Buffer.alloc(16);
      const HASH_KEY = crypto
        .createHash('sha256')
        .update(secret)
        .digest();
      const cipher = crypto.createCipheriv('aes-256-cbc', HASH_KEY, iv);
      let passwordSecret = cipher.update(password, 'binary', 'base64');
      passwordSecret += cipher.final('base64');
      password = passwordSecret;
      const data = {
        domain: 'WHQ',
        user: username.toUpperCase(),
        pwd: password,
      };

      // const member = await verify(data);
      // if (member.data.success) {
      if (true) {
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('emplid', username);
        sessionStorage.setItem('emplidname', 'Gina');
        history.push(HeaderPageRouter);
      } else {
        // message.error(member.data.errorCode);
      }
    }
  }

  render() {
    const {
      username,
      password,
    } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="login_form">
          <div>
            <table className="table_container">
              <tr>
                <td style={{ width: '50%' }}>
                  <img alt="cover" src={cover} style={{ float: 'right', width: '70%' }} />
                </td>
                <td style={{ width: '1%' }} />
                <td>
                  <from>
                    <table>
                      <tr><td colSpan="3" style={{ fontSize: '28px' }}><h1>{SYSTEM_TITLE}</h1></td></tr>
                      <tr style={{ height: 50 }}>
                        <td style={{ width: 60, textAlign: 'right', fontSize: '20px' }}>工號</td>
                        <td style={{ width: 2 }} />
                        <td>
                          <Input
                            style={{ width: 200, height: 30 }}
                            defaultValue={username}
                            placeholder="輸入工號"
                            onChange={this.changeUserName}
                          />
                        </td>
                      </tr>
                      <tr style={{ height: 50 }}>
                        <td style={{ textAlign: 'right', fontSize: '20px' }}>密碼</td>
                        <td style={{ width: '1%' }} />
                        <td>
                          <Input.Password
                            style={{ width: 200, height: 30 }}
                            defaultValue={password}
                            placeholder="輸入密碼"
                            onChange={this.changePassword}
                          />
                        </td>
                      </tr>
                      <tr style={{ height: 50 }}>
                        <td colSpan="3">
                          <Button
                            style={{ height: 30, width: 300, fontSize: '18px' }}
                            htmlType="submit"
                            onClick={() => this.handleLogin()}
                          >
                            登入
                          </Button>
                        </td>
                      </tr>
                    </table>
                  </from>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.func,
};

LoginPage.defaultProps = {
  history: null,
};

export default LoginPage;
