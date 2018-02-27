"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var townArea = function townArea(name, buildYear) {
    _classCallCheck(this, townArea);

    this.name = name;
    this.buildYear = buildYear;
};

var park = function (_townArea) {
    _inherits(park, _townArea);

    function park(name, buildYear, treeNumber, parkArea) {
        _classCallCheck(this, park);

        var _this = _possibleConstructorReturn(this, (park.__proto__ || Object.getPrototypeOf(park)).call(this, name, buildYear));

        _this.treeNumber = treeNumber;
        _this.parkArea = parkArea;
        return _this;
    }

    _createClass(park, [{
        key: "calculateAge",
        value: function calculateAge() {
            return new Date().getFullYear() - this.buildYear;
        }
    }]);

    return park;
}(townArea);

var street = function (_townArea2) {
    _inherits(street, _townArea2);

    function street(name, buildYear, streetLength) {
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';

        _classCallCheck(this, street);

        var _this2 = _possibleConstructorReturn(this, (street.__proto__ || Object.getPrototypeOf(street)).call(this, name, buildYear));

        _this2.streetLength = streetLength;
        _this2.size = size;
        return _this2;
    }

    return street;
}(townArea);

var park1 = new park("park1", 1990, 500, 8);
var park2 = new park("park2", 1998, 900, 18);
var park3 = new park("park3", 2010, 1500, 20);

var parks = [park1, park2, park3];

function printParkReport(parks) {
    console.log("----PARKS REPORT----");

    var parkAges = parks.map(function (el) {
        return el.calculateAge();
    });

    var averageAge = parkAges.reduce(function (prev, cur) {
            return prev + cur;
        }) / parks.length;
    console.log("Our " + parks.length + " parks have an average age of " + averageAge + " years.");

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = parks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _park = _step.value;

            console.log(_park.name + " Park has a tree density of " + _park.treeNumber / _park.parkArea + " trees per square km");
            if (_park.treeNumber > 1000) {
                console.log(_park.name + " Park has more than 1000 trees.");
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

printParkReport(parks);

var street1 = new street('street1', 1980, 100, 'tiny');
var street2 = new street('street2', 1990, 350, 'huge');
var street3 = new street('street3', 2010, 500, 'big');
var street4 = new street('street4', 2020, 800);

var streets = [street1, street2, street3, street4];

function printStreetReport(streets) {
    console.log("----STREETS REPORT----");
    var totalLength = 0;

    streets.forEach(function (elm) {
        totalLength += elm.streetLength;
    });

    console.log("Our " + streets.length + " streets has a total length of " + totalLength + " km, with an average of " + totalLength / streets.length + " km");

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = streets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            street = _step2.value;

            console.log(street.name + " Street, built in " + street.buildYear + ", is a " + street.size + " street");
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

printStreetReport(streets);
