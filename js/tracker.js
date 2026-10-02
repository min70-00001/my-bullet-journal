// ==========================================
// 📁 js/tracker.js
// 【 습관 】 탭 (해빗 트래커, 무드, 루틴 진행도, 건강 관리) 로직
// ==========================================

function subscribeHabitData() {
  if (typeof renderHabits === 'function') renderHabits();
  if (typeof renderDayHabitList === 'function') renderDayHabitList();

  if (!db) return;
  db.collection('habits_data').doc('master').get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      localStorage.setItem('mingle_habits', JSON.stringify(data.habits || []));
      localStorage.setItem('mingle_habit_logs', JSON.stringify(data.logs || {}));
      if (typeof renderHabits === 'function') renderHabits();
      if (typeof renderDayHabitList === 'function') renderDayHabitList();
    }
  }).catch(console.error);
}

// 습관 뷰 모드 전환 (주간 / 월간)
function setHabitViewMode(mode) {
  habitViewMode = mode;
  const weekSec = document.getElementById('habitWeekSection');
  const monthSec = document.getElementById('habitMonthSection');
  const btnWeek = document.getElementById('habitViewBtnWeek');
  const btnMonth = document.getElementById('habitViewBtnMonth');

  if (!weekSec) return;

  if (mode === 'week') {
    weekSec.classList.remove('hidden');
    monthSec.classList.add('hidden');
    if (btnWeek) btnWeek.className = 'px-2 py-0.5 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
    if (btnMonth) btnMonth.className = 'px-2 py-0.5 rounded-lg font-medium text-stone-500';
  } else {
    weekSec.classList.add('hidden');
    monthSec.classList.remove('hidden');
    if (btnMonth) btnMonth.className = 'px-2 py-0.5 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
    if (btnWeek) btnWeek.className = 'px-2 py-0.5 rounded-lg font-medium text-stone-500';
  }
}
