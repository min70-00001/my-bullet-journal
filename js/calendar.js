// ==========================================
// 📁 js/calendar.js
// 【 일정 】 탭 (달력 렌더링, 일정/기념일/예매 카드) 로직
// ==========================================

function renderCalendarPage() {
  const container = document.getElementById('calendar-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="calendar-box" style="background:#fff; padding:20px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <button style="border:none; background:none; font-size:18px; color:#8b6b4a; cursor:pointer;">◀</button>
        <h2 style="color:#4a4a4a; font-weight:700; font-size:18px;">2026년 10월</h2>
        <button style="border:none; background:none; font-size:18px; color:#8b6b4a; cursor:pointer;">▶</button>
      </div>
      
      <div style="text-align:center; color:#888; font-size:14px; padding:30px 10px; border:1px dashed #ddd; border-radius:10px;">
        여기에 요일 통일(목, 토)이 적용된<br>예쁜 달력 그리드가 렌더링될 자리야! 🗓️
      </div>
    </div>
    
    <div style="margin-top:20px;">
      <h3 style="font-size:16px; margin-bottom:10px; color:#555;">🎟️ 다가오는 일정</h3>
      <div style="background:#fff; padding:15px; border-radius:15px; border-left:4px solid #8b6b4a; box-shadow:0 2px 8px rgba(0,0,0,0.05); margin-bottom:10px;">
        <p style="font-weight:600; color:#333;">[예시] 칭구랑 카페 투어 ☕</p>
        <p style="font-size:12px; color:#888; margin-top:5px;">2026.10.15 (목) <span style="color:#d9534f; font-weight:bold;">D-13</span></p>
      </div>
    </div>
  `;
}

// 페이지 로드 시 달력 화면 뼈대 그리기
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderCalendarPage();
  }, 500);
});
