import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./dataTable";
import { cleanData, getFingerprint, toSingleObject } from "./utils";
import { Helmet } from "react-helmet";

function App() {
  const [fingerprint, setFingerprint] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [showReport, setShowReport] = useState(true);

  useEffect(() => {
    if (showReport) {
      fetch("https://extreme-ip-lookup.com/json")
        .then(res => res.json(), console.error)
        .then(ip => Promise.all([ip, getFingerprint()]))
        .then(([ip, finger]) => {
          const fp = finger
            .map(({ key, value }) => ({ [key]: value }))
            .reduce(toSingleObject);
          const cleanFp = cleanData(fp);
          const cleanIp = cleanData(ip);

          setFingerprint(cleanFp);
          setIpData(cleanIp);
          setShowReport(false);
        });
    }
  }, [showReport]);

  return (
    <div>
      <Helmet>
        <title>Seanky fingerprint and IP tracker</title>
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
            <a target='_blank' rel='noreferrer noopener' href='https://molamk.com/fingerprint'>
              Sneaky Fingerprint And IP Address Tracker
            </a>
          </h1>
          <p>
            Questo è un progetto a solo scopo educativo. Nessun dato viene memorizzato. Giuro.
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
      {ipData && fingerprint ? (
        <div>
          <DataTable title="IP Data" data={ipData} />
          <DataTable title="Fingerprint" data={fingerprint} />
        </div>
      ) : (
          <section>
            <h2>Please wait...</h2>
          </section>
        )}
      <footer>
        <p>
          Made by{" "}
          <a
            style={{ fontWeight: 'bold' }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://molamk.com"
          >
            molamk
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
