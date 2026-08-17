import { useState } from "react";
import { Link } from "react-router-dom";
import palettes from "../data/palettes";
import "./Collection.css";

function Collection() {
  const [copiedHex, setCopiedHex] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState(
    JSON.parse(localStorage.getItem("saved-palettes")) || [],
  );

  const copyHexCode = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

    const handleRemove = async (paletteId) => {
    const token = localStorage.getItem('token')
    const updated = savedPalettes.filter(id => id !== paletteId)
    setSavedPalettes(updated)
    localStorage.setItem('saved-palettes', JSON.stringify(updated))
    
    if (token) {
        await fetch(`https://cent-graphics-production.up.railway.app/api/palettes/${paletteId}/save`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

  const allPalettes = palettes.flatMap((edition) => edition.palettes);
  const collectionPalettes = allPalettes.filter((p) =>
    savedPalettes.includes(p.id),
  );

  return (
    <main className="collection-container">
      <div className="collection-header">
        <h1>My Collection</h1>
        <p className="collection-count">
          <strong>{collectionPalettes.length}</strong> palette
          {collectionPalettes.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {collectionPalettes.length === 0 ? (
        <div className="collection-empty">
          <span className="collection-empty-icon">🎨</span>
          <h2>No palettes yet</h2>
          <p>Browse our collection and save your favorites to see them here.</p>
          <Link to="/#palettes" className="collection-empty-btn">
            Browse Palettes
          </Link>
        </div>
      ) : (
        <div className="collection-grid">
          {collectionPalettes.map((p) => (
            <div key={p.id} className="collection-card">
              <p className="collection-card-name">{p.name}</p>
              <button
                className="collection-remove-btn"
                onClick={() => handleRemove(p.id)}
              >
                Remove
              </button>
              <div className="collection-colors">
                {p.colors.map((color) => (
                  <div key={color} className="collection-color-item">
                    <div
                      className="collection-color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => copyHexCode(color)}
                    />
                    <span
                      className={`collection-hex ${copiedHex === color ? "copied" : ""}`}
                      onClick={() => copyHexCode(color)}
                    >
                      {copiedHex === color ? "Copied!" : color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Collection;
