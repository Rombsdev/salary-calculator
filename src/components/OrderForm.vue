<script>
import { mapGetters } from "vuex";
import InputWorkingDays from "@/components/WorkingDays.vue";
import MixPayment from "@/components/MixPayment.vue";

export default {
    components: {
        InputWorkingDays,
        MixPayment
    },

    data() {
        return {
            id: null,
            device: null,
            order_cost: null,
            expenses: 0,
            payment_method: 'карта',
            payment_methods: null,
            is_agreement: false,
            mix_pay: {cash: 0, card: 0,},
            toastShow: false,
        };
    },
    computed: {
        ...mapGetters(['get_rates', 'get_payment_methods', 'get_payment_methods_tax']),

        rate(){
            const {agreement_rate, pay_rate} = this.get_rates;
            return this.is_agreement ? agreement_rate : pay_rate
        },

        pay_per_order(){
            return this.payment_method != 'смешанная' 
                ? +((this.order_cost - (this.order_cost * this.get_payment_methods_tax(this.payment_method)) / 100 - this.expenses) * this.rate).toFixed(2)
                : +((( (this.mix_pay.cash - this.mix_pay.cash * 10 / 100) + (this.mix_pay.card - this.mix_pay.card * 14.5 / 100) ) - this.expenses ) * this.rate).toFixed(2)
        }
    },

    methods: {
        add_order() {
            this.$store.dispatch("add_order", {
                id: this.id,
                device: this.device,
                order_cost: this.order_cost,
                payment_method: this.payment_method,
                expenses: this.expenses,
                agreement: this.is_agreement,
                order_type: "order",
                pay_per_order: this.pay_per_order,
            });
            // this.$refs.input_order_id.focus();
            this.toastShow = true;
            setTimeout(()=>{
                this.toastShow = false;
            }, 1500)
        },
    },

    created(){
        this.payment_methods = this.get_payment_methods;
    },

    mounted() {
        this.$refs.input_order_id.focus();

        // let a = [{"id":215,"device":"Ноутбук Acer Aspire V3-772G","order_cost":4400,"payment_method":"без чека","expenses":0,"agreement":false,"order_type":"order","pay_per_order":1320},{"id":216,"device":"Ноутбук MSI Raider","order_cost":6790,"payment_method":"карта","expenses":0,"agreement":true,"order_type":"order","pay_per_order":580.54},{"id":219,"device":"iPhone XR","order_cost":6490,"payment_method":"без чека","expenses":1750,"agreement":true,"order_type":"order","pay_per_order":474},{"id":223,"device":"Ноутбук Sony Vaio VGN-NW2ERE","order_cost":2000,"payment_method":"карта","expenses":0,"agreement":false,"order_type":"order","pay_per_order":513}]
        // localStorage.setItem('orders_list_in_local_storage', JSON.stringify(a))
    },
};
</script>

<template>
    <div class="max-w-3xl mx-auto mb-8">
        <transition name="toast">
            <div v-if="toastShow" id="toast-success" class="fixed top-[25px] md:top[50px] left-0 mx-auto right-0 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-200 bg-green-800 rounded-lg">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">Заказ успешно добавлен.</div>
                <button @click="toastShow = !toastShow" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div> 
        </transition>
        <h1 class="mb-8 sm:mb-4 text-xl"></h1>
        <InputWorkingDays />
        <form @submit.prevent="add_order" action="" class="mb-8">
            <div class="relative w-100 h-100 bg-red">
                <div class="inner"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="order-id relative">
                    <input
                        v-model.lazy.trim.number="id"
                        @focus="$event.target.select()"
                        ref="input_order_id"
                        id="order-id"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="text"
                        placeholder=" "
                        inputmode="numeric"
                        required
                    />
                    <label
                        for="order-id"
                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >Номер заказа*</label
                    >
                </div>
                <div class="device relative">
                    <input
                        v-model.lazy.trim="device"
                        @focus="$event.target.select()"
                        id="device"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="text"
                        placeholder=" "
                    />
                    <label
                        for="device"
                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >Устройство</label
                    >
                </div>
                <div class="cost-order relative">
                    <input
                        v-model.lazy.trim.number="order_cost"
                        @focus="$event.target.select()"
                        id="cost-order"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="text"
                        inputmode="numeric"
                        placeholder=" "
                        required
                    />
                    <label
                        for="cost-order"
                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >Цена заказа*</label
                    >
                </div>
                <div class="expenses relative">
                    <input
                        v-model.lazy.trim.number="expenses"
                        @focus="$event.target.select()"
                        id="expenses"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="text"
                        placeholder=" "
                        inputmode="numeric"
                        required
                    />
                    <label
                        for="expenses"
                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >Затраты в заказе*</label
                    >
                </div>
                <div>
                    <!-- <label for="pay-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип оплаты</label> -->
                    <select
                        v-model="payment_method"
                        id="pay-type"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                    >
                        <option v-for="(method, key) in payment_methods" :key="key" :value="key">{{method.name}} ({{ method.tax }}%)</option>
                    </select>
                </div>
                <div v-if="payment_method == 'смешанная'" class="payment-addition-options flex gap-3">
                    <div class="cash relative">
                        <input
                            v-model.lazy.trim.number="mix_pay.cash"
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
                            >Наличные</label
                        >
                    </div>
                    <div class="card-options relative">
                        <input
                            v-model.lazy.trim.number="mix_pay.card"
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
                <div
                    class="agreement flex items-center pl-4 border border-gray-200 rounded-lg"
                >
                    <input
                        v-model="is_agreement"
                        id="agreement"
                        type="checkbox"
                        value="Да"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                        for="agreement"
                        class="w-full py-2.5 ml-2 text-sm font-medium text-gray-900"
                        >Согласование</label
                    >
                </div>
            </div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Добавить
            </button>
        </form>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s ease, transform .5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

#toast-success{
    box-shadow: 0 0 15px rgb(0 0 0 / 0.2);
}
</style>
