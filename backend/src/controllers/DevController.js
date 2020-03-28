const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  async index (req, res) {

    const devs = await Dev.find();

    return res.json(devs)
  },

  async store (req, res) {

    const { github_username, techs, latitude, longitude } = req.body;

    /**
     * Se ja existe o dev com o username do github
     */
    let dev = await Dev.findOne({ github_username });
    
    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = response.data;
    
      /* Caso nome do usuario nao exista, utilizar o login 
      if (!name) {
        name = response.data.login;
      }
      OBS -> Utilizar name = login, deixa como padrao caso nao encontre
      */
    
      const techsToArray = parseStringAsArray(techs);    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsToArray,
        location,
      })
    }
    else {
      return res.json({ message: "Usuario ja existe" })
    }

    return res.json(dev);
  }
};