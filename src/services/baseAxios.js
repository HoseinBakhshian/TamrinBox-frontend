import axios from "axios";

export const mainAxios= axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
    timeoutErrorMessage: "error az samte server"

})