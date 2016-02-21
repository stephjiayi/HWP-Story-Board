var expect = require('chai').expect;
var helpers = require('../app/javascripts/helpers');

describe('makeError', function() {
  var makeError = helpers.makeError;

  it('should throw error', function() {
    expect(makeError.bind(null, 'params', 'something')).to.throw(Error, /something/);
    expect(makeError.bind(null, null, 'something')).to.throw(Error, /something/);
  });
});

describe('template', function() {
  var template = helpers.template;

  it('should replace words', function() {
    var string = 'A simple sentence with {words} to be replaced by {values}';
    var valuesMap = {
      words: 'something',
      values: 'whatever'
    };
    var expectedResult = 'A simple sentence with something to be replaced by whatever';

    expect(template(string, valuesMap)).to.equal(expectedResult);
  });
});

describe('format', function() {
  var format = helpers.format;

  it('should prefix the value', function() {
    expect(format(2, '$')).to.equal('$2');
    expect(format('2', '$')).to.equal('$2');
  });

  it('should suffix the value', function() {
    expect(format(2, '%')).to.equal('2%');
  });
});

describe('setConfigMap', function() {
  var setConfigMap = helpers.setConfigMap;

  it('should config not nested objects', function() {
    var configMap = {
      'a': 1,
      'b': 2
    };
    var inputMap = {
      'a': 3,
      //should be ignored by the function since not present in configMap
      'c': 'whatever'
    };
    var expectedMap = {
      'a': 3,
      'b': 2
    };

    expect(setConfigMap(inputMap, configMap)).to.deep.equal(expectedMap);
  });

  it('should config also nested objects', function() {
    var configMap = {
      'a': 1,
      'b': 2,
      'c': {
        'd': 3
      }
    };
    var inputMap = {
      'a': 3,
      'c': {
        'd': 4
      }
    };
    var expectedMap = {
      'a': 3,
      'b': 2,
      'c': {
        'd': 4
      }
    };

    expect(setConfigMap(inputMap, configMap)).to.deep.equal(expectedMap);
  });
});

describe('toggleArrayItem', function() {
  var toggleArrayItem = helpers.toggleArrayItem;

  it('should add the item if not already contained', function() {
    var item = 'item';

    expect(toggleArrayItem([], item)).to.deep.equal([item]);
  });

  it('should delete the item if already contained', function() {
    var array = [
      {
        id: 1,
        text: 'Hello'
      },
      {
        id: 2,
        text: 'Word'
      }
    ];
    var item = {
      id: 1,
      text: 'Hello changed'
    };
    var expectedArray = [
      {
        id: 2,
        text: 'Word'
      }
    ];

    expect(toggleArrayItem(array, item)).to.deep.equal(expectedArray);
  });
});