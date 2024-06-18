// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9SP-aB6c5ffJvVvCEX3H1rsoXsiEGnss",
    authDomain: "proyectojs-2a2bd.firebaseapp.com",
    projectId: "proyectojs-2a2bd",
    storageBucket: "proyectojs-2a2bd.appspot.com",
    messagingSenderId: "920625350072",
    appId: "1:920625350072:web:72e5aed35fb84bd7c2fb4d"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
//Función de firestore que permite retornar la base de datos para su utilización
const db = getFirestore(app)

//función para guardar los datos en firestore
export const save = (JUEGOSForms) => {
    //addDoc es la función de firestore que permite añadir un nuevo documento
    //collection es la función de firestore que permite traer la colección de la db
    addDoc(collection(db, 'Juegos'), JUEGOSForms)
}

//función que permite obtener la colección 
export const getData = (data) => {
    //onSnapshot permite retornar la colleción y asignarla a la variable data 
    onSnapshot(collection(db, 'Juegos'), data)
}

//función remove, permite eliminar un registro según su id
export const remove = (id) => {
    //deleteDoc es una función de firestore que permite quitar un documento de la colección
    //doc es una función de firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'Juegos', id))
}

//función getDocument nos permite obtener un documento según su id 
//getDoc permite traer un documento según si id y acceder a sus valores
export const getDocumento = (id) => getDoc(doc(db, 'Juegos', id))

//función update permite editar un documento
export const update = (id,jue) =>{
    //updateDoc es una funcioón de firestore que permite modificar un documento
    updateDoc(doc(db,'Juegos',id),jue)
}

export const checkarNombre = async (nombre) => {
    const q = query(collection(db, 'Juegos'), where('nom', '==', nombre)); 
    const querySnapshot = await getDocs(q); 
    return !querySnapshot.empty;
}