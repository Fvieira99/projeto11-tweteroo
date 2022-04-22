import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [];

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
	const { avatar } = searchAvatar(req.body);
	if (avatar) {
		tweets.push({ ...req.body, avatar: avatar });
		res.send("OK");
	}
});

app.listen(5000, () => {
	console.log(chalk.green.bold("Servidor funcionando"));
});

function searchAvatar(reqBody) {
	const userInfo = users.find((user) => {
		return user.username === reqBody.username;
	});
	return userInfo;
}
