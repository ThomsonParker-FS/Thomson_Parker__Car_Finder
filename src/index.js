import "./styles/index.scss";
import dataset from "./car-dataset.json";

//we create a dropdown and populate the dropdowns with the data.

const selectMake = document.createElement("select");
const selectYear = document.createElement("select");
const selectModel = document.createElement("select");
const section = document.querySelector("section");

//year make and model options

const yearSet = new Set();


//make set and model set are dependent on year.
const makeSet = new Set();
const modelSet = new Set();

//when year is selected, create make set from all values of year
//when make set is selected, create all models from make.


//create sets for the data for the dropdowns.

const populateSets = () => {
  dataset.forEach((i) => {
    yearSet.add(i.year);
  });


  //needs to be filtered on the spot
  // dataset.forEach((i) => {
  //   makeSet.add(i.Manufacturer);
  // });

  // dataset.forEach((i) => {
  //   modelSet.add(i.model);
  // });
};

const filterByYear = (year) => {
  return dataset.filter((i) => {
    return i.year === year;
  });
};

const filterByModel = (model) => {
  return dataset.filter((i) => {
    return i.model === model;
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
  console.log(arr);
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

(() => {
  // populateSets();
  // sortSet(yearSet, 1);
  // sortSet(modelSet, -1);
  // sortSet(makeSet, -1);
  // optionsPopulate(yearSet, selectYear);
  // optionsPopulate(makeSet, selectMake);
  // optionsPopulate(modelSet, selectModel);
  // section.appendChild(selectYear);
  // section.appendChild(selectMake);
  // section.appendChild(selectModel);
})();

//populateSets();

//Options are populated
//optionsPopulate(yearSet, selectYear);
// optionsPopulate(makeSet, selectMake);
// optionsPopulate(modelSet, selectModel);

// let optionA = document.createElement("option");
// optionA.value = "select";
// optionA.text = "select";
// selectMake.appendChild(optionA);
// section.appendChild(selectMake);

//add the selectors to the dom.
//section.appendChild(selectMake);
//console.log(selectMake);
// section.appendChild(selectYear);
// section.appendChild(selectModel);

//read the data from the selected options.

// let currentMakeSelection = selectMake.value;
// let currentModelSelection = selectModel.value;
// let currentYearSelection = selectYear.value;
