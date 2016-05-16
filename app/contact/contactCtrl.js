import {countries} from '../countries';


export default ngModule => {

    class ContactCtrl {

        constructor($scope, $mdDialog, contact, CountryService) {
            this.$mdDialog = $mdDialog;
            this.new = angular.equals({}, contact);
            this.contact = contact;
            this.countries = CountryService.getAllCountries();
            this.toolbarTitle = (this.new) ? "Add a new contact" : "Edit a contact";
        }
        save(){
            this.$mdDialog.hide([this.contact, false]);
        }
        cancel(){
            this.$mdDialog.cancel();
        }
        remove(){
            this.$mdDialog.hide([this.contact, true])
        }
    }
    ContactCtrl.$inject = ['$scope', '$mdDialog', "contact", "CountryService"];
    ngModule.controller("ContactCtrl", ContactCtrl)

}



