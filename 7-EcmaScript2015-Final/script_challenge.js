class townArea {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }

}

class park extends townArea {

    constructor(name, buildYear, treeNumber, parkArea){
        super(name, buildYear);
        this.treeNumber = treeNumber;
        this.parkArea = parkArea;
    }

    calculateAge() {
        return new Date().getFullYear() - this.buildYear;
    }

}

class street extends townArea {

    constructor(name, buildYear, streetLength, size = 'normal'){
        super(name, buildYear);
        this.streetLength = streetLength;
        this.size = size;
    }
}


const park1 = new park("park1", 1990, 500, 8);
const park2 = new park("park2", 1998, 900, 18);
const park3 = new park("park3", 2010, 1500, 20);

const parks = [park1, park2, park3];

function printParkReport(parks){
    console.log(`----PARKS REPORT----`);

    let parkAges = parks.map(el => el.calculateAge());

    let averageAge = parkAges.reduce((prev, cur) => prev + cur) / parks.length;
    console.log(`Our ${parks.length} parks have an average age of ${averageAge} years.`);

    for(const park of parks) {
        console.log(`${park.name} Park has a tree density of ${park.treeNumber/park.parkArea} trees per square km`);
        if(park.treeNumber > 1000) {
            console.log(`${park.name} Park has more than 1000 trees.`);
        }
    }
}

printParkReport(parks);

const street1 = new street('street1', 1980, 100, 'tiny');
const street2 = new street('street2', 1990, 350, 'huge');
const street3 = new street('street3', 2010, 500, 'big');
const street4 = new street('street4', 2020, 800);

const streets = [street1, street2, street3, street4];

function printStreetReport(streets) {
    console.log(`----STREETS REPORT----`);
    let totalLength = 0;

    streets.forEach(elm => {
        totalLength += elm.streetLength;
    });

    console.log(`Our ${streets.length} streets has a total length of ${totalLength} km, with an average of ${totalLength/streets.length} km`);

    for(street of streets) {
        console.log(`${street.name} Street, built in ${street.buildYear}, is a ${street.size} street`);
    }

}

printStreetReport(streets);
