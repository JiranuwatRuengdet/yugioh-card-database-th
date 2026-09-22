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


/* ========================================
   SEARCH / FILTER
======================================== */

function searchCards() {

  const keyword =
    searchInput.value
      .trim()
      .toLowerCase();

  const type =
    typeFilter.value;


  const results =
    cards.filter(card => {

      const name =
        (card.name || "")
          .toLowerCase();


      const nameMatch =
        name.includes(keyword);


      const typeMatch =
        !type ||
        card.type === type;


      return nameMatch && typeMatch;

    });


  renderSearchResults(results);
}


/* ========================================
   RENDER SEARCH RESULTS
======================================== */

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


/* ========================================
   CREATE CARD
======================================== */

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
      onerror="this.style.display='none'"
    >

    <div class="card-name">
      ${card.name}
    </div>

  `;


  element.addEventListener(
    "click",
    () => {

      selectCard(card.id);

    }
  );


  return element;
}


/* ========================================
   SELECT CARD
======================================== */

function selectCard(id) {

  const card =
    cards.find(
      item => item.id === id
    );


  if (!card) return;


  selectedCardId =
    card.id;


  showDetail(card);

  showRelated(card);

  refreshCards();

}


/* ========================================
   SHOW DETAIL
======================================== */

function showDetail(card) {

  /*
    ซ่อนหน้า "เลือกการ์ด"
  */

  detailEmpty.classList.add(
    "hidden"
  );


  /*
    แสดงรายละเอียด
  */

  detailContent.classList.remove(
    "hidden"
  );


  /*
    รูป
  */

  detailImage.src =
    card.image;

  detailImage.alt =
    card.name;


  /*
    ชื่อ
  */

  detailCardName.textContent =
    card.name;


  /*
    ประเภท
  */

  detailType.textContent =
    card.type || "-";


  /*
    Attribute
  */

  detailAttribute.textContent =
    card.attribute || "-";


  /*
    Level
  */

  detailLevel.textContent =
    card.level ?? "-";


  /*
    ATK
  */

  detailAtk.textContent =
    card.atk ?? "-";


  /*
    DEF
  */

  detailDef.textContent =
    card.def ?? "-";


  /*
    Effect
  */

  detailEffect.textContent =
    card.effect || "-";

}


/* ========================================
   RELATED CARDS
======================================== */

function showRelated(card) {

  relatedGrid.innerHTML = "";


  const relatedIds =
    card.related || [];


  const relatedCards =
    relatedIds
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


/* ========================================
   REFRESH ACTIVE CARD
======================================== */

function refreshCards() {

  /*
    ลบ active ทั้งหมด
  */

  document
    .querySelectorAll(".card-item")
    .forEach(element => {

      element.classList.remove(
        "active"
      );

    });


  /*
    สร้างรายการใหม่เพื่อให้
    การ์ดที่เลือกมีกรอบทอง
  */

  const keyword =
    searchInput.value
      .trim()
      .toLowerCase();

  const type =
    typeFilter.value;


  const results =
    cards.filter(card => {

      const name =
        (card.name || "")
          .toLowerCase();


      return (
        name.includes(keyword) &&
        (!type || card.type === type)
      );

    });


  renderSearchResults(results);

}


/* ========================================
   SEARCH INPUT
======================================== */

searchInput.addEventListener(
  "input",
  searchCards
);


/* ========================================
   TYPE FILTER
======================================== */

typeFilter.addEventListener(
  "change",
  searchCards
);


/* ========================================
   CLEAR
======================================== */

clearButton.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    typeFilter.value = "";


    /*
      ล้างผลการค้นหา
      แล้วแสดงการ์ดทั้งหมด
    */

    searchCards();

  }
);


/* ========================================
   INITIAL LOAD
======================================== */

/*
  ตรงนี้สำคัญ

  ตอนเปิดเว็บ:
  - แสดงการ์ดทั้งหมดทางขวา
  - ไม่เลือกการ์ด
  - ตรงกลางยังว่าง
*/

searchCards();