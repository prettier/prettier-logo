const _ = require("lodash");
const path = require("path");
const puppeteer = require("puppeteer");
const readFile = require("file-or-stdin");

const offsets = [
  130,
  -100,
  120,
  40,
  -150,
  100,
  190,
  -30,
  50,
  150,
  -100,
  -50,
  -150
];
const rolls = [1, -1, 1, 1, -1, 1, 2, -1, 1, -2, 1, 2, -1];

(async () => {
  const svg = await readFile(process.argv[2]);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`data:image/svg+xml;base64,${svg.toString("base64")}`);

  // Get the dashes from the SVG using a headless browser
  const dashes = await page.evaluate(() => {
    const getColor = color => {
      switch (color) {
        case "#56B3B4":
          return 1;
        case "#EA5E5E":
          return 2;
        case "#FBBF47":
        case "#F7B93E":
          return 3;
        case "#C693C6":
        case "#BF85BF":
          return 4;
        default:
          return 0;
      }
    };

    return Array.from(document.querySelectorAll("svg rect")).map(node => {
      const rect = node.getClientRects()[0];
      return {
        length: rect.width,
        start: rect.x,
        line: rect.y,
        color: getColor(node.getAttribute("fill"))
      };
    });
  });

  await browser.close();

  // Group the rectangles by lines
  const lines = _.values(_.groupBy(dashes, dash => dash.line)).map((x, i) => ({
    initialOffset: offsets[i],
    roll: rolls[i],
    dashes: x.map(({ length, start, color }) => ({
      length: length - 10,
      start: start + 5,
      color
    }))
  }));

  const data = {
    total: Math.max(...dashes.map(({ length, start }) => length + start)) - 10,
    lines
  };

  console.log(JSON.stringify(data, 0, 2));
})();
