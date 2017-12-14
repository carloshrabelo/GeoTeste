import React from 'react';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'lato-webfont/lato.min.css';
import 'leaflet/dist/leaflet.css';
import './styles/main.scss';
import './App.scss';
import { ShopTable, ShopMap } from './components';
import { Pagination } from './common';
import {observer} from 'mobx-react';

import ShopStore from './stores/ShopStore';
let shopStore = new ShopStore();

@observer
export default class App extends React.Component {

  handleFilterByName(event) {
    shopStore.filter = event.target.value
  }
  handleMinimumRevenue(event){
    let number = event.target.value
    if(!isNaN(number))
    shopStore.minimumRevenue = number
  }

  render() {
    return (
      <div id="app">
        <header>
          <h1>Desempenho das Lojas</h1>
        </header>
        <main>
          <div className="columns content-end">
            <section className="column">
              <div className="has-icons-right">
                <input type="search" placeholder="Pesquisa" value={shopStore.filter} onChange={this.handleFilterByName.bind(this)} />
                <span className="icon is-small is-right">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </section>
            <section className="column">
              <label htmlFor="faturamento"> Faturamento mínimo esperado</label>
              <input id="faturamento" className="text-right" type="number" placeholder="Pesquisa" value={shopStore.minimumRevenue} onChange={this.handleMinimumRevenue.bind(this)} />
            </section>
          </div>
          <div className="columns">
            <section className="column squad">
              <ShopTable shopStore={shopStore} minimumRevenue={shopStore.minimumRevenue} />
            </section>
            <section className="column squad">
              <ShopMap shopStore={shopStore} minimumRevenue={shopStore.minimumRevenue} />
            </section>
          </div>
          <div className="columns">
            <section className="column text-center">
              <Pagination onChanged={ shopStore.setPage } pages={ shopStore.pages } currentPage={shopStore.currentPage }/>
            </section>
            <section className="column">
            </section>   
          </div>
        </main>
      </div>);
  }
}
