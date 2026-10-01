import { fetchAPI } from "../api.js";

async function Amazing() {
  try {
    const data = await fetchAPI("Api.json");

    const freshWidget = data.data.widgets.find(
      (widget) => widget.type === "fresh_shortcut"
    );

    if (!freshWidget) return;

    const freshData = freshWidget.data;
    const products = freshData.products.slice(0, 6);

    const amazing = products.map((product) => {
      const imageUrl = product.images?.main?.url?.[0] || "";
      const discountPercent = product.default_variant?.price?.discount_percent || 0;
      const productUri = product.url?.uri || "";
      const productUrl = productUri ? `https://www.digikala.com${productUri}` : "#";

      return `
        <div class="w-20 h-20 relative bg-white rounded-full flex justify-center items-center">
          <a href="${productUrl}" target="_blank" class="w-full h-full flex justify-center items-center">
            <img src="${imageUrl}" alt="" class="rounded-full w-[80%]">
          </a>
          <div class="absolute rounded-full bg-[#d32f2f] font-number text-[14px] px-1.5 py-0.5 text-white bottom-0 right-0">${discountPercent}٪</div>
        </div>
      `;
    });

    const amazingContainer = document.querySelector(".amazing-items");
    if (amazingContainer) {
      amazingContainer.innerHTML = amazing.join("");
    }
  } catch (error) {
    console.error("Error loading amazing products:", error);
  }
}

export default Amazing;
