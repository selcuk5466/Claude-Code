"use strict";

const CARS = [
  { id: 1, name: "Fiat Egea", cat: "Ekonomik", emoji: "🚗", color: "#e8f1ff", price: 950, seats: 5, gear: "Manuel", fuel: "Dizel", bags: 2 },
  { id: 2, name: "Renault Clio", cat: "Ekonomik", emoji: "🚙", color: "#eafaf1", price: 850, seats: 5, gear: "Otomatik", fuel: "Benzin", bags: 2 },
  { id: 3, name: "Hyundai i20", cat: "Ekonomik", emoji: "🚗", color: "#fff4e5", price: 900, seats: 5, gear: "Otomatik", fuel: "Benzin", bags: 2 },
  { id: 4, name: "Nissan Qashqai", cat: "SUV", emoji: "🚙", color: "#f0ebff", price: 1750, seats: 5, gear: "Otomatik", fuel: "Dizel", bags: 4 },
  { id: 5, name: "Toyota C-HR Hybrid", cat: "SUV", emoji: "🚙", color: "#e6fbff", price: 1900, seats: 5, gear: "Otomatik", fuel: "Hibrit", bags: 3 },
  { id: 6, name: "Volkswagen Tiguan", cat: "SUV", emoji: "🚙", color: "#fdecec", price: 2200, seats: 5, gear: "Otomatik", fuel: "Dizel", bags: 4 },
  { id: 7, name: "BMW 5 Serisi", cat: "Lüks", emoji: "🏎️", color: "#eef0f6", price: 4200, seats: 5, gear: "Otomatik", fuel: "Dizel", bags: 3 },
  { id: 8, name: "Mercedes E-Serisi", cat: "Lüks", emoji: "🏎️", color: "#f4f4f4", price: 4800, seats: 5, gear: "Otomatik", fuel: "Benzin", bags: 3 },
  { id: 9, name: "Ford Transit Minibüs", cat: "Ticari", emoji: "🚐", color: "#fff9e0", price: 2800, seats: 9, gear: "Manuel", fuel: "Dizel", bags: 6 },
  { id: 10, name: "Fiat Doblo Combi", cat: "Ticari", emoji: "🚐", color: "#e9f7ee", price: 1500, seats: 5, gear: "Manuel", fuel: "Dizel", bags: 5 },
];

const INSURANCE_PER_DAY = 150;
const CHILD_SEAT_PER_DAY = 40;

const $ = (id) => document.getElementById(id);
const tl = (n) => n.toLocaleString("tr-TR") + " ₺";
const state = { cat: "all", sort: "price-asc", selected: null };

/* ---------- Tarihler ---------- */
function isoDate(d) {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}
function days() {
  const s = $("startDate").valueAsDate, e = $("endDate").valueAsDate;
  if (!s || !e) return 0;
  const n = Math.round((e - s) / 86400000);
  return n >= 1 ? n : 0;
}
function initDates() {
  const today = new Date();
  const start = new Date(today); start.setDate(start.getDate() + 1);
  const end = new Date(today); end.setDate(end.getDate() + 4);
  $("startDate").min = isoDate(today);
  $("startDate").value = isoDate(start);
  $("endDate").min = isoDate(start);
  $("endDate").value = isoDate(end);
}

/* ---------- Filo ---------- */
function renderCars() {
  let list = CARS.filter((c) => state.cat === "all" || c.cat === state.cat);
  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, "tr"),
  };
  list = list.sort(sorters[state.sort]);

  const d = days();
  $("rangeInfo").textContent = d
    ? `${d} günlük kiralama için toplam fiyatlar gösteriliyor.`
    : "Günlük fiyatlar gösteriliyor. Toplam fiyat için tarih seçin.";

  $("cars").innerHTML = list.length
    ? list.map((c) => `
      <article class="car">
        <div class="pic" style="background:${c.color}" aria-hidden="true">${c.emoji}</div>
        <div class="body">
          <span class="tag">${c.cat}</span>
          <h3>${c.name}</h3>
          <div class="specs">
            <span>👥 ${c.seats} kişi</span><span>🧳 ${c.bags} bavul</span>
            <span>⚙️ ${c.gear}</span><span>⛽ ${c.fuel}</span>
          </div>
          <div class="price">
            <div><strong>${tl(d ? c.price * d : c.price)}</strong><br><small>${d ? tl(c.price) + " / gün" : "günlük"}</small></div>
            <button class="btn" data-book="${c.id}">Kirala</button>
          </div>
        </div>
      </article>`).join("")
    : '<p class="empty">Bu kategoride araç bulunamadı.</p>';
}

/* ---------- Rezervasyon ---------- */
function bookingTotal() {
  const d = days();
  const car = state.selected;
  if (!car || !d) return 0;
  let perDay = car.price;
  if ($("fInsurance").checked) perDay += INSURANCE_PER_DAY;
  if ($("fChild").checked) perDay += CHILD_SEAT_PER_DAY;
  return perDay * d;
}
function updateTotal() {
  $("bookTotal").textContent = tl(bookingTotal());
}
function openBooking(id) {
  const car = CARS.find((c) => c.id === id);
  if (!days()) {
    $("searchMsg").textContent = "Lütfen geçerli bir alış ve teslim tarihi seçin (en az 1 gün).";
    $("searchForm").scrollIntoView({ behavior: "smooth" });
    return;
  }
  state.selected = car;
  $("bookForm").reset();
  $("formMsg").textContent = "";
  $("bookTitle").textContent = `${car.name} — Rezervasyon`;
  $("bookSummary").textContent =
    `${$("pickup").value} · ${$("startDate").value} → ${$("endDate").value} (${days()} gün)`;
  updateTotal();
  $("bookDialog").showModal();
}
function submitBooking(e) {
  e.preventDefault();
  const name = $("fName").value.trim();
  const email = $("fEmail").value.trim();
  const phone = $("fPhone").value.replace(/\s+/g, "");
  if (name.length < 3) return ($("formMsg").textContent = "Lütfen ad ve soyadınızı girin.");
  if (!/^\S+@\S+\.\S+$/.test(email)) return ($("formMsg").textContent = "Geçerli bir e-posta girin.");
  if (!/^(\+90|0)?5\d{9}$/.test(phone)) return ($("formMsg").textContent = "Geçerli bir cep telefonu girin (05xx xxx xx xx).");

  const code = "SK" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const form = $("bookForm");
  form.innerHTML = `
    <div class="success">
      <div class="big">✅</div>
      <h3>Rezervasyonunuz alındı!</h3>
      <p>Rezervasyon kodu: <strong>${code}</strong></p>
      <p class="summary">${state.selected.name} · ${days()} gün · ${tl(bookingTotal())}<br>Onay e-postası ${email.replace(/[<>&"]/g, "")} adresine gönderilecektir. (Demo)</p>
      <button type="button" class="btn" id="doneBtn">Tamam</button>
    </div>`;
  $("doneBtn").addEventListener("click", () => location.reload());
}

/* ---------- Olaylar ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("year").textContent = new Date().getFullYear();
  initDates();
  renderCars();

  $("startDate").addEventListener("change", () => {
    $("endDate").min = $("startDate").value;
    if ($("endDate").value <= $("startDate").value) {
      const d = $("startDate").valueAsDate; d.setDate(d.getDate() + 1);
      $("endDate").value = isoDate(d);
    }
    renderCars();
  });
  $("endDate").addEventListener("change", renderCars);

  $("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!days()) {
      $("searchMsg").textContent = "Teslim tarihi, alış tarihinden sonra olmalıdır.";
      return;
    }
    $("searchMsg").textContent = "";
    renderCars();
    $("filo").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.cat = b.dataset.cat;
      renderCars();
    })
  );
  $("sort").addEventListener("change", (e) => { state.sort = e.target.value; renderCars(); });

  $("cars").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book]");
    if (btn) openBooking(Number(btn.dataset.book));
  });

  $("bookForm").addEventListener("submit", submitBooking);
  $("bookForm").addEventListener("change", updateTotal);
  $("bookDialog").addEventListener("click", (e) => {
    if (e.target.id === "closeBtn" || e.target === $("bookDialog")) $("bookDialog").close();
  });
});
