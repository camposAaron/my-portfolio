<template>
  <div class="field">
    <label :for="id">{{ label }}</label>

    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :id="id"
      :name="id"
      :autocomplete="autocomplete"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="`${id}-error`"
    />

    <textarea
      v-else
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :name="id"
      :rows="rows"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="`${id}-error`"
    ></textarea>

    <p :id="`${id}-error`" class="field__error" aria-live="polite">{{ error }}</p>
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
  },
  autocomplete: {
    type: String,
    default: 'on'
  }
})

defineEmits(['update:modelValue'])
</script>
