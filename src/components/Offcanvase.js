import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Offcanvas } from 'react-bootstrap';


class Offcanvase extends React.Component {
componentDidMount(){
    console.log( this.props.movieData);
}
    render() {
        return (
            <>
                <div id="offcanvas" variant="primary" onClick={this.props.handeloffcanvasshow}>
                <span>{this.props.countryName} <img width="50px"  src={`/static/images/${this.props.weatherData.full.weather.icon}.png`} alt="logo" /> {this.props.weatherData.full.temp}℃  {this.props.weatherData.descreption}</span>
                </div>
                {/* style={{width:"350px" , backgroundColor:"black",color:"white"}} */}
                <Offcanvas  show={this.props.offcanvasshow} >
                    <Offcanvas.Header closeButton onHide={this.props.handeloffcanvasshow}>
                        <Offcanvas.Title> </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Accordion>
                           
                            { this.props.movieData.map((item,i)=>{
                                return(
                        <Accordion.Item eventKey={i}>
                        <Accordion.Header> Movie Name : {item.title}
                        <br/>In Cinema : {item.date}
                        </Accordion.Header>
                                <Accordion.Body style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",backgroundColor:"black",color:"white"}}>
                                <img  width="80%" alt={item.title} src={item.src}/>
                               <p> <br/> {item.overview}</p>
                                </Accordion.Body>
                            </Accordion.Item>)})}
                           
                        </Accordion>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }
}

export default Offcanvase;
