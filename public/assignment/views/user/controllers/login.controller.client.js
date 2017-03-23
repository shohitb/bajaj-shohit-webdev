/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
           // console.log(user);
            //console.log(promise);
            promise
                .success(function (user) {
                    var loginUser = user;
                    console.log(user);
                    //console.log(loginUser);
                    if (loginUser != null) {
                        console.log(loginUser);
                        console.log("hello");
                        console.log(loginUser._id);
                        $location.url('/user/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function (err) {
                    vm.error = 'user not found';
                });
        }
    }
})();