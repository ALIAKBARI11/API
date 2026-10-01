import { fetchAPI } from "../api.js";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

async function Brands() {
  try {
    const data = await fetchAPI("Api.json");

    const brandsWidget = data.data.widgets.find(widget => widget.type === "popular_brands_grid");

    if (!brandsWidget || !brandsWidget.data || !brandsWidget.data.brands) {
      console.error("Brands data not found");
      return;
    }

    const brands = brandsWidget.data.brands;

    // Desktop brands
    const brandsDesktop = brands.map((brand) => {
      const logoUrl = brand.logo?.url?.[0] || "";
      const title = brand.title_fa || "";
      const brandUri = brand.url?.uri || "";
      const url = brandUri ? `https://www.digikala.com${brandUri}` : "#";

      return `
        <div class="swiper-slide !w-[135px]">
          <a href="${url}" target="_blank" title="${title}" class="w-full h-26 border-r border-[#f0f0f1] flex justify-center items-center px-2">
            <img src="${logoUrl}" alt="${title}" class="w-[85%] object-contain" />
          </a>
        </div>
      `;
    });

    document.querySelector(".brands-wrapper").innerHTML = brandsDesktop.join("");

    // Mobile brands
    const brandsMobile = brands.map((brand) => {
      const logoUrl = brand.logo?.url?.[0] || "";
      const title = brand.title_fa || "";
      const brandUri = brand.url?.uri || "";
      const url = brandUri ? `https://www.digikala.com${brandUri}` : "#";

      return `
        <a href="${url}" target="_blank" title="${title}" class="shrink-0 w-[80px] h-[100px] rounded-lg border border-[#e0e0e2] bg-[#f5f5f5] flex flex-col justify-center items-center gap-2 px-1">
          <img src="${logoUrl}" alt="${title}" class="w-[75%] object-contain mix-blend-multiply" />
          <span class="font-Iran text-[12px] text-[#3f4064] text-center w-full truncate">${title}</span>
        </a>
      `;
    });

    document.querySelector(".brands-mobile").innerHTML = brandsMobile.join("");
  } catch (error) {
    console.error("Error loading brands:", error);
  }

  new Swiper(".brands-swiper", {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
      nextEl: ".brands-next",
      prevEl: ".brands-prev",
    },
  });
}

export default Brands;
