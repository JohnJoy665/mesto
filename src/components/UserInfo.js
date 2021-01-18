export default class UserInfo {
    constructor({personInformation}) {
        this._elemPersonName = personInformation.name
        this._elemPersonProf = personInformation.profession
    }

    getUserInfo() {
        const personInfoName = {
            name: this._elemPersonName.textContent,
            prof:  this._elemPersonProf.textContent
        }
        return personInfoName
    }

    setUserInfo (item) {
        if ((this._elemPersonName.textContent === item['input-name']) && (this._elemPersonProf.textContent === item['input-job'])) {
            return
        } else {
            this._elemPersonName.textContent = item['input-name']
            this._elemPersonProf.textContent = item['input-job']
        }
    }
}