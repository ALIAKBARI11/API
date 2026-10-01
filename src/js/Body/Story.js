import { fetchAPI } from "../api.js";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

async function Story() {
  try {
    // Fetch from api/story.json
    const data = await fetchAPI("story.json");

    if (!data.data || !data.data.posts) {
      console.error("Story data not found");
      return;
    }

    const posts = data.data.posts.slice(0, 18);

    const storySwiper = posts.map((post) => {
      const imageUrl = post.circle_cover || post.media?.[0]?.cover_medium || "";
      const title = post.title || "";
      const postUrl = `https://www.digikala.com/magnet/posts/${post.id}/`;

      return `
        <div class="swiper-slide">
          <a href="${postUrl}" target="_blank">
            <div class="flex flex-col justify-center items-center p-2 gap-2 w-23">
              <div class="rounded-full overflow-hidden w-22 h-22 bg-linear-to-b from-[#95489c] to-[#c84198] p-0.5">
                <div class="bg-white rounded-full w-full h-full p-1">
                  <img src="${imageUrl}" alt="${title}" class="rounded-full" />
                </div>
              </div>
              <span class="font-Iran text-xs text-[#574a6d] line-clamp-2 text-center w-full">${title}</span>
            </div>
          </a>
        </div>
      `;
    });

    document.querySelector(".story-wrapper").innerHTML = storySwiper.join("");

    new Swiper(".Story", {
      modules: [Navigation],
      slidesPerView: 10.5,
      spaceBetween: 0,
      navigation: {
        nextEl: ".story-next",
        prevEl: ".story-prev",
      },
    });
  } catch (error) {
    console.error("Error loading stories:", error);
  }
}

export default Story;