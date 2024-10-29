//* Arayüze etki edecen bütün function burada tutulacak.
const menuList = document.querySelector("#menu-list");
//* Menü elemanlarını parametre olarak alıp dizideki her bir eleman için ekrana bas.
export const renderProducts = (data) => {
  // console.log("parametre", data);
  //* data dizisindeki her bir nesne için kart HTML'i oluşturduk.
  //* join metodu ile diziyi string'e çevirdik.
  const cardHTML = data
    .map(
      (item) =>
        `<a href="/detail.html?id=${item.id}"
        id="card"
        class="card p-3 d-flex flex-column flex-md-row gap-5 text-decoration-none text-dark shadow" 
      >
        <img class="rounded shadow img-fluid " src="${item.img}" alt="menu-image" />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success fw-bold">$${item.price}</p>
          </div>

          <p class="lead">
          ${item.desc}
          </p>
        </div>
      </a>`
    )
    .join("");
  //* Oluşturduğumuz kartları #menulist divinin içine aktar.
  menuList.innerHTML = cardHTML;
};
