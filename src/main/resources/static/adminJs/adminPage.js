const adminurl = '/admin/api';

const currentUser = fetch(adminurl)
    .then(response => response.json())
    .then(user => {
        let roles = '';
        user.roles.forEach(role => {
            roles += ' ' + role.name.replaceAll("ROLE_", "");
        });
        document.getElementById("navbar-username").innerHTML = user.username;
        document.getElementById("navbar-roles").innerHTML = roles;
    });

async function getAdminPage() {
    let page = await fetch(adminurl);

    if (page.ok) {
        let listAllUser = await page.json();
        loadTableData(listAllUser);
    } else {
        alert(`Error, ${page.status}`);
    }
}

function loadTableData(listAllUser) {
    const tableBody = document.getElementById('admintbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.replaceAll("ROLE_", "")); // Убираем префикс "ROLE_"
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.age}</td>
    <td>${user.email}</td>
    <td>${roles}</td>
    <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#editModal" 
        onclick="loadDataForEditModal(${user.id})">Edit</button>
    </td>
        
    <td>
        <button class="btn btn-danger" data-bs-toggle="modal"
        data-bs-target="#deleteModal" 
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
   
</tr>`;
    }
    tableBody.innerHTML = dataHtml;
}

getAdminPage();
getUserPage();
