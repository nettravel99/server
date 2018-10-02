// Note: An object is passed in and userName and avatar are are extracted via
// destructuring. In ES6 userName is the same as the passed in variable so does
// not need to be repeated.

const createUser = ({ userName, avatar, password })  => ({
    userName,
    avatar,
    password,

    setUserName(userName) {
        this.userName = userName;
        return this; // this is returned which is same as user - returning the same object instance for method chaining.
    },
    veirfyUser = () => {
        // check if user is valid?
    },

});


const getUser = ({userName, password}) => {
    userName,
    password,


}
