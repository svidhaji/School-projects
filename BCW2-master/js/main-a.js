// Create function 'showImages' which
// adds the loaded HTML content to <ul> element
'use strict';

const showImages = () => {
  if(xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
    document.querySelector('ul').innerHTML = xhr.responseText;
  }
};

const xhr = new XMLHttpRequest();
xhr.open('GET', 'images.html');
xhr.onreadystatechange = showImages;
xhr.send();