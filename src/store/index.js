import { createStore } from "vuex";
const store = createStore({  
  state() {
    return {
      orders_list: [],
      payment_methods: {'Карта': 14.5, 'Наличные': 10, 'Безнал': 10, 'Без чека': 0, 'Смешанная': 0},
      rates: {pay_rate: 0.3, agreement_rate: 0.1},
      borrowing: [],
      working_days: 0,
    };
  },

  getters: {
    get_orders: state => state.orders_list,
    get_salary: state => +(state.orders_list.reduce((acc, { pay_per_order }) => acc += pay_per_order, 0) + state.working_days * 1500).toFixed(2),
    get_working_days: state => state.working_days,
    get_payment_methods: state => state.payment_methods,
    get_salary_per: state => filter => +(state.orders_list.filter(order => order.order_type == filter).reduce((acc, { pay_per_order }) => acc += pay_per_order, 0)).toFixed(2),
    get_rates: state => state.rates,
  },

  mutations: {
    add_order(state, order) {
      state.orders_list.push(order);
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
