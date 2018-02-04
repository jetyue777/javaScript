/*
    Structuring our code with Modules

    1) Important aspect of any robust application's architecture
    2) Keep the units of code for a project both cleanly separated and organized
    3) Encapsulate some Data into privacy and expose other data publicly


    What modules should we have in our project?

    1) UI/Interface module
    2) Data module
    3) Controller (control the app and act as a link between the other two modules)

    (modal view controller)

    Implementing the module pattern:

    Why do we want to use module for a project?
    1) we want to keep code that are related to one another together,
        inside of separate, independent and organized unit
    2) In each of these modules, we will have variables and functions
        that are private, which means that they are only accessible inside
        the module
    3) Also have public methods, so other functions and modules can access
        and use them.
    4) (data encapsulation) allows us to hide the implementation detail of
        a specific module from the outside scope so that we only expose a
        public interface which is called API


    # How to create modules in JavaScript?

    We use module pattern. (utilize Closure and IIFE)


 */


// Module
// BUDGET CONTROLLER
// IFFE that returns an Object
// IFFE creates a new scope that is not visible from the outside scope
// Secrete of Module pattern is that we return an Object that contains
    //all the functions that we want public
var budgetController = (function() {

    //Function Constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    //inheritance
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    //Function Constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // like Private function, used in the public API
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    // Private data structure
    // is better than separate variables
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    // Secrete of Module pattern is that we return an Object that contains
    // all the functions that we want public
    return {

        //The followings are like public functions (public API)
        // Public functions can use inner/private variables or methods
            //even after the outer IIFE function has already executed
            //Thanks to the power of closures
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        
        
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
            
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
        
        calculatePercentages: function() {
            
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        
        getBudget: function() {
            return {

                //able to access internal data variable due to closure
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();




// UI CONTROLLER
// Does not communicate with BudgetController directly
// separation of concern - each part of the application should
// only be interested in doing one thing independently
// Need another controller to connect these two modules together
// eg. Read Data from the UI module and and add Data as an expense into
// the budge module ( create global app controller )
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
    
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    
    return {
        getInput: function() {
            return {

                // able to write expressions here in the object :D
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        
        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            // Technique for adding big chunks of HTML into the DOM
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                //copy HTML template form HTML file to here, wrap inside single quote, then remove white space
                //in between. Use placeholders here for actual data (eg. %id%, % is custom)
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            //'beforeend' is the position we want to use (check documentation for reference)
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        
        clearFields: function() {
            var fields, fieldsArr;
            //querySelectorAll returns a list, not an array
            // directly selects HTML element !!! DOM
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //convert list into array
            //fields is not an array, can not call fields.slice()
            //need to use Array Function Constructor to trigger the call
            // all Array methods we inherit are inside the Array prototype property
            fieldsArr = Array.prototype.slice.call(fields);

            //pass call back function to each element inside the array
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            //WTH? how does this code work???
            //modify directly on DOM!!
            fieldsArr[0].focus();
        },
        
        
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current, index) {
                
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
            
        },
        
        
        displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();




/*GLOBAL APP CONTROLLER

    Need another controller to connect these two modules together
    eg. Read Data from the UI module and and add Data as an expense into
    the budge module ( create global app controller )

    IMPORTANT!!
    Modules are just function expressions. So we can pass in arguments
    into modules.
*/

//pass the other two modules into it so it knows the other two and can connect them
var controller = (function(budgetCtrl, UICtrl) {

    //not a good practice!!
    // Makes controller less independent. eg, renaming budgeController
    // budgetController.calculateBudget();

    //Set up event listener here to delegate event to other controllers
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        //first select an element, then attach the eventListener
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        //keypress event for return key
        document.querySelector(DOM.inputValue).addEventListener('keypress', function(event) {

            //function here can receive an event argument
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);        
    };
    
    
    var updateBudget = function() {
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();        
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
            
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };
    
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
    
    
    return {
        /*
            How and why to create an initialization function?

            1) organize controller a bit better, should only have functions here
                call setupEventListeners to initialize the controller
            2)

         */
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });

            //need to call this function by putting inside the init function.
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);


/*
                                            ##NEW CONCEPT##
        EVENT Delegation: very important

            Event Bubbling:
            - when an event is fired or triggered on some DOM element, then
                the exact same event is also triggered on all of the parent
                elements. one at a time all the way up in a DOM tree

            Target Element: (the delete button in our example)
            - The element that caused the event to happen.
            - All parents knows the target element of the event.
                where the event was first fired.

            Event Delegation:
            (not to setup event handler on the original element that we are interested in)
            (event bubbles up the DOM tree and we know where the event was fired)
            Then we can simply attach an event Handler to the parent element and wait
            for the event to bubble up, then do whatever to the target element.


            WHY do we want to use Event Delegation???
            - When we have an element with lots of child elements that we are interested in.
                Instead of adding an event handler to all these child elements, we simply
                add it to the parent element, and then determine on which child element
                the event was fired.
            - When we want an event handler attached to an element that is not yet in the
                DOm when our page is loaded. We can not add an event handler to something
                that is not in our page.


            In our example, we can add event handler to the main element



 */



// without this line of code, nothing will going to happen
controller.init();