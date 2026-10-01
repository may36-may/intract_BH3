var board=new Array();
//棋盘内容视作一维数组，js没有像c语言那样直接的二维数组。并且如果想要就要硬写每一行每一列（冗杂并且不灵活）
var score=0;
var best; //最好不要写best=0;
var iscrush=new Array();//灰常重要，碰撞判定，有了它的存在才能让每次单次移动而不是多次

//绑定New Game按钮
document.addEventListener('DOMContentLoaded', function() {
        newgame(); //打开页面初始加载游戏
    var newGameBtn=document.getElementById("btn");
    if (newGameBtn) {
        newGameBtn.addEventListener("click", function() {
            if(confirm("你确定要重新开始ฅ(⌯͒•̩̩̩́ ˑ̫ •̩̩̩̀⌯͒)ฅ喵？")) {
                newgame();
            }
        });
    }
});

/*
//该部分是用于显示每个小格子的样式的
document.addEventListener('DOMContentLoaded', function() {
    newgame();
});
*/

function newgame(){
    //初始化棋盘
    newbuild();

    // 显示最佳分数
    best=getBestScore(); // 从本地存储获取
    if (document.getElementById("best")) {
        document.getElementById("best").textContent=best;
    }
    // 重置分数
    score=0;
    if (document.getElementById("score")) {
        document.getElementById("score").textContent=score;
    }

    //在随机1个格子里面生成数字
    generateOneNumber();
    //在随机1个格子里面生成数字，因为在新游戏里面首先要生成两个数字，因此调用两次
    generateOneNumber();

}
//初始化数字
function newbuild(){
    for(var i=0;i<4;i++)
        for( var j=0; j<4;j++){
            var gridCell = document.getElementById("grid-cell-"+i+"-"+j);
            if (gridCell) {
            gridCell.style.top=getPosTop(i,j)+"px"; //style.top 需要的是一个字符串（像"20px"、"50%"、"10em"），因此要加上px不然会出错
            gridCell.style.left=getPosLeft(i,j)+"px";
            }
        }
    
    //该部分是来显示数字的
    for(var i=0;i<4;i++){
        board[i]=new Array();   //把原来的数组变为二维数组
        iscrush[i]=new Array();
        for( var  j=0;j<4;j++)
            board[i][j]=0; //初始化每个数字
            iscrush[i][j]=false; //初始化没有碰撞
    }

    updateBoardView();//前端显示

    //score=0;
}

//根据board变量的值对前端的numbercell进行操作
//而且我每次操作board里面的值都会改变。那么每次调用都会用到这个函数，因此全局域动态考虑
function updateBoardView(){
    var numberCells = document.querySelectorAll(".number-cell");
    for(var k=0; k<numberCells.length;k++){
        numberCells[k].remove();
    }//先清除当前样式

    //根据每次新的board的值添加新的元素
    //则遍历board元素
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            //对每一个board元素生成一个numbercell
            var numberCell=document.createElement('div');
            numberCell.className="number-cell";
            numberCell.id="number-cell-"+i+"-"+j;
            document.querySelector("#grid-continer").appendChild(numberCell);
            var thenumberCell=document.getElementById('number-cell-'+i+'-'+j);   // 操作当前坐标下numbercell的值

            //无数字的时候此时board[i][j]的numbercell要显现不出来
            if(board[i][j]==0){
                //大小：0×0像素（看不见）   位置：在格子中央    视觉：隐藏但占位
                thenumberCell.style.width='0px';
                thenumberCell.style.height='0px';
                thenumberCell.style.top=(getPosTop(i,j)+50)+'px'; //位置偏移50px，让隐藏点在格子中央，动画时从中心展开
                thenumberCell.style.left=(getPosLeft(i,j)+50)+'px';
            }
            else{
                thenumberCell.style.width='100px';
                thenumberCell.style.height='100px';
                thenumberCell.style.top=getPosTop(i,j)+'px';
                thenumberCell.style.left=getPosLeft(i,j)+'px';
                thenumberCell.style.backgroundColor=getNumberBackgroundColor(board[i][j]);
                thenumberCell.style.color=getNumberColor(board[i][j]); // 文字的前景色
                thenumberCell.textContent=board[i][j];    // 显示值
            }

            iscrush[i][j]=false;    //每次新游戏都要重置成没有碰撞！！！超级重要不要漏掉哦
        }
}

//产生数字
function generateOneNumber(){
    //首先判断还能不能生成数字
    //当nospace是真的，也就是说明没有空间（也就是满了）就返回false，不生成数字了
    if( nospace(board))
        return false;  

    //随机位置（i，j）那样
    var randx=parseInt(Math.floor(Math.random()*4)); 
    //在js里面调用Math.random()生成的是0-1的随机浮点数。但是我要随机生成0-4之间的浮点随机数，因此*4；
    ////但是我要生成的是整数，我就要加上floor，下取整。也就变成了Math.floor(random()*4)
    //但是我要用作坐标，那么我就把浮点数强制转换成整数，加上paraseInt，强制转换
    var randy=parseInt(Math.floor(Math.random()*4));
    //同时我还要做一个判断这个位置是否可以使用
   //优化，使得之后游戏后期流利使用
   //后面有时间再优化一下这个
   var times=0;
   while(times<50){
        if(board[randx][randy]==0)
            break;  //有位置，可用

        //无位置，我还要重新生成数字，一直循环直到该位置产生一个可用的数字
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));

        times++;
   }
   if(times==50){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                randx=i;
                randy=j;
            }
        }
   }
    // 随机数字。50%概率生成2，50%概率生成4
    var randNumber=Math.random()<0.5?2:4;

    //随机显示
    board[randx][randy]=randNumber; //更新board变量
    showNumberWithAnimation(randx,randy,randNumber);    //通过前端动画显示（坐标+数字）
    return true;//其他情况则是还有空间，则生成数字
}

//玩家按下时的判断系统
document.addEventListener('keydown', function(event) {
    switch(event.code){
        //event.code：更适合游戏控制（关注物理键位）
        //event.key：更适合文本输入（关注实际字符）
        case 'ArrowLeft': 
        //left.玩家按下向左的键位，并且系统要判断此时可不可以移动（通过moveleft实现）
        //同时要产生新数字，并且要判断此时游戏是否结束
            if(moveLeft()){
                setTimeout("generateOneNumber()",200);  //setTimeout(generateOneNumber,200);也可以  但是setTimeout(generateOneNumber(),200);不可以
                setTimeout("isgameover()",300);
            }
            break;
         case 'ArrowUp': //up
         if(moveUp()){
                setTimeout("generateOneNumber()",200);
                setTimeout("isgameover()",300);
            }
            break;
         case 'ArrowRight': //right
         if(moveRight()){
                setTimeout("generateOneNumber()",200);
                setTimeout("isgameover()",300);
            }
            break;
         case 'ArrowDown': //down
         if(moveDown()){
                setTimeout("generateOneNumber()",200);
                setTimeout("isgameover()",300);
            }
            break;
         default: //default
            break;
    }
});

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
        if(score>best){
            best=score;
            pushBestScore(best);
            /*showsBest(best);*/
            if (document.getElementById("best")) {
            document.getElementById("best").textContent=best;
            }
        }
    }
}
function gameover(){
    alert('gameover｡ﾟ(₌இᆽஇ₌)ﾟ｡!');

}


//往左移动（包含判定以及结果）
function moveLeft(){
    //首先判断是否可以移动，并且传参（当时的）
    if(!canMoveLeft(board))
        return false;

    var ismove=false;//整体移动
    for(var i=0;i<4;i++){
    var j=1;    //从第二列开始检查不然第一列永久不动
        while(j<4){   
            var cellismove=false;//每个单元格移动
            if(board[i][j]!==0){
                for(var k=0;k<j;k++){
                    //这层循环也就是判断board[i][j]的左边
                    //如果落脚位置时空的并且无障碍物
                    //noBlockHorizonatl第二个小的在前面
                    if(board[i][k]===0&&noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        j=k;
                        ismove=true;
                        cellismove=true;
                        break;    //continue;
                    }
                    //如果落脚位置和我当前数字是一样的并且无障碍物,并且未发生碰撞（未发生碰撞时iscrush=false，碰撞了感叹号就是true）
                    else if(board[i][k]===board[i][j]&&noBlockHorizontal(i,k,j,board)&&!iscrush[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]*=2; //board[i][k]+=board[i][j];我怀疑有bug。。。。
                        board[i][j]=0;
                        ismove=true;
                        cellismove=true;
                        //add score&showscore
                        score+=board[i][k];
                        showscore(score);
                        //记下碰撞
                        iscrush[i][k]=true;
                        break;    //continue;
                    }
                }
            }
            if(cellismove)  continue;//位置正确
            // 这个单元格移动了，j已经在k位置
            // 继续while循环，检查这个新位置

            // 如果单元格是0或没有移动，检查下一个
            j++;
        }
   }
    setTimeout("updateBoardView()",200);    //200ms以后整体数据刷新
    return ismove;  //返回整体是否移动（就不用多写如果没有移动咋样移动了又咋样）
}

//往右移动（包含判定以及结果）
function moveRight(){
    //首先判断是否可以移动，并且传参（当时的）
    if(!canMoveRight(board))
        return false;
    
    var ismove=false;//整体移动
    for(var i=0;i<4;i++){
    var j=3;    //从第二列开始检查不然第一列永久不动
        while(j>=0){   
            var cellismove=false;//每个单元格移动
            if(board[i][j]!==0){
                for(var k=3;k>j;k--){
                    //这层循环也就是判断board[i][j]的左边
                    //如果落脚位置时空的并且无障碍物
                    if(board[i][k]===0&&noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        j=k;
                        ismove=true;
                        cellismove=true;
                        break;    //continue;
                    }
                    //如果落脚位置和我当前数字是一样的并且无障碍物
                    else if(board[i][k]===board[i][j]&&noBlockHorizontal(i,j,k,board)&&!iscrush[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]*=2; //board[i][k]+=board[i][j];我怀疑有bug。。。。
                        board[i][j]=0;
                        ismove=true;
                        cellismove=true;
                        //add score    
                        score+=board[i][k];
                        showscore(score);
                        //记下碰撞
                        iscrush[i][k]=true;
                        break;    //continue;
                    }
                }
            }
            if(cellismove)  continue;//位置正确
            // 这个单元格移动了，j已经在k位置
            // 继续while循环，检查这个新位置

            // 如果单元格是0或没有移动，检查下一个
            j--;
        }
   }
    setTimeout("updateBoardView()",200);    //200ms以后整体数据刷新
    return ismove;
}

//向上
function moveUp(){
    if(!canMoveUp(board))
        return false;

var ismove=false;//整体移动
    for(var i=0;i<4;i++){   //牢记i是列，j是行
    var j=1;    //从第二行开始检查不然第一行永久不动
        while(j<4){   
            var cellismove=false;//每个单元格移动
            if(board[j][i]!==0){
                for(var k=0;k<j;k++){
                    //这层循环也就是判断board[j][i]的上边
                    //如果落脚位置时空的并且无障碍物
                    //noBlockVeritcal第二个小的在前面
                    if(board[k][i]===0&&noBlockVertical(i,k,j,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
                        j=k;
                        ismove=true;
                        cellismove=true;
                        break;    //continue;
                    }
                    //如果落脚位置和我当前数字是一样的并且无障碍物
                    else if(board[k][i]===board[j][i]&&noBlockVertical(i,k,j,board)&&!iscrush[k][i]){
                        //move
                        showMoveAnimation(j,i,k,i);
                        //add
                        board[k][i]*=2; //board[i][k]+=board[i][j];我怀疑有bug。。。。
                        board[j][i]=0;
                        ismove=true;
                        cellismove=true;
                        //add score
                        score+=board[k][i];
                        showscore(score);
                        //记下碰撞
                        iscrush[k][i]=true;                       
                        break;    //continue;
                    }
                }
            }
            if(cellismove)  continue;//位置正确
            // 这个单元格移动了，j已经在k位置
            // 继续while循环，检查这个新位置

            // 如果单元格是0或没有移动，检查下一个
            j++;
        }
   }

    setTimeout("updateBoardView()",200);    //200ms以后整体数据刷新
    return ismove;  //返回整体是否移动（就不用多写如果没有移动咋样移动了又咋样）
}

//向下
function moveDown(){
    if(!canMoveDown(board))
        return false;

var ismove=false;//整体移动
    for(var i=0;i<4;i++){   //牢记i是列，j是行
    var j=3;    
        while(j>=0){   
            var cellismove=false;//每个单元格移动
            if(board[j][i]!==0){
                for(var k=3;k>j;k--){
                    //这层循环也就是判断board[j][i]的下边
                    //如果落脚位置时空的并且无障碍物
                    //noBlockVeritcal第二个小的在前面
                    if(board[k][i]===0&&noBlockVertical(i,j,k,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
                        j=k;
                        ismove=true;
                        cellismove=true;
                        break;    //continue;
                    }
                    //如果落脚位置和我当前数字是一样的并且无障碍物
                    else if(board[k][i]===board[j][i]&&noBlockVertical(i,j,k,board)&&!iscrush[k][i]){
                        //move
                        showMoveAnimation(j,i,k,i);
                        //add
                        board[k][i]*=2; //board[i][k]+=board[i][j];我怀疑有bug。。。。
                        board[j][i]=0;
                        ismove=true;
                        cellismove=true;
                        //add score
                        score+=board[k][i];
                        showscore(score);
                        //记下碰撞
                        iscrush[k][i]=true;                        
                        break;    //continue;
                    }
                }
            }
            if(cellismove)  continue;//位置正确
            // 这个单元格移动了，j已经在k位置
            // 继续while循环，检查这个新位置

            // 如果单元格是0或没有移动，检查下一个
            j--;
        }
   }
    setTimeout("updateBoardView()",200);    //200ms以后整体数据刷新
    return ismove;  //返回整体是否移动（就不用多写如果没有移动咋样移动了又咋样）
}
