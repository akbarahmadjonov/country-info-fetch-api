let elBody = document.querySelector("body");
let elBtn = document.querySelector(".dark");
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form-control");
let elSelect = document.querySelector(".form-select");
let elList = document.querySelector(".list");
let listTemplate = document.querySelector(".listTemplate").content;

// Theme
elBtn.addEventListener("click", function () {
  elBody.classList.toggle("mode");
});
let fragment = document.createDocumentFragment();

const renderCountry = (array, node) => {
  node.innerHTML = [];
  array.forEach((el) => {
    let clonedTemplate = listTemplate.cloneNode(true);
    clonedTemplate.querySelector(".card-img-top").src = el.flags.svg;
    clonedTemplate.querySelector(".card-title").textContent = el.name.common;
    clonedTemplate.querySelector(
      ".card-text-population"
    ).innerHTML = `<i class="fa-solid fa-arrow-up-right-dots"></i> Population: <strong>${el.population}</strong>`;

    clonedTemplate.querySelector(
      ".card-text-region"
    ).innerHTML = `<i class="fa-solid fa-earth-oceania"></i> Region: <strong>${el.region}</strong>`;

    clonedTemplate.querySelector(
      ".card-text-capital"
    ).innerHTML = `<i class="fa-solid fa-building-columns"></i> Capital: <strong>${el.capital}</strong>`;

    fragment.appendChild(clonedTemplate);
  });
  node.appendChild(fragment);
};

async function getCountries() {
  // Fetch all the features, and clone will use this
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();
  renderCountry(data, elList);
}
getCountries();

//* Compare Input name
async function compareInput() {
  let response = await fetch(
    `https://restcountries.com/v3.1/name/${elInput.value}`
  );
  let data = await response.json();
  renderCountry(data, elList);
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (elInput.value !== "") {
    compareInput();
  }

  // Executes to the DOM
});
elForm.addEventListener("submit", (evt) => evt.preventDefault());

// Select

async function getSelectValues() {
  let response = await fetch(
    `https://restcountries.com/v3.1/region/${elSelect.value}`
  );
  let data = await response.json();
  renderCountry(data, elList);
}

elSelect.addEventListener("change", () => {
  if (elSelect.value !== "") {
    getSelectValues();
  }
});
