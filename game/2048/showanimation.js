function showNumberWithAnimation(i,j,randNumber){
    var numberCell=document.getElementById('number-cell-'+i+'-'+j);

    numberCell.style.backgroundColor=getNumberBackgroundColor(randNumber);
    numberCell.style.color=getNumberColor(randNumber);
    numberCell.textContent=randNumber;

     numberCell.animate([
        {
            width: '0px',   // 属性之间用逗号
            height: '0px',
            top: (getPosTop(i,j)+50)+'px',    //移动后的坐标位置
            left: (getPosLeft(i,j)+50)+'px' // 最后一个属性不加逗号
        },   // 数组元素之间用逗号
        {
            width:'100px',
            height:'100px',
            top:getPosTop(i,j)+'px',    //移动后的坐标位置
            left:getPosLeft(i,j)+'px'
        }   // 数组结束不用逗号
    ], {
        duration:50,  // 动画时间50ms
        fill:'forwards',  // 动画结束后保持最终状态
        easing: 'linear'  // 缓动效果,别用bounce。。。。诡异死了
        //easing有linear(线性匀速),ease—in(先慢后快),ease-out(先快后慢),ease-in-out(缓入缓出),bounce(弹性)
    });
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell=document.getElementById('number-cell-'+fromx+'-'+fromy); 
    numberCell.animate([
        {
            top:getPosTop(tox,toy)+'px',    //移动后的坐标位置
            left:getPosLeft(tox,toy)+'px'
        }
    ],{
        duration:200,
        fill:'forwards',
        easing: 'linear'  
    });
}

function showscore(score){
    document.getElementById('score').textContent=score;
    //不用innerHTML:1.防止恶意执行脚本 2.textContent性能更快，因为他不解析html
}
function showsBest(best){
    document.getElementById('best').textContent=best;
    //不用innerHTML:1.防止恶意执行脚本 2.textContent性能更快，因为他不解析html
}