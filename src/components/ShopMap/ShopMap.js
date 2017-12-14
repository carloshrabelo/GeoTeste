import React from 'react'
import {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import blue from '../../img/marker-blue.png';
import red from '../../img/marker-red.png';
import L from 'leaflet';
import './ShopMap.scss';

var markerRed = new L.Icon({
    iconUrl: red
})
var markerBlue = new L.Icon({
    iconUrl: blue
})
var defaulpPosition = [-23.565972, -46.650859]

export class ShopMap extends Component {
    render() {
        const {shopStore,minimumRevenue} = this.props;
        const shops = shopStore.shops;
        const position = shops.length ? [ shops[0]['latitude'], shops[0]['longitude'] ] : position || defaulpPosition
        return  <Map center={position} zoom={10}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {shopStore.shops.map( (shop, index) =>
                        <Marker key={index} position={[shop.latitude, shop.longitude]} icon={ shop.revenue > minimumRevenue ?  markerBlue : markerRed}>
                            <Popup>
                                <span>
                                    {shop.revenue}
                                </span>
                            </Popup>
                        </Marker>
                    )}
                </Map>
    }
}
ShopMap.propTypes = {
    shopStore:PropTypes.object,
    minimumRevenue: PropTypes.number
}