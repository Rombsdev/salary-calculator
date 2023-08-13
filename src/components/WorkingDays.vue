<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
        working_days: 0,
    }
  },
  computed: {
    ...mapGetters(["get_working_days"])
  },

  methods: {
    ...mapMutations(["set_working_days"]),
    validate_days(newValue){
      let days = parseFloat( newValue );
      if( days ){
          let validated_days = Math.min( Math.max( 0, days ), 31 )
          this.set_working_days(validated_days); localStorage.setItem('working_days_in_local_storage', validated_days), this.working_days = validated_days;
        } else {
          localStorage.removeItem('working_days_in_local_storage');
          this.set_working_days(0)
        }
    }
  },

  created(){

      this.working_days = this.get_working_days;

      // this.$watch('working_days', newValue  => {
      //   let days = parseFloat( newValue );
      //   if( days ){
      //     let validated_days = Math.min( Math.max( 0, days ), 31 )
      //     this.set_working_days(validated_days); localStorage.setItem('working_days_in_local_storage', validated_days)
      //   } else {
      //     localStorage.removeItem('working_days_in_local_storage');
      //     this.set_working_days(0)
      //   }
      // })

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
    <div class="working_days relative mb-6">
        <input
            :value="working_days"
            @input="validate_days($event.target.value)"
            @focus="$event.target.select()"
            id="working_days"
            class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type="text"
            placeholder=" "
            inputmode="numeric"
        />
        <label
            for="working_days"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Рабочих дней x 1500 р.</label
        >
    </div>
</template>

<style scoped></style>
