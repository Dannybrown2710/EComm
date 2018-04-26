//
// Introduction
// Provide a general description of your APIs here.
//
//     LFDItem
// API	Description
// GET api/Items/GetItemNames
// No documentation available.
//
//     GET api/Items
// No documentation available.
//
//     GET api/LFDItem/{id}
// No documentation available.
//
//     POST api/LFDItem
// No documentation available.
//
//     DELETE api/LFDItem/{id}
// No documentation available.
//
//     Account
// API	Description
// GET api/Account/UserInfo
// No documentation available.
//
//     POST api/Account/Logout
// No documentation available.
//
//     GET api/Account/ManageInfo?returnUrl={returnUrl}&generateState={generateState}
//     No documentation available.
//
//     POST api/Account/ChangePassword
// No documentation available.
//
//     POST api/Account/SetPassword
// No documentation available.
//
//     POST api/Account/AddExternalLogin
// No documentation available.
//
//     POST api/Account/RemoveLogin
// No documentation available.
//
//     GET api/Account/ExternalLogin?provider={provider}&error={error}
//     No documentation available.
//
//     GET api/Account/ExternalLogins?returnUrl={returnUrl}&generateState={generateState}
//     No documentation available.
//
//     POST api/Account/Register
// No documentation available.
//
//     POST api/Account/RegisterExternal
// No documentation available.
//
//     Values
// API	Description
// GET api/Values
// No documentation available.
//
//     GET api/Values/{id}
// No documentation available.
//
//     POST api/Values
// No documentation available.
//
//     PUT api/Values/{id}
// No documentation available.
//
//     DELETE api/Values/{id}

const SERVER_API="http://vmedu149.mtacloud.co.il/lessfordress";
const Routes = {
    GET_ITEMS_NAME: '/api/Items/GetItemNames'
};

function getItemNames(){
    //response: [
    //   "sample string 1",
    //   "sample string 2"
    // ]
    return axios.get(`${SERVER_API}${Routes.GET_ITEMS_NAME}`)
}

export const NetworkApi = {
    getItemNames
}