/**
 * Automatically checks for and clicks the mobile menu summary button
 * inside the #Details-menu-drawer-container element.
 *
 * This is a workaround for a bug in the Shopify Trade theme on mobile,
 * where the sticky header causes the menu drawer to remain active
 * and block page interaction, even if it is visually hidden (e.g., via display: none).
 *
 * The function runs every 2 seconds, up to 5 times, until it successfully
 * finds and clicks the <summary> element to close the floating menu.
 */
function tryClickMenuSummary(maxAttempts = 5, interval = 3000) {
  let attempts = 0;

  const intervalId = setInterval(() => {
    attempts++;

    const container = document.getElementById("Details-menu-drawer-container");

    if (container && container.hasAttribute("open")) {
      const summaryButton = container.querySelector("summary.header__icon.header__icon--menu.header__icon--summary.link.focus-inset");

      if (summaryButton) {
        summaryButton.click();
        console.log("Summary button clicked.");
        clearInterval(intervalId);
      } else {
        console.log("Container is open, but summary button not found.");
      }
    } else {
      console.log(`Attempt ${attempts}: Container not open or not found.`);
    }

    if (attempts >= maxAttempts) {
      console.log("Max attempts reached. Stopping.");
      clearInterval(intervalId);
    }
  }, interval);
}

// Run the function
if (window.innerWidth < 768) {
  //   tryClickMenuSummary();

}
/* Mobile switch image  */
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    document.querySelectorAll('.media--hover-effect').forEach(mediaContainer => {
      const images = mediaContainer.querySelectorAll('img');
      if (images.length < 2) return;

      let index = 0;

      setInterval(() => {
        images.forEach((img, i) => {
          img.style.opacity = i === index ? '1' : '0';
          img.style.transition = 'opacity 0.4s ease';
        });

        index = (index + 1) % images.length;
      }, 2000);
    });
  }
});
/* Globo Mega Menu */
document.addEventListener("DOMContentLoaded", function () {
  let attempts = 0;
  const maxAttempts = 5;
  const intervalTime = 2000; // 2 seconds

  const interval = setInterval(() => {
    attempts++;

    const isWindows = navigator.userAgent.includes("Windows") || navigator.platform.includes("Win");

    // Only run this width check on Windows devices
    if (isWindows && window.innerWidth > 768) {
      clearInterval(interval);
      return;
    }
    const menuContainer = document.querySelector('.gm-bb-menu-container');
    if (menuContainer) {
      const mobileClothesItems = menuContainer.querySelectorAll('.mobile-clothes');

      mobileClothesItems.forEach((item) => {
        const controller = item.querySelector('[aria-controls]');
        if (controller) {
          const targetId = controller.getAttribute('aria-controls');
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.classList.add('mobile-clothes-submenu');
          }
        }
      });

      // Stop checking once the work is done
      clearInterval(interval);
    }

    if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.warn("gm-bb-menu-container not found after 5 attempts.");
    }
  }, intervalTime);
});
/* filter and sort windows */
window.addEventListener('load', function () {
  const isWindows = navigator.platform.toLowerCase().includes('win') || navigator.userAgent.toLowerCase().includes('windows');
  const isLargeScreen = window.innerWidth > 768;

  if (!isWindows || !isLargeScreen) return;

  setTimeout(function () {
    document.querySelectorAll('summary[aria-expanded="false"]').forEach(summary => {
      summary.click();
    });
  }, 500);
});


function isWindows() {
  return navigator.userAgent.toLowerCase().includes('windows');
}

function updateStickyHeaderVisibility() {
  const isWin = isWindows();
  const header = document.querySelector('sticky-header');

  if (header) {
    if (!isWin) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
  }
}

window.addEventListener('load', updateStickyHeaderVisibility);


// Function to update --columns CSS variable on .gm-links inside .make-circle-last
function updateColumnsForMakeCircleLast() {
  // Select all .gm-links elements inside .make-circle-last that use --columns inline
  const elements = document.querySelectorAll('.make-circle-last .gm-links[style*="--columns"]');

  // Loop through each matching element
  elements.forEach(el => {
    let columns;
    const width = window.innerWidth; // Get current window width

    // Set column value based on screen width
    if (width >= 1700) {
      columns = 6; // Large desktop
    } else if (width >= 1400) {
      columns = 5; // Desktop
    } else if (width >= 1024) {
      columns = 4; // Desktop
    } else if (width >= 768) {
      columns = 3; // Tablet
    } else {
      columns = 2; // Mobile
    }

    // Update the inline CSS variable --columns
    el.style.setProperty('--columns', columns);
  });
}

// Run on initial page load
window.addEventListener('load', updateColumnsForMakeCircleLast);

// Re-run when window is resized
window.addEventListener('resize', updateColumnsForMakeCircleLast);