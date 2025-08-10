// Cambia esta fecha por la fecha real de Fátima (formato dd/mm/yyyy)
const CORRECT_DATE = "07/05/2000";

document.getElementById('enterBtn').addEventListener('click', checkDate);
document.getElementById('dob').addEventListener('keyup', function(e){
    if(e.key === 'Enter') checkDate();
});

function checkDate(){
    const input = document.getElementById('dob').value.trim();
    if(!input) { alert("Ingresa la fecha, por favor 😊"); return; }
    if (input === CORRECT_DATE) {
        // Para un toque extra: pasar por history.replaceState para que no pueda volver con el botón atrás
        window.location.href = "main.html";
    } else {
        alert("Ups... esa no es la fecha correcta 💔");
        // efecto shake rápido
        const c = document.querySelector('.login-container');
        c.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:300});
    }
}
