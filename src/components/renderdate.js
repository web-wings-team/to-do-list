import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

class Renderdtask extends React.Component {


    render() {
        console.log('rrrrrrrr',this.props);

        // console.log('rrrrrrrr',this.props.currentDate)
        return (
            <>
                <div>
                    <Modal show={this.props.showrenderdat} onHide={this.props.handlerenderdate}>
                        <Modal.Header closeButton>
                            <Modal.Title>Tasks Date</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.props.getdate}>
                                <Form.Group as={Row} placeholder="FromGroup">
                                    <Col sm="12" >
                                        <Form.Control size="lg" type="date" name="newdate" required />
                                    </Col >
                                    <br /><hr />
                                    <Button onClick={this.props.handlerenderdate} variant="primary" type="submit" >
                                        Let's Go
                                    </Button>
                                </Form.Group >
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.handlerenderdate} variant="primary" >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div>
                    <Button onClick={this.props.handlerenderdate}  variant="outline-warning" >
                     Date: {this.props.currentdate}
                    </Button>
                </div>
            </>
        );
    }

}

export default Renderdtask;