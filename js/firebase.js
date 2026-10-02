// ==========================================
// 📁 js/firebase.js
// 파이어베이스 연결 및 전역 공통 유틸리티
// ==========================================

// 1. 파이어베이스 연결 설정 (칭구의 찐 파이어베이스 키 적용 완료!)
const firebaseConfig = {
  apiKey: "AIzaSyAXwjdZmy6Ij62RVyKww9UUalgUynyBqaA",
  authDomain: "mingle-bullet-journal.firebaseapp.com",
  projectId: "mingle-bullet-journal",
  storageBucket: "mingle-bullet-journal.firebasestorage.app",
  messagingSenderId: "975275683110",
  appId: "1:975275683110:web:638400c7bdcdc0cd6f25e7",
  measurementId: "G-5TGYM6V8LQ"
};

// 2. 파이어베이스 초기화 및 데이터베이스(Firestore) 연결
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. 🚨 [버그 패치] 한국 시간(KST) 기준 오늘 날짜 생성기!
// 이제 자정 땡 치면 영국 시간 기다릴 필요 없이 바로 다음 날로 넘어갑니다.
function getLocalTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 앱 전체에서 사용할 오늘 날짜 전역 변수
const REAL_TODAY_STR = getLocalTodayStr();
let currentDate = REAL_TODAY_STR; // 달력이나 데일리에서 날짜 이동할 때 쓸 변수

console.log("🔥 파이어베이스 연결 및 날짜 세팅 완료! 오늘 날짜:", REAL_TODAY_STR);
