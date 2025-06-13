<template>
    <button
      :type="type"
      class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg shadow hover:shadow-lg
        transition duration-150 ease-in-out hover:bg-gradient-to-br
       hover:from-indigo-500 hover:to-cyan-500 active:scale-95"
      @click="$emit('click')"
    >
      <slot>Button</slot>
    </button>
  </template>
  
  <script>
  export default {
      name: "Button",
      props: {
          type: {
              type: String,
              default: "button",
          },
      },
  }
  </script>