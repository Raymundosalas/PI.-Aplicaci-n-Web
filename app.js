const API = 'http://localhost:3000/api';

let token = '';

async function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    token = data.token;

    alert('Login correcto');

    obtenerPeliculas();
}

async function obtenerPeliculas(){

    const response = await fetch(`${API}/peliculas`,{
        headers:{
            'Authorization': token
        }
    });

    const peliculas = await response.json();

    const lista = document.getElementById('listaPeliculas');

    lista.innerHTML = '';

    peliculas.forEach(pelicula => {

        lista.innerHTML += `
            <li>
                <strong>${pelicula.titulo}</strong>
                (${pelicula.anio}) - ${pelicula.genero}
            </li>
        `;
    });
}

async function agregarPelicula(){

    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const anio = document.getElementById('anio').value;
    const descripcion = document.getElementById('descripcion').value;

    await fetch(`${API}/peliculas`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            titulo,
            genero,
            anio,
            descripcion
        })
    });

    obtenerPeliculas();
}
