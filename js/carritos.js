
const total = []
//llamamos al carrito
const carrito = document.getElementById('carrito')
//llamamos a los botones
const botones = document.querySelectorAll('.btnjs')
//por cada boton clickeado ejecutamos llamadaBoton
botones.forEach(llamadaBoton => {
    //le agregamos un eventlistener
    llamadaBoton.addEventListener('click', agregar)
})

function agregar(e) {
    //la funcion previene el default del 'a'
    e.preventDefault()
    //el target nos marca el div donde se encuentra el event
    const eventCont = e.target
    //producto nos va a ir 2 divs arriba en la anidación
    const producto = eventCont.closest('div div')
    //buscamos los titulos, precios y tamnaños
    const productoPrecio = producto.querySelector('.precios').textContent;
    const productoTitulo = producto.querySelector('.card-title').textContent;
    const productoTamano = producto.querySelector('.tamano').textContent;
    //ejecutamos una función con parametros estos 3 valores
    agregarAlCarrito(productoTitulo, productoTamano, productoPrecio)
    //función de suma para el total
    sumarTotal()
    //toastify para alertar de ingreso de elemento
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
    //primero buscamos si al agregar no hay ya un elemento con el mismo titulo asi no crea otro div con el mismo nombre y le suma la cantidad
    const productoTituloTamano = carrito.getElementsByClassName('productoTituloTamano')
    //hacemos un bucle for con el length de productoTituloTamano (aloja el titulo y tamaño del item seleccionado)
    for (i = 0; i < productoTituloTamano.length; i++) {
        //si el texto de esa variable es estrictamente igual al producto y tamaño nuevos
        if (productoTituloTamano[i].innerText === `${productoTitulo} ${productoTamano}`) {
            //busca la cantidad y le suma 1
            let cantidadElementosAcumulados = (productoTituloTamano[i].parentElement.parentElement.querySelector('.productoCantidad'));
            cantidadElementosAcumulados.innerHTML++

            //y devuelve, ya no sigue la función
            return 
        }

    }
    //si no hay un elemento con esa caracteristica crea un div
    const nuevoElemento = document.createElement('div')
    
    let contenidoDiv = `
    <div class="carritoTitulos">
        <ul class="carritoTitulos1 lista">
            <li class="productoTituloTamano">${productoTitulo} ${productoTamano}</li>
        </ul>
        <ul class="carritoTitulos2 lista">
            
            <li class="productoCantidad">1</li>
            <li class="valorTotal">${productoPrecio}</li>
            <li class="borrarProducto"><button>x</button></li>
        </ul>
    </div>
    `
    //aca hice 250 pruebas distintas
    const elementosGuardados = []
    nuevoElemento.innerHTML = contenidoDiv
    elementosGuardados.push(contenidoDiv)
    console.log(elementosGuardados);
    elementosGuardados.forEach(e => {
    localStorage.setItem('itemNuevo',e)   
       
   });
   
    /* localStorage.setItem('nuevoElemento', contenidoDiv) */
    
    
   
    /* const nuevoElementoText = nuevoElemento.innerHTML
    localStorage.setItem('nuevoElemento', nuevoElementoText) */
    
   
    //borrar item
    const botonBorrar = nuevoElemento.querySelector('.borrarProducto')
    botonBorrar.addEventListener('click', borrarElemento);

    function borrarElemento(e) {
        const botonBorrar = e.target;
        const divABorrar = botonBorrar.closest('div')
        divABorrar.remove()
        //aplicamos la funcion de la suma al total para que actualice el precio al borrar el item
        sumarTotal()
    }
    //agregamos al html el nuevo elemento
    carrito.appendChild(nuevoElemento);
    
   
    
}

//funcion de suma al total
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

const botonCarrito = document.getElementById('btnCarrito')
const carritoContenedor = document.getElementById ('shopCart')
botonCarrito.addEventListener('click', ()=> {
 carritoContenedor.style.display="block"
})

const botonCerrarCarrito = document.getElementById('cerrarCarrito')
botonCerrarCarrito.addEventListener('click', ()=>{
    carritoContenedor.style.display="none";
})