document.addEventListener("DOMContentLoaded", () => {
  var elt = document.getElementById("calculator");
  var calculator = Desmos.GraphingCalculator(elt);
  calculator.observe("graphpaperBounds", function () {
    var pixelCoordinates = calculator.graphpaperBounds.pixelCoordinates;
    var mathCoordinates = calculator.graphpaperBounds.mathCoordinates;

    var pixelsPerUnitY = pixelCoordinates.height / mathCoordinates.height;
    var pixelsPerUnitX = pixelCoordinates.width / mathCoordinates.width;

    console.log("Current aspect ratio: " + pixelsPerUnitY / pixelsPerUnitX);
  });
  console.log(calculator);
});
