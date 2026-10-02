// ==========================================
// 📁 js/calendar.js
// 【 일정 】 탭 (달력 렌더링, 일정/기념일/예매 카드) 로직
// ==========================================

function changeCalMonth(delta) {
  calMonth += delta;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
  renderUpcomingEvents();
  renderTicketList();
  renderAnniversaries();
}

// 캘린더 타일: 고정 높이 3단 정방형 스탬프 렌더러
function renderCalendar() {
  const monthTitle = document.getElementById('calendarMonthTitle');
  if (monthTitle) monthTitle.innerText = `${calYear}년 ${calMonth + 1}월`;
  
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const lastDate = new Date(calYear, calMonth + 1, 0).getDate();
  const allDays = JSON.parse(localStorage.getItem('mingle_diary_days') || '{}');
  const anniversaries = JSON.parse(localStorage.getItem('mingle_anniversaries') || '[]');
  
  // 전역 함수나 안전 장치 호출
  const events = typeof getCalendarEvents === 'function' ? getCalendarEvents() : [];
  const tickets = typeof getTicketsLocal === 'function' ? getTicketsLocal() : [];

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div class="h-16 bg-stone-50/40 rounded-xl"></div>`;
  }

  for (let d = 1; d <= lastDate; d++) {
    const mStr = (calMonth + 1) < 10 ? `0${calMonth + 1}` : `${calMonth + 1}`;
    const dStr = d < 10 ? `0${d}` : `${d}`;
    const dateKey = `${calYear}-${mStr}-${dStr}`;
    const record = allDays[dateKey];

    const dayOfWeek = new Date(calYear, calMonth, d).getDay();
    const holidayName = typeof KR_HOLIDAYS !== 'undefined' ? (KR_HOLIDAYS[`${mStr}-${dStr}`] || KR_HOLIDAYS[dateKey]) : null;
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
    const moodIcon = record?.mood && typeof MOOD_META !== 'undefined' && MOOD_META[record.mood] ? MOOD_META[record.mood].icon : '';

    let eventStampIcons = '';
    if (holidayName) eventStampIcons += '<span class="text-[8px] bg-rose-100 text-rose-700 px-1 py-0.2 rounded font-bold">휴일</span>';
    if (hitAnni) eventStampIcons += '🎂';
    dayTickets.forEach(t => {
      const tIcon = t.type === 'bus' ? '🚌' : t.type === 'train' ? '🚅' : '✈️';
      eventStampIcons += `<span title="${t.depart}➔${t.arrive}">${tIcon}</span>`;
    });
    dayEvents.slice(0, 2).forEach(ev => {
      const catMeta = typeof EVENT_CATEGORIES !== 'undefined' ? (EVENT_CATEGORIES.find(c => c.key === ev.category) || EVENT_CATEGORIES[6]) : { icon: '📌' };
      eventStampIcons += `<span title="${ev.title}">${catMeta.icon}</span>`;
    });

    let activityIcons = '';
    if (record?.weather) {
      if (record.weather.includes('☀️')) activityIcons += '☀';
      else if (record.weather.includes('⛅')) activityIcons += '⛅';
      else if (record.weather.includes('🌧️')) activityIcons += '🌧️';
      else if (record.weather.includes('❄️')) activityIcons += '❄️';
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
          ${eventStampIcons || '<span class="text-[9px] text-stone-300">·</span>'}
        </div>
        <div class="flex items-center justify-between text-[8px] leading-none pt-0.5 border-t border-stone-100/60">
          <span class="truncate tracking-tighter">${activityIcons}</span>
          ${ootdDot}
        </div>
      </div>
    `;
  }
}
