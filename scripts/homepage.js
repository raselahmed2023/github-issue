document.getElementById("singIn").addEventListener('click', function () {

    const inputUsername = document.getElementById('inputUsername');
    const userName = inputUsername.value;

    const inputPassword = document.getElementById('inputPassword');
    const password = inputPassword.value;

    if (userName == 'admin' && password == "admin123") {
        alert('Login Successful');
        window.location.assign("/issue.html");
    } else {
        alert('login failed')
        return;
    }
})