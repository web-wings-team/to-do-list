import React from "react";
import'./Profile.css'

// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';

// core components

class Profile extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main className="profile-page" ref="main">
         
          <section className="section">
            <Container>
              <Card className="card-profile">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-3" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            width="50%"
                            src={this.props.auth0.user.picture}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {this.props.auth0.user.name}{" "}
                    </h3>
                        <p style={{textAlign:"center" ,marginLeft:"40px",marginTop:"3px"}}> Jordan </p>
                      <p style={{textAlign:"center" ,marginLeft:"59px",marginTop:"3px"}}>{this.props.auth0.user.email}</p>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default withAuth0(Profile);