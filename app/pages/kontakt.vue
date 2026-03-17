<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
useScrollReveal()

useHead({ title: t('contactPage.title') })
useSeoMeta({
  description: t('contactPage.subtitle'),
  ogTitle: t('contactPage.title'),
  ogDescription: t('contactPage.subtitle'),
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'error'>('idle')

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) return

  status.value = 'sending'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    await router.push(localePath('/danke'))
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-surface-50" />
      <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold-200/20 rounded-full blur-[120px]" />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-6">
            <span class="w-8 h-px bg-gold-600" />
            {{ t('contactPage.tag') }}
          </span>
          <h1 class="fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-900 tracking-tight leading-[1.1] mb-6" style="transition-delay: 0.1s">
            {{ t('contactPage.title') }}
          </h1>
          <p class="fade-up text-lg text-dark-400 leading-relaxed font-light max-w-lg" style="transition-delay: 0.2s">
            {{ t('contactPage.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contact form + info -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-[1fr_380px] gap-16">
          <!-- Form -->
          <div>
            <form class="space-y-6" @submit.prevent="handleSubmit">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="fade-up">
                  <label class="block text-[13px] font-semibold text-dark-900 mb-2">{{ t('contactPage.form.name') }} *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border border-dark-200 bg-white text-dark-900 text-[15px] placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all"
                    :placeholder="t('contactPage.form.namePlaceholder')"
                  />
                </div>
                <div class="fade-up" style="transition-delay: 0.05s">
                  <label class="block text-[13px] font-semibold text-dark-900 mb-2">{{ t('contactPage.form.email') }} *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border border-dark-200 bg-white text-dark-900 text-[15px] placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all"
                    :placeholder="t('contactPage.form.emailPlaceholder')"
                  />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="fade-up" style="transition-delay: 0.1s">
                  <label class="block text-[13px] font-semibold text-dark-900 mb-2">{{ t('contactPage.form.company') }}</label>
                  <input
                    v-model="form.company"
                    type="text"
                    class="w-full px-4 py-3.5 rounded-xl border border-dark-200 bg-white text-dark-900 text-[15px] placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all"
                    :placeholder="t('contactPage.form.companyPlaceholder')"
                  />
                </div>
                <div class="fade-up" style="transition-delay: 0.15s">
                  <label class="block text-[13px] font-semibold text-dark-900 mb-2">{{ t('contactPage.form.phone') }}</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3.5 rounded-xl border border-dark-200 bg-white text-dark-900 text-[15px] placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all"
                    :placeholder="t('contactPage.form.phonePlaceholder')"
                  />
                </div>
              </div>

              <div class="fade-up" style="transition-delay: 0.2s">
                <label class="block text-[13px] font-semibold text-dark-900 mb-2">{{ t('contactPage.form.message') }} *</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full px-4 py-3.5 rounded-xl border border-dark-200 bg-white text-dark-900 text-[15px] placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all resize-none"
                  :placeholder="t('contactPage.form.messagePlaceholder')"
                />
              </div>

              <!-- Error message -->
              <div v-if="status === 'error'" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
                {{ t('contactPage.form.error') }}
              </div>

              <div class="fade-up" style="transition-delay: 0.25s">
                <button
                  type="submit"
                  :disabled="status === 'sending'"
                  class="group inline-flex items-center gap-2.5 bg-dark-900 text-white font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-dark-800 transition-all hover:shadow-xl hover:shadow-dark-900/15 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span v-if="status === 'sending'">{{ t('contactPage.form.sending') }}</span>
                  <span v-else>{{ t('contactPage.form.submit') }}</span>
                  <svg v-if="status !== 'sending'" class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Sidebar -->
          <div class="lg:sticky lg:top-28 lg:self-start space-y-6">
            <!-- Email -->
            <div class="fade-up bg-surface-50 rounded-2xl p-6">
              <div class="w-11 h-11 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-dark-900 mb-1">{{ t('contactPage.info.email') }}</h3>
              <a href="mailto:info@consulsoft.de" class="text-[14px] text-dark-400 hover:text-gold-600 transition-colors">
                info@consulsoft.de
              </a>
            </div>

            <!-- Location -->
            <div class="fade-up bg-surface-50 rounded-2xl p-6" style="transition-delay: 0.05s">
              <div class="w-11 h-11 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-dark-900 mb-1">{{ t('contactPage.info.location') }}</h3>
              <p class="text-[14px] text-dark-400">{{ t('contactPage.info.address') }}</p>
            </div>

            <!-- Response time -->
            <div class="fade-up bg-dark-900 rounded-2xl p-6" style="transition-delay: 0.1s">
              <div class="w-11 h-11 bg-gold-400/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-white mb-1">{{ t('contactPage.info.responseTitle') }}</h3>
              <p class="text-[14px] text-dark-300 font-light">{{ t('contactPage.info.responseText') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
