//获取界面元素
const board=document.getElementById('board');
const cells=document.querySelectorAll('[data-cell]');
const currentStatus=document.getElementById('currentStatus');
const resetButton=document.getElementById('resetButton');
const gameEndOverlay=document.getElementById('gameEndOverlay');
const currentBeastStatusImg=document.getElementById('currentBeastImg');
const winningMessage=document.querySelector('[data-winning-message]');
const winningMessageText=document.querySelector('[data-winning-message] p');
const winningMessageImg=document.createElement('img');
//初始化
let gameIsLive = true;
let unicornTurn = true;
let winner = null;
//所有获胜组合
const winningCombinations=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
//设置鼠标悬停样式
const setBoardHoverClass=()=>{
    board.classList.remove('unicorn');
    board.classList.remove('dragon');
    if(unicornTurn){
        board.classList.add('unicorn');
    }
    else{
         board.classList.add('dragon');
    }
}
//在格子上面放置图片
const placeBeastImg=(cell,currentBeast)=>{
    cell.classList.add(currentBeast);
}
//切换回合
const swapTurns=()=>{
    unicornTurn = !unicornTurn;
}
//更新当前状态
const updateCurrentStatus=()=>{
    if(unicornTurn){
        currentBeastStatusImg.src='../neat/pic/1.png';
        currentBeastStatusImg.alt='unicorn';
    }
   else{
        currentBeastStatusImg.src='../neat/pic/2.png';
        currentBeastStatusImg.alt='dragon';
    }
}
//检查是否获胜
const checkWin = (currentBeast) =>{
    return winningCombinations.some(combination=>{
        return combination.every(i=>{
            return cells[i].classList.contains(currentBeast);
        })
    });
}
//检查是否平局
const isDraw = () =>{
    return [...cells].every(cell =>{
        return cell.classList.contains('unicorn') || cell.classList.contains("dragon");
    })
}
//开始游戏
const startGame=()=>{
    cells.forEach(cell=>{
        winningMessageImg.remove();
        cell.classList.remove('unicorn');
        cell.classList.remove('dragon');
        cell.removeEventListener('click',handleCellClick);
        cell.addEventListener('click',handleCellClick,{once : true});
    });
    setBoardHoverClass();
    gameEndOverlay.classList.remove('show');
}
//结束游戏
const endGame=(draw)=>{
    if(draw){
        winningMessageText.innerHTML='draw!';
    }
    else{
        winningMessageImg.src=unicornTurn ? '../neat/pic/1.png':'../neat/pic/2.png';
        winningMessageImg.alt=unicornTurn ? 'unicorn':'dragon';
        winningMessage.insertBefore(winningMessageImg,winningMessageText);
        winningMessageText.innerHTML='wins!!!'
    }
    gameEndOverlay.classList.add('show');
}
//处理格子点击事件
const handleCellClick=(e)=>{
    const cell = e.target;
    const currentBeast = unicornTurn ? 'unicorn' : 'dragon';
    placeBeastImg(cell,currentBeast);
    if(checkWin(currentBeast)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        updateCurrentStatus();
        setBoardHoverClass();
    }
}
//重置游戏
resetButton.addEventListener('click',startGame);
//开始游戏
startGame();