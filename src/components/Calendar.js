import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
class CalendarTask extends Component {
    state = {
        date: new Date(),
    }
    onChange = date => this.setState({ date });
    getDates = async () => {
        let arr = String(this.state.date).split(" ");
        let str = arr[1] + "-" + arr[2] + "-" + arr[3];
        return str
        // this.props.getDate(str);

        // await this.props.getDate(str);
    }
    render() {
        {
            
                
        }
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                {
                    this.props.getDate(this.state.date)
                    // this.getDates()
                    

                    // console.log(this.getDate())
                    // console.log(JSON.stringify(this.state.date).split(" "))String(this.state.date).split(" ")
                    // console.log(String(this.state.date).split(" "))

                    // console.log(this.state.date)

                }
            </div>
        );
    }
}
export default CalendarTask;
