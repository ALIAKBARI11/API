import { fetchAPI } from "../api.js";

async function List() {
  try {
    const data = await fetchAPI("Api.json");

    const deepLinksWidget = data.data.widgets.find(widget => widget.type === 'deep_links');

    if (!deepLinksWidget || !deepLinksWidget.data) {
      console.error("Categories data not found");
      return;
    }

    const categories = deepLinksWidget.data.slice(0, 8);

    const list = categories.map((category) => {
      const imageUrl = category.icon.webp_url?.[0] || category.icon.url?.[0] || '';
      const url = category.url.base
        ? `${category.url.base}${category.url.uri}`
        : `https://www.digikala.com${category.url.uri}`;

      return `
        <div class="flex flex-col w-20 justify-center items-center gap-1 h-30">
          <a href="${url}" target="_blank" class="flex flex-col justify-start items-center gap-1 h-full">
            <img src="${imageUrl}" alt="${category.title}" class="w-12" />
            <span class="w-16 font-Iran text-[12px] text-center leading-6">${category.title}</span>
          </a>
        </div>
      `;
    });

    document.querySelector(".list").innerHTML = list.join("");
  } catch (error) {
    console.error("Error loading list:", error);
  }

  // Modal lists remain using db.json
  try {
    const { getDB } = await import("../api.js");
    const res = await getDB();

    const list = res.listModal?.map((item) => {
      return `
        <div class="flex flex-col desktop:w-20 mobile:w-30 justify-center items-center gap-1 h-30">
          <a href="${item.link}" class="flex flex-col justify-start items-center gap-1 h-full">
            <img src="${item.icon}" alt="" class="w-12" />
            <span class="w-16 font-Iran text-[12px] text-center leading-6">${item.text}</span>
          </a>
        </div>
      `;
    }) || [];

    const listContainer = document.querySelector(".list-modal-container");
    if (listContainer) {
      listContainer.innerHTML = list.join("");
    }
  } catch (error) {
    console.log("Modal list:", error.message);
  }

  try {
    const { getDB } = await import("../api.js");
    const res = await getDB();

    const list = res.modalService?.map((item) => {
      return `
        <div class="flex justify-between items-start desktop:w-70 mobile:w-[98%] desktop:min-h-30 mobile:min-h-22 desktop:border border-[#eaeaec] mobile:border-b desktop:rounded-lg p-4 gap-2">
          <img src="${item.pic}" alt="" class="w-13" />
          <div class="flex flex-col justify-start desktop:w-50 mobile:w-full items-center gap-2">
            <div class="flex justify-between w-full items-center">
              <h3 class="font-Iran text-sm font-bold">${item.title}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; fill: #a1a3a8" width="24" height="24">
                <path fill-rule="evenodd" d="M11.293 19.707l1.414-1.414L7.414 13H20v-2H7.414l5.293-5.293-1.414-1.414-7 7a1 1 0 000 1.414l7 7z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="font-Iran text-xs text-[#666] leading-6 w-full text-right line-clamp-2">${item.text}</p>
          </div>
        </div>
      `;
    }) || [];

    const servicesContainer = document.querySelector(".list-modal-services");
    if (servicesContainer) {
      servicesContainer.innerHTML = list.join("");
    }
  } catch (error) {
    console.log("Modal services:", error.message);
  }

  const closeList = document.querySelector(".closelist");
  const listModal = document.querySelector(".list-modal");
  const openList = document.querySelector(".more-list");
  const bgCover = document.querySelector(".cover-bg-loc-full");

  if (openList && listModal && bgCover && closeList) {
    openList.addEventListener("click", () => {
      listModal.classList.remove("hidden");
      listModal.classList.add("flex");
      bgCover.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });

    closeList.addEventListener("click", () => {
      listModal.classList.add("hidden");
      listModal.classList.remove("flex");
      bgCover.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }
}

export default List;
