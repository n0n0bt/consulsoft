<script setup lang="ts">
/**
 * The masthead every page except the homepage opens with. It reuses the hero's
 * light field so an inner page still feels like the same building, but at a
 * fraction of the height — these pages have a job to do below the fold.
 */
defineProps<{
  eyebrow: string
  title: string
  lede?: string
}>()
</script>

<template>
  <section class="px-2 pt-2 sm:px-3 sm:pt-3">
    <div class="field-light relative overflow-hidden rounded-stage">
      <div class="field-grid absolute inset-0" aria-hidden="true" />
      <div class="shell relative pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div class="max-w-3xl">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1 class="mt-4 text-display-lg font-semibold text-balance text-ink">{{ title }}</h1>
          <p v-if="lede" class="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
            {{ lede }}
          </p>
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
