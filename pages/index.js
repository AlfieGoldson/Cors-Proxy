import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
	const [inputValue, setInputValue] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		setUrl(
			inputValue ? `/api/cors?url=${encodeURIComponent(inputValue)}` : ''
		);
	}, [inputValue]);

	return (
		<div>
			<Head>
				<title>Bypass Cors</title>
				<meta name='description' content='Bypass CORS' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1>Bypass CORS</h1>
			Enter a URL to bypass CORS:
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			{url && (
				<a href={url} target='_blank' rel='noreferrer'>
					{url}
				</a>
			)}
		</div>
	);
}
