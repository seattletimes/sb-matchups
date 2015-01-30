/* esnext:true */
var Share = require("share");

new Share(".share");
new Share(".share-bottom", {
  ui: {
    flyout: "top left"
  }
});

var matchups = [].slice.call(document.querySelectorAll(".matchup"));

var debounce = function(f, d) {
  d = d || 100;
  var timeout = null;
  return function() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
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
    var bounds = match.getBoundingClientRect();
    var top = bounds.top < 0 ? 0 : bounds.top;
    var bottom = bounds.bottom > h ? h : bounds.bottom;
    var ratio = (bottom - top) / h;
    if (ratio > .5) {
      match.className += " active";
      return;
    }
  }
}));