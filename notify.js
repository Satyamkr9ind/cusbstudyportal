<script>
  function notifyAppOfChange(message) {
    const title = 'Page Updated';
    if (window.Android && typeof window.Android.showNotification === 'function') {
      Android.showNotification(title, message);
    }
  }

  let debounceTimer;

  const targetNode = document.body;

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
</script>
