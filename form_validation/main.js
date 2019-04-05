'use strict';
const form = document.querySelector('.form');

const inputN = document.getElementById('fname');
const inputLn = document.getElementById('lname');
const inputEmail = document.getElementById('email');
const inputP = document.getElementById('pnumber');
const inputAddress = document.getElementById('address');
const inputPostal = document.getElementById('postcode');
const inputPassword = document.getElementById('password');
const button = document.querySelector('.button-submit');

const pattern = "^[a-z0-9_-]+(\.[a-z0-9_-]+)*@([a-z0-9_-]+\.)+[a-z]{2,6}$";
const pattern2 = "^\+[0-9]{5,}$";


function validation() {
  if (inputN.value !== "" && inputEmail.value !== pattern && pattern.test(inputP)){
    inputN.style.backgroundColor = 'white';
  } else {
    inputN.style.backgroundColor = 'red';
  }
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(evt);

});