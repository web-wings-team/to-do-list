import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


class AddTask extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.showAddModal} onHide={this.props.handleAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.addTask}>
                            <Form.Group as={Row} placeholder="FromGroup">
                                <Col sm="12" >
                                    <Form.Control size="lg" type="text" placeholder="Task Title" name="title" required />
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" as="textarea" rows={3} placeholder="Task Description" name="description" required />
                                </Col >
                                <br /><hr />
                                <Col sm="12" >
                                    <Form.Control size="lg" type="date" name="date" required />
                                </Col >
                                <br /><hr />
                                <Button variant="primary" type="submit" >
                                    Add Task
                                </Button>
                            </Form.Group >
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.handleAddModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddTask;
