import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button} from 'react-bootstrap';

class CardTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.taskData.date}</Card.Title>
                        <Card.Text>{this.props.taskData.description}</Card.Text>
                        <Button variant="primary" onClick={()=>{this.props.deleteTask(this.props.taskData._id)}}>Delete</Button>
                        <Button variant="primary" onClick={()=>{this.props.getTask_ID(this.props.taskData._id)}}>Update</Button>
                    </Card.Body>
                </Card>
            
        );
    }
}

export default CardTask;