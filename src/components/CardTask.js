import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, ListGroup } from 'react-bootstrap';
// import myTask from '../myTask.json';

class CardTask extends React.Component {


    render() {
        return (
            <div className='cardlist' >


                {this.props.myTask.map((item, idx) => {
                    return (
                        <Card key={idx} style={{ width: '40rem' }}>
                            <Card.Header>{item.title}</Card.Header>
                            <Card.Body>
                                <ListGroup >
                                    <ListGroup.Item>{item.description}</ListGroup.Item>
                                    <hr />
                                    <ListGroup.Item>Clender Event</ListGroup.Item>
                                </ListGroup>
                                <br /><br />
                                <Button variant="danger" onClick={() => { this.props.deleteTask(item._id) }} >Delete</Button>
                                <Button variant="primary" onClick={() => { this.props.getTask_ID(item._id) }}>Update</Button>
                            </Card.Body>
                        </Card>
                    )
                }
                )
                }


            </div>

        );

    }

}

export default CardTask;