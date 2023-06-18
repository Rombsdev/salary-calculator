<script setup>
    
</script>

<template>
    <header>
        <div class="flex justify-center gap-4 mx-auto mb-8 max-w-3xl">
            <router-link :to="{name: 'orderForm'}"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                Заказы
            </router-link>
            <router-link :to="{name: 'orderSales'}"
            class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                Продажи
            </router-link>
            <router-link :to="{name: 'fromCashbox'}"
                class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                Одолжено
            </router-link>
      </div>
    </header>
</template>

<style scoped>

</style>
