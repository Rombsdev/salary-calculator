
const from_cashbox = {  
    state() {
      return {
        orders_list: [],
        payment_method: {'Карта': 14.5, 'Наличные': 10, 'Безнал': 10},
        zp_conditions: [50, 100, 150] 
      };
    },
  
    getters: {
      get_orders: state => state.orders_list,
      get_salary: state => state.orders_list.reduce((acc, {order_cost, expenses, agreement, payment_method}) => agreement ? acc + ((order_cost - order_cost*state.payment_method[payment_method]/100) - expenses) * 0.1 : acc + ((order_cost - order_cost*state.payment_method[payment_method]/100) - expenses) * 0.3, 0),
      
  },
  
    mutations: {
      add_order(state, order) {
        state.orders_list.push(order);
        let accessory_cost = 0;      
        let zp_for_accessory = accessory_cost >= 500 ? 100 : 50;
      },
  
      remove_order(state, id) {
        state.orders_list = state.orders_list.filter(elem => elem.id != id);
      },
  
      clear_table( {orders_list} ){
        orders_list.length = 0;
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
      }    
    },
  
  };
  
  export default from_cashbox;
  