// https://masai-api-mocker.herokuapp.com/auth/register

class User {
  constructor() {}

  validateUsername(username) {
    return username.includes('@') ? false : true
  }

  validatePassword(password) {
    return password.length < 8 ? false : true
  }

  async signUp(n, e, u, p, m) {
    let isValidated = this.validateUsername(u) && this.validatePassword(p)

    if (isValidated) {
      this.name = n
      this.email = e
      this.username = u
      this.password = p
      this.mobile = m
      // this.description = d

      const register_api =
        `https://masai-api-mocker.herokuapp.com/auth/register`

      const responce = await fetch(register_api, {
        method: 'POST',
        body: JSON.stringify(this),

        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await responce.json()
      console.log('data:', data)
      if(data.error){
        alert(data.message)
      }else{
        alert(data.message)
        // localStorage.setItem('user_info',JSON.stringify(user));
        //  window.location.reload();
     let login_div = document.getElementById('login-form');
     login_div.style.display = "block";
     document.getElementById('register-form').style.display = "none";
     alert ('register successful')
    
      }
    }
  }

  async login (u,p){
    const login_data = {
        username : u,
        password: p
    };

    const login_api = 'https://masai-api-mocker.herokuapp.com/auth/login'

    const log_responce = await fetch(login_api,{
        method: 'POST',
        body: JSON.stringify(login_data),
        headers:{
            'Content-Type': 'application/json', 
        }
    });

    const data = await log_responce.json();
    console.log('data:', data)
      if(data.token){
        login_page();
      }
  }
}

let user = new User();

const Register = ()=> {

    let reg_form =document.getElementById('reg_form');

    const name = reg_form.name.value;
    const email = reg_form.email.value;
    const username= reg_form.username.value;
    const password= reg_form.password.value;
    const mobile = reg_form.mobile.value;
   
   
    // const description = reg_form.description.value;

    user.signUp(name,email,username,password,mobile);
    console.log('user:', user)
   
    
}


const Login = () => {
    const username= document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    user.login(username,password);
}


const login_page = () => {
window.location.href="index.html";
 alert("Login successful")
}


let have_acc=document.getElementById('acc');
have_acc.style.color='blue';

have_acc.onclick = () => {
  let login_div = document.getElementById('login-form');
 login_div.style.display = "block";
 document.getElementById('register-form').style.display = "none";
}

const login_btn = document.getElementById('login_btn');

login_btn.onclick = () => {
  Login();
}