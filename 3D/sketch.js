// the minimum data required by the example
/* eslint-disable */
// const plan = {
//     truckschemes: [
//         {
//             truckdimension: {
//                 a: 100,
//                 b: 300,
//                 c: 200
//             },
//             cargoblocks: [
//                 {
//                     cargodimension: {
//                         a: 30,
//                         b: 20,
//                         c: 10
//                     },
//                     basecorner: {
//                         a: 0,
//                         b: 0,
//                         c: 0
//                     },
//                     repeation: {
//                         a: 1,
//                         b: 5,
//                         c: 20
//                     }
//                 },
//                 {
//                     cargodimension: {
//                         a: 30,
//                         b: 20,
//                         c: 10
//                     },
//                     basecorner: {
//                         a: 30,
//                         b: 0,
//                         c: 0
//                     },
//                     repeation: {
//                         a: 1,
//                         b: 5,
//                         c: 20
//                     }
//                 }
//             ]
//         },
//         {
//             truckdimension: {
//                 a: 100,
//                 b: 250,
//                 c: 200
//             },
//             cargoblocks: [
//                 {
//                     cargodimension: {
//                         a: 30,
//                         b: 20,
//                         c: 10
//                     },
//                     basecorner: {
//                         a: 0,
//                         b: 0,
//                         c: 0
//                     },
//                     repeation: {
//                         a: 1,
//                         b: 5,
//                         c: 20
//                     }
//                 }
//             ]
//         }
//     ]
// };

//获取地址栏参数，name:参数名称
function getUrlParms(name) {
    let url = window.location.href;//获取请求进来的完整url
    let tstr = url.substring(url.indexOf('?') + 1).split('&');//先截取url的?后面的参数部分，在根据&分割成参数数组
    let result = {};
    tstr.forEach((item) => {
        let res = item.split('=');//res为type,my-component1.vue。  res[0]为type，res[1为]my-component1.vue
        result[res[0]] = res[1];//构造成键值对形式 res[0]为键，res[1]为值 例：type: "my-component1.vue" 
    })
    return result[name];//通过键取值
}

var encodeData = getUrlParms("json");//调用函数即可
var decodeData = window.atob(encodeData);
plan = JSON.parse(decodeData);
console.log(plan);


// references and tutorials about p5.js:
//
// https://happycoding.io/tutorials/p5js/web-dev
// https://p5js.org/examples/3d-geometries.html 3d
// https://hub.fastgit.org/freshfork/p5.EasyCam/ easycam

// p5.js related
var easycam = null;

// p5.js related
const p5Config = {
    canvasWidth: 1600,
    canvasHeight: 1200,
    sketchId: 'sketch',
    axisScaleFactor: 1.3,
};

var truckIndex = 0;
var blockNum = plan.truckschemes[0].cargoblocks.length;

// required by p5.js
function setup() {
    // create the canvas
    let canvas = createCanvas(p5Config.canvasWidth, p5Config.canvasHeight, WEBGL);

    // attach the canvas to the html element
    canvas.parent(p5Config.sketchId);

    // create the camera
    easycam = createEasyCam();

    // suppress right-click context men
    document.oncontextmenu = function () { return false; }
}

// draw the truck (and the axes).
function drawTruck(dimension) {
    let { a, b, c } = dimension;

    let aAxisSize = a * p5Config.axisScaleFactor;
    let bAxisSize = b * p5Config.axisScaleFactor;
    let cAxisSize = c * p5Config.axisScaleFactor;

    push();
    stroke(255, 0, 0);
    line(0, 0, 0, aAxisSize, 0, 0);
    translate(aAxisSize, 0, 0);
    rotateZ(Math.PI * 1.5);
    cone(2, 10);
    pop();

    push();
    stroke(255, 0, 255);
    line(0, 0, 0, 0, bAxisSize, 0);
    translate(0, bAxisSize, 0);
    rotateY(Math.PI * 1.5);
    cone(2, 10);
    pop();

    push();
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, cAxisSize);
    translate(0, 0, cAxisSize);
    rotateX(Math.PI * 0.5);
    cone(2, 10);
    pop();

    push();
    fill(200)
    rect(0, 0, a, b);

    stroke(0);
    translate(a / 2, b / 2, c / 2);
    fill(0, 0, 0, 0);
    box(a, b, c);
    pop();

    easycam.setCenter([a / 2, b / 2, c / 2], 0);
}

const colorPool = [
    [0, 0, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255],
    [0, 255, 255],
];

var nextColor = 0;

function pickColor() {
    nextColor = (nextColor + 1) % colorPool.length;
    return colorPool[nextColor];
}

function drawBoxAtCorner(corner, dimension) {
    push();
    translate(corner.a, corner.b, corner.c);
    translate(dimension.a / 2, dimension.b / 2, dimension.c / 2);
    box(dimension.a, dimension.b, dimension.c);
    pop();
}

function drawBlock(block) {
    push();

    let [r, g, b] = pickColor();
    fill(r, g, b, 255);

    let { cargodimension, basecorner, repeation } = block;

    for (let i = 0; i < repeation.a; ++i) {
        for (let j = 0; j < repeation.b; ++j) {
            for (let k = 0; k < repeation.c; ++k) {
                let corner = {
                    a: basecorner.a + cargodimension.a * i,
                    b: basecorner.b + cargodimension.b * j,
                    c: basecorner.c + cargodimension.c * k
                };

                drawBoxAtCorner(corner, cargodimension);
            }
        }
    }

    pop();
}

// required by p5.js
function draw() {
    background(250);

    nextColor = 0;

    let { truckdimension, cargoblocks } = plan.truckschemes[truckIndex];

    for (let i = 0; i < blockNum; ++i) {
        drawBlock(cargoblocks[i]);
    }

    drawTruck(truckdimension);
}

$("#display-previous-truck").click(function () {
    truckIndex = max(truckIndex - 1, 0);
    blockNum = plan.truckschemes[truckIndex].cargoblocks.length;
});

$("#display-next-truck").click(function () {
    truckIndex = min(truckIndex + 1, plan.truckschemes.length - 1);
    blockNum = plan.truckschemes[truckIndex].cargoblocks.length;
});

$("#display-previous-step").click(function () {
    blockNum = max(blockNum - 1, 0);
});

$("#display-next-step").click(function () {
    blockNum = min(blockNum + 1, plan.truckschemes[truckIndex].cargoblocks.length);
});

// save the cpu cycles
$("#stop-loop").click(function () {
    noLoop();
});

$("#resume-loop").click(function () {
    loop();
});


