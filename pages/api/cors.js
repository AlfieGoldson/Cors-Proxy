import Cors from 'cors';
import { initMiddleware } from '../../lib/initMiddleware';
import axios from 'axios';

const cors = initMiddleware(
	Cors({
		methods: ['GET', 'POST', 'OPTIONS'],
	})
);

export default async function handler(req, res) {
	await cors(req, res);

	const { url } = req.query;

	const baseUrl = encodeURI(decodeURIComponent(url));

	console.log({ baseUrl });

	try {
		const { data } = await axios.get(baseUrl);
		res.send(data);
	} catch (e) {
		console.log({ e });
		res.status(500).send({ error: 'Internal Server Error' });
	}
}
