export default ngModule => {

    class ListCtrl {

        constructor($scope, StoragaService, $mdDialog) {
            this.StoragaService = StoragaService;
            this.$scope = $scope;
            this.contacts = StoragaService.getAll();
            this.$mdDialog = $mdDialog;
        }
        addNewContact(ev) {
            this.$mdDialog.show({
                controller: 'ContactCtrl as ctrl',
                templateUrl: './contact/templates/contact.html',
                parent: angular.element(document.body),
                locals: {
                    contact: {}
                },
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: false
            })
                .then((answer) => {
                    var contact = answer[0];
                    this.StoragaService.add(contact);
                    this.contacts = this.StoragaService.getAll();
                });
        }

        editContact(ev, key, contact) {
            this.$mdDialog.show({
                controller: 'ContactCtrl as ctrl',
                locals: {
                    contact: angular.copy(contact)
                },
                templateUrl: './contact/templates/contact.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: false
            }).then((answer) => {
                    var contact = answer[0],
                        remove = answer[1];
                    if (remove) {
                        this.StoragaService.remove(key)
                    } else {
                        this.StoragaService.update(key, contact);
                    }
                this.contacts = this.StoragaService.getAll();
                });
        }
    }
    ListCtrl.$inject = ['$scope', 'StorageService', '$mdDialog'];
    ngModule.controller("ListCtrl", ListCtrl)

}


