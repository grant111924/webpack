import 'css/style.scss';
import 'css/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
import { Item } from './item';
export class ItemList extends React.Component{
    componentDidMount(){
        console.log("ItemList create");
    }
    componentWillUnmount(){
        console.log("destory");
    }
    render(){
        return(
            <div className="row">
                {
                    this.props.productList.map((product) => {
                        return(
                            <Item key={product.id} {...product} />
                        );
                    })
                }
            </div>
        );
    }
}