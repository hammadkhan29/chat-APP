export const baseUrl = 'http://localhost:8000/api'

export const postRequest = async (url ,body) =>{
    try{
        console.log('body' , body)
        const response = await fetch(url , {
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body
        })
        const data = await response.json()

        if (!response.ok) {
            let message;

            if (data?.message) {
                message = data.message;
            }else{
                message = data
            }
            return {error: true , message}
        }
        return data    
    }catch(error){
        console.log(error)
        return error
    }
}