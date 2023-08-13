<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            show_view_options: false,
            view_options: {
                id: true,
                device: true,
                expenses: true,
                agreement: true,
                payment_method: true,
                order_cost: true,
                salary: true,
                zo: 0.5
            },
        };
    },
    computed: {
        ...mapGetters(["get_orders"]),
    },
    methods: {
        ...mapMutations(["clear_table"]),
        ...mapActions(["remove_order"]),

        edit_order() {},

        clear_order_table() {
            this.clear_table();
        },
    },

    created() {
        // Рассмотреть событие Storage
        const a = JSON.parse(
            localStorage.getItem("orders_list_in_local_storage")
        );
        if (a instanceof Array && a.length > 0) {
            this.$store.state.orders_list = a;
        }

        this.$store.watch(
            (state) => state.orders_list,
            (newList) => {
                if (newList.length > 0){
                    localStorage.setItem("orders_list_in_local_storage", JSON.stringify(newList));
                }
            },
            { deep: true }
        );

        const view_options = JSON.parse(
            localStorage.getItem("view_options_table_in_local_storage")
        );
        if( view_options ){
            this.view_options = view_options
        }

        this.$watch('view_options', new_options => {
            localStorage.setItem('view_options_table_in_local_storage', JSON.stringify(new_options))
        }, {deep: true} )
        
    },
};
</script>

<template>
    <div class="flex items-center justify-between mb-4 max-w-3xl mx-auto">
        <span class="text-xl font-bold mr-2">Таблица заказов</span>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" @change="show_view_options = !show_view_options">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600"></div>
            <img src="@/assets/gear_icon.svg" alt="" class="w-5 h-5 peer-checked:translate-x-full absolute top-0.5 left-[2px] bg-white rounded-full duration-200"/>
        </label>
    </div>
    <div class="sm:rounded-lg max-w-3xl mx-auto">
        <transition name="toggle">
            <div v-show="show_view_options" class="view_options overflow-hidden max-h-[130px] mb-4">
                    <div
                        class="test grid gap-y-3 gap-x-2 px-4 py-4 border border-gray-200 rounded-lg" 
                    >
                        <div class="">
                            <input
                                v-model="view_options.device"
                                id="view-device"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="view-device"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >Устройство</label
                            >
                        </div>
                        <div class="">
                            <input
                                v-model="view_options.order_cost"
                                id="order-cost"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="order-cost"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >Цена</label
                            >
                        </div>
                        <div class="">
                            <input
                                v-model="view_options.expenses"
                                id="view-expenses"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="view-expenses"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >Затраты</label
                            >
                        </div>
                        <div class="">
                            <input
                                v-model="view_options.agreement"
                                id="view-agreement"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="view-agreement"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >Согласование</label
                            >
                        </div>
                        <div class="">
                            <input
                                v-model="view_options.payment_method"
                                id="view-payment-method"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="view-payment-method"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >Оплата</label
                            >
                        </div>
                        <div class="">
                            <input
                                v-model="view_options.salary"
                                id="view-salary"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                                for="view-salary"
                                class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                                >в ЗП</label
                            >
                        </div>
                    </div>
            </div>
        </transition>
        <div class="table-wrapper relative overflow-auto max-h-[500px]">
            <table class="order-tab mx-auto w-full md:w-auto text-sm text-gray-500 text-center">
                <thead
                    class="text-[10px] md:text-xs text-gray-700 uppercase bg-gray-50"
                >
                    <tr>
                        <th scope="col" class="px-3 md:px-5 py-2 whitespace-nowrap">
                            № ({{ get_orders.length }})
                        </th>
                        <th
                            v-if="view_options.device"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            Устройство
                        </th>
                        <th
                            v-if="view_options.order_cost"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            Цена
                        </th>
                        <th
                            v-if="view_options.expenses"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            Затраты
                        </th>
                        <th
                            v-if="view_options.agreement"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            Согласование
                        </th>
                        <th
                            v-if="view_options.payment_method"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            Оплата
                        </th>
                        <th
                            v-if="view_options.salary"
                            scope="col"
                            class="px-3 md:px-5 py-2"
                        >
                            в ЗП
                        </th>
                        <th scope="col" class="px-3 md:px-5 py-2">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <transition-group name="tr-order">                    
                    <tr
                        v-for="order in get_orders"
                        :key="order.id"
                        class="bg-white border-b hover:bg-gray-50"
                    >
                        <td
                            scope="row"
                            class="px-2 py-4 md:px-3  font-medium text-gray-900 whitespace-nowrap"
                        >
                            {{ order.id }}
                        </td>
                        <td
                            v-if="view_options.device"
                            scope="row"
                            class="px-3 py-4 md:px-6 font-medium text-gray-900 text-left"
                        >
                           <div class="truncate hover:whitespace-normal max-w-[150px] hover:max-w-[300px]">{{ order.device }}</div> 
                        </td>
                        <td
                            v-if="view_options.order_cost"
                            class="px-3 py-4 md:px-6"
                        >
                            {{ order.order_cost }}
                        </td>
                        <td
                            v-if="view_options.expenses"
                            class="px-3 py-4 md:px-6"
                        >
                            {{ order.expenses }}
                        </td>
                        <td
                            v-if="view_options.agreement"
                            class="px-3 py-4 md:px-6"
                        >
                            {{ order.agreement ? "Да" : "Нет" }}
                        </td>
                        <td
                            v-if="view_options.payment_method"
                            class="px-3 py-4 md:px-6"
                        >
                            {{ order.payment_method }}
                        </td>
                        <td
                            v-if="view_options.salary"
                            class="px-3 py-4 md:px-6"
                        >
                            {{ order.pay_per_order }}
                        </td>
    
                        <td class="flex justify-center px-3 py-4 md:px-6 space-x-3">
                            <button
                                type="button"
                                class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                </svg>
                            </button>
                            <button
                                @click="remove_order(order.id)"
                                type="button"
                                class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    </transition-group>
                </tbody>
            </table>
        </div>
    </div>
    <div class="text-center">
        <button
            @click="clear_order_table"
            class="mt-6 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
        >
            Очистить таблицу
        </button>
    </div>
</template>

<style scoped>
.test {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}
input[type=checkbox]{
    cursor: pointer;
}

.tr-order-enter-active,
.tr-order-leave-active {
  transition: all 0.5s ease;
}
.tr-order-enter-from,
.tr-order-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.toggle-enter-active,
.toggle-leave-active {
    transition: max-height .3s ease, margin-bottom .2s ease;
}

.toggle-enter-from,
.toggle-leave-to {
    max-height: 0;
    margin-bottom: 0;
}
</style>
