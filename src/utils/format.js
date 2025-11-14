const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0
})
const accentReplacements = [
  [/\u0111/g, 'd'],
  [/\u0110/g, 'D']
]
/** @param {number} value */
export 
function formatCurrency(value, currency = 'VND') {
  
return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value || 0)
}
/** @param {string} input */
export 
function removeAccents(input = '') {
  
if (!input)
return ''
let normalized = input.normalize('NFD').replace(/\p{Diacritic}/gu, '')
for (
const [regex, replacement] of accentReplacements) {
    normalized = normalized.replace(regex, replacement)
  }
return normalized
}
/** @param {string} input */
export 
function slugify(input = '') {
  
const clean = removeAccents(input).toLowerCase()
return clean
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
/** @template {(...args: any[]) => any} F */
export 
function debounce(fn, delay = 300) {
  
let timer
  
return 
function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
export 
function uid(prefix = 'id') {
  
return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
export 
function clamp(value, min, max) {
  
return Math.min(Math.max(value, min), max)
}
