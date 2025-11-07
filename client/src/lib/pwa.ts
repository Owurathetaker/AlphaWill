export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registered:', registration.scope);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function setupInstallPrompt(
  onInstallable: (prompt: () => Promise<void>) => void
) {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    onInstallable(() => deferredPrompt?.prompt() || Promise.resolve());
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    deferredPrompt = null;
  });
}
