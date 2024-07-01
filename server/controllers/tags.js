
const Tags = require("../models/tags");


const addTag = async (req, res) => {
  try {
    const {
      tagTitle
    } = req.body;
    await Tags.create({
        tagTitle: tagTitle,

    });
    res.send({ ok: true, data: `Tag '${tagTitle}' was created` });
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};


const getTag = async (req, res) => {
  try {
    const { tagTitle } = req.body;
    const uniqeTag = await Tags.findOne({ tagTitle: tagTitle });

    if (uniqeTag) {
      res.status(200).send({ ok: true, data: uniqeTag });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Tag '${tagTitle}' was not found ` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};
const getAllTags = async (req, res) => {
  try {
    let tags = await Tags.find({});
    tags = JSON.parse(JSON.stringify(tags));
    if (tags) {
      res.status(200).send({ ok: true, data: tags });
    } else {
      res.status(200).send({ ok: true, data: `Tags was not found ` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

module.exports = {
    getAllTags,
    getTag,
    addTag
};
