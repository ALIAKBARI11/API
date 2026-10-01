import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { fetchAPI } from "../api.js";

async function Ads() {
  // Load ads from API
  try {
    const data = await fetchAPI("Api.json");

    const widgets = data.data.widgets;
    const topBanners = widgets.find(item => item.name === 'banners_home_web_zone_top');

    if (topBanners && topBanners.data) {
      const ads = topBanners.data.map((banner) => {
        const bannerUri = banner.url?.uri || "";
        const bannerUrl = bannerUri ? `https://www.digikala.com${bannerUri}` : "#";

        return `
          <div class="desktop:min-w-60 desktop:w-[24%] mobile:w-[45%] mobile:h-30 desktop:h-auto desktop:rounded-2xl mobile:rounded-lg overflow-hidden">
            <a href="${bannerUrl}" target="_blank">
              <img src="${banner.image}" alt="${banner.title}" title="${banner.title}" class="w-full h-full object-cover" />
            </a>
          </div>
        `;
      });

      const adsContainer = document.querySelector(".ads");
      if (adsContainer) {
        adsContainer.innerHTML = ads.join("");
      }
    }
  } catch (error) {
    console.error("Error loading ads:", error);
  }

  // Load ads2
  try {
    const data = await fetchAPI("Api.json");

    const widgets = data.data.widgets;
    const topSecondBanners = widgets.find(item => item.name === 'banners_home_web_zone_top_second');

    if (topSecondBanners && topSecondBanners.data) {
      const ads2 = topSecondBanners.data.map((banner) => {
        const bannerUri = banner.url?.uri || "";
        const bannerUrl = bannerUri ? `https://www.digikala.com${bannerUri}` : "#";

        return `
          <div class="desktop:min-w-60 desktop:w-[24%] mobile:w-[45%] mobile:h-30 desktop:h-auto desktop:rounded-2xl mobile:rounded-lg overflow-hidden">
            <a href="${bannerUrl}" target="_blank">
              <img src="${banner.image}" alt="${banner.title}" title="${banner.title}" class="w-full h-full object-cover" />
            </a>
          </div>
        `;
      });

      const ads2Container = document.querySelector(".ads2");
      if (ads2Container) {
        ads2Container.innerHTML = ads2.join("");
      }
    }
  } catch (error) {
    console.error("Error loading ads2:", error);
  }

  // Countdown timer
  let secondsEl = document.querySelectorAll(".second");
  let minutesEl = document.querySelectorAll(".minute");
  let hoursEl = document.querySelectorAll(".hour");

  function updateCountdown() {
    let now = new Date();
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    let diff = Math.floor((midnight - now) / 1000);

    if (diff <= 0) {
      midnight.setDate(midnight.getDate() + 1);
      diff = Math.floor((midnight - now) / 1000);
    }

    let hours = Math.floor(diff / 3600);
    let minutes = Math.floor((diff % 3600) / 60);
    let seconds = diff % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    hoursEl.forEach((el) => (el.textContent = hours));
    minutesEl.forEach((el) => (el.textContent = minutes));
    secondsEl.forEach((el) => (el.textContent = seconds));
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Inc swiper initialization
  new Swiper(".inc-swiper", {
    modules: [Navigation],
    slidesPerView: "auto",
    spaceBetween: 2,
    navigation: {
      nextEl: ".inc-next",
      prevEl: ".inc-prev",
    },
  });
}

export default Ads;
