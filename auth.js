
//signup
const site = document.getElementById('siteSignUp');
site.addEventListener('submit', (e) => {
    //preventing default refresh
    e.preventDefault();

    //get user info
    const siteName = site['sitename'].value;
    const email = site['email'].value;
    const password = site['password'].value;
    const devId = site['devId'].value;
    console.log(email);
    //console.log(siteName+'\n'+devId+'\n'+password);

    //signup the user using firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            //  console.log(cred.user.uid);
            document.querySelector('.Register').classList.add('d-none');
            document.querySelector('.con-reg').classList.remove('d-none');
            setTimeout((time) => {
                site.reset();
                auth.signOut().then(() => {
                    document.querySelector('.login').classList.remove('d-none');
                    document.querySelector('.intro').classList.add('d-none');
                    document.querySelector('.Register').classList.add('d-none');
                    document.querySelector('.con-reg').classList.add('d-none');
                    document.querySelector('.register-nav').style.borderBottom = '0px solid #ffc107';
                    document.querySelector('.home-nav').style.borderBottom = '0px solid #ffc107';
                    document.querySelector('.login-nav').style.borderBottom = '2px solid #ffc107';
                    db.collection('UserProfile').add({
                        uid: cred.user.uid,
                        siteName: siteName,
                        deviceId: devId
                    });
                })
            }, 2000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            document.querySelector('.error').innerHTML = `OPPS! ${errorMessage}`;

        });
});

//login users
const Login = document.querySelector('#login-form');
Login.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const lg_email = Login['login_email'].value;
    const lg_pass = Login['login_password'].value;

    auth.signInWithEmailAndPassword(lg_email, lg_pass)
        .then((cred) => {
            document.querySelector('.login').classList.add('d-none');
            document.querySelector('.con-log').classList.remove('d-none');
            document.querySelector('.lgerror').innerHTML = '';
            Login.reset();
            setTimeout((time) => {
                auth.onAuthStateChanged(function (user) {
                    if (user) {
                        window.location.assign('user.html');
                    }
                })
            }, 2000);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            document.querySelector('.lgerror').innerHTML = `OPPS! ${errorMessage}`;
        });
});
