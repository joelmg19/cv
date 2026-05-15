"use client";

import type { ReactNode } from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  SiPython,
  SiPhp,
  SiDjango,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAngular,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiPowerbi,
  SiGit,
  SiGithub,
  SiFlutter,
  SiDart,
} from "react-icons/si";
import LaptopModel from "@/components/LaptopModel";

/* ===========================
   Componente de Visualización de Red Global (Efecto "Capa de Ozono")
   =========================== */
function GlobalNetworkViz({ color, radius = 2.2 }: { color: string, radius?: number }) {
  const group = useRef<any>(null);

  const [positions, lines] = useMemo(() => {
    const count = 150; 
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
        const p2 = new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        
        if (p1.distanceTo(p2) < 1.0) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      }
    }
    return [pos, new Float32Array(linePositions)];
  }, [radius]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.04;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={color} transparent opacity={1} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ===========================
   Variants para animaciones
   =========================== */
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [theme, setTheme] = useState<"blue" | "purple" | "emerald">("blue");

  const accentColor =
    theme === "blue" ? "#00F0FF" : theme === "purple" ? "#8A2BE2" : "#10b981";

  const dynamicGradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoadingRepos(true);
        const res = await fetch(
          "https://api.github.com/users/joelmg19/repos?sort=updated&per_page=6"
        );
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error("Error cargando repositorios");
      } finally {
        setIsLoadingRepos(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <main 
      className="min-h-screen relative overflow-hidden bg-[#050505] transition-colors duration-500"
      style={{ "--color-accent": accentColor } as React.CSSProperties}
    >
      {/* =============================================
            HERO SECTION
          ============================================= */}
      <motion.section
        className="w-full max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <nav className="flex items-center justify-between mb-16">
          <div className="font-display font-bold text-xl tracking-tighter text-white">
            JM<span style={{ color: accentColor }} className="transition-colors duration-500">.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium text-zinc-500">
              <a href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</a>
              <a href="#skills" className="hover:text-white transition-colors">Habilidades</a>
              <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setTheme("blue")} className={`w-3 h-3 rounded-full bg-[#00F0FF] ${theme === 'blue' ? 'ring-2 ring-offset-2 ring-offset-black ring-[#00F0FF]' : ''}`} />
              <button onClick={() => setTheme("purple")} className={`w-3 h-3 rounded-full bg-[#8A2BE2] ${theme === 'purple' ? 'ring-2 ring-offset-2 ring-offset-black ring-[#8A2BE2]' : ''}`} />
              <button onClick={() => setTheme("emerald")} className={`w-3 h-3 rounded-full bg-[#10b981] ${theme === 'emerald' ? 'ring-2 ring-offset-2 ring-offset-black ring-[#10b981]' : ''}`} />
            </div>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="font-mono text-xs font-semibold tracking-widest uppercase mb-4 block transition-colors duration-500"
              style={{ color: accentColor }}
            >
              Disponible para proyectos de alto impacto
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-6">
              Ingeniero en <br />
              <span style={dynamicGradientStyle} className="transition-all duration-500">Informática</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-8">
              Hola, soy <span className="text-white font-medium">Joel Matamala</span>. 
              Especializado en **full stack, mobile y data**. Construyo experiencias digitales 
              modernas con un enfoque en escalabilidad y clean code.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contacto" 
                className="px-8 py-4 rounded-full text-black font-bold transition-all duration-500 hover:scale-105"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}40` }}
              >
                Contactar
              </a>
              <a href="#proyectos" className="px-8 py-4 rounded-full border border-zinc-800 text-white font-medium hover:border-zinc-500 transition-all">
                Proyectos
              </a>
            </div>
          </motion.div>

          {/* ===== VENTANA DE NAVE ESPACIAL (Bug de escala solucionado) ===== */}
          <motion.div 
            className="relative w-full h-[450px] md:h-[500px]"
            // FIX: Usamos "y: 40" en lugar de "scale: 0.9" para evitar el bug de WebGL
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Casco Metálico Exterior */}
            <div 
              className="absolute inset-0 rounded-[3.5rem] p-4 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black transition-all duration-500"
              style={{ 
                boxShadow: `0 20px 50px -10px ${accentColor}30, inset 0 2px 2px rgba(255,255,255,0.2), inset 0 -4px 6px rgba(0,0,0,0.8)`
              }}
            >
              {/* Remaches de la nave */}
              <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-zinc-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-zinc-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-zinc-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-zinc-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />

              {/* Cristal / Ventana Interior */}
              <div 
                className="relative w-full h-full rounded-[2.5rem] bg-[#020202] overflow-hidden isolate"
                style={{
                  boxShadow: `inset 0 0 40px rgba(0,0,0,1), inset 0 0 10px ${accentColor}20`,
                  border: `1px solid ${accentColor}30`
                }}
              >
                {/* Reflejo del cristal curvo de la ventana */}
                <div className="absolute -top-10 -left-10 w-40 h-full bg-white/5 rotate-45 blur-md pointer-events-none z-10" />

                {/* El Canvas está anclado estrictamente a los bordes */}
                <div className="absolute inset-0 w-full h-full">
                  <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    
                    <directionalLight position={[5, 10, 5]} intensity={1.5} color={accentColor} />
                    <pointLight position={[-10, 10, -10]} intensity={2} color={accentColor} />
                    <pointLight position={[0, -10, 0]} intensity={1} color={accentColor} />

                    <EffectComposer disableNormalPass>
                      <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.8} />
                    </EffectComposer>

                    <group position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
                       <GlobalNetworkViz color={accentColor} radius={2.2} />
                       <LaptopModel position={[0, 0, 0]} scale={1.2} />
                    </group>

                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} makeDefault />
                  </Canvas>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================================
            SECCIÓN SKILLS (STACK COMPLETO)
          ============================================= */}
      <motion.section
        id="skills"
        className="w-full max-w-7xl mx-auto px-6 py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
          Habilidades <span style={dynamicGradientStyle} className="transition-all duration-500">Técnicas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[32px] flex flex-col group transition-all duration-500" style={{ borderColor: `var(--color-accent)00` }}>
            <h3 className="text-white font-display text-xl font-bold mb-6 border-b border-white/5 pb-2">Frontend</h3>
            <div className="space-y-3">
              {[
                { label: "HTML5", icon: <SiHtml5 /> },
                { label: "CSS3", icon: <SiCss3 /> },
                { label: "JavaScript", icon: <SiJavascript /> },
                { label: "Angular", icon: <SiAngular /> },
                { label: "React / Next.js", icon: <SiReact /> },
                { label: "Tailwind CSS", icon: <SiTailwindcss /> },
              ].map((skill) => (
                <div key={skill.label} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm font-mono">
                  <span style={{ color: accentColor }} className="transition-colors duration-500">{skill.icon}</span>
                  {skill.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[32px] flex flex-col group">
            <h3 className="text-white font-display text-xl font-bold mb-6 border-b border-white/5 pb-2">Backend</h3>
            <div className="space-y-3">
              {[
                { label: "Python", icon: <SiPython /> },
                { label: "Java", icon: <span className="text-[10px]">☕</span> },
                { label: "PHP", icon: <SiPhp /> },
                { label: "Django", icon: <SiDjango /> },
                { label: "REST APIs", icon: <span className="text-[10px]">⚙️</span> },
              ].map((skill) => (
                <div key={skill.label} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm font-mono">
                  <span style={{ color: accentColor }} className="transition-colors duration-500">{skill.icon}</span>
                  {skill.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[32px] flex flex-col group">
            <h3 className="text-white font-display text-xl font-bold mb-6 border-b border-white/5 pb-2">Mobile</h3>
            <div className="space-y-3">
              {[
                { label: "Flutter", icon: <SiFlutter /> },
                { label: "Dart", icon: <SiDart /> },
                { label: "React Native", icon: <SiReact /> },
                { label: "Expo", icon: <SiReact /> },
              ].map((skill) => (
                <div key={skill.label} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm font-mono">
                  <span style={{ color: accentColor }} className="transition-colors duration-500">{skill.icon}</span>
                  {skill.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[32px] flex flex-col group">
            <h3 className="text-white font-display text-xl font-bold mb-6 border-b border-white/5 pb-2">Data & Tools</h3>
            <div className="space-y-3">
              {[
                { label: "MySQL", icon: <SiMysql /> },
                { label: "Firebase", icon: <SiFirebase /> },
                { label: "Power BI", icon: <SiPowerbi /> },
                { label: "SQL Server / SQL", icon: <span className="text-[10px]">📊</span> },
                { label: "Git / GitHub", icon: <SiGithub /> },
                { label: "Clean Code", icon: <SiGit /> },
              ].map((skill) => (
                <div key={skill.label} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm font-mono">
                  <span style={{ color: accentColor }} className="transition-colors duration-500">{skill.icon}</span>
                  {skill.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================================
            PROYECTOS GITHUB
          ============================================= */}
      <motion.section
        id="proyectos"
        className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-display font-bold text-white mb-12">Proyectos <span className="text-zinc-600">GitHub</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingRepos ? (
             [1, 2, 3].map(i => <div key={i} className="h-48 glass-panel rounded-3xl animate-pulse" />)
          ) : (
            repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -8 }}
                className="glass-panel p-8 rounded-[32px] flex flex-col justify-between group relative transition-colors duration-300"
                style={{ '--hover-color': accentColor } as React.CSSProperties}
              >
                <div>
                  <h3 className="text-white font-display text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: "var(--hover-color)" }}>{repo.name}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-2">{repo.description || "Proyecto de ingeniería informática."}</p>
                </div>
                <div className="mt-6 font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                  <span style={{ color: accentColor }} className="uppercase tracking-tighter transition-colors duration-500">{repo.language || "Stack"}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
              </motion.a>
            ))
          )}
        </div>
      </motion.section>

      {/* =============================================
            FOOTER / CONTACTO
          ============================================= */}
      <footer id="contacto" className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 italic uppercase tracking-tighter">
          ¿Creamos algo  <span style={dynamicGradientStyle} className="transition-all duration-500">Épico </span>?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12 font-mono text-sm">
          <a href="mailto:joel.matamala48@gmail.com" className="px-10 py-5 glass-panel rounded-full hover:bg-white hover:text-black transition-all">
            📧 joel.matamala48@gmail.com
          </a>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/joelmg19" target="_blank" className="p-5 glass-panel rounded-full hover:scale-110 transition-all" style={{ backgroundColor: `${accentColor}15` }}>
              <SiGithub style={{ color: accentColor }} className="w-5 h-5 transition-colors duration-500" />
            </a>
          </div>
        </div>
        <p className="mt-20 text-zinc-700 text-xs font-mono">
          Joel Matamala · Ingeniero en Informática · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}