function updateSigninView() {
    // document.querySelector('#newAccountEmailAddress').value = '';
    // document.querySelector('#newAccountPassword').value = '';
    // document.querySelector('#newAccountRepeatPassword').value = ''; 
    // document.querySelector('#existingAccountEmailAddress').value = ''; 
    // document.querySelector('#existingAccountPassword').value = '';
    document.querySelector('form#signinForm').reset();

    const hrefAndAnchor = location.href.split('#');
    
    if(hrefAndAnchor.length === 2) {
        let anchor = hrefAndAnchor[1];
    
        const newAccount = document.querySelector('section#newAccount');
        const existingAccount = document.querySelector('section#existingAccount');

        newAccount.style.display = (anchor.substring(0, 10) === 'newAccount') ? 'flex' : 'none';
        existingAccount.style.display = (anchor.substring(0, 15) === 'existingAccount') ? 'flex' : 'none';
    } else {
        location.replace('/signin#newAccount');
    }
}

updateSigninView();

window.addEventListener('hashchange', updateSigninView);