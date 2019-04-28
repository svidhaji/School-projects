'use strict';

// upload image ********************
const frm = document.querySelector('#mediaform');

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('./image', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // update list
    getData();
    frm.reset();
  });
};

frm.addEventListener('submit', sendForm);
// *********************************

// update image ********************
const updatefrm = document.querySelector('#updateform');

const fillUpdate = (image) => {
  // console.log(image);
  updatefrm.scrollIntoView();
  document.querySelector('#updateform input[name=mID]').value = image.mID;
  document.querySelector(
      '#updateform input[name=category]').value = image.category;
  document.querySelector('#updateform input[name=title]').value = image.title;
  document.querySelector(
      '#updateform textarea[name=details]').value = image.details;
  document.querySelector('#updateform button').removeAttribute('disabled');
};

const sendUpdate = (evt) => {
  evt.preventDefault();
  // get data from updatefrm and put it to body
  const data = JSON.stringify([
    updatefrm.querySelector('input[name="category"]').value,
    updatefrm.querySelector('input[name="title"]').value,
    updatefrm.querySelector('textarea[name="details"]').value,
    updatefrm.querySelector('input[name="mID"]').value,
  ]);
  const settings = {
    method: 'PATCH',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  // app.patch('/update'.... needs to be implemented to index.js (remember body-parser)
  fetch('./update', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    updatefrm.reset();
    document.querySelector('#updateform button').
        setAttribute('disabled', 'disabled');
    // update list
    getData();
  });
};

updatefrm.addEventListener('submit', sendUpdate);

// *********************************

// delete image ********************
const deleteImage = (id) => {
  const settings = {
    method: 'DELETE',
  };
  fetch('./del/' + id, settings).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    // update list
    getData();
  });
};
// *********************************

let originalData = null; // for displaying selected category
let map = null; // for leaflet map
let marker = null; // for leaflet marker

// category chooser *****************************************

document.querySelector('#reset-button').addEventListener('click', () => {
  updateView(originalData);
});

const categoryButtons = (items) => {
  items = removeDuplicates(items, 'category');
  console.log(items);
  document.querySelector('#categories').innerHTML = '';
  for (let item of items) {
    const button = document.createElement('button');
    button.class = 'btn btn-secondary';
    button.innerText = item.category;
    document.querySelector('#categories').appendChild(button);
    button.addEventListener('click', () => {
      sortItems(originalData, item.category);
    });
  }
};

const sortItems = (items, rule) => {
  const newItems = items.filter(item => item.category === rule);
  // console.log(newItems);
  updateView(newItems);
};

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

// *************************************

// close modal **************************
document.querySelector('.modal button').addEventListener('click', (evt) => {
  evt.target.parentNode.classList.add('hidden');
});
// **************************************

// create content to article (this is a template)
const createArticle = (image, title, texts, id) => {
  let text = '';
  for (let t of texts) {
    text += `<p>${t}</p>`;
  }

  return `<img src="${image}" alt="${title}">
                <h3 class="card-title">${title}</h3>
                ${text}
                <p><button class="view">View</button>
                <button class="update">Update</button>
                <button onclick="deleteImage(${id})">Delete</button></p>`;
};

const getData = () => {
  fetch('./all').then(response => {
    return response.json();
  }).then(items => {
    originalData = items;
    // 3. update view
    updateView(items);
  });

};

const updateView = (items) => {
  categoryButtons(items);
  document.querySelector('main').innerHTML = '';
  for (let item of items) {
    // console.log(item);
    const article = document.createElement('article');
    const time = moment(item.time);
    // call createArticle to add html content to article
    article.innerHTML = createArticle(item.thumbnail, item.title, [
      '<small>' + time.format('dddd, MMMM Do YYYY, HH:mm') + '</small>',
      item.details], item.mID);
    article.querySelector('.view').addEventListener('click', () => {
      // open modal and populate
      document.querySelector('.modal').classList.remove('hidden');
      document.querySelector('.modal img').src = item.image;
      document.querySelector('.modal h4').innerHTML = item.title;
      // populate map
      resetMap(item);
      // fix map resizing issue
      document.querySelector('#map').addEventListener('transitionend', () => {
        map.invalidateSize();
      });
    });
    // when update button is clicked populate updateform
    article.querySelector('.update').
        addEventListener('click', () => {
          console.log(item);
          fillUpdate(item);
        });
    // add article to view
    document.querySelector('main').appendChild(article);
  }
};

// Map functions *****************************

const initMap = () => {
  map = L.map('map').setView([0, 0], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
// 2. fetch image data:
  getData();
};

const resetMap = (item) => {
  try {
    map.removeLayer(marker);
  } catch (e) {

  }
  const coords = JSON.parse(item.coordinates);
  console.log(coords);
  map.panTo([coords.lat, coords.lng]);
  marker = L.marker([coords.lat, coords.lng]).addTo(map);
  map.invalidateSize();
};

// ****************************

// 1. Start map:
initMap();