export default ngModule => {

    class StorageService {

        constructor(localStorageService) {
            this.localStorageService = localStorageService;
        }
        guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        getAll(){

            var lsKeys = this.localStorageService.keys(),
                contacts = [];
            angular.forEach(lsKeys, (key) => {
                var value = this.localStorageService.get(key);
                contacts.push({'key': key, 'value': value});
            });
            return contacts;
        }
        add(contact){
            this.localStorageService.set(this.guid(), contact)
            
        }
        update(uuid, contact){
            this.localStorageService.set(uuid, contact)
        }
        remove(uuid){
            this.localStorageService.remove(uuid);
            
        }
        
    }
    StorageService.$inject = ['localStorageService'];
    ngModule.service('StorageService', StorageService)

}
