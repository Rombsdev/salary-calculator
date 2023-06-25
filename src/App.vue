<script>
import SiteHeader from "@/components/Header.vue";
import OrdersTable from "@/components/OrdersTable.vue";
import { mapActions} from "vuex";


export default {
    components: {
        SiteHeader,
        OrdersTable
    },

    methods: {
        ...mapActions(['initial_store'])
    },

    created(){
        this.initial_store();
    }
}
</script>

<template>
    <site-header />
    <router-view />
    <orders-table />
</template>

<style scoped></style>
