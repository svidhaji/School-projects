'use strict';
const showImages = (images) => {
  // create a loop which builds the following HTML from every image in the array:
  /*
  <li>
      <figure>
          <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
          <figcaption>
              <h3>Title</h3>
          </figcaption>
      </figure>
  </li>
  */


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

const htmlc = document.createElement('li');
const textA = `<li>
    <figure>
        <a href="img/original/${image.mediaUrl}"><img src="img/thumbs/${image.mediaThumb}"></a>
        <figcaption>
            <h3>${image.mediaTitle}</h3>
        </figcaption>
    </figure>
</li>`;
htmlc.appendChild(textA);
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element
