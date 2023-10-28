async function viewAccount() {
    const accountsAccordion = document.querySelector('#accountsAccordion');

    try {
        let allAccountsRequest = await fetch(`/API/get-all-accounts`);
        let allAccountsObject = {};

        try {
            allAccountsObject = await allAccountsRequest.json();
        } catch(error) {
            console.log('No accounts');
        }

        if(Object.keys(allAccountsObject).length > 0){
            if(allAccountsObject.BankAccounts.length > 0){
                allAccountsObject.BankAccounts.forEach(bankAccount => {
                    let accordionItem = document.createElement('app-accordion-item');
                    accordionItem.setTitle(`${bankAccount.Name}: ${bankAccount.Currency} ${bankAccount.Balance}`);
                    accordionItem.setContent(`
                        Owned by ${bankAccount.Owner}
                        <br>
                        IBAN: ${bankAccount.IBAN}
                    `);
                    accountsAccordion.appendChild(accordionItem);
    
                    let deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.style.display = 'block';
                    deleteButton.style.marginTop = '0.5em';
                    deleteButton.innerHTML = `Delete account <span class="material-symbols-rounded">delete</span>`;
                    accordionItem.querySelector('div').appendChild(deleteButton);
    
                    deleteButton.addEventListener('click', async () => {
                        let req = await fetch(`/API/delete-account?delIBAN=${bankAccount.IBAN}`, {method: 'POST'});
                        let res = await req.json();

                        if(res.success) {
                            location.replace(`/account?message=Account "${bankAccount.Name}" deleted`);
                        } else {
                            location.replace(`/account?error=Could not delete account "${bankAccount.Name}"`);
                        }
                    });
                });
            } else {
                accountsAccordion.innerHTML += '<app-accordion-item>No accounts found</app-accordion-item>';
            }
        } else {
            accountsAccordion.innerHTML += '<app-accordion-item>No accounts found</app-accordion-item>';
        }
    } catch(error) {
        console.log(error);
        accountsAccordion.innerHTML += '<app-accordion-item>No accounts found</app-accordion-item>';
    }
}

viewAccount();