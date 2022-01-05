import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Application-specific requests

export async function getAllTheaters(){
    return await api.get(host + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');

}

export async function createEvent(theaterEvent){
    return await api.post(host + '/data/theaters/', theaterEvent);
}

export async function getEventById(id){
    return await api.get(host + '/data/theaters/' + id);
}

export async function deleteEvent(id){
    return await api.del(host + '/data/theaters/' + id);
}

export async function updateEvent(id, theaterEvent){
    return await api.put(host + '/data/theaters/' + id, theaterEvent);
}

export async function getMyEvents(){
    const userId = sessionStorage.getItem('userId');

    return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}