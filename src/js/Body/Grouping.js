import { fetchAPI } from "../api.js";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

async function Grouping() {
  try {
    const data = await fetchAPI("Api.json");

    const categoriesWidget = data.data.widgets.find(widget => widget.type === "main_categories_grid");

    if (!categoriesWidget || !categoriesWidget.data || !categoriesWidget.data.categories) {
      console.error("Grouping categories not found");
      return;
    }

    const categories = categoriesWidget.data.categories;
    let grouping = "";

    for (let i = 0; i < categories.length; i += 2) {
      const first = categories[i];
      const second = categories[i + 1];

      grouping += `
        <div class="swiper-slide !w-[120px]">
          ${first
          ? `
            <div class="flex flex-col justify-between items-center w-full h-[200px] cursor-pointer">
              <a href="https://www.digikala.com${first.url?.uri || '#'}" target="_blank" class="flex flex-col justify-center items-center w-full gap-2">
                <img src="${first.image}" alt="${first.title}" class="w-25 h-25 object-contain">
                <span class="font-Iran text-[12px] text-center font-semibold">${first.title}</span>
              </a>
            </div>
          `
          : ""
        }

          ${second
          ? `
            <div class="flex flex-col justify-between items-center w-full h-[200px] cursor-pointer">
              <a href="https://www.digikala.com${second.url?.uri || '#'}" target="_blank" class="flex flex-col justify-center items-center w-full gap-2">
                <img src="${second.image}" alt="${second.title}" class="w-25 h-25 object-contain">
                <span class="font-Iran text-[12px] text-center font-semibold">${second.title}</span>
              </a>
            </div>
          `
          : ""
        }
        </div>
      `;
    }

    document.querySelector(".grouping-wrapper").innerHTML = grouping;

    // Mobile version
    let groupingMobile = "";
    for (let i = 0; i < categories.length; i += 2) {
      const first = categories[i];
      const second = categories[i + 1];

      groupingMobile += `
        <div class="flex flex-col gap-2 shrink-0 w-[90px]">
          ${first
          ? `
            <div class="flex flex-col justify-center items-center w-full cursor-pointer">
              <a href="https://www.digikala.com${first.url?.uri || '#'}" target="_blank" class="flex flex-col justify-center items-center w-full gap-1">
                <img src="${first.image}" alt="${first.title}" class="w-20 h-20 object-contain">
                <span class="font-Iran text-[10px] text-center">${first.title}</span>
              </a>
            </div>
          `
          : ""
        }

          ${second
          ? `
            <div class="flex flex-col justify-center items-center w-full cursor-pointer">
              <a href="https://www.digikala.com${second.url?.uri || '#'}" target="_blank" class="flex flex-col justify-center items-center w-full gap-1">
                <img src="${second.image}" alt="${second.title}" class="w-20 h-20 object-contain">
                <span class="font-Iran text-[10px] text-center">${second.title}</span>
              </a>
            </div>
          `
          : ""
        }
        </div>
      `;
    }

    const groupingMobileEl = document.querySelector(".grouping-mobile");
    if (groupingMobileEl) {
      groupingMobileEl.innerHTML = groupingMobile;
    }
  } catch (error) {
    console.error("Error loading grouping:", error);
  }

  new Swiper(".grouping-swiper", {
    modules: [Navigation],
    slidesPerView: 7.5,
    spaceBetween: 60,
    navigation: {
      nextEl: ".grouping-next",
      prevEl: ".grouping-prev",
    },
  });
}

export default Grouping;