import React from 'react';
import { Modal, Button, Form, Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateTaskModal extends React.Component {

    render() {
        return (
            <>
                <Modal show={this.props.showUpdateModal} >
                    <Modal.Header closeButton onHide={this.props.handleUpdateModal}>
                        <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateTaskData}>
                            <Form.Group as={Row} placeholder="FromGroup">
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" defaultValue="Task Title" name="updateTitle" required/>
                                </Col >
                                <br />
                                <hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" defaultValue="Task Description" name="updateDescription" required/>
                                </Col >
                                <br />
                                <hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="date" placeholder="Task Date" name="updateDate" required/>
                                </Col >
                                <br />
                                <hr />
                                <Button variant="primary" type="submit">
                                    Update Task
                                </Button>
                            </Form.Group >
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.handleUpdateModal}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default UpdateTaskModal;