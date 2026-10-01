// 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  let isPlaying = false;

  // 音乐控制
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    } else {
      bgMusic.play().catch(function (error) {
        console.log("播放失败:", error);
      });
      musicToggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  // 页面可见性改变时控制音乐
  document.addEventListener("visibilitychange", function () {

    //离开时不暂停音乐
    if (!document.hidden && isPlaying) {
    bgMusic.play().catch(function (error) {
      console.log("恢复播放失败:", error);
    });
    musicToggle.classList.add("playing");
  }
  });

  // 音量渐变效果
  bgMusic.volume = 0.5; // 设置初始音量

  // 自动播放（需要用户交互）
  document.addEventListener(
    "click",
    function initAudio() {
      if (!isPlaying) {
        bgMusic
          .play()
          .then(function () {
            isPlaying = true;
            musicToggle.classList.add("playing");
          })
          .catch(function (error) {
            console.log("自动播放失败:", error);
          });
      }
      document.removeEventListener("click", initAudio);
    },
    { once: true }
  );
