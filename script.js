// Global variable to store the selected fractal name
let selectedFractal = "";
generateButton.addEventListener("click", generateFractal);

// Function to update the Generate button and selected fractal
function updateGenerateButton(fractalName) {
  const generateButton = document.getElementById("generateButton");
  generateButton.innerText = `Generate ${fractalName}`;
  selectedFractal = fractalName;
}

function clearBoard() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
function generateBarnsleyFern() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up the initial coordinates
  let x = 0;
  let y = 0;

  // Function to plot a single point
  function plotPoint() {
    // Randomly select a transformation
    const random = Math.random();
    let newX, newY;

    if (random < 0.01) {
      // Transformation 1
      newX = 0;
      newY = 0.16 * y;
    } else if (random < 0.86) {
      // Transformation 2
      newX = 0.85 * x + 0.04 * y;
      newY = -0.04 * x + 0.85 * y + 1.6;
    } else if (random < 0.93) {
      // Transformation 3
      newX = 0.2 * x - 0.26 * y;
      newY = 0.23 * x + 0.22 * y + 1.6;
    } else {
      // Transformation 4
      newX = -0.15 * x + 0.28 * y;
      newY = 0.26 * x + 0.24 * y + 0.44;
    }

    // Update the current coordinates
    x = newX;
    y = newY;

    // Map the coordinates to the canvas
    const canvasX = Math.floor(canvas.width / 2 + x * 50);
    const canvasY = Math.floor(canvas.height - y * 50);

    // Draw a pixel at the mapped coordinates
    ctx.fillRect(canvasX, canvasY, 1, 1);
  }

  ////////////////////////////////////////////////////
  let i = 0;
  function generateNextPoint() {
    if (i < 100000) {
      for (let j = 0; j < 50; j++) {
        plotPoint();
      }
      i += 50;
      requestAnimationFrame(generateNextPoint);
    }
  }

  // Start generating the fractal
  generateNextPoint();
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
          pixel(x, y, "green");
        } else {
         //  var color = getRandomColor();
          pixel(x, y, "black");
        }
        im += imStep;
      }
      re += reStep;
    }
  }

  var iterations = [5, 10, 15, 25, 50, 75]; // 9 iterations
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
function generateDragonCurve() {

}
