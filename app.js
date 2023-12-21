const form = document.getElementById('formregister');
const nameinput = document.getElementById('nameinput');
const emailinput = document.getElementById('emailinput');
const tablebody = document.getElementById('tablebody');
let data = JSON.parse(localStorage.getItem('formData')) || []; 

form.addEventListener('submit', function(event){

    event.preventDefault();
    
    const name = nameinput.value;
    const email = emailinput.value;

    if(name && email){
        const newData = {name,email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
    alert ('Debe de rellenar todos los cuadros, por favor');
    }

})
function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data));
}


function renderTable(){
    tablebody.innerHTML = '';


    data.forEach (function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('formulario-boton')
        const deleteButton = document.createElement('formulario-boton')
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;   
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';
        editButton.classList.add('formulario-boton');
        deleteButton.classList.add('formulario-boton');
        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);


        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tablebody.appendChild(row);

    })  
}

function editData(index){
    const item = data[index];
    nameinput.value = item.name;
    emailinput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index){
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();