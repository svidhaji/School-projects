// Create function 'showImages' which
// receives images.json which has links to images as an array.
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


fetch('images.json').then((response) => {
  return response.json();

}).then((images) => {
  console.log(images);
  showImages(images);
});