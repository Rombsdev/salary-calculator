<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import InputWorkingDays from "@/components/WorkingDays.vue";

const payment_methods = [
    {name: 'Карта', tax: 14.5},
    {name: 'Наличные', tax: 10},
    {name: 'Безнал', tax: 10},
    {name: 'Без чека', tax: 0},
]

export default {
    components: {
        InputWorkingDays,
    },

    data() {
        return {
            id: null,
            device: null,
            order_cost: null,
            expenses: 0,
            payment_method: payment_methods[0].name,
            payment_methods,
            agreement: false,
        };
    },
    computed: {
        ...mapGetters(["get_salary", 'get_rates']),
        get_agreement(){
            return this.agreement ? this.get_rates.agreement_rate : this.get_rates.pay_rate
        }
    },

    methods: {
        ...mapActions(["add_order"]),
        set_order() {
            this.$store.dispatch("add_order", {
                id: this.id,
                device: this.device,
                order_cost: this.order_cost,
                payment_method: this.payment_method,
                expenses: this.expenses,
                agreement: this.agreement,
                order_type: "order",
                pay_per_order: ((this.order_cost - (this.order_cost * this.payment_methods.find(method => method.name == this.payment_method).tax) / 100 - this.expenses) * this.get_agreement).toFixed(2),
            });
            this.$refs.input_order_id.focus();
        },
    },

    mounted() {
        this.$refs.input_order_id.focus();

        // let a = [{"id":49,"device":"Samsung Galaxy S21 Ultra (G998)","order_cost":1500,"payment_method":"Без чека","expenses":"0","agreement":false,"order_type":"order","pay_per_order":"450.00"},{"id":46,"device":"Стационарный ПК","order_cost":4000,"payment_method":"Карта","expenses":"0","agreement":false,"order_type":"order","pay_per_order":"1026.00"},{"id":40,"device":"Samsung Galaxy M31","order_cost":7990,"payment_method":"Карта","expenses":"4820","agreement":false,"order_type":"order","pay_per_order":"603.43"},{"id":35,"device":"Мини-пк GiGABYTE (GB-BACE310)","order_cost":1800,"payment_method":"Карта","expenses":"1","agreement":false,"order_type":"order","pay_per_order":"461.40"},{"id":51,"device":"Ноутбук Asus X75V (X75VB-TY008D)","order_cost":5500,"payment_method":"Карта","expenses":"635","agreement":false,"order_type":"order","pay_per_order":"1220.25"},{"id":53,"device":"Ноутбук Xiaomi Mi Notebook 15 (181501-AB)","order_cost":3490,"payment_method":"Наличные","expenses":"0","agreement":false,"order_type":"order","pay_per_order":"942.30"}]
        // localStorage.setItem('orders_list_in_local_storage', JSON.stringify(a))
    },
};
</script>

<template>
    <div class="max-w-3xl mx-auto mb-8">
        <h1 class="mb-8 sm:mb-4 text-xl"></h1>
        <InputWorkingDays />
        <form @submit.prevent="set_order" action="" class="mb-8">
            <div class="relative w-100 h-100 bg-red">
                <div class="inner"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="order-id relative">
                    <input
                        v-model.trim.number="id"
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
                        v-model.trim="device"
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
                        v-model.trim.number="order_cost"
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
                        v-model.trim="expenses"
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
                        <option v-for="method in payment_methods" :key="method.name" :value="method.name" selected>{{method.name}} ({{ method.tax }}%)</option>
                    </select>
                </div>

                <div
                    class="agreement flex items-center pl-4 border border-gray-200 rounded-lg"
                >
                    <input
                        v-model="agreement"
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
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Добавить
            </button>
        </form>

        <div class="salary font-bold">
            Зарплата: {{ get_salary.toFixed(2) }} рублей
        </div>
    </div>
</template>

<style scoped></style>
