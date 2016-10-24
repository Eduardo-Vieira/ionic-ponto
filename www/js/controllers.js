angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.matriculaData = {};

  var mat = localStorage.getItem("matricula");

  if(mat) {
      $scope.matriculaData.matricula = mat;
  }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      localStorage.setItem("matricula", $scope.matriculaData.matricula);
    console.log('Doing login', $scope.matriculaData.matricula);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  // Open the login modal
  $scope.logout = function() {
    $state.go('login');
  };
})


.controller('horariosController', function($scope, $ionicModal, $http) {

  var matricula = localStorage.getItem('matricula');

  if(matricula) {
      var mes = "10";
      var ano = "2016";

      var webserver = "http://wrsolucoesinformatica.com/server-ponto.php?";

      var url = webserver + "tx_matricula="    + matricula
                          + "&tx_mes_periodo=" + mes
                          + "&tx_ano_periodo=" + ano
                          + "&trick=1";

      $http.get(url).then(function (response){

          var data = angular.fromJson(response.data);

          $scope.data = data;

          if(data.OK) {
              $scope.matricula = data.id;
              $scope.nome      = data.nome;
              $scope.mes       = data.mes;
              $scope.ano       = data.ano;
              $scope.data      = data.retorno;

          } else {
              $scope.data = data.ERROS[0];
          }
      });
  }
})
