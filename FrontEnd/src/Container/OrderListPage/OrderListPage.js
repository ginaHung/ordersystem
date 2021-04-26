/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  message,
} from 'antd';

import { verify } from '../../service/API';
import './LoginPage.less';
import cover from '../../../img/cover.png';
// import NowTime from '../../Component/DateTime';
// import { brotliDecompress } from 'zlib';

class LoginPage extends React.Component {

  initState = {
    username: '',
    password: '',

    // router
  }

  constructor(props) {
    super(props);
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

  componentWillUpdate = (nextProps, nextState) => {
    // console.log('WillUpdat LoginPage');
  }

  componentDidUpdate = (lastProps, lastState) => {
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
    console.log(1);

    if (await this.IsNullOrEmpty(username) || await this.IsNullOrEmpty(password)) {
      console.log(2);
      message.error('請輸入工號與密碼');
    } else {
      console.log(3);
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
      console.log(5);

      // if (member.data.success) {
      if (true) {
        console.log(6);
        sessionStorage.setItem('emplid', username);
        history.push('/inspection/inspectionlist');
      } else {
        console.log(7);
        message.error(member.data.errorCode);
      }
    }
  }

  render() {
    const {
      username,
      password,
    } = this.state;
    return (
      <div className="login_form" >
       
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
