<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

const payment_methods = [
    {name: 'Карта', tax: 14.5},
    {name: 'Наличные', tax: 10},
    {name: 'Безнал', tax: 10},
    {name: 'Без чека', tax: 0},
    {name: 'Смешанная', tax: 'mix'},
]

const fix_services = new Map()
fix_services.set('наклейка защитного стекла', 150)

export default {
  data() {
    return {
      id: null,
      product: null,
      order_cost: null,
      expenses: null,
      payment_method: payment_methods[0].name,
      payment_methods,
      products: [{name: '', cost: 0, pay_per_product: 0}],
    };
  },
  computed: {
    ...mapGetters(["get_orders", "get_payment_methods"]),

    pay_per_products(){
      return this.products.reduce((acc, product) => {
        let {name, cost} = product;
        name = name.toLocaleLowerCase();
        if(fix_services.has(name)) {product.pay_per_product = fix_services.get(name); return acc += fix_services.get(name)};
        if(cost <= 0) { product.pay_per_product = 0; return 0};
        if(cost < 500) { product.pay_per_product = 50; return acc += 50; };
        if(cost >= 500){ product.pay_per_product = 100; return acc += 100; };
      }, 0)
    }
  },

  methods: {
    ...mapActions(["add_sale"]),
    set_sale() {
      const order_options = {
        id: this.id,
        products: this.products,
        order_cost: this.order_cost,
        payment_method: this.payment_method,
        expenses: this.expenses,
        order_type: 'sale',
        pay_per_order: this.pay_per_products,
      };
      this.add_sale(order_options);
      this.$refs.input_order_id.focus();
    },

    add_product(){
      this.products.push({name: '', cost: 0, pay_per_product: 0})
      console.log(this.products)
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
    <form @submit.prevent="set_sale" action="" class="mb-8">
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
          />
          <label
            for="order-id"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Номер заказа*</label
          >
        </div>
        <div v-for="(product, i) in products" :key="product.name" class="flex items-center">
          <div class="cost-order relative mr-2">
            <input
              v-model.lazy.trim="product.name"
              @focus="$event.target.select()"
              :id="`cost-order-name-${i+1}`"
              class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              placeholder=" "
            />
            <label
              :for="`cost-order-name-${i+1}`"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Товар</label
            >
          </div>
          <div class="cost-order relative mr-2">
            <input
              v-model.lazy.trim.number="product.cost"
              @focus="$event.target.select()"
              :id="`cost-order-${i+1}`"
              class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              placeholder=" "
              inputmode="numeric"
            />
            <label
              :for="`cost-order-${i+1}`"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Цена продажи*</label
            >
          </div>
          <button @click="add_product" class="text-white bg-blue-700 hover:bg-blue-800 w-9 rounded-md p-1" type="button"><img src="@/assets/plus.svg" alt=""></button>
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
            <option v-for="method in payment_methods" :key="method.name" :value="method.name" selected>{{method.name}} ({{ method.tax }}%)</option>
          </select>
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

</style>
