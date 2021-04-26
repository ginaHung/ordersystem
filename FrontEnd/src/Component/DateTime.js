/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class NowTime extends React.Component {
  // initState = {
  //   time: new Date().toLocaleTimeString(),
  // }

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      // ...this.initState,
    };
  }

  // 組件產生後先執行的動作
  componentDidMount() {
    // 宣告一個更新state內容的function
    const upTime = () => {
      // 這裡面的setState()能夠重新設定state的值
      this.setState({
        time: new Date().toLocaleTimeString(),
      });
    };

    // 每秒去執行一次該function刷新
    setInterval(upTime, 1000);
  }

  componentDidUpdate() {
    // 執行內容
    // console.log('時間一分一秒在跑...');
  }

  componentWillUnmount() {
    // 這裡記錄移除掉的時間
    // console.log(`移除組件的時間為：${this.state.time}`);
  }

  // render是唯一必要的屬性，會回傳一個根Element
  render() {
    // const { time } = this.props;
    return (
      <div>
          現在時間：{this.state.time}
      </div>
    );
  }
}


export default NowTime;
