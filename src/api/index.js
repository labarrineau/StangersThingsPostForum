export const BASE_URL = 'https://strangers-things.herokuapp.com/api/'
export const COHORT = '2104-ECE-RM-WEB-PT/';
export const API_URL = BASE_URL + COHORT;

export const callApi = async ({ url, method, token, body}) => {
    console.log ('callApi:', { url, method, token, body})

    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        };
        

        console.log("api index token :", token)

        if (token){
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        console.log ('api/index.js request URL:', API_URL + url);

        const response = await fetch(API_URL + url, options);
        const data = await response.json();

        console.log('api/index.js data:', data);

        if (data.error){
            throw data.error;
        }
        return data;
    } catch (error){
        console.error('api/index.js Error:', error)
    }
};