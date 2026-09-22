// เก็บข้อมูลการ์ดทั้งหมดไว้ที่นี่ เพิ่มการ์ดใหม่ต่อท้ายในลิสต์ได้เลย
// ถ้ามีรูปภาพ ใส่ path ในช่อง image เช่น "images/blue-eyes.jpg"
// ถ้ายังไม่มีรูป ใส่ image: "" ไปก่อนได้ ระบบจะไม่แสดงรูป

const cards = [
  { name: "Blue-Eyes White Dragon", type: "Monster", atk: 3000, def: 2500, image: "images/001.png" },
  { name: "Dark Magician", type: "Monster", atk: 2500, def: 2100, image: "" },
  { name: "Exodia the Forbidden One", type: "Monster", atk: 1000, def: 1000, image: "" },
  { name: "Pot of Greed", type: "Spell", atk: null, def: null, image: "" },
  { name: "Mirror Force", type: "Trap", atk: null, def: null, image: "" },
  { name: "Red-Eyes Black Dragon", type: "Monster", atk: 2400, def: 2000, image: "" },
  { name: "Monster Reborn", type: "Spell", atk: null, def: null, image: "" },
];
