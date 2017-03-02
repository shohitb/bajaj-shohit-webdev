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
            vm.user = UserService.findUserById(userId)
                .success(renderUser);
        }

        init();

        function renderUser(user) {
            vm.user = user;
        }

        function updateUser(newUser) {
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