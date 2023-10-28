const hrefAndQueryStr = location.href.split('?');
    
if(hrefAndQueryStr.length >= 2) {
    let queryString = hrefAndQueryStr[1].split('=');
    
    const messageBar = document.querySelector('#messageBar');
    
    if(queryString[0] === 'error') {
        messageBar.innerHTML = decodeURIComponent(queryString[1]);
        messageBar.style.backgroundColor = 'red';
        messageBar.style.color = 'white';
    } else if(queryString[0] === 'message') {
        messageBar.innerHTML = decodeURIComponent(queryString[1]);
        messageBar.style.backgroundColor = 'green';
        messageBar.style.color = 'white';
    }
}