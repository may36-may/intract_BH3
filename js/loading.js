function counter(){
    var count=setInterval(function(){
        var s = parseInt($('.counter').text());
        $('.counter').text((++s).toString());
        if(s == 100){
            clearInterval(count);
            $('counter').addClass('hide')
            window.location.href = "../html/main.html";
        }
    },60)
}
counter()