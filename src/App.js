import React, { useEffect, useState } from 'react';
import './App.css';
import DataTable from './dataTable';
import { cleanData, getFingerprint, toSingleObject } from './utils';
import { Helmet } from 'react-helmet';

function App() {
	const [fingerprint, setFingerprint] = useState(null);
	const [ipData, setIpData] = useState(null);
	const [hasFetchedData, setHasFetchedData] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (!hasFetchedData) {
			const ipPromise = fetch(
				'https://extreme-ip-lookup.com/json'
			).then((res) => res.json());
			const fingerPromise = getFingerprint();
			Promise.all([ipPromise, fingerPromise])
				.then(([ip, finger]) => {
					const fp = finger
						.map(({ key, value }) => ({ [key]: value }))
						.reduce(toSingleObject);
					const cleanFp = cleanData(fp);
					const cleanIp = cleanData(ip);

					setFingerprint(cleanFp);
					setIpData(cleanIp);
				})
				.catch((error) => {
					setErrors((prev) => [...prev, error.toString()]);
				})
				.finally(() => {
					setHasFetchedData(true);
				});
		}
	}, [hasFetchedData]);

	return (
		<div>
			<Helmet>
				<title>Sneaky fingerprint and IP tracker</title>
				<meta
					name="description"
					content="Small React app to collect a device's fingerprint and IP address metadata"
				/>
				<meta
					name="keywords"
					cpntent="fingerprint,ip-address,tracker,react,privacy"
				/>
			</Helmet>
			<header>
				<section>
					<h1>
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="https://github.com/giammyisjammy/fingerprint"
						>
							Sneaky Fingerprint And IP Address Tracker
						</a>
					</h1>
					<p>
						Questo è un progetto a solo scopo educativo. Nessun dato
						viene memorizzato. Giuro.
					</p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/giammyisjammy/fingerprint"
					>
						Codice su Github
					</a>
				</section>
			</header>
			{hasFetchedData ? (
				ipData && fingerprint ? (
					<div>
						<DataTable title="IP Data" data={ipData} />
						<DataTable title="Fingerprint" data={fingerprint} />
					</div>
				) : (
					<section>
						{errors.map((err, key) => (
							<h2 key={key} style={{ color: 'red' }}>
								{err}
							</h2>
						))}
					</section>
				)
			) : (
				<section>
					<h2>Please wait...</h2>
				</section>
			)}
			<footer>
				<p>
					Made by{' '}
					<a
						style={{ fontWeight: 'bold' }}
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/giammyisjammy"
					>
						giammyisjammy
					</a>
				</p>
			</footer>
		</div>
	);
}

export default App;
