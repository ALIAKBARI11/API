import { fetchAPI } from "../api.js";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

async function Incredible() {
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

  // Load incredible products from API
  try {
    const data = await fetchAPI("Api.json");

    const wonderfullWidget = data.data.widgets.find(
      (widget) => widget.type === "products_cart"
    );

    if (!wonderfullWidget) return;

    const products = wonderfullWidget.data.products;

    // Desktop version
    let incSwiper = products.slice(0, 12).map((product, index) => {
      const imageUrl = product.images?.main?.url?.[0] || "";
      const title = product.title_fa || "";
      const sellingPrice = product.default_variant?.price?.selling_price || 0;
      const rrpPrice = product.default_variant?.price?.rrp_price || 0;
      const discountPercent = product.default_variant?.price?.discount_percent || 0;
      const productUri = product.url?.uri || "";
      const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";

      const formattedSellingPrice = Math.floor(sellingPrice / 10).toLocaleString('fa-IR');
      const formattedRrpPrice = Math.floor(rrpPrice / 10).toLocaleString('fa-IR');
      const isLast = index === 11;

      return `
        <div class="swiper-slide cursor-pointer ${isLast ? "rounded-tr-lg rounded-br-lg" : ""} overflow-hidden !w-[152px]">
          <a href="${productUrl}" target="_blank" class="w-full h-full flex flex-col bg-white justify-center items-center gap-1 p-2">
            <img src="${imageUrl}" alt="${title}" />
            <p class="font-Iran text-[#777b81] text-[12px] text-right w-full line-clamp-2">
              ${title}
            </p>
            <div class="flex justify-between items-start w-full">
              <div class="font-number text-[12px] font-bold text-white bg-[#d32f2f] px-1.5 py-0.5 rounded-full">
                ${discountPercent}٪
              </div>
              <div class="flex flex-col justify-center items-center">
                <div class="flex justify-center items-center gap-1">
                  <span class="font-number text-sm">${formattedSellingPrice}</span>
                  <img src="./src/img/inc/toman.svg" alt="">
                </div>
                <span class="font-number text-sm text-[#cdced1] line-through ml-4">
                  ${formattedRrpPrice}
                </span>
              </div>
            </div>
          </a>
        </div>
      `;
    });

    const lastSlide = `
      <div class="swiper-slide !w-[160px] pl-4">
        <div class="bg-white w-full h-[260px] rounded-tl-lg rounded-bl-lg flex flex-col justify-center items-center">
          <a href="https://www.digikala.com/incredible-offers/" target="_blank" class="flex flex-col justify-center items-center">
            <div class="p-2 rounded-full border-2 border-[#19bfd3]">
              <img src="./src/img/inc/blueleft.svg" alt="" />
            </div>
            <span class="font-Iran text-[14px] text-[#574a6d] leading-6 my-2">
              مشاهده همه
            </span>
          </a>
        </div>
      </div>
    `;

    const incWrapper = document.querySelector(".inc-wrapper");
    if (incWrapper) {
      incWrapper.innerHTML += incSwiper.join("") + lastSlide;
    }

    // Mobile version
    let amazingmobile = products.slice(0, 10).map((product, index) => {
      const imageUrl = product.images?.main?.url?.[0] || "";
      const title = product.title_fa || "";
      const sellingPrice = product.default_variant?.price?.selling_price || 0;
      const rrpPrice = product.default_variant?.price?.rrp_price || 0;
      const discountPercent = product.default_variant?.price?.discount_percent || 0;
      const productUri = product.url?.uri || "";
      const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";

      const formattedSellingPrice = Math.floor(sellingPrice / 10).toLocaleString('fa-IR');
      const formattedRrpPrice = Math.floor(rrpPrice / 10).toLocaleString('fa-IR');
      const isLast = index === 9;

      return `
        <div class="cursor-pointer shrink-0 ${isLast ? "rounded-tr-lg rounded-br-lg" : ""} h-60 overflow-hidden !w-[130px]">
          <a href="${productUrl}" target="_blank" class="w-full h-full flex flex-col bg-white justify-center items-center gap-1 p-2">
            <img src="${imageUrl}" alt="${title}" />
            <p class="font-Iran text-[#777b81] text-[12px] text-right w-full line-clamp-2 leading-6 text-black">
              ${title}
            </p>
            <div class="flex justify-between items-start w-full">
              <div class="font-number text-[12px] font-bold text-white bg-[#d32f2f] px-1.5 py-0.5 rounded-full">
                ${discountPercent}٪
              </div>
              <div class="flex flex-col justify-center items-center">
                <div class="flex justify-center items-center gap-1">
                  <span class="font-number text-sm">${formattedSellingPrice}</span>
                  <img src="./src/img/inc/toman.svg" alt="">
                </div>
                <span class="font-number text-sm text-[#cdced1] line-through ml-4">
                  ${formattedRrpPrice}
                </span>
              </div>
            </div>
          </a>
        </div>
      `;
    });

    const lastSlideMobile = `
      <div class="bg-white w-40 shrink-0 ml-4 h-60 rounded-tl-lg rounded-bl-lg flex flex-col justify-center items-center">
        <a href="https://www.digikala.com/incredible-offers/" target="_blank" class="flex flex-col justify-center items-center">
          <div class="p-2 rounded-full border-2 border-black">
            <img src="./src/img/inc/blackleft.svg" alt="" />
          </div>
          <span class="font-Iran text-[14px] text-[#574a6d] leading-6 my-2">
            مشاهده همه
          </span>
        </a>
      </div>
    `;

    const mobileWrapper = document.querySelector(".mobile-amazing-items");
    if (mobileWrapper) {
      mobileWrapper.innerHTML += amazingmobile.join("") + lastSlideMobile;
    }
  } catch (error) {
    console.error("Error loading incredible offers:", error);
  }
}

export default Incredible;