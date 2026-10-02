// ==========================================
// 📁 js/day.js
// 【 오늘 】 탭 (데일리, 식단, OOTD, 타임테이블) 및【 습관 】 탭 연동 로직
// ==========================================

// 1. 한국 시간(KST) 기준 오늘 날짜 문자열 생성기 (자정 갱신 패치!)
function getLocalTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 2. 오늘의 할 일 추가 및 관리
function getTodayTasksLocal(dateStr) {
  const all = JSON.parse(localStorage.getItem('mingle_today_tasks') || '{}');
  return all[dateStr] || [];
}

function saveTodayTasksLocal(dateStr, tasks) {
  const all = JSON.parse(localStorage.getItem('mingle_today_tasks') || '{}');
  all[dateStr] = tasks;
  localStorage.setItem('mingle_today_tasks', JSON.stringify(all));
}

function addTodayTask() {
  const input = document.getElementById('newTodayTaskInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const tasks = getTodayTasksLocal(currentDate);
  tasks.push({ id: Date.now(), text, done: false });
  input.value = '';
  saveTodayTasksLocal(currentDate, tasks);
  renderTodayTasks(tasks);

  if (db) {
    db.collection('today_tasks').doc(currentDate).set({ tasks }).catch(console.error);
  }
}

function toggleTodayTask(idx) {
  const tasks = getTodayTasksLocal(currentDate);
  if (tasks[idx]) {
    tasks[idx].done = !tasks[idx].done;
    saveTodayTasksLocal(currentDate, tasks);
    renderTodayTasks(tasks);
    if (db) db.collection('today_tasks').doc(currentDate).set({ tasks }).catch(console.error);
  }
}

function deleteTodayTask(idx) {
  const tasks = getTodayTasksLocal(currentDate);
  tasks.splice(idx, 1);
  saveTodayTasksLocal(currentDate, tasks);
  renderTodayTasks(tasks);
  if (db) db.collection('today_tasks').doc(currentDate).set({ tasks }).catch(console.error);
}

function renderTodayTasks(tasks) {
  const list = document.getElementById('todayTaskList');
  const countEl = document.getElementById('todayTaskCount');
  if (!list) return;

  if (countEl) countEl.innerText = `${tasks.length}건`;

  if (tasks.length === 0) {
    list.innerHTML = `<p class="text-[11px] text-stone-300 py-2 text-center">오늘 꼭 해야 할 일을 기록해보세요 ✍️</p>`;
    return;
  }

  list.innerHTML = tasks.map((t, idx) => `
    <div class="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-100 text-xs">
      <label class="flex items-center gap-2 flex-1 cursor-pointer min-w-0 pr-1">
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodayTask(${idx})" class="rounded text-amber-500">
        <span class="${t.done ? 'line-through text-stone-300' : 'text-stone-700 font-medium'} truncate">${t.text}</span>
      </label>
      <button onclick="deleteTodayTask(${idx})" class="text-stone-300 hover:text-stone-500 px-1 text-xs shrink-0">✕</button>
    </div>
  `).join('');
}

// 3. 🚨 [버그 패치] 파이어베이스에서 데일리 데이터 불러오기 (어제 데이터 상속 방지!)
function subscribeTodayTasks(dateStr) {
  const localTasks = getTodayTasksLocal(dateStr);
  renderTodayTasks(localTasks);

  if (!db) return;
  db.collection('today_tasks').doc(dateStr).get().then(doc => {
    if (doc.exists) {
      const tasks = doc.data().tasks || [];
      saveTodayTasksLocal(dateStr, tasks);
      renderTodayTasks(tasks);
    } else {
      // 🚨 핵심: 오늘 데이터가 아예 없으면 빈 리스트로 깨끗하게 초기화!
      renderTodayTasks([]);
    }
  }).catch(console.error);
}
