//Forman o no forman un triangulo// 
//Método de las pendientes// 
function Formantrangulo (p1,p2,p3){ 
    let x1=p1[0]
    let y1=p1[1] 
    
    let x2=p2[0]
    let y2=p2[1] 

    let x3=p3[0] 
    let y3=p3[1] 
    //Verificar la división en 0// 
    //Verificar que no sean lineas colineales entre sí// 
if (x1==x2){
if (x3==x1){
    return false;
}else{ 
    return true;  //Ya que no son colineales// 
} //Ya que son colineales// 
}else{ 
  let m1=(y2-y1)/(x2-x1)
  if (x3-x1==0){ //Otro caso de divisón en cero// 
    return true;}  //Ya que no son colineales// 
    else{ let m2=(y3-y1)/(x3-x1) //Verificar la siguiente pendiente//
    if (Math.abs(m1 - m2) < 0.0001) {
    return false;
} else {
    return true;
}
}
}
}
function drawPoint(ctx, x, y, size) {
    ctx.fillRect(x - size/2, y - size/2, size, size);
}
function DibujarDDA (x1,y1,x2,y2,size, ctx ){ //X1 y Y1 son el punto de inicio y X2 y Y2 son el punto de destino// 
    let dx= x2-x1 
    let dy= y2-y1
    let steps = Math.max(Math.abs(dx), Math.abs(dy))
    let xInc= dx/steps //Encontrar la cantidad de incrementos para rayar el pixel dentor de la pantalla// 
    let yInc=dy/steps
    let x=x1 //Declarar los puntos iniciales// 
    let y=y1
    for (let i = 0; i <= steps; i++) {//Recorrer las coordenadas//
    drawPoint(ctx, Math.round(x), Math.round(y), size);
    x+=xInc //Sumar a lo que ya dibuje los incrementos en x//
    y+=yInc //Sumar a lo que ya dibuje los incrementos en y//
}
}
function DibujarBresenham (x1,y1,x2,y2,size, ctx){ 
    let dx = Math.abs(x2 - x1);  // diferencia en X (positiva siempre)
    let dy = Math.abs(y2 - y1);  // diferencia en Y (positiva siempre)
    
    let sx = x1 < x2 ? 1 : -1;  // dirección en X (+1 derecha, -1 izquierda)
    let sy = y1 < y2 ? 1 : -1;  // dirección en Y (+1 abajo, -1 arriba)
    
    // p es el "parámetro de decisión": decide si avanzar en Y o no
    // Se inicializa como dx - dy (solo aritmética entera, sin decimales)
    let p = dx - dy;
    
    let x = x1;
    let y = y1;
    
    while (true) {
        drawPoint(ctx, x, y, size);  // dibujar píxel actual
        
        if (x === x2 && y === y2) break;  // llegamos al destino, parar
        
        let p2 = 2 * p;  // evita multiplicar dos veces en cada comparación
        
        // Si p2 > -dy → el error en X superó el umbral → avanzar en X
        if (p2 > -dy) {
            p -= dy;
            x += sx;
        }
        // Si p2 < dx → el error en Y superó el umbral → avanzar en Y
        if (p2 < dx) {
            p += dx;
            y += sy;
        }
    }
}
function leerPuntos() {
    return {
        x1: parseInt(document.getElementById("x1").value), //Getelement es un método y el Id es como fue declaro desde el incio de mi matíz// 
        y1: parseInt(document.getElementById("y1").value),//Parseint es el que me permite converitr cualquier número a entero// 
        x2: parseInt(document.getElementById("x2").value),
        y2: parseInt(document.getElementById("y2").value),
        x3: parseInt(document.getElementById("x3").value),
        y3: parseInt(document.getElementById("y3").value),
        size: parseInt(document.getElementById("grosor").value)
    };
}
function verificar() {
    let l = leerPuntos();
    if (Formantrangulo([l.x1,l.y1], [l.x2,l.y2], [l.x3,l.y3])) {
        document.getElementById("resultado").innerText = "Sí forman un triángulo";
    } else {
        document.getElementById("resultado").innerText = " No forman un triángulo";
    }
}
function drawLine(ctx, x1, y1, x2, y2, size, method) {
    if (method=='DDA'){ 
        DibujarDDA (x1,y1,x2,y2,size, ctx )
        //Llamar a dibuar DDA// 
    }
else{ 
DibujarBresenham (x1,y1,x2,y2,size, ctx)
}
}
// Convierte coordenadas cartesianas a coordenadas del canvas
function cartesianasACanvas(cx, cy, origen) {
  return {
    x: origen.x + cx,
    y: origen.y - cy  // Y invertido
  };
}

// Dibuja la cuadrícula con ejes y números
function dibujarCuadricula(ctx, W, H, origen) {
  ctx.fillStyle = '#fdf9f8';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(107,26,42,0.09)';
  ctx.lineWidth = 0.5;
  ctx.font = '9px IBM Plex Mono, monospace';
  for (let cx = -origen.x; cx <= W - origen.x; cx += 40) {
    const px = origen.x + cx;
    ctx.beginPath(); ctx.moveTo(px,0); ctx.lineTo(px,H); ctx.stroke();
    if (cx !== 0) { ctx.fillStyle='rgba(107,26,42,0.38)'; ctx.textAlign='center'; ctx.textBaseline='top'; ctx.fillText(cx, px, origen.y+4); }
  }
  for (let cy = -origen.y; cy <= H - origen.y; cy += 40) {
    const py = origen.y + cy;
    ctx.beginPath(); ctx.moveTo(0,py); ctx.lineTo(W,py); ctx.stroke();
    if (cy !== 0) { ctx.fillStyle='rgba(107,26,42,0.38)'; ctx.textAlign='right'; ctx.textBaseline='middle'; ctx.fillText(-cy, origen.x-4, py); }
  }
  ctx.strokeStyle='rgba(107,26,42,0.4)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(0,origen.y); ctx.lineTo(W,origen.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(origen.x,0); ctx.lineTo(origen.x,H); ctx.stroke();
}

// Función compartida para trazar el triángulo
function trazar(method) {
  const l = leerPuntos();
  if (!Formantrangulo([l.x1,l.y1],[l.x2,l.y2],[l.x3,l.y3])) {
    document.getElementById('resultado').innerText = '✗ No forman triángulo, nada que trazar.';
    return;
  }
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const origen = { x: W/2, y: H/2 };
  dibujarCuadricula(ctx, W, H, origen);
  const pA = cartesianasACanvas(l.x1, l.y1, origen);
  const pB = cartesianasACanvas(l.x2, l.y2, origen);
  const pC = cartesianasACanvas(l.x3, l.y3, origen);
  ctx.fillStyle = '#6b1a2a';
  drawLine(ctx, pA.x, pA.y, pB.x, pB.y, l.size, method);
  drawLine(ctx, pB.x, pB.y, pC.x, pC.y, l.size, method);
  drawLine(ctx, pC.x, pC.y, pA.x, pA.y, l.size, method);
  document.getElementById('resultado').innerText = '✓ Triángulo trazado con ' + method;
}

function trazarDDA()       { trazar('DDA'); }
function trazarBresenham() { trazar('Bresenham'); }

function limpiar() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  dibujarCuadricula(ctx, canvas.width, canvas.height, { x: canvas.width/2, y: canvas.height/2 });
  document.getElementById('resultado').innerText = 'Canvas limpiado.';
}

// Dibuja la cuadrícula al cargar la página
window.onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  dibujarCuadricula(ctx, canvas.width, canvas.height, { x: canvas.width/2, y: canvas.height/2 });
};






