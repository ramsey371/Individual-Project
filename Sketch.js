let sceneCommands = [];
let sceneCanvas;

function setup() {
  try {
    sceneCanvas = createCanvas(600, 400);
    sceneCanvas.parent("canvasContainer");
    clearCanvas();

    const executeButton = document.getElementById("runButton");
    executeButton.addEventListener("click", () => {
      try {
        sceneCommands = extractCommands();
        renderScene();
      } catch (error) {
        console.error("Error processing commands:", error);
      }
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
}

function clearCanvas() {
  try {
    background(0);
  } catch (error) {
    console.error("Error clearing canvas:", error);
  }
}

function extractCommands() {
  try {
    const userInput = document.getElementById("commandInput").value;
    if (!userInput.trim()) {
      console.warn("No commands provided.");
      return [];
    }

    return userInput
      .split("\n")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd);
  } catch (error) {
    console.error("Error extracting commands:", error);
    return [];
  }
}

function renderScene() {
  try {
    clearCanvas();
    console.info("Processing commands:", sceneCommands);

    sceneCommands.forEach((cmd) => {
      try {
        const parts = cmd.split(" ");
        const operation = parts[0]?.toLowerCase();

        if (operation === "add") {
          const itemType = parts[1]?.toLowerCase();
          const posX = parseInt(parts[3], 10);
          const posY = parseInt(parts[4], 10);

          if (isNaN(posX) || isNaN(posY)) {
            throw new Error(`Invalid coordinates in: "${cmd}"`);
          }

          if (itemType === "star") {
            createStar(posX, posY);
          } else if (itemType === "planet") {
            const diameter = parseInt(parts[5], 10) || 50;
            createPlanet(posX, posY, diameter);
          } else {
            throw new Error(`Unrecognized item type in: "${cmd}"`);
          }
        } else {
          throw new Error(`Unknown operation in: "${cmd}"`);
        }
      } catch (error) {
        console.error("Error processing command:", error);
      }
    });
  } catch (error) {
    console.error("Error rendering scene:", error);
  }
}

function createStar(posX, posY) {
  try {
    push();
    fill(255, 255, 255);
    noStroke();
    ellipse(posX, posY, 10, 10);
    pop();
  } catch (error) {
    console.error("Error drawing star:", error);
  }
}

function createPlanet(posX, posY, diameter) {
  try {
    push();
    fill(random(100, 255), random(100, 255), random(100, 255));
    noStroke();
    ellipse(posX, posY, diameter, diameter);
    pop();
  } catch (error) {
    console.error("Error drawing planet:", error);
  }
}
