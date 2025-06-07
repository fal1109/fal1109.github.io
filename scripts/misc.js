function updateBangladeshTime() {
    const now = new Date();
    const bangladeshTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    const hours = bangladeshTime.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = bangladeshTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const ampm = bangladeshTime.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    document.getElementById("time").textContent = formattedTime;
}
setInterval(updateBangladeshTime, 1000);
updateBangladeshTime();



  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
      loadingScreen.style.display = 'none';
      }
    }, 1000);
    });