const id_del = document.getElementById('id_del');
const name_del = document.getElementById('name_del');
const age_del = document.getElementById("age_del")
const email_del = document.getElementById('email_del');
const role_del = document.getElementById("delete-role")
const deleteModal = document.getElementById("deleteModal");
const closeDeleteButton = document.getElementById("closeDelete")
const bsDeleteModal = new bootstrap.Modal(deleteModal);

async function deleteModalData(id) {
    const  urlForDel = '/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        let userData =
            await usersPageDel.json().then(user => {
                id_del.value = `${user.id}`;
                name_del.value = `${user.username}`;
                age_del.value = `${user.age}`;
                email_del.value = `${user.email}`;
                role_del.value = user.roles.map(r=>r.name).join(", ");
            })

        bsDeleteModal.show();
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}
async function deleteUser() {
    let urlDel = '/admin/users/' + id_del.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlDel, method).then(() => {
        closeDeleteButton.click();
        getAdminPage();
    })
}