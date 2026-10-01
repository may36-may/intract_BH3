function loading() {
    setTimeout(() => {
        window.location.href = "../game/neat/game.html";
    }, 6000); 
    //  timeout是单次计时器所以不用清除
}
loading();