let profile_pic = ""
document.getElementById('profile_pic').addEventListener('change',async(e)=>{
    const profile_pic_img = e.target.files[0]
    profile_pic = await convertBase64(profile_pic_img)
    document.getElementById('preview').src = profile_pic;
})

async function signUp(e){

    e.preventDefault()

    let username = document.getElementById('username').value

    let email = document.getElementById('email').value

    let phone = document.getElementById('phone').value

    let password = document.getElementById('password').value

    let c_password = document.getElementById('cpassword').value

    if(password!=c_password){
        alert("Paswords do not match")
        return
    }
    
    let data = {profile_pic,username,email,phone,password}

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

    try{
        const response = await fetch('/api/signUp',options)
        const data = await response.json()
        console.log(data)

        if(response.status===201){
            alert(data.message)
        }
        else{
            alert(data.message)
        }
    }
    catch(err){
        console.log(err)
        alert(data.message)
    }
}

function convertBase64(file){

    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror = ()=>{
            reject(fileReader.error)
        }
    })
}