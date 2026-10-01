    (function($){
            $.fn.timeline=function(){
                var selectors={
                    id:$(this),
                    item:$(this).find(".item"),
                    activeClass:"item--active",
                    img:".img"
            };
            //将第一个时间轴项目激活，并设置时间轴背景图片为第一个项目的图片
            selectors.item.eq(0).addClass(selectors.activeClass);
            selectors.id.css(
                "background-image",
                "url("+
                selectors.item.first()
                    .find(selectors.img)
                    .attr("src")+
                ")"
            );
            //获取时间轴项目的总数
            var itemLength=selectors.item.length;
            $(window).scroll(function(){
    var pos = $(this).scrollTop();
    var winHeight = $(this).height();
    var docHeight = $(document).height();
    
    selectors.item.each(function(i){
        var $this = $(this);
        var min = $this.offset().top;
        var max = min + $this.outerHeight();
        
        // 默认条件：项目中央进入视口（对中间项目有效）
        var viewportMid = pos + winHeight / 2;
        var isActive = (viewportMid >= min && viewportMid <= max);
        
        // 特殊处理第一个项目：当滚动到顶部附近时激活
        if (i === 0 && pos <= 50) {
            isActive = true;
        }
        // 特殊处理最后一个项目：当滚动到底部附近时激活
        if (i === selectors.item.length - 1 && pos + winHeight >= docHeight - 50) {
            isActive = true;
        }
        
        if (isActive) {
            selectors.id.css("background-image", "url(" + $this.find(selectors.img).attr("src") + ")");
            selectors.item.removeClass(selectors.activeClass);
            $this.addClass(selectors.activeClass);
        }
        });
    }).trigger('scroll');
};
})(jQuery)

$("#shell").timeline();