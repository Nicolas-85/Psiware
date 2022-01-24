const formulario = document.getElementById('formulario')
const nombre = document.getElementById('nombre')
const estatura = document.getElementById('estatura')
const edad = document.getElementById('edad')
const peso = document.getElementById('peso')
const boton = document.getElementById('button')
const pardeResultado = document.getElementById('contResultado')
const verResultado = document.getElementById('seccionRes')
const botonReinicio = document.getElementById('reiniciar')

//Impedir que se envíe el formulario sin estar completo los campos.
formulario.addEventListener('submit', (e)=>{
    e.preventDefault() 
})

//Cramos un objeto al cual a sus atributos le damos los nombres de los campos a del formulario, y un valor false para luego validar.
const formInvalido = {
    nombre: false,
    estatura: false,
    edad: false,
    peso: false,
}

//Validación de campos del formulario.
nombre.addEventListener('change', (e)=>{
    if(e.target.value.trim().length > 0) formInvalido.nombre = true
})
estatura.addEventListener('change', (e)=>{
    if(e.target.value.length > 0) formInvalido.estatura = true
})
edad.addEventListener('change', (e)=>{
    if(e.target.value.length > 0) formInvalido.edad = true
})
peso.addEventListener('change', (e)=>{
    if(e.target.value.length > 0) formInvalido.peso = true
})

//Convierto el objeto inválido a un array para poder validar el formulario y permitir el envío.
const formValidado = ()=> {
    const formValores = Object.values(formInvalido)
    const validacion = formValores.findIndex(valor => valor == false)
    if(validacion == -1) obtenerValores()
    else {
        alert('Hay campos sin rellenar')
        verResultado.classList.add('invisible')
    }
}

//Obtener Valores de los campos
const obtenerValores = () =>{
    const valorNombre = nombre.value
    const valorEstatura = estatura.value    
    const valorEdad = edad.value
    const valorPeso = peso.value
    calculoIMC(valorPeso, valorEstatura, valorNombre)

}

//realizar el calculo de IMC
const calculoIMC = (peso, estatura, nombre) => {
    const potEstatura = Math.pow(estatura, 2)
    const imc = parseInt(peso / potEstatura)
    mostrarResultado(imc, nombre)
}

//Mostrar el resultado
const mostrarResultado = (imc, nombre)=>{
    const parrafo = document.createElement('label')
    if(imc > 25)  {
        parrafo.textContent = `${nombre}, tenés sobrepeso`
        pardeResultado.prepend(parrafo)
    } else if(imc <= 25 && imc >= 20) {  
        parrafo.textContent =`${nombre}, tenés peso ideal!!`
        pardeResultado.prepend(parrafo)
    } else {
        parrafo.textContent = `${nombre}, tenés peso bajo`
        pardeResultado.prepend(parrafo)
    } 
}

//evento click del botón para calcular el IMC.
boton.addEventListener('click', ()=>{
    formValidado() 
    verResultado.classList.toggle('visible')
})

//Evento click del botón para reiniciar cálculo.
botonReinicio.addEventListener('click', ()=>{
    location.reload()
})