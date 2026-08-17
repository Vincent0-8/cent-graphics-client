import artImage from "../../assets/removed-bg_Art1.png";
import { MdPalette } from "react-icons/md";
import mainLogo from "../../assets/logo.png";
import palettes from "../data/palettes";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [isCopied, setIsCopied] = useState(null);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setIsCopied(color);
    setTimeout(() => {
      setIsCopied(null);
    }, 1000);
  };

  ///inisialisasi state dari localStorage agar saat website di refresh data tidak hilang
  const [savedPalettes, setSavedPalettes] = useState(() => {
    const saved = localStorage.getItem("saved-palettes");
    return saved ? JSON.parse(saved) : [];
  });

  ///modal showup
  const [showModal, setShowModal] = useState(false)

  /// function untuk menyimpan palette ke localStorage
const handleSave = async (paletteId) => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        setShowModal(true)
        return
    }

    if (!savedPalettes.includes(paletteId)) {
        const updatedPalettes = [...savedPalettes, paletteId]
        setSavedPalettes(updatedPalettes)
        localStorage.setItem('saved-palettes', JSON.stringify(updatedPalettes))
        
        await fetch(`https://cent-graphics-production.up.railway.app/api/palettes/${paletteId}/save`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}
  // 1. Flatten semua palette cards jadi satu array
  const allPalettes = palettes.flatMap((edition) => edition.palettes);

  // 2. Filter hanya yang ID-nya ada di savedPalettes
  const collectionPalettes = allPalettes.filter((p) =>
    savedPalettes.includes(p.id),
  );

  // /// function untuk menghapus palette dari localStorage
  // const handleRemove = (paletteId) => {
  //     setSavedPalettes(savedPalettes.filter(id => id !== paletteId))
  // }

  return (
    <main>
      <div className="container-cta">
        <div className="home-cta-group">
          <h1 className="title-cta">
            COLORIZE YOUR WORLD <br />
            WITH US
          </h1>

          <p>
            Elevate your brand identity with premium color palettes and
            typography curated by <strong>Cent Graphics</strong>. By combining
            precise visual elements, we deliver impactful and expressive designs
            tailored to today's evolving trends. Partner with us and colorize
            your digital presence today.
          </p>

          <a href="#contact">
            <button className="cta-btn">Get in Touch</button>
          </a>
        </div>

        <div className="cta-photo">
          <img className="cta-img" src={artImage} alt="art-1" />
        </div>
      </div>

      <div id="services" className="container-offer">
        <h2>What We Provide</h2>
        <div className="feature-list">
          <div className="feature">
            <div className="feature-icon1">
              <MdPalette />
            </div>
            <h3>Color Palettes Collection</h3>
            <p>
              Elevate your brand with unique and memorable visual identities.
              From logos to comprehensive style guides, we create designs that
              truly represent your business.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon2">
              <MdPalette />
            </div>
            <h3>Typography Collections</h3>
            <p>
              Explore a diverse range of typography collections designed to
              bring clarity and personality to your brand. Each font is
              carefully selected to enhance readability and visual impact.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon3">
              <MdPalette />
            </div>
            <h3>Saving Option</h3>
            <p>
              Create and save your favorite color palettes for easy access and
              future use. Build your personalized collection of inspiring color
              combinations tailored to your design preferences.
            </p>
          </div>
        </div>
      </div>

      {/* palettes */}
      <h2 id="palettes" className="palette-title">
        Palettes Collection
      </h2>

      <p className="palette-subtitle">
        Browse curated color palettes for your next design project
      </p>

      <div className="container-palettes">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className={`palette-edition ${palette.editionClass}`}
          >
            <h2 className="edition-title">{palette.edition}</h2>
            <div className="palette-grid">
              {palette.palettes.map((p) => (
                <div key={p.id} className="palette-card">
                  <p className="palette-name">{p.name}</p>
                  <button
                    className={palette.editionClass}
                    onClick={() => {
                      (handleCopy(p.id), handleSave(p.id));
                    }}
                  >
                    {savedPalettes.includes(p.id)
                      ? "✓ Saved"
                      : "+ Add to Collection"}
                  </button>
                  <div className="palette-colors">
                    {p.colors.map((color) => (
                      <div key={color} className="color-item">
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: color,
                            borderRadius: "8px",
                            border: "2px solid white",
                          }}
                        ></div>
                        <p
                          className="hex-code"
                          onClick={() => handleCopy(color)}
                        >
                          {isCopied === color ? "Copied!" : color}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div id="typography" className="container-typography">
        <h1>TYPOGRAPHY</h1>

        <div className="typography-card">
          <div className="typography-header">
            <h2>TYPOGRAPHY</h2>
          </div>

          <div className="typography-body">
            <div className="typo-left">
              <h1 className="typo-huge">Noto Sans JP</h1>
              <p className="typo-tagline">
                Conveying your message through the power of design.
              </p>
            </div>

            <div className="typo-right">
              <h3 className="typo-font-name">Noto Sans JP Rounded</h3>
              <div className="typo-weights">
                <div className="weight-row">
                  <span className="w-bold">Bold</span>
                  <span className="w-size">32/44</span>
                </div>
                <div className="weight-row">
                  <span className="w-medium">Medium</span>
                  <span className="w-size">20/32</span>
                </div>
                <div className="weight-row">
                  <span className="w-regular">Regular</span>
                  <span className="w-size">16/28</span>
                </div>
                <div className="weight-row">
                  <span className="w-light">Light</span>
                  <span className="w-size">14/24</span>
                </div>
              </div>
            </div>
          </div>

          <div className="typo-characters">
            <p>Typography Characters</p>
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz0123456789</p>
          </div>
        </div>

        <div className="typography-card font-playfair">
          <div className="typography-header">
            <h2>TYPOGRAPHY</h2>
          </div>

          <div className="typography-body">
            <div className="typo-left">
              <h1 className="typo-huge">Playfair Display</h1>
              <p className="typo-tagline">
                Elegant and timeless typography for your brand.
              </p>
            </div>

            <div className="typo-right">
              <h3 className="typo-font-name">Playfair Display</h3>
              <div className="typo-weights">
                <div className="weight-row">
                  <span className="w-bold">Bold</span>
                  <span className="w-size">32/44</span>
                </div>
                <div className="weight-row">
                  <span className="w-medium">Medium</span>
                  <span className="w-size">20/32</span>
                </div>
                <div className="weight-row">
                  <span className="w-regular">Regular</span>
                  <span className="w-size">16/28</span>
                </div>
                <div className="weight-row">
                  <span className="w-light">Light</span>
                  <span className="w-size">14/24</span>
                </div>
              </div>
            </div>
          </div>

          <div className="typo-characters">
            <p>Typography Characters</p>
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz0123456789</p>
          </div>
        </div>
      </div>

      <div id="contact" className="contact">
        <div className="container-contact">
          <div className="contact-info">
            <img src={mainLogo} alt="main-logo" />

            <p>
              Apex Creative Agency <br />
              456 Enterprise Boulevard <br />
              USA
            </p>
            <p>(+62) 878-1234-0987</p>
            <p>centgraphic.com</p>
          </div>

          <div className="contact-service">
            <h1 className="contact-title">Services</h1>
            <a href="/#palettes" className="contact-subtitle">
              Palettes
            </a>
            <a href="/#typography" className="contact-subtitle">
              Typography
            </a>
          </div>

          <div className="contact-social">
            <h1 className="contact-title">Socials</h1>
            <a href="" className="contact-subtitle">
              Instagram
            </a>
            <a href="" className="contact-subtitle">
              Behance
            </a>
            <a href="" className="contact-subtitle">
              Dribbble
            </a>
          </div>
        </div>

        <div className="container-footer">
          <strong>Cent Graphic &copy; 2026</strong>
        </div>
      </div>

      {showModal && (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>Login Required</h2>
            <p>Please login to save palettes to your collection.</p>
            <div className="modal-actions">
                <button className="modal-login-btn" onClick={() => window.location.href = '/auth'}>
                    Login
                </button>
                <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}
    </main>
  );
}

export default Home;
