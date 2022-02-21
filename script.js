import  {toggleCar, closeCarrucel, openCarrusel, changeImage, changeImage2, changeImageUP, changeImageDOWN} from "./carrucel_functions.js";
import  { CAR, CAR_INFO, CARRUCEL_CLOSE, GALLERY,  UP, DOWN, ACT_IMG, MAX_IMG, MIN_IMG,} from "./variables.js";

let PRO_IMG, ALL_IMG;
let product;
let car = JSON.parse(localStorage['car'] || '[]'); 

const Q_ITEM = document.querySelector('.quantity-item.product');
const Q_PLUS = document.querySelector('.quantity-item.plus');
const Q_LESS = document.querySelector('.quantity-item.less');
const CHECKOUT = document.querySelector('.product-info-btns-checkout');
const CAR_PRODUCTS = document.querySelectorAll('.car-products');
const CAR_NUMBER = document.querySelector('.car-number');
const CAR2 = document.querySelectorAll('.car-info');
let actual_items = 0;


function addCar() {
  if (actual_items==0) return;
          car.push({product, quantity:actual_items, total_price:actual_items*product.price, index:car.length+1});
          renderCar();
          updateCarNumber();
          Q_ITEM.textContent = 0;
          actual_items = 0;
        }
        
function updateCarNumber() {
        if (car.length>0) CAR_NUMBER.classList.remove("hide");
        if (car.length==0) CAR_NUMBER.classList.add("hide");
        CAR_NUMBER.innerHTML = car.length;
}

function renderCar() {
  if(car.length>0) {
    CAR2.forEach(car => car.classList.remove('empty'));
    let htmlCar= "";
    car.forEach( item => {
              htmlCar += `<div class="car-product" index="${item.index}">
              <img  class="car-product-icon" src="${item.product.images[0]}" alt="">
              <div class="car-product-description">${item.product.title.slice(0,20)}... $${item.product.price} x ${item.quantity} <strong>$${item.product.price * item.quantity}</strong></div>
              <a class="car-product-delete" href="#"><img src="./images/icon-delete.svg" alt=""></a>
            </div>`;
    });
    document.querySelectorAll(".car-products").forEach( cart => {
      cart.innerHTML = htmlCar;
    });
    document.querySelectorAll('.car-product-delete').forEach (item => item.addEventListener('click', deleteProduct));
  } else if (car.length<1){
      CAR2.forEach(car => car.classList.add('empty'));
      CAR_PRODUCTS.forEach(car_product=> car_product.innerHTML = "");
  }
          updateCarNumber();

}

function more_items() {
          actual_items++;
          Q_ITEM.textContent = actual_items;
}

function less_items() {
          if(actual_items>0) {
                    actual_items--;
                    Q_ITEM.textContent = actual_items;
          }
}

function deleteProduct() {
  const INDEX = this.parentNode.getAttribute("index");
  car = car.filter( item=> item.index!=INDEX);
  renderCar();
}

function loadEvents() {
          CAR.addEventListener("click", toggleCar);
          UP.forEach( button => button.addEventListener("click", changeImageUP));
          DOWN.forEach( button => button.addEventListener("click", changeImageDOWN));
          CARRUCEL_CLOSE.addEventListener('click', closeCarrucel);
          PRO_IMG.forEach( img => img.addEventListener('click', openCarrusel) );
          ALL_IMG.forEach( img => img.addEventListener('click', changeImage) );
          Q_PLUS.addEventListener('click', more_items);
          Q_LESS.addEventListener('click', less_items);
          CHECKOUT.addEventListener('click', addCar);
}

async function loadProduct() {
          const RESPONSE = await fetch("./product.json");
          const DATA = await RESPONSE.json();
          renderData(DATA);
          return DATA;
}

function renderData(data) {
          document.querySelector('.product-info-company').textContent = data.company;
          document.querySelector('.product-info-title').textContent = data.title;
          document.querySelector('.product-info-description').textContent = data.description;
          document.querySelector('.product-info-price').textContent = data.price;
          document.querySelector('.product-info-discount').textContent = data.discount;
          document.querySelector('.product-info-old-price').textContent = data.old_price;


          const carrucels = document.querySelectorAll('.carrusel');
          const product_img = document.querySelectorAll('.product-img');


          const carrucelArrays = [
            {product_img: product_img[0], carrucel: carrucels[0]},
            {product_img: product_img[1], carrucel: carrucels[1]},
          ]



          
          carrucelArrays.forEach( carrucelArray => {
            
            data.images.forEach( (img, index) => {

              const DIV = document.createElement("DIV");
              DIV.className = "carrusel-img"
              DIV.style.backgroundImage = `url(.${img})`;
              const indexAtr = document.createAttribute('index');
              indexAtr.value = index+1;
              DIV.setAttributeNode(indexAtr);
              
              if (index==0) {
                const DIV2 = document.createElement("DIV");
                DIV2.innerHTML = `<img src="${img.replace("-thumbnail", "")}" alt="" />`;
                DIV2.className = "first";
  
  
                carrucelArray.product_img.insertBefore(DIV2, carrucelArray.carrucel);
                DIV.classList.add("selected");
              }
              carrucelArray.carrucel.appendChild(DIV);
  
            } );

  });
          PRO_IMG = document.querySelectorAll('.product-img .first');
          ALL_IMG = document.querySelectorAll('.carrusel-img');
          loadEvents();
}

function closeCar() {
        CAR_INFO.forEach(car => {
          if(car.classList.contains('active')) car.classList.remove('active');
        })
}

loadProduct().then( response => {
          product = response;
});

function loadCar () {
  localStorage["car"] = JSON.stringify(car);
}
function changeArrow() {
  const IMG = this.querySelector("img");
  IMG.src = IMG.src.replace(".svg", "2.svg");
}

function returnArrow() {
  const IMG = this.querySelector("img");
  IMG.src = IMG.src.replace("2.svg", ".svg");
}

function closeMenuMobile() {
  document.querySelector(".menu-mobile").style.display = "none"
}

function openMenuMobile() {
  document.querySelector(".menu-mobile").style.display = "inline-block"
}

if (car) renderCar();

window.addEventListener("click", closeCar,true);
window.addEventListener("beforeunload", loadCar);
window.addEventListener("resize", closeCar);
window.addEventListener("resize", closeMenuMobile);
window.addEventListener("resize", ()=> GALLERY.style.display = "none");
document.querySelector("#car-mobile").addEventListener("click", toggleCar);
document.querySelectorAll('.gallery-arrow').forEach(arrow => arrow.addEventListener("mouseenter", changeArrow));
document.querySelectorAll('.gallery-arrow').forEach(arrow => arrow.addEventListener("mouseleave", returnArrow));
document.querySelector('.menu-mobile-close').addEventListener("click", closeMenuMobile);
document.querySelector('.menu').addEventListener("click", openMenuMobile);


