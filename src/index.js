const baseUrl = 'https://api.devx.pl';
const endpointAPI = `${baseUrl}/api/collections/get/clickandfly`;
const tokenAPI = '7d00588bfc312fc16b35c1894b72b8';

async function getImage(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  const imagesSet = [];

  data.entries.forEach(entry => {
    const images = [];

    entry.gallery.forEach(singleImage => images.push(singleImage.path));

    const newData = { name: entry.name, images };

    imagesSet.push(newData);
  });

  return imagesSet;
}

let images;
getImage(`${endpointAPI}?token=${tokenAPI}`).then(
  response => (images = response)
);

const canvas = document.getElementById('app');

function getRandomImage(img) {
  const randomCategory = img[Math.floor(Math.random() * img.length)];

  const randomImage =
    randomCategory.images[
      Math.floor(Math.random() * randomCategory.images.length)
    ];

  return `${baseUrl}${randomImage}`;
}

function createFlyingObject(options) {
  const flyingObject = document.createElement('div');
  const { positionX, positionY } = options;
  const maxSize = 350;
  const minSize = 150;
  const size = Math.floor(Math.random() * maxSize + minSize);

  const maxAnimationDuration = 6000;
  const minAnimationDuration = 3000;
  const animationDuration =
    Math.random() * maxAnimationDuration + minAnimationDuration;

  const randomImage = getRandomImage(images);

  flyingObject.classList.add('flying-object');
  flyingObject.setAttribute(
    'style',
    `
      --size: ${size}px;
      --position-x: ${positionX - size / 2}px;
      --position-y: ${positionY - size / 2}px;
      --animation-duration: ${animationDuration}ms;
      background-image: url(${randomImage});
    `
  );

  return flyingObject;
}

function removeFlyingObject(event) {
  event.currentTarget.remove();
}

function addFlyingObject(event) {
  const wrapper = event.currentTarget;
  const newFlyingObject = createFlyingObject({
    positionX: event.clientX,
    positionY: event.clientY,
  });

  newFlyingObject.addEventListener('animationend', removeFlyingObject);

  wrapper.append(newFlyingObject);
}

canvas.addEventListener('click', addFlyingObject);
