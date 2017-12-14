import React from 'react'
import {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import './Pagination.scss';

@observer
export class Pagination extends Component {
    handleChange(value){
        const { currentPage, pages, onChanged } = this.props;
        if( value <= pages && value >= 1) onChanged(value)
    }
    render() {
        const { currentPage, pages, onChanged } = this.props;
        let i = 0;
        let itens = [];
        while (++i <= pages) {
            itens.push( <li key={i}>
                            <a className={'pagination__list__item' + (currentPage == i ? ' pagination__list__item--active' : '')} onClick={ this.handleChange.bind(this,i) } aria-label={'Goto page '+i}>{i}</a>
                        </li>)
        }
        return <nav className="pagination">
                    <a className={'pagination__previous fa fa-chevron-left' + (currentPage == 1 ? ' disabled' : '') }  onClick={ this.handleChange.bind(this, currentPage - 1) }></a>
                    <ul className="pagination__list">
                        {itens}
                    </ul>
                    <a className={'pagination__next fa fa-chevron-right' + (currentPage == pages ? ' disabled' : '') } onClick={ this.handleChange.bind(this, currentPage + 1) }></a>
                </nav>
    }
}
Pagination.propTypes = {
    onChanged: PropTypes.func.isRequired,
    pages: PropTypes.number,
    currentPage: PropTypes.number
  };