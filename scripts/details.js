/*
 * URL'deki arama parametrelerine (search-param.) erişeceğiz.
 * JS'de tarayıcı ile alakalı olan verileri erişmek istiyorsak window nesnesi kullanırız.
 * *JS'de URL'deki arama parametrelerini yönetmeye yarayan yerleşik bir class vardır. (URLSearchParams)
 */
//* Kullanacağımız product'ın id kısmına eriştik.
// console.log(window.location.search);
//* Dizideki id'nin numarasına eriştik.
//! Tam Dinamik değil
// console.log(window.location.search.split("=")[1]);
// console.log(window.location.search.slice(4));

const URL = window.location.search;
const params = new URLSearchParams(URL);
//* Yukarıdaki classtan oluşturduğumuz nesne sayesinde URL'deki arama parametrelerini güncellemeye / erişmeye / silmeye yarayan methodları kullanabiliyoruz. Bizde het methodu ile id parametresine eriştik.
// console.log(params.get("id"));
const id = params.get("id");

//* Sayafanın yüklenme olayını izle.
window.addEventListener("DOMContentLoaded", async () => {
  //* API'dan verileri al.
  try {
    const res = await fetch("../db.json");
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    //* Veriler arasından URL'deki id'ye denk gelen product bul.
    const productId = data.menu.find((item) => item.id == id);
    //* Ürün bulunamaz ise 404 sayfasını renderla
    if (!productId) {
      renderNotFound();
    } else {
      //* Sayfa içeriğini API'dan aldığımız ürüne göre değiştir.
      renderPage(productId);
    }
  } catch (error) {
    renderNotFound();
    alert("Sorry,could'nt see this website.");
  }
  // console.log(productId);
});
const detail = document.querySelector("#detail");

function renderPage(product) {
  detail.innerHTML = `
    <div class="d-flex justify-content-between align-items-center fs-6">
        <a href="/">
          <img
            src="./images/home.png"
            width="40px"
            alt="home-image"
          />
        </a>
        <p>home / ${product.category} / ${product.title.toLowerCase()}</p>
    </div>
      <h1 class="text-center my-4">${product.title}</h1>
      <img
        src="${product.img}"
        style="max-height: 400px" 
        alt="detail-image"
        class="rounded object-fit-cover shadow"
      />
      <h3 class="mt-3">
        <span>Product Categories :</span>
        <span class="text-success">${product.category}</span>
      </h3>
      <h4 class="mt-3">
        <span>Product Prices :</span>
        <span class="text-success">$${product.price}</span>
      </h4>
      <p class="lead">
      ${product.desc}
      </p>
    `;
}

//* Render Not Found

function renderNotFound() {
  detail.innerHTML = `
<div style="height:90vh" class="bg-danger d-flex justify-content-center align-items-center">
  <div class="d-flex flex-column align-items-center gap-3">
    <h1 class="text-center ">404 NOT FOUND</h1>  
    <a href="/" class="text-decoration-none">Back to Homepage</a>
   </div>
</div>
    `;
}
