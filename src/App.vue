<script>
import SiteHeader from "@/components/Header.vue";
import OrdersTable from "@/components/OrdersTable.vue";
import OrderForm from "@/components/OrderForm.vue";
import OrderSalesForm from "@/components/OrderSalesForm.vue";
import FromCashbox from "@/components/FromCashbox.vue";
import Salary from '@/components/Salary.vue';
import { mapActions } from "vuex";


export default {
    components: {
        SiteHeader,
        OrdersTable,
        OrderForm,
        OrderSalesForm,
        FromCashbox,
        Salary,
    },

    data(){
        return {
            buttons: [{component: 'OrderForm', name: 'Заказы'}, {component: 'OrderSalesForm', name: 'Продажи'}, {component: 'FromCashbox', name: 'Одолжено'}],
            view: null,
        }
    },

    methods: {
        ...mapActions(['initial_store'])
    },

    created(){
        this.initial_store();
        this.view = this.buttons[0].component
    }
}
</script>

<template>
    <site-header />
    <div class="flex rounded-md justify-center mb-8" role="group">
        <button 
            v-for="button in buttons"
            :key="button.name"
            @click="view = button.component"           
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
            type="button"
         >
            {{ button.name }}
        </button>
    </div>
    <transition name="fade" mode="out-in" appear>
        <component :is="view"/>
    </transition>
    <salary />
    <orders-table />
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
