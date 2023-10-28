class AppAccordion extends HTMLElement {
    constructor() {
        super();

        this.innerHTML += `
            <style>
                app-accordion {
                    display: flex;
                    flex-flow: column wrap;
                
                    border: solid 2px currentColor;
                }
                
                app-accordion-item {
                    display: block;
                    padding: 1em;
                
                    max-width: calc(100% - 2em);
                }
                
                app-accordion-item:not(:last-of-type) {
                    border-bottom: 2px solid gray;
                
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }
                
                app-accordion-item > div {
                    display: none;
                    padding: 0 1em;
                }
                
                app-accordion-item:first-child > div {
                    display: block;
                }

                app-accordion-item > p {
                    cursor: pointer;
                }
            </style>
        `;
    }
}

customElements.define('app-accordion', AppAccordion);

class AppAccordionItem extends HTMLElement {
    constructor() {
        super();

        if(this.hasAttribute('title')) this.setTitle(this.getAttribute('title'));
    }

    setTitle(title) {
        if(title)
            this.innerHTML = `<p><strong>${title}</p></strong>${this.innerHTML}`;
        else
            this.innerHTML = `<p><strong></strong></p>`;

        if(this.querySelector('div')) this.setEvent();
    }

    setContent(content) {
        this.innerHTML += `<div>${content}</div>`;

        this.setEvent();
    }

    setEvent() {
        this.querySelector('p').addEventListener('click', () => {
            let contentDiv = this.querySelector('div');
            contentDiv.style.display = 
                (contentDiv.style.display == 'none') ? 'block': 'none';
        });
    }
}

customElements.define('app-accordion-item', AppAccordionItem);