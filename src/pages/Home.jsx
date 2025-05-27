import { FaRocket, FaBookOpen } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import AiImage from "../assets/AiPhoto.png";
import ProgressImage from "../assets/ProgressImage.png"
import PracticeImage from "../assets/PracticeImage.png"


const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote:
      "This platform made me fall in love with learning again. Super intuitive and powerful.",
  },
  {
    name: "Ishita Roy",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/100?img=32",
    quote:
      "The real-time feedback is a game-changer. It felt like I had a personal coach guiding me.",
  },
  {
    name: "Kunal Kapoor",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/100?img=22",
    quote:
      "Every module is crafted with such clarity. The AI guidance really works!",
  },
];
const faqs = [
  {
    q: "How does the AI personalize my learning?",
    a: "Our AI analyzes your performance, preferences, and goals to adaptively recommend modules, track your growth, and optimize your learning path.",
  },
  {
    q: "Is PathGenie suitable for complete beginners?",
    a: "Absolutely! Whether you're a beginner or an advanced learner, PathGenie adjusts difficulty and content to match your level.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes! PathGenie is fully self-paced. You can pause, resume, or skip modules anytime you like.",
  },
  {
    q: "What kind of content is available?",
    a: "Interactive modules, flashcards, quizzes, and real-world projects — all backed by AI for maximum impact.",
  },
];
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-5 transition-all cursor-pointer hover:bg-[#333333] hover:border-[#ff9d54]"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center text-white font-medium">
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 mt-3 text-sm leading-relaxed"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartLearning = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    const temp = Array.from({ length: 110 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }));
    setParticles(temp);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#1c1b1b] pb-24 rounded-b-[100px]">
        {/* Glow Layer */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-[1000px] h-[800px] bg-[#fa8226dc] opacity-30 blur-[150px] rounded-full pointer-events-none" />

        {/* SVG Floating Particles */}
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-[#ff9d54] shadow-[0_0_6px_var(--tw-shadow-color)] shadow-accent z-0 opacity-70"
            style={{ top: p.top, left: p.left }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ y: -20, opacity: [0, 0.8, 0] }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 max-w-3xl h-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 px-4 py-1 text-sm text-white border border-[#ff9d54] rounded-full bg-[#ff9d54]/10"
          >
            <span className="text-[#ff9d54]">⚡ Powered by Advanced AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
          >
            <span className="text-[#ff9d54]">Master Skills</span> With AI
            Guidance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg text-gray-300 max-w-xl"
          >
            Experience the future of learning with personalized AI content,
            real-time feedback, and hands-on practice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-[#f7ad74] text-black px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 flex items-center gap-2 shadow-xl shadow-[#ff9d54]/20 hover:shadow-2xl hover:shadow-[#ff9d54]/30 
                    transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 hover:bg-[#ff9d54]">
              <FaRocket />
              Start Learning Free
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#1f1f1f] hover:border-[#ff9d54] transform hover:-translate-y-1 
                    transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-lg hover:shadow-[#080808]">
              <FaBookOpen />
              See How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION (Alternating Layout + Spotlight + Tilt) */}
      <section className="bg-[#1c1b1b] py-24 px-6 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Why Choose Our Platform?
        </h2>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Learning",
              desc: "Personalized learning paths tailored to your needs.",
              img: AiImage,
            },
            {
              title: "Smart Progress",
              desc: "Track your growth with intelligent insights.",
              img: ProgressImage,
            },
            {
              title: "Interactive Practice",
              desc: "Hands-on modules with real-time feedback.",
              img: PracticeImage,
            },
          ].map((item, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <FeatureRow
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                  reversed={isReversed}
                />
              </motion.div>
            );
          })}

        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="bg-[#252525] py-16 md:py-20 lg:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-14">
            What Learners Are Saying
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1c1b1b] p-5 md:p-6 rounded-2xl shadow-lg text-left border border-[#3a3a3a] hover:border-[#ff9d54] hover:scale-105 transition-all duration-300 hover:bg-[#252320]"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs md:text-sm text-gray-400">
                      {t.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-xs md:text-sm italic">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*FAQs section */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#1c1b1b] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 md:space-y-4 text-left">
            {faqs.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/*Final CTA banner */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#2a2a2a] via-[#1c1b1b] to-[#2a2a2a] border border-[#ff9d54] text-white text-center rounded-3xl lg:rounded-4xl mx-2 md:mx-4 my-4 md:my-6">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          >
            Ready to Elevate Your Skills with AI?
          </motion.h2>
          <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of learners transforming their future through smart,
            guided learning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartLearning}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#ff9d54] text-white rounded-lg shadow-lg shadow-[#ff9d54]/20 
              hover:bg-gradient-to-r hover:from-[#ff9d54] hover:to-[#ff8a30] 
              hover:shadow-xl hover:shadow-[#ff9d54]/30 transition-all duration-200 
              hover:backdrop-blur-sm border border-transparent hover:border-white/30 
              hover:text-white/90 w-full sm:w-auto hover:scale-105"
          >
            Start Learning Now 🚀
          </motion.button>
        </div>
      </section>
    </>
  );
}

// FeatureCard is inline, not extracted
function FeatureRow({ title, desc, img, reversed }) {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  useEffect(() => {
    if (hovering) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [hovering]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      className={`relative flex flex-col md:flex-row ${reversed ? "md:flex-row-reverse" : ""
        } items-center justify-between gap-10 bg-[#252422] p-8 rounded-3xl border border-[#ff9e54b4] transition duration-300 will-change-transform`}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovering ? "transform 0.1s ease" : "transform 0.4s ease",
      }}
    >
      {/* Glow BG */}
      {visible && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"
            }`}
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, #ff9d5433, transparent 80%)`,
          }}
        />
      )}

      {/* Glow Border Mask */}
      {visible && (
        <div
          className={`absolute inset-0 pointer-events-none rounded-3xl z-0 transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"
            }`}
          style={{
            WebkitMaskImage: `radial-gradient(250px at ${coords.x}px ${coords.y}px, white, transparent)`,
            maskImage: `radial-gradient(250px at ${coords.x}px ${coords.y}px, white, transparent)`,
            boxShadow: `0 0 80px #ff9d5422`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-base max-w-md">{desc}</p>
      </div>

      {/* Illustration Placeholder */}
      <div className="relative z-10 flex-1 w-full h-40 md:h-60 overflow-hidden rounded-2xl">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain "
        />
      </div>


    </div>



  );
}



