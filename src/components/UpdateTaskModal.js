import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';
// import  from 'react-bootstrap/Button';

class UpdateTaskModal extends React.Component {

    render() {
        return (
            <>
                <Modal show={this.props.stateOfUpdateModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.props.updateTaskData} >
                            {/* {console.log(this.props.choseBook.title)} */}
                            <input type="text" name="description" defaultValue={this.props.chosenTask.description} />
                            <input type="submit" value="UPDATE TASK" />
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
        );
    }
}
export default UpdateTaskModal;