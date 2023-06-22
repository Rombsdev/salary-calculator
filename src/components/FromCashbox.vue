<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
        borrowed: 0,
    };
  },
  computed: {
  },

  methods: {

  },

  mounted() {
      this.$refs.input.focus();
    },
};

/* 

*/
</script>

<template>
  <div class="max-w-3xl mx-auto mb-8">
    <h1 class="mb-8">В разработке</h1>
    <!-- <form action="" class="mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="order-id relative">
          <input
            v-model.trim.number="borrowed"
            ref="input"
            id="amount"
            class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type="text"
            placeholder=" "
            inputmode="numeric"
          />
          <label
            for="amount"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            ></label
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
    </div> -->
  </div>
</template>

<style scoped></style>
