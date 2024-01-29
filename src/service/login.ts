

export default async function Login(username : string, password : string){
    try {
        const data = {
            username : username,
            password : password,
        }
        const req : any = await fetch('http://localhost:3000/api/users/login', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        const res = await req.json();
        res.status = req.status;
        return res;
    } catch (error) {
        console.log(error)
    }
}