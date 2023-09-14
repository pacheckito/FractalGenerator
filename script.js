var isGenerating = false;
let selectedFractal = "";
let intervalID;

generateButton.addEventListener("click", generateFractal);

function updateGenerateButton(fractalName) {
  // update the Generate button and selected fractal
  const generateButton = document.getElementById("generateButton");
  generateButton.innerText = `Generate ${fractalName}`;
  selectedFractal = fractalName;
}

function clearBoard() {
  clearInterval(intervalID);
  intervalID = null;
  isGenerating = false;
  location.reload(); // refresh the page
}

var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function () {
  clearBoard();
});

function generateFractal() {
  const fractalName = selectedFractal;
  switch (
    fractalName // call corresponding function based on the selected fractal name
  ) {
    case "Mandelbrot Set":
      generateMandelbrotSet();
      break;
    case "Julia Set":
      generateJuliaSet();
      break;
    case "Sierpinski Triangle":
      generateSierpinskiTriangle();
      break;
    case "Koch Snowflake":
      generateKochSnowflake();
      break;
    case "Dragon Curve":
      generateDragonCurve();
      break;
    case "Barnsley Fern":
      generateBarnsleyFern();
      break;
  }
}

function generateMandelbrotSet() {
  function Complex(re, im) {
    this.re = re;
    this.im = im;
  }

  Complex.prototype.add = function (other) {
    return new Complex(this.re + other.re, this.im + other.im);
  };

  Complex.prototype.mul = function (other) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  };

  Complex.prototype.abs = function () {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  };

  function belongs(re, im, iterations) {
    var z = new Complex(0, 0);
    var c = new Complex(re, im);
    var i = 0;
    while (z.abs() < 2 && i < iterations) {
      z = z.mul(z).add(c);
      i++;
    }
    return i;
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function pixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  function draw(width, height, maxIterations) {
    var minRe = -2,
      maxRe = 1,
      minIm = -1,
      maxIm = 1;
    var reStep = (maxRe - minRe) / width,
      imStep = (maxIm - minIm) / height;
    var re = minRe;
    while (re < maxRe) {
      var im = minIm;
      while (im < maxIm) {
        var result = belongs(re, im, maxIterations);
        var x = (re - minRe) / reStep,
          y = (im - minIm) / imStep;
        if (result == maxIterations) {
          pixel(x, y, "black");
        } else {
          var h = 30 + Math.round((120 * result * 1.0) / maxIterations);
          var color = "hsl(" + h + ", 100%, 50%)";
          pixel(x, y, color);
        }
        im += imStep;
      }
      re += reStep;
    }
  }

  var iterations = [5, 10, 15, 25, 50, 75, 100, 150, 200]; // 9 iterations
  var i = 0;
  var interval = setInterval(function () {
    draw(700, 700, iterations[i]);
    i++;
    if (i >= iterations.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function generateJuliaSet() {
  function Complex(re, im) {
    this.re = re;
    this.im = im;
  }

  Complex.prototype.add = function (other) {
    return new Complex(this.re + other.re, this.im + other.im);
  };

  Complex.prototype.mul = function (other) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  };

  Complex.prototype.abs = function () {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  };

  function belongs(re, im, iterations, c) {
    var z = new Complex(re, im);
    var i = 0;
    while (z.abs() < 2 && i < iterations) {
      z = z.mul(z).add(c);
      i++;
    }
    return i;
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function pixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  function drawBackground(width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }

  // function getRandomColor() {
  //   var letters = "0123456789ABCDEF";
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  function draw(width, height, maxIterations, c) {
    drawBackground(width, height, "white");

    var minRe = -2,
      maxRe = 2,
      minIm = -2,
      maxIm = 2;
    var reStep = (maxRe - minRe) / width,
      imStep = (maxIm - minIm) / height;
    var re = minRe;
    while (re < maxRe) {
      var im = minIm;
      while (im < maxIm) {
        var result = belongs(re, im, maxIterations, c);
        var x = (re - minRe) / reStep,
          y = (im - minIm) / imStep;
        if (result == maxIterations) {
          pixel(x, y, "black");
        } else {
          //  var color = getRandomColor();
          pixel(x, y, "white"); // change with 'color' to see the Julia set in color
        }
        im += imStep;
      }
      re += reStep;
    }
  }

  var iterations = [1, 5, 10, 15, 25, 50, 75, 100, 150]; ////////////// 9 iterations, can be changed here
  var c = new Complex(-0.8, 0.156);
  draw(700, 700, iterations, c);
  var i = 0;
  var interval = setInterval(function () {
    draw(700, 700, iterations[i], c);
    i++;
    if (i >= iterations.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function generateSierpinskiTriangle() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = 700;
  canvas.height = 700;

  // The adjusted starting coordinates, centered around the origin
  const startingPoints = {
    p1: {
      x: 0,
      y: -225,
    },
    p2: {
      x: 225,
      y: 154.5,
    },
    p3: {
      x: -225,
      y: 154.5,
    },
  };
  ctx.translate(0.5 * canvas.width, 0.5 * canvas.height);

  const drawTriangle = (p1, p2, p3) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();
  };

  const sierpinski = (p1, p2, p3, limit = 9) => {
    ///////////////////// change the limit here
    if (limit > 0) {
      const p4 = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
      const p5 = {
        x: (p2.x + p3.x) / 2,
        y: (p2.y + p3.y) / 2,
      };
      const p6 = {
        x: (p3.x + p1.x) / 2,
        y: (p3.y + p1.y) / 2,
      };

      sierpinski(p1, p4, p6, limit - 1);
      sierpinski(p4, p2, p5, limit - 1);
      sierpinski(p6, p5, p3, limit - 1);
    } else {
      drawTriangle(p1, p2, p3);
    }
  };

  sierpinski(
    startingPoints.p1,
    startingPoints.p2,
    startingPoints.p3,
    (limit = 7) //////////////////////////////////////////////////////////// change the limit here
  );
}

function generateKochSnowflake() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = 700;
  canvas.height = 700;

  // The adjusted starting coordinates, centered around the origin
  const startingPoints = {
    p1: {
      x: 0,
      y: -225 - 25,
    },
    p2: {
      x: 225,
      y: 154.5 - 25,
    },
    p3: {
      x: -225,
      y: 154.5 - 25,
    },
  };
  ctx.translate(0.5 * canvas.width, 0.5 * canvas.height);
  const koch = (a, b, limit = 6) => {
    /////////////////////////////////// change the limit here
    let [dx, dy] = [b.x - a.x, b.y - a.y];
    let dist = Math.sqrt(dx * dx + dy * dy);
    let unit = dist / 3;
    let angle = Math.atan2(dy, dx);

    let p1 = {
      x: a.x + dx / 3,
      y: a.y + dy / 3,
    };
    let p3 = {
      x: b.x - dx / 3,
      y: b.y - dy / 3,
    };
    let p2 = {
      x: p1.x + Math.cos(angle - Math.PI / 3) * unit,
      y: p1.y + Math.sin(angle - Math.PI / 3) * unit,
    };

    if (limit > 0) {
      setTimeout(() => {
        koch(a, p1, limit - 1);
        koch(p1, p2, limit - 1);
        koch(p2, p3, limit - 1);
        koch(p3, b, limit - 1);
      }, 0); // delay between each iteration (in milliseconds)
    } else {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  };

  // draw the shape using our predefined coordinates
  koch(startingPoints.p1, startingPoints.p2);
  koch(startingPoints.p2, startingPoints.p3);
  koch(startingPoints.p3, startingPoints.p1);
}

function generateDragonCurve() {
  if (isGenerating) return;

  var c = document.getElementById("canvas");
  c.width = 1024;
  c.height = 768;
  var ctx = c.getContext("2d");
  var i = 0;
  var steps = 17;
  var colorRate = 8;

  function drawDragon(x1, y1, x2, y2, step) {
    if (step--) {
      var dx = x2 - x1,
        dy = y2 - y1;

      var midX = x1 + (dx - dy) / 2,
        midY = y1 + (dx + dy) / 2;

      drawDragon(midX, midY, x1, y1, step);
      drawDragon(midX, midY, x2, y2, step);

      var r = (i >> (colorRate - 3)) & 255;
      var g = (i >> (colorRate + 0)) & 255;
      var b = (i >> (colorRate - 1)) & 255;

      setTimeout(function () {
        ctx.fillStyle = "rgb(" + r + ", " + g + "," + b + ")";
        ctx.fillRect(midX, midY, 1.5, 1.5);
        i++;
      }, 10); //////// adjust the delay between iterations here
    } else {
      isGenerating = false;
    }
  }
  isGenerating = true;
  drawDragon(
    (c.width * 3) / 16,
    c.height / 3,
    (c.width * 11) / 16,
    c.height / 3,
    steps
  );
}

function generateBarnsleyFern() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = 0;

  function plotPoint() {
    const random = Math.random(); // generate a num 
    let newX, newY;

    if (random < 0.01) {
      newX = 0;
      newY = 0.16 * y;
    } else if (random < 0.86) {
      newX = 0.85 * x + 0.04 * y;
      newY = -0.04 * x + 0.85 * y + 1.6;
    } else if (random < 0.93) {
      newX = 0.2 * x - 0.26 * y;
      newY = 0.23 * x + 0.22 * y + 1.6;
    } else {
      newX = -0.15 * x + 0.28 * y;
      newY = 0.26 * x + 0.24 * y + 0.44;
    }

    x = newX;
    y = newY;

    const canvasX = Math.floor(canvas.width / 2 + x * 50);
    const canvasY = Math.floor(canvas.height - y * 50);

    ctx.fillRect(canvasX, canvasY, 1, 1);
  }

  ////////////////////////////////////////////////////
  let i = 0;
  function generateNextPoint() {
    if (i < 100000) { // limit the amount here 
      for (let j = 0; j < 50; j++) {
        plotPoint();
      }
      i += 50;
      requestAnimationFrame(generateNextPoint);
    }
  }
  generateNextPoint();
}
