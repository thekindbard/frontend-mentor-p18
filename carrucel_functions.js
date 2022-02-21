import  {
          CAR, 
          CAR_INFO, 
          CARRUCEL_CLOSE, 
          GALLERY, 
          UP,
          DOWN,
          ACT_IMG, 
          MAX_IMG,
          MIN_IMG,
} from "./variables.js";

let act_img = ACT_IMG;


function toggleCar() {
          if(window.innerWidth>400) {
                    document.querySelector("#car-desktop").classList.add("active");
          } else {
                    document.querySelector("#car-mobile").classList.add("active");
          }
}

function closeCarrucel() {
          GALLERY.style.display = "none";
}

function openCarrusel() {
          GALLERY.style.display = "inline-block";
}

function changeImage() {
          const INDEX  = this.getAttribute('index') || act_img;
          act_img = INDEX;
          changeImage3()
          document.querySelectorAll('.first img').forEach( img => img.src = `./images/image-product-${INDEX}.jpg`);
}

function changeImage2() {
          changeImage3();
          document.querySelectorAll('.first img').forEach(item => item.src = `./images/image-product-${act_img}.jpg`);
}

function changeImage3() {
          document.querySelectorAll(".carrusel").forEach( carrusel => {
                    const CARR_IMG = carrusel.querySelectorAll(".carrusel-img");
                    CARR_IMG.forEach( img => {
                              if (img.className.includes('selected')) {
                                        img.classList.remove("selected");
                              }
                    })
                    CARR_IMG[act_img-1].classList.add("selected");
          })

}

function changeImageUP() {
          if(act_img<MAX_IMG) {
                    act_img++;
          } else {
                    act_img = MIN_IMG;
          }
          changeImage2();
}

function changeImageDOWN() {
          if(act_img>MIN_IMG) {
                    act_img--;
          } else {
                    act_img = MAX_IMG;
          }
          changeImage2();
}

export {toggleCar, closeCarrucel, openCarrusel, changeImage, changeImage2, changeImageUP, changeImageDOWN};