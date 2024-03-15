/*

The prompt:
  A visitor enters the website and finds a list of available freelancers. Each freelancer has a name, an occupation, and a starting price for their services. They observe on the list Alice, the writer with a starting price of $30, and Bob, who is a teacher, has a starting price of $50.

  The visitor also finds a message that displays the average starting price of all the freelancers. In this example, the average starting price is $40.

  A few seconds later, a new listing appears for a freelancer named Carol, who is a programmer and has a starting price of $70. The average starting price is updated to $50.

  New freelancers continue to appear every few seconds, and the average starting price is updated accordingly



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
  -create up html tags
    -create function(s) to push data to them when necessary
  -use setInterval() to run these functions
  -have a function total up starting prices and divide by number of prices

*/

const freelancers = [
  { name: `Alice`, price: 30, occupation: `writer`},
  { name: `Bob`, price: 50, occupation: `teacher`},
  { name: `Carol`, price: 70, occupation: `programmer`},
  { name: `Dr. Slice`, price: 25, occupation: `gardener` },
  { name: `Dr. Pressure`, price: 51, occupation: `programmer` },
  { name: `Prof. Possibility`, price: 43, occupation: `teacher` },
  { name: `Prof. Prism`, price: 81, occupation: `teacher` },
  { name: `Dr. Impulse`, price: 43, occupation: `teacher` },
  { name: `Prof. Spark`, price: 76, occupation: `programmer` },
  { name: `Dr. Wire`, price: 47, occupation: `teacher` },
  { name: `Prof. Goose`, price: 72, occupation: `driver` },
];

// variable to store displayed prices so we can easily total them later
const freelancerPrices = []

// helper function to add content directly to list elements of an input id
const addListItem = (content, listId) => {
  // create const for list we are adding to so we can easily modify it
  const listToAppend = document.getElementById(listId)
  
  // create a blank new list item element
  let newListItem = document.createElement(`li`)
  
  // update new list item's data
  newListItem.innerText = content

  // add new list item text element as a child of input id
  listToAppend.appendChild(newListItem)
}


// helper function to pretty up some data
const capitalizeFirstLetter = (string) => {
  // grab only first character in string
  // make it uppercase
  // add on rest of string starting at second character
   return string.charAt(0).toUpperCase() + string.slice(1) 
}

// every time called, this function will add a freelancer to the display and update HTML to actually display it
const addFreelancer = () => {
  // we need to know how many are being displayed so we know who to display next (0 by default)
  const freelancersDisplayed = freelancerPrices.length

  // make sure we actually have a freelancer to add
  if(freelancersDisplayed < freelancers.length){
    
    // the next freelancer we want is at the index equal to the number of flancers displayed
    const nextFreelancer = freelancers[freelancersDisplayed]

    // use that variable to grab the name, price, and occupation
    // push these data to their respective unordered lists
    addListItem(nextFreelancer.name, `freelancerNames`)
    addListItem(capitalizeFirstLetter(nextFreelancer.occupation), `freelancerOccupations`)
    addListItem(nextFreelancer.price, `freelancerPrices`)

    // need to keep track of all prices for total
    freelancerPrices.push(nextFreelancer.price)


    // calculate average starting price now that we have changed it
    // loop through all prices in freelancerPrices
    // add them all to a sum which we initialized as 0
    // divide that sum by the total number of elements in freelancerPrices (cant use freelancersDisplayed because we just updated it)
    const averagePrice = freelancerPrices.reduce((sum, currentPrice) => sum + currentPrice, 0) / freelancerPrices.length

    // update average price html
    document.getElementById(`averageStartingPrice`).innerHTML = averagePrice
  }
}

// function that will add freelancers every few seconds automatically
const runInBackground = () => {
  // every 2.6 seconds run addFreelancer
  setInterval(addFreelancer, 2600)
}

// run addFreelancer twice to add the two users that the 'site visitor' from the assignment story saw
addFreelancer()
addFreelancer()

// start our setInterval so that our site continues to add freelancers over time
runInBackground()