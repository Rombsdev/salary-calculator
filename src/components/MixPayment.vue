<template>
    <div
        class="payment-addition-options flex gap-3"
    >
        <div class="cash relative">
            <input
                v-model.trim.number="cash"
                @focus="$event.target.select()"
                id="cash"
                class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                placeholder=" "
                inputmode="numeric"
                required
            />
            <label
                for="card"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Налик</label
            >
        </div>
        <div class="card-options relative">
            <input
                v-model.trim.number="card"
                @focus="$event.target.select()"
                id="card"
                class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                placeholder=" "
                inputmode="numeric"
                required
            />
            <label
                for="expenses"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Карта</label
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cash: 0,
            card: 0,
        };
    },
};
</script>

<style></style>
