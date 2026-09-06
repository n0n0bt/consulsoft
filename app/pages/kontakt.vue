<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

useScrollReveal()

useHead({ title: () => t('contactPage.title') })
useSeoMeta({
  description: () => t('contactPage.subtitle'),
  ogTitle: () => t('contactPage.title'),
  ogDescription: () => t('contactPage.subtitle'),
})

const form = reactive({ name: '', email: '', company: '', phone: '', message: '' })
const status = ref<'idle' | 'sending' | 'error'>('idle')

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) return
  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    await router.push(localePath('/danke'))
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('contactPage.tag')"
      :title="t('contactPage.title')"
      :lede="t('contactPage.subtitle')"
    />

    <section class="shell py-20 sm:py-24">
      <div class="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <!-- Form -->
        <form class="reveal" novalidate @submit.prevent="handleSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="field-label">{{ t('contactPage.form.name') }} *</label>
              <input id="name" v-model="form.name" type="text" required autocomplete="name" class="field" :placeholder="t('contactPage.form.namePlaceholder')">
            </div>
            <div>
              <label for="email" class="field-label">{{ t('contactPage.form.email') }} *</label>
              <input id="email" v-model="form.email" type="email" required autocomplete="email" class="field" :placeholder="t('contactPage.form.emailPlaceholder')">
            </div>
            <div>
              <label for="company" class="field-label">{{ t('contactPage.form.company') }}</label>
              <input id="company" v-model="form.company" type="text" autocomplete="organization" class="field" :placeholder="t('contactPage.form.companyPlaceholder')">
            </div>
            <div>
              <label for="phone" class="field-label">{{ t('contactPage.form.phone') }}</label>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" class="field" :placeholder="t('contactPage.form.phonePlaceholder')">
            </div>
          </div>

          <div class="mt-5">
            <label for="message" class="field-label">{{ t('contactPage.form.message') }} *</label>
            <textarea id="message" v-model="form.message" rows="6" required class="field resize-y" :placeholder="t('contactPage.form.messagePlaceholder')" />
          </div>

          <!-- Errors state what happened and what to do, in the interface's voice -->
          <p v-if="status === 'error'" role="alert" class="mt-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-[0.9375rem] text-red-800">
            {{ t('contactPage.form.error') }}
          </p>

          <button type="submit" class="btn-ink mt-7 w-full sm:w-auto" :disabled="status === 'sending'" :class="status === 'sending' && 'opacity-60'">
            {{ status === 'sending' ? t('contactPage.form.sending') : t('contactPage.form.submit') }}
            <svg v-if="status !== 'sending'" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </form>

        <!-- Direct routes, for people who would rather not use a form -->
        <aside class="reveal space-y-8 lg:border-l lg:border-chrome-200 lg:pl-12">
          <div>
            <p class="eyebrow">{{ t('contactPage.info.email') }}</p>
            <a href="mailto:info@consulsoft.de" class="mt-3 block text-[1.0625rem] font-medium text-ink underline-offset-4 transition hover:text-brass-600 hover:underline">
              info@consulsoft.de
            </a>
          </div>

          <div>
            <p class="eyebrow">{{ t('contactPage.info.location') }}</p>
            <address class="mt-3 text-[0.9375rem] not-italic leading-relaxed text-slate-500">
              Consulsoft UG (haftungsbeschränkt)<br>
              Nailaer Str. 39<br>
              95119 Naila
            </address>
          </div>

          <div class="rounded-card border border-chrome-200 bg-white p-6">
            <p class="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
              {{ t('contactPage.info.responseTitle') }}
            </p>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
              {{ t('contactPage.info.responseText') }}
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
