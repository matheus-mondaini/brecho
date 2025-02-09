document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    const clearButton = document.getElementById('clear-btn');

    // Carrega os usuários do Local Storage ao iniciar
    loadUsers();

    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const date = new Date().toLocaleString();
            
            const userData = { username, email, date };
            saveUser(userData);
            addUserToList(userData);
            userForm.reset();
        });
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToList(user));
    }

    function addUserToList(user) {
        const li = document.createElement('li');
        li.textContent = `Data: ${user.date} | Nome: ${user.username} | E-mail: ${user.email}`;
        
        // Botão de excluir item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', () => {
            deleteUser(user);
            li.remove();
        });
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    }

    function deleteUser(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Filtra o usuário a ser excluído
        users = users.filter(u => u.username !== user.username || u.email !== user.email);
        
        // Salva a lista atualizada no Local Storage
        localStorage.setItem('users', JSON.stringify(users));

        // Atualiza a lista exibida na página
        loadUserList(users);
    }

    function loadUserList(users) {
        userList.innerHTML = ''; // Limpa a lista antes de repopulá-la
        users.forEach(user => addUserToList(user));
    }

    // Botão para excluir todos os usuários
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('users'); // Remove todos os dados do Local Storage
        userList.innerHTML = ''; // Limpa a lista exibida
    });

    // Função de pesquisa
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        
        loadUserList(filteredUsers); // Carrega a lista filtrada
    });
});