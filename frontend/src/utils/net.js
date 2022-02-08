import axios from 'axios'

const config = {
   apiHost: 'http://localhost:8000'
}

const defaultRequestConfig = {
    baseURL: config.apiHost,
    timeout: config.networkTimeout,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

const uploadRequestConfig = {
    baseURL: config.apiHost,
    timeout: config.networkTimeout,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

const agent = axios.create({ ...defaultRequestConfig })
const uploadAgent = axios.create({ ...uploadRequestConfig })

const downloadAgent = axios.create({
    ...defaultRequestConfig,
    timeout: config.donwloadTimeout,
    headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Type': 'application/json'
    }
})

const appendHeader = axiosConfig => {
    return axiosConfig
}

const errorHandler = error => {
    return Promise.reject(error)
}

agent.interceptors.request.use(appendHeader, errorHandler)
downloadAgent.interceptors.request.use(appendHeader, errorHandler)

const get = (uri, options = {}) => {
    return agent.get(uri, options)
}

const post = (uri, data = {}, config = {}) => {
    return agent.post(uri, data, config)
}

const put = (uri, data = {}, config = {}) => {
    return agent.put(uri, data, config)
}

const patch = (uri, data = {}) => agent.patch(uri, data)

const del = (uri, data = {}, urlPrefix) => {
    return agent.delete(uri, data)
}

const uploadFile = (uri, data = {}) => {
    return uploadAgent.post(uri, data)
}

const downloadFile = (uri, options = {}) => downloadAgent.get(uri, { responseType: 'arraybuffer', ...options })

export { del, get, patch, post, put, downloadFile, uploadFile, appendHeader, config }
