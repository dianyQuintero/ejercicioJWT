function connect(callback){
  
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dyquintero:diany990925@clusterdiany-h7v2r.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, {useUnifiedTopology:true});
client.connect(err => {
  const collection = client.db("users").collection("users");
  // perform actions on the collection object
  client.close();
});

}
function getUsers(callback, name){
  connect( (client, collection) =>{
    collection.find({"username": name }).toArray(function(errDatabase, docs) {
      if(errDatabase!==null)
        console.log("Error while getting the collection", errDatabase);
      callback(docs);
      client.close();
    });
  });
}
module.exports = getUsers; 