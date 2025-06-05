const log = document.getElementById("log_root");

export function notify(message, type = "info") {
  if (!log) {
    console.warn("log element not found.");
    return;
  }

  const notification = document.createElement("span");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  log.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}
