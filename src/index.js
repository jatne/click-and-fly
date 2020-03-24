const endpointAPI = 'https://api.devx.pl/api/collections/get/clickandfly';
const tokenAPI = '7d00588bfc312fc16b35c1894b72b8';

async function getImage(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  const imagesArr = [];

  data.entries.forEach(entry => {
    imagesArr.push(entry.image.path);
  });

  return imagesArr;
}

const images = getImage(`${endpointAPI}?token=${tokenAPI}`);
const canvas = document.getElementById('app');

function getRandomImage(img) {
  return img[Math.floor(Math.random() * img.length)];
}

function createFlyingObject(options) {
  const flyingObject = document.createElement('div');
  const { positionX, positionY } = options;
  const maxSize = 150;
  const minSize = 50;
  const size = Math.floor(Math.random() * maxSize + minSize);

  const maxAnimationDuration = 6000;
  const minAnimationDuration = 3000;
  const animationDuration =
    Math.random() * maxAnimationDuration + minAnimationDuration;

  const randomImage = getRandomImage(images);

  console.log(randomImage);

  flyingObject.classList.add('flying-object');
  flyingObject.setAttribute(
    'style',
    `
      --size: ${size}px;
      --position-x: ${positionX - size / 2}px;
      --position-y: ${positionY - size / 2}px;
      --animation-duration: ${animationDuration}ms;
    `
  );

  return flyingObject;
}

// function createAnimal(options) {

//   // const randomFigure = figures[Math.floor(Math.random() * figures.length)];

// }

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
