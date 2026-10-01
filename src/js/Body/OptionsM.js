import { fetchAPI } from "../api.js";

function makeOptionCards(products) {
  const cards = products.map((product) => {
    const imageUrl = product.images?.main?.webp_url?.[0] || product.images?.main?.url?.[0] || "";
    const title = product.title_fa || "";
    const sellingPrice = product.default_variant?.price?.selling_price || 0;
    const rrpPrice = product.default_variant?.price?.rrp_price || 0;
    const discountPercent = product.default_variant?.price?.discount_percent || 0;
    const productUri = product.url?.uri || "";
    const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";

    const formattedSellingPrice = Math.floor(sellingPrice / 10).toLocaleString('fa-IR');
    const formattedRrpPrice = Math.floor(rrpPrice / 10).toLocaleString('fa-IR');

    return `
      <a href="${productUrl}" target="_blank" class="w-[170px] h-[280px] bg-white border border-[#e0e0e2] rounded-lg flex flex-col justify-start items-center gap-2 shrink-0">
        <div class="bg-[#f0f0f1] w-full p-2">
          <img src="${imageUrl}" alt="${title}" class="w-full h-[130px] object-cover mix-blend-multiply" />
        </div>
        <div class="w-full p-2 flex flex-col justify-start items-start gap-2">
          <div class="w-full flex flex-col justify-start items-start gap-1">
            <p class="font-Iran text-[14px] text-[#3f4064] line-clamp-2">${title}</p>
          </div>
          <div class="w-full flex flex-col justify-center items-center gap-1">
            <div class="w-full flex justify-start items-center gap-2">
              <span class="font-number text-white bg-[#d32f2f] rounded-full px-3 py-0.5 text-[12px] ${discountPercent ? "block" : "hidden"}">${discountPercent}٪</span>
              <span class="font-number text-[#b4b6ba] text-[12px] line-through ${rrpPrice ? "block" : "hidden"}">${formattedRrpPrice}</span>
            </div>
            <div class="w-full flex justify-start items-center gap-1">
              <span class="font-number text-[22px] text-[#3f4064] font-bold">${formattedSellingPrice}</span>
              <img src="./src/img/inc/toman.svg" alt="" class="w-4" />
            </div>
          </div>
        </div>
      </a>
    `;
  });

  const lastSlide = `
    <div class="bg-white w-[170px] h-[270px] flex flex-col justify-center items-center gap-2">
      <div class="p-2 flex justify-center items-center border-2 border-black rounded-full">
        <img src="./src/img/leftgraybig.svg" alt="" class="w-6" />
      </div>
      <span class="font-Iran text-[14px] text-[#574a6d] leading-6 my-2">مشاهده همه</span>
    </div>
  `;

  return cards.join("") + lastSlide;
}

async function OptionsM() {
  try {
    const data = await fetchAPI("recommendation.json");

    if (data.status === 200 && data.data.categories) {
      const categories = data.data.categories;

      // Map each category to its mobile section
      const sections = [
        { className: ".optionsM1", categoryIndex: 0 },
        { className: ".optionsM2", categoryIndex: 1 },
        { className: ".optionsM3", categoryIndex: 2 },
        { className: ".optionsM4", categoryIndex: 3 },
        { className: ".optionsM5", categoryIndex: 4 },
        { className: ".optionsM6", categoryIndex: 5 },
        { className: ".optionsM7", categoryIndex: 6 },
        { className: ".optionsM8", categoryIndex: 7 },
      ];

      sections.forEach((section) => {
        const category = categories[section.categoryIndex];
        if (category && category.products) {
          const el = document.querySelector(section.className);
          if (el) {
            el.innerHTML = makeOptionCards(category.products.slice(0, 10));
          }
        }
      });
    }
  } catch (error) {
    console.error("Error loading mobile options:", error);
  }
}

export default OptionsM;
