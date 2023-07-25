

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login_success':
            return { ...action.payload };
        case 'logut':
            return {};
        default:
            return state;
    }
};

export default userReducer;