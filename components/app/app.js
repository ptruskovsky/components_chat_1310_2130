import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

class App {
    constructor({el}) {
        this.el = el;
        this.chat = new Chat();
        this.form = new Form();

        this.render();
    }

    render() {
        this.el.innerHTML = `
            <h3>SPA!</h3>  
        `;
    }
}
