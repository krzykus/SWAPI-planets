const planetHelper = require('../helpers/planet.helper');

const GetByID = (id) => {
    return new Promise((resolve, reject)=>{
        let planetData = planetHelper.getData('https://swapi.co/api/planets/'+id)
    
        planetData.then(planet => {
            let moviePromises = planet["films"].map(movie => {
                return planetHelper.getData(movie);
            })
            Promise.all(moviePromises).then(movies => {
                planet["Films"] = planetHelper.pickMovieData(movies).sort(planetHelper.compareMoviesByDate);
                resolve(planetHelper.pickPlanetData(planet));
            }).catch(err=>{
                reject(err)
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    GetByID
}