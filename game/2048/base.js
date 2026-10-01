function getPosTop(i,j){
    return 20+i*120;    //这个是每个格子距离顶部边框的距离
}
function getPosLeft(i,j){
    return 20+j*120;    ////这个是每个格子距离左边边框的距离
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#EEE4DA"; break;
        case 4:return "#EDE0C8"; break;
        case 8:return "#F2B179"; break;
        case 16:return "#F59563"; break;
        case 32:return "#F67C5F"; break;
        case 64:return "#F67C5F"; break;
        case 128:return "#EDCF72"; break;
        case 256:return "#EDCC61"; break;
        case 512:return "#EDC850"; break;
        case 1024:return "#EDC53F"; break;
        case 2048:return "#EDC22E"; break;
    }
    return "black"; 
}

function getNumberColor(number){
    if(number<=4)
        return "#776E65";
    return "white";
}

function nospace(board){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            if(board[i][j]==0)
                return false;   //还有空间，返回false

    return true;    //此时表示没有空间了，返回true
}

function canMoveLeft(board){
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)    //我从每一行数学位置上的第二个到最后一个元素遍历
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;//也就是说左边元素是最靠边的或者和本身相等的，就可以向左移动
    return false;
}
function canMoveRight(board){
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--)    //从右边向左边遍历（2048核心理解能力要加强！！！！）
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;//也就是说右边元素是最靠边的或者和本身相等的，就可以向右边移动
    return false;
}
function canMoveUp(board){
    for(var i=0;i<4;i++)    //i是列哈
        for(var j=1;j<4;j++)
            if(board[j][i]!=0)
                if(board[j-1][i]==0||board[j-1][i]==board[j][i])
                    return true;//也就是说上边元素是最靠边的或者和本身相等的，就可以向左移动
    return false;
}
function canMoveDown(board){
    for(var i=0;i<4;i++)    //i是列哈
        for(var j=2;j>=0;j--)
            if(board[j][i]!=0)
                if(board[j+1][i]==0||board[j+1][i]==board[j][i])
                    return true;//也就是说下边元素是最靠边的或者和本身相等的，就可以向左移动
    return false;
}

//判断障碍物
function noBlockHorizontal(row,col1,col2,board){
    for(var j=col1+1;j<col2;j++)
        if(board[row][j]!=0)
            return false;
    return true;
}
function noBlockVertical(coloumn,row1,row2,board){
    for(var i=row1+1;i<row2;i++)
        if(board[i][coloumn]!=0)
            return false;
    return true;
}

function nomove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board))
        return false;

    return true;
}

//保存最佳分数到本地存储
function pushBestScore(score){
    if (typeof(Storage)!=="undefined") {  // 第1步：检查浏览器是否支持
        localStorage.setItem("😸_2048_highesscore",score); // 第2步：保存数据  
        //localStorage只能存字符串,var score=1024，那么这个地方就把1024转换为“1024”
    }
}

// 从本地存储获取最佳分数
function getBestScore(){
    if (typeof(Storage)!=="undefined") {  // 第1步：检查浏览器是否支持
        var stored=localStorage.getItem("😸_2048_highesscore");  // 第2步：获取数据
        return stored?parseInt(stored):0;  // 第3步：处理并返回数据
        //如果stored有值（不是null/undefined/空字符串）把字符串强制转换为数字，然后返回。如果stored没值（第一次玩游戏）返回默认值0
    }
    return 0;  // 第4步：浏览器不支持时返回0
}