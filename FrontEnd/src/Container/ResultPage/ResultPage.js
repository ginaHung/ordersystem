/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './ResultPage.less';

class ResultPage extends React.Component {

  initState = {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  componentWillMount = () => {
    // console.log('WillMount ResultPage');
  }

  componentDidMount = () => {
    // console.log('DidMount ResultPage');
  }

  componentWillUpdate = (nextProps, nextState) => {
    // console.log('WillUpdat ResultPage');
  }

  componentDidUpdate = (lastProps, lastState) => {
    // console.log('DidUpdate ResultPage');
  }

  render() {
    const {
    } = this.state;
    return (
      <div>
        ResultPage
      </div>
    );
  }
}

ResultPage.propTypes = {
  history: PropTypes.func,
};

ResultPage.defaultProps = {
  history: null,
};

export default ResultPage;
