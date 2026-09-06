<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

definePageMeta({ layout: 'focus' })

useHead({ title: () => t('brief.title') })
useSeoMeta({ robots: 'noindex, follow' })

/**
 * One brief, two routes through it.
 *
 * Someone who arrived from "Noch unklar, was Sie brauchen?" cannot answer
 * "which platform" or "what budget" — asking anyway is how you lose them on
 * step one. They get asked where time is being lost instead, and no budget
 * question at all, which is what the strategy-call CTA promised.
 *
 * Someone who arrived from a service page or "Sie wissen schon, was Sie
 * wollen?" gets the full brief, with their platform already ticked.
 */
type Intent = 'explore' | 'ready'

const FLOWS: Record<Intent, string[]> = {
  ready: ['project', 'details', 'task', 'scope', 'contact'],
  explore: ['pain', 'task', 'timing', 'contact'],
}

/**
 * One follow-up per service — the question that actually moves the estimate.
 * They all live on a single conditional step rather than branching: the choice
 * above is multi-select, and four branches would mean an eight-step form for
 * exactly the enquiries worth having.
 */
const DETAILS: Record<string, string[]> = {
  web: ['erp', 'crm', 'none', 'unsure'],
  desktop: ['windows', 'macos', 'both'],
  mobile: ['ios', 'android', 'both'],
  ai: ['cloud', 'local', 'unsure'],
}

const surfaces = ['web', 'desktop', 'mobile', 'ai'] as const
const pains = ['duplicate', 'documents', 'overview', 'fit', 'unsure'] as const
const timelines = ['asap', 'quarter', 'halfyear', 'open'] as const
const budgets = ['s', 'm', 'l', 'xl', 'unknown'] as const

const intent = computed<Intent>(() => (route.query.intent === 'explore' ? 'explore' : 'ready'))
const stepKeys = computed(() => FLOWS[intent.value])
const steps = computed(() => stepKeys.value.length)

const preService = computed(() => {
  const s = route.query.service
  return typeof s === 'string' && (surfaces as readonly string[]).includes(s) ? s : null
})

const form = reactive({
  surfaces: preService.value ? [preService.value] : ([] as string[]),
  details: {} as Record<string, string>,
  pains: [] as string[],
  description: '',
  timeline: '',
  budget: '',
  name: '',
  email: typeof route.query.email === 'string' ? route.query.email : '',
  company: '',
  phone: '',
})

const step = ref(0)
const status = ref<'idle' | 'sending' | 'error'>('idle')
const current = computed(() => stepKeys.value[step.value]!)

// Each step states its own completeness, so Weiter is never a dead end.
const canAdvance = computed(() => ({
  project: form.surfaces.length > 0,
  details: form.surfaces.every(sf => form.details[sf]),
  pain: form.pains.length > 0,
  task: form.description.trim().length > 10,
  scope: Boolean(form.timeline && form.budget),
  timing: Boolean(form.timeline),
  contact: Boolean(form.name.trim() && form.email.trim()),
}[current.value] ?? true))

function toggle(list: string[], id: string) {
  const i = list.indexOf(id)
  if (i === -1) list.push(id)
  else list.splice(i, 1)
}

function next() {
  if (!canAdvance.value) return
  if (step.value < steps.value - 1) step.value += 1
  else submit()
}

function back() {
  if (step.value > 0) step.value -= 1
  else router.push(localePath('/'))
}

async function submit() {
  status.value = 'sending'
  const lines: string[] = []
  if (form.surfaces.length) lines.push(`${t('brief.summary.surfaces')}: ${form.surfaces.map(s => t(`brief.surfaces.${s}.title`)).join(', ')}`)
  for (const sf of form.surfaces) {
    if (form.details[sf]) lines.push(`  ${t(`brief.surfaces.${sf}.title`)} → ${t(`brief.details.${sf}.options.${form.details[sf]}`)}`)
  }
  if (form.pains.length) lines.push(`${t('brief.summary.pains')}: ${form.pains.map(s => t(`brief.pains.${s}.title`)).join(', ')}`)
  if (form.timeline) lines.push(`${t('brief.summary.timeline')}: ${t(`brief.timelines.${form.timeline}`)}`)
  if (form.budget) lines.push(`${t('brief.summary.budget')}: ${t(`brief.budgets.${form.budget}`)}`)
  // Where they came from — useful context before the first call.
  lines.push(`${t('brief.summary.entry')}: ${intent.value}${preService.value ? ` / ${preService.value}` : ''}`)
  lines.push('', form.description)

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { name: form.name, email: form.email, company: form.company, phone: form.phone, message: lines.join('\n') },
    })
    await router.push(localePath('/danke'))
  }
  catch {
    status.value = 'error'
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Enter' || e.shiftKey) return
  if ((e.target as HTMLElement)?.tagName === 'TEXTAREA') return
  e.preventDefault()
  next()
}

const chipClass = (on: boolean) => on
  ? 'border-brass-500 bg-brass-50 text-brass-700'
  : 'border-chrome-300 bg-white text-slate-500 hover:border-chrome-400'
</script>

<template>
  <div class="flex min-h-svh flex-col" @keydown="onKeydown">
    <header class="shrink-0 border-b border-chrome-200 bg-white">
      <div class="shell flex h-16 items-center justify-between gap-4">
        <NuxtLink :to="localePath('/')" aria-label="Consulsoft">
          <img src="/consulsoft-logo.webp" alt="Consulsoft" width="1400" height="413" class="h-[1.3rem] w-auto py-2.5" />
        </NuxtLink>
        <p class="font-mono text-label uppercase text-slate-400">
          {{ t('brief.stepOf', { current: step + 1, total: steps }) }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="grid size-11 place-items-center rounded-full text-slate-400 transition hover:bg-paper hover:text-ink"
          :aria-label="t('brief.close')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
        </NuxtLink>
      </div>
      <div class="h-[3px] w-full bg-chrome-200">
        <div class="h-full bg-brass-500 transition-[width] duration-500 ease-out" :style="{ width: `${((step + 1) / steps) * 100}%` }" />
      </div>
    </header>

    <main class="flex flex-1 items-center py-12">
      <div class="shell w-full">
        <div :key="current" class="mx-auto max-w-2xl">
          <!-- Carried context, so arriving from a service page is acknowledged -->
          <p v-if="preService" class="mb-5 inline-flex items-center gap-2 rounded-full bg-brass-50 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-brass-600">
            {{ t('brief.regarding') }}: {{ t(`brief.surfaces.${preService}.title`) }}
          </p>

          <p class="eyebrow">{{ t(`brief.steps.${current}.eyebrow`) }}</p>
          <h1 class="mt-4 text-display-md font-semibold text-balance text-ink">{{ t(`brief.steps.${current}.question`) }}</h1>
          <p class="mt-3 text-[0.9375rem] text-pretty text-slate-500">{{ t(`brief.steps.${current}.hint`) }}</p>

          <!-- What to build (ready path) -->
          <div v-if="current === 'project'" class="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              v-for="s in surfaces"
              :key="s"
              type="button"
              class="rounded-card border p-5 text-left transition"
              :class="form.surfaces.includes(s) ? 'border-brass-500 bg-brass-50 ring-1 ring-brass-500' : 'border-chrome-300 bg-white hover:border-chrome-400'"
              :aria-pressed="form.surfaces.includes(s)"
              @click="toggle(form.surfaces, s)"
            >
              <span class="block font-display text-[1.0625rem] font-semibold tracking-tight text-ink">{{ t(`brief.surfaces.${s}.title`) }}</span>
              <span class="mt-1 block text-[0.875rem] leading-relaxed text-pretty text-slate-500">{{ t(`brief.surfaces.${s}.hint`) }}</span>
            </button>
          </div>

          <!-- Where time is lost (explore path) -->
          <div v-else-if="current === 'pain'" class="mt-8 grid gap-3">
            <button
              v-for="pn in pains"
              :key="pn"
              type="button"
              class="rounded-card border px-5 py-4 text-left transition"
              :class="form.pains.includes(pn) ? 'border-brass-500 bg-brass-50 ring-1 ring-brass-500' : 'border-chrome-300 bg-white hover:border-chrome-400'"
              :aria-pressed="form.pains.includes(pn)"
              @click="toggle(form.pains, pn)"
            >
              <span class="block text-[1.0625rem] font-medium text-ink">{{ t(`brief.pains.${pn}.title`) }}</span>
              <span class="mt-0.5 block text-[0.875rem] leading-relaxed text-pretty text-slate-500">{{ t(`brief.pains.${pn}.hint`) }}</span>
            </button>
          </div>

          <!-- Follow-ups, only for what was actually ticked -->
          <div v-else-if="current === 'details'" class="mt-8 space-y-8">
            <fieldset v-for="sf in surfaces.filter(x => form.surfaces.includes(x))" :key="sf">
              <legend class="field-label">{{ t(`brief.details.${sf}.label`) }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="opt in DETAILS[sf]"
                  :key="opt"
                  type="button"
                  class="rounded-full border px-4 py-2.5 text-[0.9375rem] transition"
                  :class="chipClass(form.details[sf] === opt)"
                  :aria-pressed="form.details[sf] === opt"
                  @click="form.details[sf] = opt"
                >{{ t(`brief.details.${sf}.options.${opt}`) }}</button>
              </div>
            </fieldset>
          </div>

          <!-- The task itself -->
          <div v-else-if="current === 'task'" class="mt-8">
            <label for="desc" class="field-label">{{ t('brief.fields.description') }}</label>
            <textarea
              id="desc"
              v-model="form.description"
              rows="7"
              class="field resize-y"
              :placeholder="intent === 'explore' ? t('brief.fields.descriptionExplore') : t('brief.fields.descriptionPlaceholder')"
            />
          </div>

          <!-- Timing only (explore) -->
          <div v-else-if="current === 'timing'" class="mt-8">
            <fieldset>
              <legend class="field-label">{{ t('brief.fields.timeline') }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tl in timelines"
                  :key="tl"
                  type="button"
                  class="rounded-full border px-4 py-2.5 text-[0.9375rem] transition"
                  :class="chipClass(form.timeline === tl)"
                  :aria-pressed="form.timeline === tl"
                  @click="form.timeline = tl"
                >{{ t(`brief.timelines.${tl}`) }}</button>
              </div>
            </fieldset>
          </div>

          <!-- Timing and budget (ready) -->
          <div v-else-if="current === 'scope'" class="mt-8 space-y-8">
            <fieldset>
              <legend class="field-label">{{ t('brief.fields.timeline') }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tl in timelines"
                  :key="tl"
                  type="button"
                  class="rounded-full border px-4 py-2.5 text-[0.9375rem] transition"
                  :class="chipClass(form.timeline === tl)"
                  :aria-pressed="form.timeline === tl"
                  @click="form.timeline = tl"
                >{{ t(`brief.timelines.${tl}`) }}</button>
              </div>
            </fieldset>
            <fieldset>
              <legend class="field-label">{{ t('brief.fields.budget') }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="bd in budgets"
                  :key="bd"
                  type="button"
                  class="rounded-full border px-4 py-2.5 text-[0.9375rem] transition"
                  :class="chipClass(form.budget === bd)"
                  :aria-pressed="form.budget === bd"
                  @click="form.budget = bd"
                >{{ t(`brief.budgets.${bd}`) }}</button>
              </div>
            </fieldset>
          </div>

          <!-- Who you are -->
          <div v-else class="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label for="bname" class="field-label">{{ t('brief.fields.name') }} *</label>
              <input id="bname" v-model="form.name" type="text" autocomplete="name" class="field">
            </div>
            <div>
              <label for="bemail" class="field-label">{{ t('brief.fields.email') }} *</label>
              <input id="bemail" v-model="form.email" type="email" autocomplete="email" class="field">
            </div>
            <div>
              <label for="bcompany" class="field-label">{{ t('brief.fields.company') }}</label>
              <input id="bcompany" v-model="form.company" type="text" autocomplete="organization" class="field">
            </div>
            <div>
              <label for="bphone" class="field-label">{{ t('brief.fields.phone') }}</label>
              <input id="bphone" v-model="form.phone" type="tel" autocomplete="tel" class="field">
            </div>
            <p v-if="status === 'error'" role="alert" class="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-[0.9375rem] text-red-800 sm:col-span-2">
              {{ t('brief.error') }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <footer class="sticky bottom-0 shrink-0 border-t border-chrome-200 bg-white/90 backdrop-blur">
      <div class="shell flex h-20 items-center justify-between gap-4">
        <button type="button" class="btn-quiet" @click="back">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H6M13 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ step === 0 ? t('brief.cancel') : t('brief.back') }}
        </button>
        <button
          type="button"
          class="btn-ink"
          :disabled="!canAdvance || status === 'sending'"
          :class="(!canAdvance || status === 'sending') && 'pointer-events-none opacity-40'"
          @click="next"
        >
          {{ status === 'sending' ? t('brief.sending') : step === steps - 1 ? t('brief.submit') : t('brief.next') }}
          <svg v-if="status !== 'sending'" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>
    </footer>
  </div>
</template>
