<script setup lang="ts">
const { t } = useI18n()

const stack = [
  { name: 'Vue.js', src: '/languages/vue.webp' },
  { name: 'React', src: '/languages/react.webp' },
  { name: 'Go', src: '/languages/go.webp' },
  { name: 'C#', src: '/languages/csharp.webp' },
  { name: '.NET', src: '/languages/net-core.webp' },
  { name: 'Kotlin', src: '/languages/kotlin.webp' },
  { name: 'Python', src: '/languages/python.webp' },
  { name: 'Node.js', src: '/languages/node.webp' },
]
</script>

<template>
  <section class="bg-white">
    <div class="shell py-16 sm:py-20">
      <p class="reveal text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate-400">
        {{ t('stack.title') }}
      </p>

      <!-- Name sits under the mark, so each pair reads as one unit and the row
           stays legible even where a logo is unfamiliar. -->
      <ul class="reveal mt-12 flex flex-wrap items-start justify-center gap-x-12 gap-y-10 sm:gap-x-16">
        <li v-for="s in stack" :key="s.name" class="group flex w-20 flex-col items-center gap-3">
          <img
            :src="s.src"
            :alt="s.name"
            width="192"
            height="192"
            loading="lazy"
            decoding="async"
            class="h-14 w-14 object-contain transition duration-300 group-hover:scale-105"
          />
          <span class="text-center font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-500 transition group-hover:text-ink">
            {{ s.name }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
