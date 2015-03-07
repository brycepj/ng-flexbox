angular.module('fb', [])
  .controller('FlexContainerCtrl', function($scope) {
    $scope.css = getContainerCSS(); 
    $scope.items = getFlexItems();
    $scope.defaults = getDefaultItemProps();
    
    $scope.newItem = newItem;
    $scope.removeItem = removeItem;
    function newItem(props) {
      // add new item to the end
    }

    function removeItem(arguments) {
      // body...
    }

    function getContainerCSS() {
      // check local storage
      // get props based on default
      // Make this a service
      return {
        tester: 'This is most certainly not a test'
      };
    }

    function getFlexItems() {
      // check local storage
      // return FlexContainer (object with properties and methods)
      // Make this a service

      return [];
    }

  })
  .controller('SpecTourCtrl', function($scope){
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
    $scope.oneittlebabyscope = 'this';
  })
  .service('FlexItem', function(ItemDefaults) {
    return function(){

    }
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
  });



























