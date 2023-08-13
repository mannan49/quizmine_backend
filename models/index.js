// Assuming you have a MongoDB client instance
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri = "mongodb://localhost:27017"; // Your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const db = client.db("your-db-name");

// Assuming you've defined schema objects as per your needs
const addSkillCollection = db.collection("add_skills");
const addMcqsCollection = db.collection("add_mcqs");
const userResultsCollection = db.collection("user_results");

// No need for associations as in Sequelize; MongoDB handles this differently

// Example insert into add_skills collection
const newSkill = {
  name: "Programming",
  // other fields
};
addSkillCollection.insertOne(newSkill, (err, result) => {
  if (err) {
    console.error("Error inserting skill:", err);
    return;
  }
  console.log("Skill inserted:", result.insertedId);
});

// Example query from user_results collection
userResultsCollection.find({ user_id: "user123" }).toArray((err, results) => {
  if (err) {
    console.error("Error querying user results:", err);
    return;
  }
  console.log("User results:", results);
});

// Connect to MongoDB and start the server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  // Start your server here
});
