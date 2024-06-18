
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);

    // Remover clases de validación
    input.classList.remove('is-invalid', 'is-valid');

    if (input.value.trim() == '') {
        // Agregar clase de invalidación
        input.classList.add('is-invalid');
        // Mostrar mensaje de error
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        // Agregar clase de validación
        input.classList.add('is-valid');
        // Limpiar mensaje de error
        div.innerHTML = '';
        
        }

        if (id == 'fecha') {
            const dia = calcularFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No debes agregar juegos que saldran en el futuro</span>'
            }
        }
        
        //validación sueldo
        if (id == 'precio') {
            if (input.value < 5000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No hay juegos que valgan menos de $5000</span>'
            }
        }
    }


const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true //true permitira ver la tecla en el input
    return false //false no deja ver la tecla
}


const calcularFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}

