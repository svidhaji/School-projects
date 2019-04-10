'use strict';

const strawB = document.getElementById("berry").style.backgroundColor = "red";
console.log(strawB);

const orange = document.querySelector("li[data-foodtype]").style.backgroundColor = "orange";
console.log(orange);

const liAll = document.getElementsByTagName("li");
console.log(liAll.length);

const queryAll = document.querySelectorAll("li");
queryAll.forEach((node) => {
  node.style.border = "1px solid black";
});

console.log(queryAll);

for (let i = 0; i < liAll.length; i++) {
  liAll[3].style.backgroundColor = "lightgreen";

}