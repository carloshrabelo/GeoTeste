import { observable, computed } from "mobx";
import { stores } from '../mock/data.json';

export default class ShopStore{
    @observable _shops = stores
    @observable currentPage = 1
    @observable filter = {
        name : '',
        revenue : 15000
    }
    @observable itensPerPage = 10

    doFilter = store => store.name.toUpperCase().indexOf(this.filter.name.toUpperCase()) != -1 && store.revenue >= this.filter.revenue
    setPage = page =>  this.currentPage = page

    @computed get pages() {
        return Math.ceil( this._shops.filter(this.doFilter).length / this.itensPerPage )
    }
    @computed get range(){
        return [(this.currentPage - 1) * this.itensPerPage , this.currentPage * this.itensPerPage]
    }
    
    get shops(){
        return this._shops
            .filter(this.doFilter)
            .slice( ...this.range )
    }
}
