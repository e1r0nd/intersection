# Meetrics Code Challenge

Dear future colleague,

Meetrics takes care of measuring the viewability of advertisements and page content of its clients.
Therefore we've prepared a little challenge for you.

The `index.html` file contains the advertisement.
We want you to write the necessary JavaScript code inside the `script.js` file that will track a viewability of the
 ad.

## The ad being viewable means:

- The advertisement is 100% in the viewport of the browser (not viewable would be if the user scrolls to the bottom of
 the
 page)
- The browser tab is opened (not viewable would be if you open some other page, e.g. facebook.com in another tab and
the page looses its focus)

## Goal:
- Measure the viewability of the DIV that contains the ad
- Determine viewability also by evaluating the windows focus state (tab change, window unfocused)
- Log your results either to the console or render it on the page

## Requirements:
- You can use pure JavaScript or any library or a framework of your choice
- Feel free to override the `window.log` function.
  This function is invoked every **500ms** and should perform a simple `console.log` with your current viewability values.
- Feel free to override the whole `script.js` if needed
- Feel free to override the `printStatus` function - if you feel that you would like to display data in some other way
that just logs in the console - you're more than welcome to do it!
- The HTML structure of `index.html` file shouldn't be changed
- Browser support at least one browser of your choice

## Nice extras to have:
- Measure the portion of the ad that is visible in %
- Track clicks

## Hints:

- We recommend you to have a look at the PageVisibility API of browsers or focus events
- An example can be found on our homepage https://www.meetrics.com/live-demo/

## We value:

- Clean, maintainable, well-documented code
- Quality assurance of the code

## Delivery:
  Put your code in a git repository of your choice and send us the link.