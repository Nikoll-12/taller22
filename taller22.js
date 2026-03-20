//Agregar el Canvas del HTML//
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = canvas.width, H = canvas.height;

// Parámetros de la circunferencia// 
function draw() {
  ctx.clearRect(0, 0, W, H);           // 1. limpia

  const h = +document.getElementById('hSlider').value;  // 2. lee sliders
  const k = +document.getElementById('kSlider').value;
  const r = +document.getElementById('rSlider').value;

  document.getElementById('hVal').textContent = h;
  document.getElementById('kVal').textContent = k;
  document.getElementById('rVal').textContent = r;

  drawAxes();
  bresenhamCircle(h, k, r);            // 3. redibuja
}
document.getElementById('hSlider').addEventListener('input', draw);
document.getElementById('kSlider').addEventListener('input', draw);
document.getElementById('rSlider').addEventListener('input', draw);

draw();
// Convierte coordenadas matemáticas al sistema de píxeles del canvas
function toPixel(x, y) {
  return [
    Math.round(W / 2 + x),
    Math.round(H / 2 - y)
  ];
}   
function plotPixel(x, y) {
  const [px, py] = toPixel(x, y);
  ctx.fillRect(px, py, 1, 1);
}
// Algoritmo de Bresenham para circunferencia
// Traza los 8 octantes usando simetría
function bresenhamCircle(h, k, r) {
  let x = 0;
  let y = r;
  let d = 3 - 2 * r; // parámetro de decisión inicial

  ctx.fillStyle = "black";

  while (x <= y) {
    // Los 8 puntos simétricos de la circunferencia
    plotPixel(h + x, k + y);
    plotPixel(h - x, k + y);
    plotPixel(h + x, k - y);
    plotPixel(h - x, k - y);
    plotPixel(h + y, k + x);
    plotPixel(h - y, k + x);
    plotPixel(h + y, k - x);
    plotPixel(h - y, k - x);

    // Actualizar parámetro de decisión
    if (d < 0) {
      d = d + 4 * x + 6;
    } else {
      d = d + 4 * (x - y) + 10;
      y--;
    }
    x++;
  }
}
//Dibujar cada uno de los ejes de referencia de la coordenada de la circunferencia// 
function drawAxes() {
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
//Eje x 
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
//Eje y
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    //Numeros dentro del eje// 
     ctx.fillStyle = "#999";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    //Pixeles en los que ya se pone un número// 
    const paso = 40;
    for (let i = -4; i <= 4; i++) {
    if (i === 0) continue; // el centro no se marca

    const px = W/2 + i * paso; // posición en X del número
    const py = H/2 + i * paso; // posición en Y del número
    // Marcas y números sobre el eje X
    ctx.beginPath(); ctx.moveTo(px, H/2 - 4); ctx.lineTo(px, H/2 + 4); ctx.stroke();
    ctx.fillText(i * paso, px, H/2 + 14);

    // Marcas y números sobre el eje Y
    ctx.beginPath(); ctx.moveTo(W/2 - 4, py); ctx.lineTo(W/2 + 4, py); ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(-i * paso, W/2 - 8, py + 4);
    ctx.textAlign = "center";
  }

  // Origen
  ctx.fillText("0", W/2 - 10, H/2 + 14);
}

//Dibujar la circunferencia usando el algoritmo de Bresenham//
drawAxes();
bresenhamCircle(h, k, r);

