<template>
  <div 
    class="flex-shrink-0 w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto md:mx-0 relative overflow-hidden rounded-full shadow-xl animate-fade-in-on-scroll"
  >
    <img 
      id="picture" 
      src="/me/example2.png" 
      alt="A picture of Aaron, the developer" 
      class="sepia-20 saturate-80 hue-rotate-15 w-full h-full object-cover roup-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-in-out" 
      loading="lazy" 
    />
    <div class="absolute inset-0 rounded-full ring-2 ring-offset-4 ring-offset-gray-900 ring-indigo-500 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
  </div>
</template>