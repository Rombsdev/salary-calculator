import { createStore } from "vuex";

const payment_methods = {
  'карта': {name: 'Карта', tax: 14.5},
  'наличные': {name: 'Наличные', tax: 10},
  'безнал': {name: 'Безнал', tax: 10},
  'без чека': {name: 'Без чека', tax: 0},
  'смешанная': {name: 'Смешанная', tax: 'mix'},
}

const store = createStore({  
  state() {
    return {
      orders_list: [],
      sales_list: [],
      payment_methods: payment_methods,
      rates: {pay_rate: 0.3, agreement_rate: 0.1, day_rate: 1500},
      borrowing: [],
      working_days: 0,
    };
  },

  getters: {
    get_orders: state => state.orders_list,
    get_salary: state => +(state.orders_list.reduce((acc, { pay_per_order }) => acc += pay_per_order, 0) + state.working_days * state.rates.day_rate).toFixed(2),
    get_working_days: state => state.working_days,
    get_payment_methods: state => state.payment_methods,
    get_payment_methods_tax: state => payment_method => state.payment_methods[payment_method].tax,
    get_salary_per: state => filter => +(state.orders_list.filter(order => order.order_type == filter).reduce((acc, { pay_per_order }) => acc += pay_per_order, 0)).toFixed(2),
    get_salary_per_sales: ({ sales_list }) => sales_list.reduce((acc, { pay_per_order }) => acc += pay_per_order, 0).toFixed(2),
    get_rates: state => state.rates,
  },

  mutations: {
    add_order(state, order) {
      state.orders_list.push(order);
    },

    add_sale(state, sale) {
      state.sales_list.push(sale);
    },

    remove_order(state, id) {
      let test = state.orders_list.filter(elem => elem.id != id);
      state.orders_list = test;
      if( !test.length ){
        localStorage.removeItem('orders_list_in_local_storage');
      }else{
        localStorage.setItem('orders_list_in_local_storage', JSON.stringify(test))
      }
    },

    clear_table( state ){
      state.orders_list = [];
      localStorage.removeItem('orders_list_in_local_storage');
    },

    set_working_days( state, days ){
      state.working_days = days;
    },

    initial_store( state, days ){
      state.working_days = days;
    }

  },

  actions: {
    add_order( { commit, state }, new_order ){
      if( state.orders_list.some( order => order.id == new_order.id ) ){
        // alert( `Заказ №${ new_order.id } уже добавлен!` );
      } else{
        commit( 'add_order', new_order );
      }
    },

    add_sale( { commit, state }, new_sale ){
      if( state.sales_list.some( sale => sale.id == new_sale.id ) ){
        // alert( `Заказ №${ new_order.id } уже добавлен!` );
      } else{
        commit( 'add_sale', new_sale );
      }
    },

    remove_order( { commit }, id ){
      commit( 'remove_order', id );
    },

    edit_order( { commit } ){
      commit('edit_order');
    },
    
    initial_store( { commit } ){
      let days = JSON.parse( localStorage.getItem( "working_days_in_local_storage" ) );
      
      if( typeof days == 'number' && days > 0 ){
        commit('initial_store', days)
      }
    }
  },

});

export default store;
