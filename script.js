/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
let adIsViewable = true;
let isActive = true;
let viewTime = 0;
let viewPercentage = 0;
let clickedTimes = 0;
let adObserver;
let lastViewStarted = 0;

const adElement = document.getElementById("ad");
const contentBox = document.body;

/**
 * Logs the viewability values in the console
 *
 * @override
 */
window.log = function () {
  adIsViewable && isActive && updateAdTimer();

  console.log(
    `Ad is viewable: ${adIsViewable},
Viewability time of the ad in sec: ${calculateTime()},
Viewabile percentage: ${Number.parseFloat(viewPercentage * 100).toFixed(1)}%,
Clicked ${clickedTimes} times.`
  );
};

/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/
// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.warn(
    "Tracking system requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
  );
} else {
  // Handle clicks
  adElement.addEventListener("click", clickHandler);

  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // check every 10%
  };
  // Observe the Ad
  adObserver = new IntersectionObserver(intersectionCallback, options);

  adObserver.observe(adElement);
}

/**
 * Track clicks on the Ad
 */
function clickHandler() {
  clickedTimes += 1;
}

/**
 * Track visibility of the current tab and handle changes
 * If the page is hidden, stop tracking the Ad
 */
function handleVisibilityChange() {
  const isVisible = !document.hidden && document.visibilityState === "visible";
  isActive = isVisible;

  if (isVisible) {
    lastViewStarted = performance.now();
  } else {
    updateAdTimer();
    lastViewStarted = 0;
  }
}

/**
 * Handle intersection changes
 */
function intersectionCallback(entries) {
  const entry = entries[0];

  if (entry.isIntersecting) {
    adIsViewable = true;
    lastViewStarted = entry.time;
    viewPercentage = entry.intersectionRatio;
    updateAdTimer();
  } else {
    updateAdTimer();
    lastViewStarted = 0;
    adIsViewable = false;
  }
}

/**
 * Update view time
 */
function updateAdTimer() {
  const currentTime = performance.now();

  if (lastViewStarted) {
    const diff = currentTime - lastViewStarted;
    viewTime = parseFloat(viewTime) + diff;
  }

  lastViewStarted = currentTime;
}

/**
 * Calculated view time is seconds
 */
const calculateTime = () => ((viewTime / 1000) % 60).toFixed(0);
