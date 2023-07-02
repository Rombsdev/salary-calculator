<template>
    <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" :class="is_active" @change="show_salary_details = !show_salary_details">
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600"></div>
        <img :src="`@/assets/${icon}`" alt="" class="w-5 h-5 peer-checked:translate-x-full absolute top-0.5 left-[2px] bg-white rounded-full duration-200"/>
    </label>
</template>

<script>

export default {
    props: ['change', 'icon'],

}
</script>

<style>

</style>