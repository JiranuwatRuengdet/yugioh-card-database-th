const searchBox = document.getElementById("searchBox");
const typeFilter = document.getElementById("typeFilter");
const sortBy = document.getElementById("sortBy");
const thumbGrid = document.getElementById("thumbGrid");
const featured = document.getElementById("featured");
const countEl = document.getElementById("count");

let selectedCard = cards[0] || null;

function getFilteredCards() {
  const query = searchBox.value.trim().toLowerCase();
  const type = typeFilter.value;
  const sort = sortBy.value;

  let result = cards.filter(function (card) {
    const matchName = card.name.toLowerCase().includes(query);
    const matchType = type === "all" || card.type === type;
    return matchName && matchType;
  });

  if (sort === "name") {
    result.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else if (sort === "atk-desc") {
    result.sort(function (a, b) { return (b.atk || 0) - (a.atk || 0); });
  } else if (sort === "atk-asc") {
    result.sort(function (a, b) { return (a.atk || 0) - (b.atk || 0); });
  }

  return result;
}

function renderFeatured(card) {
  if (!card) {
    featured.innerHTML = '<div class="empty">ไม่มีการ์ดให้แสดง</div>';
    return;
  }

  const frameContent = card.image
    ? '<img src="' + card.image + '" alt="' + card.name + '">'
    : '<div class="placeholder">' + card.type + '</div>';

  const statsHtml = card.atk !== null
    ? '<div class="stats"><span class="atk">ATK ' + card.atk + '</span> / DEF ' + card.def + '</div>'
    : '';

  featured.innerHTML =
    '<div class="featured-frame">' + frameContent + '</div>' +
    '<div class="featured-info">' +
      '<h2>' + card.name + '</h2>' +
      '<div class="type">' + card.type + '</div>' +
      statsHtml +
    '</div>';
}

function renderThumbs(list) {
  countEl.textContent = "พบ " + list.length + " ใบ";
  thumbGrid.innerHTML = "";

  if (list.length === 0) {
    thumbGrid.innerHTML = '<div class="empty">ไม่พบการ์ดที่ตรงกับเงื่อนไข</div>';
    return;
  }

  list.forEach(function (card) {
    const div = document.createElement("div");
    div.className = "thumb" + (card === selectedCard ? " active" : "");

    div.innerHTML = card.image
      ? '<img src="' + card.image + '" alt="' + card.name + '">'
      : '<div class="thumb-label">' + card.name + '</div>';

    div.addEventListener("click", function () {
      selectedCard = card;
      render();
    });

    thumbGrid.appendChild(div);
  });
}

function render() {
  const filtered = getFilteredCards();

  // ถ้าการ์ดที่เลือกอยู่ถูกกรองออกไป ให้เลือกใบแรกของผลลัพธ์แทน
  if (!filtered.includes(selectedCard)) {
    selectedCard = filtered[0] || null;
  }

  renderFeatured(selectedCard);
  renderThumbs(filtered);
}

searchBox.addEventListener("input", render);
typeFilter.addEventListener("change", render);
sortBy.addEventListener("change", render);

render();
