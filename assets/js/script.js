(function ($, sr) {
  // Debounce para smartresize (conservado)
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced() {
      var obj = this,
        args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  $.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

(function () {
  var $wrapper = $("#wrapper");
  var $drawerRight = $("#drawer-right");

  ///////////////////////////////
  // NAV
  ///////////////////////////////
  function setSlideNav() {
    $(".toggleDrawer").click(function (e) {
      e.preventDefault();
      if ($wrapper.css("marginLeft") === "0px") {
        $drawerRight.animate({ marginRight: 0 }, 500);
        $wrapper.animate({ marginLeft: -300 }, 500);
      } else {
        $drawerRight.animate({ marginRight: -300 }, 500);
        $wrapper.animate({ marginLeft: 0 }, 500);
      }
    });
  }
  setSlideNav();

  ///////////////////////////////
  // Scroll al contenido
  ///////////////////////////////
  $("#scrollToContent").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: $("#mazos").offset().top }, 800);
  });

  ///////////////////////////////
  // Navegación interna
  ///////////////////////////////
  $("nav > ul > li > a").click(function (e) {
    e.preventDefault();
    $.scrollTo($(this).attr("href"), 400, {
      offset: -$("#header .top").height(),
      axis: "y",
    });
  });


///////////////////////////////
// 🎬 Botón PLAY que inicia video con sonido
///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video");
  const playBtn = document.getElementById("playVideoBtn");
  if (!video || !playBtn) return;

  // Arranca pausado y muteado
  video.pause();
  video.muted = false;

  playBtn.addEventListener("click", () => {
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(err => console.warn("No se pudo reproducir el video:", err));

    // Ocultar el botón luego de presionar play
    playBtn.style.display = "none";
  });
});

})();
