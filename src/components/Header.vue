<script setup>
    
</script>

<template>
    <header>
        <div class="flex rounded-md justify-center mb-8" role="group">
            <router-link :to="{name: 'home'}"
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"                >
                Заказы
            </router-link>
            <router-link :to="{name: 'orderSales'}"
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"                >
                Продажи
            </router-link>
            <router-link :to="{name: 'fromCashbox'}"
                class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"                >
                Получено
            </router-link>
      </div>
    </header>
</template>

<style scoped>
.router-link-exact-active{
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
    --tw-gradient-from: #9333ea var(--tw-gradient-from-position);
    --tw-gradient-to: rgb(147 51 234 / 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    --tw-gradient-to: #3b82f6 var(--tw-gradient-to-position);
    color: white;
}
</style>

