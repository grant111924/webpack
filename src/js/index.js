import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';

// import '../../node_modules/bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
import {Carousel} from'./carousel.js';

$(()=>{
    console.log("index");
})
export class Content extends React.Component{
    state = {
        carouselList:[
            {id:'id1', text:'3C產品打五折',src:'http://placehold.it/900x350'},
            {id:'id2', text:'IPONE SE 開放預購中',src:'http://placehold.it/900x350'},
            {id:'id3', text:'五一勞動 免運',src:'http://placehold.it/900x350'},
        ]
    }
    componentDidMount(){
        console.log('componentDidMount');
        // $(".carousel").carousel({
        //     interval: 500
        // });
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        return(
            <div className="col-lg-12">
                <Carousel {...this.state}/>
            </div>
        );
    } 
}

ReactDOM.render(
    <div className="row">
        <Content />
    </div>,
    document.getElementById('app')
);