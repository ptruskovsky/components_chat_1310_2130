export class Chat {
    constructor({ el, data = { messages: [] } }) {
        this.el = el;
        this.data = data;
    }

    render() {
        const messagesHTML = this.data.messages.map(({ text, sender }) => {
            return `
                <li class="chat__message">
                    <span class="chat__title">${sender}</span>
                    <span class="chat__text">${text}</span>
                </li>
            `;
        }).join('');

        this.el.innerHTML = `
            <div class="chat">
                <div class="chat__header"></div>
                <ul class="chat__messages">${messagesHTML}</ul>
            </div>
        `;
    }

    setData(data) {
        Object.assign(this.data, data);
    }
}