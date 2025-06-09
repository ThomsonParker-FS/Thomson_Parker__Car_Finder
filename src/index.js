import "./styles/index.scss";
import dataset from "./car-dataset.json";

const selectMake = document.querySelector("#makeSelect");
const selectYear = document.querySelector("#yearSelect");
const selectModel = document.querySelector("#modelSelect");

//year make and model options

const yearSet = new Set();
const makeSet = new Set();
const modelSet = new Set();

//create sets for the data for the dropdowns.

const populateSets = () => {
  dataset.forEach((i) => {
    yearSet.add(i.year);
  });
};

/** I like to use docs to keep track of everything
 *
 *Originally had strict equality ===, but changed it to == which fixed it not working.
 *
 * @param {string} year
 * @returns all entries where the year matches the selection.
 */
const filterByYear = (year) => {
  return dataset.filter((i) => {
    return i.year == year;
  });
};

const filterByMake = (make, year) => {
  return dataset.filter((i) => {
    return i.Manufacturer == make && i.year == year;
  });
};

//in order to sort you need to populate an array, sort the array, and put it back in the set.

const sortSet = (set, order) => {
  let arr = [];
  set.forEach((item) => {
    arr.push(item);
  });
  //used the one line if else statement to sort the array. Ternary?
  arr.sort((a, b) => {
    return a > b ? -1 * order : 1 * order;
  });
  //clear the set and re-add items in sorted order.
  set.clear();
  arr.forEach((item) => {
    set.add(item);
  });
};

const optionsPopulate = (set, selector) => {
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.text = "Select an option";
  selector.appendChild(defaultOption);

  set.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.text = item;
    selector.appendChild(option);
  });
};

selectYear.addEventListener("change", yearHandler);
selectMake.addEventListener("change", makeHandler);
selectModel.addEventListener("change", modelHandler);

/**Handles when year is selected and or changed
 *
 * @param {event} event
 */
function yearHandler(e) {
  selectMake.removeAttribute("disabled");
  selectMake.parentElement.removeAttribute("class", "disabled");
  selectModel.setAttribute("disabled", true);
  selectModel.parentElement.setAttribute("class", "disabled");
  //clear the models when this changes
  clearOptions(modelSet, selectModel);
  clearOptions(makeSet, selectMake);
  let yearRaw = filterByYear(selectYear.value);

  yearRaw.forEach((item) => {
    makeSet.add(item.Manufacturer);
  });

  makeSet.size == 1 ? selectMake.addEventListener("click", makeHandler) : null;

  sortSet(makeSet, -1);
  optionsPopulate(makeSet, selectMake);
}

/** Handles when make is selected and or changed
 *
 * @param {event} event
 * @returns
 */
function makeHandler(e) {
  selectModel.removeAttribute("disabled");
  selectModel.parentElement.removeAttribute("class", "disabled");
  //clear the models when this changes
  clearOptions(modelSet, selectModel);

  let makeRaw = filterByMake(selectMake.value, selectYear.value);
  makeRaw.forEach((item) => {
    modelSet.add(item.model);
  });

  modelSet.size == 1
    ? selectModel.addEventListener("click", modelHandler)
    : null;

  sortSet(modelSet, -1);
  optionsPopulate(modelSet, selectModel);
}

function modelHandler(e) {
  let finalYear = selectYear.value;
  let finalMake = selectMake.value;
  let finalModel = selectModel.value;

  //filter by those attributes
  let finalResult = dataset.find((item) => {
    return (
      item.year == finalYear &&
      item.Manufacturer == finalMake &&
      item.model == finalModel
    );
  });

  console.log(finalResult);
}

function clearOptions(set, selector) {
  set.clear();
  //quick way to remove all children from the dropdown, thank you internet.
  selector.innerHTML = "";
}

(() => {
  console.log(dataset.filter((i) => i.year == 2024));

  populateSets();
  sortSet(yearSet, 1);
  optionsPopulate(yearSet, selectYear);
  selectMake.setAttribute("disabled", true);
  selectMake.parentElement.setAttribute("class", "disabled");
  selectModel.setAttribute("disabled", true);
  selectModel.parentElement.setAttribute("class", "disabled");
})();
