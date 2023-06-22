<script setup>
import SiteHeader from "@/components/Header.vue";
import OrdersTable from "@/components/OrdersTable.vue";
</script>

<template>
    <site-header />
    <router-view />
    <orders-table />
</template>

<style scoped></style>
