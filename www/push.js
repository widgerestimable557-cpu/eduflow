const VAPID_PUBLIC_KEY = 'BM05c4rMGSjfoFKS2gkYd6EFjaGvokvwnvc5W54OgeNJ2RsPGMLayjs6DLT29oHuNtBx0MAN8orzckdzAxF12GM';
const GAS_SUBSCRIBE_URL = 'https://script.google.com/macros/s/AKfycbwn_52M5pMF53wvo1NhL1REc7oYFaKCIjZDUNIsClqQYYasyBe9y6-S5pFoygnqtv2y/exec';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}

async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push non supporté sur ce navigateur');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('Permission notifications refusée');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    const response = await fetch(GAS_SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'subscribe', subscription: subscription })
    });

    console.log('✅ Notifications EduFlow activées');
  } catch (err) {
    console.error('Erreur abonnement push:', err);
  }
}

window.addEventListener('load', subscribeToPush);
