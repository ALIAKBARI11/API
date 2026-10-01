import { fetchAPI } from "../api.js";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function toPersianNumber(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
}

async function Indemand() {
  try {
    const data = await fetchAPI("Api.json");

    const sellerWidget = data.data.widgets.find(
      (widget) => widget.type === "products_ordered"
    );

    if (!sellerWidget) {
      console.error("Indemand products not found");
      return;
    }

    const products = sellerWidget.data.products;
    let desktopSlides = "";

    for (let i = 0; i < products.length; i += 3) {
      const first = products[i];
      const second = products[i + 1];
      const third = products[i + 2];

      desktopSlides += `
        <div class="swiper-slide">
          <div class="w-full flex flex-col justify-start items-start py-2">
            ${first
          ? `
                <div class="w-full h-[120px] cursor-pointer flex justify-between items-center gap-2 border-b border-[#f0f0f1] p-4">
                <a href="https://www.digikala.com${first.url?.uri || '#'}" target="_blank" class="w-16 h-16 flex justify-center items-center">
                  <img src="${first.images?.main?.webp_url?.[0] || first.images?.main?.url?.[0] || ''}" alt="${first.title_fa || ''}" class="w-16 h-16 object-contain rounded-md bg-[#f8f8f8]" />
                </a>
                <span class="font-number text-[36px] text-[#19bfd3] font-bold">${toPersianNumber(i + 1)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-6 text-right line-clamp-2 flex-1">${first.title_fa || ''}</p>
              </div>
            `
          : ""
        }
            ${second
          ? `
              <div class="w-full h-[120px] cursor-pointer flex justify-between items-center gap-2 border-b border-[#f0f0f1] p-4">
                <a href="https://www.digikala.com${second.url?.uri || '#'}" target="_blank" class="w-16 h-16 flex justify-center items-center">
                  <img src="${second.images?.main?.webp_url?.[0] || second.images?.main?.url?.[0] || ''}" alt="${second.title_fa || ''}" class="w-16 h-16 object-contain rounded-md bg-[#f8f8f8]" />
                </a>
                <span class="font-number text-[36px] text-[#19bfd3] font-bold">${toPersianNumber(i + 2)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-6 text-right line-clamp-2 flex-1">${second.title_fa || ''}</p>
              </div>
            `
          : ""
        }
            ${third
          ? `
              <div class="w-full h-[120px] cursor-pointer flex justify-between items-center gap-2 p-4">
                <a href="https://www.digikala.com${third.url?.uri || '#'}" target="_blank" class="w-16 h-16 flex justify-center items-center">
                  <img src="${third.images?.main?.webp_url?.[0] || third.images?.main?.url?.[0] || ''}" alt="${third.title_fa || ''}" class="w-16 h-16 object-contain rounded-md bg-[#f8f8f8]" />
                </a>
                <span class="font-number text-[36px] text-[#19bfd3] font-bold">${toPersianNumber(i + 3)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-6 text-right line-clamp-2 flex-1">${third.title_fa || ''}</p>
              </div>
            `
          : ""
        }
          </div>
        </div>
      `;
    }

    const indemandWrapper = document.querySelector(".indemand-wrapper");
    if (indemandWrapper) {
      indemandWrapper.innerHTML = desktopSlides;
    }

    // Mobile version
    let mobileSlides = "";
    for (let i = 0; i < products.length; i += 3) {
      const first = products[i];
      const second = products[i + 1];
      const third = products[i + 2];

      mobileSlides += `
        <div class="swiper-slide">
          <div class="w-full flex flex-col justify-start items-start gap-2">
            ${first
          ? `
              <a href="https://www.digikala.com${first.url?.uri || '#'}" target="_blank" class="w-full h-[100px] cursor-pointer flex justify-between items-center border border-[#e0e0e2] rounded-xl pl-2">
                <div class="h-full rounded-2xl overflow-hidden bg-[#f6f6f6] ml-4">
                  <img src="${first.images?.main?.webp_url?.[0] || first.images?.main?.url?.[0] || ''}" alt="${first.title_fa || ''}" class="h-full object-contain mix-blend-multiply" />
                </div>
                <span class="font-number text-white bg-[#ef4056] rounded-full min-w-8 h-8 flex justify-center items-center">${toPersianNumber(i + 1)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-7 text-right line-clamp-2 flex-1 px-2">${first.title_fa || ''}</p>
              </a>
            `
          : ""
        }
            ${second
          ? `
              <a href="https://www.digikala.com${second.url?.uri || '#'}" target="_blank" class="w-full h-[100px] flex justify-between cursor-pointer items-center border border-[#e0e0e2] rounded-xl pL-2">
                <div class="h-full rounded-2xl overflow-hidden bg-[#f6f6f6] ml-4">
                  <img src="${second.images?.main?.webp_url?.[0] || second.images?.main?.url?.[0] || ''}" alt="${second.title_fa || ''}" class="h-full object-contain mix-blend-multiply" />
                </div>
                <span class="font-number text-white bg-[#ef4056] rounded-full min-w-8 h-8 flex justify-center items-center">${toPersianNumber(i + 2)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-7 text-right line-clamp-2 flex-1 px-2">${second.title_fa || ''}</p>
              </a>
            `
          : ""
        }
            ${third
          ? `
              <a href="https://www.digikala.com${third.url?.uri || '#'}" target="_blank" class="w-full h-[100px] flex justify-between items-center cursor-pointer border border-[#e0e0e2] rounded-xl pl-2">
                <div class="h-full rounded-2xl overflow-hidden bg-[#f6f6f6] ml-4">
                  <img src="${third.images?.main?.webp_url?.[0] || third.images?.main?.url?.[0] || ''}" alt="${third.title_fa || ''}" class="h-full object-contain mix-blend-multiply" />
                </div>
                <span class="font-number text-white bg-[#ef4056] rounded-full min-w-8 h-8 flex justify-center items-center">${toPersianNumber(i + 3)}</span>
                <p class="font-Iran text-[14px] text-[#3f4064] leading-7 text-right line-clamp-2 flex-1 px-2">${third.title_fa || ''}</p>
              </a>
            `
          : ""
        }
          </div>
        </div>
      `;
    }

    const indemandMobileWrapper = document.querySelector(".indemand-mobile-wrapper");
    if (indemandMobileWrapper) {
      indemandMobileWrapper.innerHTML = mobileSlides;
    }
  } catch (error) {
    console.error("Error loading indemand products:", error);
  }

  new Swiper(".indemand-swiper", {
    modules: [Navigation],
    slidesPerView: 3.3,
    spaceBetween: 20,
    direction: 'horizontal',
    navigation: {
      nextEl: ".indemand-next",
      prevEl: ".indemand-prev",
    },
  });

  new Swiper(".indemand-mobile-swiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    direction: 'horizontal',
  });
}

export default Indemand;

