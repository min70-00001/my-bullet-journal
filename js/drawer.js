// ==========================================
// 📁 js/drawer.js
// 【 서랍 】 탭: 감성 가계부, 독서 책장, 뜨개 쇼룸 통합 로직
// ==========================================

// 1. 서랍장 내부 서브 탭 전환 및 초기 렌더링
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
  else if (type === 'book') renderBookShelf();
  else if (type === 'knit') renderKnittingShowroom();
}

// 2. 가계부 데이터 로드 및 로컬스토리지 연동
function getBudgetMaster() {
  const defaultData = {
    totalBudget: 500000,
    categories: ['고정지출', '생활비', '교통비', '식비', '쇼핑/취미', '기타'],
    paymentMethods: ['현대카드', '국민카드', '네이버페이', '현금'],
    expenses: [] // { id, date, amount, category, payment, memo }
  };
  return JSON.parse(localStorage.getItem('mingle_budget_data') || JSON.stringify(defaultData));
}

function saveBudgetMaster(data) {
  localStorage.setItem('mingle_budget_data', JSON.stringify(data));
  renderBudgetDashboard();
  if (db) db.collection('drawer_budget').doc('master').set(data).catch(console.error);
}

// 3. 가계부 대시보드 및 잔액 계산 (매월 1일 생활비 리셋 구조 반영)
function renderBudgetDashboard() {
  const container = document.getElementById('budgetList');
  const remainingEl = document.getElementById('budgetRemainingAmount');
  if (!container) return;

  const budgetData = getBudgetMaster();
  const currentMonthStr = currentDate.slice(0, 7); // "2026-10"

  // 이번 달 지출 내역만 필터링
  const monthExpenses = budgetData.expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));
  monthExpenses.sort((a, b) => b.date.localeCompare(a.date));

  // 총 지출 계산
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

// 4. 가계부 지출 상세 입력 모달 띄우기
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
          <div>
            <label class="text-[10px] text-stone-500 block mb-1">지출 금액 (원)</label>
            <input type="number" id="budgetItemAmount" placeholder="예: 15000" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-400">
          </div>

          <div>
            <label class="text-[10px] text-stone-500 block mb-1">지출 카테고리</label>
            <select id="budgetItemCategory" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">
              ${budgetData.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="text-[10px] text-stone-500 block mb-1">결제 수단</label>
            <select id="budgetItemPayment" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700 cursor-pointer">
              ${budgetData.paymentMethods.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-stone-500 block mb-1">지출 일자</label>
              <input type="date" id="budgetItemDate" value="${currentDate}" class="w-full bg-stone-50 border border-stone-200 rounded-xl p-1.5 text-[11px]">
            </div>
            <div>
              <label class="text-[10px] text-stone-500 block mb-1">사용처 / 메모</label>
              <input type="text" id="budgetItemMemo" placeholder="예: 스타벅스 라떼" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs">
            </div>
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveExpense()" class="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs rounded-xl transition-colors">지출 저장</button>
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
    alert("금액과 지출 일자를 올바르게 입력해주세요!");
    return;
  }

  const budgetData = getBudgetMaster();
  budgetData.expenses.push({
    id: Date.now(),
    amount: parseFloat(amount),
    category,
    payment,
    date,
    memo: memo || category
  });

  saveBudgetMaster(budgetData);
  closeBudgetModal();
  alert("✨ 지출 내역이 가계부에 쏙 저장되었어요!");
}

function deleteExpenseItem(id) {
  if (!confirm("이 지출 내역을 삭제할까요?")) return;
  const budgetData = getBudgetMaster();
  budgetData.expenses = budgetData.expenses.filter(e => e.id !== id);
  saveBudgetMaster(budgetData);
}

// 5. 월별 총 예산 세팅 모달
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
          <h3 class="text-xs font-bold text-stone-800 flex items-center gap-1.5"><span>⚙️</span> 월별 총 예산 설정</h3>
          <button onclick="closeBudgetModal()" class="text-stone-400 hover:text-stone-600 font-bold text-sm">✕</button>
        </div>

        <div class="space-y-2 text-xs">
          <div>
            <label class="text-[10px] text-stone-500 block mb-1">이번 달 목표 총 예산 (원)</label>
            <input type="number" id="settingTotalBudget" value="${budgetData.totalBudget}" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none">
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <button onclick="confirmSaveBudgetSetting()" class="flex-1 py-2 bg-stone-800 text-white font-bold text-xs rounded-xl">설정 저장</button>
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
  alert("✨ 예산 설정이 변경되었습니다!");
}
