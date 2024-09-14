import { axiosInstance } from "./utils";


export default class API {
    static players = {
        getAll: (query) => {
            const sp = new URLSearchParams(query);
            return req.get(`/PositionData/all?${sp.toString()}`);
        },
        getOne: (pos, id) => req.get(`/PositionData/position/${pos}/id/${id}`)
    }
    static teams = {
        getAll: (query) => {
            const sp = new URLSearchParams(query);
            return req.get(`/Teams/all?${sp.toString()}`);
        },
        getLeaders: () => {
            return req.get('/Teams/leaders')
        }
    }
}

function request(method = "GET") {
    return async (path, data) => axiosInstance(path, {data, method}).then(({ data }) => data);
}

const req = {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE")
}