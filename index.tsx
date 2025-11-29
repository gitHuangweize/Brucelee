import React, { useState, useEffect, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, Quote, Play, ExternalLink, Send, Sparkles, X, Globe, Menu } from 'lucide-react';

// --- Configuration ---
const COLORS = {
  bg: '#F7F7F0',        // Warm Off-White
  text: '#1A1A1A',      // Deep Ink Charcoal
  accent: '#C8AA5B',    // Saffron Gold (Primary Accent)
  secondaryAccent: '#993333', // Deep Terracotta (Secondary Accent: Dividers/Footnotes)
  lightGrey: '#E0E0E0', // Neutral grey for subtle borders
};

// --- Localization Data ---
const TRANSLATIONS = {
  en: {
    nav: { journey: 'Journey', philosophy: 'Philosophy', legend: 'Legend', resources: 'Resources' },
    hero: { quote: '"Empty your mind,\n be formless, shapeless\n — like water."', author: 'Bruce Lee (1940 – 1973)' },
    journey: {
      title: 'The Journey',
      events: [
        { year: '1940', title: 'The Beginning', desc: 'Born in San Francisco, the hour of the dragon.' },
        { year: '1959', title: 'Return to America', desc: 'Leaves Hong Kong to claim his US citizenship and pursue higher education.' },
        { year: '1967', title: 'Jeet Kune Do', desc: 'Officially names his martial art "The Way of the Intercepting Fist".' },
        { year: '1971', title: 'The Big Boss', desc: 'His first major film breaks box office records across Asia.' },
        { year: '1973', title: 'The Legend Lives On', desc: 'Passes away at age 32, just before the release of "Enter the Dragon".' },
      ]
    },
    philosophy: {
      title: 'The Philosophy',
      jkdTitle: 'Jeet Kune Do',
      jkdDesc: 'Jeet Kune Do favors formlessness so that it can assume all forms and since Jeet Kune Do has no style, it can fit in with all styles. As a result, Jeet Kune Do uses all ways and is bound by no way and likewise uses any technique or means which serves its end.',
      waterTitle: 'Be Like Water',
      waterDesc: 'Water can flow or it can crash. Be water, my friend. The nature of water is that it can adjust its shape to any vessel. It is soft, yet it can penetrate the hardest rock. It is the essence of adaptability.',
      voidTitle: 'The Art of Dying',
      voidDesc: 'To understand Jeet Kune Do is to understand the void. It is the art of the soul at peace. Like a sculptor creating a statue, not by adding clay, but by hacking away the unessential.',
      askSifu: 'Ask the Sifu',
      placeholder: 'Ask about water, forms, or truth...',
      thinking: 'Thinking...',
      discuss: 'Discuss the Way'
    },
    legend: {
      title: 'The Legend',
      intro: 'His films did not just display martial arts; they expressed human potential. He brought a realism and velocity to screen fighting that has never been matched.',
      analysisTitle: 'Action Analysis',
      analysisDesc: "Lee's screen combat eschewed the classical, rhythmic \"dance\" of traditional kung fu cinema for gritty, high-impact realism. His screams (kiai) were not affectations but expressions of explosive energy release.",
      movies: [
        { title: "The Big Boss", role: "Cheng Chao-an", year: 1971, img: "https://media.posterlounge.com/img/products/750000/749645/749645_poster_l.jpg" },
        { title: "Fist of Fury", role: "Chen Zhen", year: 1972, img: "https://i.pinimg.com/736x/e8/6b/80/e86b8087897857a65c901fb228c37abc.jpg" },
        { title: "The Way of the Dragon", role: "Tang Lung", year: 1972, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbF3Ksrr4k3scNRcXO17DZzuomzptxQH60IQ&s" },
        { title: "Enter the Dragon", role: "Lee", year: 1973, img: "https://fr.web.img4.acsta.net/r_1280_720/newsv7/18/06/14/12/31/17455210.jpg" },
        { title: "Game of Death", role: "Hai Tien", year: 1978, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlREaNbcMc2LGnhju-RhxGhjGNXYofrIFMuA&s" },
      ]
    },
    resources: {
      title: 'Resources',
      imgKeywordsTitle: 'Image Search Keywords',
      readingTitle: 'Further Reading',
      keywords: ["Bruce Lee minimalist portrait", "Bruce Lee high kick silhouette", "Bruce Lee nunchucks black and white", "Bruce Lee Enter the Dragon mirror scene", "Bruce Lee meditation"],
      links: [
        { title: "The Tao of Jeet Kune Do", desc: "The definitive collection of Bruce Lee's martial arts notes and philosophy." },
        { title: "Bruce Lee Foundation", desc: "The official organization dedicated to preserving his legacy." }
      ]
    },
    quotes: [
      "Knowing is not enough, we must apply. Willing is not enough, we must do.",
      "Absorb what is useful, discard what is useless and add what is specifically your own.",
      "Mistakes are always forgivable, if one has the courage to admit them.",
      "A goal is not always meant to be reached, it often serves simply as something to aim at.",
      "Adapt what is useful, reject what is useless, and add what is specifically your own."
    ],
    footer: "Minimalist Fan Site. \"Walk On.\""
  },
  zh: {
    nav: { journey: '生平', philosophy: '哲学', legend: '传奇', resources: '资源' },
    hero: { quote: '“放空你的思想，\n 无形，无式，\n 就像水一样。”', author: '李小龙 (1940 – 1973)' },
    journey: {
      title: '生平轨迹',
      events: [
        { year: '1940', title: '龙之诞生', desc: '生于旧金山，正值龙年龙时。' },
        { year: '1959', title: '重返美国', desc: '离开香港，前往美国求学并确立公民身份。' },
        { year: '1967', title: '截拳道', desc: '正式将他的武术命名为“截拳道”（拦截拳头之道）。' },
        { year: '1971', title: '唐山大兄', desc: '首部主演电影打破亚洲票房纪录。' },
        { year: '1973', title: '传奇永存', desc: '在《龙争虎斗》上映前夕逝世，年仅32岁。' },
      ]
    },
    philosophy: {
      title: '哲学精髓',
      jkdTitle: '截拳道',
      jkdDesc: '截拳道主张无形，以便适应万形；截拳道无式，故能融入万式。因此，截拳道利用一切方式，而不受限于任何方式。',
      waterTitle: '水之哲理',
      waterDesc: '水可以流动，亦可冲击。像水一样吧，朋友。水的本质是根据容器改变形状。至柔，却能穿透至坚。这是适应性的精髓。',
      voidTitle: '死亡的艺术',
      voidDesc: '理解截拳道即是理解虚空。这是灵魂安宁的艺术。如同雕塑家创作，不是通过增加粘土，而是通过剔除非本质的部分。',
      askSifu: '向师父请教',
      placeholder: '询问关于水、形式或真理...',
      thinking: '思考中...',
      discuss: '论道'
    },
    legend: {
      title: '银幕传奇',
      intro: '他的电影不仅展示了武术，更表达了人类的潜能。他为银幕格斗带来了前所未有的真实感和速度感。',
      analysisTitle: '动作分析',
      analysisDesc: '李小龙的银幕格斗摒弃了传统功夫片的程式化“舞蹈”，追求粗犷、高冲击力的真实感。他的怪啸（Kiai）并非做作，而是爆发力释放的表现。',
      movies: [
        { title: "唐山大兄", role: "郑潮安", year: 1971, img: "https://media.posterlounge.com/img/products/750000/749645/749645_poster_l.jpg" },
        { title: "精武门", role: "陈真", year: 1972, img: "https://i.pinimg.com/736x/e8/6b/80/e86b8087897857a65c901fb228c37abc.jpg" },
        { title: "猛龙过江", role: "唐龙", year: 1972, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbF3Ksrr4k3scNRcXO17DZzuomzptxQH60IQ&s" },
        { title: "龙争虎斗", role: "李", year: 1973, img: "https://fr.web.img4.acsta.net/r_1280_720/newsv7/18/06/14/12/31/17455210.jpg" },
        { title: "死亡游戏", role: "卢比利", year: 1978, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlREaNbcMc2LGnhju-RhxGhjGNXYofrIFMuA&s" },
      ]
    },
    resources: {
      title: '资源角',
      imgKeywordsTitle: '剧照搜索关键词',
      readingTitle: '延伸阅读',
      keywords: ["李小龙 极简肖像", "李小龙 高踢 剪影", "李小龙 双截棍 黑白", "李小龙 龙争虎斗 镜子", "李小龙 冥想"],
      links: [
        { title: "截拳道之道", desc: "李小龙武术笔记与哲学的权威合集。" },
        { title: "李小龙基金会", desc: "致力于维护其遗产的官方组织。" }
      ]
    },
    quotes: [
      "光是知道是不够的，必须加以运用；光是希望是不够的，非去做不可。",
      "吸取有用的，摒弃无用的，加上你自己特有的。",
      "如果一个人有勇气承认错误，那么错误总是可以原谅的。",
      "目标并不总是要达到的，它往往只是作为一个奋斗的方向。",
      "适应有用的，拒绝无用的，并加上你特有的。"
    ],
    footer: "极简主义粉丝站. \"Walk On.\""
  }
};

type LangType = 'en' | 'zh';
const LangContext = createContext<{ lang: LangType; toggleLang: () => void; t: typeof TRANSLATIONS['en'] }>(null!);

// --- Components ---

const Section = ({ id, children, className = "" }: { id: string; children?: React.ReactNode; className?: string }) => (
  <section id={id} style={{ minHeight: '100vh', padding: '80px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }} className={className}>
    {children}
  </section>
);

const Title = ({ children }: { children?: React.ReactNode }) => (
  <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '60px', letterSpacing: '-0.02em', borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: '20px' }}>
    {children}
  </h2>
);

const SubTitle = ({ children }: { children?: React.ReactNode }) => (
  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px', color: COLORS.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
    {children}
  </h3>
);

// --- 1. Hero / Home ---
const Hero = () => {
  const { t } = useContext(LangContext);
  const scrollToNext = () => {
    document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
      <div style={{ maxWidth: '800px', padding: '0 20px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '40px', whiteSpace: 'pre-line' }}>
          {t.hero.quote}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '60px', fontStyle: 'italic' }}>
          {t.hero.author}
        </p>
      </div>
      
      <div style={{ position: 'absolute', bottom: '40px', cursor: 'pointer', animation: 'bounce 2s infinite' }} onClick={scrollToNext}>
        <ArrowDown size={32} color={COLORS.accent} />
      </div>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </div>
  );
};

// --- 2. The Journey (Timeline) ---
const Journey = () => {
  const { t } = useContext(LangContext);
  
  return (
    <Section id="journey">
      <Title>{t.journey.title}</Title>
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        <div style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: COLORS.lightGrey }}></div>
        {t.journey.events.map((evt: any, idx: number) => (
          <div key={idx} style={{ marginBottom: '60px', paddingLeft: '40px', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', left: '20px', top: '6px', width: '14px', height: '14px', 
              borderRadius: '50%', background: COLORS.bg, border: `3px solid ${COLORS.accent}`, transform: 'translateX(-50%)' 
            }}></div>
            <span style={{ fontSize: '0.9rem', color: COLORS.accent, fontWeight: 'bold' }}>{evt.year}</span>
            <h4 style={{ fontSize: '1.5rem', margin: '5px 0 10px' }}>{evt.title}</h4>
            <p style={{ color: '#555', maxWidth: '500px' }}>{evt.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

// --- 3. The Philosophy (With Gemini Integration) ---

const AskSifu = () => {
  const { t, lang } = useContext(LangContext);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    
    const systemInstruction = lang === 'en' 
      ? "You are an expert on Bruce Lee's philosophy of Jeet Kune Do. Answer concisely, profoundly, and use metaphors related to water, emptiness, and directness. Tone: Philosophical, calm, wise."
      : "你是李小龙截拳道哲学的专家。回答要简练、深刻，并使用与水、空和直接性相关的隐喻。语气：哲学、冷静、智慧。请用中文回答。";

    try {
      // Call our secure backend function
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, systemInstruction })
      });
      
      if (!res.ok) throw new Error('API request failed');
      
      const data = await res.json();
      setResponse(data.response || "");
    } catch (e) {
      setResponse(lang === 'en' ? "The mind is cluttered. Try again later." : "心绪杂乱，稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: '40px',
          padding: '15px 30px',
          border: `1px solid ${COLORS.accent}`,
          background: 'transparent',
          color: COLORS.accent,
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '50px',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.color = COLORS.bg; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = COLORS.accent; }}
      >
        <Sparkles size={18} /> {t.philosophy.askSifu}
      </button>
    );
  }

  return (
    <div style={{ marginTop: '40px', padding: '30px', background: '#fff', border: `1px solid ${COLORS.lightGrey}`, borderRadius: '4px', maxWidth: '600px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h4 style={{ color: COLORS.accent }}>{t.philosophy.discuss}</h4>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.philosophy.placeholder}
          style={{ flex: 1, padding: '12px', border: `1px solid ${COLORS.lightGrey}`, fontSize: '1rem', outline: 'none', background: COLORS.bg }}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button 
          onClick={handleAsk}
          disabled={loading}
          style={{ padding: '0 20px', background: COLORS.accent, color: COLORS.bg, border: 'none', cursor: 'pointer' }}
        >
          {loading ? t.philosophy.thinking : <Send size={18} />}
        </button>
      </div>
      
      {response && (
        <div style={{ lineHeight: '1.8', fontStyle: 'italic', borderLeft: `3px solid ${COLORS.secondaryAccent}`, paddingLeft: '15px' }}>
          {response}
        </div>
      )}
    </div>
  );
};

const QuotesGallery = () => {
  const { t } = useContext(LangContext);
  const [index, setIndex] = useState(0);

  // Reset index when language changes to avoid out of bounds or mixed lang
  useEffect(() => {
    setIndex(0);
  }, [t]);

  return (
    <div style={{ margin: '60px 0', padding: '40px', background: '#fff', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIndex((index + 1) % t.quotes.length)}>
      <Quote size={32} color={COLORS.accent} style={{ marginBottom: '20px' }} />
      <p style={{ fontSize: '1.4rem', fontWeight: 300, minHeight: '80px' }}>{t.quotes[index]}</p>
      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: COLORS.secondaryAccent }}>Click for next quote</div>
    </div>
  );
};

const Philosophy = () => {
  const { t } = useContext(LangContext);
  return (
    <Section id="philosophy">
      <Title>{t.philosophy.title}</Title>
      <div style={{ marginBottom: '40px' }}>
        <SubTitle>{t.philosophy.jkdTitle}</SubTitle>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', marginBottom: '20px' }}>
          {t.philosophy.jkdDesc}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div>
          <SubTitle>{t.philosophy.waterTitle}</SubTitle>
          <p>{t.philosophy.waterDesc}</p>
        </div>
        <div>
           <SubTitle>{t.philosophy.voidTitle}</SubTitle>
           <p>{t.philosophy.voidDesc}</p>
        </div>
      </div>

      <QuotesGallery />
      <AskSifu />
    </Section>
  );
};

// --- 4. The Legend (Movies) ---
const Legend = () => {
  const { t } = useContext(LangContext);

  return (
    <Section id="legend">
      <Title>{t.legend.title}</Title>
      <p style={{ marginBottom: '40px', fontSize: '1.1rem' }}>
        {t.legend.intro}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
        {t.legend.movies.map((m: any, i: number) => (
          <div key={i} style={{ border: `1px solid ${COLORS.lightGrey}`, transition: 'transform 0.2s', background: '#fff', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Placeholder for Movie Still */}
               <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) hover:grayscale(0%)', transition: 'filter 0.3s' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ color: COLORS.accent, fontSize: '0.8rem', fontWeight: 'bold' }}>{m.year}</div>
              <h4 style={{ fontSize: '1.2rem', margin: '10px 0' }}>{m.title}</h4>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '60px', padding: '40px', background: '#fff', borderLeft: `4px solid ${COLORS.accent}` }}>
        <SubTitle>{t.legend.analysisTitle}</SubTitle>
        <p>{t.legend.analysisDesc}</p>
      </div>
    </Section>
  );
};

// --- 5. Resources ---
const Resources = () => {
  const { t } = useContext(LangContext);
  return (
    <Section id="resources">
      <Title>{t.resources.title}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div>
          <SubTitle>{t.resources.imgKeywordsTitle}</SubTitle>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {t.resources.keywords.map((k: string, i: number) => (
              <li key={i} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: `1px solid ${COLORS.lightGrey}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {k} <ExternalLink size={14} color={COLORS.accent} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SubTitle>{t.resources.readingTitle}</SubTitle>
          {t.resources.links.map((link: any, i: number) => (
             <div key={i} style={{ marginTop: '20px' }}>
              <a href="#" style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{link.title}</a>
              <p style={{ color: '#666' }}>{link.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// --- Navigation ---
const Navbar = () => {
  const { t, toggleLang, lang } = useContext(LangContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, 
        padding: '15px 20px', // Reduced padding for mobile default
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        background: 'rgba(247, 247, 240, 0.95)', backdropFilter: 'blur(5px)', zIndex: 100,
        transition: 'all 0.3s ease'
      }} className="navbar">
        <div style={{ fontWeight: 900, letterSpacing: '-1px', fontSize: '1.2rem', zIndex: 102 }}>BRUCE LEE</div>
        
        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: 600 }}>
            <a href="#journey" style={{ textTransform: 'uppercase' }}>{t.nav.journey}</a>
            <a href="#philosophy" style={{ textTransform: 'uppercase' }}>{t.nav.philosophy}</a>
            <a href="#legend" style={{ textTransform: 'uppercase' }}>{t.nav.legend}</a>
            <a href="#resources" style={{ textTransform: 'uppercase' }}>{t.nav.resources}</a>
          </div>
          <button 
            onClick={toggleLang}
            style={{ 
              background: 'none', border: `1px solid ${COLORS.text}`, borderRadius: '4px', 
              padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem', 
              display: 'flex', alignItems: 'center', gap: '5px', color: COLORS.text
            }}
          >
            <Globe size={14} /> {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" style={{ display: 'none', alignItems: 'center', gap: '15px' }}>
           <button 
            onClick={toggleLang}
            style={{ 
              background: 'none', border: `1px solid ${COLORS.text}`, borderRadius: '4px', 
              padding: '4px 8px', cursor: 'pointer', fontSize: '0.7rem', 
              display: 'flex', alignItems: 'center', gap: '4px', color: COLORS.text
            }}
          >
            <Globe size={12} /> {lang === 'en' ? '中文' : 'EN'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 102 }}>
            {isMenuOpen ? <X size={24} color={COLORS.text} /> : <Menu size={24} color={COLORS.text} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: COLORS.bg, zIndex: 101,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          gap: '40px', fontSize: '1.5rem', fontWeight: 600
        }}>
          <a href="#journey" onClick={() => setIsMenuOpen(false)}>{t.nav.journey}</a>
          <a href="#philosophy" onClick={() => setIsMenuOpen(false)}>{t.nav.philosophy}</a>
          <a href="#legend" onClick={() => setIsMenuOpen(false)}>{t.nav.legend}</a>
          <a href="#resources" onClick={() => setIsMenuOpen(false)}>{t.nav.resources}</a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .navbar { padding: 20px 40px !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

// --- Main App ---
const App = () => {
  const [lang, setLang] = useState<LangType>('zh');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: TRANSLATIONS[lang] }}>
      <div className="app">
        <Navbar />
        <Hero />
        <Journey />
        <Philosophy />
        <Legend />
        <Resources />
        <footer style={{ padding: '40px', textAlign: 'center', fontSize: '0.8rem', color: COLORS.secondaryAccent }}>
          <p>&copy; {new Date().getFullYear()} {TRANSLATIONS[lang].footer}</p>
        </footer>
      </div>
    </LangContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);