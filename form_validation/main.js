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
const pattern2 = "^\+[0-9]{5}$";
const patternN = "^[a-zA-Z ]*$";


function validation() {
  if (inputN.value === patternN & inputEmail.value === pattern && inputPostal.value === pattern2 ){
    inputN.style.backgroundColor = "skyblue";
  } else {
    inputN.style.backgroundColor = "purple";
  }
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(evt);

});