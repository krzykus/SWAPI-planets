const planetService = require('../services/planets.service');
const validNames = {'tatooine':1, 'alderaan':2, 'yavin':3}

  
let GetPlanet = (req, res) => {
    let name = req.params.name;
    if(validatePlanetName(name))
    {
        planetService.GetByID(validNames[name])
            .then(result => res.json(result))
            .catch(err=>{
                console.log(err);
                res.status(500).json({code:500,message:"Internal Error"});
            });

    }
    else
        res.status(404).json({code:404,message:"Not Found"});
  }

const validatePlanetName = (name) => {
    return validNames.hasOwnProperty(name.toLowerCase());
}

module.exports = {
    GetPlanet
}