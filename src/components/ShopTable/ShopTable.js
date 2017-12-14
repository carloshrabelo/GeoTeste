import React from 'react'
import {Component} from 'react';
import {observer} from 'mobx-react';
import './ShopTable.scss';

function Row(props) {
    const { name, revenue} = props
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.revenue}</td>
        </tr>
    )
}

@observer
export class ShopTable extends Component {
    render() {
        return  <table className="table">
                    <thead>
                    <tr>
                        <th>Loja</th>
                        <th>Faturamento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.shopStore.shops.map( (shop, index) =>
                        <Row key={index} name={shop.name} revenue={shop.revenue}></Row>
                    )}
                    </tbody>
                </table>
    }
}