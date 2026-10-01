import { fetchAPI } from "../api.js";

async function Options() {
  try {
    const data = await fetchAPI("recommendation.json");

    if (data.status === 200 && data.data.categories) {
      const categories = data.data.categories;

      // First 4 categories for options2
      const options2Html = categories.slice(0, 4).map((category) => {
        const products = category.products || [];
        const images = products.slice(0, 4).map((product, index, arr) => {
          const imageUrl = product.images?.main?.webp_url?.[0] || product.images?.main?.url?.[0] || '';
          const productUri = product.url?.uri || "";
          const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";
          const isFirst = index === 0;
          const isLast = index === arr.length - 1;

          return `
            <div class="w-[50%] h-35 flex justify-center items-center ${isFirst ? "border-l border-b border-[#f0f0f1]" : ""} ${isLast ? "border-r border-t border-[#f0f0f1]" : ""}">
              <a href="${productUrl}" target="_blank" class="w-full h-full flex justify-center items-center">
                <img src="${imageUrl}" alt="${product.title_fa || ''}" class="w-[80%] object-contain" />
              </a>
            </div>
          `;
        }).join("");

        const categoryUrl = `https://www.digikala.com${category.url?.uri || ''}`;

        return `
          <div class="w-[25%] min-h-[300px] border-l border-[#f0f0f1] p-4 flex flex-col justify-between items-start">
            <div class="w-full flex flex-col gap-1">
              <h3 class="font-Iran text-[16px] text-[#23254e] font-semibold">${category.title}</h3>
              <span class="font-Iran text-[11px] text-[#b1b3b8]">${category.description || ""}</span>
            </div>

            <div class="w-full flex flex-wrap items-center mt-3">
              ${images}
            </div>

            <a href="${categoryUrl}" target="_blank" class="w-full flex justify-center items-center gap-1 mt-3 font-Iran text-[16px] text-[#19bfd3]">
              مشاهده
              <img src="./src/img/blueleftsmall.svg" alt="" class="w-6">
            </a>
          </div>
        `;
      });

      const options2Container = document.querySelector(".options2");
      if (options2Container) {
        options2Container.innerHTML = options2Html.join("");
      }

      // Next 4 categories for options
      const optionsHtml = categories.slice(4, 8).map((category) => {
        const products = category.products || [];
        const images = products.slice(0, 4).map((product, index, arr) => {
          const imageUrl = product.images?.main?.webp_url?.[0] || product.images?.main?.url?.[0] || '';
          const productUri = product.url?.uri || "";
          const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";
          const isFirst = index === 0;
          const isLast = index === arr.length - 1;

          return `
            <div class="w-[50%] h-35 flex justify-center items-center ${isFirst ? "border-l border-b border-[#f0f0f1]" : ""} ${isLast ? "border-r border-t border-[#f0f0f1]" : ""}">
              <a href="${productUrl}" target="_blank" class="w-full h-full flex justify-center items-center">
                <img src="${imageUrl}" alt="${product.title_fa || ''}" class="w-[80%] object-contain" />
              </a>
            </div>
          `;
        }).join("");

        const categoryUrl = `https://www.digikala.com${category.url?.uri || ''}`;

        return `
          <div class="w-[25%] min-h-[300px] border-l border-[#f0f0f1] p-4 flex flex-col justify-between items-start">
            <div class="w-full flex flex-col gap-1">
              <h3 class="font-Iran text-[16px] text-[#23254e] font-semibold">${category.title}</h3>
              <span class="font-Iran text-[11px] text-[#b1b3b8]">${category.description || ""}</span>
            </div>

            <div class="w-full flex flex-wrap items-center mt-3">
              ${images}
            </div>

            <a href="${categoryUrl}" target="_blank" class="w-full flex justify-center items-center gap-1 mt-3 font-Iran text-[16px] text-[#19bfd3]">
              مشاهده
              <img src="./src/img/blueleftsmall.svg" alt="" class="w-6">
            </a>
          </div>
        `;
      });

      const optionsContainer = document.querySelector(".options");
      if (optionsContainer) {
        optionsContainer.innerHTML = optionsHtml.join("");
      }
    }
  } catch (error) {
    console.error("Error loading options:", error);
  }
}

export default Options;

