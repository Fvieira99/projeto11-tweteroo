import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o hub",
	},
];

app.post("/sign-up", (req, res) => {
	users.push(req.body);
	res.send("OK");
});

app.get("/tweets", (req, res) => {
	const filteredTweets = [];
	if (tweets.length <= 10 && tweets.length > 0) {
		for (let i = tweets.length - 1; i >= 0; i--) {
			filteredTweets.push(tweets[i]);
		}
		res.send(filteredTweets);
	} else {
		for (let i = tweets.length - 1; i >= tweets.length - 10; i--) {
			filteredTweets.push(tweets[i]);
		}
		res.send(filteredTweets);
	}
});

app.post("/tweets", (req, res) => {
	tweets.push(req.body);
	res.send("OK");
});

app.listen(5000, () => {
	console.log(chalk.green.bold("Servidor funcionando"));
});
