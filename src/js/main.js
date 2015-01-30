/* esnext:true */

//trigger web animations
setTimeout(() => document.querySelector("main.startup").className = "ready", 200);

var Share = require("share");

new Share(".share", {
  ui: {
    flyout: "bottom left"
  }
});
new Share(".share-bottom", {
  ui: {
    flyout: "top left"
  }
});

var matchups = [].slice.call(document.querySelectorAll(".matchup"));

var debounce = function(f, d) {
  d = d || 100;
  var timeout = null;
  return function(...args) {
    if (timeout) return;
    timeout = setTimeout(function() {
      timeout = null;
      f.apply(null, args);
    }, d);
  };
};

window.addEventListener("scroll", debounce(function() {
  matchups.forEach(m => m.className = m.className.replace(/\s*active\s*/g, ""));
  var h = window.innerHeight;
  for (var i = 0; i < matchups.length; i++) {
    var match = matchups[i];
    var { top, bottom } = match.getBoundingClientRect();
    top = top < 0 ? 0 : top;
    bottom = bottom > h ? h : bottom;
    var ratio = (bottom - top) / h;
    if (ratio > .5) {
      match.className += " active";
      return;
    }
  }
}));