// Sayfa yüklendiğinde çalışacak olay dinleyicisi ekler
window.addEventListener("load", function () {
  // preloader elementini alır
    var loader = document.getElementById("preloader");
  
   // 4400 milisaniye (4.4 saniye) sonra çalışacak bir zamanlayıcı ayarlar
    setTimeout(function () {
      // loader elementine 'hidden' sınıfını ekler
      loader.classList.add("hidden"); 
       // 2000 milisaniye (2 saniye) sonra çalışacak bir iç zamanlayıcı ayarlar
      setTimeout(function () {
          // loader elementinin görüntülenmesini tamamen kaldırır
        loader.style.display = "none"; 
      }, 2000); // 2 saniye sonra çalışır
    }, 4400); // 4.4 saniye sonra çalışır
  });
   