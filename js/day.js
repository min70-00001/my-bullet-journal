// ==========================================
// 📁 js/day.js
// 【 오늘 】 탭 및 날짜 이동·데이터 동기화 엔진 (완전판)
// ==========================================

// 1. 한국 시간(KST) 기준 오늘 날짜 생성기
function getLocalTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const REAL_TODAY_STR = getLocalTodayStr();
let currentDate = REAL_TODAY_STR;

// 2. 날짜 변경 및 오늘로 점프
function updateDateLabel() {
  const parts = currentDate.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
  const ymLabel = document.getElementById('currentYearMonthLabel');
  const dateLabel = document.getElementById('currentDateLabel');
  if (ymLabel) ymLabel.innerText = `${d.getFullYear()}. ${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}`;
  if (dateLabel) dateLabel.innerText = `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}`;

  const btn = document.getElementById('todayJumpBtn');
  if (btn) {
    if (currentDate !== REAL_TODAY_STR) btn.classList.remove('hidden');
    else btn.classList.add('hidden');
  }
}

function changeDate(delta) {
  const parts = currentDate.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) + delta);
  const mStr = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
  const dStr = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
  currentDate = `${d.getFullYear()}-${mStr}-${dStr}`;
  
  const inputEl = document.getElementById('currentDateInput');
  if (inputEl) inputEl.value = currentDate;
  
  updateDateLabel();
  if (typeof subscribeDayData === 'function') subscribeDayData(currentDate);
  if (typeof subscribeTodayTasks === 'function') subscribeTodayTasks(currentDate);
}

function jumpToRealToday() {
  currentDate = REAL_TODAY_STR;
  const inputEl = document.getElementById('currentDateInput');
  if (inputEl) inputEl.value = currentDate;
  
  updateDateLabel();
  if (typeof subscribeDayData === 'function') subscribeDayData(currentDate);
  if (typeof subscribeTodayTasks === 'function') subscribeTodayTasks(currentDate);
}

function onDateChanged(val) {
  currentDate = val;
  updateDateLabel();
  if (typeof subscribeDayData === 'function') subscribeDayData(currentDate);
  if (typeof subscribeTodayTasks === 'function') subscribeTodayTasks(currentDate);
}

// 3. 앱 실행 시 최초 구동 설정
window.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('currentDateInput');
  if (inputEl) inputEl.value = currentDate;
  updateDateLabel();
  
  if (typeof subscribeTodayTasks === 'function') subscribeTodayTasks(currentDate);
  if (typeof subscribeHabitData === 'function') subscribeHabitData();
});
