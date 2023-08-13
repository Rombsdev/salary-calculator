<template>
    <div class="max-w-3xl mx-auto mb-4 md:mb-6">
        <div class="flex items-center justify-between pb-4">
            <span class="text-xl font-bold mr-2">Зарплата: {{ get_salary }} руб.</span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" @change="show_salary_details = !show_salary_details">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600"></div>
                <img src="@/assets/gear_icon.svg" alt="" class="w-5 h-5 peer-checked:translate-x-full absolute top-0.5 left-[2px] bg-white rounded-full duration-200"/>
            </label>
        </div>
        <transition name="toggle">
            <div v-show="show_salary_details" class="max-h-[120px] overflow-hidden">
                <div class="border rounded-md p-3">
                <div class="mb-2 font-medium">Смены: {{ get_working_days * get_rates.day_rate }} руб.</div>
                <div class="mb-2 font-medium">Заказы: {{ get_salary_per('order') }} руб.</div>
                <div class="font-medium">Продажи: {{ get_salary_per('sale') }} руб.</div>
                </div>
            </div>
        </transition> 
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data(){
        return {
            show_salary_details: false,
        }
    },

    computed: {
        ...mapGetters(["get_salary",'get_salary_per', 'get_working_days', 'get_rates']),
    }
}
</script>

<style scoped>
.toggle-enter-active,
.toggle-leave-active {
    transition: max-height .25s ease;
}

.toggle-enter-from,
.toggle-leave-to {
    max-height: 0;
}
</style>