import React from 'react'
import {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import './ShopMap.scss';


var markerRed = new L.Icon({
    iconUrl: './img/marker-blue.png',
    iconSize:[32, 32]
})
var markerBlue = new L.Icon({
    iconUrl: './img/marker-red.png',
    iconSize:[32, 32]
})

export class ShopMap extends Component {
    render() {
        const {shopStore,minimumRevenue} = this.props;
        const shops = shopStore.shops;
        const position = shops.length ? [ shops[0]['latitude'], shops[0]['longitude']] : position || [-23.565972, -46.650859]
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