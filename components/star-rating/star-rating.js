(function() {
    'use strict';

    const STARS_AMOUNT = 10;

    class Widget {
        constructor({el, data, events = {}}) {
            this.el = el;
            this.data = data;
            this.events = events;

            this._initEvents();
        }

        render() {
            this.el = this._getHtml();
        }

        setData(data) {
            Object.assign(this.data, data);
        }

        _initEvents() {
            Object.keys(this.events).forEach((eventName) => {
                this.el.addEventListener(eventName, this[this.events[eventName]].bind(this));
            });
        }

        _getHtml() {
            throw new Error('Метод _getHtml должен быть переопределен!');
        }
    }

    class StarRatingClass extends Widget {
        constructor({el, data = {value: 1}}) {
            super({el, data}); // Widget.apply(this);
            this.firstRender = true;

            this.events = {
                'change': 'onChange'
            };

            this._initEvents();
        }

        render() {
            console.time('renderStars');
            if (this.firstRender) {
                this.renderStars();
            }
            console.timeEnd('renderStars');

            if (this.data.value) {
                console.time('DOMrender');
                const currentEl = this.el.querySelector('.star-rating__ico_animation');

                if (currentEl) {
                    currentEl.classList.remove('star-rating__ico_animation');
                }

                this.el.querySelector(`#star-rating-${this.data.value}`).checked = true;
                this.el.querySelector(`[for="star-rating-${this.data.value}"]`)
                    .classList
                    .add('star-rating__ico_animation');
                this.el.querySelector('.js-feedback-range').textContent = this.data.value;
                console.timeEnd('DOMrender');
            }
        }

        renderStars() {
            this.el.innerHTML = `
                <div class="star-rating">
                    <div class="star-rating__wrap">
                        ${StarRatingClass.getStarsHtml(STARS_AMOUNT, this.data.value)}
                    </div>
                    <div class="star-rating__range js-feedback-range">${this.data.value}</div>
                </div>
            `;

            this.firstRender = false;
        }

        onChange(event) {
            console.log(event);
            let {value} = event.target;
            this.setData({value});
            this.render();
        }

        static getStarsHtml(amount) {
            let html = '';

            for (let i = amount; i > 0; i -= 1) {
                html += `
                        <input class="star-rating__input" id="star-rating-${i}" type="radio" name="range" value="${i}">
                        <label class="star-rating__ico" for="star-rating-${i}" data-name="range">
                            <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g class="svg-star">
                                    <path class="svg-star__body" d="M23.251,14.5547367 C23.371,14.2504935 23.686,14 24,14 C24.314,14 24.629,14.2504935 24.749,14.5547367 L24.749,14.5547367 L26.671,19.0707193 L31.2,19.0707193 C31.6,19.0707193 32,19.4763769 32,19.8820344 C32,20.1112309 31.872,20.3414416 31.688,20.4976198 L31.688,20.4976198 C29.788,22.1202499 28.2,23.7357811 28.2,23.7357811 C28.2,23.7357811 28.94,26.4861393 29.54,28.817656 C29.683,29.2861905 29.563,29.7344421 29.1,29.9220587 C28.798,30.0447701 28.497,30.0194165 28.261,29.8683091 C28.259,29.8672949 28.256,29.8652666 28.254,29.8642525 C26.615,28.7882459 24.926,27.6726876 24,27.0489891 C23.074,27.6726876 21.385,28.7882459 19.746,29.8642525 C19.744,29.8652666 19.741,29.8672949 19.739,29.8683091 C19.503,30.0194165 19.202,30.0447701 18.9,29.9220587 C18.437,29.7344421 18.317,29.2861905 18.46,28.817656 C19.06,26.4861393 19.8,23.7357811 19.8,23.7357811 C19.8,23.7357811 18.212,22.1202499 16.312,20.4976198 L16.312,20.4976198 C16.128,20.3414416 16,20.1112309 16,19.8820344 C16,19.3749625 16.4,19.0707193 16.8,19.0707193 L21.329,19.0707193 L23.251,14.5547367 L23.251,14.5547367 L23.251,14.5547367 Z"></path>
                                    <path class="svg-star__light svg-star__light_1" opacity="0" d="M19.5961941,16.5961941 C20.1819805,16.0104076 19.865398,14.7440777 18.8890873,13.767767 C17.9127766,12.7914562 16.6464466,12.4748737 16.0606602,13.0606602 C15.4748737,13.6464466 15.7914562,14.9127766 16.767767,15.8890873 C17.7440777,16.865398 19.0104076,17.1819805 19.5961941,16.5961941 Z"></path>
                                    <path class="svg-star__light svg-star__light_2" opacity="0" d="M28.0606602,16.5961941 C28.6464466,17.1819805 29.9127766,16.865398 30.8890873,15.8890873 C31.2000439,15.5781307 31.4440754,15.2377536 31.6133423,14.8993148 C31.9755228,14.1751568 31.9954066,13.4598727 31.5961941,13.0606602 C31.0104076,12.4748737 29.7440777,12.7914562 28.767767,13.767767 C27.7914562,14.7440777 27.4748737,16.0104076 28.0606602,16.5961941 Z"></path>
                                    <path class="svg-star__light svg-star__light_3" opacity="0" d="M31.3882286,25.4488887 C31.1738159,26.2490879 32.0811493,27.1874706 33.4148146,27.5448251 C34.7484798,27.9021796 36.003445,27.5431831 36.2178577,26.742984 C36.4322704,25.9427848 35.524937,25.0044021 34.1912717,24.6470476 C32.8576064,24.2896931 31.6026413,24.6486896 31.3882286,25.4488887 Z"></path>
                                    <path class="svg-star__light svg-star__light_4" opacity="0" d="M24,30 C23.1715729,30 22.5,31.1192881 22.5,32.5 C22.5,33.8807119 23.1715729,35 24,35 C24.8284271,35 25.5,33.8807119 25.5,32.5 C25.5,31.1192881 24.8284271,30 24,30 Z"></path>
                                    <path class="svg-star__light svg-star__light_5" opacity="0" d="M17.2178577,25.4488887 C17.003445,24.6486896 15.7484798,24.2896931 14.4148146,24.6470476 C13.0811493,25.0044021 12.1738159,25.9427848 12.3882286,26.742984 C12.6026413,27.5431831 13.8576064,27.9021796 15.1912717,27.5448251 C16.524937,27.1874706 17.4322704,26.2490879 17.2178577,25.4488887 Z"></path>
                                </g>
                            </svg>
                        </label>
                            `;
            }

            return html;
        }
    }

    // export
    window.StarRating = StarRatingClass;
})();
