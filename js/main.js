const firebaseConfig = {
      apiKey: "AIzaSyAXwjdZmy6Ij62RVyKww9UUalgUynyBqaA",
      authDomain: "mingle-bullet-journal.firebaseapp.com",
      projectId: "mingle-bullet-journal",
      storageBucket: "mingle-bullet-journal.firebasestorage.app",
      messagingSenderId: "975275683110",
      appId: "1:975275683110:web:638400c7bdcdc0cd6f25e7",
      measurementId: "G-5TGYM6V8LQ"
    };

    // 대한민국 법정 공휴일 & 대체휴일 DB
    const KR_HOLIDAYS = {
      "01-01": "신정",
      "03-01": "삼일절",
      "05-05": "어린이날",
      "06-06": "현충일",
      "08-15": "광복절",
      "10-03": "개천절",
      "10-09": "한글날",
      "12-25": "크리스마스",
      "2026-02-16": "설날연휴",
      "2026-02-17": "설날",
      "2026-02-18": "설날연휴",
      "2026-05-24": "부처님오신날",
      "2026-05-25": "대체휴일",
      "2026-09-24": "추석연휴",
      "2026-09-25": "추석",
      "2026-09-26": "추석연휴",
      "2026-10-05": "대체휴일"
    };

    // 7대 우선순위 약속/일정 카테고리 정의
    const EVENT_CATEGORIES = [
      { key: 'family', label: '가족모임', icon: '🏠', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
      { key: 'pet', label: '반려케어', icon: '🐾', bg: 'bg-stone-200 text-stone-800 border-stone-300' },
      { key: 'friend', label: '친구모임', icon: '☕', bg: 'bg-orange-100 text-orange-900 border-orange-300' },
      { key: 'bookclub', label: '독서모임', icon: '📖', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
      { key: 'vacation', label: '휴가여행', icon: '✈️', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
      { key: 'work', label: '업무외근', icon: '💼', bg: 'bg-sky-100 text-sky-900 border-sky-300' },
      { key: 'etc', label: '기타약속', icon: '⭐', bg: 'bg-rose-100 text-rose-900 border-rose-300' }
    ];

const CATEGORY_STYLES = {
  routine: 'border-amber-300 bg-amber-100 text-amber-900 font-bold',
  meal: 'border-orange-300 bg-orange-100 text-orange-900 font-bold',
  focus: 'border-emerald-300 bg-emerald-100 text-emerald-900 font-bold',
  hobby: 'border-rose-300 bg-rose-100 text-rose-900 font-bold',
  bookclub: 'border-indigo-300 bg-indigo-100 text-indigo-900 font-bold',
  selfcare: 'border-[#dac9ba] bg-[#f0e6dd] text-[#5c493c] font-bold',
  workout: 'border-sky-300 bg-sky-100 text-sky-900 font-bold',
  custom: 'border-stone-300 bg-stone-200 text-stone-800 font-bold',
  event: 'border-rose-300 bg-rose-100 text-rose-900 font-bold',
  dog: 'border-amber-400 bg-amber-100 text-amber-950 font-bold',
  cat: 'border-purple-300 bg-purple-100 text-purple-900 font-bold',
  etc: 'border-stone-300 bg-stone-100 text-stone-800 font-bold'
};

const TIMELINE_MARKER_STYLES = {
  routine: 'border-l-4 border-amber-400 bg-amber-50/90 text-amber-950',
  meal: 'border-l-4 border-orange-400 bg-orange-50/90 text-orange-950',
  focus: 'border-l-4 border-emerald-400 bg-emerald-50/90 text-emerald-950',
  hobby: 'border-l-4 border-rose-400 bg-rose-50/90 text-rose-950',
  bookclub: 'border-l-4 border-indigo-400 bg-indigo-50/90 text-indigo-950',
  selfcare: 'border-l-4 border-[#b89b82] bg-[#fdf9f5] text-[#5c493c]',
  workout: 'border-l-4 border-sky-400 bg-sky-50/90 text-sky-950',
  custom: 'border-l-4 border-stone-400 bg-stone-100 text-stone-800',
  event: 'border-l-4 border-rose-400 bg-rose-50/90 text-rose-950',
  dog: 'border-l-4 border-amber-400 bg-amber-50/90 text-amber-950',
  cat: 'border-l-4 border-purple-400 bg-purple-50/90 text-purple-950',
  etc: 'border-l-4 border-stone-400 bg-stone-50/90 text-stone-900'
};

const SUB_CATEGORIES = {
  routine: { title: '☀ 일상 세부 항목', items: ['기상', '출근준비', '샤워', '목욕', '취침준비', '정리'] },
  focus: { title: '💻 집중/일 세부 항목', items: ['출근', '업무', '회의', '공부', '퇴근'] },
  meal: { title: '🥗 식사 세부 항목', items: ['아침', '점심', '저녁', '간식', '커피', '외식'] },
  hobby: { title: '🎨 취미 세부 항목', items: ['뜨개', '독서', '그림', '쇼핑'] },
  selfcare: { title: '🌿 자기관리 세부 항목', items: ['일기', '명상', '스트레칭', '스킨케어'] },
  workout: { title: '🏃 운동 세부 항목', items: ['산책', '러닝', '홈트', '헬스'] },
  event: { title: '🎉 이벤트 세부 항목', items: ['약속', '생일', '외출', '모임', '파티'] },
  dog: { title: '🐶 멍멍 세부 항목', items: ['산책', '사료', '간식', '놀아주기', '배변/케어', '병원'] },
  cat: { title: '🐱 냥냥 세부 항목', items: ['사료', '간식', '사냥놀이', '화장실청소', '빗질', '병원'] },
  etc: { title: '💭 기타 세부 항목', items: ['자유기록', '돌발', '정리', '기타'] }
};

    const MOOD_META = {
      happy: { icon: '🥰', label: '최고', bg: 'bg-amber-100 border-amber-300 text-amber-900' },
      calm: { icon: '🌿', label: '평온', bg: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
      soso: { icon: '⛅', label: '보통', bg: 'bg-sky-100 border-sky-300 text-sky-900' },
      tired: { icon: '🌧️', label: '지침', bg: 'bg-stone-200 border-stone-300 text-stone-700' },
      proud: { icon: '✨', label: '뿌듯', bg: 'bg-rose-100 border-rose-300 text-rose-900' },
      gloomy: { icon: '💧', label: '우울', bg: 'bg-indigo-100 border-indigo-300 text-indigo-900' },
      sad: { icon: '😢', label: '슬픔', bg: 'bg-blue-100 border-blue-300 text-blue-900' },
      sick: { icon: '🩹', label: '아픔', bg: 'bg-red-100 border-red-300 text-red-900' }
    };

    // 은은한 모노톤 SVG 연필 수정 아이콘 생성기
    const EDIT_SVG_ICON = `
      <svg class="w-3 h-3 text-stone-400 hover:text-stone-700 fill-none stroke-current stroke-2 inline-block shrink-0 transition-colors" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    `;

    const now = new Date();
    const REAL_TODAY_STR = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    let currentDate = localStorage.getItem('mingle_last_view_date') || REAL_TODAY_STR;


    let calYear = new Date().getFullYear();
    let calMonth = new Date().getMonth();
    let moodYear = new Date().getFullYear();
    let moodMonth = new Date().getMonth();
    let habitYear = new Date().getFullYear();
    let habitMonth = new Date().getMonth();
    let routineYear = new Date().getFullYear();
    let routineMonth = new Date().getMonth();
    let healthYear = new Date().getFullYear();
    let healthMonth = new Date().getMonth();

    let timetableViewMode = 'grid';
    let habitViewMode = 'week';
    let anniversaryFilterMode = '30';
    let eventFilterMode = '30';
    let ticketFilterMode = '30';

    let selectedCalEventCategory = 'family';
    let calEventRepeatDays = [];
    let selectedTicketType = 'bus';
    let activePlaceInputId = 'ticketDepartPlace';
    let editingEventId = null;
    let editingTicketId = null;
    let manualTimeTarget = { text: '독서', cat: 'hobby' };

    let db = null;
    let activeHourStr = null;
    let activeBlockIdx = null;
    let selectedDurationMinutes = 10;
    let currentSelectedCategoryKey = null;

    let selectedWeeklyDays = [];
    let knitTimerStartTime = null;
    let bookTimerStartTime = null;
    let routineModalTarget = 'morning';

    let unsubscribeDay = null;
    let unsubscribeTasks = null;
    let unsubscribeBooks = null;
    let unsubscribeKnits = null;
    let unsubscribeHabits = null;
    let unsubscribeRoutines = null;
    let unsubscribeCalEvents = null;
    let unsubscribeTickets = null;
    let unsubscribeRoutineDef = null;

    window.addEventListener('DOMContentLoaded', () => {
  // 이전 접속 탭 안전 복원
  setTimeout(() => {
    try {
      const saved = localStorage.getItem('mingle_active_tab');
      if (saved && typeof switchTab === 'function') {
        switchTab(saved);
      }
    } catch (e) {}
  }, 100);
      initFirebase();
      document.getElementById('currentDateInput').value = currentDate;
      updateDateLabel();
      initTimetableGrid();
      initCalEventCategoryButtons();
      renderFavPlaceChips();
      renderOotdChips();
      
      subscribeDayData(currentDate);
      subscribeTodayTasks(currentDate);
      subscribeArchives();
      subscribeHabitData();
      subscribeRoutineMaster();
      subscribeCalendarEvents();
      subscribeTicketData();
      subscribeRoutineDefinitions();
      subscribeAccountBookSettings();
      subscribeAnniversaries();
      subscribeClosetData();
      subscribeNotesData();

      renderMealSection();
      renderDailySupplements();
      renderCalendar();
      renderAnniversaries();
      renderUpcomingEvents();
      renderMoodTracker();
      renderRoutineProgressTracker();
      renderHealthTracker();
      calculateDDays();

      // 이전 접속 날짜 및 활성 탭 복원
  const savedDate = localStorage.getItem('mingle_active_date');
  if (savedDate && typeof loadDayData === 'function') {
    currentDate = savedDate;
    const dateInput = document.getElementById('currentDateInput');
    if (dateInput) dateInput.value = currentDate;
    if (typeof updateDateLabel === 'function') updateDateLabel();
    loadDayData(currentDate);
  }

  // 서랍 화면 초기화 및 이전 접속 탭 복원
  if (typeof backToDrawerHub === 'function') backToDrawerHub();
  const savedTab = localStorage.getItem('mingle_active_tab') || 'day';
  switchTab(savedTab);
    });

    function initFirebase() {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        document.getElementById('syncStatus').innerText = '☁️ 동기화됨';
        document.getElementById('syncStatus').className = 'text-[10px] text-emerald-600 font-bold';
      } catch (e) {
        console.error("Firebase 초기화 에러:", e);
        document.getElementById('syncStatus').innerText = '⚠️ 동기화오류';
        document.getElementById('syncStatus').className = 'text-[10px] text-rose-500 font-medium';
      }
    }

    function switchTab(tab, subAction) {
  if (!tab) tab = 'day';
  try {
    localStorage.setItem('mingle_active_tab', tab);
  } catch(e) {}

  ['day', 'calendar', 'tracker', 'drawer'].forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (view) view.classList.add('hidden');
    if (nav) nav.className = 'text-stone-400 hover:text-stone-600 py-1 flex flex-col items-center gap-0.5';
  });

  const activeView = document.getElementById(`view-${tab}`);
  const activeNav = document.getElementById(`nav-${tab}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeNav) activeNav.className = 'text-stone-800 py-1 flex flex-col items-center gap-0.5';

  if (tab === 'tracker') {
    if (typeof renderHabits === 'function') renderHabits();
    if (typeof renderMoodTracker === 'function') renderMoodTracker();
    if (typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
    if (typeof renderHealthTracker === 'function') renderHealthTracker();
  } else if (tab === 'calendar') {
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof renderUpcomingEvents === 'function') renderUpcomingEvents();
    if (typeof renderTicketList === 'function') renderTicketList();
    if (typeof renderAnniversaries === 'function') renderAnniversaries();
  } else if (tab === 'drawer') {
    // 서랍 로비로 들어갈 때는 가계부 display를 확실하게 none으로 숨김
    const bMod = document.getElementById('drawerBudgetModule');
    if (bMod) bMod.style.display = 'none';
    if (typeof backToDrawerHub === 'function') backToDrawerHub();
  }
}

// 📦 서랍 세부 모듈 열기 & 새로고침 기억
function openDrawerModule(modName) {
  try {
    sessionStorage.setItem('mingle_drawer_subtab', modName);
  } catch(e) {}
}

// 📦 서랍 로비로 돌아갈 때 서브탭 기억 초기화
const origBackToDrawerHub = typeof backToDrawerHub === 'function' ? backToDrawerHub : null;
backToDrawerHub = function() {
  try { sessionStorage.removeItem('mingle_drawer_subtab'); } catch(e) {}
  if (origBackToDrawerHub) origBackToDrawerHub();
};

function setHobbySubTab(type) {
      if (type === 'book') {
        document.getElementById('hobbyBookModule').classList.remove('hidden');
        document.getElementById('hobbyKnitModule').classList.add('hidden');
        document.getElementById('hobbySubTabBook').className = 'flex-1 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 shadow-xs transition-all';
        document.getElementById('hobbySubTabKnit').className = 'flex-1 py-2 rounded-xl text-xs font-medium text-stone-500 transition-all';
        renderBookShelf();
      } else {
        document.getElementById('hobbyBookModule').classList.add('hidden');
        document.getElementById('hobbyKnitModule').classList.remove('hidden');
        document.getElementById('hobbySubTabKnit').className = 'flex-1 py-2 rounded-xl text-xs font-bold bg-rose-100 text-rose-900 shadow-xs transition-all';
        document.getElementById('hobbySubTabBook').className = 'flex-1 py-2 rounded-xl text-xs font-medium text-stone-500 transition-all';
        renderKnittingShowroom();
      }
    }

    function onDateChanged(val) {
      currentDate = val;
      updateDateLabel();
      subscribeDayData(currentDate);
      subscribeTodayTasks(currentDate);
      renderDayHabitList();
      renderDayRoutineTodos();
      calculateDDays();
      updateTodaySpecialBanner();
    }

    function changeDate(delta) {
      const parts = currentDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) + delta);
      const mStr = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
      const dStr = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
      currentDate = `${d.getFullYear()}-${mStr}-${dStr}`;
            localStorage.setItem('mingle_last_view_date', currentDate);

      document.getElementById('currentDateInput').value = currentDate;
      updateDateLabel();
      subscribeDayData(currentDate);
      subscribeTodayTasks(currentDate);
      renderDayHabitList();
      renderDayRoutineTodos();
      calculateDDays();
      updateTodaySpecialBanner();
    }

    function jumpToRealToday() {
  const now = new Date();
  const realToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  currentDate = realToday;
      localStorage.setItem('mingle_last_view_date', currentDate);

  const dateInput = document.getElementById('currentDateInput');
  if (dateInput) dateInput.value = currentDate;
  
  if (typeof updateDateLabel === 'function') updateDateLabel();
  if (typeof subscribeDayData === 'function') subscribeDayData(currentDate);
  if (typeof subscribeTodayTasks === 'function') subscribeTodayTasks(currentDate);
  if (typeof renderDayHabitList === 'function') renderDayHabitList();
  if (typeof renderDayRoutineTodos === 'function') renderDayRoutineTodos();
  if (typeof calculateDDays === 'function') calculateDDays();
  if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();
}


    function updateDateLabel() {
      const parts = currentDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      
      document.getElementById('currentYearMonthLabel').innerText = `${d.getFullYear()}. ${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}`;
      document.getElementById('currentDateLabel').innerText = `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}`;

      const btn = document.getElementById('todayJumpBtn');
      if (btn) {
        if (currentDate !== REAL_TODAY_STR) btn.classList.remove('hidden');
        else btn.classList.add('hidden');
      }
    }

    function downloadDateCard() {
      const parts = currentDate.split('-');
      const monthNum = parseInt(parts[1], 10);
      const dayNum = parseInt(parts[2], 10);
      const text = `${monthNum}월 ${dayNum}일`;

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1080, 1080);
      ctx.fillStyle = '#000000';
      ctx.font = '900 170px Pretendard, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 540, 540);

      const link = document.createElement('a');
      link.download = `date_card_${currentDate}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }

    // 오늘의 할 일 (스크롤 박멸 오가닉 높이 & 텍스트 터치 수정)
    function subscribeTodayTasks(dateStr) {
      if (unsubscribeTasks) unsubscribeTasks();
      migrateUnfinishedTasks(dateStr);
      renderTodayTasks(getTodayTasksLocal(dateStr));

      if (!db) return;
      unsubscribeTasks = db.collection('today_tasks').doc(dateStr)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const tasks = doc.data().tasks || [];
            saveTodayTasksLocal(dateStr, tasks);
            renderTodayTasks(tasks);
          }
        }, err => console.error(err));
    }

    function migrateUnfinishedTasks(todayStr) {
      const all = JSON.parse(localStorage.getItem('mingle_today_tasks') || '{}');
      if (all[todayStr] && all[todayStr].length > 0) return;

      const parts = todayStr.split('-');
      const prevD = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) - 1);
      const pmStr = (prevD.getMonth() + 1) < 10 ? `0${prevD.getMonth() + 1}` : `${prevD.getMonth() + 1}`;
      const pdStr = prevD.getDate() < 10 ? `0${prevD.getDate()}` : `${prevD.getDate()}`;
      const prevDateStr = `${prevD.getFullYear()}-${pmStr}-${pdStr}`;

      const prevTasks = all[prevDateStr] || [];
      const unfinished = prevTasks.filter(t => !t.done);

      if (unfinished.length > 0) {
        const migrated = unfinished.map(t => ({ ...t, id: Date.now() + Math.random(), isMigrated: true }));
        all[todayStr] = migrated;
        localStorage.setItem('mingle_today_tasks', JSON.stringify(all));
        if (db) db.collection('today_tasks').doc(todayStr).set({ tasks: migrated }).catch(console.error);
      }
    }

    function getTodayTasksLocal(dateStr) {
      const all = JSON.parse(localStorage.getItem('mingle_today_tasks') || '{}');
      return all[dateStr] || [];
    }

    function saveTodayTasksLocal(dateStr, tasks) {
      const all = JSON.parse(localStorage.getItem('mingle_today_tasks') || '{}');
      all[dateStr] = tasks;
      localStorage.setItem('mingle_today_tasks', JSON.stringify(all));
    }

    function saveTodayTasks(tasks) {
      saveTodayTasksLocal(currentDate, tasks);
      renderTodayTasks(tasks);
      if (db) db.collection('today_tasks').doc(currentDate).set({ tasks }).catch(console.error);
    }

    function addTodayTask() {
      const input = document.getElementById('newTodayTaskInput');
      const text = input.value.trim();
      if (!text) return;
      const tasks = getTodayTasksLocal(currentDate);
      tasks.push({ text, done: false, id: Date.now() });
      input.value = '';
      saveTodayTasks(tasks);
    }

    function toggleTodayTask(idx) {
      const tasks = getTodayTasksLocal(currentDate);
      if (tasks[idx]) {
        tasks[idx].done = !tasks[idx].done;
        saveTodayTasks(tasks);
      }
    }

    function editTodayTask(idx) {
      const tasks = getTodayTasksLocal(currentDate);
      if (!tasks[idx]) return;
      const newText = prompt("할 일 내용을 수정해주세요:", tasks[idx].text);
      if (newText === null || !newText.trim()) return;
      tasks[idx].text = newText.trim();
      saveTodayTasks(tasks);
    }

    function deleteTodayTask(idx) {
      const tasks = getTodayTasksLocal(currentDate);
      tasks.splice(idx, 1);
      saveTodayTasks(tasks);
    }

    function renderTodayTasks(tasks) {
      const list = document.getElementById('todayTaskList');
      document.getElementById('todayTaskCount').innerText = `${tasks.length}건`;
      if (tasks.length === 0) {
        list.innerHTML = `<p class="text-[11px] text-stone-300 py-2 text-center">오늘만의 특별한 일정이 있나요? ✍️</p>`;
        return;
      }
      list.innerHTML = tasks.map((t, idx) => `
        <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-100 text-xs">
          <div class="flex items-center gap-2 flex-1 min-w-0 pr-1">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodayTask(${idx})" class="rounded text-amber-500 cursor-pointer">
            <span onclick="editTodayTask(${idx})" class="${t.done ? 'line-through text-stone-300' : 'text-stone-700 font-medium'} truncate cursor-pointer hover:underline" title="클릭하여 내용 수정">
              ${t.isMigrated ? '<span class="text-amber-600 font-bold mr-0.5" title="어제 이월된 할 일">&gt;</span>' : ''}${t.text}
            </span>
          </div>
          <button onclick="deleteTodayTask(${idx})" class="text-stone-300 hover:text-stone-500 px-1 text-xs shrink-0">✕</button>
        </div>
      `).join('');
    }

    // 타임테이블
    function setTimetableView(mode) {
      timetableViewMode = mode;
      if (mode === 'grid') {
        document.getElementById('timetableGridView').classList.remove('hidden');
        document.getElementById('timetableTimelineView').classList.add('hidden');
        document.getElementById('viewBtnGrid').className = 'px-2 py-1 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
        document.getElementById('viewBtnCard').className = 'px-2 py-1 rounded-lg font-medium text-stone-500';
      } else {
        document.getElementById('timetableGridView').classList.add('hidden');
        document.getElementById('timetableTimelineView').classList.remove('hidden');
        document.getElementById('viewBtnCard').className = 'px-2 py-1 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
        document.getElementById('viewBtnGrid').className = 'px-2 py-1 rounded-lg font-medium text-stone-500';
        renderVerticalTimeline();
      }
    }

    function initTimetableGrid() {
      const container = document.getElementById('gridRowsContainer');
      container.innerHTML = '';
      for (let h = 7; h <= 24; h++) {
        const hourStr = h < 10 ? `0${h}` : `${h}`;
        const row = document.createElement('div');
        row.className = 'grid grid-cols-7 gap-1 items-center';
        row.innerHTML = `<span class="text-[10px] font-mono font-bold text-stone-400 text-center">${hourStr}</span>` +
          [0, 1, 2, 3, 4, 5].map(b => `
            <button id="cell_${hourStr}_${b}" onclick="openCategoryModal('${hourStr}', ${b})" class="grid-cell rounded-md border border-stone-200 bg-stone-50 hover:border-amber-400 text-[9px] flex items-center justify-center p-0.5 truncate text-stone-600 font-medium"></button>
          `).join('');
        container.appendChild(row);
      }
    }

    function setSessionDuration(mins) {
      selectedDurationMinutes = mins;
      [10, 20, 30, 40, 50, 60].forEach(m => {
        const btn = document.getElementById(`dur_${m}`);
        if (btn) {
          if (m === mins) {
            btn.className = 'py-1 rounded-lg border border-amber-300 bg-amber-100 text-amber-900 font-bold';
          } else {
            btn.className = 'py-1 rounded-lg border border-stone-200 bg-stone-50 text-stone-600';
          }
        }
      });
    }

    function openCategoryModal(hourStr, blockIdx) {
      activeHourStr = hourStr;
      activeBlockIdx = blockIdx;
      setSessionDuration(10);
      const min = blockIdx * 10;
      const timeStr = `${hourStr}:${min === 0 ? '00' : min}`;
      document.getElementById('categoryModalTimeTitle').innerText = `${timeStr} 일정 등록`;
      showMainCategories();
      document.getElementById('categoryModal').classList.remove('hidden');
    }

    function showMainCategories() {
      document.getElementById('categoryStep1').classList.remove('hidden');
      document.getElementById('categoryStep2').classList.add('hidden');
      document.getElementById('categoryBackBtn').classList.add('hidden');
      currentSelectedCategoryKey = null;
    }

    function openSubCategory(categoryKey) {
      currentSelectedCategoryKey = categoryKey;
      const conf = SUB_CATEGORIES[categoryKey];
      if (!conf) return;

      document.getElementById('categoryStep1').classList.add('hidden');
      document.getElementById('categoryStep2').classList.remove('hidden');
      document.getElementById('categoryBackBtn').classList.remove('hidden');
      document.getElementById('subCategoryHeader').innerText = conf.title;
      document.getElementById('categoryCustomInput').value = '';

      const btnContainer = document.getElementById('subCategoryButtons');
      const style = CATEGORY_STYLES[categoryKey];

      btnContainer.innerHTML = conf.items.map(item => `
        <button onclick="selectDirect('${item}', '${categoryKey}')" class="p-2.5 rounded-xl border ${style} hover:opacity-85 text-center text-xs truncate transition-all">
          ${item}
        </button>
      `).join('');
    }

    function selectDirect(text, categoryKey) {
      if (activeHourStr !== null && activeBlockIdx !== null) {
        const blocksCount = Math.max(1, Math.round(selectedDurationMinutes / 10));
        let startH = parseInt(activeHourStr, 10);
        let startB = activeBlockIdx;

        for (let i = 0; i < blocksCount; i++) {
          let currH = startH + Math.floor((startB + i) / 6);
          let currB = (startB + i) % 6;
          if (currH > 24) break;
          const hStr = currH < 10 ? `0${currH}` : `${currH}`;
          setBlockData(hStr, currB, text, categoryKey);
        }

        saveDayData();
        closeCategoryModal();
        if (timetableViewMode === 'timeline') renderVerticalTimeline();
      }
    }

    function selectCustomSubInput() {
      const val = document.getElementById('categoryCustomInput').value.trim();
      if (!val) return;
      selectDirect(val, currentSelectedCategoryKey || 'custom');
    }

    function closeCategoryModal() {
      document.getElementById('categoryModal').classList.add('hidden');
    }

    function clearCurrentBlock() {
      if (activeHourStr !== null && activeBlockIdx !== null) {
        setBlockData(activeHourStr, activeBlockIdx, '', '');
        saveDayData();
        closeCategoryModal();
        if (timetableViewMode === 'timeline') renderVerticalTimeline();
      }
    }

    function setBlockData(hourStr, blockIdx, text, category = 'custom') {
      const cell = document.getElementById(`cell_${hourStr}_${blockIdx}`);
      if (!cell) return;
      if (text) {
        cell.innerText = text;
        cell.dataset.category = category;
        const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.custom;
        cell.className = `grid-cell rounded-md border ${style} text-[9px] flex items-center justify-center p-0.5 truncate`;
      } else {
        cell.innerText = '';
        cell.dataset.category = '';
        cell.className = 'grid-cell rounded-md border border-stone-200 bg-stone-50 hover:border-amber-400 text-[9px] flex items-center justify-center p-0.5 truncate text-stone-600 font-medium';
      }
    }

    // 버티컬 타임라인 뷰
    function renderVerticalTimeline() {
      const container = document.getElementById('timetableTimelineView');
      const dayData = getDayDataLocal(currentDate);
      const blocks = dayData.timetable || {};
      
      const mergedList = [];
      let currentSession = null;

      for (let h = 7; h <= 24; h++) {
        const hStr = h < 10 ? `0${h}` : `${h}`;
        for (let b = 0; b < 6; b++) {
          const key = `${hStr}_${b}`;
          const val = blocks[key];
          const text = typeof val === 'object' ? val.text : val;
          const cat = typeof val === 'object' ? val.category : 'custom';

          if (text) {
            if (currentSession && currentSession.text === text && currentSession.cat === cat) {
              currentSession.endH = hStr;
              currentSession.endB = b;
              currentSession.duration += 10;
            } else {
              if (currentSession) mergedList.push(currentSession);
              currentSession = {
                text,
                cat,
                startH: hStr,
                startB: b,
                endH: hStr,
                endB: b,
                duration: 10
              };
            }
          } else {
            if (currentSession) {
              mergedList.push(currentSession);
              currentSession = null;
            }
          }
        }
      }
      if (currentSession) mergedList.push(currentSession);

      if (mergedList.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-2xl">아직 기록된 일정이 없어요. 모눈 뷰에서 톡 눌러 등록해보세요 ⏱️</div>`;
        return;
      }

      container.innerHTML = `
        <div class="relative pl-6 space-y-2 border-l-2 border-dashed border-stone-200 ml-3 py-1">
          ${mergedList.map(s => {
            const startMin = s.startB * 10;
            let endB_next = s.endB + 1;
            let endH_num = parseInt(s.endH, 10);
            if (endB_next >= 6) {
              endB_next = 0;
              endH_num++;
            }
            const endH_str = endH_num < 10 ? `0${endH_num}` : `${endH_num}`;
            const endMin = endB_next * 10;

            const timeLabel = `${s.startH}:${startMin === 0 ? '00' : startMin} ~ ${endH_str}:${endMin === 0 ? '00' : endMin}`;
            const markerStyle = TIMELINE_MARKER_STYLES[s.cat] || TIMELINE_MARKER_STYLES.custom;

            return `
              <div class="relative group">
                <div class="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-400"></div>
                <div class="p-2.5 rounded-xl border border-stone-200/70 ${markerStyle} shadow-2xs flex items-center justify-between transition-all cursor-pointer hover:opacity-90">
                  <div onclick="editTimelineSession('${s.startH}', ${s.startB}, ${s.duration}, '${s.text.replace(/'/g, "\\'")}', '${s.cat}')" class="min-w-0 pr-2 flex-1" title="클릭하여 내용 수정">
                    <div class="flex items-center gap-1.5">
                      <span class="font-mono text-[10px] text-stone-500 font-semibold">${timeLabel}</span>
                      <span class="text-[9px] bg-white/80 px-1.5 py-0.2 rounded-full font-bold text-stone-600 border border-stone-200/60">${s.duration}분</span>
                    </div>
                    <div class="font-bold text-xs mt-0.5 tracking-tight flex items-center gap-1">
                      <span>${s.text}</span>
                      ${EDIT_SVG_ICON}
                    </div>
                  </div>
                  <button onclick="clearSessionBlocks('${s.startH}', ${s.startB}, ${s.duration})" title="이 덩어리 삭제" class="text-stone-300 hover:text-stone-600 text-xs px-1 shrink-0">✕</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    function editTimelineSession(startH, startB, duration, currentText, cat) {
      const newText = prompt("일정 내용을 수정해주세요:", currentText);
      if (newText === null || !newText.trim()) return;
      const blocksCount = Math.round(duration / 10);
      let sH = parseInt(startH, 10);
      let sB = startB;

      for (let i = 0; i < blocksCount; i++) {
        let currH = sH + Math.floor((sB + i) / 6);
        let currB = (sB + i) % 6;
        if (currH > 24) break;
        const hStr = currH < 10 ? `0${currH}` : `${currH}`;
        setBlockData(hStr, currB, newText.trim(), cat);
      }
      saveDayData();
      renderVerticalTimeline();
    }

    function clearSessionBlocks(startH, startB, duration) {
      const blocksCount = Math.round(duration / 10);
      let sH = parseInt(startH, 10);
      let sB = startB;

      for (let i = 0; i < blocksCount; i++) {
        let currH = sH + Math.floor((sB + i) / 6);
        let currB = (sB + i) % 6;
        if (currH > 24) break;
        const hStr = currH < 10 ? `0${currH}` : `${currH}`;
        setBlockData(hStr, currB, '', '');
      }
      saveDayData();
      renderVerticalTimeline();
    }

    // 동적 루틴 & 카테고리 완전 관리
    const DEFAULT_ROUTINES = {
      categories: {
        morning: ['🌤️ 기상·비움', '⚖️ 바디·건강', '🎒 외출·출근'],
        evening: ['🧹 정리·바디', '🌿 반려·어항', '🧶 마무리']
      },
      morning: [
        { id: 'm1', cat: '🌤️ 기상·비움', name: '화장실', autoTime: false, autoCat: 'routine', paused: false },
        { id: 'm2', cat: '🌤️ 기상·비움', name: '미온수 한 잔', autoTime: false, autoCat: 'routine', paused: false },
        { id: 'm3', cat: '⚖️ 바디·건강', name: '체중체크', autoTime: false, autoCat: 'routine', paused: false },
        { id: 'm4', cat: '⚖️ 바디·건강', name: '비타민', autoTime: false, autoCat: 'routine', paused: false },
        { id: 'm5', cat: '⚖️ 바디·건강', name: '아침식사', autoTime: true, autoCat: 'meal', paused: false },
        { id: 'm6', cat: '🎒 외출·출근', name: '이부자리 정리', autoTime: false, autoCat: 'routine', paused: false },
        { id: 'm7', cat: '🎒 외출·출근', name: '출근준비', autoTime: true, autoCat: 'routine', paused: false }
      ],
      evening: [
        { id: 'e1', cat: '🧹 정리·바디', name: '정리', autoTime: true, autoCat: 'routine', paused: false },
        { id: 'e2', cat: '🧹 정리·바디', name: '설거지', autoTime: true, autoCat: 'routine', paused: false },
        { id: 'e3', cat: '🧹 정리·바디', name: '샤워', autoTime: true, autoCat: 'routine', paused: false },
        { id: 'e4', cat: '🧹 정리·바디', name: '스킨케어', autoTime: true, autoCat: 'selfcare', paused: false },
        { id: 'e5', cat: '🌿 반려·어항', name: '냥냥타임', autoTime: true, autoCat: 'routine', paused: false, isCatTime: true },
        { id: 'e6', cat: '🌿 반려·어항', name: '어항', autoTime: true, autoCat: 'routine', paused: false },
        { id: 'e7', cat: '🌿 반려·어항', name: '화분', autoTime: true, autoCat: 'routine', paused: false },
        { id: 'e8', cat: '🧶 마무리', name: '독서', autoTime: true, autoCat: 'hobby', paused: false },
        { id: 'e9', cat: '🧶 마무리', name: '뜨개', autoTime: true, autoCat: 'hobby', paused: false },
        { id: 'e10', cat: '🧶 마무리', name: '일기', autoTime: true, autoCat: 'selfcare', paused: false }
      ]
    };

    function subscribeRoutineDefinitions() {
      renderDynamicRoutines();
      if (!db) return;
      if (unsubscribeRoutineDef) unsubscribeRoutineDef();
      unsubscribeRoutineDef = db.collection('routine_definitions').doc('master')
        .onSnapshot(doc => {
          if (doc.exists) {
            localStorage.setItem('mingle_routine_defs', JSON.stringify(doc.data()));
            renderDynamicRoutines();
          }
        }, err => console.error(err));
    }

    function getRoutineDefs() {
      const defs = JSON.parse(localStorage.getItem('mingle_routine_defs') || JSON.stringify(DEFAULT_ROUTINES));
      if (!defs.categories) {
        defs.categories = DEFAULT_ROUTINES.categories;
      }
      return defs;
    }

    function saveRoutineDefs(defs) {
      localStorage.setItem('mingle_routine_defs', JSON.stringify(defs));
      renderDynamicRoutines();
      if (db) db.collection('routine_definitions').doc('master').set(defs).catch(console.error);
    }

    // 휴식 모드 토글 (🍃 휴식)
    function toggleRoutineRest(type) {
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.routineRest) dayData.routineRest = {};
      dayData.routineRest[type] = !dayData.routineRest[type];
      saveDayDataLocal(currentDate, dayData);
      renderDynamicRoutines();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
      renderRoutineProgressTracker();
      renderCalendar();
    }

    function autoFillTimetableNow(text, category = 'routine') {
      const now = new Date();
      let h = now.getHours();
      if (h < 7) h = 7;
      if (h > 24) h = 24;
      const hStr = h < 10 ? `0${h}` : `${h}`;
      const b = Math.floor(now.getMinutes() / 10);
      setBlockData(hStr, b, text, category);
      saveDayData();
      if (timetableViewMode === 'timeline') renderVerticalTimeline();
    }

    function toggleDynamicRoutineCheck(type, itemId, autoTime, autoCat, itemName) {
      const dayData = (window.currentDayData && window.currentDayData.date === currentDate)
        ? window.currentDayData
        : getDayDataLocal(currentDate);
      if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};
      const nextVal = !dayData.dynamicRoutineChecks[itemId];
      dayData.dynamicRoutineChecks[itemId] = nextVal;

      // 💡 1. 체크 상태를 먼저 안전하게 메모리와 로컬에 확정 저장!
      saveDayDataLocal(currentDate, dayData);
      window.currentDayData = dayData;

      // 💡 2. 그 다음 타임테이블 자동 등록 실행 (덮어쓰기 영구 박멸)
      if (nextVal && autoTime) {
        autoFillTimetableNow(itemName, autoCat);
      } else {
        if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
      }

      renderDynamicRoutines();
      renderRoutineProgressTracker();
      renderCalendar();
    }

    function toggleCatCareTag(tag) {
      const dayData = (window.currentDayData && window.currentDayData.date === currentDate)
        ? window.currentDayData
        : getDayDataLocal(currentDate);
      if (!dayData.catCareTags) dayData.catCareTags = {};
      dayData.catCareTags[tag] = !dayData.catCareTags[tag];
      saveDayDataLocal(currentDate, dayData);
      window.currentDayData = dayData;
      renderDynamicRoutines();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
    }

    function completeAllMorningRoutines() {
      const defs = getRoutineDefs();
      const morningActive = defs.morning.filter(i => !i.paused);
      const dayData = (window.currentDayData && window.currentDayData.date === currentDate)
        ? window.currentDayData
        : getDayDataLocal(currentDate);
      if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};

      morningActive.forEach(i => {
        dayData.dynamicRoutineChecks[i.id] = true;
      });

      // 💡 먼저 체크 상태 확정 저장
      saveDayDataLocal(currentDate, dayData);
      window.currentDayData = dayData;

      autoFillTimetableNow('아침루틴', 'routine');
      renderDynamicRoutines();
      renderRoutineProgressTracker();
      renderCalendar();
    }

    function toggleBookClubMode() {
      const isClub = document.getElementById('bookClubToggle')?.checked;
      const defs = getRoutineDefs();
      let clubItem = defs.evening.find(i => i.id === 'club_special');
      if (isClub) {
        if (!clubItem) {
          defs.evening.push({ id: 'club_special', cat: '🧶 마무리', name: '달보드레(독서모임)', autoTime: false, autoCat: 'bookclub', paused: false });
          saveRoutineDefs(defs);
        } else {
          clubItem.paused = false;
          clubItem.autoTime = false; // 💡 타임테이블 자동 등록 해제!
          saveRoutineDefs(defs);
        }
      } else {
        if (clubItem) {
          clubItem.paused = true;
          saveRoutineDefs(defs);
        }
      }
    }

    function renderDynamicRoutines() {
      const defs = getRoutineDefs();
      const dayData = getDayDataLocal(currentDate);
      const checks = dayData.dynamicRoutineChecks || {};
      const catTags = dayData.catCareTags || {};
      const rest = dayData.routineRest || {};

      // 아침 루틴
      const mWrapper = document.getElementById('morningRoutineContentWrapper');
      const mRestBtn = document.getElementById('morningRestBtn');
      if (mRestBtn) {
        mRestBtn.className = rest.morning 
          ? 'text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap'
          : 'text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap';
      }

      if (rest.morning) {
        document.getElementById('morningProgressBadge').innerText = '휴식 🍃';
        mWrapper.innerHTML = `
          <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center text-emerald-900 text-xs font-semibold">
            ☕ 오늘은 아침 루틴 없이 편안히 쉬어가는 날이에요! (통계 제외)
          </div>
        `;
      } else {
        const activeMorning = defs.morning.filter(i => !i.paused);
        const categories = defs.categories?.morning || [...new Set(activeMorning.map(i => i.cat))];
        let doneCount = activeMorning.filter(i => checks[i.id]).length;
        let pct = activeMorning.length > 0 ? Math.round((doneCount / activeMorning.length) * 100) : 0;
        document.getElementById('morningProgressBadge').innerText = `${pct}%`;

        mWrapper.innerHTML = `
          <div class="space-y-2 text-xs">
            ${categories.map(cat => {
              const items = activeMorning.filter(i => i.cat === cat);
              if (items.length === 0) return '';
              return `
                <div class="p-2 bg-stone-50 rounded-xl border border-stone-100 flex flex-wrap items-center justify-between gap-1">
                  <span class="text-[11px] font-bold text-stone-600">${cat}</span>
                  <div class="flex items-center gap-2 flex-wrap">
                    ${items.map(i => `
                      <label class="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                        <input type="checkbox" ${checks[i.id] ? 'checked' : ''} onchange="toggleDynamicRoutineCheck('morning', '${i.id}', ${i.autoTime}, '${i.autoCat}', '${i.name}')" class="rounded text-amber-500">
                        <span class="text-[11px] ${checks[i.id] ? 'line-through text-stone-300' : 'text-stone-700'}">${i.name}</span>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // 저녁 루틴
      const eWrapper = document.getElementById('eveningRoutineContentWrapper');
      const eRestBtn = document.getElementById('eveningRestBtn');
      if (eRestBtn) {
        eRestBtn.className = rest.evening 
          ? 'text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap'
          : 'text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap';
      }

      if (rest.evening) {
        document.getElementById('eveningProgressBadge').innerText = '휴식 🍃';
        eWrapper.innerHTML = `
          <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center text-emerald-900 text-xs font-semibold">
            🛋️ 오늘은 저녁 루틴 없이 푹 쉬는 힐링 데이예요! (통계 제외)
          </div>
        `;
      } else {
        const activeEvening = defs.evening.filter(i => !i.paused);
        const categories = defs.categories?.evening || [...new Set(activeEvening.map(i => i.cat))];
        let doneCount = activeEvening.filter(i => checks[i.id]).length;
        let pct = activeEvening.length > 0 ? Math.round((doneCount / activeEvening.length) * 100) : 0;
        document.getElementById('eveningProgressBadge').innerText = `${pct}%`;

        eWrapper.innerHTML = `
          <div class="space-y-2 text-xs">
            ${categories.map(cat => {
              const items = activeEvening.filter(i => i.cat === cat);
              if (items.length === 0) return '';
              return `
                <div class="p-2 bg-stone-50 rounded-xl border border-stone-100 flex flex-wrap items-center justify-between gap-1">
                  <span class="text-[11px] font-bold text-stone-600">${cat}</span>
                  <div class="flex items-center gap-2 flex-wrap">
                    ${items.map(i => `
                      <div class="flex items-center gap-1">
                        <label class="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                          <input type="checkbox" ${checks[i.id] ? 'checked' : ''} onchange="toggleDynamicRoutineCheck('evening', '${i.id}', ${i.autoTime}, '${i.autoCat}', '${i.name}')" class="rounded text-indigo-500">
                          <span class="text-[11px] ${checks[i.id] ? 'line-through text-stone-300' : 'text-stone-700'}">${i.name}</span>
                        </label>
                        ${i.isCatTime ? `
                          <div class="inline-flex gap-0.5 ml-1 text-[9px]">
                            <button onclick="toggleCatCareTag('brush')" class="px-1 py-0.2 rounded border ${catTags.brush ? 'bg-amber-200 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-400'}">빗질</button>
                            <button onclick="toggleCatCareTag('treat')" class="px-1 py-0.2 rounded border ${catTags.treat ? 'bg-amber-200 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-400'}">간식</button>
                            <button onclick="toggleCatCareTag('play')" class="px-1 py-0.2 rounded border ${catTags.play ? 'bg-amber-200 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-400'}">사냥</button>
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    }

    // 루틴 설정 팝업 & 카테고리 관리
    function openRoutineCustomModal(type) {
      routineModalTarget = type;
      document.getElementById('routineModalHeaderTitle').innerText = 
        type === 'morning' ? '☀️ 아침 루틴 설정' : '🌙 저녁 루틴 설정';
      document.getElementById('categoryManagerArea').classList.add('hidden');
      updateRoutineCustomCatSelect();
      renderRoutineModalItems();
      document.getElementById('routineCustomModal').classList.remove('hidden');
    }

    function closeRoutineCustomModal() {
      document.getElementById('routineCustomModal').classList.add('hidden');
    }

    function updateRoutineCustomCatSelect() {
      const catSelect = document.getElementById('newRoutineCustomCat');
      const defs = getRoutineDefs();
      const cats = defs.categories?.[routineModalTarget] || [];
      catSelect.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function toggleCategoryManagerSection() {
      const area = document.getElementById('categoryManagerArea');
      const isHidden = area.classList.toggle('hidden');
      if (!isHidden) renderCategoryManagerList();
    }

    function renderCategoryManagerList() {
      const container = document.getElementById('categoryManagerList');
      const defs = getRoutineDefs();
      const cats = defs.categories?.[routineModalTarget] || [];

      container.innerHTML = cats.map((cat, idx) => `
        <div class="flex items-center justify-between p-1 rounded bg-white border border-amber-200 text-xs">
          <span onclick="editCategoryName(${idx})" class="font-bold text-amber-950 truncate cursor-pointer hover:underline flex items-center gap-1" title="클릭하여 수정">
            <span>${cat}</span> ${EDIT_SVG_ICON}
          </span>
          <div class="flex items-center gap-1 shrink-0">
            <button onclick="moveCategoryOrder(${idx}, -1)" class="text-stone-400 hover:text-stone-700 text-[10px] px-0.5">▲</button>
            <button onclick="moveCategoryOrder(${idx}, 1)" class="text-stone-400 hover:text-stone-700 text-[10px] px-0.5">▼</button>
            <button onclick="deleteCategory(${idx})" class="text-stone-300 hover:text-rose-500 text-xs px-1">✕</button>
          </div>
        </div>
      `).join('');
    }

    function promptAddNewCategory() {
      const name = prompt("새로운 카테고리(그룹) 이름을 입력해주세요:\n(예: 🧘 폼롤러·요가, 🐾 집사케어)");
      if (!name || !name.trim()) return;
      const defs = getRoutineDefs();
      if (!defs.categories) defs.categories = { morning: [], evening: [] };
      if (!defs.categories[routineModalTarget]) defs.categories[routineModalTarget] = [];
      defs.categories[routineModalTarget].push(name.trim());
      saveRoutineDefs(defs);
      updateRoutineCustomCatSelect();
      renderCategoryManagerList();
    }

    function editCategoryName(idx) {
      const defs = getRoutineDefs();
      const oldName = defs.categories[routineModalTarget][idx];
      const newName = prompt("카테고리 이름을 수정해주세요:", oldName);
      if (!newName || !newName.trim()) return;

      defs.categories[routineModalTarget][idx] = newName.trim();
      defs[routineModalTarget].forEach(item => {
        if (item.cat === oldName) item.cat = newName.trim();
      });

      saveRoutineDefs(defs);
      updateRoutineCustomCatSelect();
      renderCategoryManagerList();
      renderRoutineModalItems();
    }

    function moveCategoryOrder(idx, delta) {
      const defs = getRoutineDefs();
      const list = defs.categories[routineModalTarget];
      const targetIdx = idx + delta;
      if (targetIdx < 0 || targetIdx >= list.length) return;
      const temp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = temp;
      saveRoutineDefs(defs);
      updateRoutineCustomCatSelect();
      renderCategoryManagerList();
    }

    function deleteCategory(idx) {
      if (!confirm("이 카테고리를 삭제할까요?\n소속된 루틴 항목들은 기본 카테고리로 유지됩니다.")) return;
      const defs = getRoutineDefs();
      defs.categories[routineModalTarget].splice(idx, 1);
      saveRoutineDefs(defs);
      updateRoutineCustomCatSelect();
      renderCategoryManagerList();
    }

    function renderRoutineModalItems() {
      const container = document.getElementById('routineModalItemList');
      const defs = getRoutineDefs();
      const list = defs[routineModalTarget] || [];

      container.innerHTML = list.map((item, idx) => `
        <div class="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-1.5">
          <div class="flex-1 min-w-0 flex items-center gap-1">
            <span class="text-[9px] bg-stone-200 text-stone-600 px-1 py-0.2 rounded font-bold shrink-0">${item.cat}</span>
            <span onclick="editRoutineItemName('${item.id}')" class="text-xs font-semibold ${item.paused ? 'line-through text-stone-400' : 'text-stone-800'} cursor-pointer hover:text-amber-800 truncate flex items-center gap-1" title="클릭하여 이름 수정">
              <span>${item.name}</span> ${EDIT_SVG_ICON}
            </span>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button onclick="moveRoutineItemOrder('${item.id}', -1)" title="위로" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▲</button>
            <button onclick="moveRoutineItemOrder('${item.id}', 1)" title="아래로" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▼</button>
            <button onclick="togglePauseRoutineItem('${item.id}')" title="숨김/재개" class="p-1 rounded bg-white border border-stone-200 hover:bg-stone-100 inline-flex items-center">
              <svg class="w-2.5 h-2.5 ${item.paused ? 'text-stone-300' : 'text-stone-600'} fill-current" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            </button>
            <button onclick="deleteRoutineItem('${item.id}')" class="text-stone-300 hover:text-rose-500 text-xs px-1">✕</button>
          </div>
        </div>
      `).join('');
    }

    function moveRoutineItemOrder(id, delta) {
      const defs = getRoutineDefs();
      const list = defs[routineModalTarget];
      const idx = list.findIndex(i => i.id === id);
      if (idx === -1) return;
      const targetIdx = idx + delta;
      if (targetIdx < 0 || targetIdx >= list.length) return;
      const temp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = temp;
      saveRoutineDefs(defs);
      renderRoutineModalItems();
    }

    function addNewCustomRoutineItem() {
      const input = document.getElementById('newRoutineCustomName');
      const name = input.value.trim();
      if (!name) return;
      const cat = document.getElementById('newRoutineCustomCat').value;
      const defs = getRoutineDefs();

      defs[routineModalTarget].push({
        id: 'c_' + Date.now(),
        cat,
        name,
        autoTime: true,
        autoCat: 'routine',
        paused: false
      });

      input.value = '';
      saveRoutineDefs(defs);
      renderRoutineModalItems();
    }

    function editRoutineItemName(id) {
      const defs = getRoutineDefs();
      const target = defs[routineModalTarget].find(i => i.id === id);
      if (!target) return;
      const newName = prompt("루틴 이름을 수정해주세요:", target.name);
      if (!newName || !newName.trim()) return;
      target.name = newName.trim();
      saveRoutineDefs(defs);
      renderRoutineModalItems();
    }

    function togglePauseRoutineItem(id) {
      const defs = getRoutineDefs();
      const target = defs[routineModalTarget].find(i => i.id === id);
      if (target) {
        target.paused = !target.paused;
        saveRoutineDefs(defs);
        renderRoutineModalItems();
      }
    }

    function deleteRoutineItem(id) {
      if (!confirm("정말 이 루틴을 완전히 삭제할까요?")) return;
      const defs = getRoutineDefs();
      defs[routineModalTarget] = defs[routineModalTarget].filter(i => i.id !== id);
      saveRoutineDefs(defs);
      renderRoutineModalItems();
    }

// 1. 공통 식후 컨디션 옵션 목록
const MEAL_CONDITIONS = [
  { value: "", text: "식후 컨디션" },
  { value: "good", text: "🌿 속편함" },
  { value: "satisfied", text: "😋 기분좋은 포만감" },
  { value: "full", text: "🤰 과식/배부름" },
  { value: "hungry", text: "🥣 허기짐/부족" },
  { value: "tired", text: "🥱 식곤증" },
  { value: "heavy", text: "🪨 더부룩/소화불량" }
];

// 식단 및 간식 섹션 구조 정의
const MEAL_SECTIONS = [
  {
    type: 'meal',
    id: 1,
    title: '☀️ 아침',
    hasFastSugar: true,
    checkboxes: [{ id: 'mealVege_1', label: '🥗채단탄', fn: 'saveDayData()' }]
  },
  {
    type: 'snack',
    key: 'am',
    title: '🥐 오전간식',
    placeholder: '간식 메뉴 및 메모를 자유롭게 적어보세요...'
  },
  {
    type: 'meal',
    id: 2,
    title: '🍚 점심',
    hasFastSugar: false,
    checkboxes: [
      { id: 'mealAcv_2', label: '🍏애사비', fn: 'onMealAcvChange()' },
      { id: 'mealVege_2', label: '🥗채단탄', fn: 'saveDayData()' },
      { id: 'mealWalk_2', label: '🏃운동', fn: 'saveDayData()' }
    ]
  },
  {
    type: 'snack',
    key: 'pm',
    title: '🍪 오후간식',
    placeholder: '오후 간식 메뉴 및 음료 메모...'
  },
  {
    type: 'meal',
    id: 3,
    title: '🍲 저녁',
    hasFastSugar: false,
    checkboxes: [
      { id: 'mealAcv_3', label: '🍏애사비', fn: 'onMealAcvChange()' },
      { id: 'mealVege_3', label: '🥗채단탄', fn: 'saveDayData()' },
      { id: 'mealWalk_3', label: '🏃운동', fn: 'saveDayData()' }
    ]
  },
  {
    type: 'snack',
    key: 'night',
    title: '🌙 밤간식',
    placeholder: '밤간식 메뉴 및 메모를 자유롭게 적어보세요...'
  }
];

// 3. 식단 & 간식 동적 렌더링 함수
function renderMealSection() {
  const container = document.getElementById('mealScheduleContainer');
  if (!container) return;

  const condOptionsHtml = MEAL_CONDITIONS
    .map(c => `<option value="${c.value}">${c.text}</option>`)
    .join('');

  container.innerHTML = MEAL_SECTIONS.map(item => {
    if (item.type === 'meal') {
      const chkHtml = item.checkboxes.map(chk => 
        `<label class="flex items-center gap-0.5 whitespace-nowrap cursor-pointer">
          <input type="checkbox" id="${chk.id}" onchange="${chk.fn}">${chk.label}
        </label>`
      ).join('');

      return `
        <div class="p-2.5 rounded-xl bg-warm-50 border border-stone-200 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold text-stone-700">${item.title}</span>
            <div class="flex items-center gap-1">
              <input type="text" id="mealTime_${item.id}" placeholder="00:00" maxlength="5" onkeyup="formatTimeInput(this)" onchange="saveDayData()" class="w-14 text-center text-[10px] bg-white border border-stone-200 rounded px-1 py-0.5 focus:outline-none">
              ${item.hasFastSugar ? `<input type="number" id="sugarFast" placeholder="공복" onchange="saveDayData()" class="w-12 text-[10px] bg-white border border-stone-200 rounded px-1 text-center">` : ''}
              <input type="number" id="sugarPost_${item.id}" placeholder="식후" onchange="saveDayData()" class="w-12 text-[10px] bg-white border border-stone-200 rounded px-1 text-center">
            </div>
          </div>
          <input type="text" id="mealMenu_${item.id}" placeholder="식단 메뉴..." onchange="saveDayData()" class="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs">
          <div class="flex items-center justify-between text-[11px]">
            <div class="flex items-center gap-1.5">${chkHtml}</div>
            <select id="mealCond_${item.id}" onchange="saveDayData()" class="bg-white border border-stone-200 rounded text-[10px] px-1 py-0.5 text-stone-600 focus:outline-none">
              ${condOptionsHtml}
            </select>
          </div>
          <div id="supplementsList_${item.id}" class="pt-1.5 border-t border-stone-200/50 space-y-1 mt-1 empty:hidden"></div>
        </div>
      `;
    } else {
      return `
        <div class="p-2.5 rounded-xl bg-[#faf7f2] border border-[#ebe4da] space-y-1.5 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-900 text-[11px] flex items-center gap-1">${item.title}</span>
            <input type="text" id="snackTime_${item.key}" placeholder="00:00" maxlength="5" onkeyup="formatTimeInput(this)" onchange="saveDayData()" class="w-14 text-center text-[10px] bg-white border border-stone-200 rounded px-1 py-0.5 focus:outline-none">
          </div>
          <input type="text" id="snackMenu_${item.key}" placeholder="${item.placeholder}" onchange="saveDayData()" class="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 text-[11px] placeholder:text-stone-300 focus:outline-none">
        </div>
      `;
    }
  }).join('');
}

    // 식단 🍏 애사비 ↔ 상단 드링크 트래커 스마트 자동연동
    function onMealAcvChange() {
      const acv2 = document.getElementById('mealAcv_2')?.checked || false;
      const acv3 = document.getElementById('mealAcv_3')?.checked || false;
      const count = (acv2 ? 1 : 0) + (acv3 ? 1 : 0);

      const dayData = (window.currentDayData && window.currentDayData.date === currentDate)
        ? window.currentDayData
        : getDayDataLocal(currentDate);
      dayData.acvCount = count;
      if (!dayData.health) dayData.health = {};
      if (!dayData.health.meals) dayData.health.meals = [{}, {}, {}];
      if (dayData.health.meals[1]) dayData.health.meals[1].acv = acv2;
      if (dayData.health.meals[2]) dayData.health.meals[2].acv = acv3;

      saveDayDataLocal(currentDate, dayData);
      window.currentDayData = dayData;
      renderDrinkTracker(dayData);
      saveDayData();
    }

    function renderDrinkTracker(data) {
      data = data || {};
      const waterEl = document.getElementById('drinkWaterDrops');
      const acvEl = document.getElementById('drinkAcvDrops');
      const coffeeEl = document.getElementById('drinkCoffeeDrops');
      if (!waterEl) return;

      const waterCount = data.waterCount || 0;
      const acvCount = data.acvCount || 0;
      const coffeeCount = data.coffeeCount || 0;

      // 💧 물방울 6개
      waterEl.innerHTML = [1, 2, 3, 4, 5, 6].map(i => `
        <span onclick="toggleDrinkItem('waterCount', ${i})" class="transition-transform hover:scale-125 ${i <= waterCount ? 'opacity-100' : 'opacity-25 grayscale'}">💧</span>
      `).join('');

      // 🍏 애사비 2개
      if (acvEl) {
        acvEl.innerHTML = [1, 2].map(i => `
          <span onclick="toggleDrinkItem('acvCount', ${i})" class="transition-transform hover:scale-125 ${i <= acvCount ? 'opacity-100' : 'opacity-25 grayscale'}">🍏</span>
        `).join('');
      }

      // ☕ 커피 1개
      if (coffeeEl) {
        coffeeEl.innerHTML = `
          <span onclick="toggleDrinkItem('coffeeCount', 1)" class="transition-transform hover:scale-125 ${coffeeCount >= 1 ? 'opacity-100' : 'opacity-25 grayscale'}">☕</span>
        `;
      }
    }

    function toggleDrinkItem(key, idx) {
      const dayData = (window.currentDayData && window.currentDayData.date === currentDate)
        ? window.currentDayData
        : getDayDataLocal(currentDate);
      let curr = dayData[key] || 0;
      let next = curr === idx ? idx - 1 : idx;
      dayData[key] = next;

      if (key === 'acvCount') {
        const isAcv1 = next >= 1;
        const isAcv2 = next >= 2;
        if (document.getElementById('mealAcv_2')) document.getElementById('mealAcv_2').checked = isAcv1;
        if (document.getElementById('mealAcv_3')) document.getElementById('mealAcv_3').checked = isAcv2;
        if (!dayData.health) dayData.health = {};
        if (!dayData.health.meals) dayData.health.meals = [{}, {}, {}];
        if (dayData.health.meals[1]) dayData.health.meals[1].acv = isAcv1;
        if (dayData.health.meals[2]) dayData.health.meals[2].acv = isAcv2;
      }

      saveDayDataLocal(currentDate, dayData);
      window.currentDayData = dayData;
      renderDrinkTracker(dayData);
      saveDayData();
    }

    // 독서 & 뜨개 시간 소급 & 수동 입력
    function resetKnitRow() {
      if (confirm("뜨개 단수를 0단으로 리셋할까요?")) {
        document.getElementById('knitRowCount').innerText = "0";
        saveDayData();
      }
    }

    function toggleKnitTimer() {
      const btn = document.getElementById('knitTimerBtn');
      if (!knitTimerStartTime) {
        knitTimerStartTime = new Date();
        btn.innerText = "종료 ⏹";
        btn.className = "text-[10px] bg-rose-700 hover:bg-rose-800 text-white font-bold py-1.5 rounded-lg shadow-2xs animate-pulse";
      } else {
        const endTime = new Date();
        const diffMins = Math.round((endTime - knitTimerStartTime) / (1000 * 60));
        knitTimerStartTime = null;
        btn.innerText = "시작 ▶";
        btn.className = "text-[10px] bg-rose-500 hover:bg-rose-600 text-white font-bold py-1.5 rounded-lg shadow-2xs";

        if (diffMins > 0) {
          quickAddMinutes("뜨개", "hobby", diffMins);
        }
      }
    }

    function toggleBookTimer() {
      const btn = document.getElementById('bookTimerBtn');
      if (!bookTimerStartTime) {
        bookTimerStartTime = new Date();
        btn.innerText = "종료 ⏹";
        btn.className = "text-[10px] bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-1.5 rounded-lg shadow-2xs animate-pulse";
      } else {
        const endTime = new Date();
        const diffMins = Math.round((endTime - bookTimerStartTime) / (1000 * 60));
        bookTimerStartTime = null;
        btn.innerText = "시작 ▶";
        btn.className = "text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-lg shadow-2xs";

        if (diffMins > 0) {
          quickAddMinutes("독서", "hobby", diffMins);
        }
      }
    }

    function quickAddMinutes(text, category, mins) {
      const now = new Date();
      let h = now.getHours();
      if (h < 7) h = 7;
      if (h > 24) h = 24;
      const b = Math.floor(now.getMinutes() / 10);
      const blocksCount = Math.max(1, Math.round(mins / 10));

      for (let i = 0; i < blocksCount; i++) {
        let currH = h + Math.floor((b + i) / 6);
        let currB = (b + i) % 6;
        if (currH > 24) break;
        const hStr = currH < 10 ? `0${currH}` : `${currH}`;
        setBlockData(hStr, currB, text, category);
      }
      saveDayData();
      if (timetableViewMode === 'timeline') renderVerticalTimeline();
      alert(`✨ ${text} ${mins}분이 타임테이블에 반영되었어요!`);
    }

    function openManualTimeModal(text, cat) {
      manualTimeTarget = { text, cat };
      document.getElementById('manualTimeModalTitle').innerText = `${text} 시간 직접 입력`;
      const now = new Date();
      const hStr = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
      const mStr = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
      document.getElementById('manualStartTime').value = `${hStr}:${mStr}`;
      document.getElementById('manualTimeModal').classList.remove('hidden');
    }

    function closeManualTimeModal() {
      document.getElementById('manualTimeModal').classList.add('hidden');
    }

    function confirmManualTimeSave() {
      const timeVal = document.getElementById('manualStartTime').value;
      const dur = parseInt(document.getElementById('manualDurationSelect').value, 10);
      if (!timeVal) return;

      const [hPart, mPart] = timeVal.split(':').map(Number);
      let startH = Math.max(7, Math.min(24, hPart));
      let startB = Math.floor(mPart / 10);
      const blocksCount = Math.max(1, Math.round(dur / 10));

      for (let i = 0; i < blocksCount; i++) {
        let currH = startH + Math.floor((startB + i) / 6);
        let currB = (startB + i) % 6;
        if (currH > 24) break;
        const hStr = currH < 10 ? `0${currH}` : `${currH}`;
        setBlockData(hStr, currB, manualTimeTarget.text, manualTimeTarget.cat);
      }
      saveDayData();
      closeManualTimeModal();
      if (timetableViewMode === 'timeline') renderVerticalTimeline();
      alert(`✨ ${manualTimeTarget.text} ${dur}분이 오차 없이 기록되었어요!`);
    }

    function updateKnitRow(delta) {
      const el = document.getElementById('knitRowCount');
      let val = Math.max(0, parseInt(el.innerText || '0') + delta);
      el.innerText = val;
      saveDayData();
    }

    // 데일리 TO-DO (첫날 / 말일 / 분기, 미니멀 파스텔 텍스트 뱃지, 스크롤 박멸 오가닉 높이)
    function onRoutineTypeChange(val) {
      const selector = document.getElementById('weeklyDaysSelector');
      if (val === 'weekly') {
        selector.classList.remove('hidden');
        selectedWeeklyDays = [];
        renderWeekDayChips();
      } else {
        selector.classList.add('hidden');
      }
    }

    function toggleWeekDayChip(dayNum) {
      const idx = selectedWeeklyDays.indexOf(dayNum);
      if (idx > -1) {
        selectedWeeklyDays.splice(idx, 1);
      } else {
        selectedWeeklyDays.push(dayNum);
      }
      renderWeekDayChips();
    }

    function renderWeekDayChips() {
      [0, 1, 2, 3, 4, 5, 6].forEach(d => {
        const chip = document.getElementById(`wd_chip_${d}`);
        if (chip) {
          if (selectedWeeklyDays.includes(d)) {
            chip.className = 'px-2 py-1 rounded-lg border border-amber-300 bg-amber-100 text-amber-900 font-bold';
          } else {
            chip.className = 'px-2 py-1 rounded-lg border border-stone-200 bg-white text-stone-400 font-medium';
          }
        }
      });
    }

    function subscribeRoutineMaster() {
      renderDayRoutineTodos();
      if (!db) return;
      if (unsubscribeRoutines) unsubscribeRoutines();
      unsubscribeRoutines = db.collection('routine_master').doc('list')
        .onSnapshot(doc => {
          if (doc.exists) {
            localStorage.setItem('mingle_routine_rules', JSON.stringify(doc.data().rules || []));
            renderDayRoutineTodos();
          }
        }, err => console.error(err));
    }

    function getRoutineRules() {
      const defaultRules = [
        { id: 1, text: "물 1.5L 마시기", type: "daily", sortOrder: 1 },
        { id: 2, text: "참마 화장실 청소 🚽", type: "weekly", days: [4], sortOrder: 2 },
        { id: 3, text: "월세 보내기 🏠", type: "monthly_last", sortOrder: 3 },
        { id: 4, text: "칫솔 바꾸기", type: "quarterly", sortOrder: 4 },
        { id: 5, text: "브리타 필터 바꾸기", type: "quarterly", sortOrder: 5 }
      ];
      return JSON.parse(localStorage.getItem('mingle_routine_rules') || JSON.stringify(defaultRules));
    }

    function saveRoutineRules(rules) {
      localStorage.setItem('mingle_routine_rules', JSON.stringify(rules));
      renderDayRoutineTodos();
      if (db) db.collection('routine_master').doc('list').set({ rules }).catch(console.error);
    }

    function addRoutineTodo() {
      const input = document.getElementById('newRoutineTodoInput');
      const text = input.value.trim();
      if (!text) return;

      const type = document.getElementById('routineTypeSelect').value;
      const rules = getRoutineRules();

      const newRule = {
        id: Date.now(),
        text,
        type,
        days: type === 'weekly' ? [...selectedWeeklyDays] : null,
        createdDate: currentDate,
        sortOrder: Date.now()
      };

      rules.push(newRule);
      input.value = '';
      selectedWeeklyDays = [];
      renderWeekDayChips();
      saveRoutineRules(rules);
    }

    function moveRoutineOrder(id, delta) {
      let rules = getRoutineRules();
      const idx = rules.findIndex(r => r.id === id);
      if (idx === -1) return;
      const targetIdx = idx + delta;
      if (targetIdx < 0 || targetIdx >= rules.length) return;
      const temp = rules[idx];
      rules[idx] = rules[targetIdx];
      rules[targetIdx] = temp;
      saveRoutineRules(rules);
    }

    function deleteRoutineRule(id) {
      let rules = getRoutineRules();
      rules = rules.filter(r => r.id !== id);
      saveRoutineRules(rules);
    }

    function toggleDayRoutineCheck(ruleId) {
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.routineChecks) dayData.routineChecks = {};
      dayData.routineChecks[ruleId] = !dayData.routineChecks[ruleId];
      saveDayDataLocal(currentDate, dayData);
      renderDayRoutineTodos();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
    }

    function renderDayRoutineTodos() {
      const container = document.getElementById('routineTodoList');
      if (!container) return;

      const parts = currentDate.split('-');
      const year = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const d = new Date(year, monthIdx, parseInt(parts[2], 10));
      const dayOfWeek = d.getDay();
      const dateNum = d.getDate();
      const monthNum = d.getMonth() + 1;
      const lastDayOfMonth = new Date(year, monthIdx + 1, 0).getDate();

      const rules = getRoutineRules();
      const dayData = getDayDataLocal(currentDate);
      const checks = dayData.routineChecks || {};

      const activeRules = rules.filter(r => {
        if (r.type === 'daily') return true;
        if (r.type === 'weekly') return r.days && r.days.includes(dayOfWeek);
        if (r.type === 'monthly_first' || r.type === 'monthly') return dateNum === 1;
        if (r.type === 'monthly_last') return dateNum === lastDayOfMonth;
        if (r.type === 'quarterly') return dateNum === 1 && [1, 4, 7, 10].includes(monthNum);
        return false;
      });

      // 3단계 정렬: 1순위(주기 짧은순) ➔ 2순위(가나다순)
      const typeRank = { daily: 1, weekly: 2, monthly_first: 3, monthly: 3, monthly_last: 4, quarterly: 5 };
      activeRules.sort((a, b) => {
        const rankDiff = (typeRank[a.type] || 9) - (typeRank[b.type] || 9);
        if (rankDiff !== 0) return rankDiff;
        return a.text.localeCompare(b.text, 'ko');
      });

      document.getElementById('routineTodoCount').innerText = `${activeRules.length}건`;

      if (activeRules.length === 0) {
        container.innerHTML = `<p class="text-[11px] text-stone-300 py-2 text-center">오늘 등록된 정기 투두가 없어요 🌿</p>`;
        return;
      }

      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

      container.innerHTML = activeRules.map((r) => {
        const isDone = !!checks[r.id];
        // 이모지 싹 뺀 미니멀 파스텔 단어 뱃지
        let badge = '';
        if (r.type === 'daily') badge = '<span class="text-[9px] bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.2 rounded font-semibold shrink-0">매일</span>';
        else if (r.type === 'weekly') badge = `<span class="text-[9px] bg-sky-50 text-sky-900 border border-sky-200 px-1.5 py-0.2 rounded font-semibold shrink-0">${dayNames[dayOfWeek]}요일</span>`;
        else if (r.type === 'monthly_first' || r.type === 'monthly') badge = '<span class="text-[9px] bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold shrink-0">첫날</span>';
        else if (r.type === 'monthly_last') badge = '<span class="text-[9px] bg-rose-50 text-rose-900 border border-rose-200 px-1.5 py-0.2 rounded font-semibold shrink-0">말일</span>';
        else if (r.type === 'quarterly') badge = '<span class="text-[9px] bg-purple-50 text-purple-900 border border-purple-200 px-1.5 py-0.2 rounded font-semibold shrink-0">분기</span>';

        return `
          <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-100 text-xs">
            <label class="flex items-center gap-1.5 flex-1 cursor-pointer min-w-0 pr-1">
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDayRoutineCheck(${r.id})" class="rounded text-amber-500">
              <span class="${isDone ? 'line-through text-stone-300' : 'text-stone-700 font-medium'} truncate">${r.text}</span>
              ${badge}
            </label>
            <div class="flex items-center gap-1 shrink-0">
              <button onclick="moveRoutineOrder(${r.id}, -1)" title="위로" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▲</button>
              <button onclick="moveRoutineOrder(${r.id}, 1)" title="아래로" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▼</button>
              <button onclick="deleteRoutineRule(${r.id})" title="삭제" class="text-stone-300 hover:text-stone-500 px-1 text-xs">✕</button>
            </div>
          </div>
        `;
      }).join('');
    }

    // 👗 노션 스타일 스마트 옷장 칩 바
    const DEFAULT_OOTD_CLOSET = {
      top: ['민트 브이넥 니트', '아이보리 셔츠', '화이트 반팔티'],
      bottom: ['연청 데님', '블랙 슬랙스', '베이지 코튼팬츠'],
      shoes: ['화이트 스니커즈', '반스 체커보드', '컨버스 로우'],
      bag: ['미피 네트백', '블랙 백팩', '캔버스 에코백']
    };

    function getOotdCloset() {
      return JSON.parse(localStorage.getItem('mingle_ootd_closet') || JSON.stringify(DEFAULT_OOTD_CLOSET));
    }

    function saveOotdCloset(closet) {
      localStorage.setItem('mingle_ootd_closet', JSON.stringify(closet));
      renderOotdChips();
    }

    function promptAddOotdChip(group) {
      const item = prompt("새로운 의류/아이템을 등록해주세요:");
      if (!item || !item.trim()) return;
      const closet = getOotdCloset();
      if (!closet[group]) closet[group] = [];
      closet[group].push(item.trim());
      saveOotdCloset(closet);
    }

    function deleteOotdChip(group, idx) {
      const closet = getOotdCloset();
      if (!closet[group]) return;
      closet[group].splice(idx, 1);
      saveOotdCloset(closet);
    }

    function toggleSelectOotdChip(group, item) {
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.ootdSelected) dayData.ootdSelected = { top: '', bottom: '', shoes: '', bag: '' };
      
      if (dayData.ootdSelected[group] === item) {
        dayData.ootdSelected[group] = '';
      } else {
        dayData.ootdSelected[group] = item;
      }
      saveDayDataLocal(currentDate, dayData);
      renderOotdChips();
      saveDayData();
    }

// ==========================================
// 👗 감성 스마트 OOTD & 옷장 모달 두뇌 (초안전 데이터 호환 방어막 탑재)
// ==========================================

// 옛날 이름 호출 호환 브릿지 (로딩 멈춤 영구 방지)
window.renderOotdChips = function() { try { renderOotd(); } catch(e){ console.error(e); } };
window.loadOotd = function() { try { renderOotd(); } catch(e){ console.error(e); } };

// 자연어 컬러 사전 (이름만 쳐도 색상이 착!)
const OOTD_COLOR_DICT = {
  '베이지': '#E8DCB8', '크림': '#FDFBF7', '아이보리': '#FFFFF0',
  '화이트': '#FFFFFF', '블랙': '#2B2B2B', '차콜': '#4A4A4A',
  '그레이': '#9E9E9E', '회색': '#9E9E9E', '먹색': '#4A4A4A',
  '네이비': '#1B2A4A', '블루': '#4A90E2', '소라': '#A0C4E2',
  '하늘': '#BCE0FD', '연청': '#A5C7E6', '중청': '#5C82A6', '진청': '#2C405A',
  '핑크': '#F4B6C2', '분홍': '#F4B6C2', '로즈': '#E08594',
  '레드': '#D32F2F', '빨강': '#D32F2F', '토마토': '#E53E3E', '버건디': '#800020', '와인': '#722F37',
  '보라': '#8E44AD', '퍼플': '#9B59B6', '라벤더': '#D7BDE2', '바이올렛': '#6C3483', '연보라': '#E8DAEF',
  '그린': '#4CAF50', '초록': '#4CAF50', '카키': '#706E49', '민트': '#A8E6CF', '올리브': '#6B8E23',
  '옐로우': '#FEE56A', '노랑': '#FEE56A', '버터': '#FDF0A6',
  '오렌지': '#FF9800', '주황': '#FF9800', '브라운': '#8D6E63', '갈색': '#8D6E63', '카멜': '#C19A6B'
};

function detectClothColor(name) {
  if (!name) return '#E2E8F0';
  for (const [key, color] of Object.entries(OOTD_COLOR_DICT)) {
    if (name.includes(key)) return color;
  }
  return '#E2E8F0';
}

function getClosetData() {
  const defaultCloset = {
    outer: [],
    top: [],
    bottom: [],
    shoes: [],
    bag: []
  };
  try {
    const saved = localStorage.getItem('mingle_closet_v2');
    if (!saved) return defaultCloset;
    const parsed = JSON.parse(saved);
    if (!parsed.outer) parsed.outer = [];
    if (!parsed.top) parsed.top = [];
    if (!parsed.bottom) parsed.bottom = [];
    if (!parsed.shoes) parsed.shoes = [];
    if (!parsed.bag) parsed.bag = [];
    return parsed;
  } catch(e) {
    return defaultCloset;
  }
}

function saveClosetData(data) {
  try {
    localStorage.setItem('mingle_closet_v2', JSON.stringify(data));
  } catch(e) {}
  // ☁️ 옷장 전체 목록 Firestore 클라우드 즉시 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('closet_data').doc('master').set({
      closet: data
    }, { merge: true }).catch(console.error);
  }
}

// ☁️ 옷장 목록 실시간 양방향 클라우드 구독기
let unsubscribeCloset = null;
function subscribeClosetData() {
  if (typeof renderOotd === 'function') renderOotd();

  if (!db) return;
  if (unsubscribeCloset) unsubscribeCloset();
  unsubscribeCloset = db.collection('closet_data').doc('master')
    .onSnapshot(doc => {
      if (doc.exists) {
        const d = doc.data() || {};
        if (d.closet) {
          localStorage.setItem('mingle_closet_v2', JSON.stringify(d.closet));
          if (typeof renderOotd === 'function') renderOotd();
          if (typeof renderClosetModalList === 'function') renderClosetModalList();
        }
      }
    }, err => console.error(err));
}

let activeCategory = 'outer';

function renderOotd() {
  try {
    const closet = getClosetData();
    let dayData = {};
    const curD = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];

    // 1순위: getDayDataLocal (파이어베이스 실시간 수신 데이터 저장소)
    if (typeof getDayDataLocal === 'function') {
      try { dayData = getDayDataLocal(curD) || {}; } catch(e) {}
    }
    // 2순위: window.currentDayData
    if ((!dayData.ootdSelected && !dayData.ootd) && window.currentDayData) {
      if (window.currentDayData.ootdSelected) dayData.ootdSelected = window.currentDayData.ootdSelected;
      if (window.currentDayData.ootd) dayData.ootd = window.currentDayData.ootd;
    }
    // 3순위: mingle_day_ 로컬 키
    if (!dayData.ootdSelected && !dayData.ootd) {
      try {
        const stored = localStorage.getItem('mingle_day_' + curD);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed) {
            dayData.ootdSelected = parsed.ootdSelected || {};
            dayData.ootd = parsed.ootd || {};
          }
        }
      } catch(e) {}
    }

    const dayOotd = dayData.ootd || {};
    const ootdSel = dayData.ootdSelected || {};

    ['outer', 'top', 'bottom', 'shoes', 'bag'].forEach(cat => {
      const container = document.getElementById(`ootdSelected_${cat}`);
      if (!container) return;
      container.innerHTML = '';

      let rawVal = ootdSel[cat] !== undefined ? ootdSel[cat] : dayOotd[cat];
      let selectedIds = [];

      if (Array.isArray(rawVal)) {
        selectedIds = rawVal.map(String);
      } else if (typeof rawVal === 'string' && rawVal.trim() !== '') {
        const found = (closet[cat] || []).find(c => c.name === rawVal || String(c.id) === rawVal);
        if (found) {
          selectedIds = [String(found.id)];
        } else {
          const autoId = 'legacy_' + Date.now();
          if (!closet[cat]) closet[cat] = [];
          closet[cat].push({ id: autoId, name: rawVal, color: detectClothColor(rawVal) });
          saveClosetData(closet);
          selectedIds = [autoId];
        }
      }

      if (selectedIds.length === 0) {
        container.innerHTML = '<span class="text-[10px] text-stone-300 italic">미선택</span>';
        return;
      }

      selectedIds.forEach(id => {
        let item = (closet[cat] || []).find(c => String(c.id) === String(id) || c.name === String(id));
        const savedName = (dayData.ootdNames && dayData.ootdNames[cat]) ? dayData.ootdNames[cat][id] : null;
        const savedColor = (dayData.ootdColors && dayData.ootdColors[cat]) ? dayData.ootdColors[cat][id] : null;

        const displayName = item ? item.name : (savedName || String(id));
        const displayColor = item ? (item.color || detectClothColor(displayName)) : (savedColor || detectClothColor(displayName));

        const chip = document.createElement('span');
        chip.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200';
        chip.innerHTML = `
          <span class="w-2 h-2 rounded-full border border-stone-300 shrink-0" style="background-color: ${displayColor};"></span>
          <span>${displayName}</span>
          <button onclick="toggleSelectCloth('${cat}', '${id}'); event.stopPropagation();" class="text-stone-400 hover:text-red-500 ml-0.5 text-xs font-bold leading-none">×</button>
        `;
        container.appendChild(chip);
      });
    });

    // 대표 컬러 반영
    const badge = document.getElementById('ootdColorBadge');
    const input = document.getElementById('ootdColorInput');
    const currentColor = dayOotd.color || '#ecdcc9';
    if (badge) badge.style.backgroundColor = currentColor;
    if (input) input.value = currentColor;

    // 메모 반영
    const memoEl = document.getElementById('ootdMemoInput');
    if (memoEl) memoEl.value = dayOotd.memo || dayData.dailyOotdMemo || '';

    // 오늘의 노래 반영 및 초기화 (다른 날짜 유령 노래 방지)
    const bgm = dayData.bgm || {};
    const coverEl = document.getElementById('bgmCoverImg');
    const infoEl = document.getElementById('bgmInfoText');
    const inputEl = document.getElementById('bgmSearchInput');
    const defaultCover = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=60';

    if (bgm.song || bgm.info) {
      if (coverEl) {
        coverEl.src = bgm.cover || defaultCover;
        coverEl.style.display = 'block';
      }
      if (infoEl) infoEl.innerText = bgm.info || bgm.song || 'BGM을 검색해보세요';
      if (inputEl) inputEl.value = bgm.song || '';
    } else {
          
      // 해당 날짜에 저장된 노래가 없으면 기본 감성 커버와 플레이스홀더로 복원!
      if (coverEl) {
        coverEl.src = defaultCover;
        coverEl.style.display = 'block';
      }
      if (infoEl) infoEl.innerText = 'BGM을 검색해보세요';
      if (inputEl) inputEl.value = '';
    }

      // 지출 위젯 렌더링 호출
    if (typeof renderExpenseWidget === 'function') renderExpenseWidget();

  } catch (err) {
    console.warn("OOTD 렌더링 안전 패스:", err);
  }
}

function onOotdColorChange(color) {
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  let dayData = (typeof getDayDataLocal === 'function' ? getDayDataLocal(curDate) : window.currentDayData) || {};
  if (!dayData.ootd) dayData.ootd = {};
  dayData.ootd.color = color;

  const badge = document.getElementById('ootdColorBadge');
  if (badge) badge.style.backgroundColor = color;
  const input = document.getElementById('ootdColorInput');
  if (input) input.value = color;

  if (window.currentDayData) {
    if (!window.currentDayData.ootd) window.currentDayData.ootd = {};
    window.currentDayData.ootd.color = color;
  }

  // 1. 로컬 저장
  try {
    const k = 'mingle_day_' + curDate;
    localStorage.setItem(k, JSON.stringify(dayData));
    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(curDate, dayData);
  } catch(e) {}

  // 2. ☁️ 파이어베이스 즉시 클라우드 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('diary_days').doc(curDate).set({
      ootd: { color: color }
    }, { merge: true }).catch(err => console.error(err));
  }

  if (typeof saveDayData === 'function') saveDayData();
  if (typeof renderCalendar === 'function') renderCalendar();
}

function saveOotdMemo(memo) {
  let dayData = typeof getDayDataLocal === 'function' ? getDayDataLocal(currentDate) : (window.currentDayData || {});
  if (!dayData.ootd) dayData.ootd = {};
  dayData.ootd.memo = memo;
  if (typeof saveDayData === 'function') saveDayData();
}

function openOotdClosetModal(category) {
  activeCategory = category || 'outer';
  const catNames = {
    outer: '🧥 외투',
    top: '👕 상의',
    bottom: '👖 하의',
    shoes: '👟 신발',
    bag: '👜 가방'
  };
  const titleEl = document.getElementById('ootdModalTitle');
  if (titleEl) {
    titleEl.innerText = `${catNames[activeCategory] || '🧥 외투'} 옷장 선택 & 관리`;
  }

  renderClosetModalList();
  const modal = document.getElementById('ootdClosetModal');
  if (modal) modal.classList.remove('hidden');
}

// OOTD 파이어베이스 즉시 동기화 함수
function syncOotdToFirestore() {
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  const selectedData = (typeof currentOotdSelected !== 'undefined') ? currentOotdSelected : {};
  
  // 1. 로컬 저장소 동기화
  try {
    const key = 'mingle_day_' + curDate;
    let d = JSON.parse(localStorage.getItem(key) || '{}');
    d.ootdSelected = selectedData;
    localStorage.setItem(key, JSON.stringify(d));
    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(curDate, d);
  } catch(e) {}

  // 2. 파이어베이스 클라우드 동기화 (기존 데이터 보존)
  if (typeof db !== 'undefined' && db) {
    db.collection('diary_days').doc(curDate).set({
      ootdSelected: selectedData
    }, { merge: true }).catch(err => console.error(err));
  }
}

function closeOotdClosetModal() {
  const modal = document.getElementById('ootdClosetModal');
  if (modal) modal.classList.add('hidden');
  syncOotdToFirestore();
  if (typeof renderOotd === 'function') renderOotd();
  if (typeof renderOotdSelectedList === 'function') renderOotdSelectedList();
}

// OOTD 옷별 착용 누적 횟수 계산 함수
function getClothWearCount(category, clothId) {
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mingle_day_')) {
        const d = JSON.parse(localStorage.getItem(key) || '{}');
        const target = (d && d.ootdSelected && d.ootdSelected[category]) || (d && d.ootd && d.ootd[category]);
        if (Array.isArray(target) && target.map(String).includes(String(clothId))) {
          count++;
        } else if (target && String(target) === String(clothId)) {
          count++;
        }
      }
    }
  } catch(e) {}
  return count;
}

function renderClosetModalList() {
  const container = document.getElementById('ootdClosetList');
  if (!container) return;
  container.innerHTML = '';

  const closet = getClosetData();
  let list = (closet[activeCategory] || []).slice();
  
  // 로컬 스토리지에서 최신 당일 데이터를 가장 먼저 직접 조회!
  let dayData = {};
  try {
    const key = 'mingle_day_' + currentDate;
    dayData = JSON.parse(localStorage.getItem(key) || '{}');
  } catch(e) {
    dayData = (typeof getDayDataLocal === 'function' ? getDayDataLocal(currentDate) : window.currentDayData) || {};
  }
  
  const selObj = dayData.ootdSelected || dayData.ootd || {};
  let selectedIds = selObj[activeCategory] || [];
  if (!Array.isArray(selectedIds)) selectedIds = selectedIds ? [String(selectedIds)] : [];

  if (list.length === 0) {
    container.innerHTML = '<span class="text-[11px] text-stone-400 p-2">등록된 옷이 없어요. 위에서 추가해 보세요!</span>';
    return;
  }

  // 착용 횟수 미리 계산 후 자주 입은 순 정렬
  list.forEach(item => {
    item._count = getClothWearCount(activeCategory, item.id);
  });
  list.sort((a, b) => b._count - a._count);

  list.forEach(item => {
    const isSelected = selectedIds.map(String).includes(String(item.id));
    const btn = document.createElement('div');
    btn.className = isSelected 
      ? 'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer select-none transition-all bg-amber-100 border-amber-300 font-bold text-amber-900 shadow-xs ring-1 ring-amber-400' 
      : 'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer select-none transition-all bg-white border-stone-200 text-stone-600 hover:bg-stone-50';

    btn.innerHTML = '' +
      '<span class="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0 pointer-events-none" style="background-color: ' + (item.color || '#A8A29E') + ';"></span>' +
      '<span class="cloth-title flex-1 pointer-events-none">' + item.name + '</span>' +
      '<span class="text-[10px] text-stone-400 font-normal shrink-0 pointer-events-none">(' + item._count + '회)</span>' +
      '<button type="button" onclick="event.stopPropagation(); editClothName(\'' + item.id + '\', \'' + item.name.replace(/'/g, "\\'") + '\')" title="이름 수정" class="text-stone-300 hover:text-stone-500 p-1 transition-colors flex items-center">' +
        '<svg class="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>' +
        '</svg>' +
      '</button>' +
      '<button type="button" onclick="event.stopPropagation(); deleteClothFromCloset(\'' + item.id + '\')" title="삭제" class="text-stone-300 hover:text-red-400 px-1 text-sm font-bold transition-colors">×</button>';

    btn.onclick = () => {
      toggleSelectCloth(activeCategory, item.id);
    };

    container.appendChild(btn);
  });
}

function toggleSelectCloth(category, id) {
  const strId = String(id);
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  const key = 'mingle_day_' + curDate;
  let dayData = {};
  try {
    dayData = JSON.parse(localStorage.getItem(key)) || {};
  } catch(e) {
    dayData = {};
  }

  if (!dayData.ootdSelected) dayData.ootdSelected = {};
  if (!dayData.ootd) dayData.ootd = {};
  if (!dayData.ootdNames) dayData.ootdNames = {};
  if (!dayData.ootdColors) dayData.ootdColors = {};

  let arr = [];
  const sourceArr = dayData.ootdSelected[category] || dayData.ootd[category];
  if (Array.isArray(sourceArr)) {
    arr = sourceArr.map(String);
  } else if (sourceArr) {
    arr = [String(sourceArr)];
  }

  const closet = getClosetData();
  const cloth = (closet[category] || []).find(c => String(c.id) === strId || c.name === strId);
  const clothName = cloth ? cloth.name : strId;
  const clothColor = cloth ? (cloth.color || detectClothColor(clothName)) : detectClothColor(clothName);

  if (arr.includes(strId)) {
    arr = arr.filter(x => x !== strId);
    if (dayData.ootdNames[category]) delete dayData.ootdNames[category][strId];
    if (dayData.ootdColors[category]) delete dayData.ootdColors[category][strId];
  } else {
    arr.push(strId);
    if (!dayData.ootdNames[category]) dayData.ootdNames[category] = {};
    if (!dayData.ootdColors[category]) dayData.ootdColors[category] = {};
    dayData.ootdNames[category][strId] = clothName;
    dayData.ootdColors[category][strId] = clothColor;

    if (category === 'top' || category === 'outer') {
      if (clothColor && (!dayData.ootd.color || dayData.ootd.color === '#ecdcc9')) {
        dayData.ootd.color = clothColor;
      }
    }
  }

  dayData.ootdSelected[category] = arr;
  dayData.ootd[category] = arr;

  try {
    localStorage.setItem(key, JSON.stringify(dayData));
    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(curDate, dayData);
  } catch(e) {}

  if (window.currentDayData) {
    window.currentDayData.ootdSelected = dayData.ootdSelected;
    window.currentDayData.ootd = dayData.ootd;
    window.currentDayData.ootdNames = dayData.ootdNames;
    window.currentDayData.ootdColors = dayData.ootdColors;
    if (dayData.ootd && dayData.ootd.color) window.currentDayData.ootd.color = dayData.ootd.color;
  }

  // ☁️ 파이어베이스 즉시 동기화 (이름과 색상까지 함께 전송)
  if (typeof db !== 'undefined' && db) {
    db.collection('diary_days').doc(curDate).set({
      ootdSelected: dayData.ootdSelected,
      ootd: dayData.ootd,
      ootdNames: dayData.ootdNames,
      ootdColors: dayData.ootdColors
    }, { merge: true }).catch(err => console.error(err));
  }

  renderClosetModalList();
  if (typeof renderOotd === 'function') {
    try { renderOotd(); } catch(e) {}
  }
  if (typeof renderTodayOotd === 'function') {
    try { renderTodayOotd(); } catch(e) {}
  }
  if (typeof renderCalendar === 'function') {
    try { renderCalendar(); } catch(e) {}
  }
}

function addNewClothToCloset() {
  const input = document.getElementById('ootdNewClothInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;

  const color = typeof detectClothColor === 'function' ? detectClothColor(name) : '#A8A29E';
  const closet = getClosetData();
  
  if (!closet[activeCategory]) {
    closet[activeCategory] = [];
  }

  const newId = String(Date.now());
  closet[activeCategory].push({ id: newId, name: name, color: color });
  saveClosetData(closet);

  input.value = '';
  renderClosetModalList();
  toggleSelectCloth(activeCategory, newId);
}

function editClothName(id, oldName) {
  const newName = prompt('옷 이름을 수정할까요?', oldName);
  if (!newName || newName.trim() === '' || newName === oldName) return;

  const closet = getClosetData();
  const cloth = (closet[activeCategory] || []).find(c => String(c.id) === String(id));
  if (cloth) {
    cloth.name = newName.trim();
    cloth.color = detectClothColor(newName.trim());
    saveClosetData(closet);
    renderClosetModalList();
    renderOotd();
  }
}

function deleteClothFromCloset(id) {
  if (!confirm('내 옷장에서 이 옷을 완전히 삭제할까요?')) return;
  const closet = getClosetData();
  closet[activeCategory] = (closet[activeCategory] || []).filter(c => String(c.id) !== String(id));
  saveClosetData(closet);

  let dayData = typeof getDayDataLocal === 'function' ? getDayDataLocal(currentDate) : (window.currentDayData || {});
  if (dayData && dayData.ootd && Array.isArray(dayData.ootd[activeCategory])) {
    dayData.ootd[activeCategory] = dayData.ootd[activeCategory].filter(x => String(x) !== String(id));
    if (typeof saveDayData === 'function') saveDayData();
  }

  renderClosetModalList();
  renderOotd();
}

    function searchMusicTrack() {
      const q = document.getElementById('bgmSearchInput').value.trim();
      if (!q) return;
      document.getElementById('bgmInfoText').innerText = "음악 검색 중... 🎵";

      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const track = data.results[0];
            const coverUrl = track.artworkUrl100.replace('100x100bb', '300x300bb');
            const info = `${track.trackName} - ${track.artistName}`;
            
            document.getElementById('bgmCoverImg').src = coverUrl;
            document.getElementById('bgmInfoText').innerText = info;
            document.getElementById('bgmSearchInput').value = track.trackName;
            saveDayData();
          } else {
            document.getElementById('bgmInfoText').innerText = "검색 결과가 없어요 😢";
          }
        })
        .catch(err => {
          console.error(err);
          document.getElementById('bgmInfoText').innerText = "음악 정보를 불러오지 못했어요";
        });
    }

    // 데일리 데이터 동기화 (순수 파이어베이스 직통)
    function subscribeDayData(dateStr) {
      if (unsubscribeDay) unsubscribeDay();

      // 날짜 변경 즉시 이전 날짜 잔상 메모리 초기화
      window.currentDayData = { date: dateStr, expenses: [], ootdSelected: {}, ootd: {} };
      applyDayDataToUI(window.currentDayData);

      if (!db) return;
      unsubscribeDay = db.collection('diary_days').doc(dateStr)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data() || {};
            data.date = dateStr;
            window.currentDayData = data;
            saveDayDataLocal(dateStr, data);
            applyDayDataToUI(data);
          } else {
            // 해당 날짜에 기록이 없으면 깨끗하게 빈 화면으로 리셋!
            const emptyData = { date: dateStr, expenses: [], ootdSelected: {}, ootd: {} };
            window.currentDayData = emptyData;
            applyDayDataToUI(emptyData);
          }

          // 위젯 및 달력 동기화
          if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
          if (typeof renderTodayExpenses === 'function') renderTodayExpenses();
          if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
          if (typeof renderOotdSelectedList === 'function') renderOotdSelectedList();
        }, err => console.error(err));
    }

    function getDayDataLocal(dateStr) {
      const all = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');
      return all[dateStr] || {};
    }

    function saveDayDataLocal(dateStr, data) {
      const all = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');
      all[dateStr] = data;
      localStorage.setItem('mingle_diary_days', JSON.stringify(all));
    }

    function saveDayData() {
      const timetableData = {};
      for (let h = 7; h <= 24; h++) {
        const hourStr = h < 10 ? `0${h}` : `${h}`;
        for (let b = 0; b < 6; b++) {
          const cell = document.getElementById(`cell_${hourStr}_${b}`);
          if (cell && cell.innerText) {
            timetableData[`${hourStr}_${b}`] = {
              text: cell.innerText,
              category: cell.dataset.category || 'custom'
            };
          }
        }
      }

      const existing = getDayDataLocal(currentDate) || {};

      const data = {
        ...existing,
        weather: document.getElementById('todayWeatherSelect')?.value || '',
        mood: document.getElementById('todayMoodSelect')?.value || '',
        ootd: {
          ...(existing.ootd || {}),
          text: document.getElementById('ootdTextInput')?.value || (existing.ootd?.text || ''),
          color: (existing.ootd && existing.ootd.color) ? existing.ootd.color : (document.getElementById('ootdColorInput')?.value || '#ecdcc9')
        },
        ootdSelected: (typeof currentOotdSelected !== 'undefined') ? currentOotdSelected : (existing.ootdSelected || {}),
        expenses: existing.expenses || [],
        bgm: {
          song: document.getElementById('bgmSearchInput')?.value || '',
          info: document.getElementById('bgmInfoText')?.innerText || '',
          cover: document.getElementById('bgmCoverImg')?.src || ''
        },
        health: {
          sleepBed: document.getElementById('sleepBedTime').value,
          sleepWake: document.getElementById('sleepWakeTime').value,
          weight: document.getElementById('todayWeight').value,
          snacks: {
            amTime: document.getElementById('snackTime_am')?.value || '',
            amMenu: document.getElementById('snackMenu_am')?.value || '',
            pmTime: document.getElementById('snackTime_pm')?.value || '',
            pmMenu: document.getElementById('snackMenu_pm')?.value || '',
            nightTime: document.getElementById('snackTime_night')?.value || '',
            nightMenu: document.getElementById('snackMenu_night')?.value || ''
          },
          meals: [1, 2, 3].map(i => ({
            time: document.getElementById(`mealTime_${i}`).value,
            sugarPost: document.getElementById(`sugarPost_${i}`).value,
            menu: document.getElementById(`mealMenu_${i}`).value,
            vege: document.getElementById(`mealVege_${i}`)?.checked || false,
            acv: document.getElementById(`mealAcv_${i}`)?.checked || false,
            walk: document.getElementById(`mealWalk_${i}`)?.checked || false,
            cond: document.getElementById(`mealCond_${i}`).value,
            sugarFast: i === 1 ? document.getElementById('sugarFast').value : null
          }))
        },
        knit: {
          project: document.getElementById('knitCurrentProject').value,
          rows: document.getElementById('knitRowCount').innerText,
          tip: document.getElementById('knitSectionTip')?.value || ''
        },
        book: {
          title: document.getElementById('bookCurrentTitle').value,
          pages: document.getElementById('bookTodayPages').value
        },
        memo: document.getElementById('dailyMemo').value,
        timetable: timetableData,
        waterCount: existing.waterCount || 0,
        acvCount: existing.acvCount || 0,
        coffeeCount: existing.coffeeCount || 0
      };

      saveDayDataLocal(currentDate, data);
      if (db) db.collection('diary_days').doc(currentDate).set(data).catch(console.error);

      renderMoodTracker();
      renderCalendar();
      renderRoutineProgressTracker();
      renderHealthTracker();
    }

    function applyDayDataToUI(data) {
      data = data || {};
      window.currentDayData = data; // 이전 날짜 찌꺼기 강제 덮어쓰기 영구 박멸!
      initTimetableGrid();

      const weatherEl = document.getElementById('todayWeatherSelect');
      if (weatherEl) weatherEl.value = data.weather || '';

      const moodEl = document.getElementById('todayMoodSelect');
      if (moodEl) moodEl.value = data.mood || '';

    if (data.ootd) {
      const oldOotdInput = document.getElementById('ootdTextInput');
      if (oldOotdInput) oldOotdInput.value = data.ootd.text || '';
      
      const oColorInput = document.getElementById('ootdColorInput');
      if (oColorInput) oColorInput.value = data.ootd.color || '#ecdcc9';
      
      const oColorBadge = document.getElementById('ootdColorBadge');
      if (oColorBadge) oColorBadge.style.backgroundColor = data.ootd.color || '#ecdcc9';

      const oMemoInput = document.getElementById('ootdMemoInput');
      if (oMemoInput) oMemoInput.value = data.ootd.memo || '';
    }
      // 👗 OOTD 선택 옷 데이터 복원 및 렌더링
  if (data.ootdSelected) {
    if (typeof currentOotdSelected !== 'undefined') {
      currentOotdSelected = data.ootdSelected;
    }
    if (typeof renderOotdSelectedList === 'function') {
      renderOotdSelectedList();
    }
  }
  // 🎨 대표 컬러 즉시 동기화 반영
  const remoteOotdColor = (data && data.ootd && data.ootd.color) ? data.ootd.color : ((data && data.ootdColor) ? data.ootdColor : null);
  if (remoteOotdColor) {
    if (!window.currentDayData) window.currentDayData = {};
    if (!window.currentDayData.ootd) window.currentDayData.ootd = {};
    window.currentDayData.ootd.color = remoteOotdColor;
    const badge = document.getElementById('ootdColorBadge');
    const input = document.getElementById('ootdColorInput');
    if (badge) badge.style.backgroundColor = remoteOotdColor;
    if (input) input.value = remoteOotdColor;
  }
  if (typeof renderOotd === 'function') renderOotd();

  // 💸 클라우드 지출 데이터 즉시 반영 및 렌더링
  if (data && Array.isArray(data.expenses)) {
    if (!window.currentDayData) window.currentDayData = {};
    window.currentDayData.expenses = data.expenses;
    const curD = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
    try {
      const k = 'mingle_day_' + curD;
      let d = JSON.parse(localStorage.getItem(k) || '{}');
      d.expenses = data.expenses;
      localStorage.setItem(k, JSON.stringify(d));
    } catch(e) {}
  }
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
  if (typeof renderTodayExpenses === 'function') renderTodayExpenses();
  if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();

      if (data.bgm) {
        document.getElementById('bgmSearchInput').value = data.bgm.song || '';
        document.getElementById('bgmInfoText').innerText = data.bgm.info || 'BGM을 검색해보세요';
        if (data.bgm.cover) document.getElementById('bgmCoverImg').src = data.bgm.cover;
      }

      if (data.health) {
        document.getElementById('sleepBedTime').value = data.health.sleepBed || '';
        document.getElementById('sleepWakeTime').value = data.health.sleepWake || '';
        document.getElementById('todayWeight').value = data.health.weight || '';

        if (data.health.snacks) {
          if (document.getElementById('snackTime_am')) document.getElementById('snackTime_am').value = data.health.snacks.amTime || '';
          if (document.getElementById('snackMenu_am')) document.getElementById('snackMenu_am').value = data.health.snacks.amMenu || '';
          if (document.getElementById('snackTime_pm')) document.getElementById('snackTime_pm').value = data.health.snacks.pmTime || '';
          if (document.getElementById('snackMenu_pm')) document.getElementById('snackMenu_pm').value = data.health.snacks.pmMenu || '';
          if (document.getElementById('snackTime_night')) document.getElementById('snackTime_night').value = data.health.snacks.nightTime || '';
          if (document.getElementById('snackMenu_night')) document.getElementById('snackMenu_night').value = data.health.snacks.nightMenu || '';
        }

        if (data.health.meals) {
          data.health.meals.forEach((m, idx) => {
            const i = idx + 1;
            document.getElementById(`mealTime_${i}`).value = m.time || '';
            document.getElementById(`sugarPost_${i}`).value = m.sugarPost || '';
            document.getElementById(`mealMenu_${i}`).value = m.menu || '';
            if (document.getElementById(`mealVege_${i}`)) document.getElementById(`mealVege_${i}`).checked = !!m.vege;
            if (document.getElementById(`mealAcv_${i}`)) document.getElementById(`mealAcv_${i}`).checked = !!m.acv;
            if (document.getElementById(`mealWalk_${i}`)) document.getElementById(`mealWalk_${i}`).checked = !!m.walk;
            document.getElementById(`mealCond_${i}`).value = m.cond || '';
            if (i === 1) document.getElementById('sugarFast').value = m.sugarFast || '';
          });
        }
      }

      renderDrinkTracker(data);

      if (data.knit) {
        document.getElementById('knitCurrentProject').value = data.knit.project || '';
        document.getElementById('knitRowCount').innerText = data.knit.rows || '0';
        if (document.getElementById('knitSectionTip')) document.getElementById('knitSectionTip').value = data.knit.tip || '';
      }
      if (data.book) {
        document.getElementById('bookCurrentTitle').value = data.book.title || '';
        document.getElementById('bookTodayPages').value = data.book.pages || '';
      }
      document.getElementById('dailyMemo').value = data.memo || '';

      if (data.timetable) {
        Object.keys(data.timetable).forEach(k => {
          const [h, b] = k.split('_');
          const item = data.timetable[k];
          if (typeof item === 'object') {
            setBlockData(h, parseInt(b), item.text, item.category);
          } else {
            setBlockData(h, parseInt(b), item, 'custom');
          }
        });
      }

      renderDynamicRoutines();
      updateTodaySpecialBanner();

      if (timetableViewMode === 'timeline') renderVerticalTimeline();
    }

    // 캘린더 약속 / 일정 & 클릭 수정
    function initCalEventCategoryButtons() {
      const container = document.getElementById('calEventCategoryContainer');
      if (!container) return;
      container.innerHTML = EVENT_CATEGORIES.map(c => `
        <button type="button" onclick="selectCalEventCategory('${c.key}')" id="cec_btn_${c.key}" class="py-1 px-1.5 rounded-lg border text-[11px] font-bold text-center truncate ${c.key === selectedCalEventCategory ? c.bg : 'border-stone-200 bg-stone-50 text-stone-600'}">
          ${c.icon} ${c.label}
        </button>
      `).join('');
    }

    function selectCalEventCategory(key) {
      selectedCalEventCategory = key;
      EVENT_CATEGORIES.forEach(c => {
        const btn = document.getElementById(`cec_btn_${c.key}`);
        if (btn) {
          if (c.key === key) btn.className = `py-1 px-1.5 rounded-lg border text-[11px] font-bold text-center truncate ${c.bg}`;
          else btn.className = 'py-1 px-1.5 rounded-lg border text-[11px] font-bold text-center truncate border-stone-200 bg-stone-50 text-stone-600';
        }
      });
    }

    function toggleCalEventRepeat(checked) {
      const box = document.getElementById('calEventRepeatDaysBox');
      if (checked) {
        box.classList.remove('hidden');
        renderCalRepeatDays();
      } else {
        box.classList.add('hidden');
      }
    }

    function toggleCalRepeatDay(dayNum) {
      const idx = calEventRepeatDays.indexOf(dayNum);
      if (idx > -1) {
        calEventRepeatDays.splice(idx, 1);
      } else {
        calEventRepeatDays.push(dayNum);
      }
      renderCalRepeatDays();
    }

    function renderCalRepeatDays() {
      [0, 1, 2, 3, 4, 5, 6].forEach(d => {
        const btn = document.getElementById(`crd_${d}`);
        if (btn) {
          if (calEventRepeatDays.includes(d)) {
            btn.className = 'px-2 py-0.5 rounded border border-amber-300 bg-amber-100 text-amber-900 font-bold';
          } else {
            btn.className = 'px-2 py-0.5 rounded border border-stone-200 bg-white text-stone-600';
          }
        }
      });
    }

    function changeCalMonth(delta) {
      calMonth += delta;
      if (calMonth < 0) { calMonth = 11; calYear--; }
      if (calMonth > 11) { calMonth = 0; calYear++; }
      renderCalendar();
      renderUpcomingEvents();
      renderTicketList();
      renderAnniversaries();
    }

    function subscribeCalendarEvents() {
      renderCalendar();
      renderUpcomingEvents();
      if (!db) return;
      if (unsubscribeCalEvents) unsubscribeCalEvents();
      unsubscribeCalEvents = db.collection('calendar_events').doc('all')
        .onSnapshot(doc => {
          if (doc.exists) {
            localStorage.setItem('mingle_cal_events', JSON.stringify(doc.data().events || []));
            renderCalendar();
            renderUpcomingEvents();
            updateTodaySpecialBanner();
          }
        }, err => console.error(err));
    }

    function getCalendarEvents() {
      return JSON.parse(localStorage.getItem('mingle_cal_events') || '[]');
    }

    function saveCalendarEvents(events) {
      localStorage.setItem('mingle_cal_events', JSON.stringify(events));
      renderCalendar();
      renderUpcomingEvents();
      updateTodaySpecialBanner();
      if (db) db.collection('calendar_events').doc('all').set({ events }).catch(console.error);
    }

    function setEventFilter(mode) {
      eventFilterMode = mode;
      ['7', '30', 'all'].forEach(m => {
        const btn = document.getElementById(`eventFilter_${m}`);
        if (btn) {
          if (m === mode) btn.className = 'px-2 py-0.5 rounded-full bg-stone-800 text-white font-semibold';
          else btn.className = 'px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold';
        }
      });
      renderUpcomingEvents();
    }

    function openCalendarEventModal(eventId = null) {
      editingEventId = eventId;
      const sTimeInp = document.getElementById('calEventStartTime');
      const eTimeInp = document.getElementById('calEventEndTime');

      if (eventId) {
        const ev = getCalendarEvents().find(e => e.id === eventId);
        if (ev) {
          document.getElementById('calEventModalTitle').innerHTML = '<span>📌</span> 일정 / 약속 수정';
          document.getElementById('calEventTitle').value = ev.title;
          document.getElementById('calEventStart').value = ev.start;
          document.getElementById('calEventEnd').value = ev.end;
          if (sTimeInp) sTimeInp.value = ev.startTime || '';
          if (eTimeInp) eTimeInp.value = ev.endTime || '';
          document.getElementById('calEventRepeatToggle').checked = !!ev.isRepeat;
          calEventRepeatDays = ev.repeatDays ? [...ev.repeatDays] : [];
          toggleCalEventRepeat(!!ev.isRepeat);
          selectCalEventCategory(ev.category || 'family');
        }
      } else {
        document.getElementById('calEventModalTitle').innerHTML = '<span>📌</span> 일정 / 약속 등록';
        document.getElementById('calEventTitle').value = '';
        document.getElementById('calEventStart').value = currentDate;
        document.getElementById('calEventEnd').value = currentDate;
        if (sTimeInp) sTimeInp.value = '';
        if (eTimeInp) eTimeInp.value = '';
        document.getElementById('calEventRepeatToggle').checked = false;
        calEventRepeatDays = [];
        document.getElementById('calEventRepeatDaysBox').classList.add('hidden');
        selectCalEventCategory('family');
      }
      document.getElementById('calendarEventModal').classList.remove('hidden');
    }

    function closeCalendarEventModal() {
      document.getElementById('calendarEventModal').classList.add('hidden');
      editingEventId = null;
    }

    function saveCalendarEvent() {
      const title = document.getElementById('calEventTitle').value.trim();
      const start = document.getElementById('calEventStart').value;
      const end = document.getElementById('calEventEnd').value || start;
      const startTime = document.getElementById('calEventStartTime')?.value.trim() || '';
      const endTime = document.getElementById('calEventEndTime')?.value.trim() || '';
      if (!title || !start) return;

      const isRepeat = document.getElementById('calEventRepeatToggle').checked;
      let events = getCalendarEvents();

      if (editingEventId) {
        const idx = events.findIndex(e => e.id === editingEventId);
        if (idx > -1) {
          events[idx].title = title;
          events[idx].start = start;
          events[idx].end = end;
          events[idx].startTime = startTime;
          events[idx].endTime = endTime;
          events[idx].category = selectedCalEventCategory;
          events[idx].isRepeat = isRepeat;
          events[idx].repeatDays = isRepeat ? [...calEventRepeatDays] : null;
        }
      } else {
        events.push({
          id: Date.now(),
          title,
          start,
          end,
          startTime,
          endTime,
          category: selectedCalEventCategory,
          isRepeat,
          repeatDays: isRepeat ? [...calEventRepeatDays] : null,
          skippedDates: []
        });
      }

      saveCalendarEvents(events);
      closeCalendarEventModal();
    }

    function deleteCalendarEvent(id) {
      let events = getCalendarEvents();
      events = events.filter(e => e.id !== id);
      saveCalendarEvents(events);
    }

    // 🎫 예매 확인 (단골 지명 퀵 칩 & 즐겨찾기)
    const DEFAULT_FAV_PLACES = ['부산', '진주', '사천', '서울'];

    function getFavPlaces() {
      return JSON.parse(localStorage.getItem('mingle_fav_places') || JSON.stringify(DEFAULT_FAV_PLACES));
    }

function saveFavPlaces(places) {
  localStorage.setItem('mingle_fav_places', JSON.stringify(places));
  renderFavPlaceChips();

  // ☁️ 자주 가는 장소 Firestore 클라우드 즉시 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('tickets_data').doc('fav_places').set({
      places: places
    }, { merge: true }).catch(console.error);
  }
}

    function promptAddPlaceChip() {
      const place = prompt("자주 가는 도시/지명을 입력해주세요:\n(예: 대전, 대구, 순천)");
      if (!place || !place.trim()) return;
      const places = getFavPlaces();
      places.push(place.trim());
      saveFavPlaces(places);
    }

    function deletePlaceChip(idx) {
      const places = getFavPlaces();
      places.splice(idx, 1);
      saveFavPlaces(places);
    }

    function fillPlaceIntoInput(place) {
      const targetInput = document.getElementById(activePlaceInputId) || document.getElementById('ticketDepartPlace');
      if (targetInput) {
        targetInput.value = place;
        targetInput.focus();
      }
    }

    function renderFavPlaceChips() {
      const container = document.getElementById('favPlacesChipContainer');
      if (!container) return;
      const places = getFavPlaces();

      container.innerHTML = places.map((p, idx) => `
        <div class="inline-flex items-center rounded-lg border border-sky-200 bg-white text-[11px] font-semibold text-sky-900 shadow-2xs">
          <span onclick="fillPlaceIntoInput('${p}')" class="px-2 py-0.5 cursor-pointer hover:bg-sky-50">${p}</span>
          <button onclick="deletePlaceChip(${idx})" class="pr-1 text-[9px] text-stone-300 hover:text-rose-500">✕</button>
        </div>
      `).join('');
    }

    let unsubscribeCompletedTickets = null;
    let unsubscribeFavPlaces = null;
    function subscribeTicketData() {
      renderTicketList();
      if (!db) return;
      if (unsubscribeTickets) unsubscribeTickets();
      unsubscribeTickets = db.collection('tickets_data').doc('all')
        .onSnapshot(doc => {
          if (doc.exists) {
            localStorage.setItem('mingle_tickets', JSON.stringify(doc.data().tickets || []));
            renderTicketList();
            renderCalendar();
            updateTodaySpecialBanner();
          }
        }, err => console.error(err));

      // ☁️ 탑승완료 상태 실시간 동기화
      if (unsubscribeCompletedTickets) unsubscribeCompletedTickets();
      unsubscribeCompletedTickets = db.collection('tickets_data').doc('completed')
        .onSnapshot(doc => {
          if (doc.exists) {
            const ids = (doc.data() && doc.data().completedIds) || [];
            localStorage.setItem('mingle_completed_tickets', JSON.stringify(ids));
            updateTodaySpecialBanner();
          }
        }, err => console.error(err));

      // ☁️ 자주 가는 장소 실시간 동기화
      if (unsubscribeFavPlaces) unsubscribeFavPlaces();
      unsubscribeFavPlaces = db.collection('tickets_data').doc('fav_places')
        .onSnapshot(doc => {
          if (doc.exists) {
            const places = (doc.data() && doc.data().places) || [];
            if (Array.isArray(places) && places.length > 0) {
              localStorage.setItem('mingle_fav_places', JSON.stringify(places));
              if (typeof renderFavPlaceChips === 'function') renderFavPlaceChips();
            }
          }
        }, err => console.error(err));
    }

    function getTicketsLocal() {
      return JSON.parse(localStorage.getItem('mingle_tickets') || '[]');
    }

    function saveTicketsLocal(tickets) {
      localStorage.setItem('mingle_tickets', JSON.stringify(tickets));
      renderTicketList();
      renderCalendar();
      updateTodaySpecialBanner();
      if (db) db.collection('tickets_data').doc('all').set({ tickets }).catch(console.error);
    }

    function setTicketFilter(mode) {
      ticketFilterMode = mode;
      ['7', '30', 'all'].forEach(m => {
        const btn = document.getElementById(`ticketFilter_${m}`);
        if (btn) {
          if (m === mode) btn.className = 'px-2 py-0.5 rounded-full bg-stone-800 text-white font-semibold';
          else btn.className = 'px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold';
        }
      });
      renderTicketList();
    }

    function openTicketModal(ticketId = null) {
      editingTicketId = ticketId;
      renderFavPlaceChips();
      if (ticketId) {
        const t = getTicketsLocal().find(item => item.id === ticketId);
        if (t) {
          document.getElementById('ticketModalTitle').innerHTML = '<span>🎫</span> 승차권 / 예매 수정';
          selectTicketType(t.type);
          document.getElementById('ticketDepartPlace').value = t.depart;
          document.getElementById('ticketArrivePlace').value = t.arrive;
          document.getElementById('ticketDate').value = t.date;
          document.getElementById('ticketTime').value = t.time;
          document.getElementById('ticketSeatMemo').value = t.seatMemo || '';
        }
      } else {
        document.getElementById('ticketModalTitle').innerHTML = '<span>🎫</span> 승차권 / 예매 등록';
        selectTicketType('bus');
        document.getElementById('ticketDepartPlace').value = '';
        document.getElementById('ticketArrivePlace').value = '';
        document.getElementById('ticketDate').value = currentDate;
        document.getElementById('ticketTime').value = '14:00';
        document.getElementById('ticketSeatMemo').value = '';
      }
      document.getElementById('ticketModal').classList.remove('hidden');
    }

    function closeTicketModal() {
      document.getElementById('ticketModal').classList.add('hidden');
      editingTicketId = null;
    }

    function selectTicketType(type) {
      selectedTicketType = type;
      ['bus', 'train', 'flight'].forEach(t => {
        const btn = document.getElementById(`tt_btn_${t}`);
        if (btn) {
          if (t === type) btn.className = 'py-1 rounded-lg border border-sky-300 bg-sky-100 text-sky-900 font-bold text-center';
          else btn.className = 'py-1 rounded-lg border border-stone-200 bg-stone-50 text-stone-600 text-center';
        }
      });
    }

    function saveTicketData() {
      const depart = document.getElementById('ticketDepartPlace').value.trim();
      const arrive = document.getElementById('ticketArrivePlace').value.trim();
      const date = document.getElementById('ticketDate').value;
      const time = document.getElementById('ticketTime').value;
      const seatMemo = document.getElementById('ticketSeatMemo').value.trim();
      if (!depart || !arrive || !date) return;

      let tickets = getTicketsLocal();
      if (editingTicketId) {
        const idx = tickets.findIndex(t => t.id === editingTicketId);
        if (idx > -1) {
          tickets[idx].type = selectedTicketType;
          tickets[idx].depart = depart;
          tickets[idx].arrive = arrive;
          tickets[idx].date = date;
          tickets[idx].time = time;
          tickets[idx].seatMemo = seatMemo;
        }
      } else {
        tickets.push({
          id: Date.now(),
          type: selectedTicketType,
          depart,
          arrive,
          date,
          time,
          seatMemo
        });
      }

      saveTicketsLocal(tickets);
      closeTicketModal();
    }

    function deleteTicketData(id) {
      let tickets = getTicketsLocal();
      tickets = tickets.filter(t => t.id !== id);
      saveTicketsLocal(tickets);
    }

function renderTicketList() {
  const container = document.getElementById('ticketReservationList');
  if (!container) return;
  const tickets = getTicketsLocal();
  const todayObj = new Date(REAL_TODAY_STR);

  // 날짜+시간 순 정렬 (전체보기일 때 과거 내역도 정렬되어 나옴)
  tickets.sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));

  const filtered = tickets.filter(t => {
    const tDate = new Date(t.date);
    const diff = Math.ceil((tDate - todayObj) / (1000 * 60 * 60 * 24));

    if (ticketFilterMode === '7') {
      return t.date >= REAL_TODAY_STR && diff <= 7;
    }
    if (ticketFilterMode === '30') {
      return t.date >= REAL_TODAY_STR && diff <= 30;
    }
    return true; // 전체보기('all')는 과거 티켓까지 전부 노출!
  });

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-[11px] text-stone-300 py-3 text-center">해당 기간에 예매된 승차권이 없어요 🌿</p>`;
        return;
      }

      const iconMap = { bus: '🚌 버스', train: '🚅 기차', flight: '✈️ 비행기' };

  container.innerHTML = filtered.map(t => {
    const tDate = new Date(t.date);
    const diff = Math.ceil((tDate - todayObj) / (1000 * 60 * 60 * 24));
    const isPast = diff < 0;

    // 디데이 뱃지: 오늘이면 '오늘 출발', 미래면 'D-day', 과거는 뱃지 없이 깔끔하게!
    let badgeHtml = '';
    if (diff === 0) {
      badgeHtml = '<span class="font-bold px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white animate-pulse">오늘 출발</span>';
    } else if (diff > 0) {
      const badgeColor = diff <= 7 ? 'text-rose-600 bg-rose-50' : 'text-sky-600 bg-sky-50';
      badgeHtml = `<span class="font-bold px-2 py-0.5 rounded-full text-[10px] ${badgeColor}">D-${diff}</span>`;
    } else {
      // 지난 티켓은 D--1 대신 깔끔하고 단정한 연회색 텍스트로!
      badgeHtml = '<span class="text-[10px] text-stone-400 font-medium">지난 일정</span>';
    }

    // 카드 스타일: 지난 일정은 살짝 은은하게 톤다운
    const cardBg = isPast 
      ? 'border-stone-200 bg-stone-50/70 text-stone-400 opacity-60' 
      : 'border-sky-200 bg-sky-50/60 text-stone-700';

    return `
      <div class="p-2.5 rounded-xl border ${cardBg} flex items-center justify-between text-xs transition-all">
        <div onclick="openTicketModal(${t.id})" class="min-w-0 pr-2 flex-1 cursor-pointer hover:opacity-80">
          <div class="font-bold flex items-center gap-1.5 flex-wrap">
            <span>${iconMap[t.type] || '🎫'} ${t.depart || ''} → ${t.arrive || ''}</span>
            ${t.time ? `<span class="text-[10px] px-1.5 py-0.2 rounded-md bg-white/80 border border-stone-200 font-normal">${t.time}</span>` : ''}
          </div>
          <div class="text-[11px] text-stone-400 mt-0.5">
            ${t.date}${t.seatMemo ? ` · ${t.seatMemo}` : ''}
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          ${badgeHtml}
          <button onclick="deleteTicketData(${t.id})" class="text-stone-300 hover:text-stone-500 text-xs">✕</button>
        </div>
      </div>
    `;
  }).join('');
 }

    function renderUpcomingEvents() {
      const container = document.getElementById('upcomingEventsList');
      if (!container) return;
      const events = getCalendarEvents();
      const now = new Date(REAL_TODAY_STR);

  // 날짜순 오름차순 정렬 (과거부터 미래 순으로 깔끔하게 정렬)
  events.sort((a, b) => (a.start || '').localeCompare(b.start || ''));

  // 7일 이내 다가올 일정이 있으면 기본 필터를 '7'로 스마트 전환
  if (typeof eventFilterMode !== 'undefined') {
    const hasUrgent = events.some(e => {
      if (e.isRepeat) return false;
      const startD = new Date(e.start);
      const diff = Math.ceil((startD - now) / (1000 * 60 * 60 * 24));
      return (e.end || e.start) >= REAL_TODAY_STR && diff <= 7;
    });

    if (hasUrgent && eventFilterMode === '30') {
      eventFilterMode = '7';
      ['7', '30', 'all'].forEach(m => {
        const btn = document.getElementById(`eventFilter_${m}`);
        if (btn) {
          if (m === '7') btn.className = 'px-2 py-0.5 rounded-full bg-stone-800 text-white font-semibold';
          else btn.className = 'px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold';
        }
      });
    }
  }

  const filtered = events.filter(e => {
    if (e.isRepeat) return true;
    const startD = new Date(e.start);
    const diff = Math.ceil((startD - now) / (1000 * 60 * 60 * 24));

    if (eventFilterMode === '7') {
      return (e.end || e.start) >= REAL_TODAY_STR && diff <= 7;
    }
    if (eventFilterMode === '30') {
      return (e.end || e.start) >= REAL_TODAY_STR && diff <= 30;
    }
    return true; // 전체보기('all')는 과거에 끝난 일정도 다이어리처럼 전부 노출!
  });

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-[11px] text-stone-300 py-3 text-center">해당 기간에 예정된 약속이나 일정이 없어요 🌿</p>`;
        return;
      }

      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

      container.innerHTML = filtered.map(e => {
        const catMeta = EVENT_CATEGORIES.find(c => c.key === e.category) || EVENT_CATEGORIES[6];
        const startD = new Date(e.start);
        const diff = Math.ceil((startD - now) / (1000 * 60 * 60 * 24));
        
        // 디데이 뱃지: 오늘이면 다른 탭들처럼 '오늘'로 통일!
        let ddayText = '';
        let badgeStyle = catMeta.bg;

        if (e.isRepeat) {
          ddayText = '반복일정';
        } else if (diff === 0) {
          ddayText = '오늘';
          badgeStyle = 'bg-rose-500 text-white animate-pulse shadow-xs';
        } else if (diff < 0) {
          ddayText = '진행중';
        } else {
          ddayText = `D-${diff}`;
        }

        // 반복 요일 텍스트 조합 (예: 매주 월요일 또는 매주 화, 목)
        let repeatDaysText = '매주 반복 일정';
        if (e.isRepeat && Array.isArray(e.repeatDays) && e.repeatDays.length > 0) {
          const sortedDays = [...e.repeatDays].sort((a, b) => a - b).map(d => dayNames[d]);
          repeatDaysText = `매주 (${sortedDays.join(', ')})`;
        }

        const timeStr = e.startTime ? ` (${e.startTime}${e.endTime ? '~' + e.endTime : ''})` : '';

        return `
          <div class="p-2 rounded-xl border flex items-center justify-between text-xs bg-stone-50 border-stone-100 text-stone-800">
            <div onclick="openCalendarEventModal(${e.id})" class="min-w-0 pr-2 flex-1 cursor-pointer hover:opacity-80" title="클릭하여 일정 수정">
              <span class="font-bold flex items-center gap-1">
                <span>${catMeta.icon} ${e.title}</span>
                ${EDIT_SVG_ICON}
              </span>
              <span class="text-[10px] text-stone-400 block">${e.isRepeat ? repeatDaysText : `${e.start} ~${e.end}`}${timeStr}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}">${ddayText}</span>
              <button onclick="deleteCalendarEvent(${e.id})" class="text-stone-300 hover:text-stone-500 text-xs px-1">✕</button>
            </div>
          </div>
        `;
      }).join('');
    }

    // ==========================================
// 💌 오늘 배너: 기념일 / 일정 / 예매 3단 분리 & 탑승 완료 토글
// ==========================================

function updateTodaySpecialBanner() {
  const banner = document.getElementById('todaySpecialEventBanner');
  const textEl = document.getElementById('todaySpecialEventText');
  if (!banner || !textEl) return;

  const events = typeof getCalendarEvents === 'function' ? getCalendarEvents() : [];
  const d = new Date(currentDate);
  const dayOfWeek = d.getDay();

  // 1. 일반 일정
  const hitEvents = events.filter(e => {
    if (e.skippedDates && e.skippedDates.includes(currentDate)) return false;
    if (e.isRepeat) return e.repeatDays && e.repeatDays.includes(dayOfWeek);
    return currentDate >= e.start && currentDate <= e.end;
  });

  // 2. 예매 내역
  const tickets = (typeof getTicketsLocal === 'function' ? getTicketsLocal() : []).filter(t => t.date === currentDate);
  const ticketIconMap = { bus: '🚌 버스', train: '🚆 기차', flight: '✈️ 비행기' };

  // 3. 기념일 & 공휴일
  const anniversaries = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  const parts = currentDate.split('-');
  const m = parseInt(parts[1], 10);
  const dayNum = parseInt(parts[2], 10);
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const dStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;

  const hitAnniv = anniversaries.filter(a => {
    if (!a.date) return false;
    const cleanDate = a.date.replace(/\./g, '-');
    const aParts = cleanDate.split('-');
    const aMonth = parseInt(aParts[aParts.length - 2], 10);
    const aDay = parseInt(aParts[aParts.length - 1], 10);
    return aMonth === m && aDay === dayNum;
  });

  let holidayName = '';
  if (typeof KR_HOLIDAYS !== 'undefined' && KR_HOLIDAYS[`${mStr}-${dStr}`]) {
    holidayName = KR_HOLIDAYS[`${mStr}-${dStr}`];
  } else if (typeof KR_HOLIDAYS !== 'undefined' && KR_HOLIDAYS[currentDate]) {
    holidayName = KR_HOLIDAYS[currentDate];
  }

  // 로컬 완료 상태 불러오기
    const completedTickets = JSON.parse(localStorage.getItem('mingle_completed_tickets') || '[]').map(String);

  // 각 항목별 HTML 블록 생성
  const blocks = [];

  // A-1. 국가 공휴일 카드 (은은한 로즈 톤)
  if (holidayName) {
    blocks.push(`
      <div class="flex items-center gap-1.5 bg-rose-50/80 border border-rose-200/80 px-2.5 py-1 rounded-xl text-[11px] text-rose-800 font-bold shadow-2xs">
        <span>🇰🇷</span>
        <span>${holidayName}</span>
      </div>
    `);
  }

  // A-2. 개인 기념일/생일 카드 (공백·이모지 간격 완벽 통일!)
  hitAnniv.forEach(a => {
    const catIcon = a.category === '기념일' ? '💖' : (a.category === '이벤트' ? '🎉' : '🎂');
    blocks.push(`
      <div class="flex items-center gap-1.5 bg-pink-50/80 border border-pink-200 px-2.5 py-1 rounded-xl text-[11px] text-pink-900 font-bold shadow-2xs">
        <span>${catIcon}</span>
        <span class="truncate">${a.name}</span>
      </div>
    `);
  });

  // B. 일반 일정 (선택한 카테고리 구분 이모지 반영!)
  hitEvents.forEach(e => {
    const catMeta = (typeof EVENT_CATEGORIES !== 'undefined' ? EVENT_CATEGORIES.find(c => c.key === e.category) : null) || { icon: '🗓️', bg: 'bg-stone-50 text-stone-700 border-stone-200' };
    const timeStr = e.startTime ? ` · ${e.startTime}${e.endTime ? '~' + e.endTime : ''}` : '';

    blocks.push(`
      <div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-xl text-[11px] text-stone-700 font-bold shadow-2xs">
        <span>${catMeta.icon}</span>
        <span class="truncate">${e.title}${timeStr}</span>
      </div>
    `);
  });

  // C. 교통/예매 내역 (스카이 블루 톤 & 볼드체·간격 gap-1.5 완벽 일치!)
  const pureIcons = { bus: '🚌', train: '🚆', flight: '✈️' };
  const completedStrList = completedTickets.map(x => String(x));

  tickets.forEach(t => {
    const isDone = completedStrList.includes(String(t.id));
    const memoText = t.seatMemo && t.seatMemo.trim() ? ` (${t.seatMemo.trim()})` : '';
    const icon = pureIcons[t.type] || '🎫';
    const timeStr = t.time ? `${t.time} ` : '';
    const label = `${timeStr}${t.depart || ''} → ${t.arrive || ''}${memoText}`;

    const cardStyle = isDone
      ? 'bg-stone-100/80 border-stone-200 text-stone-400 opacity-60'
      : 'bg-sky-50/70 border-sky-200 text-stone-700';

    const textStyle = isDone 
      ? 'style="text-decoration: line-through; color: #a8a29e;"' 
      : 'class="font-bold text-stone-700 truncate"';

    const btnStyle = isDone
      ? 'bg-stone-200 text-stone-500 border border-stone-300'
      : 'bg-sky-500 text-white shadow-xs';

    blocks.push(`
      <div class="flex items-center justify-between gap-2 border px-2.5 py-1.5 rounded-xl text-[11px] transition-all ${cardStyle}">
        <div class="flex items-center gap-1.5 min-w-0 flex-1">
          <span class="shrink-0">${icon}</span>
          <span ${textStyle}>${label}</span>
        </div>
        <button onclick="toggleTicketComplete('${t.id}'); event.stopPropagation();" class="shrink-0 text-[10px] px-2 py-0.5 rounded-full transition-colors cursor-pointer font-bold ${btnStyle}">
          ${isDone ? '완료됨 ↩' : '탑승완료 ✓'}
        </button>
      </div>
    `);
  });

  // 표시할 게 하나도 없으면 숨김
  if (blocks.length === 0) {
    banner.classList.add('hidden');
    return;
  }

  // 배너 표시 및 예쁜 카드 리스트로 렌더링
  banner.classList.remove('hidden');
  banner.className = 'w-full space-y-1.5 mb-2';
  textEl.className = 'flex flex-col gap-1.5 w-full';
  textEl.innerHTML = blocks.join('');
}

// 🎫 예매 탑승 완료 토글 도우미 함수 (Firestore 실시간 양방향 클라우드 저장 탑재)
function toggleTicketComplete(id) {
  const targetId = String(id);
  let completed = [];
  try {
    const raw = JSON.parse(localStorage.getItem('mingle_completed_tickets') || '[]');
    completed = raw.map(x => String(x));
  } catch(e) {
    completed = [];
  }

  if (completed.includes(targetId)) {
    completed = completed.filter(x => x !== targetId);
  } else {
    completed.push(targetId);
  }

  localStorage.setItem('mingle_completed_tickets', JSON.stringify(completed));
  
  // ☁️ 파이어베이스 즉시 클라우드 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('tickets_data').doc('completed').set({
      completedIds: completed
    }, { merge: true }).catch(console.error);
  }

  if (typeof updateTodaySpecialBanner === 'function') {
    updateTodaySpecialBanner();
  }
}

    // 캘린더 타일: 고정 높이 3단 정방형 스탬프 렌더러
    function renderCalendar() {
      document.getElementById('calendarMonthTitle').innerText = `${calYear}년 ${calMonth + 1}월`;
      const grid = document.getElementById('calendarGrid');
      grid.innerHTML = '';

      const firstDay = new Date(calYear, calMonth, 1).getDay();
      const lastDate = new Date(calYear, calMonth + 1, 0).getDate();
      const allDays = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');
      const anniversaries = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
      const events = getCalendarEvents();
      const tickets = getTicketsLocal();

      for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="h-16 bg-stone-50/40 rounded-xl"></div>`;
      }

      for (let d = 1; d <= lastDate; d++) {
        const mStr = (calMonth + 1) < 10 ? `0${calMonth + 1}` : `${calMonth + 1}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        const dateKey = `${calYear}-${mStr}-${dStr}`;
        const record = allDays[dateKey];

        const dayOfWeek = new Date(calYear, calMonth, d).getDay();
        const holidayName = KR_HOLIDAYS[`${mStr}-${dStr}`] || KR_HOLIDAYS[dateKey];
        const isRedDay = dayOfWeek === 0 || !!holidayName;

        const hitAnni = anniversaries.find(a => {
          const parts = a.date.split('-');
          return parseInt(parts[parts.length - 2], 10) === (calMonth + 1) && parseInt(parts[parts.length - 1], 10) === d;
        });

        const dayEvents = events.filter(e => {
          if (e.skippedDates && e.skippedDates.includes(dateKey)) return false;
          if (e.isRepeat) return e.repeatDays && e.repeatDays.includes(dayOfWeek);
          return dateKey >= e.start && dateKey <= e.end;
        });

        const dayTickets = tickets.filter(t => t.date === dateKey);

        const moodIcon = record?.mood && MOOD_META[record.mood] ? MOOD_META[record.mood].icon : '';

        let eventStampIcons = '';
        if (holidayName) eventStampIcons += '<span class="text-[8px] bg-rose-100 text-rose-700 px-1 py-0.2 rounded font-bold">휴일</span>';
        if (hitAnni) eventStampIcons += '🎂';
        dayTickets.forEach(t => {
          const tIcon = t.type === 'bus' ? '🚌' : t.type === 'train' ? '🚅' : '✈️';
          eventStampIcons += `<span title="${t.depart}➔${t.arrive}">${tIcon}</span>`;
        });
        dayEvents.slice(0, 2).forEach(ev => {
          const catMeta = EVENT_CATEGORIES.find(c => c.key === ev.category) || EVENT_CATEGORIES[6];
          eventStampIcons += `<span title="${ev.title}">${catMeta.icon}</span>`;
        });

        let activityIcons = '';
        if (record?.weather) {
          if (record.weather.includes('☀️')) activityIcons += '☀';
          else if (record.weather.includes('⛅')) activityIcons += '⛅';
          else if (record.weather.includes('🌧️')) activityIcons += '🌧️';
          else if (record.weather.includes('❄️')) activityIcons += '❄️';
          else if (record.weather.includes('더워')) activityIcons += '🥵';
          else if (record.weather.includes('추워')) activityIcons += '🥶';
          else activityIcons += '🍃';
        }
        if (record?.knit?.rows > 0) activityIcons += '🧶';
        if (record?.book?.title) activityIcons += '📖';
        const ootdDot = record?.ootd?.color ? `<span class="w-1.5 h-1.5 rounded-full inline-block border border-stone-200" style="background-color: ${record.ootd.color};"></span>` : '';

        grid.innerHTML += `
          <div onclick="selectDateFromCal('${dateKey}')" class="h-16 p-1 bg-stone-50 hover:bg-amber-50/80 border border-stone-100 rounded-xl cursor-pointer flex flex-col justify-between transition-colors overflow-hidden">
            <div class="flex items-center justify-between leading-none">
              <span class="text-[10px] font-bold ${isRedDay ? 'text-rose-500' : 'text-stone-700'}">${d}</span>
              <span class="text-[10px]">${moodIcon}</span>
            </div>
            <div class="flex items-center justify-center gap-0.5 text-xs truncate py-0.5">
              ${eventStampIcons || '<span class="text-[9px] text-stone-200">·</span>'}
            </div>
            <div class="flex items-center justify-between text-[8px] leading-none pt-0.5 border-t border-stone-100/60">
              <span class="truncate tracking-tighter">${activityIcons}</span>
              ${ootdDot}
            </div>
          </div>
        `;
      }
    }

    function selectDateFromCal(dateStr) {
      currentDate = dateStr;
      document.getElementById('currentDateInput').value = currentDate;
      updateDateLabel();
      subscribeDayData(currentDate);
      subscribeTodayTasks(currentDate);
      renderDayHabitList();
      renderDayRoutineTodos();
      calculateDDays();
      updateTodaySpecialBanner();
      switchTab('day');
    }

    // 기념일
    function setAnniversaryFilter(mode) {
      anniversaryFilterMode = mode;
      ['7', '30', 'all'].forEach(m => {
        const btn = document.getElementById(`anniFilter_${m}`);
        if (btn) {
          if (m === mode) btn.className = 'px-2 py-0.5 rounded-full bg-stone-800 text-white font-semibold';
          else btn.className = 'px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold';
        }
      });
      renderAnniversaries();
    }

// --- 기념일 모달 및 관리 로직 ---
let editingAnnivId = null;

// 📅 숫자 8자리 입력 시 YYYY-MM-DD 하이픈 자동 포맷 스마트 함수
function formatSmartDateInput(el) {
  if (!el) return;
  let val = el.value.replace(/[^0-9]/g, '');
  if (val.length <= 4) {
    el.value = val;
  } else if (val.length <= 6) {
    el.value = val.slice(0, 4) + '-' + val.slice(4);
  } else {
    el.value = val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8);
  }
}

function openAnnivModal(id = null) {
  editingAnnivId = id;
  const modal = document.getElementById('annivModal');
  const title = document.getElementById('annivModalTitle');
  const nameInput = document.getElementById('annivInputName');
  const dateInput = document.getElementById('annivInputDate');
  
  if (!modal) return;

  if (id) {
    if (title) title.innerHTML = '🎂 <span>기념일 수정</span>';
    const items = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
    const target = items.find(item => String(item.id) === String(id));
    if (target) {
      nameInput.value = target.name || '';
      dateInput.value = target.date || '';
      const radios = document.getElementsByName('annivCategory');
      radios.forEach(r => { r.checked = (r.value === (target.category || '생일')); });
    }
  } else {
    if (title) title.innerHTML = '🎂 <span>기념일 & 이벤트 등록</span>';
    nameInput.value = '';
    dateInput.value = '';
    const radios = document.getElementsByName('annivCategory');
    if (radios.length > 0) radios[0].checked = true;
  }
  if (dateInput) {
    dateInput.oninput = () => formatSmartDateInput(dateInput);
  }
  modal.classList.remove('hidden');
}

// 기존 프롬프트 함수 호환용 (혹시 남아있어도 에러 안 나게 방어!)
function addAnniversaryPrompt() {
  openAnnivModal();
}

function closeAnnivModal() {
  const modal = document.getElementById('annivModal');
  if (modal) modal.classList.add('hidden');
  editingAnnivId = null;
}

function saveAnniversaryFromModal() {
  const nameInput = document.getElementById('annivInputName');
  const dateInput = document.getElementById('annivInputDate');
  const name = nameInput ? nameInput.value.trim() : '';
  let date = dateInput ? dateInput.value.trim() : '';

  if (!name) return alert('기념일 이름을 입력해 주세요.');
  if (!date) return alert('날짜를 선택해 주세요.');

  // 혹시 점(.)이 섞여 있어도 무조건 표준 하이픈(-)으로 정돈
  date = date.replace(/\./g, '-');
  
  if (!name) return alert('기념일 이름을 입력해 주세요.');
  if (!date) return alert('날짜를 선택해 주세요.');

  let category = '생일';
  const radios = document.getElementsByName('annivCategory');
  radios.forEach(r => { if (r.checked) category = r.value; });

  let items = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');

  if (editingAnnivId) {
    items = items.map(item => {
      if (String(item.id) === String(editingAnnivId)) {
        return { ...item, name, date, category };
      }
      return item;
    });
  } else {
    items.push({
      id: Date.now(),
      name,
      date,
      category
    });
  }

  localStorage.setItem('mingle_anniversaries', JSON.stringify(items));
  closeAnnivModal();
  renderAnniversaries();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();

  // ☁️ 파이어베이스 즉시 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('anniversaries_data').doc('master').set({
      anniversaries: items
    }, { merge: true }).catch(console.error);
  }
}

function deleteAnniversary(id) {
  if (!confirm('이 기념일을 삭제할까요?')) return;
  let items = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  items = items.filter(a => String(a.id) !== String(id));
  localStorage.setItem('mingle_anniversaries', JSON.stringify(items));
  renderAnniversaries();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();

  // ☁️ 파이어베이스 즉시 동기화
  if (typeof db !== 'undefined' && db) {
    db.collection('anniversaries_data').doc('master').set({
      anniversaries: items
    }, { merge: true }).catch(console.error);
  }
}

// ☁️ 기념일 실시간 양방향 구독기
let unsubscribeAnniversaries = null;
function subscribeAnniversaries() {
  if (typeof renderAnniversaries === 'function') renderAnniversaries();
  if (typeof renderCalendar === 'function') renderCalendar();

  if (!db) return;
  if (unsubscribeAnniversaries) unsubscribeAnniversaries();
  unsubscribeAnniversaries = db.collection('anniversaries_data').doc('master')
    .onSnapshot(doc => {
      if (doc.exists) {
        const d = doc.data() || {};
        if (Array.isArray(d.anniversaries)) {
          localStorage.setItem('mingle_anniversaries', JSON.stringify(d.anniversaries));
          if (typeof renderAnniversaries === 'function') renderAnniversaries();
          if (typeof renderCalendar === 'function') renderCalendar();
          if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();
        }
      }
    }, err => console.error(err));
}

function renderAnniversaries() {
  const list = document.getElementById('anniversaryList');
  if (!list) return;
  const items = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  const now = new Date();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const processed = items.map(item => {
    const orig = new Date(item.date);
    const origYear = orig.getFullYear();
    let next = new Date(now.getFullYear(), orig.getMonth(), orig.getDate());
    
    // 올해 기념일이 이미 지났는지 체크
    const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (next < todayZero) {
      next.setFullYear(now.getFullYear() + 1);
    }
    const diff = Math.ceil((next - todayZero) / (1000 * 60 * 60 * 24));
    
    // n주년 / n번째 계산
    const currentAnnivYear = next.getFullYear();
    const yearsCount = currentAnnivYear - origYear;
    let countBadge = '';
    if (!isNaN(yearsCount) && yearsCount > 0) {
      countBadge = item.category === '생일' ? `${yearsCount + 1}번째` : `${yearsCount}주년`;
    }

    // YY-MM-DD (요일) 포맷팅
    const yy = String(next.getFullYear()).slice(-2);
    const mm = String(next.getMonth() + 1).padStart(2, '0');
    const dd = String(next.getDate()).padStart(2, '0');
    const dayOfWeek = dayNames[next.getDay()];
    const dateFormatted = `${yy}-${mm}-${dd} (${dayOfWeek})`;

    const catIcon = item.category === '기념일' ? '💖' : (item.category === '이벤트' ? '🎉' : '🎂');

    return { 
      ...item, 
      diff, 
      dateFormatted,
      countBadge,
      catIcon
    };
  });

  processed.sort((a, b) => a.diff - b.diff);

  const filtered = processed.filter(item => {
    if (typeof anniversaryFilterMode === 'undefined') return true;
    if (anniversaryFilterMode === '7') return item.diff <= 7;
    if (anniversaryFilterMode === '30') return item.diff <= 30;
    return true; // 전체보기
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p class="text-[11px] text-stone-300 py-3 text-center">해당 기간에 예정된 기념일이 없어요 🌿</p>';
    return;
  }

  list.innerHTML = filtered.map(item => {
    const badgeText = item.diff === 0 ? '오늘' : `D-${item.diff}`;
    const badgeStyle = item.diff === 0 
      ? 'bg-rose-500 text-white animate-pulse' 
      : (item.diff <= 7 ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50');

    return `
      <div class="p-2 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
        <div onclick="openAnnivModal('${item.id}')" class="cursor-pointer hover:text-amber-800 flex-1 flex items-center gap-1.5 flex-wrap">
          <span class="font-bold text-stone-800">${item.catIcon} ${item.name}</span>
          ${item.countBadge ? `<span class="px-1.5 py-0.2 text-[10px] rounded-md bg-stone-200/70 text-stone-600 font-medium">${item.countBadge}</span>` : ''}
          <span class="text-[11px] text-stone-400 font-normal">${item.dateFormatted}</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-bold px-2 py-0.5 rounded-full text-[10px] ${badgeStyle}">${badgeText}</span>
          <button onclick="deleteAnniversary('${item.id}')" class="text-stone-300 hover:text-stone-500 text-xs">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

    // 도서 & 뜨개 아카이브
    function subscribeArchives() {
      renderBookShelf();
      renderKnittingShowroom();

      if (!db) return;
      if (unsubscribeBooks) unsubscribeBooks();
      unsubscribeBooks = db.collection('bookshelf').onSnapshot((snapshot) => {
        const books = [];
        snapshot.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
        localStorage.setItem('mingle_bookshelf', JSON.stringify(books));
        renderBookShelf();
      }, err => console.error(err));

      if (unsubscribeKnits) unsubscribeKnits();
      unsubscribeKnits = db.collection('knitting_showroom').onSnapshot((snapshot) => {
        const knits = [];
        snapshot.forEach(doc => knits.push({ id: doc.id, ...doc.data() }));
        localStorage.setItem('mingle_knitting_showroom', JSON.stringify(knits));
        renderKnittingShowroom();
      }, err => console.error(err));
    }

    function filterBooks(cat) {
      renderBookShelf(cat);
    }

    function renderBookShelf(filter = 'all') {
      const list = document.getElementById('bookshelfList');
      if (!list) return;
      const books = JSON.parse(localStorage.getItem('mingle_bookshelf') || '[]');
      const filtered = filter === 'all' ? books : books.filter(b => b.category === filter);
      if (filtered.length === 0) {
        list.innerHTML = `<p class="text-xs text-stone-300 py-6 text-center">등록된 도서 기록이 없어요 📖</p>`;
        return;
      }
      list.innerHTML = filtered.map((b) => `
        <div class="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-stone-800 text-xs">📖 ${b.title}</span>
            <span class="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">${b.category || '기타'}</span>
          </div>
          <div class="text-[11px] text-stone-500">${b.author || '저자 미상'} | <b>${b.startDate || ''} ~ ${b.endDate || '읽는 중'}</b></div>
          <div class="text-[10px] text-amber-500 font-medium mt-1">${getRatingStars(b.rating)} <span class="text-stone-400 font-mono text-[9px]">(${parseFloat(b.rating || 5).toFixed(1)})</span></div>
          ${b.review ? `<p class="text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-100">${b.review}</p>` : ''}
        </div>
      `).join('');
    }

    function openBookModal() {
      const modal = document.getElementById('bookDetailModal');
      if (!modal) return;

      document.getElementById('bookEditId').value = '';
      document.getElementById('bookModalTitle').innerHTML = '<span>📚</span> 도서 신규 등록';
      document.getElementById('bookSearchSection')?.classList.remove('hidden');
      document.getElementById('bookModalDeleteBtn')?.classList.add('hidden');
      document.getElementById('bookHistorySection')?.classList.add('hidden');

      document.getElementById('bookInputTitle').value = '';
      document.getElementById('bookInputAuthor').value = '';
      document.getElementById('bookInputTotalPage').value = '';
      document.getElementById('bookCoverUrl').value = '';

      const coverImg = document.getElementById('bookPreviewCover');
      const icon = document.getElementById('bookPreviewIcon');
      const text = document.getElementById('bookPreviewText');
      if (coverImg) {
        coverImg.src = '';
        coverImg.classList.add('hidden');
      }
      if (icon) icon.classList.remove('hidden');
      if (text) text.classList.remove('hidden');

      if (document.getElementById('bookInputStatus')) document.getElementById('bookInputStatus').value = 'reading';
      if (document.getElementById('bookInputStartDate')) document.getElementById('bookInputStartDate').value = (typeof currentDate !== 'undefined' ? currentDate : '');
      if (document.getElementById('bookInputEndDate')) document.getElementById('bookInputEndDate').value = '';
      if (document.getElementById('bookInputReview')) document.getElementById('bookInputReview').value = '';
      if (document.getElementById('bookInputRating')) document.getElementById('bookInputRating').value = '5';

      modal.classList.remove('hidden');
    }

// ==========================================
// 🧶 뜨개 쇼룸 & 아카이브 (파이어베이스 + 모달 + 위젯 연동)
// ==========================================

let currentKnitFilter = 'all';

// 1. 필터 탭 전환
function setKnitFilter(filter) {
  currentKnitFilter = filter;
  document.querySelectorAll('.knit-tab-btn').forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.className = 'knit-tab-btn px-2.5 py-1 rounded-lg font-bold bg-stone-800 text-white transition-colors';
    } else {
      btn.className = 'knit-tab-btn px-2.5 py-1 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors';
    }
  });
  renderKnittingShowroom();
}

// 2. 모달 열기 (등록 / 수정 모드)
function openKnitModal(editId = null) {
  const modal = document.getElementById('knitCustomModal');
  const titleEl = document.getElementById('knitModalTitle');
  const editDocIdEl = document.getElementById('knitEditDocId');

  // 폼 초기화
  editDocIdEl.value = editId || '';
  document.getElementById('modalKnitTitle').value = '';
  document.getElementById('modalKnitToolType').value = 'crochet';
  document.getElementById('modalKnitStatus').value = '뜨는 중 ⏳';
  document.getElementById('modalKnitNeedle').value = '';
  document.getElementById('modalKnitYarn').value = '';
  document.getElementById('modalKnitStartDate').value = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().slice(0, 10);
  document.getElementById('modalKnitEndDate').value = '';
  document.getElementById('modalKnitMemo').value = '';

  if (editId) {
    titleEl.innerHTML = '<span>🧶</span> 뜨개 작품 수정';
    const items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
    const target = items.find(item => item.id === editId);
    if (target) {
      document.getElementById('modalKnitTitle').value = target.title || '';
      document.getElementById('modalKnitToolType').value = target.toolType || 'crochet';
      document.getElementById('modalKnitStatus').value = target.status || '뜨는 중 ⏳';
      document.getElementById('modalKnitNeedle').value = target.needle || '';
      document.getElementById('modalKnitYarn').value = target.yarn || '';
      document.getElementById('modalKnitStartDate').value = target.startDate || '';
      document.getElementById('modalKnitEndDate').value = target.endDate || '';
      document.getElementById('modalKnitMemo').value = target.memo || '';
    }
  } else {
    titleEl.innerHTML = '<span>🧶</span> 뜨개 작품 등록';
  }

  if (modal) modal.classList.remove('hidden');
}

function closeKnitModal() {
  const modal = document.getElementById('knitCustomModal');
  if (modal) modal.classList.add('hidden');
}

// 3. 작품 저장 (파이어베이스 실시간 저장 지원)
function saveKnitModalProject() {
  const editId = document.getElementById('knitEditDocId').value;
  const title = document.getElementById('modalKnitTitle').value.trim();
  if (!title) {
    alert('작품 이름을 입력해주세요!');
    return;
  }

  const projectData = {
    title: title,
    toolType: document.getElementById('modalKnitToolType').value,
    status: document.getElementById('modalKnitStatus').value,
    needle: document.getElementById('modalKnitNeedle').value.trim(),
    yarn: document.getElementById('modalKnitYarn').value.trim(),
    startDate: document.getElementById('modalKnitStartDate').value,
    endDate: document.getElementById('modalKnitEndDate').value,
    memo: document.getElementById('modalKnitMemo').value.trim()
  };

  let items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');

  if (editId) {
    // 수정
    items = items.map(item => item.id === editId ? { ...item, ...projectData } : item);
    localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
    renderKnittingShowroom();

    if (typeof db !== 'undefined' && db) {
      db.collection('knitting_showroom').doc(editId).set(projectData, { merge: true }).catch(console.error);
    }
  } else {
    // 신규 등록
    projectData.createdAt = Date.now();
    if (typeof db !== 'undefined' && db) {
      db.collection('knitting_showroom').add(projectData).then(docRef => {
        projectData.id = docRef.id;
        items.unshift(projectData);
        localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
        renderKnittingShowroom();
      }).catch(err => {
        console.error(err);
        projectData.id = 'local_' + Date.now();
        items.unshift(projectData);
        localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
        renderKnittingShowroom();
      });
    } else {
      projectData.id = 'local_' + Date.now();
      items.unshift(projectData);
      localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
      renderKnittingShowroom();
    }
  }

  closeKnitModal();
}

// 4. 작품 삭제 (파이어베이스 실시간 삭제 지원)
function deleteKnitProject(id) {
  if (!confirm('이 뜨개 작품 기록을 삭제할까요?')) return;

  let items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
  items = items.filter(item => item.id !== id);
  localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
  renderKnittingShowroom();

  if (typeof db !== 'undefined' && db) {
    db.collection('knitting_showroom').doc(id).delete().catch(console.error);
  }
}

// 5. 쇼룸 목록 렌더링 & 일일 위젯 연동 옵션 갱신
function renderKnittingShowroom() {
  const list = document.getElementById('knittingShowroomList');
  const items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');

  // 일일 위젯 선택 셀렉트박스 동기화
  updateKnitWidgetSelect(items);

  if (!list) return;

  // 필터링 적용
  const filtered = items.filter(item => {
    if (currentKnitFilter === 'all') return true;
    if (currentKnitFilter === 'progress') return (item.status || '').includes('뜨는 중');
    if (currentKnitFilter === 'done') return (item.status || '').includes('완성');
    if (currentKnitFilter === 'pause') return (item.status || '').includes('보관');
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<p class="text-xs text-rose-300 py-6 text-center">등록된 뜨개 작품이 없어요 🧶</p>`;
    return;
  }

  const toolBadges = {
    crochet: '<span class="text-[9px] font-medium text-amber-700 bg-amber-50 border border-amber-200/70 px-1.5 py-0.5 rounded">🪡 코바늘</span>',
    knitting: '<span class="text-[9px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-1.5 py-0.5 rounded">🥢 대바늘</span>',
    etc: '<span class="text-[9px] font-medium text-stone-600 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded">기타</span>'
  };

  list.innerHTML = filtered.map(item => {
    const isDone = (item.status || '').includes('완성');
    const isPause = (item.status || '').includes('보관');
    const statusClass = isDone 
      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60' 
      : (isPause ? 'bg-stone-100 text-stone-500 border border-stone-200' : 'bg-rose-100 text-rose-700');
    
    const toolBadge = toolBadges[item.toolType] || toolBadges.crochet;
    const periodText = item.startDate ? `${item.startDate} ~ ${item.endDate || (isDone ? '완성' : '진행중')}` : '기간 미지정';

    return `
      <div class="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1.5 relative group">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-stone-800 text-xs flex items-center gap-1">🧶 ${item.title}</span>
            ${toolBadge}
            <span class="text-[10px] ${statusClass} px-1.5 py-0.5 rounded font-bold">${item.status || '뜨는 중 ⏳'}</span>
          </div>
          <div class="flex items-center gap-1 text-[11px]">
            <button type="button" onclick="openKnitModal('${item.id}')" class="text-stone-400 hover:text-stone-700 px-1 py-0.5 rounded transition-colors">수정</button>
            <span class="text-stone-200">|</span>
            <button type="button" onclick="deleteKnitProject('${item.id}')" class="text-stone-300 hover:text-rose-500 px-1 py-0.5 rounded transition-colors">삭제</button>
          </div>
        </div>

        <div class="text-[11px] text-stone-600 space-y-0.5">
          <div>실: <b>${item.yarn || '-'}</b> <span class="text-stone-300">|</span> 바늘: <b>${item.needle || '-'}</b></div>
          <div class="text-[10px] text-stone-400">기간: ${periodText}</div>
        </div>

        ${item.memo ? `<div class="text-[11px] text-stone-700 bg-white p-2 rounded-lg border border-rose-50 whitespace-pre-wrap">${item.memo}</div>` : ''}
      </div>
    `;
  }).join('');
}

// 6. 일일 위젯의 드롭다운 목록 자동 채우기 & 선택 시 연동
function updateKnitWidgetSelect(items) {
  const select = document.getElementById('knitProjectSelect');
  if (!select) return;

  const currentVal = select.value;
  // '뜨는 중' 상태인 작품 우선 표시
  const activeItems = items.filter(i => (i.status || '').includes('뜨는 중'));

  let optionsHtml = '<option value="">🧶 쇼룸 작품 불러오기...</option>';
  activeItems.forEach(item => {
    optionsHtml += `<option value="${item.id}">${item.title} (${item.needle || '바늘 미지정'})</option>`;
  });

  select.innerHTML = optionsHtml;
  if (currentVal) select.value = currentVal;
}

// 위젯에서 작품 선택 시 인풋 및 메모 자동 완성
function onSelectKnitProjectFromWidget(selectedId) {
  if (!selectedId) return;
  const items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
  const target = items.find(i => i.id === selectedId);
  if (!target) return;

  const projectInput = document.getElementById('knitCurrentProject');
  const tipInput = document.getElementById('knitSectionTip');

  if (projectInput) {
    projectInput.value = target.title;
  }
  if (tipInput && !tipInput.value) {
    tipInput.value = `[${target.needle || ''}] ${target.yarn || ''}`.trim();
  }

  if (typeof saveDayData === 'function') {
    saveDayData();
  }
}

    // 건강 관리 달력 & 추이 트래커
    function changeHealthMonth(delta) {
      healthMonth += delta;
      if (healthMonth < 0) { healthMonth = 11; healthYear--; }
      if (healthMonth > 11) { healthMonth = 0; healthYear++; }
      renderHealthTracker();
    }

    function renderHealthTracker() {
      document.getElementById('healthMonthTitle').innerText = `${healthYear}년 ${healthMonth + 1}월`;
      const grid = document.getElementById('healthCalendarGrid');
      if (!grid) return;
      grid.innerHTML = '';

      const firstDay = new Date(healthYear, healthMonth, 1).getDay();
      const lastDate = new Date(healthYear, healthMonth + 1, 0).getDate();
      const allDays = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');

      let weightSum = 0, weightCount = 0;
      let fastSum = 0, fastCount = 0;
      let postSum = 0, postCount = 0;

      for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="p-1 rounded-xl bg-stone-50/40 min-h-[46px]"></div>`;
      }

      for (let d = 1; d <= lastDate; d++) {
        const mStr = (healthMonth + 1) < 10 ? `0${healthMonth + 1}` : `${healthMonth + 1}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        const dateKey = `${healthYear}-${mStr}-${dStr}`;
        const record = allDays[dateKey];

        let weight = record?.health?.weight;
        let sugarFast = record?.health?.meals?.[0]?.sugarFast;
        let postMeals = (record?.health?.meals || []).map(m => parseFloat(m.sugarPost)).filter(n => !isNaN(n));
        let avgPost = postMeals.length > 0 ? Math.round(postMeals.reduce((a, b) => a + b, 0) / postMeals.length) : null;

        if (weight) {
          weightSum += parseFloat(weight);
          weightCount++;
        }
        if (sugarFast) {
          fastSum += parseFloat(sugarFast);
          fastCount++;
        }
        if (avgPost) {
          postSum += avgPost;
          postCount++;
        }

        const hasHealthData = weight || sugarFast || avgPost;

        grid.innerHTML += `
          <div onclick="selectDateFromCal('${dateKey}')" class="p-1 rounded-xl border ${hasHealthData ? 'bg-amber-50/70 border-amber-200' : 'bg-stone-50 border-stone-200 text-stone-300'} flex flex-col justify-between min-h-[46px] cursor-pointer hover:scale-105 transition-transform text-left">
            <span class="text-[9px] font-bold text-stone-500">${d}일</span>
            <div class="text-[8px] font-mono leading-tight">
              ${weight ? `<div class="text-stone-700 font-bold">${weight}k</div>` : ''}
              ${sugarFast ? `<div class="text-rose-600 font-semibold">공${sugarFast}</div>` : ''}
              ${avgPost ? `<div class="text-amber-700">식${avgPost}</div>` : ''}
            </div>
          </div>
        `;
      }

      document.getElementById('healthAvgWeight').innerText = weightCount > 0 ? `${(weightSum / weightCount).toFixed(1)} kg` : '- kg';
      document.getElementById('healthAvgSugarFast').innerText = fastCount > 0 ? `${Math.round(fastSum / fastCount)}` : '-';
      document.getElementById('healthAvgSugarPost').innerText = postCount > 0 ? `${Math.round(postSum / postCount)}` : '-';
    }

    // 루틴 진행도 트래커 (줄맞춤 + ⭐ 하루 평균 + 아침☀/저녁🌙)
    function changeRoutineMonth(delta) {
      routineMonth += delta;
      if (routineMonth < 0) { routineMonth = 11; routineYear--; }
      if (routineMonth > 11) { routineMonth = 0; routineYear++; }
      renderRoutineProgressTracker();
    }

    function renderRoutineProgressTracker() {
      const titleEl = document.getElementById('routineMonthTitle');
      if (titleEl) titleEl.innerText = `${routineYear}년 ${routineMonth + 1}월`;
      const grid = document.getElementById('routineProgressGrid');
      if (!grid) return;
      grid.innerHTML = '';

      const lastDate = new Date(routineYear, routineMonth + 1, 0).getDate();
      const allDays = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');
      const defs = getRoutineDefs();
      const mActive = defs.morning.filter(i => !i.paused);
      const eActive = defs.evening.filter(i => !i.paused);

      let totalPctSum = 0;
      let recordedDaysCount = 0;

      for (let d = 1; d <= lastDate; d++) {
        const mStr = (routineMonth + 1) < 10 ? `0${routineMonth + 1}` : `${routineMonth + 1}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        const dateKey = `${routineYear}-${mStr}-${dStr}`;
        const record = allDays[dateKey];
        const rest = record?.routineRest || {};

        let mPct = 0;
        let ePct = 0;
        let hasActiveDuty = false;

        if (record?.dynamicRoutineChecks) {
          if (!rest.morning && mActive.length > 0) {
            const mDone = mActive.filter(i => record.dynamicRoutineChecks[i.id]).length;
            mPct = Math.round((mDone / mActive.length) * 100);
            hasActiveDuty = true;
          }
          if (!rest.evening && eActive.length > 0) {
            const eDone = eActive.filter(i => record.dynamicRoutineChecks[i.id]).length;
            ePct = Math.round((eDone / eActive.length) * 100);
            hasActiveDuty = true;
          }
          
          if (hasActiveDuty) {
            const dayAvg = Math.round((mPct + ePct) / 2);
            totalPctSum += dayAvg;
            recordedDaysCount++;
          }
        }

        const isFullRest = rest.morning && rest.evening;
        const avg = hasActiveDuty ? Math.round((mPct + ePct) / 2) : 0;
        const tileColor = isFullRest 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : (avg >= 80 ? 'bg-amber-100 border-amber-300 text-amber-900' : (avg > 0 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-stone-50 border-stone-200 text-stone-400'));

        grid.innerHTML += `
          <div onclick="selectDateFromCal('${dateKey}')" class="p-1 rounded-xl border ${tileColor} flex flex-col justify-between min-h-[46px] cursor-pointer hover:scale-105 transition-transform text-left">
            <div class="flex items-center justify-between leading-none">
              <span class="text-[9px] font-bold opacity-70">${d}일</span>
              ${isFullRest ? '<span class="text-[8px] font-bold text-emerald-700">휴식</span>' : (avg > 0 ? `<span class="text-[9px] font-bold font-mono text-amber-900">⭐${avg}%</span>` : '')}
            </div>
            <div class="text-[8px] font-mono leading-tight space-y-0.2 pt-0.5 border-t border-stone-200/40">
              ${isFullRest ? '<div class="text-[8px] text-stone-400 text-center py-1">쉼 🍃</div>' : (hasActiveDuty ? `
                <div class="flex justify-between items-center text-amber-950 font-medium"><span>☀</span><span>${mPct}%</span></div>
                <div class="flex justify-between items-center text-indigo-950 font-medium"><span>🌙</span><span>${ePct}%</span></div>
              ` : '<div class="text-stone-300 text-center py-1">·</div>')}
            </div>
          </div>
        `;
      }

      const overallAvg = recordedDaysCount > 0 ? Math.round(totalPctSum / recordedDaysCount) : 0;
      document.getElementById('routineMonthlyAvg').innerText = `평균 ${overallAvg}%`;
    }

    // 무드 트래커
    function changeMoodMonth(delta) {
      moodMonth += delta;
      if (moodMonth < 0) { moodMonth = 11; moodYear--; }
      if (moodMonth > 11) { moodMonth = 0; moodYear++; }
      renderMoodTracker();
    }

    function renderMoodTracker() {
      const titleEl = document.getElementById('moodMonthTitle');
      if (titleEl) titleEl.innerText = `${moodYear}년 ${moodMonth + 1}월`;
      const grid = document.getElementById('moodGrid');
      if (!grid) return;
      grid.innerHTML = '';

      const firstDay = new Date(moodYear, moodMonth, 1).getDay();
      const lastDate = new Date(moodYear, moodMonth + 1, 0).getDate();
      const allDays = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');

      for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="p-1 rounded-xl bg-stone-50/40 min-h-[46px]"></div>`;
      }

      for (let d = 1; d <= lastDate; d++) {
        const mStr = (moodMonth + 1) < 10 ? `0${moodMonth + 1}` : `${moodMonth + 1}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        const dateKey = `${moodYear}-${mStr}-${dStr}`;
        const record = allDays[dateKey];
        const moodKey = record?.mood;
        const meta = moodKey && MOOD_META[moodKey] ? MOOD_META[moodKey] : null;

        if (meta) {
          grid.innerHTML += `
            <div onclick="selectDateFromCal('${dateKey}')" class="p-1.5 rounded-xl border ${meta.bg} flex flex-col items-center justify-between min-h-[46px] cursor-pointer shadow-2xs hover:scale-105 transition-transform">
              <span class="text-[9px] font-bold opacity-70">${d}일</span>
              <span class="text-sm leading-none">${meta.icon}</span>
            </div>
          `;
        } else {
          grid.innerHTML += `
            <div onclick="selectDateFromCal('${dateKey}')" class="p-1.5 rounded-xl border border-stone-200 bg-stone-50/70 text-stone-400 flex flex-col items-center justify-between min-h-[46px] cursor-pointer hover:bg-stone-100">
              <span class="text-[9px]">${d}일</span>
              <span class="text-[10px] text-stone-300">·</span>
            </div>
          `;
        }
      }
    }

    // 해빗 트래커
    function subscribeHabitData() {
      renderHabits();
      renderDayHabitList();

      if (!db) return;
      if (unsubscribeHabits) unsubscribeHabits();
      unsubscribeHabits = db.collection('habits_data').doc('master')
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            localStorage.setItem('mingle_habits', JSON.stringify(data.habits || []));
            localStorage.setItem('mingle_habit_logs', JSON.stringify(data.logs || {}));
            renderHabits();
            renderDayHabitList();
          }
        }, err => console.error(err));
    }

    function getHabitsLocal() {
      const defaultHabits = [
        { id: 1, name: "물 1.5L 마시기 💧", paused: false },
        { id: 2, name: "유산균·영양제 💊", paused: false },
        { id: 3, name: "식후 10분 가볍게 걷기 🚶‍♀️", paused: false }
      ];
      return JSON.parse(localStorage.getItem('mingle_habits') || JSON.stringify(defaultHabits));
    }

    function getHabitLogsLocal() {
      return JSON.parse(localStorage.getItem('mingle_habit_logs') || '{}');
    }

    function saveHabitsState(habits, logs) {
      localStorage.setItem('mingle_habits', JSON.stringify(habits));
      localStorage.setItem('mingle_habit_logs', JSON.stringify(logs));
      renderHabits();
      renderDayHabitList();
      if (db) db.collection('habits_data').doc('master').set({ habits, logs }).catch(console.error);
    }

    function setHabitViewMode(mode) {
      habitViewMode = mode;
      if (mode === 'week') {
        document.getElementById('habitWeekSection').classList.remove('hidden');
        document.getElementById('habitMonthSection').classList.add('hidden');
        document.getElementById('habitViewBtnWeek').className = 'px-2 py-0.5 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
        document.getElementById('habitViewBtnMonth').className = 'px-2 py-0.5 rounded-lg font-medium text-stone-500';
      } else {
        document.getElementById('habitWeekSection').classList.add('hidden');
        document.getElementById('habitMonthSection').classList.remove('hidden');
        document.getElementById('habitViewBtnMonth').className = 'px-2 py-0.5 rounded-lg font-bold bg-white text-stone-800 shadow-xs';
        document.getElementById('habitViewBtnWeek').className = 'px-2 py-0.5 rounded-lg font-medium text-stone-500';
        populateHabitMonthSelect();
        renderHabitMonthGrid();
      }
    }

    function getWeekDates(baseDateStr) {
      const parts = baseDateStr.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const day = d.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diffToMonday);

      const week = [];
      for (let i = 0; i < 7; i++) {
        const target = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        const mStr = (target.getMonth() + 1) < 10 ? `0${target.getMonth() + 1}` : `${target.getMonth() + 1}`;
        const dStr = target.getDate() < 10 ? `0${target.getDate()}` : `${target.getDate()}`;
        week.push(`${target.getFullYear()}-${mStr}-${dStr}`);
      }
      return week;
    }

    function toggleHabitCheck(habitId, dateStr) {
      const logs = getHabitLogsLocal();
      const habits = getHabitsLocal();
      if (!logs[dateStr]) logs[dateStr] = {};
      logs[dateStr][habitId] = !logs[dateStr][habitId];
      saveHabitsState(habits, logs);
    }

    function renderDayHabitList() {
      const container = document.getElementById('dayHabitCheckList');
      if (!container) return;
      const habits = getHabitsLocal().filter(h => !h.paused);
      const logs = getHabitLogsLocal()[currentDate] || {};

      if (habits.length === 0) {
        container.innerHTML = `<p class="text-[11px] text-stone-300 py-1">진행 중인 습관이 없어요 🌿</p>`;
        return;
      }

      container.innerHTML = habits.map(h => {
        const isDone = !!logs[h.id];
        return `
          <label class="flex items-center justify-between p-2 rounded-xl border ${isDone ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'} cursor-pointer transition-colors">
            <span class="text-xs font-semibold">${h.name}</span>
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleHabitCheck(${h.id}, '${currentDate}')" class="rounded text-emerald-600 focus:ring-0">
          </label>
        `;
      }).join('');
    }

    function renderHabits() {
      const container = document.getElementById('habitTable');
      if (!container) return;
      const allHabits = getHabitsLocal();
      const activeHabits = allHabits.filter(h => !h.paused);
      const pausedHabits = allHabits.filter(h => h.paused);
      const logs = getHabitLogsLocal();
      const weekDates = getWeekDates(currentDate);

      if (activeHabits.length === 0) {
        container.innerHTML = `<p class="text-xs text-stone-300 py-4 text-center">진행 중인 습관이 없어요 🌿</p>`;
      } else {
        container.innerHTML = activeHabits.map(h => `
          <div class="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100 text-xs">
            <div class="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
              <span onclick="editHabitName(${h.id})" class="font-medium text-stone-700 truncate text-[11px] cursor-pointer hover:text-amber-700 flex items-center gap-1" title="클릭하여 이름 수정">
                <span>${h.name}</span>
                ${EDIT_SVG_ICON}
              </span>
              <button onclick="pauseHabit(${h.id})" title="보관" class="text-stone-300 hover:text-stone-600 px-0.5 inline-flex items-center">
                <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
              </button>
              <button onclick="deleteHabit(${h.id})" title="삭제" class="text-stone-300 hover:text-rose-500 text-[10px] px-0.5">✕</button>
            </div>
            <div class="flex gap-1 shrink-0">
              ${weekDates.map(dStr => {
                const done = logs[dStr] && logs[dStr][h.id];
                return `
                  <button onclick="toggleHabitCheck(${h.id}, '${dStr}')" class="w-5 h-5 rounded-md border text-[10px] flex items-center justify-center font-bold transition-colors ${done ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-stone-200 text-stone-300 hover:border-emerald-300'}">
                    ${done ? '✓' : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        `).join('');
      }

      document.getElementById('pausedHabitsCount').innerText = `${pausedHabits.length}`;
      const pausedContainer = document.getElementById('pausedHabitsList');
      if (pausedContainer) {
        pausedContainer.innerHTML = pausedHabits.map(h => `
          <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-100/70 border border-stone-200 text-xs">
            <span class="text-stone-500 line-through text-[11px]">${h.name}</span>
            <div class="flex items-center gap-2">
              <button onclick="resumeHabit(${h.id})" class="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600 hover:bg-stone-50 font-bold">▶ 재개</button>
              <button onclick="deleteHabit(${h.id})" class="text-stone-300 hover:text-rose-500 text-xs px-1">✕</button>
            </div>
          </div>
        `).join('');
      }

      if (habitViewMode === 'month') {
        populateHabitMonthSelect();
        renderHabitMonthGrid();
      }
    }

    function addHabitPrompt() {
      const name = prompt("새로운 습관 이름 (예: 식후 10분 걷기 🚶‍♀️):");
      if (!name) return;
      const habits = getHabitsLocal();
      const logs = getHabitLogsLocal();
      habits.push({ id: Date.now(), name, paused: false });
      saveHabitsState(habits, logs);
    }

    function editHabitName(id) {
      const habits = getHabitsLocal();
      const target = habits.find(h => h.id === id);
      if (!target) return;
      const newName = prompt("수정할 습관 이름을 입력해주세요:", target.name);
      if (!newName || !newName.trim()) return;
      target.name = newName.trim();
      saveHabitsState(habits, getHabitLogsLocal());
    }

    function pauseHabit(id) {
      const habits = getHabitsLocal();
      const logs = getHabitLogsLocal();
      const target = habits.find(h => h.id === id);
      if (target) {
        target.paused = true;
        saveHabitsState(habits, logs);
      }
    }

    function resumeHabit(id) {
      const habits = getHabitsLocal();
      const logs = getHabitLogsLocal();
      const target = habits.find(h => h.id === id);
      if (target) {
        target.paused = false;
        saveHabitsState(habits, logs);
      }
    }

    function deleteHabit(id) {
      if (!confirm("정말 이 습관을 완전히 삭제할까요?")) return;
      let habits = getHabitsLocal();
      const logs = getHabitLogsLocal();
      habits = habits.filter(h => h.id !== id);
      saveHabitsState(habits, logs);
    }

    function togglePausedHabits() {
      const list = document.getElementById('pausedHabitsList');
      const icon = document.getElementById('pausedHabitsToggleIcon');
      const isHidden = list.classList.toggle('hidden');
      icon.innerText = isHidden ? '▶' : '▼';
    }

    function populateHabitMonthSelect() {
      const select = document.getElementById('habitSelectForMonth');
      if (!select) return;
      const habits = getHabitsLocal().filter(h => !h.paused);
      const currentVal = select.value;
      select.innerHTML = habits.map(h => `<option value="${h.id}">${h.name}</option>`).join('');
      if (currentVal && habits.some(h => `${h.id}` === currentVal)) {
        select.value = currentVal;
      }
    }

    function changeHabitMonth(delta) {
      habitMonth += delta;
      if (habitMonth < 0) { habitMonth = 11; habitYear--; }
      if (habitMonth > 11) { habitMonth = 0; habitYear++; }
      renderHabitMonthGrid();
    }

    function renderHabitMonthGrid() {
      const titleEl = document.getElementById('habitMonthTitle');
      if (titleEl) titleEl.innerText = `${habitYear}년 ${habitMonth + 1}월`;
      const grid = document.getElementById('habitMonthGrid');
      const select = document.getElementById('habitSelectForMonth');
      if (!grid || !select) return;

      const habitId = parseInt(select.value, 10);
      if (!habitId) {
        grid.innerHTML = `<p class="col-span-7 text-xs text-stone-300 py-6 text-center">선택할 습관이 없어요 🌿</p>`;
        return;
      }

      grid.innerHTML = '';
      const firstDay = new Date(habitYear, habitMonth, 1).getDay();
      const lastDate = new Date(habitYear, habitMonth + 1, 0).getDate();
      const logs = getHabitLogsLocal();

      for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="p-1 rounded-lg bg-stone-50/40 min-h-[38px]"></div>`;
      }

      for (let d = 1; d <= lastDate; d++) {
        const mStr = (habitMonth + 1) < 10 ? `0${habitMonth + 1}` : `${habitMonth + 1}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        const dateKey = `${habitYear}-${mStr}-${dStr}`;
        const isDone = logs[dateKey] && logs[dateKey][habitId];

        grid.innerHTML += `
          <div onclick="toggleHabitCheck(${habitId}, '${dateKey}')" class="p-1 rounded-xl border min-h-[38px] cursor-pointer flex flex-col items-center justify-between transition-colors ${isDone ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold' : 'bg-stone-50 border-stone-200 text-stone-400 hover:bg-stone-100'}">
            <span class="text-[9px] leading-tight">${d}</span>
            <span class="text-xs leading-none">${isDone ? '🌿' : '·'}</span>
          </div>
        `;
      }
    }

    // D-Day 계산
    function calculateDDays() {
      const parts = currentDate.split('-');
      const todayZero = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));

      const summerBase = new Date(2024, 2, 30);
      const diffSummer = Math.round((todayZero - summerBase) / (1000 * 60 * 60 * 24));
      
      const moonBase = new Date(2025, 6, 19);
      const diffMoon = Math.round((todayZero - moonBase) / (1000 * 60 * 60 * 24));

      const elS = document.getElementById('ddaySummer');
      const elM = document.getElementById('ddayMoon');
      if (elS) elS.innerText = `D+${diffSummer}`;
      if (elM) elM.innerText = `D+${diffMoon}`;
    }

    // 밴드 일기 1초 복사
    function copyToBandDiary() {
      const parts = currentDate.split('-');
      const today = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const dateText = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${days[today.getDay()]}`;

      const data = getDayDataLocal(currentDate);
      const weatherText = data.weather ? `${data.weather}` : '';

      const summerStart = new Date(2024, 2, 30);
      const moonStart = new Date(2025, 6, 19);
      const diffSummer = Math.round((today - summerStart) / (1000 * 60 * 60 * 24));
      const diffMoon = Math.round((today - moonStart) / (1000 * 60 * 60 * 24));

      const bandText = 
`#오늘의일기 

${dateText}
날씨 : ${weatherText}

우리 여름이 안 아픈 지 ${diffSummer}일 째 되는 날 ♡
우리 달이 천사된 지 ${diffMoon}일 째 되는 날 ♡`;

      navigator.clipboard.writeText(bandText).then(() => {
        alert("선택한 날씨까지 포함해서 밴드 일기가 복사되었어요! 📋🤍");
      }).catch(err => {
        alert("복사 중 오류가 발생했습니다.");
        console.error(err);
      });
    }

    function downloadAsImage() {
      const area = document.getElementById('captureArea');
      html2canvas(area, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `mingle_log_${currentDate}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
// ==========================================
// 🗄️ 서랍장(가계부/독서/뜨개) 및 신규 탭 로직 덮어쓰기
// ==========================================

// 1. 하단 탭 이동 덮어쓰기 (오늘 숏컷 & 서랍 로비 리셋 탑재)
function switchTab(tab, subAction) {
  // 🚀 1. '오늘(day)' 탭 클릭 시: 다른 날짜를 보고 있었더라도 진짜 오늘 날짜로 즉시 이동!
  if (tab === 'day') {
    if (typeof jumpToRealToday === 'function') {
      jumpToRealToday();
    }
  }

  // 🚀 2. '서랍(drawer)' 탭 클릭 시: 세부 모듈 보고 있었더라도 무조건 서랍 로비 허브로 복귀!
  if (tab === 'drawer') {
    if (typeof backToDrawerHub === 'function') {
      backToDrawerHub();
    }
  }

  ['day', 'calendar', 'tracker', 'drawer'].forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (view) view.classList.add('hidden');
    if (nav) nav.className = 'text-stone-400 hover:text-stone-600 py-1 flex flex-col items-center gap-0.5';
  });
  const targetView = document.getElementById(`view-${tab}`);
  const targetNav = document.getElementById(`nav-${tab}`);
  if (targetView) targetView.classList.remove('hidden');
  if (targetNav) targetNav.className = 'text-stone-800 py-1 flex flex-col items-center gap-0.5 font-bold';

  if (tab === 'tracker') {
    if (typeof renderHabits === 'function') renderHabits();
    if (typeof renderMoodTracker === 'function') renderMoodTracker();
    if (typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
    if (typeof renderHealthTracker === 'function') renderHealthTracker();
  } else if (tab === 'calendar') {
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof renderUpcomingEvents === 'function') renderUpcomingEvents();
    if (typeof renderTicketList === 'function') renderTicketList();
    if (typeof renderAnniversaries === 'function') renderAnniversaries();
  } else if (tab === 'drawer') {
    if (subAction === 'knit') setDrawerSubTab('knit');
    else if (subAction === 'book') setDrawerSubTab('book');
  }
}

// 3. 서랍장 내부 서브 탭 전환
// 서랍장 세부 화면 진입 (메모장/가계부/책장/쇼룸)
function enterDrawerSub(type) {
  const hub = document.getElementById('drawerHubGrid');
  const backBar = document.getElementById('drawerBackBar');
  const titleElem = document.getElementById('drawerCurrentTitle');

  if (hub) hub.classList.add('hidden');
  if (backBar) {
    backBar.classList.remove('hidden');
    backBar.classList.add('flex');
  }

  const titles = {
    note: '📝 메모장 서랍',
    budget: '💰 가계부 서랍',
    book: '📚 책장 서랍',
    knit: '🧶 쇼룸 서랍'
  };
  if (titleElem) titleElem.textContent = titles[type] || '';

  ['note', 'budget', 'book', 'knit'].forEach(t => {
    const mod = document.getElementById(`drawer${t.charAt(0).toUpperCase() + t.slice(1)}Module`);
    if (mod) mod.classList.add('hidden');
  });

  // 선택된 서브 모듈 화면 표시
  const activeSubMod = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}Module`);
  if (activeSubMod) {
    activeSubMod.classList.remove('hidden');
    activeSubMod.style.display = 'block';
  }

  // 가계부 서랍 진입 시 달력 및 알림 즉시 렌더링
  if (type === 'budget') {
    if (typeof switchAccountBookTab === 'function') switchAccountBookTab('calendar');
    if (typeof refreshPayMethodSelects === 'function') refreshPayMethodSelects();
    if (typeof checkFixedExpenseAlerts === 'function') checkFixedExpenseAlerts();
  }

  const targetMod = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}Module`);
  if (targetMod) targetMod.classList.remove('hidden');

  if (type === 'note' && typeof renderNoteCards === 'function') renderNoteCards();
  else if (type === 'budget') renderBudgetDashboard();
  else if (type === 'book' && typeof renderBookShelf === 'function') renderBookShelf();
  else if (type === 'knit' && typeof renderKnittingShowroom === 'function') renderKnittingShowroom();
}

// 4칸 서랍장 메인 허브로 돌아가기
function backToDrawerHub() {
  const hub = document.getElementById('drawerHubGrid');
  const backBar = document.getElementById('drawerBackBar');

  if (hub) hub.classList.remove('hidden');
  if (backBar) {
    backBar.classList.add('hidden');
    backBar.classList.remove('flex');
  }

  ['note', 'budget', 'book', 'knit'].forEach(t => {
    const mod = document.getElementById(`drawer${t.charAt(0).toUpperCase() + t.slice(1)}Module`);
    if (mod) {
      mod.classList.add('hidden');
      mod.style.display = 'none';
    }
  });
}

// 3. 가계부 마스터 데이터
function getBudgetMaster() {
  const defaultData = {
    totalBudget: 500000,
    categories: ['고정지출', '생활비', '교통비', '식비', '쇼핑/취미', '기타'],
    paymentMethods: ['현대카드', '국민카드', '네이버페이', '현금'],
    expenses: [] 
  };
  return JSON.parse(localStorage.getItem('mingle_budget_data') || JSON.stringify(defaultData));
}

function saveBudgetMaster(data) {
  localStorage.setItem('mingle_budget_data', JSON.stringify(data));
  renderBudgetDashboard();
  if (typeof db !== 'undefined' && db) db.collection('drawer_budget').doc('master').set(data).catch(console.error);
}

// 4. 가계부 대시보드 렌더링
function renderBudgetDashboard() {
  const container = document.getElementById('budgetList');
  const remainingEl = document.getElementById('budgetRemainingAmount');
  if (!container) return;

  // 서랍 로비(4단 서랍장)에 있을 때는 가계부 화면 강제 노출 방지
  const hub = document.getElementById('drawerHubGrid');
  const budgetMod = document.getElementById('drawerBudgetModule');
  if (hub && !hub.classList.contains('hidden') && budgetMod) {
    budgetMod.classList.add('hidden');
  }

  const budgetData = getBudgetMaster();
  const currentMonthStr = currentDate.slice(0, 7);

  const monthExpenses = budgetData.expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));
  monthExpenses.sort((a, b) => b.date.localeCompare(a.date));

  const totalSpent = monthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const remaining = budgetData.totalBudget - totalSpent;

  if (remainingEl) {
    remainingEl.innerText = `${remaining.toLocaleString()} 원`;
    remainingEl.className = remaining < 0 ? 'text-lg font-bold text-rose-600 mt-0.5' : 'text-lg font-bold text-stone-800 mt-0.5';
  }

  if (monthExpenses.length === 0) {
    container.innerHTML = `
      <div class="bg-stone-50 rounded-xl p-4 text-center text-stone-400 text-xs border border-stone-200 space-y-1">
        <p>이번 달 아직 기록된 지출이 없어요 🌿</p>
        <p class="text-[10px]">우측 상단 [+ 지출 기록] 버튼을 눌러 추가해보세요!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = monthExpenses.map(item => `
    <div onclick="openEditExpenseModal(${item.id})" class="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs cursor-pointer hover:bg-stone-100/70 transition">
      <div class="min-w-0 pr-2 flex-1">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="font-bold text-stone-800">${item.memo || item.category || '지출'}</span>
          <span class="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-semibold border border-amber-200/50">${(item.category || '').includes('>') ? item.category.split('>').pop().trim() : (item.category || '기타')}</span>
          ${item.payment ? `<span class="text-[9px] text-stone-400 border border-stone-200 px-1 rounded">${item.payment}</span>` : ''}
        </div>
        <div class="text-[10px] text-stone-400 mt-0.5">${item.date || ''}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="font-bold font-mono text-rose-700">-${parseFloat(item.amount || 0).toLocaleString()}원</span>
        <button type="button" onclick="event.stopPropagation(); deleteExpenseItem(${item.id})" class="text-stone-300 hover:text-rose-500 text-xs px-1" title="삭제">&times;</button>
      </div>
    </div>
  `).join('');
}

// ✏️ 지출 내역 상세 수정 모달 (소분류 단독 표시)
function openEditExpenseModal(id) {
  const budgetData = getBudgetMaster();
  const item = (budgetData.expenses || []).find(e => e.id == id);
  if (!item) return;

  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : {};
  const payMethods = typeof getStoredPayMethods === 'function' ? getStoredPayMethods() : ['현금', '계좌이체', '간편결제'];

  // 모든 소분류 목록을 단일 리스트로 수집 (중복 제거)
  let subCatList = [];
  Object.keys(cats).forEach(k => {
    (cats[k] || []).forEach(s => {
      if (!subCatList.includes(s)) subCatList.push(s);
    });
  });
  if (subCatList.length === 0) subCatList = ['식재료', '외식', '카페·간식', '쇼핑', '교통', '생활', '기타'];

  // 기존 카테고리에서 소분류 이름만 추출
  const currentSub = (item.category || '').includes('>') ? item.category.split('>').pop().trim() : (item.category || '');

  let modalEl = document.getElementById('modalExpenseEdit');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'modalExpenseEdit';
    document.body.appendChild(modalEl);
  }

  modalEl.className = 'fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4';
  modalEl.innerHTML = `
    <div class="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-stone-200">
      <div class="flex items-center justify-between border-b border-stone-100 pb-2.5">
        <h3 class="text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <span>✏️</span> 지출 내역 수정
        </h3>
        <button type="button" onclick="document.getElementById('modalExpenseEdit').remove()" class="text-stone-400 hover:text-stone-600 font-bold text-base">&times;</button>
      </div>

      <div class="space-y-3 text-xs">
        <div>
          <label class="text-[11px] text-stone-500 font-medium block mb-1">날짜 / 시간</label>
          <input type="text" id="editExpDate" value="${item.date || ''}" class="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-stone-400 font-mono">
        </div>

        <div>
          <label class="text-[11px] text-stone-500 font-medium block mb-1">카테고리 (소분류)</label>
          <select id="editExpCat" class="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-stone-400 bg-white">
            ${subCatList.map(s => `<option value="${s}" ${s === currentSub ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="text-[11px] text-stone-500 font-medium block mb-1">지출 내역 (항목명)</label>
          <input type="text" id="editExpMemo" value="${item.memo || ''}" class="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-stone-400">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[11px] text-stone-500 font-medium block mb-1">결제수단</label>
            <select id="editExpPay" class="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-stone-400 bg-white">
              ${payMethods.map(m => `<option value="${m}" ${m === item.payment ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[11px] text-stone-500 font-medium block mb-1">금액 (원)</label>
            <input type="number" id="editExpAmount" value="${item.amount || 0}" class="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-stone-400 font-mono font-bold">
          </div>
        </div>
      </div>

      <div class="flex gap-2 pt-2">
        <button type="button" onclick="document.getElementById('modalExpenseEdit').remove()" class="flex-1 py-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium text-xs transition">취소</button>
        <button type="button" onclick="saveEditedExpense(${id})" class="flex-1 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-bold text-xs transition shadow-sm">수정 완료</button>
      </div>
    </div>
  `;
}

// 💾 수정된 지출 내역 저장 & 화면 갱신
function saveEditedExpense(id) {
  const budgetData = getBudgetMaster();
  const idx = (budgetData.expenses || []).findIndex(e => e.id == id);
  if (idx === -1) return;

  const newDate = document.getElementById('editExpDate').value.trim();
  const newCat = document.getElementById('editExpCat').value;
  const newMemo = document.getElementById('editExpMemo').value.trim();
  const newPay = document.getElementById('editExpPay').value;
  const newAmount = parseFloat(document.getElementById('editExpAmount').value) || 0;

  budgetData.expenses[idx].date = newDate;
  budgetData.expenses[idx].category = newCat;
  budgetData.expenses[idx].memo = newMemo;
  budgetData.expenses[idx].payment = newPay;
  budgetData.expenses[idx].amount = newAmount;

  saveBudgetMaster(budgetData);
  document.getElementById('modalExpenseEdit')?.remove();

  if (typeof renderAccountBookDailyList === 'function') renderAccountBookDailyList();
  if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
  if (typeof renderAccountBookBudget === 'function') renderAccountBookBudget();
}

// 5. 가계부 입력 & 세팅 모달
function openBudgetModal() {
  const budgetData = getBudgetMaster();
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5"><span>💸</span> 지출 상세 기록</h3>
          <button onclick="closeBudgetModal()" class="text-stone-400 hover:text-stone-600 font-bold text-sm">✕</button>
        </div>
        <div class="space-y-2 text-xs">
          <div><label class="text-[10px] text-stone-500 block mb-1">지출 금액 (원)</label><input type="number" id="budgetItemAmount" placeholder="예: 15000" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-400"></div>
          <div><label class="text-[10px] text-stone-500 block mb-1">카테고리</label><select id="budgetItemCategory" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">${budgetData.categories.map(c => `<option value="${c}">${c}</option>`).join('')}</select></div>
          <div><label class="text-[10px] text-stone-500 block mb-1">결제 수단</label><select id="budgetItemPayment" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">${budgetData.paymentMethods.map(p => `<option value="${p}">${p}</option>`).join('')}</select></div>
          <div class="grid grid-cols-2 gap-2">
            <div><label class="text-[10px] text-stone-500 block mb-1">지출 일자</label><input type="date" id="budgetItemDate" value="${currentDate}" class="w-full bg-stone-50 border border-stone-200 rounded-xl p-1.5 text-[11px]"></div>
            <div><label class="text-[10px] text-stone-500 block mb-1">메모</label><input type="text" id="budgetItemMemo" placeholder="예: 커피" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs"></div>
          </div>
        </div>
        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveExpense()" class="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs rounded-xl transition-colors">저장</button>
          <button onclick="closeBudgetModal()" class="py-2 px-3 bg-stone-100 text-stone-600 text-xs rounded-xl">취소</button>
        </div>
      </div>
    </div>
  `;
}

function closeBudgetModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

function confirmSaveExpense() {
  const amount = document.getElementById('budgetItemAmount').value;
  const category = document.getElementById('budgetItemCategory').value;
  const payment = document.getElementById('budgetItemPayment').value;
  const date = document.getElementById('budgetItemDate').value;
  const memo = document.getElementById('budgetItemMemo').value.trim();

  if (!amount || !date) {
    alert("금액과 지출 일자를 입력해주세요!");
    return;
  }

  const budgetData = getBudgetMaster();
  budgetData.expenses.push({ id: Date.now(), amount: parseFloat(amount), category, payment, date, memo: memo || category });
  saveBudgetMaster(budgetData);
  closeBudgetModal();
}

function deleteExpenseItem(id) {
  if (!confirm("이 지출 내역을 삭제할까요?")) return;
  const budgetData = getBudgetMaster();
  budgetData.expenses = budgetData.expenses.filter(e => e.id !== id);
  saveBudgetMaster(budgetData);
}

function openBudgetSettingModal() {
  const budgetData = getBudgetMaster();
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5"><span>⚙️</span> 월별 예산 설정</h3>
          <button onclick="closeBudgetModal()" class="text-stone-400 hover:text-stone-600 font-bold text-sm">✕</button>
        </div>
        <div class="space-y-2 text-xs">
          <div><label class="text-[10px] text-stone-500 block mb-1">이번 달 목표 총 예산 (원)</label><input type="number" id="settingTotalBudget" value="${budgetData.totalBudget}" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"></div>
        </div>
        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveBudgetSetting()" class="flex-1 py-2 bg-stone-800 text-white font-bold text-xs rounded-xl">저장</button>
          <button onclick="closeBudgetModal()" class="py-2 px-3 bg-stone-100 text-stone-600 text-xs rounded-xl">취소</button>
        </div>
      </div>
    </div>
  `;
}

// 📁 가계부 대분류(폴더) 추가 함수
function addNewMainCategory() {
  const input = document.getElementById('settingNewMainCatInput');
  const val = input ? input.value.trim() : '';
  if (!val) {
    alert('추가할 대분류 이름을 입력해 주세요!');
    return;
  }

  let cats = typeof getStoredCategories === 'function' ? getStoredCategories() : (window.DEFAULT_EXPENSE_CATS || {});
  if (cats[val]) {
    alert('이미 존재하는 대분류 이름이에요.');
    return;
  }

  // 새로운 대분류 키에 빈 소분류 배열 생성
  cats[val] = [];
  if (typeof saveStoredCategories === 'function') {
    saveStoredCategories(cats);
  } else {
    localStorage.setItem('mingle_expense_custom_cats', JSON.stringify(cats));
  }

  input.value = '';
  
  // 설정 모달 안의 대분류 태그 리스트와 셀렉트박스 즉시 갱신
  if (typeof renderSettingMainCatSelect === 'function') renderSettingMainCatSelect();
  if (typeof renderAccountBookCategoryList === 'function') renderAccountBookCategoryList();
  
  alert(`✨ '${val}' 대분류가 추가되었어요!`);
}

function confirmSaveBudgetSetting() {
  const val = document.getElementById('settingTotalBudget').value;
  if (!val) return;
  const budgetData = getBudgetMaster();
  budgetData.totalBudget = parseFloat(val);
  saveBudgetMaster(budgetData);
  closeBudgetModal();
}
// ==========================================
// 🗄️ [신규 업뎃] 서랍장 감성 가계부 & 서브 탭 통합 로직
// ==========================================

// 1. 서랍장 내부 서브 탭 전환 (가계부 / 독서 / 뜨개)
function setDrawerSubTab(type) {
  ['budget', 'book', 'knit'].forEach(t => {
    const mod = document.getElementById(`drawer${t.charAt(0).toUpperCase() + t.slice(1)}Module`);
    const btn = document.getElementById(`drawerSubTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (mod) mod.classList.add('hidden');
    if (btn) btn.className = 'flex-1 py-2 rounded-xl text-xs font-medium text-stone-500 transition-all';
  });

  const targetMod = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}Module`);
  const targetBtn = document.getElementById(`drawerSubTab${type.charAt(0).toUpperCase() + type.slice(1)}`);
  
  if (targetMod) targetMod.classList.remove('hidden');
  
  const activeColor = type === 'budget' ? 'bg-amber-100 text-amber-900' : (type === 'book' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900');
  if (targetBtn) targetBtn.className = `flex-1 py-2 rounded-xl text-xs font-bold ${activeColor} shadow-xs transition-all`;

  if (type === 'budget') renderBudgetDashboard();
  else if (type === 'book' && typeof renderBookShelf === 'function') renderBookShelf();
  else if (type === 'knit' && typeof renderKnittingShowroom === 'function') renderKnittingShowroom();
}

// 2. 가계부 데이터 로드 및 저장
function getBudgetMaster() {
  const defaultData = {
    totalBudget: 500000,
    categories: ['고정지출', '생활비', '교통비', '식비', '쇼핑/취미', '기타'],
    paymentMethods: ['현대카드', '국민카드', '네이버페이', '현금'],
    expenses: [] 
  };
  return JSON.parse(localStorage.getItem('mingle_budget_data') || JSON.stringify(defaultData));
}

function saveBudgetMaster(data) {
  localStorage.setItem('mingle_budget_data', JSON.stringify(data));
  renderBudgetDashboard();
  if (typeof db !== 'undefined' && db) db.collection('drawer_budget').doc('master').set(data).catch(console.error);
}

// 3. 가계부 대시보드 및 잔액 계산
function renderBudgetDashboard() {
  const container = document.getElementById('budgetList');
  const remainingEl = document.getElementById('budgetRemainingAmount');
  if (!container) return;

  const budgetData = getBudgetMaster();
  const currentMonthStr = typeof currentDate !== 'undefined' ? currentDate.slice(0, 7) : '2026-10';

  const monthExpenses = budgetData.expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));
  monthExpenses.sort((a, b) => b.date.localeCompare(a.date));

  const totalSpent = monthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const remaining = budgetData.totalBudget - totalSpent;

  if (remainingEl) {
    remainingEl.innerText = `${remaining.toLocaleString()} 원`;
    remainingEl.className = remaining < 0 ? 'text-lg font-bold text-rose-600 mt-0.5' : 'text-lg font-bold text-stone-800 mt-0.5';
  }

  if (monthExpenses.length === 0) {
    container.innerHTML = `
      <div class="bg-stone-50 rounded-xl p-4 text-center text-stone-400 text-xs border border-stone-200 space-y-1">
        <p>이번 달 아직 기록된 지출이 없어요 🌿</p>
        <p class="text-[10px]">우측 상단 [+ 지출 기록] 버튼을 눌러 추가해보세요!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = monthExpenses.map(item => `
    <div class="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
      <div class="min-w-0 pr-2 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="font-bold text-stone-800">${item.memo || item.category}</span>
          <span class="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-semibold border border-amber-200">${item.category}</span>
          <span class="text-[9px] text-stone-400">${item.payment || ''}</span>
        </div>
        <div class="text-[10px] text-stone-400 mt-0.5">${item.date}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="font-bold font-mono text-rose-700">-${parseFloat(item.amount).toLocaleString()}원</span>
        <button onclick="deleteExpenseItem(${item.id})" class="text-stone-300 hover:text-rose-500 text-xs px-1">✕</button>
      </div>
    </div>
  `).join('');
}

// 4. 지출 상세 기록 모달
function openBudgetModal() {
  const budgetData = getBudgetMaster();
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5"><span>💸</span> 지출 상세 기록</h3>
          <button onclick="closeBudgetModal()" class="text-stone-400 hover:text-stone-600 font-bold text-sm">✕</button>
        </div>
        <div class="space-y-2 text-xs">
          <div><label class="text-[10px] text-stone-500 block mb-1">지출 금액 (원)</label><input type="number" id="budgetItemAmount" placeholder="예: 15000" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-400"></div>
          <div><label class="text-[10px] text-stone-500 block mb-1">카테고리</label><select id="budgetItemCategory" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">${budgetData.categories.map(c => `<option value="${c}">${c}</option>`).join('')}</select></div>
          <div><label class="text-[10px] text-stone-500 block mb-1">결제 수단</label><select id="budgetItemPayment" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">${budgetData.paymentMethods.map(p => `<option value="${p}">${p}</option>`).join('')}</select></div>
          <div class="grid grid-cols-2 gap-2">
            <div><label class="text-[10px] text-stone-500 block mb-1">지출 일자</label><input type="date" id="budgetItemDate" value="${typeof currentDate !== 'undefined' ? currentDate : '2026-10-02'}" class="w-full bg-stone-50 border border-stone-200 rounded-xl p-1.5 text-[11px]"></div>
            <div><label class="text-[10px] text-stone-500 block mb-1">메모</label><input type="text" id="budgetItemMemo" placeholder="예: 커피" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs"></div>
          </div>
        </div>
        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveExpense()" class="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs rounded-xl transition-colors">저장</button>
          <button onclick="closeBudgetModal()" class="py-2 px-3 bg-stone-100 text-stone-600 text-xs rounded-xl">취소</button>
        </div>
      </div>
    </div>
  `;
}

function closeBudgetModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

function confirmSaveExpense() {
  const amount = document.getElementById('budgetItemAmount').value;
  const category = document.getElementById('budgetItemCategory').value;
  const payment = document.getElementById('budgetItemPayment').value;
  const date = document.getElementById('budgetItemDate').value;
  const memo = document.getElementById('budgetItemMemo').value.trim();

  if (!amount || !date) {
    alert("금액과 지출 일자를 입력해주세요!");
    return;
  }

  const budgetData = getBudgetMaster();
  budgetData.expenses.push({ id: Date.now(), amount: parseFloat(amount), category, payment, date, memo: memo || category });
  saveBudgetMaster(budgetData);
  closeBudgetModal();
}

function deleteExpenseItem(id) {
  if (!confirm("이 지출 내역을 삭제할까요?")) return;
  const budgetData = getBudgetMaster();
  budgetData.expenses = budgetData.expenses.filter(e => e.id !== id);
  saveBudgetMaster(budgetData);
}

// 5. 총 예산 설정 모달
function openBudgetSettingModal() {
  const budgetData = getBudgetMaster();
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5"><span>⚙️</span> 월별 예산 설정</h3>
          <button onclick="closeBudgetModal()" class="text-stone-400 hover:text-stone-600 font-bold text-sm">✕</button>
        </div>
        <div class="space-y-2 text-xs">
          <div><label class="text-[10px] text-stone-500 block mb-1">이번 달 목표 총 예산 (원)</label><input type="number" id="settingTotalBudget" value="${budgetData.totalBudget}" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"></div>
        </div>
        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveBudgetSetting()" class="flex-1 py-2 bg-stone-800 text-white font-bold text-xs rounded-xl">저장</button>
          <button onclick="closeBudgetModal()" class="py-2 px-3 bg-stone-100 text-stone-600 text-xs rounded-xl">취소</button>
        </div>
      </div>
    </div>
  `;
}

function confirmSaveBudgetSetting() {
  const val = document.getElementById('settingTotalBudget').value;
  if (!val) return;
  const budgetData = getBudgetMaster();
  budgetData.totalBudget = parseFloat(val);
  saveBudgetMaster(budgetData);
  closeBudgetModal();
}
// ==========================================
// 📚 구글 북스 API 검색 & 4단계 도서 책장 엔진
// ==========================================

// ==========================================
// 📚 구글 북스 검색 & 4단계 도서 책장 엔진
// ==========================================

function getBooksMaster() {
  return JSON.parse(localStorage.getItem('mingle_books_data') || '[]');
}

function saveBooksMaster(data) {
  localStorage.setItem('mingle_books_data', JSON.stringify(data));
  if (typeof renderBookShelf === 'function') renderBookShelf();
  if (typeof db !== 'undefined' && db) {
    db.collection('drawer_book').doc('master').set({ books: data }).catch(console.error);
  }
}

// 구글 북스 검색 (호출량 초과 대비 안전 처리 + 표지 링크 지원)
async function searchGoogleBooks() {
  const inputEl = document.getElementById('bookSearchKeyword');
  const query = inputEl ? inputEl.value.trim() : '';
  const container = document.getElementById('bookSearchResults');
  if (!container || !query) return;

  container.classList.remove('hidden');
  container.innerHTML = '<div class="p-2.5 text-center text-xs text-stone-400 animate-pulse">도서 검색 중... 🔍</div>';

  try {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query) + '&maxResults=8';
    let res = await fetch(url);
    let data = await res.json();

    if (data.error || !data.items || data.items.length === 0) {
      container.innerHTML = `
        <div class="p-3 text-center text-xs text-stone-600 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
          <p class="font-bold text-amber-900">구글 도서관 호출이 원활하지 않아요 🥺</p>
          <p class="text-[11px] text-stone-500">'${query}' 제목으로 바로 입력하고, 표지는 링크로 예쁘게 넣어보세요!</p>
          <div class="flex gap-1.5 justify-center pt-1">
            <button type="button" onclick="applyDirectBookTitle('${query.replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-amber-200 text-amber-950 font-bold rounded-lg text-xs shadow-2xs">👉 제목 바로 적용</button>
            <button type="button" onclick="promptCustomCoverUrl()" class="px-2.5 py-1 bg-white border border-amber-300 text-stone-700 font-bold rounded-lg text-xs shadow-2xs">🖼️ 표지 URL 넣기</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = data.items.map(function(item) {
      const info = item.volumeInfo || {};
      const title = (info.title || '제목 없음').replace(/"/g, '&quot;');
      const author = ((info.authors || []).join(', ') || info.publisher || '저자 미상').replace(/"/g, '&quot;');
      const cover = info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail || '').replace('http:', 'https:') : 'https://via.placeholder.com/60x85?text=No+Cover';
      const pageCount = info.pageCount || 0;

      return `
        <div onclick="selectGoogleBook('${title.replace(/'/g, "\\'")}', '${author.replace(/'/g, "\\'")}', '${cover}', ${pageCount})" class="p-2 bg-white rounded-lg border border-stone-200 flex items-center gap-2.5 cursor-pointer hover:bg-emerald-50 transition-colors">
          <img src="${cover}" class="w-8 h-11 object-cover rounded shadow-2xs shrink-0" onerror="this.src='https://via.placeholder.com/60x85?text=Cover'">
          <div class="min-w-0 flex-1">
            <p class="font-bold text-xs text-stone-800 truncate">${title}</p>
            <p class="text-[10px] text-stone-500 truncate">${author} · ${pageCount ? pageCount + '쪽' : '페이지 미상'}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="p-3 text-center text-xs text-stone-600 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
        <p class="font-bold text-amber-900">검색 결과를 불러오지 못했어요 😢</p>
        <button type="button" onclick="applyDirectBookTitle('${query.replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-amber-200 text-amber-950 font-bold rounded-lg text-xs shadow-2xs">👉 '${query}' 제목으로 쓰기</button>
      </div>
    `;
  }
}

// 직접 제목 넣기 & 표지 URL 등록 헬퍼
function applyDirectBookTitle(title) {
  const inp = document.getElementById('bookInputTitle');
  if (inp) inp.value = title;
  document.getElementById('bookSearchResults')?.classList.add('hidden');
}

function promptCustomCoverUrl() {
  const url = prompt('원하는 책 표지 이미지 주소(URL)를 붙여넣어 주세요:\n(네이버/구글 이미지 검색에서 "이미지 주소 복사")');
  if (!url || !url.trim()) return;
  const cleanUrl = url.trim();
  const coverUrlInput = document.getElementById('bookCoverUrl');
  if (coverUrlInput) coverUrlInput.value = cleanUrl;

  const coverImg = document.getElementById('bookPreviewCover');
  const icon = document.getElementById('bookPreviewIcon');
  const text = document.getElementById('bookPreviewText');

  if (coverImg) {
    coverImg.src = cleanUrl;
    coverImg.classList.remove('hidden');
  }
  if (icon) icon.classList.add('hidden');
  if (text) text.classList.add('hidden');
  document.getElementById('bookSearchResults')?.classList.add('hidden');
}

function selectGoogleBook(title, author, cover, pageCount) {
  document.getElementById('bookInputTitle').value = title;
  document.getElementById('bookInputAuthor').value = author;
  document.getElementById('bookInputTotalPage').value = pageCount || '';
  document.getElementById('bookCoverUrl').value = cover;

  const coverImg = document.getElementById('bookPreviewCover');
  const icon = document.getElementById('bookPreviewIcon');
  const text = document.getElementById('bookPreviewText');

  if (cover && !cover.includes('placeholder')) {
    coverImg.src = cover;
    coverImg.classList.remove('hidden');
    if (icon) icon.classList.add('hidden');
    if (text) text.classList.add('hidden');
  }
  document.getElementById('bookSearchResults')?.classList.add('hidden');
}

// 도서 저장 로직
function saveBookMaster() {
  const title = document.getElementById('bookInputTitle')?.value.trim();
  if (!title) {
    alert('도서명을 입력해주세요!');
    return;
  }

  const books = getBooksMaster();
  const editId = document.getElementById('bookEditId')?.value;
  const bookData = {
    title,
    author: document.getElementById('bookInputAuthor')?.value.trim() || '저자 미상',
    totalPage: parseInt(document.getElementById('bookInputTotalPage')?.value, 10) || 0,
    cover: document.getElementById('bookCoverUrl')?.value || '',
    status: document.getElementById('bookInputStatus')?.value || 'reading',
    startDate: document.getElementById('bookInputStartDate')?.value || '',
    endDate: document.getElementById('bookInputEndDate')?.value || '',
    rating: document.getElementById('bookInputRating')?.value || '5',
    review: document.getElementById('bookInputReview')?.value.trim() || ''
  };

  if (editId) {
    const idx = books.findIndex(b => String(b.id) === String(editId));
    if (idx !== -1) {
      books[idx] = { ...books[idx], ...bookData };
    }
  } else {
    books.unshift({
      id: Date.now(),
      currentPage: 0,
      history: [],
      ...bookData
    });
  }

  saveBooksMaster(books);
  closeBookDetailModal();
}

// 삭제 로직
function deleteCurrentBook() {
  const editId = document.getElementById('bookEditId').value;
  if (!editId) return;
  if (!confirm('이 책을 책장에서 삭제할까요?')) return;

  let books = getBooksMaster();
  books = books.filter(b => b.id != editId);
  saveBooksMaster(books);
  closeBookDetailModal();
}

// 책장 목록 렌더링 (4단계 탭/상태 지원)
let currentBookFilter = 'all';
function filterBooks(status) {
  currentBookFilter = status;
  renderBookShelf();
}

function renderBookShelf() {
  const container = document.getElementById('bookshelfList');
  if (!container) return;

  const books = getBooksMaster();
  const filtered = currentBookFilter === 'all' ? books : books.filter(b => b.status === currentBookFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-stone-50 rounded-xl p-6 text-center text-stone-400 text-xs border border-stone-200">
        <p>등록된 도서가 없어요 📚</p>
        <p class="text-[10px] mt-1 text-stone-400">[+ 도서 등록]을 눌러 구글 책 검색으로 손쉽게 추가해보세요!</p>
      </div>
    `;
    return;
  }

  const statusBadges = {
    reading: '<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] px-1.5 py-0.2 rounded font-bold">읽는 중</span>',
    completed: '<span class="bg-amber-50 text-amber-900 border border-amber-200 text-[9px] px-1.5 py-0.2 rounded font-bold">완독 🏆</span>',
    wish: '<span class="bg-stone-100 text-stone-600 border border-stone-200 text-[9px] px-1.5 py-0.2 rounded font-bold">위시 🔖</span>',
    stopped: '<span class="bg-rose-50 text-rose-800 border border-rose-200 text-[9px] px-1.5 py-0.2 rounded font-bold">중단</span>'
  };

  container.innerHTML = filtered.map(b => {
    const totalP = b.totalPage || 0;
    const currP = b.currentPage || 0;
    const percent = totalP > 0 ? Math.min(100, Math.round((currP / totalP) * 100)) : 0;

    return `
      <div onclick="openBookEditModal(${b.id})" class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer flex gap-3">
        <img src="${b.cover || 'https://via.placeholder.com/60x85?text=Cover'}" class="w-12 h-16 object-cover rounded-md border border-stone-200 shrink-0">
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-1">
              <h4 class="font-bold text-xs text-stone-800 truncate">${b.title}</h4>
              ${statusBadges[b.status] || ''}
            </div>
            <p class="text-[10px] text-stone-500 truncate mt-0.5">${b.author || '저자 미상'}</p>
          </div>

          <!-- 진행률 바 (읽는 중이거나 페이지 정보가 있을 때) -->
          ${totalP > 0 ? `
            <div class="space-y-0.5 mt-1.5">
              <div class="flex justify-between text-[9px] font-mono text-stone-500">
                <span>${currP} /${totalP}p</span>
                <span>${percent}%</span>
              </div>
              <div class="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${percent}%"></div>
              </div>
            </div>
          ` : `
            <div class="text-[10px] text-amber-500 mt-1">${'⭐'.repeat(parseInt(b.rating) || 5)}</div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// ⭐ 쩜오(0.5) 별점 계산 헬퍼 함수
function getRatingStars(rating) {
  const score = parseFloat(rating) || 5;
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 !== 0;
  return '⭐'.repeat(fullStars) + (hasHalf ? '✨' : '');
}

// 시간 입력창에 숫자만 치면 자동으로 HH:mm 형식 포맷팅해주는 스마트 함수
function formatTimeInput(input) {
  let val = input.value.replace(/[^0-9]/g, '');
  if (val.length >= 3) {
    val = val.slice(0, 2) + ':' + val.slice(2, 4);
  }
  input.value = val;
}

// ==========================================
// 💸 데일리 가계부 & 스마트 시간 입력 로직
// ==========================================

// 기본 카테고리 맵 (대분류 -> 소분류 목록)
window.DEFAULT_EXPENSE_CATS = {
  '식비': ['식재료', '외식', '카페·간식', '배달'],
  '생활비': ['생필품', '반려묘', '주거/통신', '생활잡화'],
  '교통': ['대중교통', '택시', '주유/차량'],
  '쇼핑': ['의류/패션', '화장품/뷰티', '취미/도서'],
  '문화/여가': ['영화/공연', '여행/숙박', '운동'],
  '의료/건강': ['병원/약국', '영양제/건강식'],
  '기타': ['경조사/선물', '기타지출']
};

// 스마트 시간 포맷터 (숫자만 치면 00:00 자동 변환)
function formatSmartTimeInput(el) {
  if (!el) return;
  let val = el.value.replace(/[^0-9]/g, '');
  if (val.length >= 4) {
    let hh = parseInt(val.slice(0, 2), 10);
    let mm = parseInt(val.slice(2, 4), 10);
    if (isNaN(hh) || hh > 23) hh = 23;
    if (isNaN(mm) || mm > 59) mm = 59;
    el.value = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  } else {
    el.value = val;
  }
}

// 현재 시간 기본 세팅 함수 (HH:mm)
function setExpenseNowTime() {
  const timeInput = document.getElementById('expenseTimeInput');
  if (!timeInput) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  timeInput.value = `${hh}:${mm}`;

  // 💡 클릭하거나 터치(포커스)하면 기존 시간 싹 비워서 편하게 입력 가능!
  timeInput.onfocus = function() {
    this.value = '';
  };
}

// 대분류 변경 시 소분류 셀렉트박스 동적 업데이트
function onExpenseMainCatChange() {
  const mainSelect = document.getElementById('expenseMainCatSelect');
  const subSelect = document.getElementById('expenseSubCatSelect');
  if (!mainSelect || !subSelect) return;

  const mainCat = mainSelect.value;
  const subCats = (window.DEFAULT_EXPENSE_CATS && window.DEFAULT_EXPENSE_CATS[mainCat]) || ['기본'];
  
  subSelect.innerHTML = '';
  subCats.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub;
    opt.textContent = sub;
    subSelect.appendChild(opt);
  });
}

// 오늘 지출 목록 화면 렌더링
function renderExpenseWidget() {
  try {
    const container = document.getElementById('expenseListContainer');
    const totalChip = document.getElementById('expenseTodayTotalChip');
    if (!container) return;

    // 오직 현재 날짜의 파이어베이스 데이터만 정직하게 조회!
    const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
    let dayData = (window.currentDayData && window.currentDayData.date === curDate) ? window.currentDayData : {};
    const expenses = Array.isArray(dayData.expenses) ? dayData.expenses : [];
    container.innerHTML = '';

    let totalSum = 0;

    if (expenses.length === 0) {
      container.innerHTML = '<p class="text-[11px] text-stone-300 italic text-center py-2">오늘 지출 내역이 없습니다 ✨</p>';
    } else {
      expenses.forEach((item, idx) => {
        const amt = Number(item.amount) || 0;
        totalSum += amt;

        const row = document.createElement('div');
        row.className = 'flex items-center justify-between bg-white border border-stone-150 rounded-xl px-2.5 py-1.5 shadow-2xs hover:bg-stone-50 cursor-pointer transition';
        row.onclick = () => openEditTodayExpenseModal(idx);

        // 카테고리에서 슬래시(/) 앞의 대분류 제거하고 소분류만 깔끔하게 추출
        const rawCat = item.category || item.subCategory || '';
        const displaySubCat = rawCat.includes('/') ? rawCat.split('/').pop().trim() : (rawCat || '기타');

        row.innerHTML = `
          <div class="flex items-center gap-1.5 min-w-0 flex-1">
            <span class="font-mono text-[10px] text-stone-400 shrink-0">${item.time || '--:--'}</span>
            <span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200/50 shrink-0">${displaySubCat}</span>
            <span class="truncate font-medium text-stone-800 text-xs">${item.title || item.memo || '지출'}</span>
            <span class="text-[10px] text-stone-400 shrink-0">(${item.payMethod || item.payment || '카드'})</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0 ml-2">
            <span class="font-mono font-semibold text-stone-900 text-xs">${amt.toLocaleString()}원</span>
            <button type="button" onclick="event.stopPropagation(); deleteExpenseEntry(${idx})" class="text-stone-300 hover:text-rose-500 font-bold px-1 text-sm leading-none" title="삭제">&times;</button>
          </div>
        `;
        container.appendChild(row);
      });
    }

    if (totalChip) {
      totalChip.innerText = `총 ${totalSum.toLocaleString()}원`;
    }

    // 소분류 초기화 확인 & 시간 세팅
    if (document.getElementById('expenseSubCatSelect')?.options?.length === 0) {
      onExpenseMainCatChange();
    }
    const timeInput = document.getElementById('expenseTimeInput');
    if (timeInput && !timeInput.value) {
      setExpenseNowTime();
    }
  } catch(err) {
    console.warn('renderExpenseWidget 에러 패스:', err);
  }
}

// ✏️ [오늘의 지출] 상세 수정 모달 (소분류 단독 표시)
function openEditTodayExpenseModal(idx) {
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  let dayData = (window.currentDayData && window.currentDayData.date === curDate) ? window.currentDayData : {};
  const list = Array.isArray(dayData.expenses) ? dayData.expenses : [];
  const item = list[idx];
  if (!item) return;

  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : {};
  const payMethods = typeof getStoredPayMethods === 'function' ? getStoredPayMethods() : ['현금', '카드', '계좌이체', '간편결제'];

  // 대분류 없이 소분류만 모으기
  let subCatList = [];
  Object.keys(cats).forEach(k => {
    (cats[k] || []).forEach(s => {
      if (!subCatList.includes(s)) subCatList.push(s);
    });
  });
  if (subCatList.length === 0) subCatList = ['식재료', '외식', '카페·간식', '쇼핑', '대중교통', '생활', '기타지출'];

  const rawCat = item.category || item.subCategory || '';
  const currentSub = rawCat.includes('/') ? rawCat.split('/').pop().trim() : rawCat;

  let modalEl = document.getElementById('modalTodayExpenseEdit');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'modalTodayExpenseEdit';
    document.body.appendChild(modalEl);
  }

  modalEl.className = 'fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4';
  modalEl.innerHTML = `
    <div class="bg-white rounded-2xl p-5 max-w-xs w-full space-y-3.5 shadow-xl border border-stone-200">
      <div class="flex items-center justify-between border-b border-stone-100 pb-2">
        <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <span>✏️</span> 지출 내역 수정
        </h3>
        <button type="button" onclick="document.getElementById('modalTodayExpenseEdit').remove()" class="text-stone-400 hover:text-stone-600 font-bold text-base">&times;</button>
      </div>

      <div class="space-y-2.5 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">시간</label>
            <input type="text" id="editTodayExpTime" value="${item.time || ''}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono text-xs">
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">카테고리</label>
            <select id="editTodayExpCat" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs">
              ${subCatList.map(s => `<option value="${s}" ${s === currentSub ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="text-[10px] text-stone-500 font-medium block mb-1">지출 내용</label>
          <input type="text" id="editTodayExpTitle" value="${item.title || item.memo || ''}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">결제수단</label>
            <select id="editTodayExpPay" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs">
            ${payMethods.map(m => `<option value="${m}" ${m === (item.payMethod || item.payment) ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">금액 (원)</label>
            <input type="number" id="editTodayExpAmt" value="${item.amount || 0}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono font-bold text-xs">
          </div>
        </div>
      </div>

      <div class="flex gap-2 pt-1.5">
        <button type="button" onclick="document.getElementById('modalTodayExpenseEdit').remove()" class="flex-1 py-1.5 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium text-xs">취소</button>
        <button type="button" onclick="saveEditedTodayExpense(${idx})" class="flex-1 py-1.5 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-bold text-xs shadow-sm">수정 완료</button>
      </div>
    </div>
  `;
}

// 💾 오늘 지출 수정 내용 저장 & 동기화
function saveEditedTodayExpense(idx) {
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  let dayData = (window.currentDayData && window.currentDayData.date === curDate) ? window.currentDayData : null;
  if (!dayData || !Array.isArray(dayData.expenses) || !dayData.expenses[idx]) return;

  const newTime = document.getElementById('editTodayExpTime').value.trim();
  const newCat = document.getElementById('editTodayExpCat').value;
  const newTitle = document.getElementById('editTodayExpTitle').value.trim();
  const newPay = document.getElementById('editTodayExpPay').value;
  const newAmt = parseFloat(document.getElementById('editTodayExpAmt').value) || 0;

  dayData.expenses[idx].time = newTime;
  dayData.expenses[idx].category = newCat;
  dayData.expenses[idx].subCategory = newCat;
  dayData.expenses[idx].title = newTitle;
  dayData.expenses[idx].memo = newTitle;
  dayData.expenses[idx].payMethod = newPay;
  dayData.expenses[idx].payment = newPay;
  dayData.expenses[idx].amount = newAmt;

  if (typeof saveDayDataLocal === 'function') saveDayDataLocal(curDate, dayData);
  if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(curDate, dayData);

  document.getElementById('modalTodayExpenseEdit')?.remove();
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
}

// 지출 새 항목 추가
function addExpenseEntry() {
  const timeInput = document.getElementById('expenseTimeInput');
  const mainSelect = document.getElementById('expenseMainCatSelect');
  const subSelect = document.getElementById('expenseSubCatSelect');
  const paySelect = document.getElementById('expensePayMethodSelect');
  const itemInput = document.getElementById('expenseItemInput');
  const amountInput = document.getElementById('expenseAmountInput');

  const amount = parseInt(amountInput?.value, 10);
  if (isNaN(amount) || amount <= 0) {
    alert('금액을 올바르게 입력해 주세요!');
    amountInput?.focus();
    return;
  }

  const title = (itemInput?.value || '').trim() || subSelect?.value || '기타 지출';
  const newEntry = {
    id: 'exp_' + Date.now(),
    time: timeInput?.value || '00:00',
    mainCat: mainSelect?.value || '기타',
    subCat: subSelect?.value || '일반',
    payMethod: paySelect?.value || '카드',
    title: title,
    amount: amount
  };

    const key = 'mingle_day_' + currentDate;
    let dayData = {};
    try {
      const stored = localStorage.getItem(key);
      dayData = stored ? JSON.parse(stored) : {};
    } catch(e) {
      dayData = {};
    }

    if (!Array.isArray(dayData.expenses)) {
      dayData.expenses = [];
    }
    dayData.expenses.push(newEntry);

    // 시간순 정렬
    dayData.expenses.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    // 1. 로컬 스토리지 안전 저장
    localStorage.setItem(key, JSON.stringify(dayData));
    if (typeof saveDayDataLocal === 'function') {
      try { saveDayDataLocal(currentDate, dayData); } catch(e) {}
    }
    if (window.currentDayData) window.currentDayData.expenses = dayData.expenses;

    // 2. 파이어베이스에 즉시 동기화 (기존 다른 데이터 절대 안 건드림)
    if (typeof db !== 'undefined' && db) {
      db.collection('diary_days').doc(currentDate).set({
        expenses: dayData.expenses
      }, { merge: true }).catch(err => console.error(err));
    }

    // 3. 화면 지출 목록 갱신
    if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
    if (typeof renderTodayExpenses === 'function') renderTodayExpenses();
    if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();

  // 인풋 초기화
  if (itemInput) itemInput.value = '';
  if (amountInput) amountInput.value = '';
  setExpenseNowTime();

  renderExpenseWidget();
}

// 지출 항목 삭제
function deleteExpenseEntry(idx) {
  const curDate = (typeof currentDate !== 'undefined' && currentDate) ? currentDate : new Date().toISOString().split('T')[0];
  const key = 'mingle_day_' + curDate;
  let dayData = {};
  try {
    const stored = localStorage.getItem(key);
    dayData = stored ? JSON.parse(stored) : {};
  } catch(e) {
    dayData = {};
  }

  if (Array.isArray(dayData.expenses)) {
    dayData.expenses.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(dayData));
    if (typeof saveDayDataLocal === 'function') {
      try { saveDayDataLocal(curDate, dayData); } catch(e) {}
    }
    if (window.currentDayData) window.currentDayData.expenses = dayData.expenses;

    // 파이어베이스 즉시 동기화 삭제 반영
    if (typeof db !== 'undefined' && db) {
      db.collection('diary_days').doc(curDate).set({
        expenses: dayData.expenses
      }, { merge: true }).catch(err => console.error(err));
    }

    if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
    if (typeof renderTodayExpenses === 'function') renderTodayExpenses();
    if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
  }
}

// ==========================================
// 💰 밍글 똑똑 가계부 통합 관리 엔진
// ==========================================

// 현재 가계부 달력 조회 기준 연/월 (기본값: 오늘)
window.abCurrentYear = new Date().getFullYear();
window.abCurrentMonth = new Date().getMonth() + 1; // 1 ~ 12
window.abSelectedDate = typeof currentDate !== 'undefined' ? currentDate : new Date().toISOString().slice(0, 10);

// 결제수단 기본값
window.DEFAULT_PAY_METHODS = ['카드', '현금', '계좌이체', '간편결제'];

function getStoredPayMethods() {
  try {
    const saved = localStorage.getItem('mingle_expense_pay_methods');
    return saved ? JSON.parse(saved) : window.DEFAULT_PAY_METHODS;
  } catch(e) {
    return window.DEFAULT_PAY_METHODS;
  }
}

function saveStoredPayMethods(list) {
  localStorage.setItem('mingle_expense_pay_methods', JSON.stringify(list));
  refreshPayMethodSelects();
  if (typeof db !== 'undefined' && db) {
    db.collection('account_book_settings').doc('master').set({
      payMethods: list
    }, { merge: true }).catch(console.error);
  }
}

// ✏️ 결제수단 이름 수정 (클라우드 즉시 동기화)
function editStoredPayMethod(idx) {
  let list = getStoredPayMethods();
  if (idx < 0 || idx >= list.length) return;
  const oldName = list[idx];
  const newName = prompt('결제수단 이름을 수정해주세요:', oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;

  list[idx] = newName.trim();
  saveStoredPayMethods(list);
  if (typeof renderPayMethodSettingsModal === 'function') renderPayMethodSettingsModal();
}

function getStoredCategories() {
  try {
    const saved = localStorage.getItem('mingle_expense_custom_cats');
    return saved ? JSON.parse(saved) : (window.DEFAULT_EXPENSE_CATS || {});
  } catch(e) {
    return window.DEFAULT_EXPENSE_CATS || {};
  }
}

function saveStoredCategories(cats) {
  localStorage.setItem('mingle_expense_custom_cats', JSON.stringify(cats));
  window.DEFAULT_EXPENSE_CATS = cats;
  if (typeof onExpenseMainCatChange === 'function') onExpenseMainCatChange();
  if (typeof db !== 'undefined' && db) {
    db.collection('account_book_settings').doc('master').set({
      categories: cats
    }, { merge: true }).catch(console.error);
  }
}

// ✏️️ 카테고리(중분류) 이름 수정 도우미
function editStoredSubCategory(mainKey, idx) {
  let cats = getStoredCategories();
  let list = cats[mainKey] || [];
  if (idx < 0 || idx >= list.length) return;
  const oldName = list[idx];
  const newName = prompt('카테고리 이름을 수정해주세요:', oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;

  list[idx] = newName.trim();
  cats[mainKey] = list;
  saveStoredCategories(cats);
  if (typeof renderCategorySettingsModal === 'function') renderCategorySettingsModal();
  if (typeof refreshCategorySelects === 'function') refreshCategorySelects();
  if (typeof onExpenseMainCatChange === 'function') onExpenseMainCatChange();
}

function refreshPayMethodSelects() {
  const paySelect = document.getElementById('expensePayMethodSelect');
  if (!paySelect) return;
  const methods = getStoredPayMethods();
  paySelect.innerHTML = '';
  methods.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    paySelect.appendChild(opt);
  });
}

// 탭 전환 (달력 / 예산 / 고정지출)
function switchAccountBookTab(tab) {
  const vCal = document.getElementById('abViewCalendar');
  const vBud = document.getElementById('abViewBudget');
  const vFix = document.getElementById('abViewFixed');
  const bCal = document.getElementById('abTabBtnCalendar');
  const bBud = document.getElementById('abTabBtnBudget');
  const bFix = document.getElementById('abTabBtnFixed');

  [vCal, vBud, vFix].forEach(el => el && el.classList.add('hidden'));
  [bCal, bBud, bFix].forEach(el => {
    if (el) {
      el.className = 'py-1.5 rounded-lg hover:text-stone-700 transition';
    }
  });

  if (tab === 'calendar') {
    if (vCal) vCal.classList.remove('hidden');
    if (bCal) bCal.className = 'py-1.5 rounded-lg bg-white text-stone-800 shadow-2xs font-semibold transition';
    renderAccountBookCalendar();
  } else if (tab === 'budget') {
    if (vBud) vBud.classList.remove('hidden');
    if (bBud) bBud.className = 'py-1.5 rounded-lg bg-white text-stone-800 shadow-2xs font-semibold transition';
    renderAccountBookBudget();
  } else if (tab === 'fixed') {
    if (vFix) vFix.classList.remove('hidden');
    if (bFix) bFix.className = 'py-1.5 rounded-lg bg-white text-stone-800 shadow-2xs font-semibold transition';
    renderAccountBookFixed();
  }
}

// 가계부 달력 월 변경 (< > 버튼)
function changeAccountBookMonth(delta) {
  window.abCurrentMonth += delta;
  if (window.abCurrentMonth < 1) {
    window.abCurrentMonth = 12;
    window.abCurrentYear -= 1;
  } else if (window.abCurrentMonth > 12) {
    window.abCurrentMonth = 1;
    window.abCurrentYear += 1;
  }
  renderAccountBookCalendar();
}

// 날짜별 총 지출 데이터 수집 (해당 월 전체)
function getMonthExpensesData(year, month) {
  const result = {
    dailyTotals: {}, // 'YYYY-MM-DD': 총금액
    monthTotal: 0,
    totalCount: 0,
    catTotals: {}
  };

  const prefix = `mingle_day_${year}-${String(month).padStart(2, '0')}`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      const dateStr = key.replace('mingle_day_', '');
      try {
        const dayData = JSON.parse(localStorage.getItem(key) || '{}');
        const expenses = dayData.expenses || [];
        let daySum = 0;
        expenses.forEach(item => {
          const amt = Number(item.amount) || 0;
          daySum += amt;
          result.monthTotal += amt;
          result.totalCount += 1;
          const main = item.mainCat || '기타';
          result.catTotals[main] = (result.catTotals[main] || 0) + amt;
        });
        if (daySum > 0) {
          result.dailyTotals[dateStr] = daySum;
        }
      } catch(e) {}
    }
  }
  return result;
}

// 가계부 달력 화면 렌더링
function renderAccountBookCalendar() {
  const y = window.abCurrentYear;
  const m = window.abCurrentMonth;
  const monthData = getMonthExpensesData(y, m);

  // 헤더 텍스트 반영
  const badge = document.getElementById('accountBookMonthBadge');
  if (badge) badge.innerText = `${y}년 ${m}월`;
  const title = document.getElementById('abCalendarMonthTitle');
  if (title) title.innerText = `${y}.${String(m).padStart(2, '0')}`;

  const totalEl = document.getElementById('abMonthTotalExpense');
  if (totalEl) totalEl.innerText = `${monthData.monthTotal.toLocaleString()}원`;
  const countBadge = document.getElementById('abMonthCountBadge');
  if (countBadge) countBadge.innerText = `총 ${monthData.totalCount}건 기록`;

  // 달력 그리드 계산
  const grid = document.getElementById('abCalendarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const firstDayIndex = new Date(y, m - 1, 1).getDay(); // 0(일) ~ 6(토)
  const lastDate = new Date(y, m, 0).getDate();

  // 빈 칸
  for (let b = 0; b < firstDayIndex; b++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'h-12';
    grid.appendChild(emptyCell);
  }

  // 1일 ~ 말일 셀 생성
  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayTotal = monthData.dailyTotals[dateStr] || 0;
    const isSelected = (window.abSelectedDate === dateStr);

    const cell = document.createElement('div');
    cell.onclick = () => {
      window.abSelectedDate = dateStr;
      renderAccountBookCalendar();
    };

    let borderClass = isSelected ? 'border-amber-500 bg-amber-50/50 font-bold' : 'border-stone-100 hover:border-stone-300 bg-white';
    cell.className = `h-12 border rounded-lg p-0.5 flex flex-col justify-between cursor-pointer transition text-left ${borderClass}`;

    cell.innerHTML = `
      <span class="text-[10px] text-stone-600 leading-none pl-0.5">${d}</span>
      ${dayTotal > 0 ? `<span class="text-[9px] font-mono font-semibold text-rose-600 truncate text-right pr-0.5 leading-none">-${dayTotal >= 10000 ? Math.round(dayTotal/10000)+'만' : dayTotal.toLocaleString()}</span>` : '<span class="h-2"></span>'}
    `;
    grid.appendChild(cell);
  }

  // 선택된 날짜 상세 지출 목록 렌더링
  renderSelectedDayExpenses();
}

// 선택한 날짜 지출 목록 출력
function renderSelectedDayExpenses() {
  const targetDate = window.abSelectedDate;
  const labelEl = document.getElementById('abSelectedDateLabel');
  const totalEl = document.getElementById('abSelectedDateTotal');
  const listEl = document.getElementById('abDayExpenseList');
  if (!listEl) return;

  if (labelEl) {
    const parts = targetDate.split('-');
    labelEl.innerText = parseInt(parts[1], 10) + '월 ' + parseInt(parts[2], 10) + '일';
  }

  // 💡 심플한 '+ 지출 추가' 텍스트 버튼 배치
  if (totalEl) {
    totalEl.innerHTML = '<button type="button" onclick="openAddAccountBookExpenseModal(\'' + targetDate + '\')" class="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-xl transition shadow-2xs">+ 지출 추가</button>';
  }

  let dayData = {};
  try {
    dayData = JSON.parse(localStorage.getItem('mingle_day_' + targetDate) || '{}');
  } catch(e) {}

  const expenses = Array.isArray(dayData.expenses) ? dayData.expenses : [];
  listEl.innerHTML = '';
  let sum = 0;

  if (expenses.length === 0) {
    listEl.innerHTML = '<p class="text-[11px] text-stone-300 italic text-center py-3">지출 내역이 없습니다 ✨</p>';
  } else {
    expenses.forEach((item, idx) => {
      const amt = Number(item.amount) || 0;
      sum += amt;

      const row = document.createElement('div');
      row.className = 'flex items-center justify-between bg-stone-50 border border-stone-150 rounded-xl px-2.5 py-1.5 hover:bg-stone-100/70 cursor-pointer transition text-xs';
      row.onclick = () => openEditAccountBookExpenseModal(targetDate, idx);

      const rawCat = item.category || item.subCategory || '';
      const displaySubCat = rawCat.includes('/') ? rawCat.split('/').pop().trim() : (rawCat || '기타');

      row.innerHTML = `
        <div class="flex items-center gap-1.5 min-w-0 flex-1">
          <span class="font-mono text-[10px] text-stone-400 shrink-0">${item.time || '--:--'}</span>
          <span class="px-1.5 py-0.5 rounded bg-amber-100/60 text-amber-800 text-[10px] font-medium border border-amber-200/50 shrink-0">${displaySubCat}</span>
          <span class="truncate font-medium text-stone-800">${item.title || item.memo || '지출'}</span>
          <span class="text-[10px] text-stone-400 shrink-0">(${item.payMethod || item.payment || '카드'})</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 ml-2">
          <span class="font-mono font-bold text-stone-900">${amt.toLocaleString()}원</span>
          <button type="button" onclick="event.stopPropagation(); deleteAccountBookExpenseEntry('${targetDate}', ${idx})" class="text-stone-300 hover:text-rose-500 font-bold px-1 text-sm leading-none" title="삭제">&times;</button>
        </div>
      `;
      listEl.appendChild(row);
    });

    // 💡 마이너스(-) 뺀 단정한 일별 합계 줄
    const totalRow = document.createElement('div');
    totalRow.className = 'flex items-center justify-between pt-2 border-t border-dashed border-stone-200 text-xs px-1 text-stone-500 font-medium';
    totalRow.innerHTML = `
      <span>일별 합계</span>
      <span class="font-mono font-bold text-stone-900 text-sm">${sum.toLocaleString()}원</span>
    `;
    listEl.appendChild(totalRow);
  }
}

// ➕ [가계부 서랍] 지출 추가 모달 (대분류-소분류 동적 연동)
function openAddAccountBookExpenseModal(defaultDate) {
  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : (window.DEFAULT_EXPENSE_CATS || {});
  const mainCats = Object.keys(cats);
  const defaultMain = mainCats[0] || '식비';
  const defaultSubs = cats[defaultMain] || ['식재료'];
  const payMethods = typeof getStoredPayMethods === 'function' ? getStoredPayMethods() : ['현금', '카드', '계좌이체', '간편결제'];

  const now = new Date();
  const curTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  let modalEl = document.getElementById('modalAbExpenseAdd');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'modalAbExpenseAdd';
    document.body.appendChild(modalEl);
  }

  modalEl.className = 'fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4';
  modalEl.innerHTML = `
    <div class="bg-white rounded-2xl p-5 max-w-xs w-full space-y-3.5 shadow-xl border border-stone-200">
      <div class="flex items-center justify-between border-b border-stone-100 pb-2">
        <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <span>➕</span> 가계부 지출 추가
        </h3>
        <button type="button" onclick="document.getElementById('modalAbExpenseAdd').remove()" class="text-stone-400 hover:text-stone-600 font-bold text-base">&times;</button>
      </div>

      <div class="space-y-2.5 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">날짜</label>
            <input type="date" id="addAbExpDate" value="${defaultDate}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs">
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">시간</label>
            <input type="text" id="addAbExpTime" value="${curTime}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono text-xs">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">대분류</label>
            <select id="addAbExpMainCat" onchange="onAbAddMainCatChange()" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs font-medium">
              ${mainCats.map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">소분류</label>
            <select id="addAbExpSubCat" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs font-medium">
              ${defaultSubs.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="text-[10px] text-stone-500 font-medium block mb-1">지출 내용</label>
          <input type="text" id="addAbExpTitle" placeholder="예: 맛있는 점심" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">결제수단</label>
            <select id="addAbExpPay" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs">
              ${payMethods.map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">금액 (원)</label>
            <input type="number" id="addAbExpAmt" placeholder="0" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono font-bold text-xs">
          </div>
        </div>
      </div>

      <div class="flex gap-2 pt-1.5">
        <button type="button" onclick="document.getElementById('modalAbExpenseAdd').remove()" class="flex-1 py-1.5 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium text-xs">취소</button>
        <button type="button" onclick="saveNewAccountBookExpense()" class="flex-1 py-1.5 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-bold text-xs shadow-sm">추가하기</button>
      </div>
    </div>
  `;

  const timeInp = document.getElementById('addAbExpTime');
  if (timeInp) timeInp.onfocus = function() { this.value = ''; };
}

// 🔄 가계부 추가 모달 대분류 변경 시 소분류 셀렉트 갱신
function onAbAddMainCatChange() {
  const mainVal = document.getElementById('addAbExpMainCat').value;
  const subSelect = document.getElementById('addAbExpSubCat');
  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : (window.DEFAULT_EXPENSE_CATS || {});
  const subs = cats[mainVal] || ['기타'];
  subSelect.innerHTML = subs.map(s => `<option value="${s}">${s}</option>`).join('');
}

// 💾 [가계부 서랍] 신규 지출 저장
function saveNewAccountBookExpense() {
  const dateVal = document.getElementById('addAbExpDate').value;
  const timeVal = document.getElementById('addAbExpTime').value.trim() || '12:00';
  const mainCat = document.getElementById('addAbExpMainCat').value;
  const subCat = document.getElementById('addAbExpSubCat').value;
  const titleVal = document.getElementById('addAbExpTitle').value.trim();
  const payVal = document.getElementById('addAbExpPay').value;
  const amtVal = parseFloat(document.getElementById('addAbExpAmt').value) || 0;

  if (!dateVal) { alert('날짜를 입력해주세요.'); return; }
  if (amtVal <= 0) { alert('금액을 입력해주세요.'); return; }

  let dayData = {};
  try {
    dayData = JSON.parse(localStorage.getItem('mingle_day_' + dateVal) || '{}');
  } catch(e) {}
  if (!Array.isArray(dayData.expenses)) dayData.expenses = [];

  const fullCategory = `${mainCat}/${subCat}`;

  dayData.expenses.push({
    id: Date.now(),
    date: dateVal,
    time: timeVal,
    mainCat: mainCat,
    category: fullCategory,
    subCategory: subCat,
    title: titleVal || subCat,
    memo: titleVal || subCat,
    payMethod: payVal,
    payment: payVal,
    amount: amtVal
  });

  if (typeof saveDayDataLocal === 'function') saveDayDataLocal(dateVal, dayData);
  if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(dateVal, dayData);

  document.getElementById('modalAbExpenseAdd')?.remove();
  if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
}

// ✏️ [가계부 서랍] 지출 수정 모달 (대분류-소분류 동적 연동)
function openEditAccountBookExpenseModal(dateStr, idx) {
  let dayData = {};
  try {
    dayData = JSON.parse(localStorage.getItem('mingle_day_' + dateStr) || '{}');
  } catch(e) {}
  const list = Array.isArray(dayData.expenses) ? dayData.expenses : [];
  const item = list[idx];
  if (!item) return;

  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : (window.DEFAULT_EXPENSE_CATS || {});
  const mainCats = Object.keys(cats);
  const payMethods = typeof getStoredPayMethods === 'function' ? getStoredPayMethods() : ['현금', '카드', '계좌이체', '간편결제'];

  const rawCat = item.category || item.subCategory || '';
  let curMain = item.mainCat || '';
  let curSub = '';

  if (rawCat.includes('/')) {
    const parts = rawCat.split('/');
    if (!curMain) curMain = parts[0].trim();
    curSub = parts[1].trim();
  } else {
    curSub = rawCat;
    if (!curMain) {
      curMain = mainCats.find(k => (cats[k] || []).includes(curSub)) || mainCats[0] || '식비';
    }
  }
  if (!curMain) curMain = mainCats[0] || '식비';

  const subOptions = cats[curMain] || [curSub || '기타'];

  let modalEl = document.getElementById('modalAbExpenseEdit');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'modalAbExpenseEdit';
    document.body.appendChild(modalEl);
  }

  modalEl.className = 'fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4';
  modalEl.innerHTML = `
    <div class="bg-white rounded-2xl p-5 max-w-xs w-full space-y-3.5 shadow-xl border border-stone-200">
      <div class="flex items-center justify-between border-b border-stone-100 pb-2">
        <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <span>✏️</span> 지출 내역 수정
        </h3>
        <button type="button" onclick="document.getElementById('modalAbExpenseEdit').remove()" class="text-stone-400 hover:text-stone-600 font-bold text-base">&times;</button>
      </div>

      <div class="space-y-2.5 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">날짜</label>
            <input type="date" id="editAbExpDate" value="${item.date || dateStr}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs">
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">시간</label>
            <input type="text" id="editAbExpTime" value="${item.time || ''}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono text-xs">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">대분류</label>
            <select id="editAbExpMainCat" onchange="onAbEditMainCatChange()" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs font-medium">
              ${mainCats.map(m => `<option value="${m}" ${m === curMain ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">소분류</label>
            <select id="editAbExpSubCat" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs font-medium">
              ${subOptions.map(s => `<option value="${s}" ${s === curSub ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="text-[10px] text-stone-500 font-medium block mb-1">지출 내용</label>
          <input type="text" id="editAbExpTitle" value="${item.title || item.memo || ''}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">결제수단</label>
            <select id="editAbExpPay" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 bg-white text-xs">
            ${payMethods.map(function(m) { return '<option value="' + m + '" ' + (m === (item.payMethod ? item.payMethod : item.payment) ? 'selected' : '') + '>' + m + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] text-stone-500 font-medium block mb-1">금액 (원)</label>
            <input type="number" id="editAbExpAmt" value="${item.amount || 0}" class="w-full border border-stone-200 rounded-lg px-2 py-1 text-stone-800 font-mono font-bold text-xs">
          </div>
        </div>
      </div>

      <div class="flex gap-2 pt-1.5">
        <button type="button" onclick="document.getElementById('modalAbExpenseEdit').remove()" class="flex-1 py-1.5 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium text-xs">취소</button>
        <button type="button" onclick="saveEditedAccountBookExpense('${dateStr}', ${idx})" class="flex-1 py-1.5 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-bold text-xs shadow-sm">수정 완료</button>
      </div>
    </div>
  `;

  const timeInp = document.getElementById('editAbExpTime');
  if (timeInp) timeInp.onfocus = function() { this.value = ''; };
}

// 🔄 가계부 수정 모달 대분류 변경 시 소분류 셀렉트 갱신
function onAbEditMainCatChange() {
  const mainVal = document.getElementById('editAbExpMainCat').value;
  const subSelect = document.getElementById('editAbExpSubCat');
  const cats = typeof getStoredCategories === 'function' ? getStoredCategories() : (window.DEFAULT_EXPENSE_CATS || {});
  const subs = cats[mainVal] || ['기타'];
  subSelect.innerHTML = subs.map(s => `<option value="${s}">${s}</option>`).join('');
}

// 💾 [가계부 서랍] 지출 수정 저장 (대분류/소분류 통합 저장)
function saveEditedAccountBookExpense(oldDate, idx) {
  let oldDayData = {};
  try {
    oldDayData = JSON.parse(localStorage.getItem('mingle_day_' + oldDate) || '{}');
  } catch(e) {}
  if (!Array.isArray(oldDayData.expenses) || !oldDayData.expenses[idx]) return;

  const newDate = document.getElementById('editAbExpDate').value;
  const newTime = document.getElementById('editAbExpTime').value.trim();
  const mainCat = document.getElementById('editAbExpMainCat').value;
  const subCat = document.getElementById('editAbExpSubCat').value;
  const newTitle = document.getElementById('editAbExpTitle').value.trim();
  const newPay = document.getElementById('editAbExpPay').value;
  const newAmt = parseFloat(document.getElementById('editAbExpAmt').value) || 0;

  const fullCategory = `${mainCat}/${subCat}`;

  if (newDate === oldDate) {
    oldDayData.expenses[idx].time = newTime;
    oldDayData.expenses[idx].mainCat = mainCat;
    oldDayData.expenses[idx].category = fullCategory;
    oldDayData.expenses[idx].subCategory = subCat;
    oldDayData.expenses[idx].title = newTitle;
    oldDayData.expenses[idx].memo = newTitle;
    oldDayData.expenses[idx].payMethod = newPay;
    oldDayData.expenses[idx].payment = newPay;
    oldDayData.expenses[idx].amount = newAmt;

    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(oldDate, oldDayData);
    if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(oldDate, oldDayData);
  } else {
    const movedItem = oldDayData.expenses.splice(idx, 1)[0];
    movedItem.date = newDate;
    movedItem.time = newTime;
    movedItem.mainCat = mainCat;
    movedItem.category = fullCategory;
    movedItem.subCategory = subCat;
    movedItem.title = newTitle;
    movedItem.memo = newTitle;
    movedItem.payMethod = newPay;
    movedItem.payment = newPay;
    movedItem.amount = newAmt;

    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(oldDate, oldDayData);
    if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(oldDate, oldDayData);

    let newDayData = {};
    try {
      newDayData = JSON.parse(localStorage.getItem('mingle_day_' + newDate) || '{}');
    } catch(e) {}
    if (!Array.isArray(newDayData.expenses)) newDayData.expenses = [];
    newDayData.expenses.push(movedItem);

    if (typeof saveDayDataLocal === 'function') saveDayDataLocal(newDate, newDayData);
    if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(newDate, newDayData);
    window.abSelectedDate = newDate;
  }

  document.getElementById('modalAbExpenseEdit')?.remove();
  if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
}

// 🗑️ [가계부 서랍] 지출 단건 삭제
function deleteAccountBookExpenseEntry(dateStr, idx) {
  if (!confirm('이 지출 내역을 삭제할까요?')) return;
  let dayData = {};
  try {
    dayData = JSON.parse(localStorage.getItem('mingle_day_' + dateStr) || '{}');
  } catch(e) {}
  if (!Array.isArray(dayData.expenses)) return;

  dayData.expenses.splice(idx, 1);
  if (typeof saveDayDataLocal === 'function') saveDayDataLocal(dateStr, dayData);
  if (typeof syncDayDataToFirebase === 'function') syncDayDataToFirebase(dateStr, dayData);

  if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
}

// 2. 월간 예산 렌더링
function renderAccountBookBudget() {
  const y = window.abCurrentYear;
  const m = window.abCurrentMonth;
  const monthData = getMonthExpensesData(y, m);

  const budgetTotal = parseInt(localStorage.getItem('mingle_monthly_budget_target') || '1000000', 10);
  const totalAmtEl = document.getElementById('abTotalBudgetAmount');
  const remainEl = document.getElementById('abRemainingBudgetLabel');
  const barEl = document.getElementById('abBudgetProgressBar');

  if (totalAmtEl) totalAmtEl.innerText = `${budgetTotal.toLocaleString()}원`;
  const remain = budgetTotal - monthData.monthTotal;
  if (remainEl) {
    if (remain >= 0) {
      remainEl.className = 'text-xs font-semibold text-emerald-700';
      remainEl.innerText = `잔여: ${remain.toLocaleString()}원`;
    } else {
      remainEl.className = 'text-xs font-semibold text-rose-600';
      remainEl.innerText = `초과: ${Math.abs(remain).toLocaleString()}원!`;
    }
  }

  if (barEl) {
    const pct = Math.min(100, Math.round((monthData.monthTotal / budgetTotal) * 100));
    barEl.style.width = `${pct}%`;
    barEl.className = pct > 90 ? 'bg-rose-500 h-2 rounded-full transition-all duration-300' : 'bg-amber-500 h-2 rounded-full transition-all duration-300';
  }

  // 카테고리별 분배 목록
  const catListEl = document.getElementById('abCategoryBudgetList');
  if (!catListEl) return;
  catListEl.innerHTML = '';

  const cats = Object.keys(monthData.catTotals);
  if (cats.length === 0) {
    catListEl.innerHTML = '<p class="text-[11px] text-stone-300 italic text-center py-2">이번 달 지출 내역이 없습니다.</p>';
  } else {
    cats.forEach(cat => {
      const amt = monthData.catTotals[cat];
      const pct = monthData.monthTotal > 0 ? Math.round((amt / monthData.monthTotal) * 100) : 0;
      const row = document.createElement('div');
      row.className = 'bg-stone-50 border border-stone-200/60 p-2 rounded-xl space-y-1';
      row.innerHTML = `
        <div class="flex justify-between items-center text-xs">
          <span class="font-medium text-stone-700">${cat}</span>
          <span class="font-mono font-bold text-stone-800">${amt.toLocaleString()}원 (${pct}%)</span>
        </div>
        <div class="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
          <div class="bg-amber-500 h-1.5 rounded-full" style="width: ${pct}%"></div>
        </div>
      `;
      catListEl.appendChild(row);
    });
  }
}

function openSetTotalBudgetModal() {
  const current = localStorage.getItem('mingle_monthly_budget_target') || '1000000';
  const val = prompt('이번 달 총 목표 예산 금액을 입력하세요 (숫자만):', current);
  if (val !== null) {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num) && num >= 0) {
      localStorage.setItem('mingle_monthly_budget_target', num);
      renderAccountBookBudget();
      if (typeof db !== 'undefined' && db) {
        db.collection('account_book_settings').doc('master').set({
          monthlyBudgetTarget: num
        }, { merge: true }).catch(console.error);
      }
    }
  }
}

// 3. 고정지출 렌더링 & 모달 제어
function getStoredFixedExpenses() {
  try {
    return JSON.parse(localStorage.getItem('mingle_fixed_expenses') || '[]');
  } catch(e) {
    return [];
  }
}

function saveStoredFixedExpenses(list) {
  localStorage.setItem('mingle_fixed_expenses', JSON.stringify(list));
  renderAccountBookFixed();
  checkFixedExpenseAlerts();
  if (typeof db !== 'undefined' && db) {
    db.collection('account_book_settings').doc('master').set({
      fixedExpenses: list
    }, { merge: true }).catch(console.error);
  }
}

// ☁️ 가계부 설정 실시간 양방향 동기화 구독기
let unsubscribeAccountSettings = null;
function subscribeAccountBookSettings() {
  if (typeof renderAccountBookFixed === 'function') renderAccountBookFixed();
  if (typeof renderAccountBookBudget === 'function') renderAccountBookBudget();

  if (!db) return;
  if (unsubscribeAccountSettings) unsubscribeAccountSettings();
  unsubscribeAccountSettings = db.collection('account_book_settings').doc('master')
    .onSnapshot(doc => {
      if (doc.exists) {
        const d = doc.data() || {};
        if (Array.isArray(d.fixedExpenses)) {
          localStorage.setItem('mingle_fixed_expenses', JSON.stringify(d.fixedExpenses));
          if (typeof renderAccountBookFixed === 'function') renderAccountBookFixed();
          if (typeof checkFixedExpenseAlerts === 'function') checkFixedExpenseAlerts();
        }
        if (d.monthlyBudgetTarget !== undefined) {
          localStorage.setItem('mingle_monthly_budget_target', d.monthlyBudgetTarget);
          if (typeof renderAccountBookBudget === 'function') renderAccountBookBudget();
        }
        if (Array.isArray(d.payMethods)) {
          localStorage.setItem('mingle_expense_pay_methods', JSON.stringify(d.payMethods));
          if (typeof refreshPayMethodSelects === 'function') refreshPayMethodSelects();
          if (typeof renderPayMethodSettings === 'function') renderPayMethodSettings();
        }
        if (d.subCategories) {
          localStorage.setItem('mingle_expense_sub_categories', JSON.stringify(d.subCategories));
          if (typeof renderCategorySettings === 'function') renderCategorySettings();
        }
        if (Array.isArray(d.mainCatKeys)) {
          localStorage.setItem('mingle_expense_main_cat_keys', JSON.stringify(d.mainCatKeys));
          if (typeof renderAccountBookCategoryList === 'function') renderAccountBookCategoryList();
        }
      }
    }, err => console.error(err));
}

function renderAccountBookFixed() {
  const listEl = document.getElementById('abFixedExpenseList');
  if (!listEl) return;
  const list = getStoredFixedExpenses();
  listEl.innerHTML = '';

  if (list.length === 0) {
    listEl.innerHTML = '<p class="text-[11px] text-stone-300 italic text-center py-4">등록된 고정지출(구독료, 공과금 등)이 없습니다 ✨</p>';
    return;
  }

  list.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between bg-stone-50 border border-stone-200/70 p-2.5 rounded-xl';
    row.innerHTML = `
      <div>
        <div class="flex items-center gap-1.5">
          <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">매월 ${item.day === 'last' ? '말일' : item.day + '일'}</span>
          <span class="font-bold text-stone-800 text-xs">${item.title}</span>
        </div>
        ${item.memo ? `<p class="text-[10px] text-stone-400 mt-0.5">${item.memo}</p>` : ''}
      </div>
      <div class="flex items-center gap-2">
        <span class="font-mono font-bold text-stone-900 text-xs">${Number(item.amount).toLocaleString()}원</span>
        <button onclick="deleteFixedExpenseItem(${idx})" class="text-stone-300 hover:text-red-500 font-bold text-sm px-1">×</button>
      </div>
    `;
    listEl.appendChild(row);
  });
}

function openAddFixedExpenseModal() {
  const sel = document.getElementById('fixedExpenseDaySelect');
  if (sel && sel.options.length === 0) {
    sel.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${i}일`;
      sel.appendChild(opt);
    }
    const lastOpt = document.createElement('option');
    lastOpt.value = 'last';
    lastOpt.textContent = '말일 (월말 자동)';
    sel.appendChild(lastOpt);
  }
  document.getElementById('modalAddFixedExpense')?.classList.remove('hidden');
}

function closeAddFixedExpenseModal() {
  document.getElementById('modalAddFixedExpense')?.classList.add('hidden');
}

function saveFixedExpenseItem() {
  const title = document.getElementById('fixedExpenseTitleInput')?.value.trim();
  const day = document.getElementById('fixedExpenseDaySelect')?.value;
  const amount = parseInt(document.getElementById('fixedExpenseAmountInput')?.value, 10);
  const memo = document.getElementById('fixedExpenseMemoInput')?.value.trim();

  if (!title) {
    alert('항목 이름을 입력해 주세요!');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('금액을 올바르게 입력해 주세요!');
    return;
  }

  const list = getStoredFixedExpenses();
  list.push({ title, day, amount, memo });
  saveStoredFixedExpenses(list);

  document.getElementById('fixedExpenseTitleInput').value = '';
  document.getElementById('fixedExpenseAmountInput').value = '';
  document.getElementById('fixedExpenseMemoInput').value = '';
  closeAddFixedExpenseModal();
}

function deleteFixedExpenseItem(idx) {
  if (confirm('이 고정지출 항목을 삭제할까요?')) {
    const list = getStoredFixedExpenses();
    list.splice(idx, 1);
    saveStoredFixedExpenses(list);
  }
}

// 4. 카테고리 & 결제수단 설정 모달 제어
function openExpenseCategorySettingModal() {
  const modal = document.getElementById('modalExpenseCategorySetting');
  if (!modal) return;
  modal.classList.remove('hidden');

  renderSettingPayMethods();
  renderSettingMainCatSelect();
  renderSettingSubCats();
}

function closeExpenseCategorySettingModal() {
  document.getElementById('modalExpenseCategorySetting')?.classList.add('hidden');
}

// ✏️ 단정한 회색 미니 연필 아이콘 SVG
const MINGLE_EDIT_ICON = `<svg class="w-3 h-3 text-stone-400 hover:text-stone-700 transition inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>`;

function renderSettingPayMethods() {
  const container = document.getElementById('settingPayMethodTagList');
  if (!container) return;
  const list = getStoredPayMethods();
  container.innerHTML = '';
  list.forEach((m, idx) => {
    const tag = document.createElement('span');
    tag.className = 'inline-flex items-center gap-1.5 bg-white border border-stone-200 px-2 py-1 rounded-lg text-xs font-medium text-stone-700 shadow-2xs';
    tag.innerHTML = `<span>${m}</span>
      <button type="button" onclick="editPayMethod(${idx})" class="p-0.5 hover:bg-stone-100 rounded inline-flex items-center" title="수정">${MINGLE_EDIT_ICON}</button>
      <button type="button" onclick="deletePayMethod(${idx})" class="text-stone-300 hover:text-rose-500 font-bold ml-0.5 text-xs" title="삭제">&times;</button>`;
    container.appendChild(tag);
  });
}

function editPayMethod(idx) {
  const list = getStoredPayMethods();
  if (idx < 0 || idx >= list.length) return;
  const oldName = list[idx];
  const newName = prompt('결제수단 이름을 수정해주세요:', oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;

  list[idx] = newName.trim();
  saveStoredPayMethods(list);
  renderSettingPayMethods();
}


function addNewPayMethod() {
  const input = document.getElementById('settingNewPayMethodInput');
  const val = input?.value.trim();
  if (!val) return;
  const list = getStoredPayMethods();
  if (!list.includes(val)) {
    list.push(val);
    saveStoredPayMethods(list);
  }
  input.value = '';
  renderSettingPayMethods();
}

function deletePayMethod(idx) {
  const list = getStoredPayMethods();
  list.splice(idx, 1);
  saveStoredPayMethods(list);
  renderSettingPayMethods();
}

function renderSettingMainCatSelect() {
  const sel = document.getElementById('settingMainCatSelect');
  if (!sel) return;
  const cats = getStoredCategories();
  sel.innerHTML = '';
  Object.keys(cats).forEach(main => {
    const opt = document.createElement('option');
    opt.value = main;
    opt.textContent = main;
    sel.appendChild(opt);
  });
}

function renderSettingSubCats() {
  const sel = document.getElementById('settingMainCatSelect');
  const container = document.getElementById('settingSubCatTagList');
  if (!sel || !container) return;
  const cats = getStoredCategories();
  const subList = cats[sel.value] || [];

  container.innerHTML = '';
  subList.forEach((sub, idx) => {
    const tag = document.createElement('span');
    tag.className = 'inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/60 px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs';
    tag.innerHTML = `<span>${sub}</span>
      <button type="button" onclick="editSettingSubCat('${sel.value}', ${idx})" class="p-0.5 hover:bg-amber-100/60 rounded inline-flex items-center" title="수정">${MINGLE_EDIT_ICON}</button>
      <button type="button" onclick="deleteSubCat('${sel.value}', ${idx})" class="text-amber-400 hover:text-rose-500 font-bold ml-0.5 text-xs" title="삭제">&times;</button>`;
    container.appendChild(tag);
  });
}

function editSettingSubCat(mainKey, idx) {
  let cats = getStoredCategories();
  let list = cats[mainKey] || [];
  if (idx < 0 || idx >= list.length) return;
  const oldName = list[idx];
  const newName = prompt('카테고리 이름을 수정해주세요:', oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;

  list[idx] = newName.trim();
  cats[mainKey] = list;
  saveStoredCategories(cats);
  renderSettingSubCats();
  if (typeof onExpenseMainCatChange === 'function') onExpenseMainCatChange();
}

function addNewSubCategory() {
  const sel = document.getElementById('settingMainCatSelect');
  const input = document.getElementById('settingNewSubCatInput');
  const main = sel?.value;
  const sub = input?.value.trim();
  if (!main || !sub) return;

  const cats = getStoredCategories();
  if (!cats[main]) cats[main] = [];
  if (!cats[main].includes(sub)) {
    cats[main].push(sub);
    saveStoredCategories(cats);
  }
  input.value = '';
  renderSettingSubCats();
}

function deleteSubCat(main, idx) {
  const cats = getStoredCategories();
  if (cats[main]) {
    cats[main].splice(idx, 1);
    saveStoredCategories(cats);
    renderSettingSubCats();
  }
}

// 5. 오늘 날짜 고정지출 알림 체크 (메인 상단 연동)
function checkFixedExpenseAlerts() {
  // 오늘 날짜 기준 출금일 계산
  const today = new Date();
  const dayNum = today.getDate();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const list = getStoredFixedExpenses();
  const todayDueList = list.filter(item => {
    if (item.day === 'last' && dayNum === lastDayOfMonth) return true;
    return parseInt(item.day, 10) === dayNum;
  });

  const banner = document.getElementById('todayFixedExpenseAlertBanner');
  if (!banner) return;

  if (todayDueList.length > 0) {
    const totalDue = todayDueList.reduce((acc, cur) => acc + Number(cur.amount), 0);
    const names = todayDueList.map(i => `${i.title}(${Number(i.amount).toLocaleString()}원)`).join(', ');
    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="bg-rose-50 border border-rose-200 text-rose-800 px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-xs shadow-xs">
        <div class="flex items-center gap-2">
          <span class="text-base">🔔</span>
          <div>
            <span class="font-bold">오늘 고정지출 출금일!</span>
            <span class="text-[11px] text-rose-600 block sm:inline sm:ml-1">${names} (총 ${totalDue.toLocaleString()}원)</span>
          </div>
        </div>
        <span class="text-[10px] font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full shrink-0">잔고 확인</span>
      </div>
    `;
  } else {
    banner.classList.add('hidden');
  }
}

// 서랍 열릴 때 가계부 자동 초기화 훅
document.addEventListener('DOMContentLoaded', () => {
  refreshPayMethodSelects();
  checkFixedExpenseAlerts();
});

// 🔄 서랍 상세 모듈(가계부 등) 새로고침 복원
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    try {
      const activeTab = localStorage.getItem('mingle_active_tab') || 'today';
      const drawerSub = sessionStorage.getItem('mingle_drawer_subtab');
      if (activeTab === 'drawer' && drawerSub === 'budget') {
        const hub = document.getElementById('drawerHubGrid');
        const bMod = document.getElementById('drawerBudgetModule');
        if (hub && bMod) {
          hub.classList.add('hidden');
          bMod.classList.remove('hidden');
          bMod.style.display = 'block';
          if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
          if (typeof renderTodayExpenses === 'function') renderTodayExpenses();
        }
      }
    } catch(e) {}
  }, 150);
});

// 가계부 모듈 열 때 서브탭 기억
const origOpenDrawerBudget = typeof openDrawerBudget === 'function' ? openDrawerBudget : null;
if (origOpenDrawerBudget) {
  openDrawerBudget = function() {
    try { sessionStorage.setItem('mingle_drawer_subtab', 'budget'); } catch(e) {}
    origOpenDrawerBudget();
  };
}

// ==========================================
// 💊 영양제 루틴 관리 로직
// ==========================================

// 1. 등록된 영양제 기본 목록 가져오기 / 저장하기
function getMasterSupplements() {
  const data = localStorage.getItem('mingle_master_supplements');
  return data ? JSON.parse(data) : { 1: [], 2: [], 3: [] }; // 1: 아침, 2: 점심, 3: 저녁
}

function saveMasterSupplements(supps) {
  localStorage.setItem('mingle_master_supplements', JSON.stringify(supps));
  renderDailySupplements(); // 식단 카드 안의 체크박스 갱신
}

// 2. 모달 열기 / 닫기
function openSupplementsModal() {
  renderMasterSupplementsList();
  const modal = document.getElementById('supplementsModal');
  if (modal) modal.classList.remove('hidden');
}

function closeSupplementsModal() {
  const modal = document.getElementById('supplementsModal');
  if (modal) modal.classList.add('hidden');
}

// 3. 모달 안에서 영양제 추가하기
function addMasterSupplement() {
  const mealTime = document.getElementById('newSuppMealTime').value;
  const input = document.getElementById('newSuppName');
  const name = input.value.trim();

  if (!name) return;

  const supps = getMasterSupplements();
  if (!supps[mealTime]) supps[mealTime] = [];
  
  supps[mealTime].push(name);
  saveMasterSupplements(supps);

  input.value = '';
  renderMasterSupplementsList();
}

// 4. 모달 안에서 영양제 삭제하기
function removeMasterSupplement(mealTime, index) {
  const supps = getMasterSupplements();
  if (supps[mealTime]) {
    supps[mealTime].splice(index, 1);
    saveMasterSupplements(supps);
    renderMasterSupplementsList();
  }
}

// 5. 모달 안의 목록 렌더링
function renderMasterSupplementsList() {
  const container = document.getElementById('masterSupplementsList');
  if (!container) return;

  const supps = getMasterSupplements();
  const mealTitles = { 1: '☀️ 아침', 2: '🍚 점심', 3: '🍲 저녁' };

  let html = '';
  [1, 2, 3].forEach(id => {
    const list = supps[id] || [];
    html += `
      <div class="bg-stone-50 p-2 rounded-xl border border-stone-200/60">
        <div class="font-bold text-stone-600 mb-1.5 flex items-center justify-between text-[11px]">
          <span>${mealTitles[id]}</span>
          <span class="text-stone-400 font-normal">${list.length}개</span>
        </div>
        ${list.length === 0 ? '<p class="text-[11px] text-stone-300 py-0.5">등록된 영양제가 없어요</p>' : ''}
        <div class="flex flex-wrap gap-1">
          ${list.map((name, idx) => `
            <span class="inline-flex items-center gap-1 bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[11px] text-stone-700">
              ${name}
              <button type="button" onclick="removeMasterSupplement('${id}',${idx})" class="text-stone-300 hover:text-rose-500 font-bold ml-0.5">×</button>
            </span>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 6. 식단 카드 안(`supplementsList_1, 2, 3`)에 체크박스 그려주기
function renderDailySupplements() {
  const supps = getMasterSupplements();

  [1, 2, 3].forEach(id => {
    const container = document.getElementById(`supplementsList_${id}`);
    if (!container) return;

    const list = supps[id] || [];
    if (list.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="flex flex-wrap items-center gap-2 pt-0.5">
        <span class="text-[10px] text-stone-400 font-medium">💊 복용:</span>
        ${list.map((name, idx) => `
          <label class="flex items-center gap-1 text-[11px] text-stone-600 cursor-pointer">
            <input type="checkbox" id="suppChk_${id}_${idx}" onchange="saveDayData()" class="rounded border-stone-300 text-stone-700 focus:ring-0">
            <span>${name}</span>
          </label>
        `).join('')}
      </div>
    `;
  });
}

// ⚖️ 체중 자동 포맷터 (예: 525 입력 시 52.5로 자동 변환)
function formatWeightInput(input) {
  let val = input.value.replace(/[^0-9.]/g, ''); // 숫자와 점만 남김
  
  // 점이 없고 숫자만 3자리 이상 연속으로 입력되었을 때 (예: 525 -> 52.5)
  if (!val.includes('.') && val.length >= 3) {
    val = (parseFloat(val) / 10).toFixed(1);
    input.value = val;
  }
}

// ==========================================
// 📝 메모장 서랍 (리치 에디터, 폴더 관리 & 파이어베이스)
// ==========================================

let currentNoteFolderFilter = '전체';
let unsubscribeNotes = null;

function subscribeNotesData() {
  renderNoteFolderTabs();
  renderNoteCards();
  if (!db) return;
  if (unsubscribeNotes) unsubscribeNotes();
  unsubscribeNotes = db.collection('drawer_notes').doc('master').onSnapshot(doc => {
    if (doc.exists) {
      localStorage.setItem('mingle_notes_data', JSON.stringify(doc.data()));
      renderNoteFolderTabs();
      renderNoteCards();
      if (!document.getElementById('noteFolderManageModal').classList.contains('hidden')) renderNoteFolderManageList();
    }
  }, err => console.error(err));
}

function getNotesData() {
  const defaultData = { folders: ['미분류', '개발일지', '쇼핑리스트'], notes: [] };
  try {
    const data = JSON.parse(localStorage.getItem('mingle_notes_data'));
    if (data && !data.folders) data.folders = ['미분류'];
    return data || defaultData;
  } catch(e) { return defaultData; }
}

function saveNotesData(data) {
  localStorage.setItem('mingle_notes_data', JSON.stringify(data));
  renderNoteFolderTabs();
  renderNoteCards();
  if (db) db.collection('drawer_notes').doc('master').set(data).catch(console.error);
}

// 📂 폴더 탭 렌더링
function setNoteFolderFilter(folder) {
  currentNoteFolderFilter = folder;
  renderNoteFolderTabs();
  renderNoteCards();
}

function renderNoteFolderTabs() {
  const container = document.getElementById('noteFolderTabs');
  const select = document.getElementById('noteFolderSelect');
  if (!container) return;

  const data = getNotesData();
  const allFolders = ['전체', ...data.folders];

  container.innerHTML = allFolders.map(f => {
    const activeClass = currentNoteFolderFilter === f ? 'bg-stone-800 text-white font-bold shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200/50';
    return `<button onclick="setNoteFolderFilter('${f}')" class="px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap transition-colors ${activeClass}">${f}</button>`;
  }).join('') + `<button onclick="openNoteFolderManager()" class="px-2 py-1.5 rounded-xl text-[11px] whitespace-nowrap bg-white text-stone-500 border border-stone-200 hover:bg-stone-50 font-bold transition-colors">⚙️ 관리</button>`;

  if (select) {
    const curVal = select.value;
    select.innerHTML = data.folders.map(f => `<option value="${f}">${f}</option>`).join('');
    if (curVal && data.folders.includes(curVal)) select.value = curVal;
  }
}

// ⚙️ 폴더 관리 모달 로직
function openNoteFolderManager() {
  document.getElementById('noteFolderManageModal').classList.remove('hidden');
  renderNoteFolderManageList();
}
function closeNoteFolderManager() {
  document.getElementById('noteFolderManageModal').classList.add('hidden');
  document.getElementById('newFolderNameInput').value = '';
}

function renderNoteFolderManageList() {
  const container = document.getElementById('noteFolderManageList');
  const data = getNotesData();
  container.innerHTML = data.folders.map((f, idx) => `
    <div class="flex items-center justify-between p-2 rounded-lg border border-stone-100 bg-stone-50 text-xs">
      <span class="font-bold text-stone-700 flex-1 truncate">${f}</span>
      <div class="flex items-center gap-1 shrink-0">
        <button onclick="moveNoteFolder(${idx}, -1)" class="text-stone-400 hover:text-stone-600 px-1">▲</button>
        <button onclick="moveNoteFolder(${idx}, 1)" class="text-stone-400 hover:text-stone-600 px-1">▼</button>
        <button onclick="editNoteFolder('${f}')" class="text-stone-400 hover:text-amber-600 px-1">✏️</button>
        ${f !== '미분류' ? `<button onclick="deleteNoteFolder('${f}')" class="text-stone-400 hover:text-rose-500 font-bold px-1">✕</button>` : `<span class="w-4"></span>`}
      </div>
    </div>
  `).join('');
}

function createNewFolder() {
  const val = document.getElementById('newFolderNameInput').value.trim();
  if (!val) return;
  const data = getNotesData();
  if (!data.folders.includes(val)) {
    data.folders.push(val);
    saveNotesData(data);
    document.getElementById('newFolderNameInput').value = '';
    renderNoteFolderManageList();
  } else {
    alert('이미 존재하는 폴더명입니다.');
  }
}

function editNoteFolder(oldName) {
  const newName = prompt(`'${oldName}' 폴더의 새 이름을 입력하세요:`, oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;
  
  const data = getNotesData();
  if (data.folders.includes(newName.trim())) return alert('이미 존재하는 폴더명입니다.');
  
  const idx = data.folders.indexOf(oldName);
  if (idx > -1) data.folders[idx] = newName.trim();
  
  data.notes.forEach(n => { if (n.folder === oldName) n.folder = newName.trim(); });
  saveNotesData(data);
  renderNoteFolderManageList();
}

function deleteNoteFolder(folderName) {
  if (folderName === '미분류') return;
  if (!confirm(`'${folderName}' 폴더를 삭제하시겠습니까?\n내부 메모들은 '미분류'로 자동 이동됩니다.`)) return;
  
  const data = getNotesData();
  data.folders = data.folders.filter(f => f !== folderName);
  data.notes.forEach(n => { if (n.folder === folderName) n.folder = '미분류'; });
  
  if (currentNoteFolderFilter === folderName) currentNoteFolderFilter = '전체';
  saveNotesData(data);
  renderNoteFolderManageList();
}

function moveNoteFolder(idx, delta) {
  const data = getNotesData();
  const targetIdx = idx + delta;
  if (targetIdx < 0 || targetIdx >= data.folders.length) return;
  const temp = data.folders[idx];
  data.folders[idx] = data.folders[targetIdx];
  data.folders[targetIdx] = temp;
  saveNotesData(data);
  renderNoteFolderManageList();
}

// ✍️ 에디터 툴바 명령 (볼드, 밑줄, 리스트, 체크박스 등)
function execNoteCommand(command, value = null) {
  document.getElementById('noteContentEditor').focus();
  document.execCommand(command, false, value);
  updateNoteToolbarState();
}

// 🎯 확실하게 보이는 버튼 선택 상태 (노란색으로 강조)
function updateNoteToolbarState() {
  const isBold = document.queryCommandState('bold');
  const isUnderline = document.queryCommandState('underline');
  const isStrike = document.queryCommandState('strikeThrough');

  const btnBold = document.getElementById('btnNoteBold');
  const btnUnderline = document.getElementById('btnNoteUnderline');
  const btnStrike = document.getElementById('btnNoteStrike');

  if (btnBold) btnBold.className = `p-1.5 rounded transition font-serif ${isBold ? 'bg-amber-200 text-amber-900 shadow-inner' : 'text-stone-600 hover:bg-stone-200'}`;
  if (btnUnderline) btnUnderline.className = `p-1.5 rounded transition font-serif ${isUnderline ? 'bg-amber-200 text-amber-900 shadow-inner' : 'text-stone-600 hover:bg-stone-200'}`;
  if (btnStrike) btnStrike.className = `p-1.5 rounded transition font-serif ${isStrike ? 'bg-amber-200 text-amber-900 shadow-inner' : 'text-stone-600 hover:bg-stone-200'}`;
}

// 🎨 형광펜 다중 컬러 순환 & 해제 로직 (모바일 호환성 강력 대응)
const highlightColors = ['#FEF08A', '#bbf7d0', '#fbcfe8', 'clear']; // 노랑, 초록, 핑크, 해제(clear)
let currentHighlightIdx = 0;

function cycleNoteHighlight() {
  document.getElementById('noteContentEditor').focus();
  const color = highlightColors[currentHighlightIdx];
  const indicator = document.getElementById('noteHighlightIndicator');
  
  if (color === 'clear') {
    // 💡 투명(transparent) 대신 흰색(#FFFFFF)으로 덮어서 확실하게 지우기 (모바일 100% 호환)
    document.execCommand('backColor', false, '#FFFFFF');
    if (indicator) {
      indicator.style.backgroundColor = 'transparent';
      indicator.className = 'w-3 h-3 rounded-full bg-white inline-block border border-stone-300 relative after:content-["/"] after:absolute after:text-[10px] after:text-rose-400 after:-top-0.5 after:left-0.5 font-sans font-bold';
    }
  } else {
    document.execCommand('backColor', false, color);
    if (indicator) {
      indicator.style.backgroundColor = color;
      indicator.className = 'w-3 h-3 rounded-full inline-block border border-stone-300';
    }
  }
  
  currentHighlightIdx = (currentHighlightIdx + 1) % highlightColors.length;
  updateNoteToolbarState();
}

// 🎯 커서 움직임이나 클릭 시 툴바 상태 자동 새로고침
document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('noteContentEditor');
  if (editor) {
    editor.addEventListener('keyup', updateNoteToolbarState);
    editor.addEventListener('mouseup', updateNoteToolbarState);
    editor.addEventListener('click', updateNoteToolbarState);
  }
});

function insertNoteBullet() {
  document.getElementById('noteContentEditor').focus();
  document.execCommand('insertText', false, '• ');
}

function insertNoteCheckbox() {
  document.getElementById('noteContentEditor').focus();
  document.execCommand('insertHTML', false, `<input type="checkbox" class="mx-1 rounded text-amber-500 border-stone-300 focus:ring-0 cursor-pointer inline-block align-middle"> &nbsp;`);
}

function insertNoteQuickData(type) {
  const now = new Date();
  document.getElementById('noteContentEditor').focus();
  let text = type === 'date' ? `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ` 
                             : `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} `;
  document.execCommand('insertText', false, text);
}

// 📝 메모 저장 및 관리 로직
function openNoteEditorModal(id = null) {
  const modal = document.getElementById('noteEditorModal');
  const titleInp = document.getElementById('noteTitleInput');
  const folderSel = document.getElementById('noteFolderSelect');
  const editor = document.getElementById('noteContentEditor');
  const idInp = document.getElementById('editingNoteId');
  const modLabel = document.getElementById('noteLastModifiedLabel');
  const delBtn = document.getElementById('noteDeleteBtn');

  if (id) {
    const data = getNotesData();
    const note = data.notes.find(n => n.id === id);
    if (note) {
      idInp.value = id;
      titleInp.value = note.title;
      folderSel.value = note.folder || '미분류';
      editor.innerHTML = note.content;
      modLabel.innerText = note.updatedAt;
      delBtn.classList.remove('hidden');
    }
  } else {
    idInp.value = '';
    titleInp.value = '';
    folderSel.value = currentNoteFolderFilter === '전체' ? '미분류' : currentNoteFolderFilter;
    editor.innerHTML = '';
    const now = new Date();
    modLabel.innerText = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    delBtn.classList.add('hidden');
  }
  modal.classList.remove('hidden');
}

function closeNoteEditorModal() { document.getElementById('noteEditorModal').classList.add('hidden'); }

function saveNote() {
  const idInp = document.getElementById('editingNoteId').value;
  const title = document.getElementById('noteTitleInput').value.trim();
  const folder = document.getElementById('noteFolderSelect').value;
  const content = document.getElementById('noteContentEditor').innerHTML;
  
  if (!title && !document.getElementById('noteContentEditor').textContent.trim()) { 
    return alert('메모 내용을 입력해주세요.'); 
  }

  const data = getNotesData();
  const now = new Date();
  const timeStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (idInp) {
    const idx = data.notes.findIndex(n => String(n.id) === String(idInp));
    if (idx > -1) {
      data.notes[idx].title = title || '제목 없음';
      data.notes[idx].folder = folder;
      data.notes[idx].content = content;
      data.notes[idx].updatedAt = timeStr;
    }
  } else {
    data.notes.push({ id: Date.now(), title: title || '제목 없음', folder, content, createdAt: timeStr, updatedAt: timeStr });
  }

  saveNotesData(data);
  closeNoteEditorModal();
}

function deleteCurrentNote() {
  if (!confirm('이 메모를 영구 삭제할까요?')) return;
  const id = document.getElementById('editingNoteId').value;
  const data = getNotesData();
  data.notes = data.notes.filter(n => String(n.id) !== String(id));
  saveNotesData(data);
  closeNoteEditorModal();
}

function renderNoteCards() {
  const container = document.getElementById('noteCardsContainer');
  const searchInp = document.getElementById('noteSearchInput');
  if (!container) return;

  const data = getNotesData();
  let notes = data.notes || [];
  notes.sort((a, b) => b.id - a.id);

  if (currentNoteFolderFilter !== '전체') notes = notes.filter(n => n.folder === currentNoteFolderFilter);
  if (searchInp && searchInp.value.trim()) {
    const q = searchInp.value.trim().toLowerCase();
    notes = notes.filter(n => (n.title && n.title.toLowerCase().includes(q)) || (n.content && n.content.toLowerCase().includes(q)));
  }

  if (notes.length === 0) {
    container.innerHTML = `<div class="col-span-full py-10 text-center text-stone-300 text-xs border border-dashed border-stone-200 rounded-xl">등록된 메모가 없어요 📝</div>`;
    return;
  }

  container.innerHTML = notes.map(n => {
    const tmp = document.createElement('div');
    tmp.innerHTML = n.content;
    const plainText = tmp.textContent || tmp.innerText || '';
    const preview = plainText.length > 40 ? plainText.substring(0, 40) + '...' : plainText;

    return `
      <div onclick="openNoteEditorModal(${n.id})" class="p-3 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col h-32 group">
        <div class="flex items-center justify-between mb-2 gap-2">
          <h4 class="font-bold text-stone-800 text-xs truncate flex-1 group-hover:text-amber-800 transition-colors">${n.title}</h4>
          <span class="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-medium border border-stone-200 shrink-0">${n.folder}</span>
        </div>
        <p class="text-[11px] text-stone-500 flex-1 overflow-hidden leading-relaxed break-all">${preview}</p>
        <div class="text-[9px] text-stone-300 mt-2 pt-2 border-t border-stone-100 shrink-0 font-mono text-right">${n.updatedAt}</div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 💸 가계부 스마트 업그레이드 (타임라인, 동기화, 세부예산, 배너 연동)
// ==========================================

// ---------------------------------------------------
// 1. 오늘 배너에 "고정지출" 알림 추가 덮어쓰기
// ---------------------------------------------------
function updateTodaySpecialBanner() {
  const banner = document.getElementById('todaySpecialEventBanner');
  const textEl = document.getElementById('todaySpecialEventText');
  if (!banner || !textEl) return;

  const events = typeof getCalendarEvents === 'function' ? getCalendarEvents() : [];
  const d = new Date(currentDate);
  const dayOfWeek = d.getDay();
  const dayNum = d.getDate();
  const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const hitEvents = events.filter(e => {
    if (e.skippedDates && e.skippedDates.includes(currentDate)) return false;
    if (e.isRepeat) return e.repeatDays && e.repeatDays.includes(dayOfWeek);
    return currentDate >= e.start && currentDate <= e.end;
  });

  const tickets = (typeof getTicketsLocal === 'function' ? getTicketsLocal() : []).filter(t => t.date === currentDate);
  const anniversaries = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  const parts = currentDate.split('-');
  const m = parseInt(parts[1], 10);
  const dStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
  const mStr = m < 10 ? `0${m}` : `${m}`;

  const hitAnniv = anniversaries.filter(a => {
    if (!a.date) return false;
    const aParts = a.date.replace(/\./g, '-').split('-');
    return parseInt(aParts[aParts.length - 2], 10) === m && parseInt(aParts[aParts.length - 1], 10) === dayNum;
  });

  let holidayName = (typeof KR_HOLIDAYS !== 'undefined') ? (KR_HOLIDAYS[`${mStr}-${dStr}`] || KR_HOLIDAYS[currentDate] || '') : '';
  const completedTickets = JSON.parse(localStorage.getItem('mingle_completed_tickets') || '[]').map(String);
  const fixedExpenses = JSON.parse(localStorage.getItem('mingle_fixed_expenses') || '[]');

  const blocks = [];

  // A. 공휴일 & 기념일
  if (holidayName) blocks.push(`<div class="flex items-center gap-1.5 bg-rose-50/80 border border-rose-200/80 px-2.5 py-1 rounded-xl text-[11px] text-rose-800 font-bold shadow-2xs"><span>🇰🇷</span><span>${holidayName}</span></div>`);
  hitAnniv.forEach(a => {
    const catIcon = a.category === '기념일' ? '💖' : (a.category === '이벤트' ? '🎉' : '🎂');
    blocks.push(`<div class="flex items-center gap-1.5 bg-pink-50/80 border border-pink-200 px-2.5 py-1 rounded-xl text-[11px] text-pink-900 font-bold shadow-2xs"><span>${catIcon}</span><span class="truncate">${a.name}</span></div>`);
  });

  // B. 일반 일정
  hitEvents.forEach(e => {
    const catMeta = (typeof EVENT_CATEGORIES !== 'undefined' ? EVENT_CATEGORIES.find(c => c.key === e.category) : null) || { icon: '🗓️' };
    const timeStr = e.startTime ? ` · ${e.startTime}${e.endTime ? '~' + e.endTime : ''}` : '';
    blocks.push(`<div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-xl text-[11px] text-stone-700 font-bold shadow-2xs"><span>${catMeta.icon}</span><span class="truncate">${e.title}${timeStr}</span></div>`);
  });

  // C. 승차권/예매
  const pureIcons = { bus: '🚌', train: '🚆', flight: '✈️' };
  tickets.forEach(t => {
    const isDone = completedTickets.includes(String(t.id));
    const icon = pureIcons[t.type] || '🎫';
    const cardStyle = isDone ? 'bg-stone-100/80 border-stone-200 text-stone-400 opacity-60' : 'bg-sky-50/70 border-sky-200 text-stone-700';
    blocks.push(`
      <div class="flex items-center justify-between gap-2 border px-2.5 py-1.5 rounded-xl text-[11px] transition-all ${cardStyle}">
        <div class="flex items-center gap-1.5 min-w-0 flex-1"><span class="shrink-0">${icon}</span><span class="font-bold truncate ${isDone ? 'line-through text-stone-400' : ''}">${t.time ? t.time+' ' : ''}${t.depart||''} → ${t.arrive||''}</span></div>
        <button onclick="toggleTicketComplete('${t.id}'); event.stopPropagation();" class="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold ${isDone ? 'bg-stone-200 text-stone-500' : 'bg-sky-500 text-white'}">${isDone ? '완료됨 ↩' : '탑승완료 ✓'}</button>
      </div>
    `);
  });

  // 🔔 D. 고정지출 당일 알림 (신규 추가!)
  fixedExpenses.forEach(f => {
    if ((f.day === 'last' && dayNum === lastDayOfMonth) || parseInt(f.day, 10) === dayNum) {
      blocks.push(`
        <div class="flex items-center justify-between gap-2 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl text-[11px] text-rose-800 transition-all shadow-2xs">
          <div class="flex items-center gap-1.5 min-w-0 flex-1">
            <span class="shrink-0">💸</span>
            <span class="font-bold truncate">고정지출: ${f.title}</span>
          </div>
          <span class="font-mono font-bold shrink-0">${Number(f.amount).toLocaleString()}원</span>
        </div>
      `);
    }
  });

  if (blocks.length === 0) {
    banner.classList.add('hidden');
    return;
  }
  banner.classList.remove('hidden');
  banner.className = 'w-full space-y-1.5 mb-2';
  textEl.className = 'flex flex-col gap-1.5 w-full';
  textEl.innerHTML = blocks.join('');
}


// ---------------------------------------------------
// 2. 월간 타임라인 뷰 & 파이어베이스 전체 동기화 로직
// ---------------------------------------------------
let budgetListYear = new Date().getFullYear();
let budgetListMonth = new Date().getMonth() + 1;

function changeBudgetListMonth(delta) {
  budgetListMonth += delta;
  if (budgetListMonth < 1) { budgetListMonth = 12; budgetListYear--; } 
  else if (budgetListMonth > 12) { budgetListMonth = 1; budgetListYear++; }
  renderBudgetDashboard();
  syncMonthlyExpensesFromFirebase(budgetListYear, budgetListMonth); // ☁️ 이동할 때마다 과거 데이터 싹 긁어오기
}

function syncMonthlyExpensesFromFirebase(year, month) {
  if (!db) return;
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const start = `${prefix}-01`;
  const end = `${prefix}-31`;
  
  db.collection('diary_days')
    .where(firebase.firestore.FieldPath.documentId(), '>=', start)
    .where(firebase.firestore.FieldPath.documentId(), '<=', end)
    .get().then(snapshot => {
      let updated = false;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.expenses && data.expenses.length > 0) {
          const localKey = 'mingle_day_' + doc.id;
          const localData = JSON.parse(localStorage.getItem(localKey) || '{}');
          localData.expenses = data.expenses;
          localStorage.setItem(localKey, JSON.stringify(localData));
          updated = true;
        }
      });
      if (updated) {
        renderBudgetDashboard();
        if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
        if (typeof renderAccountBookBudget === 'function') renderAccountBookBudget();
      }
    }).catch(console.error);
}

// 🗓️ 타임라인으로 전체 목록 렌더링
function renderBudgetDashboard() {
  const container = document.getElementById('budgetList');
  if (!container) return;

  const y = budgetListYear;
  const m = budgetListMonth;
  const prefix = `mingle_day_${y}-${String(m).padStart(2, '0')}`;
  
  let allItems = [];
  let monthTotalSum = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      const dayData = JSON.parse(localStorage.getItem(key) || '{}');
      if (dayData.expenses) {
        dayData.expenses.forEach(e => {
          allItems.push({ ...e, _date: key.replace('mingle_day_', '') });
          monthTotalSum += Number(e.amount) || 0;
        });
      }
    }
  }
  
  // 최신 날짜, 시간 순 정렬
  allItems.sort((a, b) => {
    const dateA = a.date || a._date;
    const dateB = b.date || b._date;
    if (dateB !== dateA) return dateB.localeCompare(dateA);
    return (b.time || '').localeCompare(a.time || '');
  });

  // 네비게이션 헤더 및 총 지출 요약
  let html = `
    <div class="flex items-center justify-between bg-white border border-stone-200 rounded-xl p-2.5 mb-2 shadow-2xs">
      <button onclick="changeBudgetListMonth(-1)" class="p-1 px-3 text-stone-400 hover:text-stone-700 font-bold bg-stone-50 rounded-lg">◀</button>
      <div class="text-center">
        <div class="font-bold text-stone-800 text-sm">${y}년 ${m}월</div>
        <div class="text-[11px] text-rose-600 font-bold font-mono">총 -${monthTotalSum.toLocaleString()}원</div>
      </div>
      <button onclick="changeBudgetListMonth(1)" class="p-1 px-3 text-stone-400 hover:text-stone-700 font-bold bg-stone-50 rounded-lg">▶</button>
    </div>
  `;

  if (allItems.length === 0) {
    html += `<div class="bg-stone-50 rounded-xl p-6 text-center text-stone-400 text-xs border border-stone-200 mt-2"><p>${m}월 지출 내역이 없어요 🌿</p></div>`;
  } else {
    html += `<div class="space-y-2 mt-2">`;
    let lastDate = '';
    allItems.forEach(item => {
      const itemDate = item.date || item._date;
      if (lastDate !== itemDate) {
        const parts = itemDate.split('-');
        html += `<div class="text-[10px] font-bold text-stone-500 mt-4 mb-1 pl-1">${parseInt(parts[1])}월 ${parseInt(parts[2])}일</div>`;
        lastDate = itemDate;
      }
      
      const rawCat = item.category || item.subCategory || '';
      const displaySubCat = rawCat.includes('/') ? rawCat.split('/').pop().trim() : (rawCat || '기타');
      const itemIdx = getExpenseIndexForEdit(itemDate, item.id);

      html += `
        <div onclick="openEditAccountBookExpenseModal('${itemDate}', ${itemIdx})" class="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs cursor-pointer hover:border-amber-300 transition shadow-2xs">
          <div class="min-w-0 pr-2 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-stone-800">${item.memo || item.title || '지출'}</span>
              <span class="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-semibold border border-amber-200/50">${displaySubCat}</span>
              <span class="text-[9px] text-stone-400 border border-stone-200 px-1 rounded">${item.payMethod || item.payment || ''}</span>
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5 font-mono">${item.time || ''}</div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="font-bold font-mono text-rose-700">-${parseFloat(item.amount || 0).toLocaleString()}원</span>
            <button type="button" onclick="event.stopPropagation(); deleteAccountBookExpenseEntry('${itemDate}', ${itemIdx})" class="text-stone-300 hover:text-rose-500 text-sm px-1 font-bold">✕</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
}

function getExpenseIndexForEdit(dateStr, expId) {
  const dayData = JSON.parse(localStorage.getItem('mingle_day_' + dateStr) || '{}');
  if (!dayData.expenses) return -1;
  return dayData.expenses.findIndex(e => String(e.id) === String(expId));
}

// ---------------------------------------------------
// 3. 세부 예산 그룹 관리 (생활비, 가족비 등) 
// ---------------------------------------------------
function getBudgetGroups() {
  const defaultGroups = [
    { id: 'g1', name: '생활비 (식비/생활)', amount: 500000, mainCats: ['식비', '생활비'] },
    { id: 'g2', name: '취미/여가 (쇼핑/문화)', amount: 200000, mainCats: ['쇼핑', '문화/여가'] }
  ];
  return JSON.parse(localStorage.getItem('mingle_budget_groups') || JSON.stringify(defaultGroups));
}

function saveBudgetGroups(groups) {
  localStorage.setItem('mingle_budget_groups', JSON.stringify(groups));
  renderAccountBookBudget();
  if (db) db.collection('account_book_settings').doc('master').set({ budgetGroups: groups }, { merge: true }).catch(console.error);
}

function renderAccountBookBudget() {
  const y = window.abCurrentYear;
  const m = window.abCurrentMonth;
  const monthData = getMonthExpensesData(y, m); // 7.js에 있는 월 총합 데이터 긁어오는 함수

  const budgetTotal = parseInt(localStorage.getItem('mingle_monthly_budget_target') || '1000000', 10);
  const totalAmtEl = document.getElementById('abTotalBudgetAmount');
  const remainEl = document.getElementById('abRemainingBudgetLabel');
  const barEl = document.getElementById('abBudgetProgressBar');

  if (totalAmtEl) totalAmtEl.innerText = `${budgetTotal.toLocaleString()}원`;
  const remain = budgetTotal - monthData.monthTotal;
  
  if (remainEl) {
    if (remain >= 0) {
      remainEl.className = 'text-xs font-semibold text-emerald-700';
      remainEl.innerText = `총 잔여: ${remain.toLocaleString()}원`;
    } else {
      remainEl.className = 'text-xs font-semibold text-rose-600';
      remainEl.innerText = `총 초과: ${Math.abs(remain).toLocaleString()}원!`;
    }
  }

  if (barEl) {
    const pct = Math.min(100, Math.round((monthData.monthTotal / budgetTotal) * 100));
    barEl.style.width = `${pct}%`;
    barEl.className = pct > 90 ? 'bg-rose-500 h-2 rounded-full transition-all duration-300' : 'bg-amber-500 h-2 rounded-full transition-all duration-300';
  }

  // 세부 예산 렌더링
  const catListEl = document.getElementById('abCategoryBudgetList');
  if (!catListEl) return;
  
  const groups = getBudgetGroups();
  let html = `<div class="flex justify-between items-end mb-2"><span class="text-xs font-bold text-stone-600">세부 예산 그룹</span> <button onclick="alert('세부 예산 관리는 곧 HTML 업데이트 시 추가될 예정이에요! 조금만 기다려줘 칭구야!')" class="text-[10px] text-stone-400 border border-stone-200 px-2 py-0.5 rounded-lg hover:bg-stone-50">⚙️ 그룹 관리</button></div>`;

  groups.forEach(g => {
    // 해당 그룹에 속한 대분류들의 지출 합산
    let spent = 0;
    g.mainCats.forEach(cat => {
      spent += (monthData.catTotals[cat] || 0);
    });
    
    const pct = g.amount > 0 ? Math.round((spent / g.amount) * 100) : 0;
    const isOver = spent > g.amount;
    const barColor = isOver ? 'bg-rose-500' : (pct > 80 ? 'bg-orange-400' : 'bg-emerald-400');

    html += `
      <div class="bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl space-y-1.5 mb-2 shadow-2xs">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-stone-700 flex items-center gap-1">🎯 ${g.name} <span class="text-[9px] font-normal text-stone-400">(${g.mainCats.join(', ')})</span></span>
        </div>
        <div class="flex justify-between items-center text-[10px]">
          <span class="text-stone-500">예산: ${g.amount.toLocaleString()}원</span>
          <span class="font-mono font-bold ${isOver ? 'text-rose-600' : 'text-stone-800'}">${spent.toLocaleString()}원 (${pct}%)</span>
        </div>
        <div class="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
          <div class="${barColor} h-1.5 rounded-full transition-all" style="width: ${Math.min(100, pct)}%"></div>
        </div>
      </div>
    `;
  });
  
  catListEl.innerHTML = html;
}

// ---------------------------------------------------
// 4. 서랍 탭 열릴 때 동기화 훅 추가
// ---------------------------------------------------
const originalSetDrawerSubTab = typeof setDrawerSubTab === 'function' ? setDrawerSubTab : function(){};
setDrawerSubTab = function(type) {
  originalSetDrawerSubTab(type);
  if (type === 'budget') {
    // 가계부 열 때 현재 월 최신화
    syncMonthlyExpensesFromFirebase(budgetListYear, budgetListMonth);
  }
};
