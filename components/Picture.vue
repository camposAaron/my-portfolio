<template>
  <figure class="avatar">
    <!-- Square crops of public/me/me.heic, graded for the page (lower exposure, softened
         highlights, carbon shadows, ivory highlights). The CSS veil on .avatar::after finishes
         blending it into the carbon ground. -->
    <picture>
      <source
        type="image/webp"
        srcset="/me/me-480.webp 480w, /me/me-960.webp 960w"
        sizes="(max-width: 60rem) 240px, 380px"
      />
      <img
        id="picture"
        src="/me/me-960.jpg"
        alt="Aaron Campos at his desk, with code on the monitor behind him"
        width="960"
        height="960"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </figure>
</template>
