<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters(['get_orders']),
    },
    methods:{
        ...mapMutations(['clear_table']),
        ...mapActions(['remove_order']),       

        edit_order(){
        },

        clear_order_table(){
            this.clear_table();
        },

    },

    created(){
        // Рассмотреть событие Storage
        const a = JSON.parse(localStorage.getItem('orders_list_in_local_storage'));
        if( a instanceof Array && a.length > 0){
            this.$store.state.orders_list = a;
        }
        
        this.$store.watch(
            state => state.orders_list,
            newList => { if( newList.length > 0 ) localStorage.setItem('orders_list_in_local_storage', JSON.stringify(newList)) },
            {deep: true}
        )
    }, 
}
/* 
  № заказа
  Название устройства
  Затраты в заказе
  Цена заказа
  Согласование - bool
  Учет другого мастера
  Тип оплаты - bool
  Брал из кассы / переводом

*/
</script>

<template>
    <div class="relative overflow-x-auto sm:rounded-lg">
        <table class="mx-auto text-sm text-gray-500">
            <thead class="text-[10px] md:text-xs text-center text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-3 md:px-5 py-2 whitespace-nowrap">
                        № ({{ get_orders.length }})
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Устройство
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Цена
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Затраты
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Согласование
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Оплата
                    </th>
                    <th scope="col" class="px-3 md:px-5 py-2">
                        Действия
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in get_orders" :key="order.id" class="bg-white border-b hover:bg-gray-50">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ order.id }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ order.device }}
                    </th>
                    <td class="px-6 py-4 text-center">
                        {{ order.order_cost }}
                    </td>
                    <td class="px-6 py-4 text-center">
                        {{ order.expenses }}
                    </td>
                    <td class="px-6 py-4 text-center">
                        {{ order.agreement ? 'Да' : 'Нет' }}
                    </td>
                    <td class="px-6 py-4 text-center">
                        {{ order.payment_method }}
                    </td>

                    <td class="flex justify-center px-6 py-4 space-x-3">
                        <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <button @click="remove_order(order.id)" type="button" class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>    
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-center">
        <button @click="clear_order_table" class="mt-6 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="button">Очистить таблицу</button>
    </div>
</template>

<style scoped>

</style>
