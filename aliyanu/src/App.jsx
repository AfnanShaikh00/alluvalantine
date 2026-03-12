import { useState, useEffect, useRef } from "react";

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i, left: Math.random() * 100, delay: Math.random() * 8,
  duration: 5 + Math.random() * 6, size: 10 + Math.random() * 18, rotate: Math.random() * 360,
}));
const stars = Array.from({ length: 70 }, (_, i) => ({
  id: i, left: Math.random() * 100, top: Math.random() * 100,
  size: 1 + Math.random() * 2.5, delay: Math.random() * 4,
}));

function FloatingPetals() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: "-40px",
          width: p.size, height: p.size,
          background: "radial-gradient(circle at 30% 30%, #ffb7c5, #ff4d79)",
          borderRadius: "50% 0 50% 0", transform: `rotate(${p.rotate}deg)`,
          animation: `fall ${p.duration}s ${p.delay}s infinite linear`, opacity: 0.75,
        }} />
      ))}
    </div>
  );
}

function StarField() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size, background: "white", borderRadius: "50%",
          animation: `twinkle ${2 + s.delay}s ${s.delay}s infinite ease-in-out`, opacity: 0.55,
        }} />
      ))}
    </div>
  );
}

// PAGE 1
function Page1({ onNext }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 300); }, []);
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 55% 40%, #1a0533 0%, #0d001a 65%, #000 100%)",
      position: "relative", overflow: "hidden", padding: "2rem",
    }}>
      <StarField /><FloatingPetals />
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem", animation: "floatY 3s ease-in-out infinite" }}>🌸</div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.2rem, 7vw, 4.8rem)", color: "#fff",
          textShadow: "0 0 40px #ff6b8b, 0 0 90px #c2185b",
          lineHeight: 1.25, marginBottom: "0.6rem",
        }}>
          Tumse kuch kehna hai...
        </h1>
        <p style={{
          fontFamily: "'Lato', sans-serif", fontWeight: 300,
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "#ffb7c5",
          marginBottom: "2.5rem", letterSpacing: "0.12em",
        }}>
          Dil ki baat, alfazon mein...
        </p>
        <div style={{ width: "100px", height: "1px", background: "linear-gradient(90deg, transparent, #ff6b8b, transparent)", margin: "0 auto 3rem" }} />
        <button onClick={onNext} style={{
          background: "linear-gradient(135deg, #ff6b8b, #c2185b)", color: "white", border: "none",
          padding: "1rem 2.8rem", fontSize: "1.15rem",
          fontFamily: "'Lato', sans-serif", fontWeight: 600,
          borderRadius: "50px", cursor: "pointer",
          boxShadow: "0 8px 32px rgba(255,107,139,0.55)", transition: "all 0.3s ease", letterSpacing: "0.08em",
        }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.07)"; e.target.style.boxShadow = "0 14px 44px rgba(255,107,139,0.75)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 32px rgba(255,107,139,0.55)"; }}
        >Aage badho ➜</button>
      </div>
    </div>
  );
}

// PAGE 2
function Page2({ onNext, onBack, crushImg, setCrushImg }) {
  const [vis, setVis] = useState(false);
  const fileRef = useRef();
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCrushImg(ev.target.result);
    reader.readAsDataURL(file);
  };

  const reasons = [
    { emoji: "✨", text: "Tumhari muskaan dekh kar mera din ban jaata hai" },
    { emoji: "🌙", text: "Tumhare baare mein sochte-sochte neend aati hai" },
    { emoji: "💫", text: "Tumhari awaaz sunna meri sabse badi khushi hai" },
    { emoji: "🌺", text: "Tumhare saath har pal khaas lagta hai" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0015 0%, #1c0038 50%, #0a001a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden",
    }}>
      <StarField />
      <div style={{
        position: "relative", zIndex: 2, maxWidth: "720px", width: "100%", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease",
      }}>
        {/* Photo upload */}
        <div style={{ marginBottom: "2rem" }}>
          <div onClick={() => fileRef.current.click()} style={{
            width: "150px", height: "150px", borderRadius: "50%", margin: "0 auto",
            border: "3px solid rgba(255,107,139,0.6)",
            boxShadow: "0 0 30px rgba(255,107,139,0.4), 0 0 60px rgba(255,107,139,0.15)",
            cursor: "pointer", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: crushImg ? "transparent" : "rgba(255,107,139,0.08)",
            transition: "all 0.3s", animation: "floatY 3.5s ease-in-out infinite",
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 50px rgba(255,107,139,0.7)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(255,107,139,0.4), 0 0 60px rgba(255,107,139,0.15)"}
          >
            {crushImg
              ? <img src={crushImg} alt="crush" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.3rem" }}>📸</div>
                  <p style={{ color: "rgba(255,183,197,0.7)", fontSize: "0.75rem", fontFamily: "'Lato', sans-serif" }}>Add photo</p>
                </div>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
          <p style={{ color: "rgba(255,183,197,0.45)", fontSize: "0.75rem", fontFamily: "'Lato', sans-serif", marginTop: "0.5rem" }}>
            {crushImg ? "✨ Looking beautiful!" : "Tap circle to add your crush's photo"}
          </p>
        </div>

        <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>💖</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.7rem, 5vw, 2.8rem)", color: "#ffb7c5",
          marginBottom: "0.4rem", textShadow: "0 0 30px rgba(255,107,139,0.55)",
        }}>Tumhe kyun chahta hoon?</h2>
        <p style={{ color: "rgba(255,183,197,0.55)", fontFamily: "'Lato', sans-serif", marginBottom: "2rem", fontSize: "0.95rem" }}>
          In baaton ne mera dil chura liya...
        </p>

        <div style={{ display: "grid", gap: "0.85rem", marginBottom: "2.5rem" }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              background: "rgba(255,107,139,0.07)", border: "1px solid rgba(255,107,139,0.22)",
              borderRadius: "14px", padding: "1.1rem 1.4rem",
              display: "flex", alignItems: "center", gap: "1rem",
              backdropFilter: "blur(12px)", animation: `slideIn 0.5s ${0.2 + i * 0.12}s both ease-out`, textAlign: "left",
            }}>
              <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{r.emoji}</span>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "#ffe0ea", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", margin: 0, lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onBack} style={{
            background: "transparent", color: "#ffb7c5", border: "1px solid rgba(255,183,197,0.35)",
            padding: "0.8rem 2rem", fontSize: "1rem", fontFamily: "'Lato', sans-serif",
            borderRadius: "50px", cursor: "pointer",
          }}>← Wapas</button>
          <button onClick={onNext} style={{
            background: "linear-gradient(135deg, #ff6b8b, #c2185b)", color: "white", border: "none",
            padding: "0.85rem 2.2rem", fontSize: "1.05rem", fontFamily: "'Lato', sans-serif", fontWeight: 600,
            borderRadius: "50px", cursor: "pointer", boxShadow: "0 6px 24px rgba(255,107,139,0.4)", transition: "all 0.3s",
          }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >Aur aage ➜</button>
        </div>
      </div>
    </div>
  );
}

// PAGE 3
function Page3({ onNext, onBack, crushImg }) {
  const [vis, setVis] = useState(false);
  const [fhearts, setFhearts] = useState([]);
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  const spawnHearts = () => {
    const h = Array.from({ length: 10 }, (_, i) => ({ id: Date.now() + i, left: 25 + Math.random() * 50, delay: Math.random() * 0.6 }));
    setFhearts(p => [...p, ...h]);
    setTimeout(() => setFhearts([]), 3000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 60%, #2a0010 0%, #0d0020 70%, #000 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden",
    }}>
      <StarField />
      {fhearts.map(h => (
        <div key={h.id} style={{
          position: "fixed", bottom: "20%", left: `${h.left}%`, fontSize: "1.8rem",
          animation: `riseHeart 2.5s ${h.delay}s forwards ease-out`, pointerEvents: "none", zIndex: 10,
        }}>❤️</div>
      ))}

      <div style={{
        position: "relative", zIndex: 2, maxWidth: "680px", width: "100%", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.88)",
        transition: "all 1.1s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {crushImg && (
          <div style={{
            width: "85px", height: "85px", borderRadius: "50%", margin: "0 auto 1.5rem",
            border: "2px solid rgba(255,107,139,0.7)", overflow: "hidden",
            boxShadow: "0 0 24px rgba(255,107,139,0.55)", animation: "floatY 3s ease-in-out infinite",
          }}>
            <img src={crushImg} alt="crush" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        <div style={{
          background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,107,139,0.28)",
          borderRadius: "30px", padding: "3rem 2rem", backdropFilter: "blur(22px)",
          boxShadow: "0 0 80px rgba(255,107,139,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}>
          <div style={{ fontSize: "3.8rem", marginBottom: "1.5rem", display: "inline-block", animation: "heartbeat 1.4s infinite" }}>💝</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.9rem, 6vw, 3.4rem)", color: "#fff",
            textShadow: "0 0 40px #ff6b8b", marginBottom: "1.5rem", lineHeight: 1.3,
          }}>Kya tum mere hoge Aliya?</h2>
          <div style={{ width: "70px", height: "2px", background: "linear-gradient(90deg, transparent, #ff6b8b, transparent)", margin: "0 auto 2rem" }} />
          <p style={{
            fontFamily: "'Lato', sans-serif", fontWeight: 300,
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#ffccd5", lineHeight: 2, marginBottom: "2rem",
          }}>
            Maine bahut socha, bahut waqt liya,<br />
            par dil ki baat chupaana mushkil ho gaya.<br /><br />
            Tum meri zindagi mein ek khushbu ki tarah aayi,<br />
            aur ab tumhare bina yeh zindagi adhoori lagti hai.<br /><br />
            <span style={{ color: "#ff6b8b", fontWeight: 600, fontSize: "1.1em" }}>
              Main tumse pyaar karta hoon. 💕
            </span>
          </p>
          <button onClick={spawnHearts} style={{
            background: "rgba(255,107,139,0.12)", border: "1px solid rgba(255,107,139,0.35)",
            color: "#ffb7c5", padding: "0.6rem 1.5rem", fontFamily: "'Lato', sans-serif",
            borderRadius: "50px", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.3s",
          }}
            onMouseEnter={e => e.target.style.background = "rgba(255,107,139,0.22)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,107,139,0.12)"}
          >💖 Dil chhooo</button>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          <button onClick={onBack} style={{
            background: "transparent", color: "#ffb7c5", border: "1px solid rgba(255,183,197,0.28)",
            padding: "0.8rem 2rem", fontSize: "1rem", fontFamily: "'Lato', sans-serif",
            borderRadius: "50px", cursor: "pointer",
          }}>← Peeche</button>
          <button onClick={onNext} style={{
            background: "linear-gradient(135deg, #e91e63, #880e4f)", color: "white", border: "none",
            padding: "0.85rem 2.2rem", fontSize: "1.05rem", fontFamily: "'Lato', sans-serif", fontWeight: 600,
            borderRadius: "50px", cursor: "pointer", boxShadow: "0 6px 24px rgba(233,30,99,0.5)", transition: "all 0.3s",
          }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >Jawaab do aliya❤️</button>
        </div>
      </div>
    </div>
  );
}

// PAGE 4
function Page4({ onBack, crushImg }) {
  const [answer, setAnswer] = useState(null);
  const [vis, setVis] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  const [confetti, setConfetti] = useState([]);
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  const dodgeNo = () => {
    setNoPos({ x: (Math.random() - 0.5) * 320, y: (Math.random() - 0.5) * 220 });
    setNoSize(s => Math.max(0.3, s - 0.15));
  };

  const handleYes = () => {
    setAnswer("yes");
    setConfetti(Array.from({ length: 22 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 0.8,
      color: ["#ff6b8b","#ffb347","#c2185b","#fff","#ffccd5","#a78bfa"][Math.floor(Math.random() * 6)],
    })));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: answer === "yes"
        ? "radial-gradient(ellipse at 50% 30%, #2a0040 0%, #0d0020 70%, #000 100%)"
        : "radial-gradient(ellipse at 50% 40%, #0d0020 0%, #000 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", position: "relative",
      overflow: "hidden", transition: "background 1.2s",
    }}>
      <StarField /><FloatingPetals />

      {confetti.map(c => (
        <div key={c.id} style={{
          position: "fixed", top: "-20px", left: `${c.left}%`,
          width: "8px", height: "8px", borderRadius: "50%", background: c.color,
          animation: `confettiFall 2.5s ${c.delay}s forwards ease-in`,
          pointerEvents: "none", zIndex: 20,
        }} />
      ))}

      <div style={{
        position: "relative", zIndex: 2, maxWidth: "600px", width: "100%", textAlign: "center",
        opacity: vis ? 1 : 0, transition: "opacity 1s ease",
      }}>
        {!answer && (
          <>
            {crushImg && (
              <div style={{
                width: "110px", height: "110px", borderRadius: "50%", margin: "0 auto 1.5rem",
                border: "2px solid rgba(255,107,139,0.6)", overflow: "hidden",
                boxShadow: "0 0 28px rgba(255,107,139,0.45)", animation: "heartbeat 1.4s infinite",
              }}>
                <img src={crushImg} alt="crush" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <div style={{ fontSize: "3.2rem", marginBottom: "1rem", animation: "floatY 2.5s ease-in-out infinite" }}>🥺</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "#fff",
              textShadow: "0 0 30px #ff6b8b", marginBottom: "0.8rem",
            }}>Tumhara jawaab kya hai Aliya?</h2>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "rgba(255,183,197,0.65)", marginBottom: "3rem", fontSize: "1rem" }}>
              Mera dil dhadak raha hai... 💓
            </p>

            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <button onClick={handleYes} style={{
                background: "linear-gradient(135deg, #e91e63, #c2185b)", color: "white", border: "none",
                padding: "1.1rem 3rem", fontSize: "1.25rem", fontFamily: "'Playfair Display', serif",
                borderRadius: "50px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(233,30,99,0.5)", transition: "all 0.3s", animation: "pulse 2s infinite",
              }}
                onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              >Haan! 💍</button>

              <button onClick={dodgeNo} style={{
                background: "rgba(255,255,255,0.06)", color: "rgba(255,183,197,0.55)",
                border: "1px solid rgba(255,183,197,0.18)",
                padding: "1.1rem 3rem", fontSize: "1.25rem", fontFamily: "'Playfair Display', serif",
                borderRadius: "50px", cursor: "pointer",
                transition: "transform 0.4s ease, opacity 0.4s",
                transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noSize})`,
                opacity: noSize,
              }}>Nahi 🙈</button>
            </div>

            <p style={{ color: "rgba(255,183,197,0.35)", fontSize: "0.78rem", marginTop: "1.5rem", fontFamily: "'Lato', sans-serif" }}>
              (Nahi waala button bhaagta hai... 😏)
            </p>
            <div style={{ marginTop: "2rem" }}>
              <button onClick={onBack} style={{
                background: "transparent", color: "rgba(255,183,197,0.4)",
                border: "none", cursor: "pointer", fontSize: "0.88rem",
                fontFamily: "'Lato', sans-serif", textDecoration: "underline",
              }}>← Ek baar phir padhna hai</button>
            </div>
          </>
        )}

        {answer === "yes" && (
          <div style={{ animation: "zoomIn 0.9s cubic-bezier(0.34,1.56,0.64,1) both" }}>
            {crushImg && (
              <div style={{
                width: "140px", height: "140px", borderRadius: "50%", margin: "0 auto 1.5rem",
                border: "3px solid #ff6b8b", overflow: "hidden",
                boxShadow: "0 0 40px rgba(255,107,139,0.7), 0 0 80px rgba(255,107,139,0.3)",
                animation: "floatY 3s ease-in-out infinite",
              }}>
                <img src={crushImg} alt="crush" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <div style={{ fontSize: "4.5rem", marginBottom: "1rem" }}>🎉💍🎊</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#fff",
              textShadow: "0 0 50px #ff6b8b, 0 0 100px #e91e63",
              marginBottom: "1.5rem", lineHeight: 1.3,
            }}>Shukriya! ❤️<br />Tumne meri zindagi bana di!</h2>
            <p style={{
              fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#ffccd5",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 2, marginBottom: "2rem",
            }}>
              Ab hum saath milkar ek khoobsoorat kahani likhenge.<br />
              Har khushi, har gham — sab kuch tumhare saath.<br /><br />
              <span style={{ color: "#ff6b8b", fontWeight: 600 }}>Tum mere ho — hamesha ke liye. 💕</span>
            </p>
            <div style={{ fontSize: "2.8rem", animation: "floatY 2s ease-in-out infinite" }}>💑</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(0);
  const [crushImg, setCrushImg] = useState(null);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; }
        @keyframes fall {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.75; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.9; transform: scale(1.6); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14%      { transform: scale(1.28); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.2); }
          56%      { transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes riseHeart {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-220px) scale(1.6); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 8px 32px rgba(233,30,99,0.45); }
          50%      { box-shadow: 0 8px 60px rgba(233,30,99,0.9); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.45); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(600deg); opacity: 0; }
        }
      `}</style>
      {page === 0 && <Page1 onNext={() => setPage(1)} />}
      {page === 1 && <Page2 onNext={() => setPage(2)} onBack={() => setPage(0)} crushImg={crushImg} setCrushImg={setCrushImg} />}
      {page === 2 && <Page3 onNext={() => setPage(3)} onBack={() => setPage(1)} crushImg={crushImg} />}
      {page === 3 && <Page4 onBack={() => setPage(2)} crushImg={crushImg} />}
    </>
  );
}