// ===== 即時時間更新 =====
function updateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById("time").textContent = 
    `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 每分鐘更新一次
setInterval(updateTime, 1000 * 60);
updateTime(); // 初始載入

// ===== 分頁切換功能 =====
document.querySelectorAll("a[data-target]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    // 使用 link 取得 data-target，避免點擊子元素抓不到
    const targetId = link.getAttribute("data-target");

    // 隱藏所有分頁
    document.querySelectorAll(".page").forEach(page => {
      page.classList.remove("active");
    });

    // 顯示目標分頁
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
      targetPage.classList.add("active");
    }
  });
});

