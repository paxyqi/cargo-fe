<template>
  <Sketch
    :additional-events="[]"
    v-on="{ setup, draw, keypressed, mouseClicked }"
  />
</template>
<script lang="ts" setup>
import p5 from "p5";
import Sketch from "./sketch.vue";
const plan = {
  truckschemes: [
    {
      truckdimension: {
        a: 100,
        b: 300,
        c: 200,
      },
      cargoblocks: [
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 0,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 30,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
      ],
    },
    {
      truckdimension: {
        a: 100,
        b: 250,
        c: 200,
      },
      cargoblocks: [
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 0,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
      ],
    },
  ],
};
const setup = (p: p5) => {
  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  p.background(0);
};
let camerafocus = {
  x: 0,
  y: 0,
  z: 0,
};
const truckIndex = 0;
const blockNum = plan.truckschemes[0].cargoblocks.length;
const angles = {
  h: Math.PI / 4,
  v: Math.PI / 4,
};
const distance = 400;
const draw = (p: p5) => {
  p.background(250);
  p.fill(255);
  p.textSize(32);
  p.text("Hello World", p.width / 2, p.height / 2);

  nextColor = 0;

  const { truckdimension, cargoblocks } = plan.truckschemes[truckIndex];

  const { a, b, c } = truckdimension;
  camerafocus = {
    x: a / 2,
    y: b / 2,
    z: c / 2,
  };

  const x = camerafocus.x + distance * Math.cos(angles.h);
  const y = camerafocus.y + distance * Math.sin(angles.h);
  const z = camerafocus.z + distance * Math.sin(angles.v);

  p.camera(x, y, z, camerafocus.x, camerafocus.y, camerafocus.z, 0, 0, -1.0);

  for (let i = 0; i < blockNum; ++i) {
    drawBlock(p, cargoblocks[i]);
  }

  drawTruck(p, truckdimension);
  focus();
};
const keypressed = (p: p5, key: string) => {
  if (key === "s") {
    console.log("s pressed");
  }
};
const mouseClicked = (p: p5) => {};
const uiConfig = {
  sketchId: "sketch",
  axisScaleFactor: 1.3,
  rotationSpeed: 0.05,
  zoomSpeed: 0.1,
};
const drawTruck = (p: p5, dimension: { a: number; b: number; c: number }) => {
  const { a, b, c } = dimension;

  const aAxisSize = a * uiConfig.axisScaleFactor;
  const bAxisSize = b * uiConfig.axisScaleFactor;
  const cAxisSize = c * uiConfig.axisScaleFactor;

  p.push();
  p.stroke(255, 0, 0);
  p.line(0, 0, 0, aAxisSize, 0, 0);
  p.translate(aAxisSize, 0, 0);
  p.rotateZ(Math.PI * 1.5);
  p.cone(2, 10);
  p.pop();

  p.push();
  p.stroke(255, 0, 255);
  p.line(0, 0, 0, 0, bAxisSize, 0);
  p.translate(0, bAxisSize, 0);
  p.rotateY(Math.PI * 1.5);
  p.cone(2, 10);
  p.pop();

  p.push();
  p.stroke(0, 0, 255);
  p.line(0, 0, 0, 0, 0, cAxisSize);
  p.translate(0, 0, cAxisSize);
  p.rotateX(Math.PI * 0.5);
  p.cone(2, 10);
  p.pop();

  p.push();
  p.fill(200);
  p.rect(0, 0, a, b);

  p.stroke(0);
  p.translate(a / 2, b / 2, c / 2);
  p.fill(0, 0, 0, 0);
  p.box(a, b, c);
  p.pop();
};

const colorPool = [
  [0, 0, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 0, 255],
  [0, 255, 255],
];
let nextColor = 0;

const pickColor = () => {
  nextColor = (nextColor + 1) % colorPool.length;
  return colorPool[nextColor];
};

const drawBoxAtCorner = (
  p: p5,
  corner: { a: number; b: number; c: number },
  dimension: { a: number; b: number; c: number }
) => {
  p.push();
  p.translate(corner.a, corner.b, corner.c);
  p.translate(dimension.a / 2, dimension.b / 2, dimension.c / 2);
  p.box(dimension.a, dimension.b, dimension.c);
  p.pop();
};

const drawBlock = (
  p: p5,
  block: {
    basecorner: { a: number; b: number; c: number };
    cargodimension: { a: number; b: number; c: number };
    repeation: { a: number; b: number; c: number };
  }
) => {
  p.push();

  const [r, g, b] = pickColor();
  p.fill(r, g, b, 255);

  const { cargodimension, basecorner, repeation } = block;

  for (let i = 0; i < repeation.a; ++i) {
    for (let j = 0; j < repeation.b; ++j) {
      for (let k = 0; k < repeation.c; ++k) {
        const corner = {
          a: basecorner.a + cargodimension.a * i,
          b: basecorner.b + cargodimension.b * j,
          c: basecorner.c + cargodimension.c * k,
        };

        drawBoxAtCorner(p, corner, cargodimension);
      }
    }
  }
  p.pop();
};
</script>

<script lang="ts">
export function displayPreviousTruck() {
  truckIndex = Math.max(truckIndex - 1, 0);
  blockNum = plan.truckschemes[truckIndex].cargoblocks.length;
}
export function displayNextTruck() {
  truckIndex = Math.min(truckIndex + 1, plan.truckschemes.length - 1);
  blockNum = plan.truckschemes[truckIndex].cargoblocks.length;
}
export function displayPreviousStep() {
  blockNum = Math.max(blockNum - 1, 0);
}
export function displayNextStep() {
  blockNum = Math.min(
    blockNum + 1,
    plan.truckschemes[truckIndex].cargoblocks.length
  );
}
export function rotateLeft() {
  angles.h += Math.PI * uiConfig.rotationSpeed;
}
export function rotateRight() {
  angles.h -= Math.PI * uiConfig.rotationSpeed;
}
export function rotateUp() {
  angles.v = Math.min(Math.PI / 2, angles.v + Math.PI * uiConfig.rotationSpeed);
}
export function rotateDown() {
  angles.v = Math.max(0, angles.v - Math.PI * uiConfig.rotationSpeed);
}
export function zoomIn() {
  distance = Math.max(100, distance * (1 - uiConfig.zoomSpeed));
}
export function zoomOut() {
  distance *= 1 + uiConfig.zoomSpeed;
}
</script>
