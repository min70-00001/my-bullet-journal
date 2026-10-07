// ==========================================
// 🚀 [0] 파이어베이스 및 전역 설정 (Global Config)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyAXwjdZmy6Ij62RVyKww9UUalgUynyBqaA",
  authDomain: "mingle-bullet-journal.firebaseapp.com",
  projectId: "mingle-bullet-journal",
  storageBucket: "mingle-bullet-journal.firebasestorage.app",
  messagingSenderId: "975275683110",
  appId: "1:975275683110:web:638400c7bdcdc0cd6f25e7",
  measurementId: "G-5TGYM6V8LQ"
};

let db = null;

// ==========================================
// 🗓️ [1] 전역 상태 변수 (State Variables)
// ==========================================
const now = new Date();
const REAL_TODAY_STR = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
let currentDate = localStorage.getItem('mingle_last_view_date') || REAL_TODAY_STR;

// 각 기능별 현재 보고 있는 연/월 상태
let calYear = now.getFullYear(), calMonth = now.getMonth();
let moodYear = now.getFullYear(), moodMonth = now.getMonth();
let habitYear = now.getFullYear(), habitMonth = now.getMonth();
let routineYear = now.getFullYear(), routineMonth = now.getMonth();
let healthYear = now.getFullYear(), healthMonth = now.getMonth();

// 뷰 모드 및 필터 상태
let timetableViewMode = 'grid';
let habitViewMode = 'week';
let eventFilterMode = '30';
let ticketFilterMode = '30';
let anniversaryFilterMode = '30';

// 타임테이블 및 입력 제어 상태
let activeHourStr = null;
let activeBlockIdx = null;
let selectedDurationMinutes = 10;
let currentSelectedCategoryKey = null;

// 파이어베이스 구독(Listener) 해제 함수 모음
let unsubscribeDay = null;
let unsubscribeTasks = null;
let unsubscribeBooks = null;
let unsubscribeKnits = null;
let unsubscribeHabits = null;
let unsubscribeRoutines = null;
let unsubscribeCalEvents = null;
let unsubscribeTickets = null;
let unsubscribeRoutineDef = null;

// ==========================================
// 🛠️ [2] 공통 스마트 유틸리티 (Utilities)
// ==========================================
// 은은한 회색 연필 아이콘 (수정용)
const EDIT_SVG_ICON = `
  <svg class="w-3 h-3 text-stone-400 hover:text-stone-700 fill-none stroke-current stroke-2 inline-block shrink-0 transition-colors" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
`;

// 시간 자동 포맷팅 (숫자 4자리 -> HH:mm)
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

// ==========================================
// 🚀 [3] 앱 초기화 및 네비게이션 코어 (App Init & Nav)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  
  // 날짜 세팅
  const dateInput = document.getElementById('currentDateInput');
  if (dateInput) dateInput.value = currentDate;
  updateDateLabel();
  
  // 기본 화면 렌더링
  initTimetableGrid();
  if (typeof renderFavPlaceChips === 'function') renderFavPlaceChips();
  if (typeof renderOotdChips === 'function') renderOotdChips();
  if (typeof initCalEventCategoryButtons === 'function') initCalEventCategoryButtons();

  // 데이터 구독 시작
  subscribeDayData(currentDate);
  subscribeTodayTasks(currentDate);
  
  if (typeof subscribeArchives === 'function') subscribeArchives();
  if (typeof subscribeHabitData === 'function') subscribeHabitData();
  if (typeof subscribeRoutineMaster === 'function') subscribeRoutineMaster();
  if (typeof subscribeCalendarEvents === 'function') subscribeCalendarEvents();
  if (typeof subscribeTicketData === 'function') subscribeTicketData();
  if (typeof subscribeRoutineDefinitions === 'function') subscribeRoutineDefinitions();
  if (typeof subscribeAccountBookSettings === 'function') subscribeAccountBookSettings();
  if (typeof subscribeAnniversaries === 'function') subscribeAnniversaries();
  if (typeof subscribeClosetData === 'function') subscribeClosetData();

  // 탭 상태 스마트 복원 (서랍장 내부 기억 포함!)
  setTimeout(() => {
    const savedTab = localStorage.getItem('mingle_active_tab') || 'day';
    switchTab(savedTab);
  }, 100);
});

function initFirebase() {
  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
      syncStatus.innerText = '☁️ 동기화됨';
      syncStatus.className = 'text-[10px] text-emerald-600 font-bold';
    }
  } catch (e) {
    console.error("Firebase 초기화 에러:", e);
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
      syncStatus.innerText = '⚠️ 동기화오류';
      syncStatus.className = 'text-[10px] text-rose-500 font-medium';
    }
  }
}

// 탭 전환 코어 함수 (서랍장 새로고침 기억)
function switchTab(tab) {
  if (!tab) tab = 'day';
  localStorage.setItem('mingle_active_tab', tab);

  // 모든 뷰 숨기기
  ['day', 'calendar', 'tracker', 'drawer'].forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (view) view.classList.add('hidden');
    if (nav) nav.className = 'text-stone-400 hover:text-stone-600 py-1 flex flex-col items-center gap-0.5';
  });

  // 선택된 뷰 보이기
  const activeView = document.getElementById(`view-${tab}`);
  const activeNav = document.getElementById(`nav-${tab}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeNav) activeNav.className = 'text-stone-800 py-1 flex flex-col items-center gap-0.5 font-bold';

  // 탭별 데이터 갱신
  if (tab === 'day') {
    if (currentDate !== REAL_TODAY_STR) jumpToRealToday();
  } else if (tab === 'tracker') {
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
    // 서랍장은 마지막으로 보던 서브탭 기억해서 열기!
    const savedSubTab = sessionStorage.getItem('mingle_drawer_subtab');
    if (savedSubTab && typeof enterDrawerSub === 'function') {
      enterDrawerSub(savedSubTab);
    } else if (typeof backToDrawerHub === 'function') {
      backToDrawerHub();
    }
  }
}

// ==========================================
// 📅 [4] 날짜 조작 및 헤더 (Date Management)
// ==========================================
function onDateChanged(val) {
  currentDate = val;
  updateDateLabel();
  subscribeDayData(currentDate);
  subscribeTodayTasks(currentDate);
  if(typeof renderDayHabitList === 'function') renderDayHabitList();
  if(typeof renderDayRoutineTodos === 'function') renderDayRoutineTodos();
  if(typeof calculateDDays === 'function') calculateDDays();
  if(typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();
}

function changeDate(delta) {
  const parts = currentDate.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) + delta);
  const mStr = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
  const dStr = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
  currentDate = `${d.getFullYear()}-${mStr}-${dStr}`;
  localStorage.setItem('mingle_last_view_date', currentDate);
  
  const dateInput = document.getElementById('currentDateInput');
  if (dateInput) dateInput.value = currentDate;
  onDateChanged(currentDate);
}

function jumpToRealToday() {
  currentDate = REAL_TODAY_STR;
  localStorage.setItem('mingle_last_view_date', currentDate);
  const dateInput = document.getElementById('currentDateInput');
  if (dateInput) dateInput.value = currentDate;
  onDateChanged(currentDate);
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

// ==========================================
// ⭐ [5] 오늘의 할 일 (Daily To-Do)
// ==========================================
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
  tasks.push({ text, done: false, important: false, id: Date.now() });
  input.value = '';
  saveTodayTasks(tasks);
}

function toggleTodayTask(id) {
  const tasks = getTodayTasksLocal(currentDate);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx > -1) {
    tasks[idx].done = !tasks[idx].done;
    saveTodayTasks(tasks);
  }
}

function openTodayTaskEditModal(id) {
  const tasks = getTodayTasksLocal(currentDate);
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  document.getElementById('todayTaskEditId').value = id;
  document.getElementById('todayTaskEditTitle').value = task.text;
  document.getElementById('todayTaskEditImportant').checked = !!task.important;
  document.getElementById('todayTaskEditModal').classList.remove('hidden');
}

function closeTodayTaskEditModal() {
  document.getElementById('todayTaskEditModal').classList.add('hidden');
}

function saveTodayTaskEdit() {
  const id = parseFloat(document.getElementById('todayTaskEditId').value);
  const newText = document.getElementById('todayTaskEditTitle').value.trim();
  const isImportant = document.getElementById('todayTaskEditImportant').checked;
  
  if (!newText) return alert("할 일 내용을 입력해주세요!");

  const tasks = getTodayTasksLocal(currentDate);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx > -1) {
    tasks[idx].text = newText;
    tasks[idx].important = isImportant;
    saveTodayTasks(tasks);
  }
  closeTodayTaskEditModal();
}

function deleteTodayTaskEdit() {
  if (!confirm("이 할 일을 삭제할까요?")) return;
  const id = parseFloat(document.getElementById('todayTaskEditId').value);
  let tasks = getTodayTasksLocal(currentDate);
  tasks = tasks.filter(t => t.id !== id);
  saveTodayTasks(tasks);
  closeTodayTaskEditModal();
}

function renderTodayTasks(tasks) {
  const list = document.getElementById('todayTaskList');
  if (!list) return;
  
  document.getElementById('todayTaskCount').innerText = `${tasks.length}건`;
  if (tasks.length === 0) {
    list.innerHTML = `<p class="text-[11px] text-stone-300 py-2 text-center">오늘만의 특별한 일정이 있나요? ✍️</p>`;
    return;
  }

  // 1순위: 미완료 & 중요(⭐), 2순위: 미완료 일반, 3순위: 완료
  const sorted = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.important !== b.important) return a.important ? -1 : 1;
    return 0;
  });

  list.innerHTML = sorted.map(t => `
    <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-100 text-xs transition-colors hover:bg-stone-100/70">
      <label class="flex items-center gap-2 flex-1 min-w-0 pr-1 cursor-pointer">
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodayTask(${t.id})" class="rounded text-amber-500 w-3.5 h-3.5">
        <span class="${t.done ? 'line-through text-stone-300' : 'text-stone-700 font-medium'} truncate flex items-center gap-1">
          ${t.important ? '<span class="text-amber-500">⭐</span>' : ''}
          ${t.isMigrated ? '<span class="text-amber-600 font-bold mr-0.5" title="어제 이월된 할 일">&gt;</span>' : ''}
          ${t.text}
        </span>
      </label>
      <button type="button" onclick="openTodayTaskEditModal(${t.id})" class="p-1 rounded text-stone-400 hover:bg-white hover:text-stone-700 shadow-2xs border border-transparent hover:border-stone-200 transition" title="수정/중요도">
        ${EDIT_SVG_ICON}
      </button>
    </div>
  `).join('');
}

// ==========================================
// ⏱️ [6] 타임테이블 (Timetable & Category Blocks)
// ==========================================
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
  if (!container) return;
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
      btn.className = m === mins ? 'py-1 rounded-lg border border-amber-300 bg-amber-100 text-amber-900 font-bold' : 'py-1 rounded-lg border border-stone-200 bg-stone-50 text-stone-600';
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
          currentSession = { text, cat, startH: hStr, startB: b, endH: hStr, endB: b, duration: 10 };
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
        if (endB_next >= 6) { endB_next = 0; endH_num++; }
        const endH_str = endH_num < 10 ? `0${endH_num}` : `${endH_num}`;
        const endMin = endB_next * 10;
        const timeLabel = `${s.startH}:${startMin === 0 ? '00' : startMin} ~ ${endH_str}:${endMin === 0 ? '00' : endMin}`;
        const markerStyle = TIMELINE_MARKER_STYLES[s.cat] || TIMELINE_MARKER_STYLES.custom;

        return `
          <div class="relative group">
            <div class="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-400"></div>
            <div class="p-2.5 rounded-xl border border-stone-200/70 ${markerStyle} shadow-2xs flex items-center justify-between transition-all cursor-pointer hover:opacity-90">
              <div onclick="editTimelineSession('${s.startH}', ${s.startB},${s.duration}, '${s.text.replace(/'/g, "\\'")}', '${s.cat}')" class="min-w-0 pr-2 flex-1" title="클릭하여 내용 수정">
                <div class="flex items-center gap-1.5">
                  <span class="font-mono text-[10px] text-stone-500 font-semibold">${timeLabel}</span>
                  <span class="text-[9px] bg-white/80 px-1.5 py-0.2 rounded-full font-bold text-stone-600 border border-stone-200/60">${s.duration}분</span>
                </div>
                <div class="font-bold text-xs mt-0.5 tracking-tight flex items-center gap-1">
                  <span>${s.text}</span>${EDIT_SVG_ICON}
                </div>
              </div>
              <button onclick="clearSessionBlocks('${s.startH}', ${s.startB},${s.duration})" title="이 덩어리 삭제" class="text-stone-300 hover:text-stone-600 text-xs px-1 shrink-0">✕</button>
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
  let sH = parseInt(startH, 10), sB = startB;

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
  let sH = parseInt(startH, 10), sB = startB;

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

// ==========================================
// 🌅 [7] 동적 루틴 관리 (Morning/Evening Routines)
// ==========================================
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
  if (!defs.categories) defs.categories = DEFAULT_ROUTINES.categories;
  return defs;
}

function saveRoutineDefs(defs) {
  localStorage.setItem('mingle_routine_defs', JSON.stringify(defs));
  renderDynamicRoutines();
  if (db) db.collection('routine_definitions').doc('master').set(defs).catch(console.error);
}

function toggleRoutineRest(type) {
  const dayData = getDayDataLocal(currentDate);
  if (!dayData.routineRest) dayData.routineRest = {};
  dayData.routineRest[type] = !dayData.routineRest[type];
  saveDayDataLocal(currentDate, dayData);
  renderDynamicRoutines();
  if (db) db.collection('diary_days').doc(currentDate).set(dayData).catch(console.error);
  if(typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
  if(typeof renderCalendar === 'function') renderCalendar();
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
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};
  const nextVal = !dayData.dynamicRoutineChecks[itemId];
  dayData.dynamicRoutineChecks[itemId] = nextVal;

  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;

  if (nextVal && autoTime) {
    autoFillTimetableNow(itemName, autoCat);
  } else {
    if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
  }
  renderDynamicRoutines();
  if(typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
}

function toggleCatCareTag(tag) {
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
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
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (!dayData.dynamicRoutineChecks) dayData.dynamicRoutineChecks = {};

  morningActive.forEach(i => { dayData.dynamicRoutineChecks[i.id] = true; });
  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;

  autoFillTimetableNow('아침루틴', 'routine');
  renderDynamicRoutines();
  if(typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
  if(typeof renderCalendar === 'function') renderCalendar();
}

function toggleBookClubMode() {
  const isClub = document.getElementById('bookClubToggle')?.checked;
  const defs = getRoutineDefs();
  let clubItem = defs.evening.find(i => i.id === 'club_special');
  if (isClub) {
    if (!clubItem) {
      defs.evening.push({ id: 'club_special', cat: '🧶 마무리', name: '달보드레(독서모임)', autoTime: false, autoCat: 'bookclub', paused: false });
    } else {
      clubItem.paused = false;
      clubItem.autoTime = false;
    }
  } else if (clubItem) {
    clubItem.paused = true;
  }
  saveRoutineDefs(defs);
}

function renderDynamicRoutines() {
  const defs = getRoutineDefs();
  const dayData = getDayDataLocal(currentDate);
  const checks = dayData.dynamicRoutineChecks || {};
  const catTags = dayData.catCareTags || {};
  const rest = dayData.routineRest || {};

  // 아침
  const mWrapper = document.getElementById('morningRoutineContentWrapper');
  const mRestBtn = document.getElementById('morningRestBtn');
  if (mRestBtn) mRestBtn.className = rest.morning ? 'text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap' : 'text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap';

  if (rest.morning) {
    document.getElementById('morningProgressBadge').innerText = '휴식 🍃';
    mWrapper.innerHTML = `<div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center text-emerald-900 text-xs font-semibold">☕ 오늘은 아침 루틴 없이 편안히 쉬어가는 날이에요!</div>`;
  } else {
    const activeMorning = defs.morning.filter(i => !i.paused);
    const categories = defs.categories?.morning || [...new Set(activeMorning.map(i => i.cat))];
    let pct = activeMorning.length > 0 ? Math.round((activeMorning.filter(i => checks[i.id]).length / activeMorning.length) * 100) : 0;
    document.getElementById('morningProgressBadge').innerText = `${pct}%`;

    mWrapper.innerHTML = `<div class="space-y-2 text-xs">` + categories.map(cat => {
      const items = activeMorning.filter(i => i.cat === cat);
      if (items.length === 0) return '';
      return `
        <div class="p-2 bg-stone-50 rounded-xl border border-stone-100 flex flex-wrap items-center justify-between gap-1">
          <span class="text-[11px] font-bold text-stone-600">${cat}</span>
          <div class="flex items-center gap-2 flex-wrap">
            ${items.map(i => `
              <label class="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <input type="checkbox" ${checks[i.id] ? 'checked' : ''} onchange="toggleDynamicRoutineCheck('morning', '${i.id}',${i.autoTime}, '${i.autoCat}', '${i.name}')" class="rounded text-amber-500">
                <span class="text-[11px] ${checks[i.id] ? 'line-through text-stone-300' : 'text-stone-700'}">${i.name}</span>
              </label>
            `).join('')}
          </div>
        </div>`;
    }).join('') + `</div>`;
  }

  // 저녁
  const eWrapper = document.getElementById('eveningRoutineContentWrapper');
  const eRestBtn = document.getElementById('eveningRestBtn');
  if (eRestBtn) eRestBtn.className = rest.evening ? 'text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap' : 'text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 font-bold px-2 py-0.5 rounded-lg whitespace-nowrap';

  if (rest.evening) {
    document.getElementById('eveningProgressBadge').innerText = '휴식 🍃';
    eWrapper.innerHTML = `<div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center text-emerald-900 text-xs font-semibold">🛋️ 오늘은 저녁 루틴 없이 푹 쉬는 힐링 데이예요!</div>`;
  } else {
    const activeEvening = defs.evening.filter(i => !i.paused);
    const categories = defs.categories?.evening || [...new Set(activeEvening.map(i => i.cat))];
    let pct = activeEvening.length > 0 ? Math.round((activeEvening.filter(i => checks[i.id]).length / activeEvening.length) * 100) : 0;
    document.getElementById('eveningProgressBadge').innerText = `${pct}%`;

    eWrapper.innerHTML = `<div class="space-y-2 text-xs">` + categories.map(cat => {
      const items = activeEvening.filter(i => i.cat === cat);
      if (items.length === 0) return '';
      return `
        <div class="p-2 bg-stone-50 rounded-xl border border-stone-100 flex flex-wrap items-center justify-between gap-1">
          <span class="text-[11px] font-bold text-stone-600">${cat}</span>
          <div class="flex items-center gap-2 flex-wrap">
            ${items.map(i => `
              <div class="flex items-center gap-1">
                <label class="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  <input type="checkbox" ${checks[i.id] ? 'checked' : ''} onchange="toggleDynamicRoutineCheck('evening', '${i.id}',${i.autoTime}, '${i.autoCat}', '${i.name}')" class="rounded text-indigo-500">
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
        </div>`;
    }).join('') + `</div>`;
  }
}

let routineModalTarget = 'morning';
function openRoutineCustomModal(type) {
  routineModalTarget = type;
  document.getElementById('routineModalHeaderTitle').innerText = type === 'morning' ? '☀️ 아침 루틴 설정' : '🌙 저녁 루틴 설정';
  document.getElementById('categoryManagerArea').classList.add('hidden');
  updateRoutineCustomCatSelect();
  renderRoutineModalItems();
  document.getElementById('routineCustomModal').classList.remove('hidden');
}

function closeRoutineCustomModal() { document.getElementById('routineCustomModal').classList.add('hidden'); }

function updateRoutineCustomCatSelect() {
  const catSelect = document.getElementById('newRoutineCustomCat');
  const cats = getRoutineDefs().categories?.[routineModalTarget] || [];
  catSelect.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

function toggleCategoryManagerSection() {
  const isHidden = document.getElementById('categoryManagerArea').classList.toggle('hidden');
  if (!isHidden) renderCategoryManagerList();
}

function renderCategoryManagerList() {
  const container = document.getElementById('categoryManagerList');
  const cats = getRoutineDefs().categories?.[routineModalTarget] || [];
  container.innerHTML = cats.map((cat, idx) => `
    <div class="flex items-center justify-between p-1 rounded bg-white border border-amber-200 text-xs">
      <span onclick="editCategoryName(${idx})" class="font-bold text-amber-950 truncate cursor-pointer hover:underline flex items-center gap-1"><span>${cat}</span> ${EDIT_SVG_ICON}</span>
      <div class="flex items-center gap-1 shrink-0">
        <button onclick="moveCategoryOrder(${idx}, -1)" class="text-stone-400 hover:text-stone-700 text-[10px] px-0.5">▲</button>
        <button onclick="moveCategoryOrder(${idx}, 1)" class="text-stone-400 hover:text-stone-700 text-[10px] px-0.5">▼</button>
        <button onclick="deleteCategory(${idx})" class="text-stone-300 hover:text-rose-500 text-xs px-1">✕</button>
      </div>
    </div>
  `).join('');
}

function promptAddNewCategory() {
  const name = prompt("새로운 카테고리(그룹) 이름을 입력해주세요:");
  if (!name || !name.trim()) return;
  const defs = getRoutineDefs();
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
  defs[routineModalTarget].forEach(item => { if (item.cat === oldName) item.cat = newName.trim(); });
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
  [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];
  saveRoutineDefs(defs);
  renderCategoryManagerList();
}

function deleteCategory(idx) {
  if (!confirm("이 카테고리를 삭제할까요?\n소속된 루틴은 기본 카테고리로 유지됩니다.")) return;
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
  container.innerHTML = list.map(item => `
    <div class="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-1.5">
      <div class="flex-1 min-w-0 flex items-center gap-1">
        <span class="text-[9px] bg-stone-200 text-stone-600 px-1 py-0.2 rounded font-bold shrink-0">${item.cat}</span>
        <span onclick="editRoutineItemName('${item.id}')" class="text-xs font-semibold ${item.paused ? 'line-through text-stone-400' : 'text-stone-800'} cursor-pointer hover:text-amber-800 truncate flex items-center gap-1">
          <span>${item.name}</span> ${EDIT_SVG_ICON}
        </span>
      </div>
      <div class="flex items-center gap-1 shrink-0">
        <button onclick="moveRoutineItemOrder('${item.id}', -1)" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▲</button>
        <button onclick="moveRoutineItemOrder('${item.id}', 1)" class="text-stone-300 hover:text-stone-600 text-[10px] px-0.5">▼</button>
        <button onclick="togglePauseRoutineItem('${item.id}')" class="p-1 rounded bg-white border border-stone-200 hover:bg-stone-100">
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
  [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];
  saveRoutineDefs(defs);
  renderRoutineModalItems();
}

function addNewCustomRoutineItem() {
  const input = document.getElementById('newRoutineCustomName');
  const name = input.value.trim();
  if (!name) return;
  const cat = document.getElementById('newRoutineCustomCat').value;
  const defs = getRoutineDefs();
  defs[routineModalTarget].push({ id: 'c_' + Date.now(), cat, name, autoTime: true, autoCat: 'routine', paused: false });
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
  if (target) { target.paused = !target.paused; saveRoutineDefs(defs); renderRoutineModalItems(); }
}

function deleteRoutineItem(id) {
  if (!confirm("이 루틴을 완전히 삭제할까요?")) return;
  const defs = getRoutineDefs();
  defs[routineModalTarget] = defs[routineModalTarget].filter(i => i.id !== id);
  saveRoutineDefs(defs);
  renderRoutineModalItems();
}

// ==========================================
// 💊 [8] 건강관리 & 영양제 (Health, Meals, Supplements)
// ==========================================
function onMealAcvChange() {
  const acv2 = document.getElementById('mealAcv_2')?.checked || false;
  const acv3 = document.getElementById('mealAcv_3')?.checked || false;
  const count = (acv2 ? 1 : 0) + (acv3 ? 1 : 0);

  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
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

  waterEl.innerHTML = [1, 2, 3, 4, 5, 6].map(i => `<span onclick="toggleDrinkItem('waterCount', ${i})" class="transition-transform hover:scale-125 ${i <= (data.waterCount || 0) ? 'opacity-100' : 'opacity-25 grayscale'}">💧</span>`).join('');
  if (acvEl) acvEl.innerHTML = [1, 2].map(i => `<span onclick="toggleDrinkItem('acvCount', ${i})" class="transition-transform hover:scale-125 ${i <= (data.acvCount || 0) ? 'opacity-100' : 'opacity-25 grayscale'}">🍏</span>`).join('');
  if (coffeeEl) coffeeEl.innerHTML = `<span onclick="toggleDrinkItem('coffeeCount', 1)" class="transition-transform hover:scale-125 ${(data.coffeeCount || 0) >= 1 ? 'opacity-100' : 'opacity-25 grayscale'}">☕</span>`;
}

function toggleDrinkItem(key, idx) {
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  let curr = dayData[key] || 0;
  let next = curr === idx ? idx - 1 : idx;
  dayData[key] = next;

  if (key === 'acvCount') {
    if (document.getElementById('mealAcv_2')) document.getElementById('mealAcv_2').checked = next >= 1;
    if (document.getElementById('mealAcv_3')) document.getElementById('mealAcv_3').checked = next >= 2;
    if (!dayData.health) dayData.health = {};
    if (!dayData.health.meals) dayData.health.meals = [{}, {}, {}];
    if (dayData.health.meals[1]) dayData.health.meals[1].acv = next >= 1;
    if (dayData.health.meals[2]) dayData.health.meals[2].acv = next >= 2;
  }
  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;
  renderDrinkTracker(dayData);
  saveDayData();
}

// 💊 영양제 스마트 렌더링
function renderSupplementsList(mealIndex) {
  const container = document.getElementById(`supplementsList_${mealIndex}`);
  if (!container) return;

  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  const health = dayData.health || {};
  if (!health.supplements) health.supplements = { 1: [], 2: [], 3: [] };
  const items = health.supplements[mealIndex] || [];

  let html = items.map(sup => `
    <div class="flex items-center justify-between bg-white border border-stone-100 px-2 py-1 rounded-lg">
      <label class="flex items-center gap-1.5 flex-1 min-w-0 cursor-pointer">
        <input type="checkbox" ${sup.checked ? 'checked' : ''} onchange="toggleSupplement(${mealIndex}, '${sup.id}')" class="rounded text-amber-500 w-3 h-3 focus:ring-0">
        <span class="text-[10px] ${sup.checked ? 'text-stone-300 line-through' : 'text-stone-600 font-bold'} truncate">${sup.name}</span>
      </label>
      <button type="button" onclick="deleteSupplement(${mealIndex}, '${sup.id}')" class="text-stone-300 hover:text-rose-400 px-1 text-[10px] leading-none" title="삭제">✕</button>
    </div>
  `).join('');

  html += `
    <button type="button" onclick="addSupplement(${mealIndex})" class="w-full text-center text-[10px] text-stone-400 bg-stone-50/50 hover:bg-stone-100 border border-dashed border-stone-200 rounded-lg py-1 font-medium transition-colors">
      + 영양제 추가
    </button>
  `;
  container.innerHTML = html;
}

function addSupplement(mealIndex) {
  const name = prompt("추가할 영양제/건강식품 이름을 입력하세요:\n(예: 유산균, 오메가3, 비타민C)");
  if (!name || !name.trim()) return;

  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (!dayData.health) dayData.health = {};
  if (!dayData.health.supplements) dayData.health.supplements = { 1: [], 2: [], 3: [] };
  
  dayData.health.supplements[mealIndex].push({
    id: 'sup_' + Date.now(),
    name: name.trim(),
    checked: false
  });

  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;
  if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
  renderSupplementsList(mealIndex);
}

function toggleSupplement(mealIndex, supId) {
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  const items = dayData.health.supplements[mealIndex] || [];
  const target = items.find(i => i.id === supId);
  if (target) {
    target.checked = !target.checked;
    saveDayDataLocal(currentDate, dayData);
    window.currentDayData = dayData;
    if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
    renderSupplementsList(mealIndex);
  }
}

function deleteSupplement(mealIndex, supId) {
  if (!confirm("이 영양제를 목록에서 지울까요?")) return;
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  dayData.health.supplements[mealIndex] = dayData.health.supplements[mealIndex].filter(i => i.id !== supId);
  
  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;
  if (db) db.collection('diary_days').doc(currentDate).set(dayData, { merge: true }).catch(console.error);
  renderSupplementsList(mealIndex);
}

// ==========================================
// 👗 [9] OOTD 및 스마트 옷장 (Smart Closet)
// ==========================================
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
  const defaultCloset = { outer: [], top: [], bottom: [], shoes: [], bag: [] };
  try {
    const saved = localStorage.getItem('mingle_closet_v2');
    if (!saved) return defaultCloset;
    const parsed = JSON.parse(saved);
    ['outer', 'top', 'bottom', 'shoes', 'bag'].forEach(cat => { if (!parsed[cat]) parsed[cat] = []; });
    return parsed;
  } catch(e) { return defaultCloset; }
}

function saveClosetData(data) {
  try { localStorage.setItem('mingle_closet_v2', JSON.stringify(data)); } catch(e) {}
  if (db) db.collection('closet_data').doc('master').set({ closet: data }, { merge: true }).catch(console.error);
}

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
    const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : (getDayDataLocal(currentDate) || {});
    const dayOotd = dayData.ootd || {};
    const ootdSel = dayData.ootdSelected || {};

    ['outer', 'top', 'bottom', 'shoes', 'bag'].forEach(cat => {
      const container = document.getElementById(`ootdSelected_${cat}`);
      if (!container) return;
      container.innerHTML = '';

      let rawVal = ootdSel[cat] !== undefined ? ootdSel[cat] : dayOotd[cat];
      let selectedIds = Array.isArray(rawVal) ? rawVal.map(String) : (typeof rawVal === 'string' && rawVal.trim() !== '' ? [rawVal] : []);

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

        container.innerHTML += `
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs">
            <span class="w-2 h-2 rounded-full border border-stone-300 shrink-0" style="background-color: ${displayColor};"></span>
            <span>${displayName}</span>
            <button onclick="toggleSelectCloth('${cat}', '${id}'); event.stopPropagation();" class="text-stone-400 hover:text-red-500 ml-0.5 text-xs font-bold leading-none">×</button>
          </span>`;
      });
    });

    const currentColor = dayOotd.color || '#ecdcc9';
    if (document.getElementById('ootdColorBadge')) document.getElementById('ootdColorBadge').style.backgroundColor = currentColor;
    if (document.getElementById('ootdColorInput')) document.getElementById('ootdColorInput').value = currentColor;
    if (document.getElementById('ootdMemoInput')) document.getElementById('ootdMemoInput').value = dayOotd.memo || dayData.dailyOotdMemo || '';
  } catch (err) { console.warn("OOTD 렌더링 에러 패스:", err); }
}

function onOotdColorChange(color) {
  let dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (!dayData.ootd) dayData.ootd = {};
  dayData.ootd.color = color;
  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;
  if (document.getElementById('ootdColorBadge')) document.getElementById('ootdColorBadge').style.backgroundColor = color;
  if (db) db.collection('diary_days').doc(currentDate).set({ ootd: { color } }, { merge: true }).catch(console.error);
  if (typeof renderCalendar === 'function') renderCalendar();
}

function saveOotdMemo(memo) {
  let dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (!dayData.ootd) dayData.ootd = {};
  dayData.ootd.memo = memo;
  saveDayData();
}

function openOotdClosetModal(category) {
  activeCategory = category || 'outer';
  const catNames = { outer: '🧥 외투', top: '👕 상의', bottom: '👖 하의', shoes: '👟 신발', bag: '👜 가방' };
  if (document.getElementById('ootdModalTitle')) document.getElementById('ootdModalTitle').innerHTML = `<span>${catNames[activeCategory].split(' ')[0]}</span> ${catNames[activeCategory].split(' ')[1]} 옷장 선택 & 관리`;
  renderClosetModalList();
  document.getElementById('ootdClosetModal').classList.remove('hidden');
}

function closeOotdClosetModal() {
  document.getElementById('ootdClosetModal').classList.add('hidden');
  renderOotd();
}

function getClothWearCount(category, clothId) {
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mingle_day_')) {
        const d = JSON.parse(localStorage.getItem(key) || '{}');
        const target = (d.ootdSelected && d.ootdSelected[category]) || (d.ootd && d.ootd[category]);
        if (Array.isArray(target) && target.map(String).includes(String(clothId))) count++;
        else if (target && String(target) === String(clothId)) count++;
      }
    }
  } catch(e) {}
  return count;
}

function renderClosetModalList() {
  const container = document.getElementById('ootdClosetList');
  if (!container) return;
  const closet = getClosetData();
  let list = (closet[activeCategory] || []).slice();
  
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  const selObj = dayData.ootdSelected || dayData.ootd || {};
  let selectedIds = selObj[activeCategory] || [];
  if (!Array.isArray(selectedIds)) selectedIds = selectedIds ? [String(selectedIds)] : [];

  if (list.length === 0) {
    container.innerHTML = '<span class="text-[11px] text-stone-400 p-2 text-center w-full">등록된 옷이 없어요. 위에서 추가해 보세요! 🧥</span>';
    return;
  }

  list.forEach(item => { item._count = getClothWearCount(activeCategory, item.id); });
  list.sort((a, b) => b._count - a._count);

  container.innerHTML = list.map(item => {
    const isSelected = selectedIds.includes(String(item.id));
    const btnClass = isSelected 
      ? 'bg-amber-100 border-amber-300 font-bold text-amber-900 shadow-xs ring-1 ring-amber-400' 
      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50';

    return `
      <div onclick="toggleSelectCloth('${activeCategory}', '${item.id}')" class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer select-none transition-all ${btnClass}">
        <span class="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0 pointer-events-none" style="background-color: ${item.color || '#A8A29E'};"></span>
        <span class="cloth-title flex-1 pointer-events-none">${item.name}</span>
        <span class="text-[10px] text-stone-400 font-normal shrink-0 pointer-events-none">(${item._count}회)</span>
        <button type="button" onclick="event.stopPropagation(); editClothName('${item.id}', '${item.name.replace(/'/g, "\\'")}')" title="이름 수정" class="text-stone-300 hover:text-stone-500 p-1 flex items-center">${EDIT_SVG_ICON}</button>
        <button type="button" onclick="event.stopPropagation(); deleteClothFromCloset('${item.id}')" title="삭제" class="text-stone-300 hover:text-red-400 px-1 text-sm font-bold">×</button>
      </div>`;
  }).join('');
}

function toggleSelectCloth(category, id) {
  const strId = String(id);
  const dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);

  if (!dayData.ootdSelected) dayData.ootdSelected = {};
  if (!dayData.ootd) dayData.ootd = {};
  if (!dayData.ootdNames) dayData.ootdNames = {};
  if (!dayData.ootdColors) dayData.ootdColors = {};

  let arr = Array.isArray(dayData.ootdSelected[category] || dayData.ootd[category]) ? [...(dayData.ootdSelected[category] || dayData.ootd[category])].map(String) : [];

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

    if ((category === 'top' || category === 'outer') && clothColor && (!dayData.ootd.color || dayData.ootd.color === '#ecdcc9')) {
      dayData.ootd.color = clothColor;
      if (document.getElementById('ootdColorBadge')) document.getElementById('ootdColorBadge').style.backgroundColor = clothColor;
    }
  }

  dayData.ootdSelected[category] = arr;
  dayData.ootd[category] = arr;

  saveDayDataLocal(currentDate, dayData);
  window.currentDayData = dayData;

  if (db) {
    db.collection('diary_days').doc(currentDate).set({
      ootdSelected: dayData.ootdSelected, ootd: dayData.ootd, ootdNames: dayData.ootdNames, ootdColors: dayData.ootdColors
    }, { merge: true }).catch(console.error);
  }

  renderClosetModalList();
  renderOotd();
  if (typeof renderCalendar === 'function') renderCalendar();
}

function addNewClothToCloset() {
  const input = document.getElementById('ootdNewClothInput');
  const name = input?.value.trim();
  if (!name) return;

  const color = detectClothColor(name);
  const closet = getClosetData();
  if (!closet[activeCategory]) closet[activeCategory] = [];

  const newId = String(Date.now());
  closet[activeCategory].push({ id: newId, name, color });
  saveClosetData(closet);

  input.value = '';
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

  let dayData = (window.currentDayData && window.currentDayData.date === currentDate) ? window.currentDayData : getDayDataLocal(currentDate);
  if (dayData.ootd && Array.isArray(dayData.ootd[activeCategory])) {
    dayData.ootd[activeCategory] = dayData.ootd[activeCategory].filter(x => String(x) !== String(id));
    saveDayDataLocal(currentDate, dayData);
    if (db) db.collection('diary_days').doc(currentDate).set({ ootd: dayData.ootd }, { merge: true }).catch(console.error);
  }
  renderClosetModalList();
  renderOotd();
}

// ==========================================
// 🎵 [10] BGM 음악 검색 (Music BGM)
// ==========================================
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
// ==========================================
// 💾 [11] 데일리 데이터 동기화 (Day Data Sync)
// ==========================================
function subscribeDayData(dateStr) {
  if (unsubscribeDay) unsubscribeDay();
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
        const emptyData = { date: dateStr, expenses: [], ootdSelected: {}, ootd: {} };
        window.currentDayData = emptyData;
        applyDayDataToUI(emptyData);
      }
      if (typeof renderExpenseWidget === 'function') renderExpenseWidget();
      if (typeof renderAccountBookCalendar === 'function') renderAccountBookCalendar();
      if (typeof renderOotdSelectedList === 'function') renderOotdSelectedList();
    }, err => console.error(err));
}

function getDayDataLocal(dateStr) {
  return JSON.parse(localStorage.getItem('mingle_diary_days') || '{}')[dateStr] || {};
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
        timetableData[`${hourStr}_${b}`] = { text: cell.innerText, category: cell.dataset.category || 'custom' };
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
      color: existing.ootd?.color || document.getElementById('ootdColorInput')?.value || '#ecdcc9',
      memo: document.getElementById('ootdMemoInput')?.value || existing.ootd?.memo || ''
    },
    expenses: existing.expenses || [],
    bgm: {
      song: document.getElementById('bgmSearchInput')?.value || '',
      info: document.getElementById('bgmInfoText')?.innerText || '',
      cover: document.getElementById('bgmCoverImg')?.src || ''
    },
    health: {
      sleepBed: document.getElementById('sleepBedTime')?.value || '',
      sleepWake: document.getElementById('sleepWakeTime')?.value || '',
      weight: document.getElementById('todayWeight')?.value || '',
      supplements: existing.health?.supplements || { 1: [], 2: [], 3: [] },
      meals: [1, 2, 3].map(i => ({
        time: document.getElementById(`mealTime_${i}`)?.value || '',
        sugarPost: document.getElementById(`sugarPost_${i}`)?.value || '',
        menu: document.getElementById(`mealMenu_${i}`)?.value || '',
        vege: document.getElementById(`mealVege_${i}`)?.checked || false,
        acv: document.getElementById(`mealAcv_${i}`)?.checked || false,
        walk: document.getElementById(`mealWalk_${i}`)?.checked || false,
        cond: document.getElementById(`mealCond_${i}`)?.value || '',
        sugarFast: i === 1 ? (document.getElementById('sugarFast')?.value || '') : null
      }))
    },
    knit: {
      project: document.getElementById('knitCurrentProject')?.value || '',
      rows: document.getElementById('knitRowCount')?.innerText || '0',
      tip: document.getElementById('knitSectionTip')?.value || ''
    },
    book: {
      title: document.getElementById('bookCurrentTitle')?.value || '',
      pages: document.getElementById('bookTodayPages')?.value || ''
    },
    memo: document.getElementById('dailyMemo')?.value || '',
    timetable: timetableData
  };

  saveDayDataLocal(currentDate, data);
  if (db) db.collection('diary_days').doc(currentDate).set(data, { merge: true }).catch(console.error);

  if (typeof renderMoodTracker === 'function') renderMoodTracker();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof renderRoutineProgressTracker === 'function') renderRoutineProgressTracker();
  if (typeof renderHealthTracker === 'function') renderHealthTracker();
}

function applyDayDataToUI(data) {
  data = data || {};
  window.currentDayData = data; 
  initTimetableGrid();

  if (document.getElementById('todayWeatherSelect')) document.getElementById('todayWeatherSelect').value = data.weather || '';
  if (document.getElementById('todayMoodSelect')) document.getElementById('todayMoodSelect').value = data.mood || '';

  if (data.ootd) {
    if (document.getElementById('ootdColorBadge')) document.getElementById('ootdColorBadge').style.backgroundColor = data.ootd.color || '#ecdcc9';
    if (document.getElementById('ootdColorInput')) document.getElementById('ootdColorInput').value = data.ootd.color || '#ecdcc9';
    if (document.getElementById('ootdMemoInput')) document.getElementById('ootdMemoInput').value = data.ootd.memo || '';
  }
  if (typeof renderOotd === 'function') renderOotd();
  if (typeof renderExpenseWidget === 'function') renderExpenseWidget();

  if (data.bgm) {
    if(document.getElementById('bgmSearchInput')) document.getElementById('bgmSearchInput').value = data.bgm.song || '';
    if(document.getElementById('bgmInfoText')) document.getElementById('bgmInfoText').innerText = data.bgm.info || 'BGM을 검색해보세요';
    if (data.bgm.cover && document.getElementById('bgmCoverImg')) document.getElementById('bgmCoverImg').src = data.bgm.cover;
  }

  if (data.health) {
    if(document.getElementById('sleepBedTime')) document.getElementById('sleepBedTime').value = data.health.sleepBed || '';
    if(document.getElementById('sleepWakeTime')) document.getElementById('sleepWakeTime').value = data.health.sleepWake || '';
    if(document.getElementById('todayWeight')) document.getElementById('todayWeight').value = data.health.weight || '';

    if (data.health.meals) {
      data.health.meals.forEach((m, idx) => {
        const i = idx + 1;
        if(document.getElementById(`mealTime_${i}`)) document.getElementById(`mealTime_${i}`).value = m.time || '';
        if(document.getElementById(`sugarPost_${i}`)) document.getElementById(`sugarPost_${i}`).value = m.sugarPost || '';
        if(document.getElementById(`mealMenu_${i}`)) document.getElementById(`mealMenu_${i}`).value = m.menu || '';
        if (document.getElementById(`mealVege_${i}`)) document.getElementById(`mealVege_${i}`).checked = !!m.vege;
        if (document.getElementById(`mealAcv_${i}`)) document.getElementById(`mealAcv_${i}`).checked = !!m.acv;
        if (document.getElementById(`mealWalk_${i}`)) document.getElementById(`mealWalk_${i}`).checked = !!m.walk;
        if(document.getElementById(`mealCond_${i}`)) document.getElementById(`mealCond_${i}`).value = m.cond || '';
        if (i === 1 && document.getElementById('sugarFast')) document.getElementById('sugarFast').value = m.sugarFast || '';
        if (typeof renderSupplementsList === 'function') renderSupplementsList(i);
      });
    }
  }
  if (typeof renderDrinkTracker === 'function') renderDrinkTracker(data);

  if (data.knit) {
    if(document.getElementById('knitCurrentProject')) document.getElementById('knitCurrentProject').value = data.knit.project || '';
    if(document.getElementById('knitRowCount')) document.getElementById('knitRowCount').innerText = data.knit.rows || '0';
    if (document.getElementById('knitSectionTip')) document.getElementById('knitSectionTip').value = data.knit.tip || '';
  }
  if (data.book) {
    if(document.getElementById('bookCurrentTitle')) document.getElementById('bookCurrentTitle').value = data.book.title || '';
    if(document.getElementById('bookTodayPages')) document.getElementById('bookTodayPages').value = data.book.pages || '';
  }
  if(document.getElementById('dailyMemo')) document.getElementById('dailyMemo').value = data.memo || '';

  if (data.timetable) {
    Object.keys(data.timetable).forEach(k => {
      const [h, b] = k.split('_');
      const item = data.timetable[k];
      if (typeof item === 'object') setBlockData(h, parseInt(b), item.text, item.category);
      else setBlockData(h, parseInt(b), item, 'custom');
    });
  }

  if (typeof renderDynamicRoutines === 'function') renderDynamicRoutines();
  if (typeof updateTodaySpecialBanner === 'function') updateTodaySpecialBanner();
  if (timetableViewMode === 'timeline' && typeof renderVerticalTimeline === 'function') renderVerticalTimeline();
}

// ==========================================
// 📝 [12] 데일리 TO-DO (Routine Todo & Master List)
// ==========================================
let selectedWeeklyDays = [];
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
  if (idx > -1) selectedWeeklyDays.splice(idx, 1);
  else selectedWeeklyDays.push(dayNum);
  renderWeekDayChips();
}

function renderWeekDayChips() {
  [0, 1, 2, 3, 4, 5, 6].forEach(d => {
    const chip = document.getElementById(`wd_chip_${d}`);
    if (chip) {
      chip.className = selectedWeeklyDays.includes(d) 
        ? 'px-2 py-1 rounded-lg border border-amber-300 bg-amber-100 text-amber-900 font-bold' 
        : 'px-2 py-1 rounded-lg border border-stone-200 bg-white text-stone-400 font-medium';
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
  return JSON.parse(localStorage.getItem('mingle_routine_rules') || '[]');
}

function saveRoutineRules(rules) {
  localStorage.setItem('mingle_routine_rules', JSON.stringify(rules));
  renderDayRoutineTodos();
  if (typeof renderRoutineTodoManageList === 'function') renderRoutineTodoManageList();
  if (db) db.collection('routine_master').doc('list').set({ rules }).catch(console.error);
}

function addRoutineTodo() {
  const input = document.getElementById('newRoutineTodoInput');
  const text = input.value.trim();
  if (!text) return;
  const type = document.getElementById('routineTypeSelect').value;
  const rules = getRoutineRules();

  rules.push({
    id: Date.now(),
    text,
    type,
    days: type === 'weekly' ? [...selectedWeeklyDays] : null,
    createdDate: currentDate,
    sortOrder: Date.now()
  });

  input.value = '';
  selectedWeeklyDays = [];
  renderWeekDayChips();
  saveRoutineRules(rules);
}

function toggleDayRoutineCheck(ruleId) {
  const dayData = getDayDataLocal(currentDate);
  if (!dayData.routineChecks) dayData.routineChecks = {};
  dayData.routineChecks[ruleId] = !dayData.routineChecks[ruleId];
  saveDayDataLocal(currentDate, dayData);
  renderDayRoutineTodos();
  if (db) db.collection('diary_days').doc(currentDate).set({ routineChecks: dayData.routineChecks }, { merge: true }).catch(console.error);
}

function renderDayRoutineTodos() {
  const container = document.getElementById('routineTodoList');
  if (!container) return;

  const parts = currentDate.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const dayOfWeek = d.getDay();
  const dateNum = d.getDate();
  const monthNum = d.getMonth() + 1;
  const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

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

  const typeRank = { daily: 1, weekly: 2, monthly_first: 3, monthly: 3, monthly_last: 4, quarterly: 5 };
  activeRules.sort((a, b) => {
    if ((typeRank[a.type] || 9) !== (typeRank[b.type] || 9)) return (typeRank[a.type] || 9) - (typeRank[b.type] || 9);
    return a.text.localeCompare(b.text, 'ko');
  });

  const countEl = document.getElementById('routineTodoCount');
  if (countEl) countEl.innerText = `${activeRules.length}건`;

  if (activeRules.length === 0) {
    container.innerHTML = `<p class="text-[11px] text-stone-300 py-2 text-center">오늘 등록된 정기 투두가 없어요 🌿</p>`;
    return;
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  container.innerHTML = activeRules.map((r) => {
    const isDone = !!checks[r.id];
    let badge = '';
    if (r.type === 'daily') badge = '<span class="text-[9px] bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.2 rounded font-semibold shrink-0">매일</span>';
    else if (r.type === 'weekly') badge = `<span class="text-[9px] bg-sky-50 text-sky-900 border border-sky-200 px-1.5 py-0.2 rounded font-semibold shrink-0">${dayNames[dayOfWeek]}요일</span>`;
    else if (r.type === 'monthly_first' || r.type === 'monthly') badge = '<span class="text-[9px] bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold shrink-0">첫날</span>';
    else if (r.type === 'monthly_last') badge = '<span class="text-[9px] bg-rose-50 text-rose-900 border border-rose-200 px-1.5 py-0.2 rounded font-semibold shrink-0">말일</span>';
    else if (r.type === 'quarterly') badge = '<span class="text-[9px] bg-purple-50 text-purple-900 border border-purple-200 px-1.5 py-0.2 rounded font-semibold shrink-0">분기</span>';

    return `
      <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-100 text-xs">
        <label class="flex items-center gap-1.5 flex-1 cursor-pointer min-w-0 pr-1">
          <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDayRoutineCheck(${r.id})" class="rounded text-amber-500 w-3.5 h-3.5">
          <span class="${isDone ? 'line-through text-stone-300' : 'text-stone-700 font-medium'} truncate">${r.text}</span>
          ${badge}
        </label>
      </div>`;
  }).join('');
}

// ⚙️ 데일리 투두 [전체 관리] 모달 로직
function openRoutineTodoManageModal() {
  document.getElementById('routineTodoManageModal').classList.remove('hidden');
  renderRoutineTodoManageList();
}

function closeRoutineTodoManageModal() {
  document.getElementById('routineTodoManageModal').classList.add('hidden');
}

function renderRoutineTodoManageList() {
  const container = document.getElementById('routineTodoManageList');
  if (!container) return;
  const rules = getRoutineRules();

  if (rules.length === 0) {
    container.innerHTML = '<p class="text-center text-stone-400 py-4">등록된 반복 투두가 없습니다.</p>';
    return;
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  container.innerHTML = rules.map((r, idx) => {
    let typeTxt = r.type;
    if (r.type === 'daily') typeTxt = '매일';
    else if (r.type === 'weekly' && r.days) typeTxt = r.days.map(d => dayNames[d]).join(',') + '요일';
    else if (r.type === 'monthly_first') typeTxt = '매월 1일';
    else if (r.type === 'monthly_last') typeTxt = '매월 말일';
    else if (r.type === 'quarterly') typeTxt = '매 분기 1일';

    return `
      <div class="p-2 border border-stone-200 rounded-xl flex items-center justify-between bg-stone-50">
        <div class="flex-1 min-w-0 pr-2">
          <p class="font-bold text-stone-800 text-sm truncate">${r.text}</p>
          <p class="text-[10px] text-stone-500">${typeTxt}</p>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="moveRoutineOrder(${r.id}, -1)" class="text-stone-400 hover:text-stone-700 text-xs px-1 border rounded bg-white">▲</button>
          <button onclick="moveRoutineOrder(${r.id}, 1)" class="text-stone-400 hover:text-stone-700 text-xs px-1 border rounded bg-white">▼</button>
          <button onclick="deleteRoutineRule(${r.id})" class="text-rose-400 hover:text-rose-600 text-xs px-1 ml-1 font-bold">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function moveRoutineOrder(id, delta) {
  let rules = getRoutineRules();
  const idx = rules.findIndex(r => r.id === id);
  if (idx === -1) return;
  const targetIdx = idx + delta;
  if (targetIdx < 0 || targetIdx >= rules.length) return;
  [rules[idx], rules[targetIdx]] = [rules[targetIdx], rules[idx]];
  saveRoutineRules(rules);
}

function deleteRoutineRule(id) {
  if (!confirm("이 반복 투두를 완전히 삭제할까요?")) return;
  let rules = getRoutineRules();
  rules = rules.filter(r => r.id !== id);
  saveRoutineRules(rules);
}

// ==========================================
// 🗄️ [13] 서랍장 허브 & 메모장 모듈 (Drawer & Note)
// ==========================================
function enterDrawerSub(type) {
  sessionStorage.setItem('mingle_drawer_subtab', type); // 새로고침 기억용
  const hub = document.getElementById('drawerHubGrid');
  const backBar = document.getElementById('drawerBackBar');
  const titleElem = document.getElementById('drawerCurrentTitle');

  if (hub) hub.classList.add('hidden');
  if (backBar) {
    backBar.classList.remove('hidden');
    backBar.classList.add('flex');
  }

  const titles = { note: '📝 메모장 서랍', budget: '💰 가계부 서랍', book: '📚 책장 서랍', knit: '🧶 쇼룸 서랍' };
  if (titleElem) titleElem.textContent = titles[type] || '';

  ['note', 'budget', 'book', 'knit'].forEach(t => {
    const mod = document.getElementById(`drawer${t.charAt(0).toUpperCase() + t.slice(1)}Module`);
    if (mod) {
      mod.classList.add('hidden');
      mod.style.display = 'none';
    }
  });

  const activeSubMod = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}Module`);
  if (activeSubMod) {
    activeSubMod.classList.remove('hidden');
    if(type === 'budget') activeSubMod.style.display = 'block';
  }

  if (type === 'budget') {
    if (typeof switchAccountBookTab === 'function') switchAccountBookTab('calendar');
    if (typeof refreshPayMethodSelects === 'function') refreshPayMethodSelects();
    if (typeof checkFixedExpenseAlerts === 'function') checkFixedExpenseAlerts();
  }

  if (type === 'note') renderNoteCards();
  else if (type === 'budget' && typeof renderBudgetDashboard === 'function') renderBudgetDashboard();
  else if (type === 'book' && typeof renderBookShelf === 'function') renderBookShelf();
  else if (type === 'knit' && typeof renderKnittingShowroom === 'function') renderKnittingShowroom();
}

function backToDrawerHub() {
  sessionStorage.removeItem('mingle_drawer_subtab');
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

// 📝 메모장 (리치 텍스트 & 폴더 지원)
function getNotesLocal() {
  return JSON.parse(localStorage.getItem('mingle_drawer_notes') || '[]');
}

function getNoteFoldersLocal() {
  const folders = JSON.parse(localStorage.getItem('mingle_drawer_note_folders') || '["기본 폴더"]');
  if (folders.length === 0) folders.push("기본 폴더");
  return folders;
}

function saveNotesLocal(notes) {
  localStorage.setItem('mingle_drawer_notes', JSON.stringify(notes));
  renderNoteCards();
  if (db) db.collection('drawer_notes').doc('master').set({ notes }, { merge: true }).catch(console.error);
}

function renderNoteCards() {
  const container = document.getElementById('noteCardsContainer');
  const folderTabs = document.getElementById('noteFolderTabs');
  if (!container || !folderTabs) return;

  const notes = getNotesLocal();
  const folders = getNoteFoldersLocal();
  const keyword = (document.getElementById('noteSearchInput')?.value || '').toLowerCase();
  
  // 현재 선택된 폴더 (없으면 전체)
  let activeFolder = sessionStorage.getItem('mingle_note_active_folder') || '전체';

  // 폴더 탭 렌더링
  let tabHtml = `<button onclick="setNoteFolder('전체')" class="shrink-0 px-3 py-1.5 rounded-full border ${activeFolder === '전체' ? 'bg-stone-800 text-white font-bold' : 'bg-white text-stone-500'}">전체</button>`;
  folders.forEach(f => {
    tabHtml += `<button onclick="setNoteFolder('${f}')" class="shrink-0 px-3 py-1.5 rounded-full border ${activeFolder === f ? 'bg-stone-800 text-white font-bold' : 'bg-white text-stone-500'}">${f}</button>`;
  });
  tabHtml += `<button onclick="addNoteFolder()" class="shrink-0 px-2 py-1.5 rounded-full border border-dashed border-stone-300 text-stone-400 text-[10px]">+ 폴더추가</button>`;
  folderTabs.innerHTML = tabHtml;

  // 메모 필터링 및 렌더링
  let filtered = notes.filter(n => {
    if (activeFolder !== '전체' && n.folder !== activeFolder) return false;
    if (keyword && !n.title.toLowerCase().includes(keyword) && !n.content.toLowerCase().includes(keyword)) return false;
    return true;
  });

  filtered.sort((a, b) => b.updatedAt - a.updatedAt); // 최신순

  if (filtered.length === 0) {
    container.innerHTML = '<div class="col-span-2 text-center text-stone-400 text-xs py-8 bg-stone-50 rounded-xl border border-stone-100">조건에 맞는 메모가 없어요.</div>';
    return;
  }

  container.innerHTML = filtered.map(n => {
    const plainText = n.content.replace(/<[^>]+>/g, ' '); // 미리보기를 위해 태그 제거
    return `
      <div onclick="openNoteEditorModal(${n.id})" class="p-3 bg-white border border-stone-200 rounded-xl shadow-2xs cursor-pointer hover:shadow-md transition flex flex-col h-32">
        <div class="flex justify-between items-start mb-1">
          <h4 class="font-bold text-sm text-stone-800 truncate pr-2">${n.title || '제목 없음'}</h4>
          <span class="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded shrink-0">${n.folder || '기본'}</span>
        </div>
        <p class="text-[11px] text-stone-500 line-clamp-3 leading-relaxed flex-1">${plainText}</p>
        <div class="text-[9px] text-stone-300 mt-2 text-right">
          ${new Date(n.updatedAt).toLocaleDateString()}
        </div>
      </div>
    `;
  }).join('');
}

function setNoteFolder(folderName) {
  sessionStorage.setItem('mingle_note_active_folder', folderName);
  renderNoteCards();
}

function addNoteFolder() {
  const name = prompt("새로운 폴더 이름을 입력하세요:");
  if (!name || !name.trim()) return;
  const folders = getNoteFoldersLocal();
  if (!folders.includes(name.trim())) {
    folders.push(name.trim());
    localStorage.setItem('mingle_drawer_note_folders', JSON.stringify(folders));
    renderNoteCards();
  }
}

// 메모 에디터 모달 열기/닫기
let currentEditNoteId = null;
function openNoteEditorModal(id = null) {
  currentEditNoteId = id;
  const modal = document.getElementById('noteEditorModal');
  const titleInp = document.getElementById('noteEditorTitle');
  const contentInp = document.getElementById('noteEditorContent');
  const folderSel = document.getElementById('noteEditorFolder');
  
  // 폴더 셀렉트 세팅
  const folders = getNoteFoldersLocal();
  folderSel.innerHTML = folders.map(f => `<option value="${f}">${f}</option>`).join('');

  if (id) {
    const note = getNotesLocal().find(n => n.id === id);
    if (note) {
      titleInp.value = note.title;
      contentInp.innerHTML = note.content;
      folderSel.value = note.folder || folders[0];
    }
  } else {
    titleInp.value = '';
    contentInp.innerHTML = '';
    const activeFolder = sessionStorage.getItem('mingle_note_active_folder');
    folderSel.value = (activeFolder && activeFolder !== '전체') ? activeFolder : folders[0];
  }
  
  modal.classList.remove('hidden');
}

function closeNoteEditorModal() {
  document.getElementById('noteEditorModal').classList.add('hidden');
  currentEditNoteId = null;
}

function saveNoteEditor() {
  const title = document.getElementById('noteEditorTitle').value.trim() || '제목 없음';
  const content = document.getElementById('noteEditorContent').innerHTML;
  const folder = document.getElementById('noteEditorFolder').value;
  
  const notes = getNotesLocal();
  if (currentEditNoteId) {
    const idx = notes.findIndex(n => n.id === currentEditNoteId);
    if (idx > -1) {
      notes[idx].title = title;
      notes[idx].content = content;
      notes[idx].folder = folder;
      notes[idx].updatedAt = Date.now();
    }
  } else {
    notes.push({
      id: Date.now(),
      title,
      content,
      folder,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }
  
  saveNotesLocal(notes);
  closeNoteEditorModal();
}
// ==========================================
// 💰 [14] 가계부 코어 (Account Book) - 달력, 전체내역, 예산, 고정지출
// ==========================================

// 가계부 4단 탭 전환
function switchAccountBookTab(tab) {
  const tabs = ['Calendar', 'All', 'Budget', 'Fixed'];
  tabs.forEach(t => {
    const view = document.getElementById(`abView${t}`);
    const btn = document.getElementById(`abTabBtn${t}`);
    if (view) view.classList.add('hidden');
    if (btn) btn.className = 'py-1.5 rounded-lg hover:text-stone-700 transition';
  });

  const activeView = document.getElementById(`abView${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  const activeBtn = document.getElementById(`abTabBtn${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeBtn) activeBtn.className = 'py-1.5 rounded-lg bg-white text-stone-800 shadow-2xs font-semibold transition';

  if (tab === 'calendar') renderAccountBookCalendar();
  else if (tab === 'all') renderAccountBookAllList();
  else if (tab === 'budget') renderAccountBookBudget();
  else if (tab === 'fixed') renderAccountBookFixed();
}

// 해당 월 전체 데이터 긁어오기 헬퍼
function getMonthExpensesData(year, month) {
  const result = { dailyTotals: {}, monthTotal: 0, totalCount: 0, catTotals: {} };
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
          const main = item.mainCat || (item.category && item.category.includes('/') ? item.category.split('/')[0] : '기타');
          result.catTotals[main] = (result.catTotals[main] || 0) + amt;
        });
        if (daySum > 0) result.dailyTotals[dateStr] = daySum;
      } catch(e) {}
    }
  }
  return result;
}

// 📋 [신규] 가계부 전체 내역 뷰
function renderAccountBookAllList() {
  const container = document.getElementById('abAllExpenseList');
  if (!container) return;

  const y = window.abCurrentYear || new Date().getFullYear();
  const m = window.abCurrentMonth || (new Date().getMonth() + 1);
  const prefix = `mingle_day_${y}-${String(m).padStart(2, '0')}`;
  let allExpenses = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      try {
        const exps = JSON.parse(localStorage.getItem(key) || '{}').expenses || [];
        exps.forEach(e => allExpenses.push({ ...e, dateStr: key.replace('mingle_day_', '') }));
      } catch(e) {}
    }
  }

  // 최신 날짜/시간 순 정렬
  allExpenses.sort((a, b) => {
    const dateDiff = b.dateStr.localeCompare(a.dateStr);
    if (dateDiff !== 0) return dateDiff;
    return (b.time || '').localeCompare(a.time || '');
  });

  if (allExpenses.length === 0) {
    container.innerHTML = '<p class="text-center text-stone-400 py-6 text-xs bg-stone-50 rounded-xl border border-stone-100">이번 달 기록된 지출이 없어요 💸</p>';
    return;
  }

  container.innerHTML = allExpenses.map(item => {
    const rawCat = item.category || item.subCategory || '';
    const displaySubCat = rawCat.includes('/') ? rawCat.split('/').pop().trim() : (rawCat || '기타');
    const amt = Number(item.amount) || 0;
    
    return `
      <div class="p-3 bg-stone-50 border border-stone-200/60 rounded-xl flex items-center justify-between text-xs mb-1.5 hover:bg-stone-100 transition">
        <div class="flex-1 min-w-0 pr-2">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="font-bold text-stone-800 truncate">${item.title || item.memo || '지출'}</span>
            <span class="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold shrink-0">${displaySubCat}</span>
          </div>
          <div class="text-[10px] text-stone-400 font-mono">
            ${item.dateStr} ${item.time || ''} · ${item.payMethod || item.payment || '카드'}
          </div>
        </div>
        <div class="font-mono font-bold text-rose-600 shrink-0">
          -${amt.toLocaleString()}원
        </div>
      </div>
    `;
  }).join('');
}

// 📊 가계부 예산 뷰 (세부 예산 바 시각화)
function renderAccountBookBudget() {
  const y = window.abCurrentYear || new Date().getFullYear();
  const m = window.abCurrentMonth || (new Date().getMonth() + 1);
  const monthData = getMonthExpensesData(y, m);

  const budgetTotal = parseInt(localStorage.getItem('mingle_monthly_budget_target') || '1000000', 10);
  if (document.getElementById('abTotalBudgetAmount')) document.getElementById('abTotalBudgetAmount').innerText = `${budgetTotal.toLocaleString()}원`;
  
  const remainEl = document.getElementById('abRemainingBudgetLabel');
  const remain = budgetTotal - monthData.monthTotal;
  if (remainEl) {
    remainEl.className = remain >= 0 ? 'text-xs font-semibold text-emerald-700' : 'text-xs font-semibold text-rose-600';
    remainEl.innerText = remain >= 0 ? `잔여: ${remain.toLocaleString()}원` : `초과: ${Math.abs(remain).toLocaleString()}원!`;
  }

  const barEl = document.getElementById('abBudgetProgressBar');
  if (barEl) {
    const pct = Math.min(100, Math.round((monthData.monthTotal / budgetTotal) * 100));
    barEl.style.width = `${pct}%`;
    barEl.className = pct > 90 ? 'bg-rose-500 h-2 rounded-full transition-all' : 'bg-amber-500 h-2 rounded-full transition-all';
  }

  const catListEl = document.getElementById('abCategoryBudgetList');
  if (!catListEl) return;
  const cats = Object.keys(monthData.catTotals);

  if (cats.length === 0) {
    catListEl.innerHTML = '<p class="text-[11px] text-stone-300 italic text-center py-4 border border-stone-100 rounded-xl bg-stone-50">지출 내역이 없습니다.</p>';
    return;
  }

  catListEl.innerHTML = cats.map(cat => {
    const amt = monthData.catTotals[cat];
    const pct = monthData.monthTotal > 0 ? Math.round((amt / monthData.monthTotal) * 100) : 0;
    return `
      <div class="bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl space-y-1.5">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-stone-700">${cat}</span>
          <span class="font-mono font-bold text-stone-800">${amt.toLocaleString()}원 <span class="text-[10px] text-stone-400 font-normal">(${pct}%)</span></span>
        </div>
        <div class="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
          <div class="bg-amber-500 h-1.5 rounded-full" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function openSetTotalBudgetModal() {
  const current = localStorage.getItem('mingle_monthly_budget_target') || '1000000';
  const val = prompt('이번 달 총 목표 예산 금액을 입력하세요 (숫자만):', current);
  if (val) {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num) && num >= 0) {
      localStorage.setItem('mingle_monthly_budget_target', num);
      renderAccountBookBudget();
      if (db) db.collection('account_book_settings').doc('master').set({ monthlyBudgetTarget: num }, { merge: true }).catch(console.error);
    }
  }
}

// ⚙️ [신규] 대분류 추가/삭제 완벽 지원 가계부 설정 모달
function getStoredCategories() {
  try {
    const saved = localStorage.getItem('mingle_expense_custom_cats');
    return saved ? JSON.parse(saved) : (window.DEFAULT_EXPENSE_CATS || {});
  } catch(e) { return window.DEFAULT_EXPENSE_CATS || {}; }
}

function saveStoredCategories(cats) {
  localStorage.setItem('mingle_expense_custom_cats', JSON.stringify(cats));
  if (typeof onExpenseMainCatChange === 'function') onExpenseMainCatChange();
  if (db) db.collection('account_book_settings').doc('master').set({ categories: cats }, { merge: true }).catch(console.error);
}

function openExpenseCategorySettingModal() {
  document.getElementById('modalExpenseCategorySetting').classList.remove('hidden');
  renderSettingMainCatTagList();
  renderSettingMainCatSelect();
}

function closeExpenseCategorySettingModal() {
  document.getElementById('modalExpenseCategorySetting').classList.add('hidden');
}

function renderSettingMainCatTagList() {
  const container = document.getElementById('settingMainCatTagList');
  if (!container) return;
  const cats = getStoredCategories();
  container.innerHTML = Object.keys(cats).map(m => `
    <span class="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded-lg text-[10px] font-bold shadow-2xs">
      ${m}
      <button onclick="deleteMainCategory('${m}')" class="text-amber-600 hover:text-rose-600 font-bold ml-1 text-xs">✕</button>
    </span>
  `).join('');
}

function addNewMainCategory() {
  const input = document.getElementById('settingNewMainCatInput');
  const val = input.value.trim();
  if (!val) return;
  const cats = getStoredCategories();
  if (!cats[val]) {
    cats[val] = ['기타']; // 대분류 생성 시 기본 소분류 1개 주입
    saveStoredCategories(cats);
    renderSettingMainCatTagList();
    renderSettingMainCatSelect();
  }
  input.value = '';
}

function deleteMainCategory(m) {
  if (!confirm(`대분류 [${m}]을(를) 정말 삭제할까요?\n(기존 지출 내역의 데이터는 유지됩니다)`)) return;
  const cats = getStoredCategories();
  delete cats[m];
  saveStoredCategories(cats);
  renderSettingMainCatTagList();
  renderSettingMainCatSelect();
}

function renderSettingMainCatSelect() {
  const sel = document.getElementById('settingMainCatSelect');
  if (!sel) return;
  const cats = getStoredCategories();
  sel.innerHTML = Object.keys(cats).map(m => `<option value="${m}">${m}</option>`).join('');
  renderSettingSubCats();
}

function renderSettingSubCats() {
  const sel = document.getElementById('settingMainCatSelect');
  const container = document.getElementById('settingSubCatTagList');
  if (!sel || !container) return;
  const subList = getStoredCategories()[sel.value] || [];

  container.innerHTML = subList.map((sub, idx) => `
    <span class="inline-flex items-center gap-1 bg-stone-100 text-stone-700 border border-stone-200 px-2 py-1 rounded-lg text-xs font-medium shadow-2xs">
      ${sub}
      <button onclick="deleteSubCat('${sel.value}', ${idx})" class="text-stone-400 hover:text-rose-500 font-bold ml-1 text-xs">✕</button>
    </span>
  `).join('');
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

// ==========================================
// 🧶 [15] 뜨개 쇼룸 (Knitting Showroom) - 수정/삭제/게이지 추가!
// ==========================================
function getKnitMaster() {
  return JSON.parse(localStorage.getItem('mingle_knitting_showroom') || '[]');
}

function saveKnitsToLocal(knits) {
  localStorage.setItem('mingle_knitting_showroom', JSON.stringify(knits));
  renderKnittingShowroom();
  if (db) db.collection('knitting_showroom').doc('master').set({ knits }, { merge: true }).catch(console.error);
}

function openKnitModal(id = null) {
  const modal = document.getElementById('knitModal');
  const titleInp = document.getElementById('knitInputTitle');
  const yarnInp = document.getElementById('knitInputYarn');
  const startInp = document.getElementById('knitInputStart');
  const endInp = document.getElementById('knitInputEnd');
  const progInp = document.getElementById('knitInputProgress');
  const idInp = document.getElementById('knitEditId');
  const delBtn = document.getElementById('knitDeleteBtn');

  if (id) {
    const item = getKnitMaster().find(k => String(k.id) === String(id));
    if (item) {
      titleInp.value = item.title || '';
      yarnInp.value = item.yarn || '';
      startInp.value = item.startDate || '';
      endInp.value = item.endDate || '';
      progInp.value = item.progress || '';
      idInp.value = id;
      delBtn.classList.remove('hidden');
    }
  } else {
    titleInp.value = '';
    yarnInp.value = '';
    startInp.value = typeof currentDate !== 'undefined' ? currentDate : '';
    endInp.value = '';
    progInp.value = '';
    idInp.value = '';
    delBtn.classList.add('hidden');
  }
  modal.classList.remove('hidden');
}

function closeKnitModal() {
  document.getElementById('knitModal').classList.add('hidden');
}

function saveKnitMaster() {
  const idInp = document.getElementById('knitEditId').value;
  const title = document.getElementById('knitInputTitle').value.trim();
  if (!title) return alert("작품명을 입력해주세요!");

  const yarnStr = document.getElementById('knitInputYarn').value.trim();
  const start = document.getElementById('knitInputStart').value;
  const end = document.getElementById('knitInputEnd').value;
  const prog = document.getElementById('knitInputProgress').value;

  let knits = getKnitMaster();
  const newData = {
    title,
    yarn: yarnStr,
    startDate: start,
    endDate: end,
    progress: prog,
    status: end ? '완성(FO) 🥳' : '뜨는 중 ⏳',
    updatedAt: Date.now()
  };

  if (idInp) {
    const idx = knits.findIndex(k => String(k.id) === String(idInp));
    if (idx > -1) knits[idx] = { ...knits[idx], ...newData };
  } else {
    knits.unshift({ id: Date.now(), ...newData, createdAt: Date.now() });
  }

  saveKnitsToLocal(knits);
  closeKnitModal();
}

function deleteKnitMaster() {
  if (!confirm("이 뜨개 작품을 삭제할까요?")) return;
  const idInp = document.getElementById('knitEditId').value;
  let knits = getKnitMaster();
  knits = knits.filter(k => String(k.id) !== String(idInp));
  saveKnitsToLocal(knits);
  closeKnitModal();
}

function renderKnittingShowroom() {
  const list = document.getElementById('knittingShowroomList');
  if (!list) return;
  const items = getKnitMaster();
  
  if (items.length === 0) {
    list.innerHTML = '<p class="text-xs text-rose-300 py-8 bg-rose-50/30 rounded-xl text-center border border-rose-100">등록된 뜨개 작품이 없어요 🧶</p>';
    return;
  }

  list.innerHTML = items.map(item => `
    <div onclick="openKnitModal('${item.id}')" class="p-3.5 rounded-xl bg-white border border-stone-200 text-xs space-y-2 cursor-pointer hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <span class="font-bold text-stone-800 text-sm">🧶 ${item.title}</span>
        <span class="text-[10px] bg-rose-50 border border-rose-200 text-rose-800 px-2 py-0.5 rounded font-bold">${item.status}</span>
      </div>
      <div class="text-[11px] text-stone-600 flex items-center gap-1 bg-stone-50 p-1.5 rounded-lg border border-stone-100">
        <span class="font-semibold text-stone-500">스펙</span> | <span>${item.yarn || '기록 없음'}</span>
      </div>
      <div class="flex justify-between items-end pt-1">
        <div class="text-[10px] text-stone-400 font-mono">📅 ${item.startDate || ''} ~ ${item.endDate || '진행중'}</div>
        ${!item.endDate && item.progress ? `<div class="text-[10px] font-mono text-rose-600 font-bold">${item.progress}%</div>` : ''}
      </div>
      ${!item.endDate && item.progress ? `
        <div class="w-full bg-rose-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-rose-500 h-full transition-all" style="width: ${item.progress}%"></div>
        </div>
      ` : ''}
    </div>
  `).join('');
}

// ==========================================
// 📚 [16] 독서 책장 모듈 (Google Books API & History)
// ==========================================
function getBooksMaster() {
  return JSON.parse(localStorage.getItem('mingle_books_data') || '[]');
}

function saveBooksMaster(data) {
  localStorage.setItem('mingle_books_data', JSON.stringify(data));
  if (typeof renderBookShelf === 'function') renderBookShelf();
  if (db) db.collection('drawer_book').doc('master').set({ books: data }).catch(console.error);
}

function openBookDetailModal() {
  const modal = document.getElementById('bookDetailModal');
  if (!modal) return;
  document.getElementById('bookEditId').value = '';
  document.getElementById('bookInputTitle').value = '';
  document.getElementById('bookInputAuthor').value = '';
  document.getElementById('bookInputTotalPage').value = '';
  document.getElementById('bookCoverUrl').value = '';
  
  if(document.getElementById('bookInputStartDate')) document.getElementById('bookInputStartDate').value = currentDate;
  if(document.getElementById('bookInputEndDate')) document.getElementById('bookInputEndDate').value = '';
  if(document.getElementById('bookInputReview')) document.getElementById('bookInputReview').value = '';

  const coverImg = document.getElementById('bookPreviewCover');
  if (coverImg) { coverImg.src = ''; coverImg.classList.add('hidden'); }
  document.getElementById('bookPreviewIcon')?.classList.remove('hidden');
  document.getElementById('bookPreviewText')?.classList.remove('hidden');
  
  modal.classList.remove('hidden');
}

function closeBookDetailModal() { document.getElementById('bookDetailModal').classList.add('hidden'); }

async function searchGoogleBooks() {
  const inputEl = document.getElementById('bookSearchKeyword');
  const query = inputEl ? inputEl.value.trim() : '';
  const container = document.getElementById('bookSearchResults');
  if (!container || !query) return;

  container.classList.remove('hidden');
  container.innerHTML = '<div class="p-2 text-center text-xs text-stone-400">도서 검색 중... 🔍</div>';

  try {
    let res = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query) + '&maxResults=5');
    let data = await res.json();

    if (!data.items || data.items.length === 0) {
      container.innerHTML = `<div class="p-2 text-center text-xs text-stone-500">결과가 없어요.<br><button onclick="applyDirectBookTitle('${query}')" class="mt-1 text-amber-600 font-bold underline">이름 직접 쓰기</button></div>`;
      return;
    }

    container.innerHTML = data.items.map(item => {
      const info = item.volumeInfo || {};
      const title = (info.title || '제목 없음').replace(/'/g, "\\'");
      const author = ((info.authors || []).join(', ') || '저자 미상').replace(/'/g, "\\'");
      const cover = info.imageLinks?.thumbnail ? info.imageLinks.thumbnail.replace('http:', 'https:') : '';
      return `
        <div onclick="selectGoogleBook('${title}', '${author}', '${cover}', ${info.pageCount || 0})" class="p-2 bg-white rounded flex items-center gap-2 cursor-pointer hover:bg-stone-50 border border-stone-200 mb-1">
          ${cover ? `<img src="${cover}" class="w-8 h-11 object-cover shadow-2xs">` : '<div class="w-8 h-11 bg-stone-100 flex items-center justify-center text-[10px] text-stone-400">No Img</div>'}
          <div class="min-w-0">
            <p class="font-bold text-xs truncate">${info.title}</p>
            <p class="text-[10px] text-stone-500 truncate">${author}</p>
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    container.innerHTML = '<div class="p-2 text-center text-xs text-rose-500">검색 에러 😢</div>';
  }
}

function applyDirectBookTitle(title) {
  document.getElementById('bookInputTitle').value = title;
  document.getElementById('bookSearchResults')?.classList.add('hidden');
}

function selectGoogleBook(title, author, cover, pageCount) {
  document.getElementById('bookInputTitle').value = title;
  document.getElementById('bookInputAuthor').value = author;
  document.getElementById('bookInputTotalPage').value = pageCount || '';
  document.getElementById('bookCoverUrl').value = cover;

  const coverImg = document.getElementById('bookPreviewCover');
  if (cover && coverImg) {
    coverImg.src = cover;
    coverImg.classList.remove('hidden');
    document.getElementById('bookPreviewIcon')?.classList.add('hidden');
    document.getElementById('bookPreviewText')?.classList.add('hidden');
  }
  document.getElementById('bookSearchResults')?.classList.add('hidden');
}

function saveBookMaster() {
  const title = document.getElementById('bookInputTitle')?.value.trim();
  if (!title) return alert('도서명을 입력해주세요!');

  const books = getBooksMaster();
  const bookData = {
    title,
    author: document.getElementById('bookInputAuthor')?.value.trim() || '',
    totalPage: parseInt(document.getElementById('bookInputTotalPage')?.value, 10) || 0,
    cover: document.getElementById('bookCoverUrl')?.value || '',
    status: document.getElementById('bookInputStatus')?.value || 'reading',
    startDate: document.getElementById('bookInputStartDate')?.value || '',
    endDate: document.getElementById('bookInputEndDate')?.value || '',
    rating: document.getElementById('bookInputRating')?.value || '5',
    review: document.getElementById('bookInputReview')?.value.trim() || ''
  };

  const editId = document.getElementById('bookEditId')?.value;
  if (editId) {
    const idx = books.findIndex(b => String(b.id) === String(editId));
    if (idx !== -1) books[idx] = { ...books[idx], ...bookData };
  } else {
    books.unshift({ id: Date.now(), currentPage: 0, ...bookData });
  }

  saveBooksMaster(books);
  closeBookDetailModal();
}

function openBookEditModal(id) {
  const book = getBooksMaster().find(b => String(b.id) === String(id));
  if (!book) return;
  openBookDetailModal();
  document.getElementById('bookEditId').value = id;
  document.getElementById('bookInputTitle').value = book.title || '';
  document.getElementById('bookInputAuthor').value = book.author || '';
  document.getElementById('bookInputTotalPage').value = book.totalPage || '';
  document.getElementById('bookCoverUrl').value = book.cover || '';
  document.getElementById('bookInputStatus').value = book.status || 'reading';
  document.getElementById('bookInputStartDate').value = book.startDate || '';
  document.getElementById('bookInputEndDate').value = book.endDate || '';
  document.getElementById('bookInputRating').value = book.rating || '5';
  document.getElementById('bookInputReview').value = book.review || '';

  const coverImg = document.getElementById('bookPreviewCover');
  if (book.cover && coverImg) {
    coverImg.src = book.cover;
    coverImg.classList.remove('hidden');
    document.getElementById('bookPreviewIcon')?.classList.add('hidden');
    document.getElementById('bookPreviewText')?.classList.add('hidden');
  }
}

function deleteCurrentBook() {
  const id = document.getElementById('bookEditId')?.value;
  if (!id || !confirm('책장에서 완전히 삭제할까요?')) return;
  let books = getBooksMaster();
  books = books.filter(b => String(b.id) !== String(id));
  saveBooksMaster(books);
  closeBookDetailModal();
}

// ⭐ 쩜오(0.5) 별점 계산 헬퍼 함수
function getRatingStars(rating) {
  const score = parseFloat(rating) || 5;
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 !== 0;
  return '⭐'.repeat(fullStars) + (hasHalf ? '✨' : '');
}

function renderBookShelf(filter = 'all') {
  const list = document.getElementById('bookshelfList');
  if (!list) return;
  const books = getBooksMaster();
  
  if (books.length === 0) {
    list.innerHTML = '<div class="p-6 text-center bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-400">등록된 도서가 없어요 📚</div>';
    return;
  }

  const badges = {
    reading: '<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] px-1.5 py-0.5 rounded font-bold">읽는 중</span>',
    completed: '<span class="bg-amber-50 text-amber-900 border border-amber-200 text-[9px] px-1.5 py-0.5 rounded font-bold">완독 🏆</span>',
    wish: '<span class="bg-stone-100 text-stone-600 border border-stone-200 text-[9px] px-1.5 py-0.5 rounded font-bold">위시 🔖</span>',
    stopped: '<span class="bg-rose-50 text-rose-800 border border-rose-200 text-[9px] px-1.5 py-0.5 rounded font-bold">중단</span>'
  };

  list.innerHTML = books.map(b => {
    return `
      <div onclick="openBookEditModal(${b.id})" class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex gap-3 mb-2">
        <img src="${b.cover || 'https://via.placeholder.com/60x85?text=Cover'}" class="w-12 h-16 object-cover rounded shadow-xs border border-stone-200 shrink-0">
        <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div class="flex items-center justify-between gap-1 mb-1">
              <h4 class="font-bold text-xs text-stone-800 truncate">${b.title}</h4>
              ${badges[b.status] || ''}
            </div>
            <p class="text-[10px] text-stone-500 truncate">${b.author || '저자 미상'}</p>
          </div>
          <div class="text-[10px] text-amber-500 mt-1.5 flex items-center justify-between">
            <span>${getRatingStars(b.rating)}</span>
            <span class="text-stone-400 font-mono">${b.startDate || ''} ~ ${b.endDate || ''}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
