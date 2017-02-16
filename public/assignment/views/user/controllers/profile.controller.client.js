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
            vm.user = UserService.findUserById(userId);
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated";
            }
        }
        
        function deleteUser (userId) {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

    }
})();