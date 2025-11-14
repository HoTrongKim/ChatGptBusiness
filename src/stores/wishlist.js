import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
const STORAGE_KEY = 'novashop-wishlist'
function load() {
  
if (typeof window === 'undefined')
return []
  
try {
    
const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
return Array.isArray(value) ? value : []
  }
catch {
    
return []
  }
}
export 
const useWishlistStore = defineStore('wishlist', () => {
  
const ids = ref(load())
function persist() {
    
if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.value))
    }
  }
function add(id) {
    
if (!ids.value.includes(id)) {
      ids.value.push(id)
      persist()
    }
  }
function remove(id) {
    ids.value = ids.value.filter((v) => v !== id)
    persist()
  }
function toggle(id) {
    
if (ids.value.includes(id)) {
      remove(id)
    }
else {
      add(id)
    }
  }
function clear() {
    ids.value = []
    persist()
  }
const count = computed(() => ids.value.length)
const has = (id) => ids.value.includes(id)
return { ids, count, add, remove, toggle, clear, has }
})
