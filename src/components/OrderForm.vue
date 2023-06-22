<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
// props({
//   msg: String,
// });
export default {
    data() {
        return {
            id: null,
            device: null,
            order_cost: null,
            expenses: null,
            payment_method: "Карта",
            agreement: false,
            working_days: 0,
        };
    },
    computed: {
        ...mapGetters(["get_salary", "get_working_days"]),
    },

    methods: {
        ...mapActions(["add_order"]),
        ...mapMutations(["set_working_days"]),
        set_order() {
            this.$store.dispatch("add_order", {
                id: this.id,
                device: this.device,
                order_cost: this.order_cost,
                payment_method: this.payment_method,
                expenses: this.expenses,
                agreement: this.agreement,
                order_type: "order",
            });
           this.$refs.input_order_id.focus();

            
        },
    },  
    
    created(){
      let days = JSON.parse( localStorage.getItem( "working_days_in_local_storage" ) );

      if( typeof days == 'number' && days > 0 ){
        this.set_working_days(days);
        this.working_days = this.get_working_days;
      }

      this.$watch('working_days', newValue  => {
        let days = parseFloat( newValue );
        if( days ){
          this.set_working_days(days); localStorage.setItem('working_days_in_local_storage', days)
        }else{
          console.log(days)
          localStorage.clear();
          this.set_working_days(0)
        }
      })

    },

    mounted() {
      this.$refs.input_order_id.focus();
    },
};
// const count = ref(0);
// const salary = ref(0);
// const order_list = [];
/* 
  № заказа
  Название устройства
  Затраты в заказе
  Цена заказа
  Согласование - bool
  Учет другого мастера
  Способ оплаты - object
  Брал из кассы / переводом
*/
</script>

<template>
    <div class="max-w-3xl mx-auto mb-8">
        <h1 class="mb-8 sm:mb-4 text-xl"></h1>
        <div class="working_days relative mb-6">
            <input
                v-model.trim.number="working_days"
                id="working_days"
                class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="number"
                placeholder=" "
            />
            <label
                for="working_days"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Рабочих дней x 1500 р.</label
            >
        </div>
        <form @submit.prevent="set_order" action="" class="mb-8">
            <div class="relative w-100 h-100 bg-red">
                <div class="inner"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="order-id relative">
                    <input
                        v-model.trim.number="id"
                        ref="input_order_id"
                        id="order-id"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="number"
                        placeholder=" "
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
                        id="cost-order"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="number"
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
                        id="expenses"
                        class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="number"
                        placeholder=" "
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
                        <option value="Карта" selected>Карта (14,5%)</option>
                        <option value="Наличные">Наличные (10%)</option>
                        <option value="Безнал">Безнал (10%)</option>
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
