import "./styles/index.scss";
import dataset from "./car-dataset.json";

//we create a dropdown and populate the dropdowns with the data.

const selectMake = document.querySelector("#makeSelect");
const selectYear = document.querySelector("#yearSelect");
const selectModel = document.querySelector("#modelSelect");

const section = document.querySelector("section");

//year make and model options

const yearSet = new Set();
const makeSet = new Set();
const modelSet = new Set();

//when year is selected, create make set from all values of year
//when make set is selected, create all models from make.

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

const filterByMake = (make) => {
  return dataset.filter((i) => {
    return i.Manufacturer == make;
  });
};

//initial state is blank

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

//how do we get the input from the dropdowns.

//create the dropdowns, 3 of them, with options.

//had to find out how to iterate through sets.

const optionsPopulate = (set, selector) => {
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
  //clear the models when this changes
  clearOptions(modelSet, selectModel);
  clearOptions(makeSet, selectMake);

  let yearRaw = filterByYear(selectYear.value);

  yearRaw.forEach((item) => {
    makeSet.add(item.Manufacturer);
  });

  sortSet(makeSet, -1);
  optionsPopulate(makeSet, selectMake);
}

/** Handles when make is selected and or changed
 *
 * @param {event} event
 * @returns
 */
function makeHandler(e) {
  //clear the models when this changes
  clearOptions(modelSet, selectModel);

  let makeRaw = filterByMake(selectMake.value);
  makeRaw.forEach((item) => {
    modelSet.add(item.model);
  });
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
  populateSets();
  sortSet(yearSet, 1);
  // sortSet(modelSet, -1);
  // sortSet(makeSet, -1);
  optionsPopulate(yearSet, selectYear);

  //after this we sort by year, then make and then model.

  // optionsPopulate(makeSet, selectMake);
  // optionsPopulate(modelSet, selectModel);
  section.appendChild(selectYear);
  section.appendChild(selectMake);
  section.appendChild(selectModel);
})();
