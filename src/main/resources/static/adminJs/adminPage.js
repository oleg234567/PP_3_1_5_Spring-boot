const adminurl = '/api/admins';

const currentUser = fetch(adminurl).then(response => response.json())
currentUser.then(user => {
    console.log(user)
    console.log(user[3].roles)
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name
        })
        document.getElementById("navbar-username").innerHTML = user.username
        document.getElementById("navbar-roles").innerHTML = roles
    }
)

async function getAdminPage() {
    let page = await fetch(adminurl);

    if(page.ok) {
        let listAllUser = await  page.json();
        loadTableData(listAllUser);
    } else {
        alert(`Error, ${page.status}`)
    }
}
function loadTableData(listAllUser) {
    const tableBody = document.getElementById('admintbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            if (role.name) {
                roles.push(" " + role.name.toString()
                    .replaceAll("ROLE_", ""));
            }
        }
        dataHtml +=
`<tr>
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.age}</td>
    <td>${user.email}</td>
    <td>${roles}</td>
    <td>
        <button type="button" class="btn btn-primary" data-bs-toogle="modal"
        data-bs-target="#editModal" 
        onclick="loadDataForEditModal(${user.id})">Edit</button>
    </td>
        
    <td>
        <button class="btn btn-danger" data-bs-toogle="modal"
        data-bs-target="#deleteModal" 
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
   
</tr>`
    }
    tableBody.innerHTML = dataHtml;
}
getAdminPage();
getUserPage();