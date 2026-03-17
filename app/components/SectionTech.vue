<script setup lang="ts">
const { t } = useI18n()

interface TechItem {
  key: string
  label: string
  logo: string
  image?: string
  imgClass?: string
  isEmpty?: boolean
}

interface TechGroup {
  labelKey: string
  cols: number
  items: TechItem[]
}

const groups: TechGroup[] = [
  {
    labelKey: 'tech.frontend',
    cols: 2,
    items: [
      { key: 'angular', label: 'ANGULAR', logo: 'A', image: '/languages/angular.png', imgClass: 'w-11 h-11' },
      { key: 'vue', label: 'VUE.JS', logo: 'V', image: '/languages/vue.webp', imgClass: 'w-11 h-11' },
      { key: 'react', label: 'REACT', logo: 'R', image: '/languages/react.png', imgClass: 'w-11 h-11' },
    ],
  },
  {
    labelKey: 'tech.backend',
    cols: 4,
    items: [
      { key: 'java', label: 'JAVA', logo: '☕', image: '/languages/java.png', imgClass: 'w-10 h-10' },
      { key: 'csharp', label: 'C#', logo: 'C#', image: '/languages/csharp.webp', imgClass: 'w-10 h-10' },
      { key: 'kotlin', label: 'KOTLIN', logo: 'K', image: '/languages/kotlin.png', imgClass: 'w-14 h-10' },
      { key: 'python', label: 'PYTHON', logo: 'Py', image: '/languages/python.webp', imgClass: 'w-10 h-10' },
      { key: 'spring', label: 'SPRING', logo: '🌿', image: '/languages/spring.webp', imgClass: 'w-16 h-12' },
      { key: 'node', label: 'NODE.JS', logo: 'N', image: '/languages/node.png', imgClass: 'w-10 h-10' },
      { key: 'dotnet', label: '.NET CORE', logo: '.N', image: '/languages/net-core.png', imgClass: 'w-16 h-12' },
      { key: 'php', label: 'PHP', logo: 'php', image: '/languages/php.png', imgClass: 'w-14 h-10' },
    ],
  },
  {
    labelKey: 'tech.ai',
    cols: 2,
    items: [
      { key: 'azure_openai', label: 'AZURE OPENAI', logo: 'AI' },
      { key: 'ollama', label: 'OLLAMA', logo: '🦙' },
    ],
  },
  {
    labelKey: 'tech.cloud',
    cols: 4,
    items: [
      { key: 'azure', label: 'AZURE', logo: 'Az' },
      { key: 'aws', label: 'AWS', logo: 'aws' },
      { key: 'gcp', label: 'GOOGLE CLOUD', logo: 'G' },
      { key: 'multicloud', label: 'MULTI-CLOUD', logo: '☁️' },
    ],
  },
]

// Pad groups so every row is full
function getPaddedItems(group: TechGroup): TechItem[] {
  const total = Math.ceil(group.items.length / group.cols) * group.cols
  const padded = [...group.items]
  while (padded.length < total) {
    padded.push({ key: `__empty_${padded.length}`, label: '', logo: '', isEmpty: true })
  }
  return padded
}

// Refs
const gridEls = ref<Record<number, HTMLElement>>({})
const cellEls = ref<Record<string, HTMLElement>>({})

// Active state
const activeGroupIdx = ref<number | null>(null)
const activeKey = ref<string | null>(null)
const activeLabel = ref('')
const activeLogo = ref('')
const activeImage = ref('')
const activeFromTop = ref(true)
const overlayPos = reactive({ top: '0px', left: '0px', width: '0px', height: '0px' })

function setGridRef(idx: number, el: any) {
  if (el) gridEls.value[idx] = el as HTMLElement
}

function setCellRef(groupIdx: number, cellIdx: number, el: any) {
  if (el) cellEls.value[`${groupIdx}-${cellIdx}`] = el as HTMLElement
}

function getExpansionBounds(cellIdx: number, cols: number, totalPadded: number) {
  const col = cellIdx % cols
  const row = Math.floor(cellIdx / cols)
  const totalRows = Math.ceil(totalPadded / cols)

  let startRow: number, startCol: number, endRow: number, endCol: number

  if (totalRows < 2) {
    // Single row → expand 2 cols horizontally
    startCol = Math.min(col, cols - 2)
    endCol = startCol + 1
    startRow = 0
    endRow = 0
  } else if (cols <= 2) {
    // 2-col grid → expand full column (both rows)
    startCol = col
    endCol = col
    startRow = 0
    endRow = totalRows - 1
  } else {
    // 4-col grid → expand 2×2 block
    startCol = Math.min(col, cols - 2)
    endCol = startCol + 1
    startRow = Math.min(row, totalRows - 2)
    endRow = startRow + 1
  }

  return {
    topLeft: startRow * cols + startCol,
    bottomRight: endRow * cols + endCol,
  }
}

const overlayEl = ref<HTMLElement | null>(null)

function onCellEnter(groupIdx: number, cellIdx: number, item: TechItem, group: TechGroup) {
  if (item.isEmpty) return
  // If overlay is already showing, ignore — user must leave the grid first
  if (activeKey.value !== null) return

  const grid = gridEls.value[groupIdx]
  if (!grid) return

  const padded = getPaddedItems(group)
  const bounds = getExpansionBounds(cellIdx, group.cols, padded.length)

  const tlEl = cellEls.value[`${groupIdx}-${bounds.topLeft}`]
  const brEl = cellEls.value[`${groupIdx}-${bounds.bottomRight}`]
  if (!tlEl || !brEl) return

  const gridRect = grid.getBoundingClientRect()
  const tlRect = tlEl.getBoundingClientRect()
  const brRect = brEl.getBoundingClientRect()

  const row = Math.floor(cellIdx / group.cols)
  const totalRows = Math.ceil(padded.length / group.cols)
  activeFromTop.value = row < totalRows / 2

  overlayPos.top = `${tlRect.top - gridRect.top}px`
  overlayPos.left = `${tlRect.left - gridRect.left}px`
  overlayPos.width = `${brRect.right - tlRect.left}px`
  overlayPos.height = `${brRect.bottom - tlRect.top}px`

  activeGroupIdx.value = groupIdx
  activeKey.value = item.key
  activeLabel.value = item.label
  activeLogo.value = item.logo
  activeImage.value = item.image || ''
}

function onGroupLeave(groupIdx: number) {
  if (activeGroupIdx.value === groupIdx) {
    activeGroupIdx.value = null
    activeKey.value = null
  }
}
</script>

<template>
  <section id="tech" class="section-padding bg-surface-50">
    <div class="max-w-7xl mx-auto">
      <h2 class="fade-up text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-16 text-center">
        {{ t('tech.title') }}
      </h2>

      <div class="grid lg:grid-cols-[1fr_2fr] gap-x-12 gap-y-16">
        <template v-for="(group, gi) in groups" :key="group.labelKey">
          <div>
            <h3 class="fade-up text-xl font-bold text-dark-900 tracking-tight">
              {{ t(group.labelKey) }}
            </h3>
          </div>

          <div
            class="fade-up relative overflow-hidden rounded-2xl"
            @mouseleave="onGroupLeave(gi)"
          >
            <!-- Grid -->
            <div
              :ref="(el: any) => setGridRef(gi, el)"
              class="grid gap-px bg-dark-200/40 rounded-2xl overflow-hidden border border-dark-200/40"
              :style="{ gridTemplateColumns: `repeat(${group.cols}, minmax(0, 1fr))` }"
            >
              <div
                v-for="(item, ii) in getPaddedItems(group)"
                :key="item.key"
                :ref="(el: any) => setCellRef(gi, ii, el)"
                class="bg-white min-h-[140px] flex flex-col items-center justify-center text-center p-6 md:p-8 cursor-default"
                :class="{ 'pointer-events-none': item.isEmpty }"
                @mouseenter="onCellEnter(gi, ii, item, group)"
              >
                <template v-if="!item.isEmpty">
                  <span class="text-[11px] font-bold tracking-widest text-dark-400 mb-3">
                    {{ item.label }}
                  </span>
                  <img v-if="item.image" :src="item.image" :alt="item.label" class="object-contain select-none" :class="item.imgClass || 'w-12 h-12'" />
                  <span v-else class="text-3xl md:text-4xl font-extrabold text-dark-800 select-none leading-none">
                    {{ item.logo }}
                  </span>
                </template>
              </div>
            </div>

            <!-- Floating overlay -->
            <div
              class="tech-overlay absolute z-20 pointer-events-none"
              :class="[
                activeGroupIdx === gi ? 'is-visible' : '',
                activeFromTop ? 'from-top' : 'from-bottom',
              ]"
              :style="{
                top: overlayPos.top,
                left: overlayPos.left,
                width: overlayPos.width,
                height: overlayPos.height,
              }"
            >
              <div class="h-full bg-gold-400 p-6 md:p-8 flex flex-col justify-between">
                <p
                  v-if="activeKey && activeGroupIdx === gi"
                  class="text-[14px] leading-relaxed text-dark-800 font-medium"
                >
                  {{ t(`tech.items.${activeKey}`) }}
                </p>
                <div class="flex items-end justify-between mt-4">
                  <img v-if="activeImage" :src="activeImage" :alt="activeLabel" class="w-14 h-14 md:w-18 md:h-18 object-contain select-none opacity-20" />
                  <span v-else class="text-5xl md:text-6xl font-extrabold text-dark-800/10 select-none leading-none">
                    {{ activeLogo }}
                  </span>
                  <span class="text-[11px] font-bold tracking-widest text-dark-500">
                    {{ activeLabel }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-overlay {
  opacity: 0;
  transition:
    top 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    left 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s ease,
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.tech-overlay.from-top {
  transform: translate(-20px, -30px) scale(0.85);
  transform-origin: top left;
}

.tech-overlay.from-bottom {
  transform: translate(-20px, 30px) scale(0.85);
  transform-origin: bottom left;
}

.tech-overlay.is-visible {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}
</style>
