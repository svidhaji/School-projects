'use strict';
const m = document.querySelector('main');
const html = `<article>
            <header>
                <h2>Article header 2</h2>
            </header>
            <figure>
                <img src="http://placekitten.com/320/160" alt="title">
                <figcaption>Caption 2</figcaption>
            </figure>
            <p>Here is some text. Here is some text. Here is some text. Here is some text.</p>
        </article>`;
m.innerHTML += html;