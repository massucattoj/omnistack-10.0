const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index (req, res) {

    const { latitude, longitude, techs } = req.query;

    const techsToArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsToArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    // Buscar todos os devs em um raio de 10km
    // Filtrar por tecnologis
    console.log(techsToArray);

    return res.json({devs})
  }
}