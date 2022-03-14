//Traemos en un const el select para darle una orden
const tablasMedianasSelect = document.getElementById('medianas');
const tablasChicasSelect = document.getElementById('chicas');
const tablasGrandesSelect = document.getElementById('grandes');

//le damos una orden de evento a ese select
tablasMedianasSelect.addEventListener("click", cambiarImagenesMedianas)
const divTablasMedianas = document.getElementById('tablasMedianas');
const divTablasChicas = document.getElementById('tablasChicas');
const divTablasGrandes = document.getElementById('tablasGrandes');

function cambiarImagenesMedianas (){
    divTablasChicas.style.display = 'none';
    divTablasMedianas.style.display = 'block';
    divTablasGrandes.style.display = 'none';
}
tablasChicasSelect.addEventListener("click",cambiarImagenesChicas)
function cambiarImagenesChicas (){
    divTablasChicas.style.display = 'block';
    divTablasMedianas.style.display = 'none';
    divTablasGrandes.style.display = 'none';
}
tablasGrandesSelect.addEventListener("click",cambiarImagenesGrandes)
function cambiarImagenesGrandes (){
    divTablasChicas.style.display = 'none';
    divTablasMedianas.style.display = 'none';
    divTablasGrandes.style.display = 'block';
}
