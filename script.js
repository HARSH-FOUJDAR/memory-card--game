const gridContainer = document.querySelector('.grid-container');
const scoreSpan = document.querySelector('.score');

let flippedCards = [];
let score = 0;
let matchedPairs = 0;

// 6 colors, each appears twice
const colors = [
  'red','red',
  'blue','blue',
  'green','green',
  'yellow','yellow',
  'purple','purple',
  'orange','orange'
];

function initGame() {
  score = 0;
  matchedPairs = 0;
  scoreSpan.textContent = score;
  gridContainer.innerHTML = '';
  flippedCards = [];

  const shuffled = [...colors].sort(() => 0.5 - Math.random());

  shuffled.forEach(color => {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundColor = color;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => flipCard(card, color));

    gridContainer.appendChild(card);
  });
}

function flipCard(card, color) {
  if (!card || card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push({card, color});

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.color === second.color) {
    first.card.classList.add('matched');
    second.card.classList.add('matched');
    score++;
    matchedPairs++;
    scoreSpan.textContent = score;
    if (matchedPairs === colors.length / 2) {
      setTimeout(() => alert("🎉 Congratulations! You found all pairs!"), 200);
    }
  } else {
    first.card.classList.remove('flipped');
    second.card.classList.remove('flipped');
  }

  flippedCards = [];
}

function restartGame() {
  initGame();
}

// Initialize game on page load
initGame();
