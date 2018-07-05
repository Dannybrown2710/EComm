import format from 'string-template';
import axios from 'axios';
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

const SERVER_API="";

const Routes = {
    GET_USER_ITEMS: '/api/Users/Items/{userId}',
    GET_USER_EVENTS: '/api/Users/Events/{userId}',
    GET_ITEMS_NAMES: '/api/Items/GetItemNames',
    GET_ITEMS: '/api/Items',
    GET_ITEM_DETAILS_BY_ID: '/api/Items/{id}',
    GET_ITEM_OWNER_BY_ID:'/api/ItemOwner/{id}',
    GET_ITEM_OWNER_PHONE_BY_ID: '/api/Items/{itemId}/OwnerPhone',
    POST_ITEM: '/api/postitem',
    ADD_TO_HISTORY:'/api/Users/Watch/{userId}/{itemId}',
    GET_RATINGS:'/api/Users/Rating/{userId}',
    RATE_USER:'/api/Users/RateUser/{raterId}/{ratedId}/{rate}',
    DELETE_ITEM: '/api/LFDItem/{id}',
    SEARCH_ITEM_DETAILS_BY_QUERY:'/api/Items/Search/{query}',
    GET_USERS:'/api/Users',
    GET_USER_INFO: '/api/Account/UserInfo',
    GET_FAVOURITES:'/api/Users/GetFavorites/{userId}',
    GET_USER_DETAILS:'/api/Users/{id}',
    GET_USER_DETAILS_FROM_EMAIL:'/api/Users/MailToDetails/',
    ADD_TO_FAV:'/api/Users/Fav/{userId}/{itemId}',
    REMOVE_FROM_FAV:'/api/Users/RemoveFav/{userId}/{itemId}',
    POST_LOGOUT: '/api/Account/Logout',
    GET_LAST_VIEWED:'/api/Users/GetHistory/{userId}',
    GET_MANAGE_INFO: '/api/Account/ManageInfo?returnUrl={returnUrl}&generateState={generateState}',
    //CHANGE_PASSWORD: '/api/Account/ChangePassword',
    SET_PASSWORD: '/api/Account/SetPassword',
    LOGIN:'/api/Login',
    CHANGE_PHONE:'/api/Users/Update/Phone/{userId}/{phone}',
    CHANGE_NAME :'/api/Users/Update/Name/{userId}/{firstName}/{lastName}',
    CHANGE_PASSWORD:'api/Users/Update/Password/{userId}',
    CHANGE_LOCATION:'/api/Users/Update/Location/{userId}/{country}/{city}/{streetNumber}',
    ADD_EXTERNAL_LOGIN: '/api/Account/AddExternalLogin',
    REMOVE_EXTERNAL_LOGIN: '/api/Account/RemoveLogin',
    EXTERNAL_LOGIN: '/api/Account/ExternalLogin?provider={provider}&error={error}',
    EXTERNAL_LOGINS: '/api/Account/ExternalLogins?returnUrl={returnUrl}&generateState={generateState}',
    REGISTER: '/api/PostUser',
    REGISTER_EXTERNAL: '/api/Account/RegisterExternal',
    GET_EVENTS: '/api/Events',
    POST_EVENT:'/api/PostEvent',
    GET_EVENT_OWNER_BY_ID:'',
    GET_ALL_MY_EVENTS:'/api/Users/EventsHost/{UserID}',
    GET_EVENT_OWNER_PHONE_BY_ID:'/api/Events/OwnerPhone/{eventId}',
    MAKE_ITEM_OWNER:'/api/Users/MakeOwner/{userId}/{itemId}',
    MAKE_EVENT_OWNER:'/api/Events/MakeOwner/{userId}/{eventId}',
    GET_EVENT_BY_ID:'/api/Events/{id}',
    GET_VALUES: '/api/Values',
    GET_VALUE_BY_ID: '/api/Values/{id}',
    POST_VALUES: '/api/Values',
    PUT_VALUE: '/api/Values/{id}',
    DELETE_VALUE: '/api/Values/{id}',
    GET_CATEGORIES: '/api/ItemCategories',
    ATTEND_EVENTS:'/api/Users/Events/{userId}',
    ATTEND_EVENT:'/api/Users/AttendEvent/{userId}/{eventId}',
    UNATTEND_EVENTS:'/api/Users/UNAttendEvent/{userId}/{eventId}'
};

function getItemNames(){
    //response: [
    //   "sample string 1",
    //   "sample string 2"
    // ]
    return axios.get(`${SERVER_API}${Routes.GET_ITEMS_NAMES}`)
}

function getItems(){
    // response: [
    //     {
    //         "Item_ID": 1,
    //         "Item_Name": "sample string 2",
    //         "Item_Price": 3,
    //         "Item_Size": "sample string 4",
    //         "Item_Category": 5,
    //         "Item_Subcategory": 6,
    //         "Item_Location": "sample string 7",
    //         "Item_Condition": "sample string 8",
    //         "Item_Image": "sample string 9",
    //         "Item_Description": "sample string 10"
    //     },
    //     {
    //         "Item_ID": 1,
    //         "Item_Name": "sample string 2",
    //         "Item_Price": 3,
    //         "Item_Size": "sample string 4",
    //         "Item_Category": 5,
    //         "Item_Subcategory": 6,
    //         "Item_Location": "sample string 7",
    //         "Item_Condition": "sample string 8",
    //         "Item_Image": "sample string 9",
    //         "Item_Description": "sample string 10"
    //     }
    // ]
    return axios.get(`${SERVER_API}${Routes.GET_ITEMS}`)
}
function getUserItems(userId){
    return axios.get(`${SERVER_API}${format(Routes.GET_USER_ITEMS, {userId})}`)
}
function getUserEvents(userId){
    return axios.get(`${SERVER_API}${format(Routes.GET_USER_EVENTS, {userId})}`)
}

function getItemDetailsById(id){
// response: {
//     "Item_ID": 1,
//         "Item_Name": "sample string 2",
//         "Item_Price": 3,
//         "Item_Size": "sample string 4",
//         "Item_Category": 5,
//         "Item_Subcategory": 6,
//         "Item_Location": "sample string 7",
//         "Item_Condition": "sample string 8",
//         "Item_Image": "sample string 9",
//         "Item_Description": "sample string 10"
// }

    return axios.get(`${SERVER_API}${format(Routes.GET_ITEM_DETAILS_BY_ID, {id: id})}`)
}
function searchItem(query){
     return axios.get(`${SERVER_API}${format(Routes.SEARCH_ITEM_DETAILS_BY_QUERY, {query: query})}`)
}

function getItemOwnerByItemId(id){
    return axios.get(`${SERVER_API}${format(Routes.GET_ITEM_OWNER_BY_ID, {id: id})}`)
}

function getEventOwnerByEventId(id){
    return axios.get(`${SERVER_API}${format(Routes.GET_EVENT_OWNER_BY_ID, {id: id})}`)
}

function getItemOwnerPhoneByItemId(itemId){
        return axios.get(`${SERVER_API}${format(Routes.GET_ITEM_OWNER_PHONE_BY_ID, {itemId: itemId})}`)
    }
function getEventOwnerPhoneByItemId(eventId){
    return axios.get(`${SERVER_API}${format(Routes.GET_EVENT_OWNER_PHONE_BY_ID, {eventId: eventId})}`)
}
function postItem(itemData){
// request: {
//   "Item_ID": 1,
//   "Item_Name": "sample string 2",
//   "Item_Price": 3,
//   "Item_Size": "sample string 4",
//   "Item_Category": 5,
//   "Item_Subcategory": 6,
//   "Item_Location": "sample string 7",
//   "Item_Condition": "sample string 8",
//   "Item_Image": "sample string 9",
//   "Item_Description": "sample string 10"
// }

    return axios.post(`${SERVER_API}${Routes.POST_ITEM}`, itemData)
}

function deleteItemById(id){
    return axios.delete(`${SERVER_API}${format(Routes.DELETE_ITEM, {id: id})}`)
}

function getUserInfo(){
    // response: {
    //     "Email": "sample string 1",
    //         "HasRegistered": true,
    //         "LoginProvider": "sample string 3"
    // }

    return axios.get(`${SERVER_API}${Routes.GET_USER_INFO}`)
}
function getFavourites(userId){
    return axios.get(`${SERVER_API}${format(Routes.GET_FAVOURITES, {userId: userId})}`)
}
function getAttendingEvents(userId){
    return axios.get(`${SERVER_API}${format(Routes.ATTEND_EVENTS, {userId: userId})}`)
}
function attendEvent(userId,eventId){
    return axios.post(`${SERVER_API}${format(Routes.ATTEND_EVENT, {userId:userId,eventId:eventId})}`); 
}
function unattendEvent(userId,eventId){
    return axios.post(`${SERVER_API}${format(Routes.UNATTEND_EVENTS, {userId:userId,eventId:eventId})}`);
}
function getUserDetails(id){
    return axios.get(`${SERVER_API}${format(Routes.GET_USER_DETAILS, {id: id})}`)
}
function getUserDetailsFromEmail(email){
    return axios.post(`${SERVER_API}${Routes.GET_USER_DETAILS_FROM_EMAIL}`,"\""+email+"\"", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function getAllUsers(){
    return axios.get(`${SERVER_API}${Routes.GET_USERS}`)
}

function login(data){
    return axios.post(`${SERVER_API}${Routes.LOGIN}`,data);
}
function updatePhone(data){
    return axios.post(`${SERVER_API}${format(Routes.CHANGE_PHONE, {userId:data.User_ID,phone:data.User_PhoneNumber})}`);
}
function updateName(data){
    return axios.post(`${SERVER_API}${format(Routes.CHANGE_NAME, {userId:data.User_ID,firstName:data.User_FirstName,lastName:data.User_LastName})}`);
}
function updatePassword(data){
    return axios.post(`${SERVER_API}${format(Routes.CHANGE_PASSWORD, {userId:data.User_ID})}`,{
        User_Password:data.User_Password
    });
}
function updateLocation(data){
    return axios.post(`${SERVER_API}${format(Routes.CHANGE_PHONE, {userId:data.User_ID,country:data.User_Country,city:data.User_City,streetNumber:data.User_StreetNumber })}`);
}

function logout(){
    return axios.post(`${SERVER_API}${Routes.POST_LOGOUT}`);
}

function makeOwner(type,data){
    if(type=="event"){
        return axios.post(`${SERVER_API}${format(Routes.MAKE_EVENT_OWNER, {userId:data.userId,eventId:data.eventId})}`);
    }else{
        return axios.post(`${SERVER_API}${format(Routes.MAKE_ITEM_OWNER, {userId:data.userId,itemId:data.itemId})}`);
    }
}
function addToHistory(userId,itemId){
    return axios.post(`${SERVER_API}${format(Routes.ADD_TO_HISTORY, {userId:userId,itemId:itemId})}`);
}
function rateUser(raterId,ratedId,rate){
    return axios.post(`${SERVER_API}${format(Routes.RATE_USER, {raterId:raterId,ratedId:ratedId,rate:rate})}`)
}

function getHistory(userId){
    return axios.get(`${SERVER_API}${format(Routes.GET_LAST_VIEWED, {userId:userId})}`);
}

function addToFav(type,userId,itemId){
    if(type=="item")
        return axios.post(`${SERVER_API}${format(Routes.ADD_TO_FAV, {userId:userId,itemId:itemId})}`);
}
function deleteItemFromFav(userId,itemId){
    return axios.post(`${SERVER_API}${format(Routes.REMOVE_FROM_FAV, {userId:userId,itemId:itemId})}`);
}
function getManageInfo(returnUrl,generateState ){
    // response: {
    //     "LocalLoginProvider": "sample string 1",
    //         "Email": "sample string 2",
    //         "Logins": [
    //         {
    //             "LoginProvider": "sample string 1",
    //             "ProviderKey": "sample string 2"
    //         },
    //         {
    //             "LoginProvider": "sample string 1",
    //             "ProviderKey": "sample string 2"
    //         }
    //     ],
    //         "ExternalLoginProviders": [
    //         {
    //             "Name": "sample string 1",
    //             "Url": "sample string 2",
    //             "State": "sample string 3"
    //         },
    //         {
    //             "Name": "sample string 1",
    //             "Url": "sample string 2",
    //             "State": "sample string 3"
    //         }
    //     ]
    // }
    return axios.get(`${SERVER_API}${format(Routes.GET_MANAGE_INFO, {
    returnUrl: returnUrl,
    generateState: generateState})})
        }`)
}

function changePassword(oldPassword, newPassword, confirmPassword ){
    // request: {
    //     "OldPassword": "sample string 1",
    //         "NewPassword": "sample string 2",
    //         "ConfirmPassword": "sample string 3"
    // }
    return axios.post(`${SERVER_API}${Routes.GET_MANAGE_INFO}`,{
            OldPassword: oldPassword,
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword
    })
}

function setPassword( newPassword, confirmPassword ){
    // request: {
    //   "NewPassword": "sample string 1",
    //   "ConfirmPassword": "sample string 2"
    // }
    return axios.post(`${SERVER_API}${Routes.SET_PASSWORD}`,{
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword
    })
}

function addExternalLogin(externalAccessToken ){
    // request: {
    //   "ExternalAccessToken": "sample string 1"
    // }
    return axios.post(`${SERVER_API}${Routes.ADD_EXTERNAL_LOGIN}`,{
        ExternalAccessToken:externalAccessToken
    })
}

function removeExternalLogin(loginProvider, providerKey ){
    // request: {
    //   "LoginProvider": "sample string 1",
    //   "ProviderKey": "sample string 2"
    // }
    return axios.post(`${SERVER_API}${Routes.REMOVE_EXTERNAL_LOGIN}`,{
        LoginProvider:loginProvider,
        ProviderKey:providerKey
    })
}

function externalLogin(provider,error ){
    return axios.get(`${SERVER_API}${format(Routes.EXTERNAL_LOGIN, {
        provider: provider,
        error: error})})
        }`)
}

function externalLogins(returnUrl,generateState ){
    return axios.get(`${SERVER_API}${format(Routes.EXTERNAL_LOGINS, {
        returnUrl: returnUrl,
        generateState: generateState})})
        }`)
}

function register(data){
    // request: {
    //     "Email": "sample string 1",
    //         "Password": "sample string 2",
    //         "ConfirmPassword": "sample string 3"
    // }
    return axios.post(`${SERVER_API}${Routes.REGISTER}`,data)
}

function registerExternal(email){
    // request: {
    //     "Email": "sample string 1",
    // }
    return axios.post(`${SERVER_API}${Routes.REGISTER_EXTERNAL}`,{
        Email: email,
    })
}

function getEvents(){
    return axios.get(`${SERVER_API}${Routes.GET_EVENTS}`)
}

function getEventDetailsById(id){
    return axios.get(`${SERVER_API}${format(Routes.GET_EVENT_BY_ID, {
    id: id})}`)
}
function postEvent(data){
    return axios.post(`${SERVER_API}${Routes.POST_EVENT}`,data);
}
function getValues(){
    // response: [
    //     "sample string 1",
    //     "sample string 2"
    // ]
    return axios.get(`${SERVER_API}${Routes.GET_VALUES}`)
}

function getValueById(id){
    // response:
    //      "sample string 1"

    return axios.get(`${SERVER_API}${format(Routes.GET_VALUE_BY_ID, {
    id: id})}`)
}

// function putValueById(id){
//     // request:
//     //      "sample string 1"
//
//     return axios.get(`${SERVER_API}${format(Routes.PUT_VALUE, {
//     id: id})}`)
// }

function deleteValue(id){
    return axios.delete(`${SERVER_API}${format(Routes.DELETE_VALUE, {id: id})}`)
}

function getCategories(){
    return axios.get(`${SERVER_API}${Routes.GET_CATEGORIES}`)
}

export const NetworkApi = {
    getItemNames,
    getItems,
    getItemDetailsById,
    getItemOwnerByItemId,
    getItemOwnerPhoneByItemId,
    postItem,
    getHistory,
    searchItem,
    deleteItemById,
    getUserInfo,
    getUserDetailsFromEmail,
    getAllUsers,
    login,
    logout,
    addToFav,
    addToHistory,
    makeOwner,
    getManageInfo,
    changePassword,
    updatePhone,
    updateName,
    updateLocation,
    updatePassword,
    rateUser,
    setPassword,
    getFavourites,
    deleteItemFromFav,
    addExternalLogin,
    getUserDetails,
    removeExternalLogin,
    externalLogin,
    externalLogins,
    register,
    registerExternal,
    getEvents,
    postEvent,
    getEventDetailsById,
    getEventOwnerPhoneByItemId,
    getValues,
    getValueById,
    deleteValue,
    getCategories,
    getUserItems,
    getAttendingEvents,
    unattendEvent,
    attendEvent
}
