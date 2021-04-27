import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './Container/LoginPage/LoginPage';
import HeaderPage from './Container/HeaderPage/HeaderPage';
// import ResultPage from './Container/ResultPage/ResultPage';

import './style/main.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <HashRouter>
        <div style={{ height: '100%' }}>
          <Route key="1" exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route key="2" path="/login" component={LoginPage} />
          <Route key="3" path="/orderlist" component={HeaderPage} />
          {/* <Route key="3" path="/result" component={ResultPage} /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
