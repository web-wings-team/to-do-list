import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Row,Col } from 'react-bootstrap';

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

class AddTask extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.stateOfModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.addTask}>
                            <Form.Group as={Row} placeholder="FromGroup">
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" placeholder="Task Title" name="title" required/>
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" placeholder="Task Description" name="description" required/>
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="date" placeholder="Task Date" name="date" required />
                                </Col >
                                <br /><hr />
                                <Button variant="primary" type="submit" onClick={this.props.handleClose} >
                                    Add Task
                                </Button>
                            </Form.Group >
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddTask;
