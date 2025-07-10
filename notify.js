function notifyAppOfChange(message) {
  const title = 'Official Notice';
  if (window.Android && typeof window.Android.showNotification === 'function') {
    Android.showNotification(title, message);
  }
}

let debounceTimer;

const targetNode = document.getElementById('notificationContent');

if (targetNode) {
  const observer = new MutationObserver((mutationsList) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      notifyAppOfChange('New content is uploaded... check it out !');
    }, 1000);
  });

  observer.observe(targetNode, {
    childList: true,
    characterData: true,
    subtree: true
  });
} else {
  console.warn('Element with id "officialNotification" not found.');
}
