class AppBar extends HTMLElement{
    
    connectedCallback(){
        this.src = this.getAttribute("src") || null;
        this.render();
    }

    render(){
        var elements = ``;
        if(this.src){
            elements += `<img src="${this.src}" alt="">`
        }else{
            elements += `LOGO BRAND`;
        }

        this.innerHTML = `
        <style>
            nav{
                font-family: "Montserrat";
            }

            .navbar-brand img{
                width: 70%;
            }

        </style>

        <nav class="navbar navbar-expand-md bg-light shadow navbar-light">
            <a href="#" class="navbar-brand text-center">${elements}</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item text-right"><a href="#" class="nav-link">Home</a></li>
                    <li class="nav-item text-right"><a href="#" class="nav-link">My Music</a></li>
                </ul>
            </div>
        </nav>`
        
    }
}

customElements.define("app-bar", AppBar);