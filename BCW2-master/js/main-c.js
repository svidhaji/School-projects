'use strict';
const showImages = (images) => {


  images.forEach((image) => {
    const html = `<li>
    <figure>
        <a href="img/original/${image.mediaUrl}"><img src="img/thumbs/${image.mediaThumb}"></a>
        <figcaption>
            <h3>${image.mediaTitle}</h3>
        </figcaption>
    </figure>
</li>`;
    // After the loop print the HTML into <ul> element using innerHTML.
    document.querySelector('ul').innerHTML += html;
  });
};

const htmlc = document.querySelector('ul').innerHTML
const liNode = document.createElement('li');

document.getElementById("list").appendChild(htmlc);
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element
