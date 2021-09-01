import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
class CardTask extends React.Component {
    colorgenerater = (min, max) => {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1
        let color = Math.floor(step2) + min;
        return color;
    }
    render() {
        const sympole = ["#8ECAE6", "#219EBC", "#B5E6FF", "#FFB703", "#FB8500", "#FFB35C", "#FFC533", "#60C7FB", "#40BEDD", "#8AC8E5"];
        return (
            <div className='cardlist' >
                {this.props.myTask.map((item, idx) => {
                    return (
                        <Card
                            key={idx}
                            style={{ width: '18rem' }}
                            className="mb-5"
                        >
                            <Card.Header
                                style={{ backgroundColor: `${sympole[this.colorgenerater(0, sympole.length - 1)]}` }}>
                                To-DO: {idx + 1}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{ height: "2em" }}> {item.title} </Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Form.Control value={item.description}
                                            as="textarea" rows={4} readOnly />
                                    </Form>
                                    <hr />
                                    Holiday: {item.holiday}
                                </Card.Text>
                                <hr />
                                <Button variant="danger" onClick={() => { this.props.deleteTask(item._id) }} > <MdDeleteForever /></Button>
                                <Button variant="primary" onClick={() => { this.props.getTask_ID(item._id) }}><FaEdit /></Button>
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