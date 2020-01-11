function login(){
    document.querySelector('.login').classList.remove('d-none');
    document.querySelector('.intro').classList.add('d-none');
    document.querySelector('.Register').classList.add('d-none');
    document.querySelector('.register-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.home-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.login-nav').style.borderBottom = '2px solid #ffc107';
    document.querySelector('.lgerror').innerHTML = '';
}
function signup(){
    document.querySelector('.intro').classList.add('d-none');
    document.querySelector('.login').classList.add('d-none');
    document.querySelector('.Register').classList.remove('d-none');
    document.querySelector('.register-nav').style.borderBottom = '2px solid #ffc107';
    document.querySelector('.login-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.home-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.error').innerHTML = '';
}
function home(){
    document.querySelector('.login').classList.add('d-none');
    document.querySelector('.intro').classList.remove('d-none');
    document.querySelector('.Register').classList.add('d-none');
    document.querySelector('.register-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.login-nav').style.borderBottom = '0px solid #ffc107';
    document.querySelector('.home-nav').style.borderBottom = '2px solid #ffc107';
}
function genSlip()
{
    document.querySelector('.components').classList.add('d-none');
    document.querySelector('.slip').classList.remove('d-none');
}
