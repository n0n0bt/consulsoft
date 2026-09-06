<template>
  <!--
    No navbar, no footer. The brief is a single task, and the surrounding
    navigation would only offer ways to abandon it. The one way out is the
    close control the page itself renders.
  -->
  <div class="min-h-svh bg-paper">
    <slot />
  </div>
</template>
