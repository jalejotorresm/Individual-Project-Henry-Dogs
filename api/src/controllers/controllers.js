module.exports = {
  dbFormat: async function (dbDog) {
    const formattedDb = dbDog.map((dog) => {
      return {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        minWeight: dog.minWeight,
        maxWeight: dog.maxWeight,
        minHeight: dog.minHeight,
        maxHeight: dog.maxHeight,
        minLifeSpan: dog.minLifeSpan,
        maxLifeSpan: dog.maxLifeSpan,
        temperament: dog.temperaments,
        dbNative: dog.dbNative,
      };
    });

    const dbValidated = formattedDb.map((d) => {
      if (!d.image) {
        d.image =
          "https://images.pexels.com/photos/14806288/pexels-photo-14806288.jpeg";
      }
      if (Array.isArray(d.temperament)) {
        d.temperament = d.temperament.map((t) => t.name);
        d.temperament = d.temperament.join(", ");
      }
      return d;
    });
    return dbValidated;
  },

  apiFormat: async function (apiDog) {
    const formattedApi = apiDog.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        minWeight: dog.weight.metric.slice(0, 2).trim(),
        maxWeight: dog.weight.metric.slice(-2).trim(),
        minHeight: dog.height.metric.slice(0, 2).trim(),
        maxHeight: dog.height.metric.slice(4).trim(),
        minLifeSpan: dog.life_span.slice(0, 2).trim(),
        maxLifeSpan: dog.life_span.slice(4, -6).trim(),
        temperament: dog.temperament,
      };
    });

    const apiValidated = await formattedApi.map((d) => {
      if (
        !d.minWeight ||
        d.minWeight === "Na" ||
        d.minWeight === "NaN" ||
        d.minWeight === "aN"
      ) {
        if (
          !d.maxWeight ||
          d.maxWeight === "Na" ||
          d.maxWeight === "NaN" ||
          d.maxWeight === "aN"
        ) {
          d.minWeight = "8";
        } else {
          d.minWeight = (d.maxWeight - 2).toString();
        }
      }

      if (
        !d.maxWeight ||
        d.maxWeight === "Na" ||
        d.maxWeight === "NaN" ||
        d.maxWeight === "aN"
      ) {
        if (
          !d.minWeight ||
          d.minWeight === "Na" ||
          d.minWeight === "NaN" ||
          d.minWeight === "aN"
        ) {
          d.maxWeight = "12";
        } else {
          d.maxWeight = (parseInt(d.minWeight) + 7).toString();
        }
      }

      if (!d.maxHeight) {
        if (!d.minHeight) {
          d.maxHeight = "42";
        } else {
          d.maxHeight = (parseInt(d.minHeight) + 3).toString();
        }
      }

      if (!d.maxLifeSpan) {
        if (!d.minLifeSpan) {
          d.maxLifeSpan = "19";
        } else {
          d.maxLifeSpan = (parseInt(d.minLifeSpan) + 2).toString();
        }
      }

      if (!d.temperament) {
        d.temperament = "Stubborn, Active, Happy, Dutiful, Confident";
      }

      return d;
    });
    return apiValidated;
  },
};
