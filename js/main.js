// write your code here
const filter = document.querySelector(".filter");
const showAll = document.getElementById("showAll");
const cardHolder = document.getElementById("cardHolder");
const bikesByGender = document.getElementById("bikesByGender");
const bikesByBrands = document.getElementById("bikesByBrands");

const createCard = (bike) => {
  cardHolder.innerHTML += `
			<div class="col-sm-4">
        <div class="panel panel-default">
          <div class="panel-body"><img class="img-responsive" src="img/${bike.image}.png" alt="bike" /></div>
            <div class="panel-footer">
                <h5 class="text-uppercase bike-name">${bike.name}</h5>
                <p><span>${bike.price}</span> $</p>
            </div>
        </div>
      </div>
		`;
};

const createFilter = (res) => {
  showAll.innerHTML += `<a href="#" class="list-group-item active">Show all<span class="badge">${res.products.length}</span></a>`;

  const genders = [...new Set(res.products.map((res) => res.gender))];
  genders.forEach((gender) => {
    bikesByGender.innerHTML += `<a href="#" class="gender list-group-item text-capitalize">${gender.toLowerCase()}<span class="badge">${
      res.products.filter((res) => res.gender === gender).length
    }</span></a>`;
  });

  const brands = [...new Set(res.products.map((res) => res.brand))];
  brands.forEach((brand) => {
    bikesByBrands.innerHTML += `<a href="#" class="brand list-group-item">${brand}<span class="badge">${
      res.products.filter((res) => res.brand === brand).length
    }</span></a>`;
  });
};

fetch("https://challenges.brainster.tech/ajax_data/data.json")
  .then((res) => res.json())
  .then((res) => {
    res.products.forEach((bike) => createCard(bike));
    createFilter(res);

    showAll.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      showAll.querySelector(".list-group-item").classList.add("active");
      cardHolder.innerHTML = "";
      res.products.forEach((bike) => createCard(bike));
    });

    for (const child of bikesByGender.children) {
      child.addEventListener("click", (e) => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        cardHolder.innerHTML = "";
        const genderBikes = res.products.filter(
          (bike) =>
            bike.gender === e.target.innerText.split("\n")[0].toUpperCase()
        );
        genderBikes.forEach((bike) => createCard(bike));
      });
    }

    for (const child of bikesByBrands.children) {
      child.addEventListener("click", (e) => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        cardHolder.innerHTML = "";
        const brandBikes = res.products.filter(
          (bike) =>
            bike.brand === e.target.innerText.split("\n")[0].toUpperCase()
        );
        brandBikes.forEach((bike) => createCard(bike));
      });
    }
  })

  .catch((err) => console.log("Error:", err));
