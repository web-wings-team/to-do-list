import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import UpdateTaskModal from '../UpdateTaskModal';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import CardTask from '../CardTask';
import AddTask from '../AddTask';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

// import Renderdtask from '../renderdate';
import DatePicker from '../../DatePicker';

import Offcanvase from '../Offcanvase';
import { GoDiffAdded } from "react-icons/go";

class MyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //For Add Task modals

            showAddModal: false,
            ///For Update Task modals
            showUpdateModal: false,
            //For our tasks Data
            showMContry: false,
            offcanvasshow: false,
            taskData: [],
            dateStr: "",
            //To Specify the task that I want to update
            chosenTaskInfo: {},
            country: '',
            region: '',
            countrydata: '',
            currentdate: '',
            countryapproved: false
        }
    }
    ///***********************************************************************************///
    ///**********************************************************************************///

    handleAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal,
        })
    }

    handleUpdateModal = () => {
        this.setState({
            showUpdateModal: !this.state.showUpdateModal,
        })
    }
    handelcontrymodal = () => {
        this.setState({
            showMContry: !this.state.showMContry,
        })
    }

    handeloffcanvasshow = () => {
        this.setState({
            offcanvasshow: !this.state.offcanvasshow,
        })
    }
    ///For Render My tasks depend on email + date //////
    componentDidMount = async () => {
        if (this.state.countryapproved === false && this.state.countrydata === '') {
            this.setState({
                showMContry: true,
                countryapproved: true,
            })
        }
        // let today = new Date(),
        //     date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // this.setState({
        //     currentdate: date,
        // })

        // http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
        // const { user } = this.props.auth0;
        this.getCurrentDate().then(() => {
            this.getTasks();
        });

        // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getTasks?email=${user.email}&date=${this.state.currentdate}`);
        // await this.setState({
        //     taskData: tasks.data
        // });
    }
    //**********************************************************************************///
    ///To giting country val/////
    selectCountry(val) {

        this.setState({ country: val });
    }
    //**********************************************************************************///
    ///To close the modal////////
    selectRegion(val) {
        this.setState({ region: val });
    }
    //**********************************************************************************///
    ///For Add new task and Re-render My tasks depend on email + date ///////////
    addTask = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        let taskDataInfo = {
            title: e.target.title.value,
            description: e.target.description.value,
            date: e.target.date.value,
            email: user.email
        }
        // http://localhost:3000/addSlice?email=a.nazzal, Params
        let task = await axios.post(`${process.env.REACT_APP_SERVER}/addSlice`, taskDataInfo);
        await this.setState({
            taskData: task.data,
            currentdate:taskDataInfo.date
        });

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
        await this.setState(
            {
                showUpdateModal: false,
            }
        );

        let chosenTask = this.state.taskData.find((task) => {
                return task._id === task_id;
            })

        await this.setState(
                {
                    chosenTaskInfo: chosenTask,
                    showUpdateModal: true
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
    //**********************************************************************************///
    ///To get the countrydata & id to send it to the api to receive needed data///////
    getcountry = async (val) => {
        //localhost/3000/countrydata
        let countrydata_selected = await axios.get(`https://restcountries.eu/rest/v2/name/${val}`)
        await this.setState({
            countrydata: countrydata_selected.data[0]
        })

        let countrydatainfo = {
            alph2cod: this.state.countrydata.alpha2Code,
            name: this.state.countrydata.name,
        }
        
        console.log({ countrydatainfo })
    }
    getCurrentDate = async () => {
        console.log("INSIDEL getCurrentDate");
        //2021-8-30
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        await this.setState({
            currentdate: today
        })
    }

    getDate = async (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        let date2 = yyyy + '-' + mm + '-' + dd;
        console.log("date date" + date2);
        await this.setState({
            currentdate: date2
        });
        this.getTasks();
    }
    getTasks = async () => {
        const { user } = this.props.auth0;
        // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=2021-01-20`);
        let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=${this.state.currentdate}`);
        await this.setState({
            taskData: tasks.data
        });
    }
    // dateState=(value)=> {
    //     this.setState({
    //         currentdate:value
    //     })

    // }



    //**************************************************************************************** */
    render() {
        console.log('currentdate', this.state.currentdate)
        console.log('ffffffffff', this.state.countrydata)
        console.log(this.state.country)
        console.log(this.state.region)
        const { country, region } = this.state;
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
                            <RegionDropdown
                                country={country}
                                value={region}
                                onChange={(val) => this.selectRegion(val)} />

                        </Modal.Body>
                        <Button variant="primary" onClick={this.handelcontrymodal}>
                            Close
                        </Button>
                    </Modal>
                </div>

                {/* ///////////////////////////////////////////////////////////////// */}
                <Button variant="primary" onClick={this.handleAddModal}>
                    <GoDiffAdded />  ADD Task
                </Button>
                {/* ///////////////////////////////////////////////////////////////// */}
                < DatePicker
                    getDate={this.getDate}
                    dateState={this.dateState}
                    // dateUpdated={this.state.currentdate}
                />
                {/* ///////////////////////////////////////////////////////////////// */}
                <AddTask
                    showAddModal={this.state.showAddModal}
                    // dateStr={this.state.dateStr}
                    handleAddModal={this.handleAddModal}
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
                    <UpdateTaskModal
                        showUpdateModal={this.state.showUpdateModal}
                        handleUpdateModal={this.handleUpdateModal}
                        chosenTaskInfo={this.state.chosenTaskInfo}
                        updateTaskData={this.updateTaskData}
                    />
                }
                {<Offcanvase handelcontrymodal={this.handelcontrymodal} handeloffcanvasshow={this.handeloffcanvasshow} offcanvasshow={this.state.offcanvasshow} />}
            </div>
        );
    }
}

export default withAuth0(MyTasks);


