const axios = require("axios");
const cache = require('memory-cache');
const cacheTimeout = 1800000 // 30 minutes

const pickPlanetData = planet => {
    return {
        "Climate":planet["climate"],
        "Population":parseInt(planet["population"]),
        "Films":planet["Films"]
    };
}

const pickMovieData = movies => {
    return movies.map(x => ({
        "Title":x["title"],
        "Director":x["director"],
        "ReleaseDate":x["release_date"]
    }));
}

const compareMoviesByDate = (a, b) => {
    var d1 = Date.parse(a.ReleaseDate);
    var d2 = Date.parse(b.ReleaseDate);
    if (d1 > d2) return -1;
    if (d2 > d1) return 1;//More recent movie should go first.
    return 0;
  }

//Try to read from cache if not then call the endpoint
const getData = url => {
    return new Promise((resolve,reject) => {
        let cachedData = cache.get(url)
        if(cachedData)
            resolve(cachedData)
        else
        {
            callURL(url).then(result=>{
                if(result.callError)
                {
                    reject(new Error(result.err))
                }
                else
                {
                    resolve(result.data);
                }
            })
        }
    })
};


//Retrieves the data from URL and puts the response in cache
const callURL = async url => {
    try {
        let response = await axios.get(url);
        let data = response.data;
        cache.put(url,data,cacheTimeout);
        return {data,callError:false};
    } catch (err) {
        return {err, callError: true};
        //console.log(error);
        //reject(error);
    }
};

module.exports = {
    pickPlanetData,
    pickMovieData,
    compareMoviesByDate,
    getData
};