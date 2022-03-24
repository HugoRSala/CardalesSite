//llamamos a los botones
const total = []
const carrito = document.getElementById('carrito')
const botones = document.querySelectorAll('.btnjs')
//por cada boton clickeado ejecutamos llamada boton
botones.forEach(llamadaBoton => {
    //le agregamos un eventlistener
    llamadaBoton.addEventListener('click', agregar)
})

//la funcion previene el default del 'a'
function agregar(e) {
    e.preventDefault()
    const eventCont = e.target
    const producto = eventCont.closest('div div')
    const productoPrecio = producto.querySelector('.precios').textContent;
    const productoTitulo = producto.querySelector('.card-title').textContent;
    const productoTamano = producto.querySelector('.tamano').textContent;
    agregarAlCarrito(productoTitulo, productoTamano, productoPrecio)
    sumarTotal()
    Toastify({
        text: "Agregaste un producto",
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#000000",

        },


    }).showToast();
}


function agregarAlCarrito(productoTitulo, productoTamano, productoPrecio) {
    //traigo los elementos que tengan clase productoTituloPrecio
    
    const productoTituloPrecio = carrito.getElementsByClassName('productoTituloPrecio')
    for (i = 0; i < productoTituloPrecio.length; i++) {
        if (productoTituloPrecio[i].innerText === `${productoTitulo} ${productoTamano}`) {
            
            let cantidadElementosAcumulados = (productoTituloPrecio[i].parentElement.parentElement.querySelector('.productoCantidad'));
            cantidadElementosAcumulados.innerHTML++
            
            return 
        }

    }
    
    const nuevoElemento = document.createElement('div')
    nuevoElemento.innerHTML = `
    <div class="carritoTitulos">
        <ul class="carritoTitulos1 lista">
            <li class="productoTituloPrecio">${productoTitulo} ${productoTamano}</li>
        </ul>
        <ul class="carritoTitulos2 lista">
            
            <li class="productoCantidad">1</li>
            <li class="valorTotal">${productoPrecio}</li>
            <li class="borrarProducto"><button>x</button></li>
        </ul>
    </div>
    `

    localStorage.setItem('elemento', nuevoElemento)
    const botonBorrar = nuevoElemento.querySelector('.borrarProducto')
    botonBorrar.addEventListener('click', borrarElemento);

    function borrarElemento(e) {
        const botonBorrar = e.target;
        const divABorrar = botonBorrar.closest('div')
        divABorrar.remove()
        sumarTotal()
    }
  
    carrito.appendChild(nuevoElemento);
}

function sumarTotal() {
    let suma = 0
    const carritoTotal = document.querySelector('.carritoTotal');
  

    const carritoDiv = document.querySelectorAll('.carritoTitulos');
   
    
    carritoDiv.forEach((carritoTitulos) => {
        const precios = carritoTitulos.querySelector('.valorTotal')
        const preciosFinales = parseInt(precios.innerText);
        const cantidad = carritoTitulos.querySelector('.productoCantidad');
        const cantidadFinal = parseInt(cantidad.innerText)
        
        suma = suma + preciosFinales * cantidadFinal
   
    });    
    carritoTotal.innerText = `Total Pedido: $${suma}`
  
}

