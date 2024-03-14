/*
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
  -get document model from js to display neatly organized info in sections/divs in html
  -use setInterval() to update what info is displayed
  -have a function total up starting prices and divide by number

*/

const freelancers = [
  { name: "Alice", price: 30, occupation: "writer"},
  { name: "Bob", price: 50, occupation: "teacher"},
  { name: "Carol", price: 70, occupation: "programmer"},
  { name: "Dr. Slice", price: 25, occupation: "gardener" },
  { name: "Dr. Pressure", price: 51, occupation: "programmer" },
  { name: "Prof. Possibility", price: 43, occupation: "teacher" },
  { name: "Prof. Prism", price: 81, occupation: "teacher" },
  { name: "Dr. Impulse", price: 43, occupation: "teacher" },
  { name: "Prof. Spark", price: 76, occupation: "programmer" },
  { name: "Dr. Wire", price: 47, occupation: "teacher" },
  { name: "Prof. Goose", price: 72, occupation: "driver" },
];

const freelancerNames = []
const freelancerPrices = []
const freelancerOccupations = []

// document.getElementById("freelancerName").innerHTML = freelancerNames


// every time called, this function will add a freelancer to the display and update HTML to actually display it
const addFreelancer = () => {
  // we need to know how many are out there so we know who to grab
  const numberListedAlready = freelancerNames.length

  // make sure we actually have a freelancer to add
  if(numberListedAlready < freelancers.length){
    // grab them now to make things easier
    const nextFreelancer = freelancers[numberListedAlready]

    // use that variable to grab the name, price, and occupation
    // push these data to their respective display arrays
    freelancerNames.push(nextFreelancer.name)
    freelancerPrices.push(nextFreelancer.price)
    freelancerOccupations.push(nextFreelancer.occupation)

    // calculate average starting price
    const averagePrice = freelancerPrices.reduce((sum, currentPrice) => sum + currentPrice, 0) / freelancerPrices.length

    // update HTML with display arrays
    document.getElementById("freelancerName").innerHTML = freelancerNames
    document.getElementById("freelancerOccupation").innerHTML = freelancerOccupations
    document.getElementById("freelancerPrice").innerHTML = freelancerPrices
    document.getElementById("averageStartingPrice").innerHTML = averagePrice

  }
}

// function that will add freelancers every few seconds automatically
const runInBackground = () => {
  setInterval(addFreelancer, 2000)
}

const calculateAverageStartingPrice = (arrayOfPrices) => {
  freelancerPrices.reduce((sum, currentPrice) => sum + currentPrice, 0) / freelancerPrices.length
}

// run twice to add the two users that the 'site visitor' from assignment story saw
addFreelancer()
addFreelancer()

runInBackground()