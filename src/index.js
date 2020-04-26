const baseUrl = 'https://api.devx.pl';
const endpointAPI = `${baseUrl}/api/collections/get/clickandfly`;
const tokenAPI = '7d00588bfc312fc16b35c1894b72b8';
const canvas = document.getElementById('app');
const intro = document.getElementById('intro');
let images;

async function getImage(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  const imagesSet = [];

  data.entries.forEach(entry => {
    if (entry.is_active) {
      const images = [];

      entry.gallery.forEach(singleImage => images.push(singleImage.path));

      const newData = { name: entry.name, images };

      imagesSet.push(newData);
    }
  });

  return imagesSet;
}

getImage(`${endpointAPI}?token=${tokenAPI}`).then(
  response => (images = response)
);

const getRandomImage = img => {
  const randomCategory = img[Math.floor(Math.random() * img.length)];

  const randomImage =
    randomCategory.images[
      Math.floor(Math.random() * randomCategory.images.length)
    ];

  return `${baseUrl}${randomImage}`;
};

const getRandomAnimation = () => {
  const animations = [
    'goToUp',
    'goToDown',
    'goToLeft',
    'goToRight',
    'zoomIn',
    'zoomOut',
    'fade',
  ];

  return animations[Math.floor(Math.random() * animations.length)];
};

const createFlyingObject = options => {
  const flyImg = document.createElement('img');
  const { positionX, positionY } = options;
  const maxSize = 600;
  const minSize = 150;
  const size = Math.floor(Math.random() * maxSize + minSize);

  const maxAnimationDuration = 8000;
  const minAnimationDuration = 5000;
  const animationDuration =
    Math.random() * maxAnimationDuration + minAnimationDuration;

  const randomImage = getRandomImage(images);

  flyImg.setAttribute('src', randomImage);
  flyImg.classList.add('flying-object');

  flyImg.setAttribute(
    'style',
    `
      --size: ${size}px;
      --position-x: ${positionX - size / 2}px;
      --position-y: ${positionY - size / 2}px;
      --animation-name: ${getRandomAnimation()};
      --animation-duration: ${animationDuration}ms;
    `
  );

  return flyImg;
};

const removeFlyingObject = e => e.currentTarget.remove();

const addFlyingObject = e => {
  if (intro) {
    intro.addEventListener('animationend', () => intro.remove());
    intro.classList.add('intro--hide');
  }

  const wrapper = document.querySelector('#app');

  const newFlyingObject = createFlyingObject({
    positionX: e.key ? Math.floor(e.target.clientWidth) / 2 : e.clientX,
    positionY: e.key ? Math.floor(e.target.clientHeight) / 2 : e.clientY,
  });

  newFlyingObject.addEventListener('animationend', removeFlyingObject);

  newFlyingObject.addEventListener('load', e =>
    wrapper.append(e.currentTarget)
  );
};

canvas.addEventListener('click', addFlyingObject);
document.addEventListener('keyup', addFlyingObject);
