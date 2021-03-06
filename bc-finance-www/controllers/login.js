
app.controller('loginCtrl', function($rootScope,$scope, $location, $http, $timeout, public, handle,dialog){
	$scope.user = {};
	$scope.submitted = false;
	$scope.changeCode = function(){//获取验证码
		$scope.pverifyCode = $rootScope.basePath + 'common/getImgVerCode.do?name='+ Math.random();
	};
	$scope.encrypt = function(){//加密密码
		$rootScope.usrCd = $scope.usrCd = $.trim($scope.user.usrCd);
		$scope.usrPwd = $.trim($scope.user.usrPwd);
		$scope.usrPwdMd5 =  hex_md5($scope.usrCd.toLowerCase() + $scope.usrPwd.length + $scope.usrPwd).substring(16) ;
	};
	$scope.loginSumit = function(){//登录
		
		$scope.submitted = true;
		if($scope.loginForm.$valid){
			$scope.encrypt();
		//	$scope.$emit('userNews',true);
		//	var str = handle.get('threeLevel') ? handle.get('threeLevel') : 'bankList';
		//	$location.path('/bankList' + str);

            public.getHttpData({
                url: 'login',
                data: {
                    userName: $scope.usrCd,
                    pwd: $scope.usrPwdMd5,
				},
                success: function(data){
                    $scope.$emit('userNews',data.body);
                //    var str = handle.get('threeLevel') ? handle.get('threeLevel') : 'bankList';
                  //  $location.path('/' + str);
					$location.path('/debtList');
                },
				error: function(data){
                	public.msg(data.head.rm);
				}
            });
		};
		
	};
	$scope.keyLogin = function($event){
		if($event.keyCode == 13) $scope.loginSumit();
	};
	$scope.changeCode();
});