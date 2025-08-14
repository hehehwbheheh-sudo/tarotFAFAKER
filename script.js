async function drawCards() {
  const count = parseInt(document.getElementById('cardCount').value);
  const res = await fetch('data/tarot.json');
  const deck = await res.json();

  const shuffled = deck.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  const container = document.getElementById('cards');
  container.innerHTML = '';

  selected.forEach(card => {
    const isReversed = Math.random() < 0.5;

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.innerHTML = `
      <img src="assets/cards/${card.image}" style="transform: ${isReversed ? 'rotate(180deg)' : 'none'};" />
      <h3>${card.name}</h3>
      <p><strong>Số:</strong> ${card.number} | <strong>Bộ:</strong> ${card.suit}</p>
      <p><strong>Ý nghĩa ${isReversed ? 'ngược' : 'xuôi'}:</strong><br>${isReversed ? card.meaning_reversed : card.meaning_upright}</p>
    `;

    container.appendChild(cardDiv);
  });

}
fetch('du-lieu/tarot.json')
  .then(res => res.json())
  .then(data => console.log('Dữ liệu tarot:', data))
  .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
