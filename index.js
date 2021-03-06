"use strict";

function drawCircleGrey(ctx, radius, position) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = hexToRGB(colorLuminance("#AF1E2D", Math.random() * -0.4), Math.random());
  if (Math.random() < 0.005 && radius < 2.5) {
    ctx.fillStyle = colorLuminance("#AF1E2D", Math.random() * 0.2);
  }
  ctx.fill();
}

function colorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#",
      c = undefined,
      i = undefined;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function pointIsInPolygon(p, polygon) {
  var isInside = false;
  var minX = polygon[0].x,
      maxX = polygon[0].x;
  var minY = polygon[0].y,
      maxY = polygon[0].y;
  for (var n = 1; n < polygon.length; n++) {
    var q = polygon[n];
    minX = Math.min(q.x, minX);
    maxX = Math.max(q.x, maxX);
    minY = Math.min(q.y, minY);
    maxY = Math.max(q.y, maxY);
  }
  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }
  var i = 0,
      j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {
    if (polygon[i].y > p.y != polygon[j].y > p.y && p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
      isInside = !isInside;
    }
  }
  return isInside;
}

function getBoundingBoxPolygon(points) {
  var minX = null;
  var maxX = null;
  var minY = null;
  var maxY = null;
  for (var i = 0; i < points.length; i++) {
    var x = points[i].x;
    var y = points[i].y;
    if (minX == null) {
      minX = x;maxX = x;minY = y;maxY = y;
    }
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  var width = maxX - minX;
  var height = maxY - minY;

  return {
    x: minX,
    y: minY,
    width: width,
    height: height
  };
}

function polygonScale(factor, polygon) {
  return polygon.map(function (data) {
    data.x = data.x * factor;
    data.y = data.y * factor;
    return data;
  });
}

function addParticle() {
  // Externa points
  var vector = {
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT
  };
  var vector_check = {
    x: vector.x - offsetX,
    y: vector.y - offsetY
  };

  if (!pointIsInPolygon(vector_check, p1) && !pointIsInPolygon(vector_check, p2) && !pointIsInPolygon(vector_check, R) && !pointIsInPolygon(vector_check, E) && !pointIsInPolygon(vector_check, D)) {
    drawCircleGrey(canvas, Math.random() * 5, {
      x: vector.x,
      y: vector.y
    });
  }
}

//
var WIDTH = $(window).width();
var HEIGHT = $(window).height();

var R = polygonScale(1, [{ "x": 82, "y": 74 }, { "x": 82, "y": 191 }, { "x": 103, "y": 191 }, { "x": 103, "y": 91 }, { "x": 113, "y": 92 }, { "x": 121, "y": 95 }, { "x": 125, "y": 105 }, { "x": 125, "y": 115 }, { "x": 121, "y": 125 }, { "x": 113, "y": 127 }, { "x": 103, "y": 127 }, { "x": 103, "y": 144 }, { "x": 113, "y": 143 }, { "x": 128, "y": 191 }, { "x": 147, "y": 191 }, { "x": 131, "y": 139 }, { "x": 142, "y": 128 }, { "x": 144, "y": 109 }, { "x": 142, "y": 91 }, { "x": 128, "y": 78 }, { "x": 110, "y": 74 }]);
var E = polygonScale(1, [{ "x": 159, "y": 74 }, { "x": 213, "y": 74 }, { "x": 213, "y": 92 }, { "x": 179, "y": 92 }, { "x": 179, "y": 123 }, { "x": 205, "y": 123 }, { "x": 205, "y": 140 }, { "x": 180, "y": 140 }, { "x": 180, "y": 174 }, { "x": 213, "y": 174 }, { "x": 213, "y": 191 }, { "x": 159, "y": 191 }]);
var D = polygonScale(1, [{ "x": 251, "y": 91 }, { "x": 262, "y": 91 }, { "x": 268, "y": 94 }, { "x": 272, "y": 100 }, { "x": 272, "y": 165 }, { "x": 269, "y": 172 }, { "x": 261, "y": 175 }, { "x": 251, "y": 175 }, { "x": 251, "y": 191 }, { "x": 269, "y": 191 }, { "x": 284, "y": 182 }, { "x": 292, "y": 164 }, { "x": 292, "y": 104 }, { "x": 285, "y": 85 }, { "x": 267, "y": 74 }, { "x": 231, "y": 74 }, { "x": 231, "y": 191 }, { "x": 251, "y": 191 }]);
var p1 = polygonScale(1, [{ "x": 53, "y": 0 }, { "x": 70, "y": 17 }, { "x": 40, "y": 59 }, { "x": 23, "y": 118 }, { "x": 27, "y": 168 }, { "x": 43, "y": 215 }, { "x": 70, "y": 249 }, { "x": 54, "y": 266 }, { "x": 19, "y": 220 }, { "x": 2, "y": 166 }, { "x": 0, "y": 111 }, { "x": 19, "y": 50 }]);
var p2 = polygonScale(1, [{ "x": 304, "y": 17 }, { "x": 321, "y": 0 }, { "x": 353, "y": 43 }, { "x": 373, "y": 100 }, { "x": 376, "y": 140 }, { "x": 364, "y": 201 }, { "x": 340, "y": 244 }, { "x": 320, "y": 266 }, { "x": 304, "y": 249 }, { "x": 342, "y": 191 }, { "x": 353, "y": 140 }, { "x": 349, "y": 102 }, { "x": 336, "y": 57 }]);

var tela = document.createElement('canvas');
tela.width = $(window).width();
tela.height = $(window).height();
$("body").append(tela);

var canvas = tela.getContext('2d');

var p1BB = getBoundingBoxPolygon(p1);
var rBB = getBoundingBoxPolygon(R);
var eBB = getBoundingBoxPolygon(E);
var dBB = getBoundingBoxPolygon(D);
var p2BB = getBoundingBoxPolygon(p2);
var offsetX = WIDTH / 2 - (p2BB.x + p2BB.width) / 2;
var offsetY = HEIGHT / 2 - p1BB.height / 2;

setInterval(function () {
  for (var i = 0; i < 100; i++) {
    addParticle();
  }
}, 10);