// ==========================================
// 📁 js/drawer.js
// 【 서랍 】 탭 (가계부, 독서 책장, 뜨개 쇼룸) 로직
// ==========================================

function renderDrawerPage() {
  // 1. 💰 감성 가계부 렌더링
  const budgetContainer = document.getElementById('drawer-budget');
  if (budgetContainer) {
    budgetContainer.innerHTML = `
      <div class="budget-dashboard" style="background:#fff; padding:20px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05); margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
          <h3 style="font-size:18px; color:#4a4a4a; font-weight:700;">💸 10월 가계부</h3>
          <button onclick="openBudgetModal()" style="background:#8b6b4a; color:#fff; border:none; padding:8px 15px; border-radius:8px; cursor:pointer; font-weight:600;">+ 지출 기록</button>
        </div>
        
        <div class="budget-summary" style="background:#f9f9f9; padding:15px; border-radius:10px; margin-bottom:15px;">
          <p style="font-size:14px; color:#666; margin-bottom:5px;">이번 달 남은 생활비</p>
          <h2 style="color:#8b6b4a; font-size:24px; margin:0;">320,000 원</h2>
          <div style="margin-top:10px; font-size:12px; color:#888; display:flex; justify-content:space-between;">
            <span>총 예산: 500,000원</span>
            <button style="border:none; background:none; color:#999; text-decoration:underline; cursor:pointer;">예산 설정</button>
          </div>
        </div>

        <!-- 지출 캘린더 & 리스트 요약 뷰 -->
        <div style="text-align:center; color:#888; font-size:14px; padding:20px 10px; border:1px dashed #ddd; border-radius:10px;">
          여기에 소비 금액이 콕콕 찍히는 달력과<br>상세 지출 리스트가 들어갈 자리야! 🧾
        </div>
      </div>
    `;
  }

  // 2. 📚 독서 책장 렌더링 (북적북적 + 리더스)
  const bookContainer = document.getElementById('drawer-book');
  if (bookContainer) {
    bookContainer.innerHTML = `
      <div class="book-dashboard" style="background:#fff; padding:20px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
         <h3 style="font-size:16px; margin-bottom:15px; color:#555;">📚 나의 책장</h3>
         <div style="text-align:center; color:#888; font-size:14px; padding:20px 10px; border:1px dashed #ddd; border-radius:10px;">
            구글 도서 API 검색과 4대 상태 모달,<br>쪽수 자동 계산기가 들어갈 자리야! 📖
         </div>
      </div>
    `;
  }

  // 3. 🧶 뜨개 쇼룸 렌더링
  const knitContainer = document.getElementById('drawer-knit');
  if (knitContainer) {
    knitContainer.innerHTML = `
      <div class="knit-dashboard" style="background:#fff; padding:20px; border-radius:15px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
         <h3 style="font-size:16px; margin-bottom:15px; color:#555;">🧶 뜨개 쇼룸</h3>
         <div style="text-align:center; color:#888; font-size:14px; padding:20px 10px; border:1px dashed #ddd; border-radius:10px;">
            우리의 예쁜 뜨개 작품들이 전시될 자리야! 🧣
         </div>
      </div>
    `;
  }
}

// 가계부 지출 추가 모달 띄우기 (임시)
function openBudgetModal() {
  alert("예쁜 가계부 상세 입력 모달(카테고리, 결제수단 선택)이 뜰 거야! 💸");
}

// 페이지 로드 시 서랍장 화면 뼈대 그리기
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderDrawerPage();
  }, 500);
});
