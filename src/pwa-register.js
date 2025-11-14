import { registerSW as viteRegister } from 'virtual:pwa-register'
export 
function registerSW(options = {}) {
  
if (
import.meta.env.DEV || typeof window === 'undefined') {
    
return () => {}
  }
const updateSW = viteRegister({
    immediate: true,
    onNeedRefresh() {
      options.onNeedRefresh?.(updateSW)
    },
    onOfflineReady() {
      options.onOfflineReady?.()
    }
  })
return updateSW
}
