import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card'

class SliceMovie extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      movieArray: [],
    };
  }

  render() {
    return (
      <Card border="primary" style={{ width: '13rem' }}>
      <Card.Header>{this.props.title}</Card.Header>
     <Card.Img variant="top" src={this.props.src} />
     <Card.Body>
       <Card.Title>{this.props.title}</Card.Title>
       <Card.Text>
         {this.props.overview}
       </Card.Text>
     </Card.Body>
     <Card.Footer>
       <small className="text-muted">{this.props.date}</small>
     </Card.Footer>
</Card>
  
    )
  }
};

export default SliceMovie;
