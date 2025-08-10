// Texto con efecto máquina de escribir
const text = "Feliz cumpleaños mi amor, eres mi regalo más hermoso 💖";
let i = 0;
function typeWriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 90);
    }
}
window.addEventListener('DOMContentLoaded', ()=> {
    typeWriter();
    setupGallery();
    setupMusic();
});

// Animación de corazones en canvas
const canvas = document.getElementById("hearts");
const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
let hearts = [];
function resizeCanvas(){
    if(!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function createHearts(){
    hearts = [];
    const count = Math.floor(window.innerWidth / 40);
    for(let i=0;i<count;i++){
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 18 + 8,
            speed: Math.random() * 0.8 + 0.3,
            tilt: Math.random() * Math.PI * 2
        });
    }
}
function drawHeartPath(x,y,size){
    // draw a simple heart shape
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size/2, y - size/1.8, x + size, y + size/3, x, y + size);
    ctx.bezierCurveTo(x - size, y + size/3, x - size/2, y - size/1.8, x, y);
    ctx.closePath();
    ctx.fill();
}
function animate(){
    if(!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hearts.forEach(h=>{
        ctx.fillStyle = "rgba(255,110,160,0.9)";
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(Math.sin(h.tilt)*0.3);
        drawHeartPath(0,0,h.size);
        ctx.restore();
        h.y -= h.speed;
        h.x += Math.sin(h.tilt)*0.3;
        h.tilt += 0.01;
        if(h.y < -50){
            h.y = canvas.height + 50;
            h.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animate);
}
window.addEventListener('resize', ()=>{ resizeCanvas(); createHearts(); });
if(canvas && ctx){
    resizeCanvas();
    createHearts();
    animate();
}

// Galería automática: detecta las imágenes colocadas en /img
function setupGallery(){
    const gallery = document.querySelector('.gallery');
    if(!gallery) return;
    const sample = ["foto1.jpg","foto2.jpg","foto3.jpg"];
    sample.forEach(name=>{
        const img = document.createElement('img');
        img.src = `img/${name}`;
        img.alt = "Foto";
        gallery.appendChild(img);
    });
}

// Música
function setupMusic(){
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('toggle-music');
    if(!audio || !btn) return;
    btn.addEventListener('click', ()=>{
        if(audio.paused) audio.play();
        else audio.pause();
    });
    // intentar autoplay silencioso (si el navegador lo permite)
    audio.volume = 0.6;
}
