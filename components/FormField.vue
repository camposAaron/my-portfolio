<template>
  <div>
    <label :for="id" class="mb-2 block text-gray-700 dark:text-gray-300">{{ label }}</label>
    
    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :id="id"
      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800"
      :class="{ 'border-red-500': error }"
    />
    
    <textarea
      v-else
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :rows="rows"
      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800"
      :class="{ 'border-red-500': error }"
    ></textarea>
    
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['update:modelValue'])
</script> 