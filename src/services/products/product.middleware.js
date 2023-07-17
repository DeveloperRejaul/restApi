export const registerProduct = ({ db, imageUp }) => async (req, res) => {

  try {

    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' && req.body[k] !== null) || Object.keys(req.body.data).every((k) => req.body.data[k] !== '' && req.body.data[k] !== null);

    if (!validobj) res.status(400).send('Bad request');

    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');

    if (req.files?.images) {

      for (const image of req.files.images) {

        const img = await imageUp(image.path);

        req.body.images = [...(req.body.images || []), img];

      }

    }

    const product = await db.create({ table: Products, key: req.body });

    if (!product) return res.status(400).send('Bad request');

    return res.status(200).send(product);

  }

  catch (err) {

    console.log(err);

    res.status(500).send('Something went wrong');

  }

};