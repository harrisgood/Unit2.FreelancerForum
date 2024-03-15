/*
The site:
  -user sees list of available freelancers
    -name
    -occupation
    -starting price for services
  -message with average starting price of all freelancers
  -every few seconds after page loads:
    -new freelancer appears on list
      -adjusts average starting price

How to do it:
  -create html tags
    -create function(s) to push data to them when necessary
      -querySelectors
  -generate random freelancer
    -create blank object
    -use getRandom to pick element, grab that element from array of possible choices
    -assign these choices as values to name/occupation/price keys
    -push new freelancer to freelancers array
  -use setInterval() to run these functions
  -have a function total up starting prices and divide by number of prices

*/

// array of freelancers to display on our website
const freelancers = [
  { name: `Alice`, price: 30, occupation: `writer`},
  { name: `Bob`, price: 50, occupation: `teacher`},
  { name: `Carol`, price: 70, occupation: `programmer`},
];

// some lists of names/occupations/prices we can pick from to "randomly" generate a new freelancer
const randomNames = [`alex`, `rachel`, `sarah`, `juan`, `emily`, `tyler`, `maria`, `grace`, `patrick`, `duckworth`];
const randomOccupations = [`writer`, `bookkeeper`, `trainer`, `plumber`, `carpenter`, `wizard`, `pilot`, `chef`, `photographer`, `cleaner`];
const randomPrices = [22, 25, 32, 36, 41, 45, 50, 66, 70, 76];

// variable to store displayed prices so we can easily total them later
const freelancerPrices = [];

// helper function to add content directly to list elements of an input id
const addListItem = (content, listId) => {
  // create const for list we are adding to so we can easily modify it
  const listToAppend = document.querySelector(`#${listId}`);
  
  // create a blank new list item element
  let newListItem = document.createElement(`li`);
  
  // update new list item's data
  newListItem.innerText = content;

  // add new list item text element as a child of input id
  listToAppend.appendChild(newListItem);
}


// helper function to pretty up some data
const capitalizeFirstLetter = (string) => {
  // grab only first character in string
  // make it uppercase
  // add on rest of string starting at second character
   return string.charAt(0).toUpperCase() + string.slice(1);
}

// helper function to grab a random number from 0 to 10 which we can use to select an element
// 10 because i put 10 elements in the 'random' arrays
const getRandomElement = () =>{
  return Math.floor(Math.random()*10);
}

// when called will create and return a new object representing a freelancer with a name, occupation and starting price
const generateFreelancer = () => {
  // create a blank new object we can assign keys/values to
  const blankObject = {};
  const mysteryFreelancer = Object.create(blankObject);

  // grab a number 0-10 as the element to use for our attribute data
  // done 3 times to keep freelancers more unique
  mysteryFreelancer.name = randomNames[getRandomElement()];
  mysteryFreelancer.occupation = randomOccupations[getRandomElement()];
  mysteryFreelancer.price = randomPrices[getRandomElement()];

  return mysteryFreelancer;
}


// every time called, this function will add a freelancer to the display and update HTML to actually display it
const addFreelancer = () => {
  // we need to know how many are being displayed so we know who to display next (0 by default)
  const freelancersDisplayed = freelancerPrices.length;

  // make sure we actually have a freelancer to add
  if(freelancersDisplayed < freelancers.length){
    
    // the next freelancer we want is at the index equal to the number of flancers displayed
    const nextFreelancer = freelancers[freelancersDisplayed];

    // use that variable to grab the name, price, and occupation
    // push these data to their respective unordered lists
    console.log(nextFreelancer);
    addListItem(capitalizeFirstLetter(nextFreelancer.name), `freelancerNames`);
    addListItem(capitalizeFirstLetter(nextFreelancer.occupation), `freelancerOccupations`);
    addListItem(nextFreelancer.price, `freelancerPrices`);

    // need to keep track of all prices for total
    freelancerPrices.push(nextFreelancer.price);
    
    // calculate average starting price now that we have changed it
    // loop through all prices in freelancerPrices
    // add them all to a sum which we initialized as 0
    // divide that sum by the total number of elements in freelancerPrices (cant use freelancersDisplayed because we just updated it)
    const averagePrice = freelancerPrices.reduce((sum, currentPrice) => sum + currentPrice, 0) / freelancerPrices.length;
    
    // update average price html (and remove decimals)
    document.querySelector(`#averageStartingPrice`).innerHTML = `$${Math.floor(averagePrice)}`;
  }
}

const render = () => {
  // add a freelancer to our web display and update the average starting price
  addFreelancer();
  
  // generate a random freelancer and add them to our array of freelancers
  freelancers.push(generateFreelancer());
}

// run addFreelancer twice to add the two freelancers that the 'site visitor' from the assignment story saw
addFreelancer();
addFreelancer();

// start our setInterval so that our site continues to add freelancers over time
// every 2.6 seconds run render
setInterval(render, 2600);