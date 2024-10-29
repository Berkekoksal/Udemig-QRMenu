import { renderProducts } from "./ui.js";

let data;

//* Menü verilerini json dosyasından çek.
const fetchProducts = async () => {
  // console.log("sayfa yüklendi");
  const res = await fetch("./db.json");
  //* Json verisini js formatına çevir.
  data = await res.json();
  // console.log(data);
};

//* Sayfanın yüklenme olayı
window.addEventListener("DOMContentLoaded", () => {
  //* Verileri çeken function
  fetchProducts()
    //* Function başarılı olduğu zaman kartları ekrana basana function çalıştır.
    .then(() =>
      // console.log(data)
      renderProducts(data.menu)
    );
});
//* Buttons alanındaki inputları çağır.
const inputs = document.querySelectorAll("#buttons input");
//* Butonlara tıklanma olayı izle.
inputs.forEach((input) => {
  input.addEventListener("change", () => {
    const productId = input.id;
    // console.log(productId);
    //* Eğer hepsi seçiliyse bütün data'yı ekrana bas
    if (productId === "all") {
      renderProducts(data.menu);
    } else {
      //* Menu elemanlarından seçilen kategoriye ait olanları filtrele.
      const filtred = data.menu.filter((i) => i.category === productId);
      // console.log(filtred);
      //* Filtred ekrana bas.
      renderProducts(filtred);
    }
  });
});
