<template>
    <nav class="hidden md:flex space-x-6 lg:space-x-8 items-center ">
        <NavLink 
           class="focus:outline-none focus:ring-2  
            focus:ring-offset-gray-800 focus:ring-white dark:hover:bg-gray-700" 
            v-for="link in navLinks" :key="link.href" :href="link.href" :text="link.text" />
    </nav>
</template>
<script setup>
defineProps({
    navLinks: {
        type: Array,
        required: true
    }
})

</script>