import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal,Button } from 'react-bootstrap';

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
                <Modal show={this.props.showrenderdat} onHide={this.props.handlerenderdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tasks Date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                            {
                                // this.props.getDate(this.state.date)
                                // this.getDates()


                                // console.log(this.getDate())
                                // console.log(JSON.stringify(this.state.date).split(" "))String(this.state.date).split(" ")
                                // console.log(String(this.state.date).split(" "))

                                // console.log(this.state.date)

                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handlerenderdate} variant="primary" >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {console.log(this.getDates())}
            </div>
        );
    }
}
export default CalendarTask;


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

// class Renderdtask extends React.Component {


//     render() {
//         // console.log('rrrrrrrr',this.props);

//         // console.log('rrrrrrrr',this.props.currentDate)
//         return (
//             <>
                // <div>
                //     <Modal show={this.props.showrenderdat} onHide={this.props.handlerenderdate}>
                //         <Modal.Header closeButton>
                //             <Modal.Title>Tasks Date</Modal.Title>
                //         </Modal.Header>
                //         <Modal.Body>
                //             <Form onSubmit={this.props.getdate}>
                //                 <Form.Group as={Row} placeholder="FromGroup">
                //                     <Col sm="12" >
                //                         <Form.Control size="lg" type="date" name="newdate" required />
                //                     </Col >
                //                     <br /><hr />
                //                     <Button onClick={this.props.handlerenderdate} variant="primary" type="submit" >
                //                         Let's Go
                //                     </Button>
                //                 </Form.Group >
                //             </Form>
                //         </Modal.Body>
                //         <Modal.Footer>
                //             <Button onClick={this.props.handlerenderdate} variant="primary" >
                //                 Close
                //             </Button>
                //         </Modal.Footer>
                //     </Modal>
                // </div>
//                 <div>
//                     <Button onClick={this.props.handlerenderdate}  variant="outline-warning" >
//                      Date: {this.props.currentdate}
//                     </Button>
//                 </div>
//             </>
//         );
//     }

// }

// export default Renderdtask;