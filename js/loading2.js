function loading() {
    setTimeout(() => {
        window.location.href = "../game/2048/2048.html";
    }, 6000); 
    //  timeout是单次计时器所以不用清除
}
loading();