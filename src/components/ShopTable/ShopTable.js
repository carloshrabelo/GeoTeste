import React from 'react'
import {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import './ShopTable.scss';

export class Row extends Component {
    render() {
        const { name, revenue, minimumRevenue} = this.props
        return (
            <tr>
                <td>{name}</td>
                <td className={ minimumRevenue > revenue ? 'text-error' : ''}>{revenue}</td>
            </tr>
        )
    }
}

@observer
export class ShopTable extends Component {
    render() {
        const { minimumRevenue, shopStore } = this.props
        return  <table className="table">
                    <thead>
                    <tr>
                        <th>Loja</th>
                        <th>Faturamento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shopStore.shops.map( (shop, index) =>
                        <Row key={index} name={shop.name} revenue={shop.revenue} minimumRevenue={minimumRevenue}></Row>
                    )}
                    </tbody>
                </table>
    }
}
ShopTable.propTypes = {
    shopStore:PropTypes.object,
    minimumRevenue: PropTypes.number
}