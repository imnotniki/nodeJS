document.addEventListener('DOMContentLoaded', () => {
  const timerInput = document.getElementById('timer-input');
  const startTimerButton = document.getElementById('start-timer');
  const notificationsCheckbox = document.getElementById('notifications');
  const timerDisplay = document.getElementById('timer-display');
  
  let timer;
  let timerInterval;
  
  // Check for existing settings in localStorage
  if (localStorage.getItem('allowNotifications') === 'true') {
    notificationsCheckbox.checked = true;
  }
  
  startTimerButton.addEventListener('click', () => {
    const minutes = parseInt(timerInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) return;
    
    clearInterval(timerInterval);
    timer = minutes * 60;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
      timer--;
      if (timer <= 0) {
        clearInterval(timerInterval);
      }
      updateTimerDisplay();
      
      if (notificationsCheckbox.checked && timer % 600 === 0) {
        showNotification();
      }
    }, 1000);
  });
  
  notificationsCheckbox.addEventListener('change', () => {
    localStorage.setItem('allowNotifications', notificationsCheckbox.checked);
  });
  
  function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  function showNotification() {
    if (Notification.permission === 'granted') {
      new Notification('Timer Update', {
        body: `Time remaining: ${timerDisplay.textContent}`
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  }
});

