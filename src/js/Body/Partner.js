import { fetchAPI } from "../api.js";

async function Partner() {
  try {
    const data = await fetchAPI("Api.json");

    const middleBannerWidget = data.data.widgets.find(
      (widget) => widget.type === "simple_banner" && widget.name === "banners_home_web_zone_middle"
    );

    if (middleBannerWidget && middleBannerWidget.data && middleBannerWidget.data.length > 0) {
      const banners = middleBannerWidget.data;

      // Partnership section - Desktop: 2 banners, Mobile: 1 banner (Voche only)
      const partnerDesktop = banners.slice(0, 2).map((banner, index) => {
        const imageUrl = banner.webp_image || banner.image;
        const bannerUri = banner.url?.uri || "";
        const url = bannerUri ? `https://www.digikala.com${bannerUri}` : "#";
        const title = banner.title || "";

        return `
          <a href="${url}" target="_blank" class="desktop:block mobile:hidden desktop:rounded-2xl overflow-hidden cursor-pointer desktop:w-[49%]" title="${title}">
            <img src="${imageUrl}" alt="${title}" class="w-full object-cover">
          </a>
        `;
      });

      // Mobile: Only first banner (Voche)
      const partnerMobile = `
        <a href="https://www.digikala.com${banners[0].url?.uri || '#'}" target="_blank" class="mobile:block desktop:hidden w-[95%] border border-[#eaeaec] rounded-lg overflow-hidden cursor-pointer">
          <img src="${banners[0].webp_image || banners[0].image}" alt="${banners[0].title}" title="${banners[0].title}" class="w-full h-full object-cover" />
        </a>
      `;

      const partnershipContainer = document.querySelector(".partnership");
      if (partnershipContainer) {
        partnershipContainer.innerHTML = partnerDesktop.join("") + partnerMobile;
      }

      // Partnership2 section (next 2 banners if available)
      if (banners.length > 2) {
        const partner2 = banners.slice(2, 4).map((banner) => {
          const imageUrl = banner.webp_image || banner.image;
          const bannerUri = banner.url?.uri || "";
          const url = bannerUri ? `https://www.digikala.com${bannerUri}` : "#";
          const title = banner.title || "";

          return `
            <a href="${url}" target="_blank" class="rounded-2xl overflow-hidden cursor-pointer w-[49%]" title="${title}">
              <img src="${imageUrl}" alt="${title}" class="w-full object-cover">
            </a>
          `;
        });

        const partnership2Container = document.querySelector(".partnership2");
        if (partnership2Container) {
          partnership2Container.innerHTML = partner2.join("");
        }
      }

      // Mobile versions
      if (banners.length > 1) {
        const partnerMobile1 = `
          <a href="https://www.digikala.com${banners[1].url?.uri || '#'}" target="_blank" class="w-[95%] border border-[#eaeaec] rounded-lg overflow-hidden cursor-pointer block">
            <img src="${banners[1].webp_image || banners[1].image}" alt="${banners[1].title}" title="${banners[1].title}" class="w-full h-full object-cover" />
          </a>
        `;

        const partnerMobile1Container = document.querySelector(".partner-mobile-1");
        if (partnerMobile1Container) {
          partnerMobile1Container.innerHTML = partnerMobile1;
        }
      }

      if (banners.length > 2) {
        const partnerMobile2 = banners.slice(2, 4).map((banner) => {
          const imageUrl = banner.webp_image || banner.image;
          const bannerUri = banner.url?.uri || "";
          const url = bannerUri ? `https://www.digikala.com${bannerUri}` : "#";
          const title = banner.title || "";

          return `
            <a href="${url}" target="_blank" class="w-[95%] border border-[#eaeaec] rounded-lg overflow-hidden cursor-pointer">
              <img src="${imageUrl}" alt="${title}" title="${title}" class="w-full h-full object-cover" />
            </a>
          `;
        });

        const partnerMobile2Container = document.querySelector(".partner-mobile-2");
        if (partnerMobile2Container) {
          partnerMobile2Container.innerHTML = partnerMobile2.join("");
        }
      }
    }
  } catch (error) {
    console.error("Error loading partnership banners:", error);
  }
}

export default Partner;