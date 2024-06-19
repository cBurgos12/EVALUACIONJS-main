//se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update, checkarNombre } from './firestore.js'
//id para guardar el id del documento 
let id = 0
//addEventListener permite activar el elemento según un evento(click)
document.getElementById('btnSave').addEventListener('click', async (event) => {
    
    event.preventDefault()
    //validamos que los campos no seas vacios
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    const nombre = document.getElementById('nombre').value.trim()

    if (document.querySelectorAll('.is-invalid').length == 0) {   
        const jue = {
            nom: document.getElementById('nombre').value,
            fecha: document.getElementById('fecha').value,
            cat: document.getElementById('cat').value,
            tem: document.getElementById('tem').value,
            plat: document.getElementById('plat').value,
            mod: document.getElementById('mod').value,
            idioma: document.getElementById('idioma').value,
            precio: document.getElementById('precio').value,
            // edad: document.getElementById('+3').value,
            // edad: document.getElementById('+7').value,
            // edad: document.getElementById('+12').value,
            // edad: document.getElementById('+16').value,
            // edad: document.getElementById('+18').value,
            edad : document.querySelector('input[name="edad"]:checked').value
        }
        if (id == 0) {
            if (await checkarNombre(nombre)) {
                Swal.fire({
                    title: "ERROR",
                    icon: "error",
                    text:"El nombre del juego ya está registrado",
                    color: "#980303",
                    confirmButtonColor: '#00ffe1',
                    customClass:{
                    confirmButton: 'swal2-confirmm'
                    }
                });
                document.getElementById('nombre').classList.add('is-invalid');
            }
            else{
            //función que permite el guardado de datos
            save(jue)
            Swal.fire({ text: "Se ha guardado exitosamente :D!",
                title: "",
                icon: "success",
                color: "#51ff00",
                confirmButtonColor: '#00ffe1',
                customClass: {
                popup: 'my-swal',
                confirmButton: 'swal2-confirmm'
                }})
            }
            
        } else{
            //permite editar los datos si el id es diferente de 0
            update(id,jue)
        
        Swal.fire({ text: "Se ha editado exitosamente :D!",
            title: "",
            icon: "success",
            color: "#51ff00",
            confirmButtonColor: '#00ffe1',
            customClass: {
            popup: 'my-swal',
            confirmButton: 'swal2-confirmm'
            }})
        }
        
        id = 0
        limpiar()
    }
})
//DOMCOntentLoaded es un evento que se ejecuta cuando se reacarga la página
window.addEventListener('DOMContentLoaded', () => {
    //getData función que trae la colección
    getData((datos) => {
        let tabla = ''
        //recorremos la colección y creamos el objeto jue que trae cada documento
        datos.forEach((jue) => {
            //jue.data() trae los datos de cada documento
            const item = jue.data()
            tabla += `<tr>
                <td>${item.nom}</td>
                <td>${item.fecha}</td>
                <td>${item.cat}</td>
                <td>${item.tem}</td>
                <td>${item.plat}</td>
                <td>${item.mod}</td>
                <td>${item.idioma}</td>
                <td>${item.precio}</td>
                <td>${item.edad}</td>
                <td></td>
                <td nowrap>
                    <button class="btn btn-warning BTNCITO" id="${jue.id}">Editar</button>
                    <button class="btn btn-danger BTNCITO" id="${jue.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificamos cual es el botón presionado
            btn.addEventListener('click', () => {
                //sweetalert que permite confirmación
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //presiono el botón eliminar
                    if (result.isConfirmed) {
                        //función eliminar
                        remove(btn.id)
                        limpiar()
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success",
                            color: "#51ff00",
                            confirmButtonColor: '#00ffe1',
                            customClass: {
                            popup: 'my-swal',
                            confirmButton: 'swal2-confirmm'
                            }
                        })
                    }
                })
            })
        })
        //seleccionar 
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                //invocar función que permite buscar el documento por id
                const doc = await getDocumento(btn.id)
                //asignar los valores del documento
                const jue = doc.data()

                document.getElementById('nombre').value = jue.nom
                document.getElementById('fecha').value = jue.fecha
                document.getElementById('cat').value = jue.cat
                document.getElementById('tem').value = jue.tem
                document.getElementById('plat').value = jue.plat
                document.getElementById('mod').value = jue.mod
                document.getElementById('idioma').value = jue.idioma
                document.getElementById('precio').value = jue.precio
                // document.getElementById('+3').value = jue.edad
                // document.getElementById('+7').value = jue.edad
                // document.getElementById('+12').value = jue.edad
                // document.getElementById('+16').value = jue.edad
                // document.getElementById('+18').value = jue.edad
                document.querySelector(`input[name="edad"][value="${jue.edad}"]`).checked = true;
                //asignamos el id del documento a la variable
                id = doc.id
                //run sólo lectura
                //btn cambie el valor a editar
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})
