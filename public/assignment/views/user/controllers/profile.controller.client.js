/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            console.log(userId+"ppppp");
            vm.user = UserService.findUserById(userId)
                .success(renderUser);
        }

        init();

        function renderUser(user) {
            //console.log("haveli");
            console.log(user);
            vm.user = user;
        }

        function updateUser(newUser) {
            console.log("jjjj");
            console.log(newUser);
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

    }
})();