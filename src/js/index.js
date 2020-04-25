import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';

// import '../../node_modules/bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
import { Carousel } from'./carousel.js';
import { ItemList } from "./itemList";
$(()=>{
    console.log("index");
})
export class Content extends React.Component{
    state = {
        carouselList:[
            {id:'id1', text:'3C產品打五折',src:'http://placehold.it/900x350'},
            {id:'id2', text:'IPONE SE 開放預購中',src:'http://placehold.it/900x350'},
            {id:'id3', text:'五一勞動 免運',src:'http://placehold.it/900x350'},
        ],
        productList:[
            { 
                id:"a6d129df-f682-4f89-89a9-dda9fd215ec9",
                name:"Unbranded Wooden Computer",
                price:"768.00",
                rating:4,
                image:"http://placehold.it/700x400",
                text:"Bike connect programming"},
            {   id:"d5229070-3cb1-4ec3-9d84-ce30eeabbd7e",
                name:"Small Cotton Table",
                price:"787.00",
                rating:4,
                image:"http://placehold.it/700x400",
                text:"Faroe Islands card USB"},
            {   id:"90eb86e8-77f4-4d86-8926-1d838aab4643",
                name:"Generic Concrete Bacon",
                price:"446.00",
                rating:5,
                image:"http://placehold.it/700x400",
                text:"Handmade"}
        ]
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        return(
            <div className="col-lg-12">
                <Carousel {...this.state}/>
                <ItemList {...this.state}/>
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