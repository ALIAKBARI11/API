let lastScrollY = window.scrollY;
let isHeaderShrunk = false;
let ticking = false;

function initMobileHeights() {
  const mHeader = document.querySelector("header.sticky.mobile\\:block");
  if (mHeader && window.innerWidth < 1024) {
    mHeader.classList.remove('header-shrunk');
    const normalH = mHeader.offsetHeight - 2;

    mHeader.classList.add('header-shrunk');
    const shrunkH = mHeader.offsetHeight - 2;

    document.documentElement.style.setProperty('--mob-header-normal', normalH + 'px');
    document.documentElement.style.setProperty('--mob-header-shrunk', shrunkH + 'px');

    if (!isHeaderShrunk) {
      mHeader.classList.remove('header-shrunk');
    }
  }
}

function updateHeader(currentScrollY) {
  if (window.innerWidth >= 1024) {
    const desktopCategory = document.querySelector('header.desktop\\:block .category');
    if (desktopCategory) {
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 5) {
        desktopCategory.classList.add('hide-category');
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 100) {
        desktopCategory.classList.remove('hide-category');
      }
    }
  }

  if (window.innerWidth < 1024) {
    const mHeader = document.querySelector("header.sticky.mobile\\:block");
    if (mHeader) {
      if (currentScrollY > 230 && !isHeaderShrunk) {
        mHeader.classList.add('header-shrunk');
        isHeaderShrunk = true;
      } else if (currentScrollY < 10 && isHeaderShrunk) {
        mHeader.classList.remove('header-shrunk');
        isHeaderShrunk = false;
      }
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function handleScroll() {
  const currentScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeader(currentScrollY);
    });
    ticking = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileHeights();
  lastScrollY = window.scrollY;
});

window.addEventListener("resize", initMobileHeights);
window.addEventListener("scroll", handleScroll, { passive: true });
