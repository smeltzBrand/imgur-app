const POST_UPLOAD = '3/image'
const GET_IMAGES_PATH = '3/account/me/images'
const CLIENT_ID = '*ToBeObtained';
const ROOT_URL = 'https://api.imgur.com'

import qs from 'qs'
import axios from 'axios'

export default {
  
  //Log in to Imgur through OAuth 2 url
  login() {
    const queryString = {
      client_id: CLIENT_ID,
      response_type: 'token'
    }
    window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`
  },

  fetchImages(token) {
    return axios.get(`${ROOT_URL}/${GET_IMAGES_PATH}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  uploadImages(images, token) {
    return Promise.all(
      images.map(image => {
        let formData = new FormData()
        for (const key in image) {
          formData.append(key, image[key])
        }
        return axios.post(`${ROOT_URL}/${POST_UPLOAD}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      })
    )
  },

}