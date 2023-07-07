const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const { API, API_KEY } = process.env;
const { dbFormat, apiFormat } = require("../controllers/controllers");
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/search", async (req, res, next) => {
  const { name } = req.query;
  try {
    const apiDog = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dbDog = await Dog.findAll({
      where: { name: { [Op.iLike]: `${name}%` } },
      include: Temperament,
    });

    const dbValidated = await dbFormat(dbDog);
    const apiValidated = await apiFormat(apiDog);

    const dogPack = await apiValidated.concat(dbValidated);

    if (!name) {
      res.send(dogPack);
    } else {
      const dog = await dogPack.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).send(dog);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/dogs", async (req, res, next) => {
  try {
    const apiDog = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dbDog = await Dog.findAll({ include: Temperament });

    const dbValidated = await dbFormat(dbDog);
    const apiValidated = await apiFormat(apiDog);

    const dogPack = await apiValidated.concat(dbValidated);

    res.json(dogPack);
  } catch (error) {
    next(error);
  }
});

router.post("/dogs", async (req, res) => {
  const { name, minHeight, maxHeight, minWeight, maxWeight, temperament } =
    req.body;
  if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight) {
    return res.status(400).send({ msg: "Falta enviar datos obligatorios" });
  }
  try {
    const dog = await Dog.create(req.body);

    let tempDb = await Temperament.findAll({
      where: { id: temperament },
    });

    await dog.addTemperament(temperament);

    return res.status(201).send({ msg: "Perro creado correctamente" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/temperaments", async (req, res, next) => {
  try {
    const temperaments = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const tempFormat = temperaments.map((t) => t.temperament);
    const singleTemps = tempFormat
      .filter((r) => r != null).flatMap(e=>e.split(', '))

    let finalTemps = singleTemps.reduce((a, e) => {
      if (!a.find((d) => d == e)) a.push(e);
      return a;
    }, []);

    finalTemps = finalTemps.map((t) => {
      return { name: t };
    });

    const allTemps = await Temperament.findAll();

    if (allTemps.length === 0) {
      await Temperament.bulkCreate(finalTemps);
    }
    const temper = await Temperament.findAll();

    res.send(temper);
  } catch (error) {
    next(error);
  }
});

router.get("/dogs/:idRaza", async (req, res, next) => {
  const { idRaza } = req.params;
  if (!idRaza) {
    return res.status(400).send({ msg: "Falta enviar datos obligatorios" });
  }
  try {
    const apiDog = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dbDog = await Dog.findAll({ include: Temperament });

    const dbValidated = await dbFormat(dbDog);
    const apiValidated = await apiFormat(apiDog);

    const dogPack = await dbValidated.concat(apiValidated);

    const dog = dogPack.filter((d) => d.id == idRaza);

    return res.status(200).send(dog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
