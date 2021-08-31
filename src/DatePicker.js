import React, { Component } from 'react';
import DatePicker from 'react-date-picker';


class MyApp extends Component {
  state = {
    date: new Date(),
  }

  onChange =async (date) => {
    await this.setState({ date })
    this.getDateFunc();
    // this.updateDate();
  }
  getDateFunc = () => {
    this.props.getDate(this.state.date)
  }

  // updateDate=()=>{
  //   this.setState({ 
  //     date:this.props.dateUpdated
  //   })
  // }
  
  render() {
    return (
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}

        />
        {/* {this.props.dateState(this.state.date)} */}
      </div>
    );
  }
}

export default MyApp;

