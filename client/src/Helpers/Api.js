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
                        if (json.error) {
                            reject({ error: json.error })
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

    request(path, method = "GET", data = null) {
        return new Promise((resolve, reject) => {
            try {
                let requestData = {
                    method: method,
                    headers: {
                        ...this.headers,
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
                if (method === "POST") {
                    requestData["body"] = JSON.stringify(data)
                }
                fetch(process.env.REACT_APP_API + path, requestData).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        res.json().then(data => {
                            resolve(data)
                        })
                    } else {
                        res.json().then(error => {
                            reject(error)
                        })
                    }
                })
            } catch (error) {
                console.log("Error:")
                console.log(error)
                reject(error)
            }
        })
    }

}


export default Api