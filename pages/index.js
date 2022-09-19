import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    //setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Queries.io</title>
        {/* <link rel="icon" href="/logo.jpg" /> */}
      </Head>

      <main className={styles.main}>
        {/* <img src="/logo.jpg" className={styles.icon} /> */}
        <h3>Query Your Database</h3>
        <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.floatLeft}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an Statement"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate Query &#8594;" />
        </form>
        <div className={styles.floatRight}>
        <h4>Output : </h4>
        <span className={styles.result}>{result}</span>
        </div>
        </div>
      </main>
    </div>
  );
}
