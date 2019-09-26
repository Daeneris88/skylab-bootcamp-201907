import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Delete a notification.
 * 
 * @param {string} this.__token__  (the user needs to be logued in) 
 * @param {string} notificationId
 * 
 */

export default function (notificationId) {
    validate.string(this.__token__, 'user id')
    validate.string(notificationId, 'notification id')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/notification/${notificationId}` , 'delete' , { 'authorization': `bearer ${this.__token__}` }, undefined)
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response 
    })()
}