import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { CountryDropdown } from 'react-country-region-selector';
import UpdateTaskModal from '../UpdateTaskModal';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import CardTask from '../CardTask';
import AddTask from '../AddTask';
import axios from 'axios';


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
            chosenTaskInfo: {},
            country: '',
            countrydata: {},
        }
    }
    ///***********************************************************************************///
    ///**********************************************************************************///
    /////////////////////////////////////////////////////
    ///For Render My tasks depend on email + date //////
    ////////////////////////////////////////////////////
    componentDidMount = async () => {

        // await this.getDate();
        //http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
        // const { user } = this.props.auth0;
        // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getTasks?email=${user.email}&date=${this.state.dateStr}`);
        // await this.setState({
        //     taskData: tasks.data
        // });
        // this.SelectedCounty();
    }
    //**********************************************************************************///
    //////////////////////////////
    ///To giting country val/////
    ////////////////////////////
    selectCountry(val) {

        this.setState({ country: val });
    }
    //**********************************************************************************///
    //////////////////////////////
    ///To close the modal////////
    ////////////////////////////
    handleClose = () => {
        this.setState({
            stateOfModal: false,
            stateOfUpdateModal: false
        });
    };
    //**********************************************************************************///
    /////////////////////////////
    ///To Open the modal////////
    ////////////////////////////
    showModal = () => {
        this.setState({
            stateOfModal: true
        })
    };
    //**********************************************************************************///
    //////////////////////////////////////////////////////////////////////////////
    ///For Add new task and Re-render My tasks depend on email + date ///////////
    ////////////////////////////////////////////////////////////////////////////
    addTask = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        let taskDataInfo = {
            title: e.target.title.value,
            description: e.target.description.value,
            date: e.target.date.value,
            email: user.email,
            alph2cod: this.state.countrydata.alpha2Code,
            alph3cod: this.state.countrydata.alpha3Code,
            name: this.state.countrydata.name,
        }
        //http://localhost:3000/addTask?email=a.nazzal, Params
        // let task = await axios.post(`${process.env.REACT_APP_SERVER}/addTask`, taskDataInfo);
        // await this.setState({
        //     taskData: task.data
        // });
        console.log('rrrrrrrrrr', taskDataInfo);
        // this.componentDidMount();
    }
    //**********************************************************************************///
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
    }
    //**********************************************************************************///
    /////////////////////////////////////////////////////////////////
    ////// To get the Task_id: When Click on Update Button. ////////
    ////// And put the Info For specific item in chosenTask ///////
    ////// And Open Update Modal /////////////////////////////////
    /////////////////////////////////////////////////////////////
    getTask_ID = async (task_id) => {
        let chosenTask = this.state.taskData.find((task) => {
            return task._id === task_id;
        })
        await this.setState(
            {
                // stateOfUpdateModal: false,
                chosenTaskInfo: chosenTask,
                stateOfUpdateModal: true
            }
        );
    }
    //**********************************************************************************///
    ///////////////////////////////////////////////////////////////////////
    ///To Update Task and Re-render My tasks depend on email + date///////
    /////////////////////////////////////////////////////////////////////
    updateTaskData = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        //localhost:3001/task/61290aaf7961c8b994543c97 , params
        let taskInfo = {
            title: e.target.updateTitle.value,
            description: e.target.updateDescription.value,
            date: e.target.updateDate.value,
            email: user.email
        }
        // let task_id = this.state.chosenTask._id;
        // let task = await axios.put(`${process.env.REACT_APP_SERVER}/book/${task_id}`, taskInfo);
        // await this.setState({
        //     taskData: task.data
        // });
        console.log({ taskInfo });
        // this.componentDidMount();
    }
    //**********************************************************************************///
    //////////////////////////////////////////////////////////////////////////////////
    ///To get the countrydata & id to send it to the api to receive needed data///////
    //////////////////////////////////////////////////////////////////////////////////
    getcountry = async (val) => {
        let countrydata_selected = await axios.get(`https://restcountries.eu/rest/v2/name/${val}`)
        this.setState({
            countrydata: countrydata_selected.data[0]
        })
    }

    //**************************************************************************************** */
    render() {
        console.log('ffffffffff', this.state.countrydata)
        console.log(this.state.country)
        const { country } = this.state;
        return (
            <div>
                {/* ///////////////////////////////////////////////////////////////// */}
                <div>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => { this.selectCountry(val.split(" ")[0]); this.getcountry(val.split(" ")[0]) }} />
                </div>
                {/* ///////////////////////////////////////////////////////////////// */}
                <Button variant="primary" onClick={this.showModal}>
                    Add Task
                </Button>
                {/* ///////////////////////////////////////////////////////////////// */}
                <AddTask
                    stateOfModal={this.state.stateOfModal}
                    // dateStr={this.state.dateStr}
                    handleClose={this.handleClose}
                    addTask={this.addTask}
                />
                {/* ///////////////////////////////////////////////////////////////// */}
                {/* to render All my task FROM API*/}
                {
                    <CardTask
                        myTask={this.state.taskData}
                        deleteTask={this.deleteTask}
                        getTask_ID={this.getTask_ID}
                    />
                }
                {/* ///////////////////////////////////////////////////////////////// */}
                {/* For Open Update task Info modal */}
                {
                    this.state.stateOfUpdateModal &&
                    <UpdateTaskModal
                        stateOfUpdateModal={this.state.stateOfUpdateModal}
                        handleClose={this.handleClose}
                        chosenTaskInfo={this.state.chosenTaskInfo}
                        updateTaskData={this.updateTaskData}
                    />
                }
            </div>
        );
    }
}



export default withAuth0(MyTasks);


