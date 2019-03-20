'use strict';
const main = document.querySelector('main');
const kuva = document.createElement('img');
kuva.src = 'http://placekitten.com/320/160';
kuva.alt = 'title';

const kuvatext = document.createElement('figcaption');
kuvatext.innerHTML = 'Caption';

const figure = document.createElement('figure');
figure.appendChild(kuva);
figure.appendChild(kuvatext);

const otsikko = document.createElement('h2');
otsikko.innerHTML = 'Article header 2';

const header = document.createElement('header');
header.appendChild(otsikko);

const kappale = document.createElement('p');
kappale.innerHTML = 'Here is some text. Here is some text. Here is some text. Here is some text.';

const article = document.createElement('article');
article.appendChild(otsikko);
article.appendChild(figure);
article.appendChild(kappale);

main.appendChild(article);