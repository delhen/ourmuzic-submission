class TrackItem extends HTMLElement{
    set song(song){
        this._song = song;
        this.render();
    }

    render(){
        this.innerHTML = `
        <style>
            .btn-pink-custom{
                background-color: #FD94B3;
                color: white
            }

            .btn-pink-custom:hover{
                background-color: #fab3c9;
                color: white;
                cursor: pointer
            }

            .btn-pink-custom:active{
                background-color: #c45576;
                color: white;
            }
        </style>

        <div>
            <img src="${this._song.track.images.coverart}" alt="Album" class="rounded shadow">
            <h4 class="my-2">${this._song.track.title}</h4>
            <p>${this._song.track.subtitle}</p>
            <button class="btn btn-pink-custom px-3" id="info-btn">Info</button>
        </div>
        `;

        this.querySelector("#info-btn").addEventListener("click", () => {
            window.open(`${this._song.track.share.href}`, "_blank");
        })
    }
}

customElements.define("track-item", TrackItem);