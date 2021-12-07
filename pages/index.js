import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [inputValue, setInputValue] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (!inputValue) {
			setUrl('');
			return;
		}

		const { origin } = window.location;
		const newUrl = `/api/cors?url=${encodeURIComponent(inputValue)}`;
		const fullUrl = `${origin}${newUrl}`;

		setUrl(fullUrl);
	}, [inputValue]);

	const copyUrl = useCallback(() => {
		navigator.clipboard.writeText(url);
	}, [url]);

	return (
		<div className={styles.container}>
			<Head>
				<title>YameCORS - Bypass CORS</title>
				<meta name='description' content='Bypass CORS' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1 className={styles.title}>YameCORS</h1>
			<p>Enter a URL and bypass CORS:</p>
			<input
				className={styles.input}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			{url && (
				<>
					<a
						href={url}
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						<span className={styles.text}>{url}</span>
						<svg
							stroke='currentColor'
							fill='none'
							strokeWidth='0'
							viewBox='0 0 24 24'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
							></path>
						</svg>
					</a>
					<button className={styles.copyBtn} onClick={copyUrl}>
						Copy URL
						<svg
							stroke='currentColor'
							fill='none'
							strokeWidth='0'
							viewBox='0 0 24 24'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
							></path>
						</svg>
					</button>
				</>
			)}
		</div>
	);
}
