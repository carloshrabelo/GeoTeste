import React from 'react';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.css';
import 'normalize.css/normalize.css';
import './App.scss';
import { ShopTable } from './components';
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
    shopStore.minimumRevenue = event.target.value
  }

  render() {
    return (
      <div id="app">
        <header>
          <h1>Desempenho das Lojas</h1>
        </header>
        <main>
          <div className="columns content-end">
            <section style={{background: '#f0f'}} className="column">
              <div className="has-icons-right">
                <input type="search" placeholder="Pesquisa" value={shopStore.filter} onChange={this.handleFilterByName.bind(this)} />
                <span className="icon is-small is-right">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </section>
            <section style={{background: '#00f'}} className="column">
              <label htmlFor="faturamento"> Faturamento mínimo esperado</label>
              <input id="faturamento" type="number" placeholder="Pesquisa" value={shopStore.minimumRevenue} onChange={this.handleMinimumRevenue.bind(this)} />
            </section>
          </div>
          <div className="columns">
            <section style={{background: '#f00', minHeight: '250px'}} className="column">
              <ShopTable shopStore={shopStore} minimumRevenue={shopStore.minimumRevenue} />
            </section>
            <section style={{background: '#0ff'}} className="column">
            </section>
          </div>
          <div className="columns">
            <section style={{background: '#f0f'}} className="column text-center">
              <Pagination onChanged={ shopStore.setPage } pages={ shopStore.pages } currentPage={shopStore.currentPage }/>
            </section>
            <section style={{background: '#00f'}} className="column">
            </section>   
          </div>
        </main>
      </div>);
  }
}
