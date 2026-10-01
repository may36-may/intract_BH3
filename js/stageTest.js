// 获取所有.item元素
let items=document.querySelectorAll('.item');
let animationPending = false;

//.forEach 是数组的一个方法，会遍历这个集合中的每一个元素，并对每个元素执行一次括号里的函数。
function setActive(){
    if (animationPending) return; // 如果已经有待执行的动画，跳过
     // 如果当前项已经 active，直接返回，避免重复触发的抽搐
    if (this.classList.contains('active')) return;
    /*在事件监听函数中，this 指向触发该事件的 DOM 元素。
    当鼠标进入某个具体的 .item 时，这个 this 就是那个被进入的 .item 元素。*/

    // 遍历所有.item元素，移出active样式
    items.forEach((item)=>{
        item.classList.remove('active');
    })
    // 没退出就为当前选中项添加active样式
    this.classList.add('active');

    animationPending = true;
    // 设置一个短延时，解锁动画标志（大于过渡时长即可）
    setTimeout(() => {
        animationPending = false;
    }, 300); // 这个值略大于我之前设置的过渡时间0.5s
}

// 遍历所有.item元素，分别为其设置触碰事件
items.forEach((item)=>{
    item.addEventListener('mouseenter',setActive);
})