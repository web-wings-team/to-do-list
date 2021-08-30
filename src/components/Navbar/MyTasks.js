import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { CountryDropdown } from 'react-country-region-selector';
import UpdateTaskModal from '../UpdateTaskModal';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import CardTask from '../CardTask';
import AddTask from '../AddTask';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Renderdtask from '../renderdate';
class MyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //For Add Task modals
            showMAddTask: false,
            ///For Update Task modals
            shoeMUpdaTetask: false,
            //For our tasks Data
            showMContry: false,
            showrenderdat: false,
            taskData: [],
            dateStr: "",
            //To Specify the task that I want to update
            chosenTaskInfo: {},
            country: '',
            countrydata: {},
            currentdate: '',
            countryapproved: false
        }
    }
    ///***********************************************************************************///
    ///**********************************************************************************///
    handeladdmodal = () => {
        this.setState({
            showMAddTask: !this.state.showMAddTask,
        })
    }
    handelupdatemodal = () => {
        this.setState({
            shoeMUpdaTetask: !this.state.shoeMUpdaTetask,
        })
    }
    handelcontrymodal = () => {
        this.setState({
            showMContry: !this.state.showMContry,
        })
    }
    handlerenderdate = () => {
        this.setState({ showrenderdat: !this.state.showrenderdat })
    }

    ///For Render My tasks depend on email + date //////
    componentDidMount = async () => {
        if (this.state.countryapproved === false || this.state.countrydata === '') {
            this.setState({
                showMContry: true,
                countryapproved: true,
            })
        }
        let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.setState({
            currentdate: date,
        })

        // http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
        const { user } = this.props.auth0;
        let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getTasks?email=${user.email}&date=${this.state.currentdate}`);
        await this.setState({
            taskData: tasks.data
        });
    }
    //**********************************************************************************///
    ///To giting country val/////
    selectCountry(val) {

        this.setState({ country: val });
    }
    //**********************************************************************************///
    ///To close the modal////////

    //**********************************************************************************///
    ///For Add new task and Re-render My tasks depend on email + date ///////////
    addTask = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        let taskDataInfo = {
            title: e.target.title.value,
            description: e.target.description.value,
            date: e.target.date.value,
            email: user.email,
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
    ///To Delete Task And and Re-render My tasks depend on email + date//////
    deleteTask = async (task_id) => {
        const { user } = this.props.auth0;
        //localhost:3001/deleteTask/61290aaf7961c8b994543c97?email=a.nazzal1995@gmail.com
        let task = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteTask/${task_id}?${user.email}`);//&date
        await this.setState({
            taskData: task.data
        });
    }
    //**********************************************************************************///
    ////// To get the Task_id: When Click on Update Button. ////////
    ////// And put the Info For specific item in chosenTask ///////
    ////// And Open Update Modal /////////////////////////////////
    getTask_ID = async (task_id) => {
        let chosenTask = this.state.taskData.find((task) => {
            return task._id === task_id;
        })
        await this.setState(
            {
                // stateOfUpdateModal: false,
                chosenTaskInfo: chosenTask,
                shoeMUpdaTetask: true
            }
        );
    }
    //**********************************************************************************///
    ///To Update Task and Re-render My tasks depend on email + date///////
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
    getdate = (e) => {
        e.preventDefault();
        let newdate = e.target.newdate.value
        this.setState({
            currentdate: newdate,
        })
        console.log("new date is => ", newdate)
    }
    //**********************************************************************************///
    ///To get the countrydata & id to send it to the api to receive needed data///////
    getcountry = async (val) => {
        let countrydata_selected = await axios.get(`https://restcountries.eu/rest/v2/name/${val}`)
        await this.setState({
            countrydata: countrydata_selected.data[0]
        })

        let countrydatainfo = {
            alph2cod: this.state.countrydata.alpha2Code,
            name: this.state.countrydata.name,
        }
        //localhost/3000/countrydata
        console.log({ countrydatainfo })
        await this.setState({
            countrydata: [],
        })
    }

    //**************************************************************************************** */
    render() {
        console.log('currentdate', this.state.currentdate)
        console.log('ffffffffff', this.state.countrydata)
        console.log(this.state.country)
        const { country } = this.state;
        return (
            <div>
                {/* ///////////////////////////////////////////////////////////////// */}
                <div>
                    <Modal show={this.state.showMContry}>
                        <Modal.Header closeButton onHide={this.handelcontrymodal}>
                            <Modal.Title>choose a country</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <CountryDropdown
                                value={country}
                                onChange={(val) => { this.selectCountry(val.split(" ")[0]); this.getcountry(val.split(" ")[0]) }} />
                        </Modal.Body>
                    </Modal>
                </div>
                {<Button variant="primary" onClick={this.handelcontrymodal}>
                    GET WETHER
                </Button>}
                {/* ///////////////////////////////////////////////////////////////// */}
                <Button variant="primary" onClick={this.handeladdmodal}>
                    Add Task
                </Button>
                {/* ///////////////////////////////////////////////////////////////// */}
                <Renderdtask getdate={this.getdate} showrenderdat={this.state.showrenderdat} handlerenderdate={this.handlerenderdate} currentdate={this.state.currentdate} />
                {/* ///////////////////////////////////////////////////////////////// */}
                <AddTask
                    showMAddTask={this.state.showMAddTask}
                    // dateStr={this.state.dateStr}
                    handeladdmodal={this.handeladdmodal}
                    addTask={this.addTask}
                />
                {/* ///////////////////////////////////////////////////////////////// */}

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
                        shoeMUpdaTetask={this.state.shoeMUpdaTetask}
                        handelupdatemodal={this.handelupdatemodal}
                        chosenTaskInfo={this.state.chosenTaskInfo}
                        updateTaskData={this.updateTaskData}
                    />
                }
            </div>
        );
    }
}

export default withAuth0(MyTasks);


