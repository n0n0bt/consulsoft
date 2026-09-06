<script setup lang="ts">
/**
 * The signature element: the four surfaces we build on.
 *
 * Each surface carries a different, real piece of Mittelstand software — an
 * order desk, a stock ledger, a machine schedule, a service round — because we
 * do not ship one app everywhere; we build what the project needs. The shared
 * house style is what carries across, not the screen.
 *
 * Two of them show an automation doing work (a parsed order, a proposed
 * reschedule), so the hero answers "what do you build" and "how" at once.
 *
 * All live DOM: sharp at any density, zero image bytes.
 *
 * Width and height both derive from a single --ar variable: width is
 * stage-height x ar, and aspect-ratio returns the height to the stage height,
 * so every surface is exactly as tall as the stage and only the width animates.
 */
export type Surface = 'web' | 'macos' | 'windows' | 'mobile'

const props = defineProps<{ surface: Surface }>()

const isMobile = computed(() => props.surface === 'mobile')

const geometry = computed(() => (isMobile.value
  ? { '--ar': '0.513', '--radius': '2.125rem' }
  : { '--ar': '1.6', '--radius': props.surface === 'windows' ? '0.5rem' : '0.75rem' }))

const apps: Record<Surface, { name: string, heading: string, meta: string }> = {
  web: { name: 'Auftragsportal', heading: 'Aufträge', meta: 'KW 34' },
  macos: { name: 'Lagerverwaltung', heading: 'Lagerbestand', meta: 'Werk Naila' },
  windows: { name: 'Produktionsplanung', heading: 'Maschinenbelegung', meta: 'KW 34' },
  mobile: { name: 'Serviceeinsätze', heading: 'Heute', meta: 'Di, 25.8.' },
}
const app = computed(() => apps[props.surface])

// Order desk. One row arrived as a PDF and was read by an automation.
const orders = [
  { nr: 'A-2291', kunde: 'Möbel Wagner GmbH', termin: '04.09.', status: 'aktiv', label: 'In Arbeit', ki: false },
  { nr: 'A-2290', kunde: 'Bäckerei Lang', termin: '02.09.', status: 'offen', label: 'Offen', ki: true },
  { nr: 'A-2288', kunde: 'Metallbau Krug', termin: '29.08.', status: 'fertig', label: 'Fertig', ki: false },
  { nr: 'A-2287', kunde: 'Elektro Sommer', termin: '28.08.', status: 'fertig', label: 'Fertig', ki: false },
  { nr: 'A-2286', kunde: 'Holzbau Reiter', termin: '27.08.', status: 'fertig', label: 'Fertig', ki: true },
]

// Stock ledger. Fill bars read as levels, not as a chart.
const stock = [
  { artikel: 'Stahlrohr 40 × 2', platz: 'A2', menge: '1.240', pct: 78, warn: false },
  { artikel: 'Dichtung M8', platz: 'B1', menge: '38', pct: 9, warn: true },
  { artikel: 'Schraube M6 × 20', platz: 'A1', menge: '8.900', pct: 94, warn: false },
  { artikel: 'Alu-Profil 60', platz: 'C4', menge: '410', pct: 41, warn: false },
  { artikel: 'Lagerdeckel 25', platz: 'B3', menge: '126', pct: 23, warn: false },
]

// Machine schedule across a five-day week, laid out on a 10-column grid.
const schedule = [
  { maschine: 'Fräse 1', jobs: [{ start: 1, span: 3, nr: 'A-2291' }, { start: 5, span: 2, nr: 'A-2288' }] },
  { maschine: 'Drehbank 2', jobs: [{ start: 2, span: 4, nr: 'A-2290' }] },
  { maschine: 'Lackierung', jobs: [{ start: 4, span: 2, nr: 'A-2291' }, { start: 7, span: 3, nr: 'A-2287' }] },
  { maschine: 'Montage', jobs: [{ start: 1, span: 4, nr: 'A-2287' }] },
  { maschine: 'Prüfstand', jobs: [{ start: 6, span: 3, nr: 'A-2290' }] },
  { maschine: 'Sägerei', jobs: [{ start: 1, span: 2, nr: 'A-2288' }, { start: 6, span: 2, nr: 'A-2291' }] },
  { maschine: 'Schweißen', jobs: [{ start: 3, span: 3, nr: 'A-2287' }] },
  { maschine: 'Verpackung', jobs: [{ start: 8, span: 2, nr: 'A-2288' }] },
]

// Field service round.
const jobs = [
  { zeit: '08:30', kunde: 'Möbel Wagner', auftrag: 'Wartung Anlage 4', status: 'aktiv', label: 'Unterwegs' },
  { zeit: '11:00', kunde: 'Bäckerei Lang', auftrag: 'Störung Kühlung', status: 'offen', label: 'Geplant' },
  { zeit: '14:15', kunde: 'Metallbau Krug', auftrag: 'Inbetriebnahme', status: 'offen', label: 'Geplant' },
]

/**
 * Real glyphs in the window furniture. Placeholder squares read as an unfinished
 * mockup; a rail with dashboard, orders, calendar, reports and settings reads as
 * software someone actually uses.
 */
const RAIL = [
  ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],          // dashboard
  ['M4 7h16', 'M4 12h16', 'M4 17h10'],                                          // list
  ['M4 6h16v14H4z', 'M8 3v4', 'M16 3v4', 'M4 10h16'],                           // calendar
  ['M5 19v-7', 'M12 19V6', 'M19 19v-4'],                                        // reports
  ['M12 15a3 3 0 100-6 3 3 0 000 6z', 'M12 2v3M12 19v3M2 12h3M19 12h3', 'M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1'],
]

const TABBAR = [
  ['M4 11l8-7 8 7v9H4z'],                                                       // home
  ['M4 7h16', 'M4 12h16', 'M4 17h10'],                                          // list
  ['M4 6h16v14H4z', 'M8 3v4', 'M16 3v4'],                                       // calendar
  ['M12 12a4 4 0 100-8 4 4 0 000 8z', 'M4 20c1.8-3.2 4.6-4.8 8-4.8s6.2 1.6 8 4.8'],
]

const dots: Record<string, string> = {
  aktiv: 'bg-brass-500',
  offen: 'border border-chrome-400 bg-transparent',
  fertig: 'bg-ink',
}
</script>

<template>
  <div class="stage grid place-items-center" :style="{ '--stage-h': 'clamp(19rem, 38vw, 23rem)' }">
    <div
      class="frame relative overflow-hidden bg-white ring-1 ring-ink/[0.08] shadow-window
             transition-[width,border-radius] duration-[750ms] ease-surface"
      :data-surface="surface"
      :style="geometry"
    >
      <!-- ── Chrome ─────────────────────────────────────────────────────── -->
      <Transition name="chrome">
        <div v-if="surface === 'macos'" key="macos" class="chrome bg-[#EDEDF0]">
          <div class="flex items-center gap-[6px] pl-1">
            <span class="size-[11px] rounded-full bg-[#FF5F57]" />
            <span class="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span class="size-[11px] rounded-full bg-[#28C840]" />
          </div>
          <span class="absolute inset-x-0 text-center text-[12px] font-medium text-slate-500">{{ app.name }}</span>
        </div>

        <div v-else-if="surface === 'windows'" key="windows" class="chrome bg-[#F3F3F3]">
          <div class="flex items-center gap-2">
            <span class="grid size-[14px] place-items-center rounded-[4px] bg-brass-500 text-white">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h7v7H4zM13 13h7v7h-7z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" /></svg>
            </span>
            <span class="text-[12px] font-medium text-slate-500">{{ app.name }}</span>
          </div>
          <div class="ml-auto flex items-center gap-3 pr-0.5 text-slate-400">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M0 5h10" stroke="currentColor" stroke-width="1" /></svg>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1" /></svg>
            <svg width="10" height="10" viewBox="0 0 10 10" class="text-[#C42B1C]" aria-hidden="true"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" stroke-width="1.4" /></svg>
          </div>
        </div>

        <div v-else-if="surface === 'web'" key="web" class="absolute inset-x-0 top-0 z-10">
          <div class="flex h-[30px] items-end bg-[#E9EBEF] px-2">
            <div class="flex h-[25px] min-w-0 items-center gap-1.5 rounded-t-[7px] bg-white px-2.5">
              <span class="grid size-[11px] shrink-0 place-items-center rounded-[3px] bg-brass-500 text-white">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h7v7H4zM13 13h7v7h-7z" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" /></svg>
              </span>
              <span class="truncate text-[11px] text-slate-500">{{ app.name }}</span>
            </div>
          </div>
          <div class="flex h-[34px] items-center gap-2 border-b border-chrome-200 bg-white px-2.5">
            <div class="flex gap-1 text-chrome-400">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
            </div>
            <div class="flex h-[21px] flex-1 items-center gap-1.5 rounded-full bg-[#F1F3F5] px-2.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" class="shrink-0 text-slate-400" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2.5" />
                <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="2.5" />
              </svg>
              <span class="truncate text-[10.5px] text-slate-400">auftraege.ihre-firma.de</span>
            </div>
          </div>
        </div>

        <div v-else key="mobile" class="absolute inset-x-0 top-0 z-10 h-[38px]">
          <div class="absolute left-1/2 top-[7px] h-[22px] w-[68px] -translate-x-1/2 rounded-full bg-ink" />
          <div class="flex h-[30px] items-center justify-between px-5 pt-1.5">
            <span class="text-[10.5px] font-semibold tracking-tight text-ink">9:41</span>
            <div class="flex items-center gap-1 text-ink">
              <svg width="13" height="9" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true"><rect x="0" y="7" width="2.5" height="4" rx="0.6" /><rect x="4" y="5" width="2.5" height="6" rx="0.6" /><rect x="8" y="2.5" width="2.5" height="8.5" rx="0.6" /><rect x="12" y="0" width="2.5" height="11" rx="0.6" /></svg>
              <span class="ml-0.5 inline-block h-[9px] w-[17px] rounded-[3px] border border-ink/40 p-[1.5px]"><span class="block h-full w-[70%] rounded-[1px] bg-ink" /></span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ── Application: shared house style, different software per surface ── -->
      <div
        class="absolute inset-x-0 bottom-0 flex bg-white"
        :class="surface === 'web' ? 'top-16' : isMobile ? 'top-[38px]' : 'top-[34px]'"
      >
        <aside v-if="!isMobile" class="rail flex w-11 shrink-0 flex-col items-center gap-1.5 border-r border-chrome-200 bg-paper py-3">
          <span
            v-for="(icon, i) in RAIL"
            :key="i"
            class="grid size-7 place-items-center rounded-[8px]"
            :class="i === 0 ? 'bg-brass-500 text-white' : 'text-chrome-400'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path v-for="(d, n) in icon" :key="n" :d="d" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </aside>

        <div class="flex min-w-0 flex-1 flex-col overflow-hidden" :class="isMobile ? 'px-3 pt-2.5' : 'px-4 pt-3'">
          <!-- Header -->
          <div class="flex shrink-0 items-baseline justify-between gap-2">
            <h3 class="truncate font-display font-semibold tracking-tight text-ink" :class="isMobile ? 'text-[14px]' : 'text-[15px]'">
              {{ app.heading }}
            </h3>
            <span class="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-400">{{ app.meta }}</span>
          </div>

          <!-- ── WEB · order desk ─────────────────────────────────────── -->
          <template v-if="surface === 'web'">
            <div class="mt-2.5 flex shrink-0 items-center gap-1.5">
              <span class="rounded-full bg-ink px-2 py-[3px] text-[9px] font-medium text-white">Alle</span>
              <span class="rounded-full border border-chrome-300 px-2 py-[3px] text-[9px] text-slate-400">Offen</span>
              <span class="rounded-full border border-chrome-300 px-2 py-[3px] text-[9px] text-slate-400">Fällig</span>
            </div>

            <div class="mt-2.5 grid grid-cols-[3.4rem_1fr_2.6rem_4.4rem] gap-x-2 border-b border-chrome-200 pb-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-slate-300">
              <span>Nr.</span><span>Kunde</span><span>Termin</span><span>Status</span>
            </div>

            <ul class="min-h-0 flex-1 overflow-hidden">
              <li
                v-for="(o, i) in orders"
                :key="o.nr"
                class="row grid grid-cols-[3.4rem_1fr_2.6rem_4.4rem] items-center gap-x-2 border-b border-chrome-100 py-[7px] text-[10.5px]"
                :style="{ '--i': i }"
              >
                <span class="font-mono text-[9.5px] text-slate-400">{{ o.nr }}</span>
                <span class="flex min-w-0 items-center gap-1.5">
                  <span class="truncate text-ink">{{ o.kunde }}</span>
                  <span v-if="o.ki" class="ki shrink-0 rounded-full bg-brass-50 px-1.5 py-px font-mono text-[8px] uppercase tracking-[0.06em] text-brass-600">KI erfasst</span>
                </span>
                <span class="text-slate-400">{{ o.termin }}</span>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <span class="size-[6px] shrink-0 rounded-full" :class="dots[o.status]" />
                  <span class="truncate">{{ o.label }}</span>
                </span>
              </li>
            </ul>

            <div class="ki -mx-4 mt-auto flex shrink-0 items-center justify-between border-t border-chrome-200 bg-paper px-4 py-[7px] font-mono text-[8.5px] uppercase tracking-[0.06em] text-slate-400">
              <span>24 offen · 12 in Arbeit</span>
              <span><span class="text-brass-600">2 Aufträge</span> automatisch erfasst</span>
            </div>
          </template>

          <!-- ── macOS · stock ledger ─────────────────────────────────── -->
          <template v-else-if="surface === 'macos'">
            <div class="mt-2.5 flex h-[22px] shrink-0 items-center gap-1.5 rounded-md border border-chrome-200 bg-paper px-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" class="shrink-0 text-slate-300" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2.5" /><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" /></svg>
              <span class="text-[10px] text-slate-300">Artikel oder Lagerplatz…</span>
            </div>

            <ul class="mt-2 min-h-0 flex-1 overflow-hidden">
              <li
                v-for="(s, i) in stock"
                :key="s.artikel"
                class="row grid grid-cols-[1fr_2.6rem_5rem] items-center gap-x-2.5 border-b border-chrome-100 py-[6px] text-[10.5px]"
                :style="{ '--i': i }"
              >
                <span class="min-w-0">
                  <span class="block truncate text-ink">{{ s.artikel }}</span>
                  <span class="font-mono text-[8.5px] uppercase tracking-[0.06em] text-slate-300">Platz {{ s.platz }}</span>
                </span>
                <span class="h-[5px] w-full overflow-hidden rounded-full bg-chrome-200">
                  <span class="block h-full rounded-full" :class="s.warn ? 'bg-brass-500' : 'bg-chrome-400'" :style="{ width: s.pct + '%' }" />
                </span>
                <span class="text-right">
                  <span class="block tabular-nums text-ink">{{ s.menge }}</span>
                  <span v-if="s.warn" class="block whitespace-nowrap font-mono text-[8px] uppercase tracking-normal text-brass-600">Nachbestellen</span>
                </span>
              </li>
            </ul>

            <!-- Status bar, the way a real desktop tool closes its window -->
            <div class="ki -mx-4 mt-auto flex shrink-0 items-center justify-between border-t border-chrome-200 bg-paper px-4 py-[7px] font-mono text-[8.5px] uppercase tracking-[0.06em] text-slate-400">
              <span>1.284 Artikel</span>
              <span><span class="text-brass-600">1 Position</span> unter Meldebestand</span>
            </div>
          </template>

          <!-- ── Windows · machine schedule ───────────────────────────── -->
          <template v-else-if="surface === 'windows'">
            <div class="mt-2.5 grid shrink-0 grid-cols-[3.9rem_repeat(10,1fr)] gap-x-1 font-mono text-[8.5px] uppercase tracking-[0.06em] text-slate-300">
              <span />
              <span v-for="(d, n) in ['Mo', '', 'Di', '', 'Mi', '', 'Do', '', 'Fr', '']" :key="n" class="text-center">{{ d }}</span>
            </div>

            <ul class="mt-1.5 min-h-0 flex-1 overflow-hidden">
              <li
                v-for="(r, i) in schedule"
                :key="r.maschine"
                class="row grid grid-cols-[3.9rem_repeat(10,1fr)] items-center gap-x-1 border-b border-chrome-100 py-[6px]"
                :style="{ '--i': i }"
              >
                <span class="truncate text-[10px] text-slate-500">{{ r.maschine }}</span>
                <span
                  v-for="j in r.jobs"
                  :key="j.nr + j.start"
                  class="flex h-[15px] items-center justify-center overflow-hidden rounded-[3px] bg-chrome-300 font-mono text-[8px] text-ink/70"
                  :style="{ gridColumn: (j.start + 1) + ' / span ' + j.span }"
                >{{ j.nr }}</span>
              </li>
            </ul>

            <!-- The automation proposing a better slot -->
            <div class="ki mb-2.5 mt-1.5 flex shrink-0 items-center gap-1.5 rounded-md border border-dashed border-brass-300 bg-brass-50 px-2 py-[5px]">
              <span class="size-[5px] shrink-0 rounded-full bg-brass-500" />
              <span class="truncate font-mono text-[8.5px] uppercase tracking-[0.06em] text-brass-600">KI-Vorschlag: Fräse 1 zwei Stunden früher</span>
            </div>
          </template>

          <!-- ── Mobile · service round ───────────────────────────────── -->
          <template v-else>
            <ul class="mt-2.5 min-h-0 flex-1 space-y-1.5 overflow-hidden">
              <li
                v-for="(j, i) in jobs"
                :key="j.zeit"
                class="row rounded-lg border border-chrome-200 px-2.5 py-2"
                :class="j.status === 'aktiv' && 'border-brass-200 bg-brass-50'"
                :style="{ '--i': i }"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="font-mono text-[10px] tabular-nums text-ink">{{ j.zeit }}</span>
                  <span class="flex items-center gap-1 text-[8.5px] uppercase tracking-[0.06em] text-slate-400">
                    <span class="size-[5px] rounded-full" :class="dots[j.status]" />{{ j.label }}
                  </span>
                </div>
                <p class="mt-1 truncate text-[11px] font-medium text-ink">{{ j.kunde }}</p>
                <p class="truncate text-[9.5px] text-slate-400">{{ j.auftrag }}</p>
              </li>
            </ul>

            <div class="my-2 flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink py-[7px] text-[10px] font-medium text-white">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="2" /></svg>
              Navigation starten
            </div>

            <div class="-mx-3 flex shrink-0 items-center justify-around border-t border-chrome-200 px-3 pb-3.5 pt-2">
              <span v-for="(icon, i) in TABBAR" :key="i" :class="i === 0 ? 'text-brass-500' : 'text-chrome-400'">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path v-for="(d, n) in icon" :key="n" :d="d" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </template>
        </div>
      </div>

      <div v-if="isMobile" class="absolute bottom-1.5 left-1/2 h-[3.5px] w-[92px] -translate-x-1/2 rounded-full bg-ink/25" />
    </div>
  </div>
</template>

<style scoped>
.frame {
  --ar-eff: var(--ar);
  width: min(100%, calc(var(--stage-h) * var(--ar-eff)));
  aspect-ratio: var(--ar-eff);
  border-radius: var(--radius);
  container-type: inline-size;
}

/* On a phone the 16:10 surfaces get too short for a table, so they take a
   taller ratio there. The phone surface is already tall and keeps its own. */
@media (max-width: 40rem) {
  .frame:not([data-surface='mobile']) {
    --ar-eff: 1.1;
  }
}

.chrome {
  @apply absolute inset-x-0 top-0 z-10 flex h-[34px] items-center border-b border-black/[0.07] px-3;
}

.chrome-enter-active,
.chrome-leave-active {
  transition: opacity 0.32s ease;
}

.chrome-enter-from,
.chrome-leave-to {
  opacity: 0;
}

.chrome-leave-active {
  position: absolute;
  inset-inline: 0;
  top: 0;
}

/* Rows settle in sequence, so a surface change reads as a screen loading
   rather than as decoration. */
.row,
.ki {
  animation: row-in 0.42s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: calc(var(--i, 5) * 55ms);
}

@keyframes row-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

/* Narrow frame — the phone surface, and the desktop surfaces once a small
   viewport has squeezed them. Reacts to the frame's own width, not the page's. */
@container (max-width: 27rem) {
  .rail { display: none; }
}
</style>
