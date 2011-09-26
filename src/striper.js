// Relies on a magic of jQuery for CSS modifications

function Striper(el, opacity) {
  this.opacity = opacity || 1.0;
  this.el = el
  this.getRGB = function(hexVal) {
    var colors = [];
    var group = '';
    for (var i = 0; i < hexVal.length; i++) {
      group += hexVal[i];
      if ((i+1) % 6 == 0) {
        colors.push(group);
        group = '';
      }
    }
    // Drop the last incomplete set
    // colors.push(group);
    return colors;
  }
}

Striper.prototype.update = function(hexString) {
  var colors = this.getRGB(hexString);
  var colorCSS = [];
  var start = '';
  var stop = '';
  var span = Math.round(100 / colors.length * 10)/1000
  var lastSpan = 0.00;
  for (var i = 0; i < colors.length; i++) {
    var rgba, r,g,b = undefined;
    r = parseInt(colors[i].substring(0,2), 16)
    g = parseInt(colors[i].substring(2,4), 16)
    b = parseInt(colors[i].substring(4,6), 16)
    rgba = "rgba("+ [r,g,b].join(',')  +", "+ this.opacity +")"
    start = "color-stop("+ lastSpan +", "+ rgba + ")";
    lastSpan += span;
    lastSpan = Math.round(lastSpan*100)/100
    if (i+1 == colors.length) {
      stop = "color-stop(1.0, "+ rgba + ")";
    } else {
      stop = "color-stop("+ lastSpan +", "+ rgba + ")";
    }
    span = (1 - lastSpan) / (colors.length - 1 - i);
    span += Math.random() * (span*0.25); // Give us some randomness of 25%
    span = Math.round(span * 100)/100
    colorCSS.push(start);
    colorCSS.push(stop);
  }
  $(this.el).css("background-image", "-webkit-gradient(linear,100% 0%, 0% 0%, from(transparent)," + colorCSS.join(',') + ")");
}

