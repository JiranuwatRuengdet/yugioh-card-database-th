const searchBox = document.getElementById("searchBox");
const typeFilter = document.getElementById("typeFilter");
const sortBy = document.getElementById("sortBy");
const grid = document.getElementById("cardGrid");
const countEl = document.getElementById("count");

function render() {
  const query = searchBox.value.trim().toLowerCase();
  const type = typeFilter.value;
  const sort = sortBy.value;

  // กรองตามคำค้นหาและประเภท
  let result = cards.filter(function (card) {
    const matchName = card.name.toLowerCase().includes(query);
    const matchType = type === "all" || card.type === type;
    return matchName && matchType;
  });

  // เรียงลำดับ
  if (sort === "name") {
    result.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else if (sort === "atk-desc") {
    result.sort(function (a, b) { return (b.atk || 0) - (a.atk || 0); });
  } else if (sort === "atk-asc") {
    result.sort(function (a, b) { return (a.atk || 0) - (b.atk || 0); });
  }

  // วาดผลลัพธ์ใหม่ลงหน้าเว็บ
  countEl.textContent = "พบ " + result.length + " ใบ";
  grid.innerHTML = "";

  if (result.length === 0) {
    grid.innerHTML = '<div class="empty">ไม่พบการ์ดที่ตรงกับเงื่อนไข</div>';
    return;
  }

  result.forEach(function (card) {
    const div = document.createElement("div");
    div.className = "card";

    const imageHtml = card.image
      ? '<img src="' + card.image + '" alt="' + card.name + '">'
      : "";
    const atkDefText = card.atk !== null
      ? "ATK " + card.atk + " / DEF " + card.def
      : "";

    div.innerHTML =
      imageHtml +
      "<h3>" + card.name + "</h3>" +
      '<div class="meta">' + card.type + "</div>" +
      '<div class="atk-def">' + atkDefText + "</div>";

    grid.appendChild(div);
  });
}

searchBox.addEventListener("input", render);
typeFilter.addEventListener("change", render);
sortBy.addEventListener("change", render);

render(); // แสดงผลครั้งแรกตอนโหลดหน้า
