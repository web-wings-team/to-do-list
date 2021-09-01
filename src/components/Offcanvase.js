import React from "react";
import moviLLss from "./moviLL.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Offcanvas } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";

class Offcanvase extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      movieArray: [],
    };
  }

  render() {
    return (
      <>
        <div
          style={{
            color: "red",
            border: "1px solid red",
            display: "inline-block",
            width: "20ch",
            height: "18ch",
          }}
          variant="primary"
          onClick={this.props.handeloffcanvasshow}
        >
          Weather and Movies
        {this.props.moooShow &&  <span
          style={{
            color: "black",
            border: "1px solid black",
            display: "inline-block",
            width: "16ch",
            height: "3ch",
            textAlign: "center",
          }}
          onClick={this.props.handleUpdateCountry}
        >
          {" "}
          User Info <AiFillSetting />
        </span>}
        <div>
        {this.props.moooShow && this.props.movieData.map((item, i) => {
          return (
              <>
              <Offcanvas show={this.props.offcanvasshow}>
                <Offcanvas.Header
                  closeButton
                  onHide={this.props.handeloffcanvasshow}
                >
                  <Offcanvas.Title>setting</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body key={i}>
                  <Accordion>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{item.title}</Accordion.Header>
                      <Accordion.Title>{item.date}</Accordion.Title>
                      <Accordion.Body>
                        <img
                          src={item.src}
                          class="img-fluid"
                          alt={item.title}
                          style={{ width: "40ch", height: "35ch" }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Offcanvas.Body>
              </Offcanvas>
              </>
          );
        })}
        
        </div>
        </div>

     </>

    );
  }
}

export default Offcanvase;
