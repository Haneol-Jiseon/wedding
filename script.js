
// 🔻날짜 기입
const WEDDING_YEAR = 2027;
const WEDDING_MONTH = 1;
const WEDDING_DAY = 24;

const WEDDING_HOUR = 11;
const WEDDING_MINUTE = 0;

const WEDDING_DATE = new Date(
  WEDDING_YEAR,
  WEDDING_MONTH - 1,
  WEDDING_DAY,
  WEDDING_HOUR,
  WEDDING_MINUTE,
  0
).getTime();

document.addEventListener("DOMContentLoaded", function () {
  renderCalendar();
  startCountdown();

  // 사진 확대 모달 좌우 스와이프
  const modalImg = document.getElementById("modal-img");
  if (modalImg) {
    let startX = 0;

    modalImg.addEventListener("touchstart", function (e) {
      if (e.touches && e.touches.length) {
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    modalImg.addEventListener("touchend", function (e) {
      if (!e.changedTouches || !e.changedTouches.length) return;

      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) changePhoto(1);
      if (endX - startX > 50) changePhoto(-1);
    }, { passive: true });
  }
});

function renderCalendar() {
  const monthTitle = document.getElementById("calendar-month");
  const calendarDays = document.getElementById("calendar-days");

  if (!monthTitle || !calendarDays) return;

  monthTitle.innerText =
    `${WEDDING_YEAR}. ${String(WEDDING_MONTH).padStart(2, "0")}`;

  calendarDays.innerHTML = "";

  const firstDay = new Date(
    WEDDING_YEAR,
    WEDDING_MONTH - 1,
    1
  ).getDay();

  const lastDate = new Date(
    WEDDING_YEAR,
    WEDDING_MONTH,
    0
  ).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptySpan = document.createElement("span");
    calendarDays.appendChild(emptySpan);
  }

  for (let day = 1; day <= lastDate; day++) {
    const daySpan = document.createElement("span");
    daySpan.innerText = day;

    if (day === WEDDING_DAY) {
      daySpan.classList.add("wedding-day");
    }

    calendarDays.appendChild(daySpan);
  }
}

function openEnvelope() {
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("main-content");
  const bgm = document.getElementById("bgm");

  if (!overlay || !mainContent) return;

  overlay.style.transition = "opacity 0.8s ease";
  overlay.style.opacity = "0";

  setTimeout(function () {
    overlay.style.display = "none";
    mainContent.style.display = "block";
    mainContent.classList.add("fade-in");

    window.scrollTo(0, 0);

    // 지도 오류가 청첩장 본문 표시를 방해하지 않도록 처리
    try {
      renderKakaoMap();
    } catch (error) {
      console.error("카카오맵 실행 오류:", error);
    }

    if (bgm) {
      bgm.play().catch(function () {});
    }
  }, 800);
}

function toggleBgm() {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("bgm-btn");

  if (!bgm || !btn) return;

  if (bgm.paused) {
    bgm.play().catch(function () {});
    btn.innerText = "🎵 Music On";
  } else {
    bgm.pause();
    btn.innerText = "🔇 Music Off";
  }
}

function startCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE - now;

  const ddayBadge = document.getElementById("dday-counter");
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minEl = document.getElementById("timer-min");
  const secEl = document.getElementById("timer-sec");

  if (!ddayBadge || !daysEl || !hoursEl || !minEl || !secEl) return;

  if (distance < 0) {
    ddayBadge.innerText = " ♡ 축하해주셔서 감사합니다 ♡ ";
    daysEl.innerText = "00";
    hoursEl.innerText = "00";
    minEl.innerText = "00";
    secEl.innerText = "00";
    return;
  }

  const today = new Date();

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const weddingDateOnly = new Date(
    WEDDING_YEAR,
    WEDDING_MONTH - 1,
    WEDDING_DAY
  );

  const days = Math.ceil(
    (weddingDateOnly - todayDate) / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  if (days === 0) {
    ddayBadge.innerText = "D-DAY";
  } else {
    ddayBadge.innerText = `D-${days}`;
  }

  daysEl.innerText = String(days).padStart(2, "0");
  hoursEl.innerText = String(hours).padStart(2, "0");
  minEl.innerText = String(minutes).padStart(2, "0");
  secEl.innerText = String(seconds).padStart(2, "0");
}

let currentIndex = 0;

// 🔻갤러리 사진 목록
const galleryImages = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg",
  "images/photo7.jpg",
  "images/photo8.jpg",
  "images/photo9.jpg",
  "images/photo10.jpg",
  "images/photo11.jpg",
  "images/photo12.jpg",
  "images/photo13.jpg",
  "images/photo14.jpg",
  "images/photo15.jpg",
  "images/photo16.jpg",
  "images/photo17.jpg",
  "images/photo18.jpg",
  "images/photo19.jpg",
  "images/photo20.jpg",
  "images/photo21.jpg",
  "images/photo22.jpg",
  "images/photo23.jpg",
  "images/photo24.jpg"
];

function openModal(index) {
  currentIndex = index;

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const counter = document.getElementById("modal-counter");

  if (!modal || !modalImg || !counter) return;

  modalImg.src = galleryImages[currentIndex];

  counter.innerText =
    (currentIndex + 1) + " / " + galleryImages.length;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("image-modal");

  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

function changePhoto(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  const modalImg = document.getElementById("modal-img");
  const counter = document.getElementById("modal-counter");

  if (modalImg) {
    modalImg.src = galleryImages[currentIndex];
  }

  if (counter) {
    counter.innerText =
      (currentIndex + 1) + " / " + galleryImages.length;
  }
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const arrow = button.querySelector(".arrow");

  if (!content || !arrow) return;

  const isOpen = content.style.display === "block";

  content.style.display = isOpen ? "none" : "block";
  arrow.innerText = isOpen ? "▼" : "▲";

  if (isOpen) {
    button.classList.remove("active");
  } else {
    button.classList.add("active");
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(function () {
      alert("계좌번호가 클립보드에 복사되었습니다.");
    })
    .catch(function () {
      alert("복사 실패! 계좌번호를 길게 눌러 직접 복사해주세요.");
    });
}

// 🔻카카오맵 중복 생성 방지 및 로딩 대기
let kakaoMapRendered = false;
let kakaoMapLoading = false;
let kakaoMapAttempts = 0;

function renderKakaoMap() {
  if (kakaoMapRendered || kakaoMapLoading) return;

  const mapContainer = document.getElementById(
    "daumRoughmapContainer1795349606636"
  );

  if (!mapContainer) return;

  // 카카오맵 로더가 준비될 때까지 재시도
  if (
    typeof daum === "undefined" ||
    !daum.roughmap ||
    !daum.roughmap.Lander
  ) {
    if (kakaoMapAttempts < 30) {
      kakaoMapAttempts += 1;
      setTimeout(renderKakaoMap, 300);
    } else {
      console.error("카카오맵 로더를 불러오지 못했습니다.");
    }

    return;
  }

  kakaoMapLoading = true;

  try {
    new daum.roughmap.Lander({
      timestamp: "1795349606636",
      key: "5gjnvu7r3yh",
      mapWidth: "100%",
      mapHeight: "280"
    }).render();

    kakaoMapRendered = true;
    mapContainer.dataset.mapRendered = "true";

  } catch (error) {
    kakaoMapLoading = false;
    console.error("카카오맵 생성 오류:", error);
  }
}

// 페이지 로딩 완료 후 인트로 로딩 표시 해제
window.addEventListener("load", function () {
  const intro = document.getElementById("intro-overlay");

  if (intro) {
    setTimeout(function () {
      intro.classList.remove("loading");
    }, 300);
  }
});
