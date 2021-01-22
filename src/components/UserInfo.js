export default class UserInfo {
    constructor({ personInformation }) {
        this._elemPersonName = personInformation.name
        this._elemPersonProf = personInformation.profession
        this._avatar = personInformation.avatar
        this._id
    }

    getUserInfo() {
        const personInfoName = {
            name: this._elemPersonName.textContent,
            job: this._elemPersonProf.textContent,
            avatar: this._avatar.style.backgroundImage,
            id: this._id
        }
        return personInfoName
    }

    setUserInfo(name, job, avatar, id) {
        this._elemPersonName.textContent = name
        this._elemPersonProf.textContent = job
        this._avatar.style.backgroundImage = `url("${avatar}")`
        this._id = id
        }
}
// }