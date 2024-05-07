var map = L.map("map").setView({ lon: 23.88339, lat: 60.353385 }, 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

var swimPath = L.polyline([], {
  color: "blue",
});
swimPath.addTo(map);
var cyclePath = L.polyline([], {
  color: "red",
});
cyclePath.addTo(map);
var runPath = L.polyline([], {
  color: "green",
});
runPath.addTo(map);

const uinti = document.getElementById("uinti");
const pyora = document.getElementById("pyora");
const juoksu = document.getElementById("juoksu");

const gpxToLinestring = async (fileName) => {
  const data = await fetch(fileName);
  const fileString = await data.text();
  var gpx = new gpxParser();
  gpx.parse(fileString);
  const lineString = [];
  gpx.tracks[0].points.forEach((point) => {
    lineString.push([point.lat, point.lon]);
  });
  return lineString;
};

let uintiLineString = [];
let pyoraLineString = [];
let juoksuLineString = [];

const init = async () => {
  uintiLineString = await gpxToLinestring("../files/triathlon_swim.gpx");
  pyoraLineString = await gpxToLinestring("../files/triathlon_cycling.gpx");
  juoksuLineString = await gpxToLinestring("../files/triathlon_run.gpx");
  swimPath.setLatLngs(uintiLineString);
  cyclePath.setLatLngs(pyoraLineString);
  runPath.setLatLngs(juoksuLineString);
};

uinti.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    swimPath.setLatLngs(uintiLineString);
  } else {
    swimPath.setLatLngs([]);
  }
});

pyora.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    cyclePath.setLatLngs(pyoraLineString);
  } else {
    cyclePath.setLatLngs([]);
  }
});

juoksu.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    runPath.setLatLngs(juoksuLineString);
  } else {
    runPath.setLatLngs([]);
  }
});

init();
