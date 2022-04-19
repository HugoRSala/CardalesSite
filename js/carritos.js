const cajaCarrito = document.getElementById('carrito2')
const contenedorPicadas = document.getElementById('contenedorPicadas')
const templateCarrito = document.getElementById('templateCarrito').content
const fragment = document.createDocumentFragment()
const total = []
const carritoCondicion = document.getElementById('carritoCondicion')
//llamamos al carrito
const carrito = document.getElementById('carrito')
//llamamos a los botones
const botones = document.querySelector('.btnjs')
//por cada boton clickeado ejecutamos llamadaBoton

const URL = '../js/api.json'

let carritoFinal = {}
document.addEventListener('DOMContentLoaded', () => {
    traerData()
    if (localStorage.getItem('elementosGuardados')) {
        carritoFinal = JSON.parse(localStorage.getItem('elementosGuardados'))
        agregarAlCarrito()
        /*   contarElementosCarrito() */
    }
})



const traerData = async () => {
    try {
        await fetch(URL)
            .then(response => response.json())
            .then(data => {
                data.forEach(e => {
                    agregarAlDom(e);
                });
            })

    } catch (error) {
        console.log(error);
    }
}


contenedorPicadas.addEventListener('click', e => {
    e.preventDefault()
    agregar(e)
})

cajaCarrito.addEventListener('click', e => {
    borraElemento(e)
})

function agregarAlDom(e) {
    const elementoAAgregar = document.createElement('div')

    elementoAAgregar.innerHTML = `
<div class="card" style="width: 30rem;">
  <img src="${e.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${e.name} ${e.size}</h5>
    <p class="card-text">${e.price}</p>
    <a href="#" data-id=${e.id} class="btnjs btn btn-dark">Comprar</a>
  </div>
</div>`

    contenedorPicadas.appendChild(elementoAAgregar)


}




function agregar(e) {
    if (e.target.classList.contains('btnjs')) {
        agregandoAlCarrito(e.target.parentElement);
    }

}
const agregandoAlCarrito = obj => {
    const productoFinal = {
        id: obj.querySelector('.btnjs').dataset.id,
        nombre: obj.querySelector('h5').textContent,
        precio: obj.querySelector('p').textContent,
        cantidad: 1,

    }
    if (carritoFinal.hasOwnProperty(productoFinal.id)) {
        productoFinal.cantidad = carritoFinal[productoFinal.id].cantidad + 1

    }

    carritoFinal[productoFinal.id] = { ...productoFinal }
    agregarAlCarrito()
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



const agregarAlCarrito = () => {
    //no se puede modificar un objeto, solo los valores
    cajaCarrito.innerHTML = '';
    Object.values(carritoFinal).forEach(elemento => {
        templateCarrito.querySelector('.borrarProducto').dataset.id = elemento.id
        templateCarrito.querySelector('.productoTituloTamano').textContent = elemento.nombre;
        templateCarrito.querySelector('.productoCantidad').textContent = parseInt(elemento.cantidad);
        templateCarrito.querySelector('.valorTotal').textContent = parseInt(elemento.precio * elemento.cantidad)
        const clonar = templateCarrito.cloneNode(true)
        fragment.appendChild(clonar)


    })
    cajaCarrito.appendChild(fragment)

    sumaTotal()
    sumaItemsCarrito()
    /* contarElementosCarrito() */
    localStorage.setItem('elementosGuardados', JSON.stringify(carritoFinal))
}


const sumaTotal = () => {
    const totalPrecios = Object.values(carritoFinal).reduce((suma, { cantidad, precio }) => suma + cantidad * precio, 0)
    const precioFinal = document.querySelector('.carritoTotal');
    precioFinal.innerHTML = `Total: $${totalPrecios}`

}

const borraElemento = e => {
    /* console.log(e.target); */
    if (e.target.classList.contains('borrarProducto')) {
        delete carritoFinal[e.target.dataset.id]
    }
    agregarAlCarrito()
    /* contarElementosCarrito() */
}



const botonAbrirCarrito = document.getElementById('btnCarrito')
const containerCarrito = document.getElementById('shopCart')
botonAbrirCarrito.addEventListener('click', () => {
    containerCarrito.style.visibility = "visible"
})

const botonCerrarCarrito = document.getElementById('cerrarCarrito')
botonCerrarCarrito.addEventListener('click', () => {
    containerCarrito.style.visibility = "hidden";
})

const sumaItemsCarrito = () => {
    Object.keys(carritoFinal).length > 0 ?
        carritoCondicion.style.visibility = "visible" :
        carritoCondicion.style.visibility = "hidden";

}

const botonFinalizar = document.getElementById('botonFinalizarCompra')
botonFinalizar.addEventListener('click', () => {
    if (Object.keys(carritoFinal).length > 0) {
        carritoFinal = {}
        agregarAlCarrito()
        containerCarrito.style.visibility = "hidden";
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Muchas gracias por su compra!',
            showConfirmButton: false,
            timer: 2000
          })
        

    }


})
