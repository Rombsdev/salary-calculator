import { createStore } from "vuex";

const store = createStore({  
  state() {
    return {
      orders_list: [],
      payment_method: {'Карта': 14.5, 'Наличные': 10, 'Безнал': 10},
      agreement: 10,
      fix: 30,
      borrowing: [],
      working_days: 0,
    };
  },

  getters: {
    get_orders: state => state.orders_list,
    get_salary: state => state.orders_list.reduce((acc, {order_cost, expenses, agreement, payment_method}) => agreement ? acc + ((order_cost - order_cost*state.payment_method[payment_method]/100) - expenses) * 0.1 : acc + ((order_cost - order_cost*state.payment_method[payment_method]/100) - expenses) * 0.3, 0) + state.working_days * 1500,
    get_working_days: state => state.working_days
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
    }

  },

  actions: {
    add_order( { commit, state }, new_order ){
      if( state.orders_list.some( order => order.id == new_order.id ) ){
        alert( `Заказ №${ new_order.id } уже добавлен!` );
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

  },

});

export default store;
