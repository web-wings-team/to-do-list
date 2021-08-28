import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

class AddTask extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.stateOfModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.props.addBook} >
                            <input type="text" name="date" />
                            <input type="text" name="description" />
                            <input type="submit" value="ADD TASK" />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.props.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddTask;
