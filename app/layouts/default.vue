<template>
  <!--
    TheContactDock replaces the old floating button, which linked to a dead
    LinkedIn URL and simply repeated the navbar CTA. This one offers email —
    the one route the navbar has no room for — and stands down whenever the
    real CTA section is on screen.
  -->
  <div class="flex min-h-screen flex-col">
    <TheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
    <TheContactDock />
  </div>
</template>
