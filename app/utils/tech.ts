/**
 * Single source of truth for technology marks. Three components render stacks;
 * keeping the id → label map here stops them drifting apart as the stack changes.
 */
export const TECH: Record<string, string> = {
  vue: 'Vue.js',
  react: 'React',
  typescript: 'TypeScript',
  go: 'Go',
  csharp: 'C#',
  'net-core': '.NET',
  kotlin: 'Kotlin',
  swift: 'Swift',
  python: 'Python',
  node: 'Node.js',
  electron: 'Electron',
  tauri: 'Tauri',
  postgresql: 'PostgreSQL',
}

export const techSrc = (id: string) => `/languages/${id}.webp`
