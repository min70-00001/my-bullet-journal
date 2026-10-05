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
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};
      const nextVal = !dayData.dynamicRoutineChecks[itemId];
      dayData.dynamicRoutineChecks[itemId] = nextVal;

      if (nextVal && autoTime) {
        autoFillTimetableNow(itemName, autoCat);
      }

      saveDayDataLocal(currentDate, dayData);
      renderDynamicRoutines();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);

      renderRoutineProgressTracker();
      renderCalendar();
    }

    function toggleCatCareTag(tag) {
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.catCareTags) dayData.catCareTags = {};
      dayData.catCareTags[tag] = !dayData.catCareTags[tag];
      saveDayDataLocal(currentDate, dayData);
      renderDynamicRoutines();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
    }

    function completeAllMorningRoutines() {
      const defs = getRoutineDefs();
      const morningActive = defs.morning.filter(i => !i.paused);
      const dayData = getDayDataLocal(currentDate);
      if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};

      morningActive.forEach(i => {
        dayData.dynamicRoutineChecks[i.id] = true;
      });
      autoFillTimetableNow('아침루틴', 'routine');
      saveDayDataLocal(currentDate, dayData);
      renderDynamicRoutines();
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
      renderRoutineProgressTracker();
      renderCalendar();
    }

    function toggleBookClubMode() {
      const isClub = document.getElementById('bookClubToggle')?.checked;
      const defs = getRoutineDefs();
      let clubItem = defs.evening.find(i => i.id === 'club_special');
      if (isClub) {
        if (!clubItem) {
          defs.evening.push({ id: 'club_special', cat: '🧶 마무리', name: '달보드레(독서모임)', autoTime: true, autoCat: 'bookclub', paused: false });
          saveRoutineDefs(defs);
        } else {
          clubItem.paused = false;
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

    // 식단 🍏 애사비 ↔ 상단 드링크 트래커 스마트 자동연동
    function onMealAcvChange() {
      const acv2 = document.getElementById('mealAcv_2')?.checked || false;
      const acv3 = document.getElementById('mealAcv_3')?.checked || false;
      const count = (acv2 ? 1 : 0) + (acv3 ? 1 : 0);

      const dayData = getDayDataLocal(currentDate);
      dayData.acvCount = count;
      saveDayDataLocal(currentDate, dayData);
      renderDrinkTracker(dayData);
      saveDayData();
    }

    function renderDrinkTracker(data) {
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
      acvEl.innerHTML = [1, 2].map(i => `
        <span onclick="toggleDrinkItem('acvCount', ${i})" class="transition-transform hover:scale-125 ${i <= acvCount ? 'opacity-100' : 'opacity-25 grayscale'}">🍏</span>
      `).join('');

      // ☕ 커피 1개
      coffeeEl.innerHTML = `
        <span onclick="toggleDrinkItem('coffeeCount', 1)" class="transition-transform hover:scale-125 ${coffeeCount >= 1 ? 'opacity-100' : 'opacity-25 grayscale'}">☕</span>
      `;
    }

    function toggleDrinkItem(key, idx) {
      const dayData = getDayDataLocal(currentDate);
      let curr = dayData[key] || 0;
      let next = curr === idx ? idx - 1 : idx;
      dayData[key] = next;

      // 상단 사과 직접 탭 시 식단 체크박스 연동
      if (key === 'acvCount') {
        if (document.getElementById('mealAcv_2')) document.getElementById('mealAcv_2').checked = (next >= 1);
        if (document.getElementById('mealAcv_3')) document.getElementById('mealAcv_3').checked = (next >= 2);
      }

      saveDayDataLocal(currentDate, dayData);
      renderDrinkTracker(dayData);
      if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
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
  '레드': '#D32F2F', '빨강': '#D32F2F', '버건디': '#800020', '와인': '#722F37',
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
}

let activeCategory = 'outer';

// OOTD 화면 렌더링 (구버전 단일 문자열/새버전 배열 완벽 호환 방어막)
function renderOotd() {
  try {
    const closet = getClosetData();
    let dayData = {};
    if (typeof getDayDataLocal === 'function' && typeof currentDate !== 'undefined') {
      dayData = getDayDataLocal(currentDate) || {};
    } else if (window.currentDayData) {
      dayData = window.currentDayData;
    }

    const dayOotd = dayData.ootd || {};

    ['outer', 'top', 'bottom', 'shoes', 'bag'].forEach(cat => {
      const container = document.getElementById(`ootdSelected_${cat}`);
      if (!container) return;
      container.innerHTML = '';

      let rawVal = dayOotd[cat] || (dayData.ootdSelected ? dayData.ootdSelected[cat] : null);
      let selectedIds = [];

      // 🛡️ 구버전 문자열 vs 새버전 배열 방어막 처리
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
        const item = (closet[cat] || []).find(c => String(c.id) === String(id));
        if (!item) return;

        const chip = document.createElement('span');
        chip.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100/80 border border-stone-200 text-stone-700 shadow-2xs';
        chip.innerHTML = `
          <span class="w-2 h-2 rounded-full border border-stone-300 shrink-0" style="background-color: ${item.color || '#ddd'}"></span>
          <span>${item.name}</span>
          <button onclick="toggleSelectCloth('${cat}', '${item.id}'); event.stopPropagation();" class="text-stone-400 hover:text-stone-600 text-xs ml-0.5">×</button>
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
  } catch (err) {
    console.warn("OOTD 렌더링 안전 패스:", err);
  }
}

function onOotdColorChange(color) {
  let dayData = typeof getDayDataLocal === 'function' ? getDayDataLocal(currentDate) : (window.currentDayData || {});
  if (!dayData.ootd) dayData.ootd = {};
  dayData.ootd.color = color;
  const badge = document.getElementById('ootdColorBadge');
  if (badge) badge.style.backgroundColor = color;
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

function closeOotdClosetModal() {
  const modal = document.getElementById('ootdClosetModal');
  if (modal) modal.classList.add('hidden');
  renderOotd();
}

// OOTD 옷별 착용 누적 횟수 계산 함수
function getClothWearCount(category, clothId) {
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mingle_day_')) {
        const d = JSON.parse(localStorage.getItem(key) || '{}');
        if (d && d.ootd && Array.isArray(d.ootd[category])) {
          if (d.ootd[category].map(String).includes(String(clothId))) {
            count++;
          }
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
  
  // 날짜 데이터 안전하게 조회
  let dayData = {};
  if (typeof getDayDataLocal === 'function' && typeof currentDate !== 'undefined') {
    dayData = getDayDataLocal(currentDate) || {};
  } else if (window.currentDayData) {
    dayData = window.currentDayData;
  }
  
  const dayOotd = dayData.ootd || {};
  let selectedIds = dayOotd[activeCategory] || [];
  if (!Array.isArray(selectedIds)) selectedIds = selectedIds ? [String(selectedIds)] : [];

  if (list.length === 0) {
    container.innerHTML = '<span class="text-[11px] text-stone-400 p-2">등록된 옷이 없어요. 위에서 추가해 보세요!</span>';
    return;
  }

  // 착용 횟수 미리 계산 후 자주 입은 순(내림차순) 정렬
  list.forEach(item => {
    item._count = getClothWearCount(activeCategory, item.id);
  });
  list.sort((a, b) => b._count - a._count);

  list.forEach(item => {
    const isSelected = selectedIds.map(String).includes(String(item.id));
    const btn = document.createElement('div');
    btn.className = 'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer select-none transition-all ' +
      (isSelected 
        ? 'bg-amber-100 border-amber-300 font-bold text-amber-900 shadow-xs ring-1 ring-amber-400' 
        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50');

    btn.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0 pointer-events-none" style="background-color: ${item.color || '#A8A29E'};"></span>// OOTD 옷별 착용 누적 횟수 계산 함수
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
  
  let dayData = {};
  if (typeof getDayDataLocal === 'function' && typeof currentDate !== 'undefined') {
    dayData = getDayDataLocal(currentDate) || {};
  } else if (window.currentDayData) {
    dayData = window.currentDayData;
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
    btn.className = 'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer select-none transition-all ' +
      (isSelected 
        ? 'bg-amber-100 border-amber-300 font-bold text-amber-900 shadow-xs ring-1 ring-amber-400' 
        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50');

    btn.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0 pointer-events-none" style="background-color: ${item.color || '#A8A29E'};"></span>
      <span class="cloth-title flex-1 pointer-events-none">${item.name}</span>
      <span class="text-[10px] text-stone-400 font-normal shrink-0 pointer-events-none">(${item._count}회)</span>
      <button type="button" onclick="event.stopPropagation(); editClothName('${item.id}', '${item.name}')" title="이름 수정" class="text-stone-300 hover:text-stone-500 p-1 transition-colors flex items-center">
        <svg class="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      </button>
      <button type="button" onclick="event.stopPropagation(); deleteClothFromCloset('${item.id}')" title="삭제" class="text-stone-300 hover:text-red-400 px-1 text-sm font-bold transition-colors">×</button>
    `;

    btn.onclick = () => {
      toggleSelectCloth(activeCategory, item.id);
    };

    container.appendChild(btn);
  });
}

function toggleSelectCloth(category, id) {
  let dayData = null;
  if (typeof getDayDataLocal === 'function' && typeof currentDate !== 'undefined') {
    dayData = getDayDataLocal(currentDate);
  } else if (window.currentDayData) {
    dayData = window.currentDayData;
  }
  if (!dayData) return;

  if (!dayData.ootdSelected) dayData.ootdSelected = {};
  if (!dayData.ootd) dayData.ootd = {};

  if (!dayData.ootdSelected[category] || !Array.isArray(dayData.ootdSelected[category])) {
    dayData.ootdSelected[category] = dayData.ootdSelected[category] ? [String(dayData.ootdSelected[category])] : [];
  }

  const strId = String(id);
  let arr = dayData.ootdSelected[category].map(String);

  if (arr.includes(strId)) {
    arr = arr.filter(x => x !== strId);
  } else {
    arr.push(strId);
    if (category === 'top' || category === 'outer') {
      const closet = getClosetData();
      const cloth = (closet[category] || []).find(c => String(c.id) === strId);
      if (cloth && cloth.color) {
        dayData.ootd.color = cloth.color;
      }
    }
  }

  dayData.ootdSelected[category] = arr;
  dayData.ootd[category] = arr;

  if (typeof saveDayData === 'function') saveDayData();
  renderClosetModalList();
  if (typeof renderOotd === 'function') renderOotd();
  if (typeof renderCalendar === 'function') renderCalendar();
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

    // 데일리 데이터 동기화
    function subscribeDayData(dateStr) {
      if (unsubscribeDay) unsubscribeDay();
      applyDayDataToUI(getDayDataLocal(dateStr));

      if (!db) return;
      unsubscribeDay = db.collection('diary_days').doc(dateStr)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            saveDayDataLocal(dateStr, data);
            applyDayDataToUI(data);
          }
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
        ootdSelected: existing.ootdSelected || {},
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
    if (typeof renderOotd === 'function') renderOotd();

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
      if (eventId) {
        const ev = getCalendarEvents().find(e => e.id === eventId);
        if (ev) {
          document.getElementById('calEventModalTitle').innerHTML = '<span>📌</span> 일정 / 약속 수정';
          document.getElementById('calEventTitle').value = ev.title;
          document.getElementById('calEventStart').value = ev.start;
          document.getElementById('calEventEnd').value = ev.end;
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
      if (!title || !start) return;

      const isRepeat = document.getElementById('calEventRepeatToggle').checked;
      let events = getCalendarEvents();

      if (editingEventId) {
        const idx = events.findIndex(e => e.id === editingEventId);
        if (idx > -1) {
          events[idx].title = title;
          events[idx].start = start;
          events[idx].end = end;
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

      container.innerHTML = filtered.map(e => {
        const catMeta = EVENT_CATEGORIES.find(c => c.key === e.category) || EVENT_CATEGORIES[6];
        const startD = new Date(e.start);
        const diff = Math.ceil((startD - now) / (1000 * 60 * 60 * 24));
        const ddayText = e.isRepeat ? "반복일정" : (diff === 0 ? "D-Day" : diff < 0 ? "진행중" : `D-${diff}`);

        return `
          <div class="p-2 rounded-xl border flex items-center justify-between text-xs bg-stone-50 border-stone-100 text-stone-800">
            <div onclick="openCalendarEventModal(${e.id})" class="min-w-0 pr-2 flex-1 cursor-pointer hover:opacity-80" title="클릭하여 일정 수정">
              <span class="font-bold flex items-center gap-1">
                <span>${catMeta.icon} ${e.title}</span>
                ${EDIT_SVG_ICON}
              </span>
              <span class="text-[10px] text-stone-400 block">${e.isRepeat ? '매주 반복 일정' : `${e.start} ~ ${e.end}`}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${catMeta.bg}">${ddayText}</span>
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
    if (a.isSolar) return a.month === m && a.day === dayNum;
    return false;
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

  // A. 기념일 / 공휴일 (로즈 핑크 톤)
  const annivTexts = [];
  if (holidayName) annivTexts.push(`🇰🇷 ${holidayName}`);
  hitAnniv.forEach(a => annivTexts.push(`🎉 ${a.name}`));
  if (annivTexts.length > 0) {
    blocks.push(`
      <div class="flex items-center gap-1.5 bg-rose-50/80 border border-rose-200/80 px-2.5 py-1 rounded-xl text-[11px] text-rose-800 font-bold shadow-2xs">
        <span>💌</span>
        <span>${annivTexts.join(' · ')}</span>
      </div>
    `);
  }

  // B. 일반 일정 (웜 스톤 톤)
  if (hitEvents.length > 0) {
    const evText = hitEvents.map(e => e.title).join(', ');
    blocks.push(`
      <div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-xl text-[11px] text-stone-700 font-bold shadow-2xs">
        <span>🗓️</span>
        <span class="truncate">${evText}</span>
      </div>
    `);
  }

  // C. 교통/예매 내역 (스카이 블루 톤 & 탑승 완료 토글)
    // 저장된 완료 티켓 ID 목록을 모두 문자열로 정규화
    const completedStrList = completedTickets.map(x => String(x));

    tickets.forEach(t => {
      const isDone = completedStrList.includes(String(t.id));
      const memoText = t.seatMemo && t.seatMemo.trim() ? ` (${t.seatMemo.trim()})` : '';
      const label = `${ticketIconMap[t.type] || '🎫'} ${t.time || ''} ${t.depart || ''}→${t.arrive || ''}${memoText}`;

      const cardStyle = isDone
        ? 'bg-stone-100/80 border-stone-200 text-stone-400 opacity-60'
        : 'bg-sky-50/70 border-sky-200 text-stone-700';

      const textStyle = isDone 
        ? 'style="text-decoration: line-through; color: #a8a29e;"' 
        : 'class="font-medium text-stone-700 truncate"';

      const btnStyle = isDone
        ? 'bg-stone-200 text-stone-500 border border-stone-300'
        : 'bg-sky-500 text-white shadow-xs';

      blocks.push(`
        <div class="flex items-center justify-between gap-2 border px-2.5 py-1.5 rounded-xl text-[11px] transition-all ${cardStyle}">
          <span class="truncate" ${textStyle}>${label}</span>
          <button onclick="toggleTicketComplete('${t.id}'); event.stopPropagation();" class="shrink-0 text-[10px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${btnStyle}">
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
  banner.className = 'w-full space-y-1.5 mb-2'; // 부모 배너 컨테이너 정돈
  textEl.className = 'flex flex-col gap-1.5 w-full';
  textEl.innerHTML = blocks.join('');
}

// 🎫 예매 탑승 완료 토글 도우미 함수 (문자열 타입 완벽 호환)
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
  
  // 배너 다시 그리기
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
  const date = dateInput ? dateInput.value : '';
  
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
}

function deleteAnniversary(id) {
  if (!confirm('이 기념일을 삭제할까요?')) return;
  let items = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  items = items.filter(a => String(a.id) !== String(id));
  localStorage.setItem('mingle_anniversaries', JSON.stringify(items));
  renderAnniversaries();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();
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
      const title = prompt("책 제목을 입력해주세요:");
      if (!title) return;
      const author = prompt("저자 이름:");
      const category = prompt("카테고리 (소설·문학 / 에세이·시 / 인문·철학 / 과학·기술 / 경제·경영 / 자기계발 / 예술·취미):", "소설·문학");
      const startDate = prompt("독서 시작일 (YYYY-MM-DD):", currentDate);
      const endDate = prompt("완독일 (읽는 중이면 엔터):", "");
      const rating = prompt("별점 (예: ⭐⭐⭐⭐⭐):", "⭐⭐⭐⭐⭐");
      const review = prompt("한 줄 서평 또는 인상 깊은 문장:");
      
      const newBook = { title, author, category, startDate, endDate, rating, review, createdAt: Date.now() };
      const books = JSON.parse(localStorage.getItem('mingle_bookshelf') || '[]');
      books.unshift(newBook);
      localStorage.setItem('mingle_bookshelf', JSON.stringify(books));
      renderBookShelf();
      if (db) db.collection('bookshelf').add(newBook).catch(console.error);
    }

    function renderKnittingShowroom() {
      const list = document.getElementById('knittingShowroomList');
      if (!list) return;
      const items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
      if (items.length === 0) {
        list.innerHTML = `<p class="text-xs text-rose-300 py-6 text-center">등록된 뜨개 작품이 없어요 🧶</p>`;
        return;
      }
      list.innerHTML = items.map((item) => `
        <div class="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-stone-800 text-xs">🧶 ${item.title}</span>
            <span class="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">${item.status || '진행중'}</span>
          </div>
          <div class="text-[11px] text-stone-600">실: <b>${item.yarn || '-'}</b> | 바늘: <b>${item.needle || '-'}</b></div>
          <div class="text-[10px] text-stone-400">기간: ${item.startDate || ''} ~ ${item.endDate || '진행중'}</div>
          ${item.memo ? `<p class="text-[11px] text-stone-700 bg-white p-2 rounded-lg border border-rose-50">${item.memo}</p>` : ''}
        </div>
      `).join('');
    }

    function openKnitModal() {
      const title = prompt("작품 이름 (예: 미피 네트백):");
      if (!title) return;
      const yarn = prompt("사용한 실 (예: 오메가 베리, 모헤어):");
      const needle = prompt("사용한 바늘 (예: 모사용 6호):");
      const startDate = prompt("시작일 (YYYY-MM-DD):", currentDate);
      const endDate = prompt("완성일 (진행 중이면 엔터):", "");
      const status = endDate ? "완성(FO) 🥳" : "뜨는 중 ⏳";
      const memo = prompt("도안 링크나 작업 팁 메모:");

      const newKnit = { title, yarn, needle, startDate, endDate, status, memo, createdAt: Date.now() };
      const items = JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
      items.unshift(newKnit);
      localStorage.setItem('mingle_knitting_showroom', JSON.stringify(items));
      renderKnittingShowroom();
      if (db) db.collection('knitting_showroom').add(newKnit).catch(console.error);
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

// 1. 하단 탭 이동 덮어쓰기
function switchTab(tab, subAction) {
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
    else setDrawerSubTab('budget');
  }
}

// 2. 서랍장 내부 서브 탭 전환
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
    if (mod) mod.classList.add('hidden');
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

function getBooksMaster() {
  return JSON.parse(localStorage.getItem('mingle_books_data') || '[]');
}

function saveBooksMaster(data) {
  localStorage.setItem('mingle_books_data', JSON.stringify(data));
  renderBookShelf();
  if (typeof db !== 'undefined' && db) db.collection('drawer_book').doc('master').set({ books: data }).catch(console.error);
}

// 구글 북스 검색
async function searchGoogleBooks() {
  const query = document.getElementById('bookSearchKeyword').value.trim();
  const container = document.getElementById('bookSearchResults');
  if (!query) return;

  container.classList.remove('hidden');
  container.innerHTML = '<div class="p-2 text-center text-stone-400">구글 도서관 뒤지는 중... 🔍</div>';

  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
    const data = await res.json();
    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<div class="p-2 text-center text-stone-400">검색 결과가 없어요 😢</div>';
      return;
    }

    container.innerHTML = data.items.map(item => {
      const info = item.volumeInfo;
      const title = info.title || '제목 없음';
      const author = (info.authors || []).join(', ') || info.publisher || '저자 미상';
      const cover = info.imageLinks ? info.imageLinks.thumbnail.replace('http:', 'https:') : 'https://via.placeholder.com/60x85?text=No+Cover';
      const pageCount = info.pageCount || 0;

      return `
        <div onclick='selectGoogleBook(${JSON.stringify(title)}, ${JSON.stringify(author)}, ${JSON.stringify(cover)}, ${pageCount})' class="p-2 bg-white rounded-lg border border-stone-200 flex items-center gap-2 cursor-pointer hover:bg-emerald-50 transition-colors">
          <img src="${cover}" class="w-8 h-11 object-cover rounded shadow-2xs shrink-0">
          <div class="min-w-0 flex-1">
            <p class="font-bold text-stone-800 truncate">${title}</p>
            <p class="text-[10px] text-stone-500 truncate">${author} · ${pageCount ? pageCount + 'p' : '페이지 미상'}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = '<div class="p-2 text-center text-rose-500">검색 중 오류가 발생했습니다.</div>';
  }
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
  document.getElementById('bookSearchResults').classList.add('hidden');
}

// 모달 열기 (신규 등록)
function openBookModal() {
  document.getElementById('bookEditId').value = '';
  document.getElementById('bookModalTitle').innerHTML = '<span>📚</span> 도서 신규 등록';
  document.getElementById('bookSearchSection').classList.remove('hidden');
  document.getElementById('bookModalDeleteBtn').classList.add('hidden');
  document.getElementById('bookHistorySection').classList.add('hidden');

  document.getElementById('bookInputTitle').value = '';
  document.getElementById('bookInputAuthor').value = '';
  document.getElementById('bookInputTotalPage').value = '';
  document.getElementById('bookCoverUrl').value = '';

  // 기본 표지 박스로 초기화
  const coverImg = document.getElementById('bookPreviewCover');
  const icon = document.getElementById('bookPreviewIcon');
  const text = document.getElementById('bookPreviewText');
  if (coverImg) {
    coverImg.src = '';
    coverImg.classList.add('hidden');
  }
  if (icon) icon.classList.remove('hidden');
  if (text) text.classList.remove('hidden');

  document.getElementById('bookInputStatus').value = 'reading';
  document.getElementById('bookInputStartDate').value = typeof currentDate !== 'undefined' ? currentDate : '';
  document.getElementById('bookInputEndDate').value = '';
  document.getElementById('bookInputReview').value = '';
  document.getElementById('bookInputRating').value = '5';

  document.getElementById('bookDetailModal').classList.remove('hidden');
}

// 모달 열기 (기존 도서 상세/수정)
function openBookEditModal(id) {
  const books = getBooksMaster();
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById('bookEditId').value = book.id;
  document.getElementById('bookModalTitle').innerHTML = '<span>📖</span> 도서 상세 및 수정';
  document.getElementById('bookSearchSection').classList.add('hidden');
  document.getElementById('bookModalDeleteBtn').classList.remove('hidden');

  document.getElementById('bookInputTitle').value = book.title;
  document.getElementById('bookInputAuthor').value = book.author;
  document.getElementById('bookInputTotalPage').value = book.totalPage || '';
  document.getElementById('bookCoverUrl').value = book.cover || '';
  const coverImg = document.getElementById('bookPreviewCover');
  const icon = document.getElementById('bookPreviewIcon');
  const text = document.getElementById('bookPreviewText');
  if (book.cover && !book.cover.includes('placeholder')) {
    coverImg.src = book.cover;
    coverImg.classList.remove('hidden');
    if (icon) icon.classList.add('hidden');
    if (text) text.classList.add('hidden');
  } else {
    coverImg.classList.add('hidden');
    if (icon) icon.classList.remove('hidden');
    if (text) text.classList.remove('hidden');
  }

  document.getElementById('bookInputStatus').value = book.status || 'reading';
  document.getElementById('bookInputStartDate').value = book.startDate || '';
  document.getElementById('bookInputEndDate').value = book.endDate || '';
  document.getElementById('bookInputReview').value = book.review || '';
  document.getElementById('bookInputRating').value = book.rating || '5';

  // 독서 히스토리 렌더링
  const historySec = document.getElementById('bookHistorySection');
  const historyList = document.getElementById('bookHistoryList');
  if (book.history && book.history.length > 0) {
    historySec.classList.remove('hidden');
    historyList.innerHTML = book.history.map(h => `
      <div class="flex justify-between items-center py-0.5 border-b border-stone-200/50">
        <span>📅 ${h.date}</span>
        <span class="font-mono font-bold text-emerald-800">${h.startPage}p ~ ${h.endPage}p (${h.pagesRead}쪽)</span>
        <span class="text-stone-400 font-mono">${h.duration || ''}</span>
      </div>
    `).join('');
  } else {
    historySec.classList.remove('hidden');
    historyList.innerHTML = '<div class="text-stone-400 text-center py-1">아직 기록된 일일 독서로그가 없어요.</div>';
  }

  document.getElementById('bookDetailModal').classList.remove('hidden');
}

function closeBookDetailModal() {
  document.getElementById('bookDetailModal').classList.add('hidden');
}

// 저장 로직
function saveBookMaster() {
  const title = document.getElementById('bookInputTitle').value.trim();
  if (!title) {
    alert('도서명을 입력해주세요!');
    return;
  }

  const books = getBooksMaster();
  const editId = document.getElementById('bookEditId').value;
  const bookData = {
    title,
    author: document.getElementById('bookInputAuthor').value.trim(),
    totalPage: parseInt(document.getElementById('bookInputTotalPage').value) || 0,
    cover: document.getElementById('bookCoverUrl').value,
    status: document.getElementById('bookInputStatus').value,
    startDate: document.getElementById('bookInputStartDate').value,
    endDate: document.getElementById('bookInputEndDate').value,
    rating: document.getElementById('bookInputRating').value,
    review: document.getElementById('bookInputReview').value.trim()
  };

  if (editId) {
    const idx = books.findIndex(b => b.id == editId);
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
