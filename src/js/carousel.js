import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
// TODO  load slide into carousel
export class Carousel extends React.Component{
    componentDidMount(){
        console.log('componentDidMount',this.props);
        $('#carouselExampleIndicators').carousel({
            interval: 1000,
        });
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        return(
            <div className="carousel slide my-4" id = "carouselExampleIndicators">
                <ol className="carousel-indicators">
                    {
                        this.props.carouselList.map((item,index)=>{
                            return (<li  className={(index == 0)?"active":""}
                                data-target="#carouselExampleIndicators" key={item.id}
                                data-slide-to={index}></li>);
                        })
                    }
                    {/* <li className="active" data-target="#carouselExampleIndicators" data-slide-to="0"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                </ol>
                <div className="carousel-inner" role="listbox">
                    {
                        this.props.carouselList.map((item,index)=>{
                            console.log("carousel-item",item.src);
                            return (
                                <div className={(index == 0)?"carousel-item active":"carousel-item"}  
                                    key={item.id}>
                                    <img src={item.src}
                                        alt={item.text} className="d-block img-fluid"/>
                                </div>
                            );
                            
                        })
                    }
                    {/* <div className="carousel-item active">
                        <img src="http://placehold.it/900x350" alt="First slide" className="d-block img-fluid"/>
                    </div>
                    <div className="carousel-item ">
                        <img src="http://placehold.it/900x350" alt="Second slide" className="d-block img-fluid"/>
                    </div>
                    <div className="carousel-item ">
                        <img src="http://placehold.it/900x350" alt="Third slide" className="d-block img-fluid"/>
                    </div> */}
                </div>
                <a href="#carouselExampleIndicators" className="carousel-control-prev" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </a>
                <a href="#carouselExampleIndicators" className="carousel-control-next" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>
        );  
    }
}
