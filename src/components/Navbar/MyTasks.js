import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { CountryDropdown } from 'react-country-region-selector';
import UpdateTaskModal from '../UpdateTaskModal';
import { withAuth0 } from '@auth0/auth0-react';
import React, { Component } from 'react';
import CardTask from '../CardTask';
import AddTask from '../AddTask';
import axios from 'axios';
import Renderdtask from '../renderdate';
import{Modal,Button,Form } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import countryData from "./countryData.json";

class MyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMAddTask: false,
            shoeMUpdaTetask: false,
            showMContry: false,
            showrenderdat: false,
            taskData: [],
            renderData: countryData ,
            dateStr: "",
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
        await this.setState({
            currentdate: date,
        })

        // http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
        // localhost:3001/getSlice?email=a.nazzal&date=2021-8-30
        const { user } = this.props.auth0;
        // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=2021-01-20`);
        let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=${this.state.currentdate}`);
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
        console.log(taskDataInfo.date);
        //http://localhost:3000/addTask?email=a.nazzal, Params
        // localhost:3001/addSlice,{ }...

        let task = await axios.post(`${process.env.REACT_APP_SERVER}/addSlice`, taskDataInfo);
        await this.setState({
            taskData: task.data
        });
        // console.log('rrrrrrrrrr', taskDataInfo);
        // this.state
        // console.log();
        this.componentDidMount();
    }
    //**********************************************************************************///
    ///To Delete Task And and Re-render My tasks depend on email + date//////
    deleteTask = async (task_id) => {
        const { user } = this.props.auth0;
        //localhost:3001/deleteTask/61290aaf7961c8b994543c97?email=a.nazzal1995@gmail.com
        // localhost:3001/deletSlice/:sliceId?email=a.nzzal&date=currentdate
        let task = await axios.delete(`${process.env.REACT_APP_SERVER}/deletSlice/${task_id}?email=${user.email}&date=${this.state.currentdate}`);//&date
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
        // console.log({ taskInfo });
        // this.componentDidMount();
    }
    getdate = (e) => {
        e.preventDefault();
        let newdate = e.target.newdate.value
        this.setState({
            currentdate: newdate,
        })
        // console.log("new date is => ", newdate);
        this.componentDidMount();
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
        // console.log({ countrydatainfo })
        await this.setState({
            countrydata: [],
        })
    }

    //**************************************************************************************** */
    render() {
        // console.log('currentdate', this.state.currentdate)
        // console.log('ffffffffff', this.state.countrydata)
        // console.log(this.state.country)
        const { country } = this.state;
        return (
            <div>
                {/* ///////////////////////////////////////////////////////////////// */}
                <div >

<Modal show={this.state.showMContry} style={{marginTop:'6%'}} >
            <Modal.Header closeButton>
              <Modal.Title>Add Your Country</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.addBook}  >
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="enter your email"
                    value={this.props.auth0.user.email}
                    // defaultValue={this.props.auth0.user.email}
                    id="email"
                    readOnly
                  />
                </Form.Group>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option selected>Search:</option>
  {this.state.renderData.map((item)=>{
     return(
        <>

    <option  value={item.value} >{item.name}, {item.code}</option> 
    </>

     )
  })}
 
</select>

<select class="form-select form-select-sm" aria-label=".form-select-sm example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit"  variant="primary"> Confirm </Button>
              </Modal.Footer>
            </Form>
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
                <Renderdtask
                    getdate={this.getdate}
                    showrenderdat={this.state.showrenderdat}
                    handlerenderdate={this.handlerenderdate}
                    currentdate={this.state.currentdate} />
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


