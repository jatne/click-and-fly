const canvas = document.getElementById('app');

function createAnimal(options) {
  const figure = document.createElement('div');
  const { positionX, positionY } = options;
  const size = Math.floor(Math.random() * 50 + 50);
  const figures = ['horse', 'cat', 'dog'];
  const randomFigure = figures[Math.floor(Math.random() * figures.length)];

  figure.classList.add('figure-temp');
  figure.classList.add(randomFigure);

  figure.setAttribute(
    'style',
    ` --hue: ${Math.random() * 360};
      --size: ${size}px;
      --position-x: ${positionX - size / 2}px;
      --position-y: ${positionY - size / 2}px;
      --animation-duration: ${Math.random() * 6000 + 3000}ms;
    `
  );

  return figure;
}

function removeAnimal(event) {
  event.currentTarget.remove();
}

function addAnimal(event) {
  const wrapper = event.currentTarget;
  const newAnimal = createAnimal({
    positionX: event.clientX,
    positionY: event.clientY,
  });

  newAnimal.addEventListener('animationend', removeAnimal);

  wrapper.append(newAnimal);
}

canvas.addEventListener('click', addAnimal);
