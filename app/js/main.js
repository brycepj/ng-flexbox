angular.module('fb', [])
  .run(function(cache, FlexItem, TourSlide) {
    // register models that you want to save in local storage here
    // they will be used later on to check if anything exists in local storage

    var register = cache.register;

    register('flexItems', Array);
    register('tourslide', Number);
    register('flexContainer', Object);

    cache.get('flexItems');
    // check if it's a registered type
    // get store.get('flexItem')
    // check if it's the right type
    // return it
    // register should

  })
  .controller('FlexContainerCtrl', function($scope, FlexItem, FlexItemsModel, FlexContainerModel) {
    var items = $scope.items = FlexItemsModel,
        container = $scope.container = FlexContainerModel;

    $scope.newItem = newItem;
    $scope.removeItem = removeItem;

    function newItem() {
      var idx = container.list.length,
          item = FlexItem(idx);

      container.list.push(item);
    }

    function removeItem(idx) {
      container.list.splice(idx,1);
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
    $scope.onelittlebabyscope = 'this';
  })
  .service('FlexItem', function(ItemProps) {
    // then it will return an object
    return function(custom, idx){
      var obj = this,
          defaults = getProps,
          item = _.assign(obj, defaults);


      if (_.isObject(custom)) {
        item = _.assign(item, custom);
      }

      function getProps(idx) {
        return {
          index: idx,
          css: {
            width: ItemProps('width', {fixed:'300px', flexy:'0',}),
            height: ItemProps('height', {fixed:'300px', flexy:'0',}),
            flex-grow: ItemProps('flex-grow', {fixed: null, flexy:'1',}),
            flex-shrink: ItemProps('flex-shrink', {fixed: null, flexy:'1',}),
            flex-basis: ItemProps('flex-basis', {fixed: null, flexy:,}, ['auto', 'content']),
            align-self: ItemProps('align-self', {fixed: null, flexy:,}, ['flex-start','flex-end','center','baseline','stretch']),
          },
          editing: false,
        }
      }
    }

  })
  .service('ItemProps', function() {
    return function(name, fixflex, options) {
      var obj = this;
      obj.name = name;
      obj.val = _.assign({},fixflex);
      if (options) {
        obj.options = options;
      } else {
        obj.options = null;
      }
      obj.get = getter;
      obj.set = setter;

      return obj;

      function getter(fixflex){
        return obj.val[fixflex];
      }

      function setter(val, fixflex) {
        if (obj.options.indexOf(val) > -1) {
          obj.val[fixflex] = val;
        } else {
          throw Error("The value you're trying to set --" + val + " is not a valid property.");
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
  });
  })
  .service('TourAction', function(validators) {
    return function(action){
      if (validators.isUrl(action)){
        this.action = 'link';
      }
    };
  })
  .service('TourSlide', function() {
    return function(text, btnText, btnAction )
      this.text = text;
      this.index = index;
      this.hasBtn = true;
      this.btnText = ''
      this.btnAction = TourAction(btnAction);
  });
  .value('TourText', function(){
    // return JSON
  })
  .factory('cache',function(){
    // check if browser allows you to cache

    if (!store.enabled) {
      alert('You should enable something.');
      return;
    }

    return {
      set: store.set,
      get: store.get,
      clear: store.clear,
      remove: store.remove,
      register: register,
    };

    function register() {
      // flex items = [{},{}] = flexItems = [];
      // flex container = {} = flexContainer = {}
      // tour location = slide number = tourSlide = number
    }

  })
  .service('FlexItemsModel', function(cache) {
    var svc = this;
    var cached = cache.get('flexItems');

    if (_.isArray(cached.length)) {
      svc.data = cached;
    } else {
      svc.data = [];
    }

  })
  .service('FlexContainerModel', function(cache) {
    var svc = this,
        cached = cache.get('flexContainer');

    if (_.isObject(cached)) {
      svc.data = cached;
    } else {
      svc.data = {
          display: "flex",
          flex-direction: "row",
          flex-wrap: "wrap",
          justify-content: "center",
          align-items: "center",
          align-content: "center"
      };
    }

    // this will check the local storage
    // it will then set the defaults (this is where I can adjust them)
    // it will return an object with Flexcontainer defaults to be set
  })
  .factory('validators', function() {
    return {
      isUrl: isUrl,
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
  })
  .factory('devLorem', function(devLoremLib) {
    var lib = devLoremLib;
    return {
      get: getDevLorem,
    }

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



























