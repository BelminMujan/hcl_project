

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login_success':
            return { ...action.payload };
        case 'logout':
            return {};
        default:
            return state;
    }
};

export default userReducer;