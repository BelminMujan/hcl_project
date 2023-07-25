import store from "../Redux/store";

class Api {
    headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    register(data) {
        return new Promise((resolve, reject) => {
            try {
                fetch(process.env.REACT_APP_API + "/auth/register", {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify(data)
                }).then((res) => {
                    res.json().then(json => {
                        console.log(json);
                        if (json.token && json.user) {
                            localStorage.setItem("token", json.token)
                            store.dispatch({ type: "login_success", payload: json.user })
                            resolve({ goto: "/dashboard" })
                        }
                    })
                }).catch(e => {
                    console.log("Error registering user on server:")
                    console.log(e)
                    reject(e)
                })
            } catch (e) {
                console.log("Error registering user on client:")
                console.log(e)
                reject(e)
            }
        })
    }

    login(data) {
        return new Promise((resolve, reject) => {
            try {
                fetch(process.env.REACT_APP_API + "/auth/login", {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify(data)
                }).then((res) => {
                    res.json().then(json => {
                        console.log(json);
                        if (json.error) {
                            reject({ error: json.error })
                        }
                        if (json.token && json.user) {
                            localStorage.setItem("token", json.token)
                            store.dispatch({ type: "login_success", payload: json.user })
                            resolve({ goto: "/dashboard" })
                        }
                    })
                }).catch(e => {
                    console.log("Error loging in user on server:")
                    console.log(e)
                    reject(e)
                })
            } catch (e) {
                console.log("Error loging in user on client:")
                console.log(e)
                reject(e)
            }
        })
    }
    auto_login() {
        return new Promise((resolve, reject) => {
            try {
                fetch(process.env.REACT_APP_API + "/auth/auto_login", {
                    method: "GET",
                    headers: {
                        ...this.headers,
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }).then((res) => {
                    res.json().then(json => {
                        console.log(json);
                        if (json.error) {
                            reject({ error: json.error })
                        }
                        if (json.token && json.user) {
                            localStorage.setItem("token", json.token)
                            store.dispatch({ type: "login_success", payload: json.user })
                            resolve({ goto: "/dashboard" })
                        }
                    })
                }).catch(e => {
                    console.log("Error loging in user on server:")
                    console.log(e)
                    reject(e)
                })
            } catch (e) {
                console.log("Error loging in user on client:")
                console.log(e)
                reject(e)
            }
        })
    }

    get_jobs(type = null) {
        return new Promise((resolve, reject) => {
            try {
                let path = process.env.REACT_APP_API + "/jobs"
                if (type) {
                    path += "/" + type
                }
                fetch(path, {
                    method: "GET",
                    headers: {
                        ...this.headers,
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }).then((res) => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            console.log(data);
                            resolve(data)
                        })
                    }

                })
            } catch (error) {
                console.log("Error gettig public jobs")
                console.log(error)
                reject(error)
            }
        })
    }

}


export default Api