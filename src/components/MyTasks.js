import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
// import { AddTask, CardTask, UpdateTaskModal } from './components';
import AddTask from './AddTask';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import CalendarTask from './CalendarTask';
import CardTask from './CardTask'
import UpdateTaskModal from './UpdateTaskModal'


class MyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //For Add Task modals
            stateOfModal: false,
            ///For Update Task modals
            stateOfUpdateModal: false,
            //For our tasks Data
            taskData: [],
            // date: "",
            //For date in the calendar
            date: new Date(),
            //For date in the calendar(String)
            dateStr: "",
            //To Specify the task that I want to update
            chosenTask: {}
        }
    }
    //////////////////////////////
    ///For react-calendar////////
    ////////////////////////////
    onChange = async (date) => {
        await this.setState({ date })
        await this.getDate();
    }
    //////////////////////////////
    ///To close the modal////////
    ////////////////////////////
    handleClose = () => {
        this.setState({
            stateOfModal: false,
            stateOfUpdateModal: false
        });
    }

    /////////////////////////////
    ///To Open the modal////////
    ////////////////////////////
    showModal = () => {
        this.setState({
            stateOfModal: true
        })
    };
    /////////////////////////////////////////////////////
    ///For Render My tasks depend on email + date //////
    ////////////////////////////////////////////////////
    componentDidMount = async () => {
        await this.getDate();
        //http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
        const { user } = this.props.auth0;
        // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getTasks?email=${user.email}&date=${this.state.dateStr}`);
        // await this.setState({
        //     taskData: tasks.data
        // });
    }
    //////////////////////////////////////////////////////////////////////////////
    ///For Add new task and Re-render My tasks depend on email + date ///////////
    ////////////////////////////////////////////////////////////////////////////
    addTask = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        let taskData = {
            date: e.target.date.value,
            description: e.target.description.value,
            email: user.email
        }
        //http://localhost:3000/addTask?email=a.nazzal, Params
        let task = await axios.post(`${process.env.REACT_APP_SERVER}/addTask`, taskData);
        await this.setState({
            taskData: task.data
        });
        // this.componentDidMount();

    }
    ///////////////////////////////////////////////////////////////////
    ///To get the date from calendar Example:Aug-28-2021 /////////////
    /////////////////////////////////////////////////////////////////
    getDate = async () => {

        let arr = String(this.state.date).split(" ");
        let str = arr[1] + "-" + arr[2] + "-" + arr[3];
        //str=Aug-28-2021
        await this.setState({
            dateStr: str
        })
        console.log(this.state.dateStr);
    }
    //////////////////////////////////////////////////////////////////////////
    ///To Delete Task And and Re-render My tasks depend on email + date//////
    ////////////////////////////////////////////////////////////////////////
    deleteTask = async (task_id) => {
        const { user } = this.props.auth0;
        //localhost:3001/deleteTask/61290aaf7961c8b994543c97?email=a.nazzal1995@gmail.com
        let task = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteTask/${task_id}?${user.email}`);
        await this.setState({
            taskData: task.data
        });

        // this.componentDidMount();
    }

    /////////////////////////////////////////////////////////////////
    ////// To get the Task_id: When Click on Update Button. ////////
    ////// And put the Info For specific item in chosenTask ///////
    ////// And Open Update Modal /////////////////////////////////
    /////////////////////////////////////////////////////////////
    getTask_ID = async (task_id) => {
        await this.setState(
            {
                stateOfUpdateModal: false
            }
        );

        let chosenTask = this.state.taskData.find((task) => {
            return task._id == task_id;
        })

        await this.setState(
            {
                chosenTask: chosenTask,
                stateOfUpdateModal: true
            }
        );
        // console.log("asd das das ",this.state.choseBook);
    }

    ///////////////////////////////////////////////////////////////////////
    ///To Update Task and Re-render My tasks depend on email + date///////
    /////////////////////////////////////////////////////////////////////
    updateTaskData = async (e) => {
        e.preventDefault();
        //localhost:3001/task/61290aaf7961c8b994543c97
        let taskInfo = {
            description: e.target.description.value
        }
        let task_id = this.state.chosenTask._id;
        let task = await axios.put(`${process.env.REACT_APP_SERVER}/book/${task_id}`, taskInfo);
        await this.setState({
            taskData: task.data
        });

        this.componentDidMount();
    }



    render() {

        const { user } = this.props.auth0;
        return (
            <div>
                {/* <CalendarTask
                    // getDate={this.getDate}

                /> */}
                {/* For react-calendar */}
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                {/* For Open Add Task modal */}
                <Button variant="primary" onClick={this.showModal}>
                    Add Task
                </Button>
                {/* For Add Task modal */}
                <AddTask
                    stateOfModal={this.state.stateOfModal}
                    handleClose={this.handleClose}
                />
                {/* For render All my task */}
                {this.state.taskData.map((item, idx) => {
                    return (
                        <CardTask
                            taskData={item}
                            key={idx}
                            deleteTask={this.deleteTask}
                            getTask_ID={this.getTask_ID}
                        />
                    );
                })}

                {/* For Open Update task Info modal */}

                {
                    this.state.stateOfUpdateModal &&
                    <UpdateTaskModal
                        stateOfUpdateModal={this.state.stateOfUpdateModal}
                        handleClose={this.handleClose}
                        chosenTask={this.state.chosenTask}
                        updateTaskData={this.updateTaskData}
                    />
                }
            </div>
        );
    }
}



export default withAuth0(MyTasks);

