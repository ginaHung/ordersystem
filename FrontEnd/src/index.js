import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/antd/dist/antd.css';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
