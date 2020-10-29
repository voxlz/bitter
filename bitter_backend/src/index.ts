import express, { Request } from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import rantsJson from '../rants.json'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const port = 5000;

interface IRant {
  text: string;
  user: string;
  dislikes: number;
  comments: number;
  date: Date;
}

async function main(){
  var uri = 'mongodb://localhost:27017/';

  const dbClient = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await dbClient.connect((err, client) => { 

    });
    

    var db = dbClient.db("bitter");
    const rantsCol = db.collection<IRant>("rants");

    async function getRants() {
      return await rantsCol.find({ date: { $exists: true } }).sort({ date: -1 }).toArray();
    }

    var rants = await getRants();

    app.get('/getRants', (req, res) => {
      console.log("getRants body: ", req.body);
      console.log(rants);
      res.send(rants);
    });
    
    app.post('/addRant', async (req, res) => {
      console.log("addRant req: ", req.body);
      if (req.body != {}) {
        rantsCol.insertOne(req.body);
        res.status(200).send("Rant added");
        rants = await getRants();
      } else
        res.send("Rant was empty");
    });

  } catch (e) {
      console.error(e);
  } finally {
      //await client.close();
  }
}

main().catch(console.error);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

 export default{ };


