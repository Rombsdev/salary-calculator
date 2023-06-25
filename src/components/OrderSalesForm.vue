<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      show_salary_details: false,
      id: null,
      product: null,
      order_cost: null,
      expenses: null,
      payment_method: "Карта",
      tovars_info: [{test:1}],
    };
  },
  computed: {
    ...mapGetters(["get_salary", "get_orders", "get_payment_methods", 'get_salary_for_orders', 'get_salary_for_sales', 'get_working_days']),

    get_local_salary(){
      return this.get_orders.filter(order => order.order_type == 'sale')
        .reduce( (acc, { order_cost, expenses, payment_method } ) => acc + (order_cost - order_cost * this.get_payment_methods[payment_method] / 100 - expenses) * 0.3, 0)
    },

    is_active() {
      return this.show_salary_details ? "bg-gray-300" : "bg-white";
    },

  },

  methods: {
    ...mapActions(["add_order"]),
    set_order() {
      const order_options = {
        id: this.id,
        product: this.product,
        order_cost: this.order_cost,
        payment_method: this.payment_method,
        expenses: this.expenses,
        order_type: 'sale',
        tovars_info: [...this.tovars_info]
      };
      this.add_order(order_options);
      this.$refs.input_order_id.focus();
    },

    add_tovar(){
      this.tovars_info.push({})
    },

    focus_input_order_id() {
      this.$refs.input_order_id.focus();
    },
  },

  mounted() {
    this.focus_input_order_id();
  },
};

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
    <h1 class="mb-8"></h1>
    <form action="" class="mb-8">
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
            type="text"
            placeholder=" "
            inputmode="numeric"
          />
          <label
            for="order-id"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Номер заказа*</label
          >
        </div>
        <div v-for="(tovar, i) in tovars_info" :key="i" class="flex items-center">
          <div class="cost-order relative mr-2">
            <input
              v-model.trim="order_cost"
              id="cost-order-name"
              class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              placeholder=" "
            />
            <label
              for="cost-order-name"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Наименование</label
            >
          </div>
          <div class="cost-order relative mr-2">
            <input
              v-model.trim.number="order_cost"
              id="cost-order"
              class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              placeholder=" "
              inputmode="numeric"
            />
            <label
              for="cost-order"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Цена продажи*</label
            >
          </div>
          <button @click="add_tovar" class="text-white bg-blue-700 hover:bg-blue-800 w-9 rounded-md p-1" type="button"><img src="@/assets/plus.svg" alt=""></button>
        </div>
        <div class="expenses relative">
          <input
            v-model.trim.number="expenses"
            id="expenses"
            class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type="text"
            placeholder=" "
            inputmode="numeric"
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
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-[9px]"
          >
            <option value="Карта" selected>Карта (14,5%)</option>
            <option value="Наличные">Наличные (10%)</option>
            <option value="Безнал">Безнал (10%)</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        @click.prevent="set_order"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Добавить
      </button>
    </form>
    <div class="salary font-bold">
      <span></span>
      

    </div>
    <div class="flex items-center mb-4 max-w-3xl mx-auto">
        <span class="text-xl font-bold mr-2">Зарплата: {{ get_salary.toFixed(2) }} руб.</span>
        <button
            @click="show_salary_details = !show_salary_details"
            type="button"
            :class="is_active"
            class="rounded-lg w-8 px-1 py-1 shadow-md border"
        >
            <img src="@/assets/gear_icon.svg" alt="" />
        </button>
    </div>
    <div v-if="show_salary_details" class="border rounded-md p-3">
      <div class="mb-2 font-medium">Смены: {{ (get_working_days * 1500).toFixed(2) }} руб.</div>
      <div class="mb-2 font-medium">Заказы: {{ get_salary_for_orders.toFixed(2) }} руб.</div>
      <div class="font-medium">Продажи: {{ get_salary_for_sales.toFixed(2) }} руб.</div>
    </div>
  </div>
</template>

<style scoped></style>
