import React from 'react';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import {
  verify
} from '../../service/API';

import './LoginPage.less';

class LoginPage extends React.Component {

  initState = {
    domain: 'WHQ',
    mail: 'Kelvin_Liu@wistron.com',
    username: '10710058',
    password: '4Kevin5566',

    status: 'None',
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

  handleLogin = async () => {
    const {
      domain,
      mail,
      username,
    } = this.state;
    let {
      password,
    } = this.state;
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
      domain: domain.toUpperCase(),
      mail,
      user: username.toUpperCase(),
      pwd: password,
    };
    const member = await verify(data);
    if (member.data.success) {
      this.setState({
        status: 'Success',
      });
    } else {
      this.setState({
        status: 'Fail',
      });
    }
  }

  handleReset = () => {
    this.setState({
      status: 'None',
    });
  }

  render() {
    const {
      domain,
      mail,
      username,
      password,

      status,
    } = this.state;
    return (
      <div>
        <div>
          domain: {domain}
        </div>
        <div>
          mail: {mail}
        </div>
        <div>
          username: {username}
        </div>
        <div>
          password: {password}
        </div>
        <div>
          status: {status}
        </div>
        <div
          style={{
            border: 'solid',
            width: 50,
            height: 32,
            cursor: 'pointer',
          }}
          onClick={this.handleLogin}
        >
          login
        </div>
        <div
          style={{
            border: 'solid',
            width: 50,
            height: 32,
            cursor: 'pointer',
          }}
          onClick={this.handleReset}
        >
          reset
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
