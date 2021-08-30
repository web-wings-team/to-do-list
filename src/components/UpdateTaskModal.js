import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import  from 'react-bootstrap/Button';
import { Modal, Button, Form, Row,Col } from 'react-bootstrap';

class UpdateTaskModal extends React.Component {

    render() {
        return (
            <>
                <Modal show={this.props.showUpdateModal} onHide={this.props.handelUpdateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateTaskData}>
                            <Form.Group as={Row} placeholder="FromGroup">
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" defaultValue="Task Title" name="updateTitle" required/>
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" defaultValue="Task Description" name="updateDescription" required/>
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="date" placeholder="Task Date" name="updateDate" required/>
                                </Col >
                                <br /><hr />
                                <Button variant="primary" type="submit">
                                    Update Task
                                </Button>
                            </Form.Group >
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.handelUpdateModal}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default UpdateTaskModal;