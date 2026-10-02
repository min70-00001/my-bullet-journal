// ==========================================
// 📁 js/day.js
// 【 오늘 】 탭 (데일리, 식단, OOTD) 및 【 습관 】 탭 연동 로직
// ==========================================

// 1. 데일리 페이지 초기 렌더링 및 날짜 이동 로직
function renderTodayPage() {
  const container = document.getElementById('today-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="date-header" style="display:flex; justify-content:center; align-items:center; gap:20px; margin-bottom:20px;">
      <button onclick="changeDate(-1)" style="border:none; background:none; font-size:20px; cursor:pointer; color:#8b6b4a;">◀</button>
      <h2 style="color:#4a4a4a; font-weight:700;">${currentDate}</h2>
      <button onclick="changeDate(1)" style="border:none; background:none; font-size:20px; cursor:pointer; color:#8b6b4a;">▶</button>
    </div>
    
    <div class="daily-sections" style="display:flex; flex-direction:column; gap:15px;">
      <!-- 스마트 3대 트래커 (물, 걷기, 영양제) -->
      <div class="smart-tracker-box" style="background:#fff; padding:15px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
         <h3 style="font-size:16px; margin-bottom:10px; color:#555;">💧 오늘의 스마트 습관</h3>
         <div style="display:flex; gap:10px;">
           <button class="sub-tab-btn" onclick="toggleHabit('water')">물 마시기</button>
           <button class="sub-tab-btn" onclick="toggleHabit('walk')">식후 걷기</button>
           <button class="sub-tab-btn" onclick="toggleHabit('vitamin')">영양제</button>
         </div>
      </div>
      
      <!-- OOTD 슬림 입력창 -->
      <div class="ootd-box" style="background:#fff; padding:15px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
         <h3 style="font-size:16px; margin-bottom:10px; color:#555;">👗 OOTD</h3>
         <div style="display:flex; gap:10px;">
           <input type="text" id="ootd-input" placeholder="오늘의 착장을 기록해봐요!" style="flex:1; padding:10px; border:1px solid #ddd; border-radius:8px;">
           <button onclick="saveOOTD()" style="background:#8b6b4a; color:#fff; border:none; border-radius:8px; padding:0 15px; cursor:pointer;">저장</button>
         </div>
      </div>
    </div>
  `;
  
  // 날짜가 바뀔 때마다 파이어베이스에서 해당 날짜 데이터만 새로 불러오기
  loadDailyData(currentDate);
}

// 2. 날짜 변경 함수 (좌우 화살표 클릭 시)
function changeDate(days) {
  let d = new Date(currentDate);
  d.setDate(d.getDate() + days);
  currentDate = d.toISOString().split('T')[0];
  renderTodayPage();
}

// 3. 🚨 [버그 패치] 파이어베이스에서 데이터 불러오기 (어제 데이터 상속 방지!)
async function loadDailyData(dateStr) {
  try {
    const docRef = db.collection('diary_days').doc(dateStr);
    const docSnap = await docRef.get();
    
    const ootdInput = document.getElementById('ootd-input');
    
    if (docSnap.exists) {
      console.log(dateStr + " 데이터 불러오기 성공!");
      const data = docSnap.data();
      // 저장된 데이터가 있으면 화면에 채워넣기
      if(ootdInput && data.ootd) ootdInput.value = data.ootd;
    } else {
      console.log(dateStr + " 데이터가 없습니다. 깨끗한 하루를 시작하세요!");
      // 🚨 핵심 포인트: 오늘 데이터가 없으면 인풋창을 싹 비워줍니다!
      if(ootdInput) ootdInput.value = "";
    }
  } catch (error) {
    console.error("데이터 불러오기 에러:", error);
  }
}

// 4. OOTD 저장하기 (파이어베이스 연동)
async function saveOOTD() {
  const ootdValue = document.getElementById('ootd-input').value;
  try {
    await db.collection('diary_days').doc(currentDate).set({
      ootd: ootdValue
    }, { merge: true }); // 기존 데이터 덮어쓰지 않고 추가/수정만!
    alert("OOTD가 예쁘게 저장되었어!");
  } catch (error) {
    console.error("저장 에러:", error);
  }
}

// 임시 해빗 토글 알림 (나중에 트래커 연동)
function toggleHabit(type) {
  alert(type + " 체크 완료! (트래커 잔디밭에 콕 심어줄게 🌱)");
}

// 페이지 로드 시 첫 화면 그리기
window.addEventListener('DOMContentLoaded', () => {
  // index.html이 다 불려오면 1초 뒤에 렌더링 시작 (firebase 로딩 시간 확보)
  setTimeout(() => {
    renderTodayPage();
  }, 500);
});
