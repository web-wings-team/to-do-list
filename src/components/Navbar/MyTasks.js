import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import UpdateTaskModal from "../UpdateTaskModal";
import SliceMovie from "../SliceMovie";
import { withAuth0 } from "@auth0/auth0-react";
import "./MyTasks.css";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import CardTask from "../CardTask";
import AddTask from "../AddTask";
import axios from "axios";
import { Modal, Form  } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


// import Renderdtask from '../renderdate';
import DatePicker from "../../DatePicker";
import countryData from "./countryData.json";
import { GoDiffAdded } from "react-icons/go";

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      movieShow: false,
      showAddModal: false,
      showUpdateModal: false,
      showMContry: false,
      offcanvasshow: false,
      taskData: [],
      dateStr: "",
      chosenTaskInfo: {},
      country: "",
      region: "",
      currentdate: "",
      countrydata: "",
      userInf: [],
    };
  }
  ///***********************************************************************************///
  ///**********************************************************************************///

  handleAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal,
    });
  };

  handleUpdateModal = () => {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
    });
  };
  handelcontrymodal = () => {
    this.setState({
      showMContry: false,
    });
  };

  handeloffcanvasshow = () => {
    this.setState({
      offcanvasshow: !this.state.offcanvasshow,
    });
  };
  ///For Render My tasks depend on email + date //////
  componentDidMount = async () => {
    let userConutryInDb = await axios.get(
      `${process.env.REACT_APP_SERVER}/getContry?email=${this.props.auth0.user.email}`
    );
    console.log(userConutryInDb.data);
    await this.setState({
      userInf: userConutryInDb.data,
    });

    if (this.state.userInf.length === 0) {
      this.setState({
        showMContry: true,
      });
    }
    let movieDataN = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies?cityCode=${this.state.userInf[0].countryCode}`
      );
      console.log("movies", movieDataN.data);
      await this.setState({
        movieData: movieDataN.data,
        movieShow: true,
      });
    // http://localhost:3000/getTasks?email=a.nazzal&date=Aug-28-2021
    this.getCurrentDate().then(() => {
      this.getTasks();
    });
  };
  //**********************************************************************************///
  ///To giting country val/////
  selectCountry = async (val) => {
    await this.setState({ country: val });
  };
  //**********************************************************************************///
  ///To close the modal////////
  selectRegion(val) {
    this.setState({ region: val });
  }
  // ***************************************************************************************
  addCountry = async (e) => {
    e.preventDefault();

    let countryData = {
      countryName: e.target.select1.value.split(",")[0],
      countryCode: e.target.select1.value.split(",")[1],
      userName: e.target.name.value,
      email: this.props.auth0.user.email,
    };
    this.handelcontrymodal();
    // `http://localhost:3000/addContry?email=a.nazzal`,countryData
    let userInf = await axios.post(
      `${process.env.REACT_APP_SERVER}/addContry?email=${this.props.auth0.user.email}`,
      countryData
    );
    console.log(userInf);
    await this.setState({
      userInf: userInf.data,
    });
    let movieDataN = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies?cityCode=${this.state.userInf[0].countryCode}`
      );
      console.log("movies", movieDataN.data);
      await this.setState({
        movieData: movieDataN.data,
        movieShow: true,
      });

    // console.log('rrrrrrrrrr', taskDataInfo);
    // this.componentDidMount();
  };
  //**********************************************************************************///
  ///For Add new task and Re-render My tasks depend on email + date ///////////
  addTask = async (e) => {
    e.preventDefault();
    let movieDataN = await axios.get(
      `${process.env.REACT_APP_SERVER}/movies?cityCode=${this.state.userInf[0].countryCode}`
    );
    console.log("movies", movieDataN.data);
    await this.setState({
      movieData: movieDataN.data,
      movieShow: true,
    });

    console.log("movieshaArray", this.state.movieData);

    // ${process.env.REACT_APP_SERVER}/event?contryCode=${this.state.userInf[0].countryCode}&date=${e.target.date.value}
    let holidayData = await axios.get(
      `${process.env.REACT_APP_SERVER}/event?contryCode=${this.state.userInf[0].countryCode}&date=${e.target.date.value}`
    );
    console.log(holidayData.data[0].nameOfEvent);

    const { user } = this.props.auth0;
    let taskDataInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      date: e.target.date.value,
      email: user.email,
      holiday: holidayData.data[0].nameOfEvent,
    };
    // http://localhost:3000/addSlice?email=a.nazzal,obj
    let task = await axios.post(
      `${process.env.REACT_APP_SERVER}/addSlice`,
      taskDataInfo
    );
    await this.setState({
      taskData: task.data,
    });
  };
  //**********************************************************************************///
  ///To Delete Task And and Re-render My tasks depend on email + date//////
  deleteTask = async (task_id) => {
    const { user } = this.props.auth0;
    //localhost:3001/deleteTask/61290aaf7961c8b994543c97?email=a.nazzal1995@gmail.com
    let task = await axios.delete(
      `${process.env.REACT_APP_SERVER}/deletSlice/${task_id}?email=${user.email}&date=${this.state.currentdate}`
    ); //&date
    await this.setState({
      taskData: task.data,
    });
  };
  //**********************************************************************************///
  ////// To get the Task_id: When Click on Update Button. ////////
  ////// And put the Info For specific item in chosenTask ///////
  ////// And Open Update Modal /////////////////////////////////
  getTask_ID = async (task_id) => {
    await this.setState({
      showUpdateModal: false,
    });

    let chosenTask = this.state.taskData.find((task) => {
      return task._id === task_id;
    });

    await this.setState({
      chosenTaskInfo: chosenTask,
      showUpdateModal: true,
    });
  };
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
      email: user.email,
    };
    let task_id = this.state.chosenTaskInfo._id;
    let task = await axios.put(
      `${process.env.REACT_APP_SERVER}/updateSlice/${task_id}`,
      taskInfo
    );
    await this.setState({
      taskData: task.data,
      showUpdateModal: false,
    });

    console.log({ taskInfo });
    // this.componentDidMount();
  };
  //**********************************************************************************///
  getCurrentDate = async () => {
    console.log("INSIDEL getCurrentDate");
    //2021-8-30
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    await this.setState({
      currentdate: today,
    });
  };

  getDate = async (date) => {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();

    let date2 = yyyy + "-" + mm + "-" + dd;
    console.log("date date" + date2);
    await this.setState({
      currentdate: date2,
    });
    this.getTasks();
  };
  getTasks = async () => {
    const { user } = this.props.auth0;
    // let tasks = await axios.get(`${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=2021-01-20`);
    let tasks = await axios.get(
      `${process.env.REACT_APP_SERVER}/getSlice?email=${user.email}&date=${this.state.currentdate}`
    );
    await this.setState({
      taskData: tasks.data,
    });
  };

  //**************************************************************************************** */
  render() {
    console.log("currentdate", this.state.currentdate);
    return (
      <div>
        {/* ///////////////////////////////////////////////////////////////// */}
        <div>
          <Modal show={this.state.showMContry}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.addCountry}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email address (the sign in email by default)
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
                <Form.Group className="mb-3">
                  <Form.Label>user name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter your name"
                    id="name"
                    required
                  />
                </Form.Group>
                <Form.Label>select country</Form.Label>
                <Form.Select
                  id="select1"
                  aria-label="Default select example"
                  required
                >
                  {countryData.map((item, i) => {
                    return (
                      <>
                        <option key={i} value={`${item.name},${item.code}`}>
                          {" "}
                          {item.name}, {item.code}
                        </option>
                      </>
                    );
                  })}
                </Form.Select>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary">
                  {" "}
                  Add{" "}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>

        {/* ///////////////////////////////////////////////////////////////// */}
        <Button variant="primary" onClick={this.handleAddModal}>
          <GoDiffAdded /> ADD Task
        </Button>
        {/* ///////////////////////////////////////////////////////////////// */}
        <DatePicker
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
        
        <div id="main" style={{ width: '100%', alignContent: "space-evenly" }}>
        {this.state.movieShow && this.state.movieData.map((item,i)=>{

            return(
            
            <SliceMovie
            className="sliceMovie"
            title={item.title}
            key={i}
            src={item.src}
            date={item.date}
            overview={item.overview}
          />
          )    
        })

        }
      </div>
      </div>

    );
  }
}

export default withAuth0(MyTasks);
