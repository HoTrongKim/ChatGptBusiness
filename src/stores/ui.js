import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uid } from '@/utils/format.js'
const STORAGE_KEY = 'novashop-theme'
const THEME_DEFAULT = 'auto'
function applyTheme(theme) {
  
if (typeof document === 'undefined')
return
  
const root = document.documentElement
  
let next = theme
  
if (theme === 'auto') {
    
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    next = prefersDark ? 'dark' : 'light'
  }
  root.dataset.theme = next
}
export 
const useUiStore = defineStore('ui', () => {
  
const theme = ref(THEME_DEFAULT)
const toasts = ref([])
const loading = ref(false)
function bootstrapTheme() {
    
if (typeof window === 'undefined')
return
    
const stored = window.localStorage.getItem(STORAGE_KEY)
if (stored) {
      theme.value = stored
    }
    applyTheme(theme.value)
  }
function setTheme(nextTheme) {
    theme.value = nextTheme
    
if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }
    applyTheme(nextTheme)
  }
function toggleTheme(force) {
    
const next = force || (theme.value === 'dark' ? 'light' : theme.value === 'light' ? 'auto' : 'dark')
    setTheme(next)
  }
function showToast({ title, message, actionLabel, action }) {
    
const id = uid('toast')
const toast = { id, title, message, actionLabel, action }
    toasts.value = [...toasts.value, toast]
    
if (typeof window !== 'undefined') {
      window.setTimeout(() => dismissToast(id), 5000)
    }
  }
function dismissToast(id) {
    toasts.value = toasts.value.filter((item) => item.id !== id)
  }
return {
    theme,
    toasts,
    loading,
    bootstrapTheme,
    toggleTheme,
    showToast,
    dismissToast
  }
})
