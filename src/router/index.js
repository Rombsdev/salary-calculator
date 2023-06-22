import { createRouter, createWebHistory } from "vue-router";
import OrderForm from "@/components/OrderForm.vue";
import OrderSales from "@/components/OrderSalesForm.vue";
import FromCashbox from "@/components/FromCashbox.vue";
import Error404 from "@/components/Error404.vue";
import Home from "@/views/Home.vue";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/orderSales", name: "orderSales", component: OrderSales },
    { path: "/orderForm", name: "orderForm", component: OrderForm },
    { path: "/fromCashbox", name: "fromCashbox", component: FromCashbox },
    { path: "/:pathMatch(.*)*", name: "error404", component: OrderForm },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
