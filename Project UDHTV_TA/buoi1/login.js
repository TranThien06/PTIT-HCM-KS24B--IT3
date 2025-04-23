function validateRegisterForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!firstName) {
        document.getElementById("errorFirstName").textContent = "Không được để trống First Name";
        isValid = false;
    }

    if (!lastName) {
        document.getElementById("errorLastName").textContent = "Không được để trống Last Name";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").textContent = "Email không đúng định dạng";
        isValid = false;
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            document.getElementById("errorEmail").textContent = "Email đã tồn tại";
            isValid = false;
        }
    }

    if (!passwordRegex.test(password)) {
        document.getElementById("errorPassword").textContent =
            "Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số";
        isValid = false;
    }

    if (confirmPassword !== password) {
        document.getElementById("errorConfirmPassword").textContent = "Xác nhận mật khẩu không khớp";
        isValid = false;
    }

    if (!isValid) return false;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    document.querySelector("#register-form form").reset();
    return false;
}

function showForm(type) {
    document.getElementById("login-form").style.display = type === 'login' ? 'block' : 'none';
    document.getElementById("register-form").style.display = type === 'register' ? 'block' : 'none';
    document.getElementById("home-page").style.display = 'none';
}

function validateLoginForm() {
    const emailInput = document.querySelector("#login-form input[type='email']").value.trim();
    const passwordInput = document.querySelector("#login-form input[type='password']").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (!user) {
        alert("Email hoặc mật khẩu không đúng");
        return false;
    }

    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("home-page").style.display = "block";

    document.querySelector(".nav-buttons").style.display = "none";
    return false;
}