const mongoose = require("mongoose");
const axios = require("axios");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const Review = require("../models/review");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "XTRe8ys1xW0Gd3s7kTPoGnOmPalgAB6-J9-asX3LHzU",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64d255b7fd885687626a660e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/ddmvvgno3/image/upload/v1694711419/YelpCamp/camp1_zuyslq.jpg",
          filename: "YelpCamp/qzulotvezuw290nzdeb0",
        },
        {
          url: "https://res.cloudinary.com/ddmvvgno3/image/upload/v1694711418/YelpCamp/camp2_buc6ov.jpg",
          filename: "YelpCamp/viyywy9oxea6iwihiro1",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis magnam sequi quis, animi corrupti, velit earum voluptatibus tenetur itaque dolorum minus possimus nesciunt est, fugit eveniet alias natus voluptas cupiditate!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
