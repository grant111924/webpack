import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
// TODO 做item
export class Item extends React.Component{
    componentDidMount(){
        console.log("create Item")
    }
    componentWillUnmount(){
        console.log("destory Item");
    }

    render(){
        const selectRating = this.props.rating;
        const totalRating = 5; 
        let starList = new Array();
        for(let i=0; i<totalRating; i++){
           starList.push((selectRating-1>i)?"star selected":"star")
        }
        return(
            <div className="col-lg-4 col-md-6 b-4">
                <div className="card h-100">
                    <a href="#">
                        <img src={this.props.image} alt="" className="card-img-top"/>
                    </a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{this.props.name}</a>
                        </h4>
                        <h5>${this.props.price}</h5>
                        <p className="card-text">{this.props.text}</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">
                           {starList.map((value,index) => {
                               console.log(value,index)
                               return(
                                   <div className={value} key={index}></div>
                               );
                           })}
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}