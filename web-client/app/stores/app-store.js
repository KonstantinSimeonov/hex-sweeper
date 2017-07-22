import { action, observable, autorun } from 'mobx';
import { post as httpPost } from '../utils/json-requester';

@observable
class AppStore {
    @observable username: string = null;
    @observable error: mixed = null;
    @observable token: string = null;
    
    constructor() {
        autorun(() => console.log(this));
    }

    // @flow
    @action login(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            httpPost('http://localhost:6969/api/users', { user: { username, password } });
        })
        .then((token: string) => {
            this.token = token;
            this.username = username;
        })
        .catch(error => {
            this.error = error;
        });
    }
}

export default AppStore;