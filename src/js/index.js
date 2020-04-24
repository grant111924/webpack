import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';

// import '../../node_modules/bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'

$(()=>{
    console.log("index");
})
class App extends React.Component{
    componentDidMount(){
        console.log('componentDidMount');
        $(".carousel").carousel({
            interval: 500
        });
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render () {
        return(
            <div className="carousel slide my-4" id = "carouselExampleIndicators">
                <ol className="carousel-indicators">
                    <li className="active" data-target="#carouselExampleIndicators" data-slide-to="0"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <img src="http://placehold.it/900x350" alt="First slide" className="d-block img-fluid"/>
                    </div>
                    <div className="carousel-item ">
                        <img src="http://placehold.it/900x350" alt="Second slide" className="d-block img-fluid"/>
                    </div>
                    <div className="carousel-item ">
                        <img src="http://placehold.it/900x350" alt="Third slide" className="d-block img-fluid"/>
                    </div>
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
ReactDOM.render(
    <App />,
    document.getElementById('appContent')
)