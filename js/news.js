document.addEventListener("DOMContentLoaded", function () {
  // 轮播图相关元素获取
  const container = document.getElementById("container");
  const images = container.getElementsByTagName("img");
  const indicators = container.querySelector(".slider-indicators");
  const prevBtn = container.querySelector(".prev-btn");
  const nextBtn = container.querySelector(".next-btn");

  // 核心状态变量
  let currentIndex = 0;
  let intervalId = null;

  // 1. 轮播图核心切换函数
  function showImage(index) {
    // 全量重置所有状态
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
      indicators.children[i].classList.remove("active");
    }
    // 单点更新目标状态
    images[index].classList.add("active");
    indicators.children[index].classList.add("active");
  }

  // 2. 上下张切换函数（无限循环）
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // 3. 自动轮播控制（修复核心bug）
  function startAutoSlide() {
    // 防止重复创建多个定时器
    if (intervalId === null) {
      // 修复1：将3000000改为3000（3秒切换一次，原代码50分钟才切换）
      intervalId = setInterval(showNextImage, 3000);
    }
  }

  function stopAutoSlide() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      // 重置定时器ID，确保下次能重新启动
      intervalId = null;
    }
  }

  // 4. 事件绑定（修复重复绑定bug + 性能优化）
  // 上下按钮点击事件
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showPrevImage();
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showNextImage();
  });

  // 修复2：使用事件委托绑定指示器点击事件（替代循环绑定，性能更好）
  indicators.addEventListener("click", function (e) {
    // 判断点击的是否是指示器元素
    if (e.target.classList.contains("indicator")) {
      // 获取点击的指示器索引
      const index = Array.from(indicators.children).indexOf(e.target);
      currentIndex = index;
      showImage(currentIndex);
    }
  });

  // 鼠标悬停暂停/离开恢复自动轮播
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  // 修复3：页面卸载时清除定时器，防止内存泄漏
  window.addEventListener("beforeunload", stopAutoSlide);

  // 5. 新闻导航切换模块（合并到DOMContentLoaded内部，删除外部重复代码）
  const navItems = document.querySelectorAll(".nav-item");
  const newsLists = {
    list1: document.querySelector(".news-list1"),
    list2: document.querySelector(".news-list2"),
    list3: document.querySelector(".news-list3"),
    list4: document.querySelector(".news-list4")
  };

  // 隐藏所有列表
  function hideAllLists() {
    for (let key in newsLists) {
      if (newsLists[key]) newsLists[key].style.display = "none";
    }
  }

  // 显示指定列表
  function showList(listId) {
    if (newsLists[listId]) newsLists[listId].style.display = "block";
  }

  // 默认显示最新分类
  hideAllLists();
  showList("list1");

  // 导航点击事件（删除外部重复的绑定代码）
  navItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // 同步导航激活状态
      navItems.forEach((nav) => nav.classList.remove("nav-item-active"));
      this.classList.add("nav-item-active");

      // 索引映射切换列表（优化：用对象映射替代switch，更简洁）
      const indexToListMap = ["list1", "list2", "list3", "list4"];
      hideAllLists();
      showList(indexToListMap[index] || "list1");
    });
  });

  // 初始化轮播图
  initializeSlider();

  // 轮播图初始化函数
  function initializeSlider() {
    images[0].classList.add("active");
    indicators.children[0].classList.add("active");
    startAutoSlide();
  }
});
