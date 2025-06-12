
import React, { useState } from "react";

function App() {
  const [dienstleistung, setDienstleistung] = useState("");
  const [qm, setQm] = useState(0);
  const [etage, setEtage] = useState(0);
  const [keller, setKeller] = useState(false);
  const [innenstadt, setInnenstadt] = useState(false);
  const [preis, setPreis] = useState(null);

  const berechnePreis = () => {
    let gesamt = 0;

    if (dienstleistung === "Entrümpelung") {
      gesamt = qm * 15 + etage * 50;
      if (keller) gesamt += 100;
      if (innenstadt) gesamt *= 1.1;
    }

    if (dienstleistung === "Reinigung") {
      gesamt = Math.max(250, qm * 5);
    }

    setPreis(gesamt.toFixed(2));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Abt Haus & Garten – Kalkulator</h2>
      <select value={dienstleistung} onChange={(e) => setDienstleistung(e.target.value)}>
        <option value="">Dienstleistung wählen</option>
        <option value="Entrümpelung">Entrümpelung</option>
        <option value="Reinigung">Reinigung</option>
      </select>

      <div>
        <input
          type="number"
          placeholder="Fläche in m²"
          value={qm}
          onChange={(e) => setQm(Number(e.target.value))}
        />
      </div>

      {dienstleistung === "Entrümpelung" && (
        <>
          <input
            type="number"
            placeholder="Etage (0 = EG)"
            value={etage}
            onChange={(e) => setEtage(Number(e.target.value))}
          />
          <label>
            <input
              type="checkbox"
              checked={keller}
              onChange={(e) => setKeller(e.target.checked)}
            />
            Keller enthalten
          </label>
          <label>
            <input
              type="checkbox"
              checked={innenstadt}
              onChange={(e) => setInnenstadt(e.target.checked)}
            />
            Innenstadtlage
          </label>
        </>
      )}

      <button onClick={berechnePreis}>Preis berechnen</button>

      {preis && <h3>Geschätzter Preis: {preis} €</h3>}
    </div>
  );
}

export default App;
