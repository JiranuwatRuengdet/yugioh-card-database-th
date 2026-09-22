const searchInput =
  document.getElementById("searchInput");

const typeFilter =
  document.getElementById("typeFilter");

const clearButton =
  document.getElementById("clearButton");


const searchGrid =
  document.getElementById("searchGrid");

const relatedGrid =
  document.getElementById("relatedGrid");


const searchCount =
  document.getElementById("searchCount");

const relatedCount =
  document.getElementById("relatedCount");


const detailEmpty =
  document.getElementById("detailEmpty");

const detailContent =
  document.getElementById("detailContent");


const detailImage =
  document.getElementById("detailImage");

const detailCardName =
  document.getElementById("detailCardName");

const detailType =
  document.getElementById("detailType");

const detailAttribute =
  document.getElementById("detailAttribute");

const detailLevel =
  document.getElementById("detailLevel");

const detailAtk =
  document.getElementById("detailAtk");

const detailDef =
  document.getElementById("detailDef");

const detailEffect =
  document.getElementById("detailEffect");


let selectedCardId = null;


/* =========================
   SEARCH
========================= */

function searchCards() {

  const keyword =
    searchInput.value
      .trim()
      .toLowerCase();

  const type =
    typeFilter.value;


  const results =
    cards.filter(card => {

      const nameMatch =
        card.name
          .toLowerCase()
          .includes(keyword);


      const typeMatch =
        !type ||
        card.type === type;


      return nameMatch && typeMatch;

    });


  renderSearchResults(results);
}


/* =========================
   SEARCH RESULT
========================= */

function renderSearchResults(results) {

  searchGrid.innerHTML = "";

  searchCount.textContent =
    results.length;


  if (results.length === 0) {

    searchGrid.innerHTML = `
      <div class="empty">
        ไม่พบการ์ดที่ค้นหา
      </div>
    `;

    return;
  }


  results.forEach(card => {

    const element =
      createCardElement(card);

    searchGrid.appendChild(element);

  });

}


/* =========================
   CARD ELEMENT
========================= */

function createCardElement(card) {

  const element =
    document.createElement("div");

  element.className =
    "card-item";


  if (card.id === selectedCardId) {

    element.classList.add("active");

  }


  element.innerHTML = `

    <img
      src="${card.image}"
      alt="${card.name}"
      loading="lazy"
    >

    <div class="card-name">
      ${card.name}
    </div>

  `;


  element.addEventListener(
    "click",
    () => selectCard(card.id)
  );


  return element;
}


/* =========================
   SELECT CARD
========================= */

function selectCard(id) {

  const card =
    cards.find(
      item => item.id === id
    );


  if (!card) return;


  selectedCardId = id;


  showDetail(card);

  showRelated(card);

  refreshActiveCards();

}


/* =========================
   DETAIL
========================= */

function showDetail(card) {

  detailEmpty.classList.add("hidden");

  detailContent.classList.remove("hidden");


  detailImage.src =
    card.image;

  detailImage.alt =
    card.name;


  detailCardName.textContent =
    card.name;


  detailType.textContent =
    card.type;


  detailAttribute.textContent =
    card.attribute || "-";


  detailLevel.textContent =
    card.level || "-";


  detailAtk.textContent =
    card.atk ?? "-";


  detailDef.textContent =
    card.def ?? "-";


  detailEffect.textContent =
    card.effect || "-";

}


/* =========================
   RELATED CARDS
========================= */

function showRelated(card) {

  relatedGrid.innerHTML = "";


  const relatedCards =
    (card.related || [])

      .map(id =>
        cards.find(
          item => item.id === id
        )
      )

      .filter(Boolean);


  relatedCount.textContent =
    relatedCards.length;


  if (relatedCards.length === 0) {

    relatedGrid.innerHTML = `
      <div class="empty">
        ไม่มีการ์ดที่เกี่ยวข้อง
      </div>
    `;

    return;
  }


  relatedCards.forEach(
    relatedCard => {

      const element =
        createCardElement(
          relatedCard
        );

      relatedGrid.appendChild(
        element
      );

    }
  );

}


/* =========================
   ACTIVE CARD
========================= */

function refreshActiveCards() {

  document
    .querySelectorAll(".card-item")
    .forEach(element => {

      element.classList.remove(
        "active"
      );

    });


  /*
    หา card ที่ถูกเลือก
    จาก data id ภายหลังได้
  */

}


/* =========================
   INPUT EVENTS
========================= */

searchInput.addEventListener(
  "input",
  searchCards
);


typeFilter.addEventListener(
  "change",
  searchCards
);


/* =========================
   CLEAR
========================= */

clearButton.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    typeFilter.value = "";

    searchGrid.innerHTML = `
      <div class="empty">
        ค้นหาการ์ดเพื่อเริ่มต้น
      </div>
    `;

    searchCount.textContent = "0";

  }
);