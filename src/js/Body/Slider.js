import { fetchAPI } from "../api.js";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

async function Slider() {
  try {
    const data = await fetchAPI("Api.json");

    const sliderSection = data.data.widgets.find(item => item.type === 'full_slider');

    if (!sliderSection || !sliderSection.data) {
      console.error("Slider data not found");
      return;
    }

    const slides = sliderSection.data.map((item) => {
      const url = `https://www.digikala.com${item.url.uri}`;
      return `
        <div class="swiper-slide">
          <a href="${url}" target="_blank" class="block w-full h-full">
            <img
              src="${item.image}"
              alt="${item.title}"
              title="${item.title}"
              class="w-full h-full block object-cover"
            />
          </a>
        </div>
      `;
    });

    const wrapper = document.querySelector(".slider-wrapper");
    wrapper.innerHTML = slides.join("");

    new Swiper(".Slider", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 8,
      loop: true,
      speed: 800,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.1,
          centeredSlides: false,
          spaceBetween: 2,
          speed: 500,
        },
        1024: {
          slidesPerView: 1,
          centeredSlides: false,
          spaceBetween: 0,
          speed: 800,
        },
      },
    });
  } catch (error) {
    console.error("Error loading slider:", error);
  }
}

Slider();

export default Slider;
