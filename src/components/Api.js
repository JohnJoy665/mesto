export default class Api {
    constructor(token, cohortGroupId, url) {
        this._token = token;
        this._cohortGroupId = cohortGroupId;
        this._url = url;
    }

    getCheck(res) {
        return res.ok ? res.json() : new Promise.reject(`Ошибка: ${res.status}`)
    }


    getUserInfo() {
        return fetch(`https://${this._url}/${this._cohortGroupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }


    getCardsList() {
        return fetch(`https://${this._url}/${this._cohortGroupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }


    sendUserInfo(data) {
        return fetch(`https://${this._url}/${this._cohortGroupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['input-name'],
                about: data['input-job']
            })
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }



    sendNewCard(data) {
        // POST https://mesto.nomoreparties.co/v1/cohortId/cards 
        return fetch(`https://${this._url}/${this._cohortGroupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }

    likeCard(cardId) {
        // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
        return fetch(`https://${this._url}/${this._cohortGroupId}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }

    unLikeCard(cardId) {
        // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
        return fetch(`https://${this._url}/${this._cohortGroupId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this.getCheck(res)
            })
    }

    deleteCard(cardId) {
        // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId 
        return fetch(`https://${this._url}/${this._cohortGroupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            return this.getCheck(res)
        })
    }

    newAvatar(url) {
        // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
        return fetch(`https://${this._url}/${this._cohortGroupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        })
        .then((res) => {
            return this.getCheck(res)
        })
    }


}
