export default class Section {
    constructor({data, renderer}, cardSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._cardSelector = cardSelector
    }

    addItem(elem) {
        this._cardSelector.append(elem)
    }

    renderCards() {
        this._initialArray.forEach(element => {
            this._renderer(element)
        });
    }

}


// -- Что получает секшн?
// массив с карточками
// функцию, которую может вызвать из индекса
// селектор с контейнером для карт
// -- Что делает секшн?
// публичный метод, которым отрисовывает все карточки. renderCards()
// метод addItem(elem), который ставит картинку в начало контейнера
