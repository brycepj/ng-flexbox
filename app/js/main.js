angular.module('fb', [])
  .run(function(cache, FlexItem, validators) {
    var registerStorageType = cache.register,
        v = validators;

    registerStorageType('flexItems', v.collection);
    registerStorageType('tourSlide', v.number);
    registerStorageType('flexContainer', v.object);
  })
  .controller('FlexContainerCtrl', function($scope, FlexItem, FlexItemsModel, FlexContainerModel) {
    var items = $scope.items = FlexItemsModel.data,
        container = $scope.container = FlexContainerModel;

    $scope.newItem = newItem;
    $scope.removeItem = removeItem;
    function newItem() {
      var item = FlexItem.make();

      item.index = items.length;
      items.push(item);
      console.log('current items', items);
    }

    function removeItem(idx) {
      items.splice(idx,1);
    }

  })
  .controller('TourCtrl', function($scope){
    $scope.slides = getTour();

    $scope.next = next;
    $scope.previous = previous;
    $scope.current = setCurrent();
    $scope.action = null;

    function getTour(){
      // Make this a service, that return init function or whatever else you need
    }
    function next() {
      // increment current, set action
      // set action
    }
    function previous() {
      // deincrement current
    }
    function setCurrent(){
      // check local storage -- make this a property of Tour Service
      return 0;
    }
  })
  .controller('FlexItemCtrl', function($scope) {
      console.log('scope.items', $scope.items);
    // I need the style object to be added as part of the function that adds items to the list.
  })
  .factory('FlexItem', function(ItemProps) {
    return {
      make: make,
    };

    function make() {
      // eventually figure out how to pass in or configure defaults
      return {
          index: null,
          css: {
            width: ItemProps.make('width', {fixed:'300px', flexy:'0',}),
            height: ItemProps.make('height', {fixed:'300px', flexy:'0',}),
            flexGrow: ItemProps.make('flex-grow', {fixed: null, flexy:'1',}),
            flexShrink: ItemProps.make('flex-shrink', {fixed: null, flexy:'1',}),
            flexBasis: ItemProps.make('flex-basis', {fixed: null, flexy:'1'}, ['auto', 'content']),
            alignSelf: ItemProps.make('align-self', {fixed: null, flexy:'flex-start'}, ['flex-start','flex-end','center','baseline','stretch']),
          },
          isFixedWidth: true,
          editing: false,
          get: get,
        };
    }
    function get (prop) {
      var self = this;
      return self[prop].defaults.fixed;
      // you have left off here I think
    }
  })
  .factory('ItemProps', function() {
    return {
      make: make,
    };

    function make(name, defaults, options, current) {
      return {
        name: mkName(),
        defaults: mkDefaults(),
        options: mkOptions(),
      };

      function mkName() {
        return _.kebabCase(name);
      }
      function mkDefaults() {
        var keys = _.keys(defaults);
        var passes = keys.indexOf('fixed') >= 0 && keys.indexOf('flexy') >= 0;
        if (passes) {
          return defaults;
        }
      }
      function mkOptions() {
        // wrapper to eventually add prefixing
        // or perhaps range validation
        return options;
      }
    }

  })
  .controller('CodeSampleCtrl',function($scope) {
    // you're going to need to use this controller to put formatted code on the scope (maybe not) maybe
    // some skilled templating will do the trick

  })
  .directive('copyCodeSamples', function() {
    // this will listen for a click event on the item and then
    // document.addEventListener('copy', function(e){
    // e.clipboardData.setData('text/plain', 'Hello, world!');
    // e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
    // e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
  })
  .service('TourAction', function(validators) {
    return function(action){
      if (validators.isUrl(action)){
        this.action = 'link';
      }
    };
  })
  // .service('TourSlide', function() {
  //   var svc = this;
  //   return function(text, btnText, btnAction)
  //     svc.text = text;
  //     svc.index = index;
  //     svc.hasBtn = true;
  //     svc.btnText = ''
  //     svc.btnAction = TourAction(btnAction);
  // });
  // .value('TourText', function(){
  //   // return JSON
  // })
  .factory('cache',function(validators){
    // check if browser allows you to cache
    var storedTypes = {names:[]},
        v = validators;

    if (!store.enabled) {
      alert('You should enable something.');
      return;
    }

    return {
      set: set,
      get: get,
      clear: store.clear,
      remove: store.remove,
      register: register,
    };

    function register(name, validator) {
      if (!storedTypes[name] && storedTypes.names.indexOf(name) < 0) {
        storedTypes.names.push(name);
        storedTypes[name] = {
          validator: validator,
        };
      }
    }

    function set(name, value) {
      var key = name,
          hasName = storedTypes[names].indexOf(name) >= 0,
          isValid = storedTypes[name].validator(value);
      if (hasName && isValid) {
        store.set(key,value);
      }
    }
    function get(name) {
      var key = name;
      if (storedTypes.names.indexOf(name) >= 0) {
        return store.get(key);
      }
    }

  })
  .service('FlexItemsModel', function(cache) {
    var svc = this;
    var cached = cache.get('flexItems');

    if (cached) {
      svc.data = cached;
    } else {
      svc.data = [];
    }

  })
  .service('FlexContainerModel', function(cache) {
    var svc = this,
        cached = cache.get('flexContainer');

    if (cached) {
      svc.data = cached;
    } else {
      svc.data = {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
      };
    }
  })
  .factory('validators', function() {
    return {
      isUrl: isUrl,
      collection: isCollection,
      number: _.isNumber,
      object: _.isObject,
    };

    function isUrl(str) {
      var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater

      return pattern.test(str);
    }

    function isCollection(arr) {
      var isArray = _.isArray(arr),
          hasOnlyObjects = _.every(arr, function(val) {
            return _.isObject(obj);
          });

          if (!hasOnlyObjects && arr.length === 0) hasOnlyObjects = true;

      return isArray && hasOnlyObjects;
    }
  })
  .factory('formatCSS', function() {
    return {
      get: get,
    };

    function get(model) {
      console.log('model', model);
    }
  })
  .factory('devLorem', function(devLoremLib) {
    var lib = devLoremLib;
    return {
      get: getDevLorem,
    };

    function getDevLorem(count) {
      var defaultCount = 10,
          words = [],
          used = [];
      if (!count){
        count = defaultCount;
      }
      while(count > -1) {
        var newWord = lib[Math.floor(Math.random() * lib.length)];

        // check to to see if we've used it once already
        if (used.indexOf(newWord) < -1) {
          words.push(newWord);
          count--;
        }
      }
      return words.join(' ');
    }


  })
  .value('devLoremLib', [
      'apple\'s website', 'unobtrusive javascript', 'static', 'brad frost', 'organic', 'mockup', 'whitespace', 'above the fold', 'skeuomorphism', 'always be shipping', 'steve jobs', 'flat design', 'grid', 'net neutrality', 'SOPA', 'code', 'ICANN', 'content strategy', 'content', 'f.lux', 'blue beanie', 'rollover', 'table', 'css zen garden', 'preload', 'gif', 'sprite', 'laura kalbag', 'dev bootcamp', 'cs degree', 'hacker school', 'the picture element', 'W3 Fools', 'W3C', 'ftp', 'deployment strategy', 'python vs ruby', 'jeff atwood', 'stack overflow', 'just build websites', 'wordpress', 'java', 'pycharm', 'web storm', 'foreach', 'addClass', 'slice', 'alex sexton', '80/20 rule', 'float drop', 'bacon ipsum', 'dogmatic', 'promise', 'atomic design', 'shoptalkshow', 'yayQuery', 'javascript jabber', 'vagrant', 'chris coyier', 'flexbox', 'device agnostic', 'breaks in ie6', 'paul irish', 'web standards', 'grok', 'crufty', 'angular', 'MV*', 'addy osmani', 'custom elements', 'paralax', 'performance budget', 'offline first', 'gulp', 'node', 'ie6 countdown', 'progressive enhancement', 'the Industry', 'svg', 'machine code', 'rails', 'django', 'google', 'indexDB', 'webgl', 'ux/ui', 'tim kadlec', 'retina', 'fixed header', 'minimalist', 'QR codes', 'art direction', 'masonry', 'infinite scrolling', 'lazy load', 'mobile navigation toggle', 'api', 'spa', 'ember', 'backbone', 'mvc', 'require', 'the open web', 'server farm', 'bash', 'free as in beer', 'nosql', 'how long does it take to learn javascript', 'gui', 'fortran', 'server-side', 'back-end', 'groovy on grails', 'haskell', 'erlang', 'continuous integration', 'capistrano', 'typescript', 'coffeescript', 'google dart', 'yehuda katz',
  ])
;




