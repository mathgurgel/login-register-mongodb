async function onLogin() {
    window.location.href = `/onauth?isLogin=true`;
}

async function onRegister() {
    window.location.href = `/onauth?isLogin=false`;
}