import { fetchAPI } from "../api.js";

async function chosen() {
  try {
    const data = await fetchAPI("selling-and-sales.json");

    if (!data.data || !data.data.products) {
      console.error("Chosen products not found");
      return;
    }

    // Show 18 products (3 rows × 6 columns)
    const products = data.data.products.slice(0, 18);

    const chosen = products.map((product) => {
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
        <div class="h-[286px] border-l border-b border-[#f0f0f1] px-2 pt-2 pb-3 flex flex-col justify-between items-start" dir="rtl">
          <a href="${productUrl}" target="_blank" class="w-full h-[182px] flex justify-center items-center">
            <img src="${imageUrl}" alt="${title}" class="max-h-full w-[78%] object-contain" />
          </a>
          <div class="w-full flex flex-col gap-1">
            <div class="w-full flex justify-between items-end">
              <span class="font-number text-white bg-[#d32f2f] rounded-full min-w-10 h-6 px-2 text-[14px] leading-6 text-center ${discountPercent ? "block" : "hidden"}">${discountPercent}٪</span>
              <div class="flex justify-end items-end gap-1">
                <span class="font-number text-[18px] leading-none text-[#2f2f56] font-bold">${formattedSellingPrice}</span>
                <img src="./src/img/inc/toman.svg" alt="" class="w-5">             
              </div>
            </div>
            <span class="font-number text-[13px] text-[#c7c9ce] line-through self-end ml-6 ${rrpPrice ? "block" : "hidden"}">${formattedRrpPrice}</span>
          </div>
        </div>
      `;
    });

    const chosenContainer = document.querySelector(".chosen-items");
    if (chosenContainer) {
      chosenContainer.innerHTML = chosen.join("");
    }
  } catch (error) {
    console.error("Error loading chosen products:", error);
  }
}

export default chosen;

