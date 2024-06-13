
async function fetchUsers() {
    try {
        const response = await fetch('https://api-chat-1-eg56.onrender.com/');
        const users = await response.json();
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = ''; // Limpiar el contenido anterior

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `
                <span>${user.id}: ${user.nombre}</span>
                <button  onclick="deleteUser(${user.id})"></button>
                <select  onclick="showEditUser(${user.id}, '${user.nombre}')">
                   <option>...</option>
                   <option>editar</option>
                </select>
            `;
            usersDiv.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
    }
}

async function addUser() {
    const nombre = document.getElementById('nombre').value;
    if (!nombre) return alert('Por favor ingrese un mensaje ');
    try {
        const response = await fetch('https://api-chat-1-eg56.onrender.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });
        if (response.ok) {
            fetchUsers();
            document.getElementById('nombre').value = ''; // Limpiar el campo de entrada
            Swal.fire({
                position: "bottom-end",
                icon: "success",
                title: "MENSAJE ENVIADO",
                showConfirmButton: false,
                timer: 15000
              });
        } else {
            console.error('Error al agregar el mensaje:', response.statusText);
        }
    } catch (error) {
        console.error('Error al agregar el mensaje:', error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch('https://api-chat-1-eg56.onrender.com/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            fetchUsers();
        } else {
            console.error('Error al eliminar el mensaje:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el mensaje:', error);
    }
}

function showEditUser(id, currentName) {
    const newName = prompt('Ingrese el nuevo mensaje:', currentName);
    if (newName && newName !== currentName) {
        editUser(id, newName);
    }
}

async function editUser(id, nombre) {
    try {
        const response = await fetch('https://api-chat-1-eg56.onrender.com/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre })
        });
        if (response.ok) {
            Swal.fire({
                position: "bottom-end",
                icon: "success",
                title: "Mensaje editado con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            fetchUsers();
        } else {
            console.error('Error al editar el mensaje:', response.statusText);
        }
    } catch (error) {
        console.error('Error al editar el mensaje:', error);
    }
}
// Inicializar la lista de usuarios al cargar la página
fetchUsers();


//que al agregar cada usuario que nos muetre dos boton de agregar y se muestre en el body con ayuda del fetch