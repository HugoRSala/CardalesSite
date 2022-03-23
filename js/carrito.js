const boton = document.querySelectorAll('btnjs');

boton.addEventListener("click", agregar);

function agregar(e) {
    //le saco el comportamiento defaul al a
    e.preventDefault();
    //creo un div default que se va a agregar al html al dar click
    let divCamp = `
            <div class="carritoTitulos">
                <ul class="carritoTitulos1 lista">
                    <li>ITEM</li>
                </ul>
                <ul class="carritoTitulos2 lista">
                    <li>PRECIO</li>
                    <li>CANTIDAD</li>
                    <li>TOTAL</li>
                </ul>
            </div>`
    //traigo el carrito por ID
    const carrito = document.getElementById('carrito')
    
    carrito.innerHTML(divCamp)
    carrito.append(agregarAlCarrito)
}
