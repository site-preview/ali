// ============================
// ローディング
// ============================

window.addEventListener("load", () => {

  const loading = document.getElementById("loading");
  if (!loading) return;

  setTimeout(() => {

    loading.classList.add("loaded");
    document.body.classList.add("loaded");

    setTimeout(() => {
      loading.style.display = "none";
    }, 1200);

  }, 2000);

});


// ============================
// アニメーション管理
// ============================

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const el = entry.target;

      // ============================
      // スパークル
      // ============================

      if (el.classList.contains("video-item")) {

        el.classList.add("sparkle-active");

        setTimeout(() => {
          el.classList.remove("sparkle-active");
        }, 900);

      }


      // ============================
      // SNS集合
      // ============================

      if (el.classList.contains("sns-ellipse")) {

        el.classList.add("active");

      }


      // ============================
      // メンバー画像
      // ============================

      if (el.classList.contains("main-img") || el.classList.contains("sub-img")) {

        el.classList.add("active");

        if (el.classList.contains("sub-img")) {

          setTimeout(() => {
            el.classList.add("float");
          }, 800);

        }

      }


      // ============================
      // MELtyタイトル
      // ============================

      if (el.classList.contains("title-aboutme")) {

        el.classList.add("show");

      }

      observer.unobserve(el);

    });

  }, { threshold: 0.3 });

    // ============================
  // ハンバーガーメニュー
  // ============================

  const hamburger = document.getElementById("hamburger");
  const navList = document.querySelector(".nav-list");

  if (hamburger && navList) {

    hamburger.addEventListener("click", () => {

      navList.classList.toggle("active");

    });

  }


// ============================
// Observer登録
// ============================

document.querySelectorAll(
  ".video-item, .sns-ellipse, .main-img, .sub-img"
).forEach(el => observer.observe(el));


// MELtyタイトルはローディング後に登録
window.addEventListener("load", () => {

  setTimeout(() => {

    document.querySelectorAll(".title-aboutme")
      .forEach(el => observer.observe(el));

  }, 2300);

});

  // ============================
  // タイトル文字アニメ
  // ============================

  const titles = document.querySelectorAll(".animate-title");

  titles.forEach(title => {

    const text = title.textContent.trim();
    title.textContent = "";

    text.split("").forEach((char, i) => {

      const span = document.createElement("span");
      span.textContent = char;

      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      span.style.transition = "0.6s ease";
      span.style.transitionDelay = i * 0.05 + "s";

      title.appendChild(span);

    });

    const titleObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.querySelectorAll("span").forEach(span => {

            span.style.opacity = "1";
            span.style.transform = "translateY(0)";

          });

        }

      });

    }, { threshold: 0.6 });

    titleObserver.observe(title);

  });
    

  /* ============================
     キービジュアルスライダー（ali）
     ============================ */

  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  // スライダーが存在しないページでは動かさない（エラー防止）
  if (slides && dots.length > 0 && prevBtn && nextBtn) {

    let currentIndex = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = Number(e.target.dataset.index);
        goToSlide(index);
      });
    });

    // 自動スライド（3秒）
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3000);
  }

  /* ============================
     キービジュアルここまで
     ============================ */

});
