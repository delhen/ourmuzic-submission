import $ from 'jquery';
import './../components/search-bar.js'
import './../components/track-list.js'
import componentLoader from './load-component.js';

import NotFoundPurple from './../../assets/images/search-engine.png';
import ErrorPic from './../../assets/images/error-internal.png';

const main = () => {

    componentLoader();

    const [searchBarArtist, searchBarTrack] = $("search-bar");
    const [trackList] = $("track-list");

    /* Awal dari Search Artist */
    const artistSearch = () => {
        const artistPlaceholder = $("#searchArtistResult")
        artistPlaceholder.html("");
        const val = searchBarArtist.value;
        
        const options = {
            "async": true,
            "crossDomain": true,
            "url": `https://bing-news-search1.p.rapidapi.com/news/search?count=3&freshness=Week&textFormat=Raw&safeSearch=Off&q=${val}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": "1e51ca9c5fmsh932f38daf736580p1c7117jsn39198e4e8914",
                "x-bingapis-sdk": "true"
            }
        }

        $.ajax(options)
        .done(function(data){
            // console.log(data.value.length)
            if(data.value.length){
                renderResultArtist(data.value);
            }else{
                fallbackResultArtist();
            }
        })
        .fail(function(){
            const artistPlaceholder = $("#searchArtistResult");
            errorInternal(artistPlaceholder);
        })
    }

    const renderResultArtist = (result) => {
        const artistPlaceholder = $("#searchArtistResult")
        artistPlaceholder.html("");
        // console.log(result)
        result.forEach(article => {
            // console.log(article.provider)
            const textHTML = `
            <div class="col-md-4">
                <div class="card mh-100">
                    <div class="card-body text-dark">
                        <h5>${article.name}</h5>
                        <p>${article.description}</p>
                        <small class="text-secondary font-italic">Source: ${article.provider[0].name}</small>
                        <form method="get" target="_blank" action="${article.url}">
                            <button class="btn btn-purple-custom float-right">Visit</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
            artistPlaceholder.append(textHTML);
        })
    }

    const fallbackResultArtist = () => {
        const artistPlaceholder = $("#searchArtistResult")
        artistPlaceholder.html("");
        const textHTML = `
            <div class="col-12 text-center my-4">
                <h2>Oooops Not Found!</h2>
                <img src="${NotFoundPurple}" id="not-found-img">
            </div>
        `;
        artistPlaceholder.append(textHTML);
    }

    searchBarArtist.clickEvent = artistSearch;

    /* Akhir dari Search Artist */


    /* Awal dari Search Track */
    const trackSearch = () => {
        const trackPlaceholder = $("track-list");
        trackPlaceholder.html("");
        let val = searchBarTrack.value;
        while(val.indexOf(" ") != -1){
            val = val.replace(" ", "%20");
        }

        const options = {
            "async": true,
            "crossDomain": true,
            "url": `https://shazam.p.rapidapi.com/search?offset=0&term=${val}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "1e51ca9c5fmsh932f38daf736580p1c7117jsn39198e4e8914"
            }
        }

        $.ajax(options)
        .done(function(data){
            const isEmpty = (Object.keys(data).length === 0 && data.constructor === Object);
            // console.log(Object.keys(data).length === 0 && data.constructor === Object);
            if(!isEmpty){
                // console.log(data.tracks.hits)
                renderResultTrack(data.tracks.hits);
            }else{
                fallbackResultTrack();
            }
        })
        .fail(function(){
            const trackPlaceholder = $("track-list")
            errorInternal(trackPlaceholder);
        })
    }

    const renderResultTrack = (songs) => {
        trackList.songs = songs;
    }

    const fallbackResultTrack = () => {
        trackList.renderError();
    }

    const errorInternal = (placeholder) => {
        const textHTML = `
        <div class="col-12 text-center my-4">
            <h2>Oooops There is an Error</h2>
            <img src="${ErrorPic}" id="not-found-img">
        </div>
        `;

        placeholder.html(textHTML);
    }

    
    searchBarTrack.clickEvent = trackSearch;

    /* Akhir dari Search Track */
}

export default main;