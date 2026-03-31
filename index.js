// 1. المتغيرات العامة
let allProducts = [];

// 2. تحميل البيانات عند فتح أي صفحة
document.addEventListener("DOMContentLoaded", () => {
  fetch("index.json")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      allProducts = data.products;

      // تحسين منطق فحص الصفحة الحالية
      const grid = document.getElementById("products-grid");
      const isHomePage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";

      if (grid && isHomePage) {
        renderProducts(allProducts);
      }
    })
    .catch((err) => console.error("Error loading products:", err));
});

// 3. دالة عرض المنتجات (تُستخدم في كل الصفحات)
function renderProducts(list) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML =
    list.length > 0
      ? ""
      : "<p style='text-align:center; grid-column: 1/-1;'>No products found in this category.</p>";

  list.forEach((p) => {
    const finalLink = p.amazon_link.includes("?")
      ? `${p.amazon_link}&tag=lyncstore-20`
      : `${p.amazon_link}?tag=lyncstore-20`;
    // --------------------------------------------

    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
            <img src="${p.image}" 
                 alt="${p.name} - ${p.category}" 
                 loading="lazy">
            <h3>${p.name}</h3>
            <p class="feature">${p.feature}</p>
            <div class="meta">
                <span class="price">$${p.price}</span>
                <span class="rating">${p.rating ? "⭐".repeat(Math.round(p.rating)) : "⭐ 4.5"}</span>
            </div>
            <a class="buy" 
               href="${finalLink}" 
               target="_blank" 
               rel="noopener noreferrer">View on Amazon</a>
        `;
    grid.appendChild(div);
  });
}
// كود تشغيل قائمة الموبايل
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("show");
    });
  }
});
