"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
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
   Variants para animaciones
   =========================== */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ===========================
   Tipos para repos de GitHub
   =========================== */

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
};

type SkillItem = {
  label: string;
  icon?: ReactNode;
};

type SkillCardProps = {
  title: string;
  items: SkillItem[];
};

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string;
  url: string;
};

export default function Home() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);

  const [theme, setTheme] = useState<"blue" | "purple" | "emerald">("blue");

  const accentColor =
    theme === "blue" ? "#38bdf8" : theme === "purple" ? "#a855f7" : "#10b981";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoadingRepos(true);
        setReposError(null);

        const res = await fetch(
          "https://api.github.com/users/joelmg19/repos?sort=updated&per_page=8"
        );

        if (!res.ok) throw new Error("Error cargando repos");

        const data: GithubRepo[] = await res.json();
        setRepos(data);
      } catch (err) {
        setReposError("No se pudieron cargar los repositorios.");
      } finally {
        setIsLoadingRepos(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* =============================================
            HERO
          ============================================= */}
      <motion.section
        className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Top bar con selector de tema */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span className="hidden sm:inline">
            Portafolio · Joel Matamala · {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <span className="hidden sm:inline">Tema</span>
            <button
              onClick={() => setTheme("blue")}
              aria-label="Tema azul"
              className={`h-5 w-5 rounded-full border ${
                theme === "blue"
                  ? "border-sky-400 ring-2 ring-sky-500/60"
                  : "border-slate-600"
              } bg-sky-500`}
            />
            <button
              onClick={() => setTheme("purple")}
              aria-label="Tema púrpura"
              className={`h-5 w-5 rounded-full border ${
                theme === "purple"
                  ? "border-purple-400 ring-2 ring-purple-500/60"
                  : "border-slate-600"
              } bg-purple-500`}
            />
            <button
              onClick={() => setTheme("emerald")}
              aria-label="Tema esmeralda"
              className={`h-5 w-5 rounded-full border ${
                theme === "emerald"
                  ? "border-emerald-400 ring-2 ring-emerald-500/60"
                  : "border-slate-600"
              } bg-emerald-500`}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
          {/* Texto Hero */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-sky-400">
              Desarrollador Full Stack · Portfolio 3D
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hola, soy{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${accentColor}, #e5e7eb)`,
                }}
              >
                Joel Matamala
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300">
              Desarrollador chileno de 23 años con inglés avanzado,
              especializado en{" "}
              <span className="font-semibold">full stack, mobile y data</span>.
              Me encanta crear experiencias limpias, modernas y con 3D.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#skills"
                className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 transition text-sm md:text-base"
              >
                Ver habilidades
              </a>
              <a
                href="#proyectos"
                className="px-5 py-2 rounded-full border border-slate-600 hover:border-sky-400 transition text-sm md:text-base"
              >
                Proyectos
              </a>
              <a
                href="#contacto"
                className="px-5 py-2 rounded-full border border-slate-600 hover:border-sky-400 transition text-sm md:text-base"
              >
                Contacto
              </a>
            </div>

            <div className="text-sm text-slate-400 space-y-1 pt-4">
              <p>📍 Chile</p>
              <p>🗣 Inglés avanzado</p>
              <p>📧 joel.matamala48@gmail.com</p>
            </div>
          </motion.div>

          {/* Modelo 3D con glow animado */}
          <motion.div
            className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{
              boxShadow: `0 0 60px ${accentColor}40`,
            }}
          >
            {/* Glow animado */}
            <div
              className="pointer-events-none absolute -inset-10 blur-3xl opacity-60 animate-pulse"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 0%, ${accentColor}40, transparent 55%), radial-gradient(circle at 80% 100%, #0f172a, transparent 55%)`,
              }}
            />

            <Canvas camera={{ position: [0, 1, 2], fov: 30 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[3, 5, 2]} intensity={1.4} />
              <directionalLight position={[-4, 2, -1]} intensity={0.5} />

              <LaptopModel />

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={7}
              />
            </Canvas>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================================
            SOBRE MÍ
          ============================================= */}
      <motion.section
        id="sobre-mi"
        className="w-full max-w-6xl mx-auto px-4 py-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-8">
          <motion.div variants={listVariants} className="space-y-4">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-semibold flex items-center gap-2"
            >
              <span className="text-sky-400">/</span> Sobre mí
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 leading-relaxed"
            >
              Soy desarrollador con experiencia en{" "}
              <span className="font-medium">
                backend, frontend, mobile y data
              </span>
              . Me enfoco en clean code, buenas prácticas y aprendizaje
              constante.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 leading-relaxed"
            >
              Disfruto construir aplicaciones completas: interfaces, APIs,
              bases de datos y dashboards, siempre buscando soluciones
              eficientes y escalables.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-5 rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md text-sm space-y-2 shadow-lg shadow-black/20"
          >
            <h3 className="font-semibold text-slate-100 mb-2">
              Resumen rápido
            </h3>
            <p>🎓 Full Stack / Mobile / Datos</p>
            <p>🧑‍💻 23 años</p>
            <p>🌎 Chile</p>
            <p>🗣 Español / Inglés avanzado</p>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================================
            SKILLS
          ============================================= */}
      <motion.section
        id="skills"
        className="w-full max-w-6xl mx-auto px-4 py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-semibold flex items-center gap-2"
        >
          <span className="text-sky-400">/</span> Habilidades técnicas
        </motion.h2>

        <motion.div
          variants={listVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          <SkillCard
            title="Backend"
            items={[
              { label: "Python", icon: <SiPython className="h-4 w-4" /> },
              { label: "Java" }, // sin icono porque SiJava no existe en tu versión
              { label: "PHP", icon: <SiPhp className="h-4 w-4" /> },
              { label: "Django", icon: <SiDjango className="h-4 w-4" /> },
              { label: "REST APIs" },
            ]}
          />

          <SkillCard
            title="Frontend"
            items={[
              { label: "HTML5", icon: <SiHtml5 className="h-4 w-4" /> },
              { label: "CSS3", icon: <SiCss3 className="h-4 w-4" /> },
              { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
              { label: "Angular", icon: <SiAngular className="h-4 w-4" /> },
              { label: "React", icon: <SiReact className="h-4 w-4" /> },
              { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
            ]}
          />

          <SkillCard
            title="Mobile"
            items={[
              { label: "React Native", icon: <SiReact className="h-4 w-4" /> },
              { label: "Expo", icon: <SiReact className="h-4 w-4" /> },
              { label: "Flutter", icon: <SiFlutter className="h-4 w-4" /> },
              { label: "Dart", icon: <SiDart className="h-4 w-4" /> },
            ]}
          />

          <SkillCard
            title="Bases de datos"
            items={[
              { label: "MySQL", icon: <SiMysql className="h-4 w-4" /> },
              { label: "SQL Server" },
              { label: "Firebase", icon: <SiFirebase className="h-4 w-4" /> },
            ]}
          />

          <SkillCard
            title="Data & BI"
            items={[
              { label: "Power BI", icon: <SiPowerbi className="h-4 w-4" /> },
              { label: "SQL" },
              { label: "Modelado de datos" },
            ]}
          />

          <SkillCard
            title="Otros"
            items={[
              { label: "Git", icon: <SiGit className="h-4 w-4" /> },
              { label: "GitHub", icon: <SiGithub className="h-4 w-4" /> },
              { label: "Trabajo en equipo" },
              { label: "Clean Code" },
            ]}
          />
        </motion.div>
      </motion.section>

      {/* =============================================
            PROYECTOS (GitHub)
          ============================================= */}
      <motion.section
        id="proyectos"
        className="w-full max-w-6xl mx-auto px-4 py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-semibold flex items-center gap-2"
        >
          <span className="text-sky-400">/</span> Proyectos & Experiencia
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-slate-300 mt-2 text-sm md:text-base"
        >
          Algunos de mis repos públicos de GitHub, ordenados por actividad
          reciente.
        </motion.p>

        <motion.div
          variants={listVariants}
          className="grid md:grid-cols-2 gap-6 mt-6"
        >
          {isLoadingRepos && (
            <>
              <SkeletonProjectCard />
              <SkeletonProjectCard />
            </>
          )}

          {reposError && (
            <motion.p
              variants={itemVariants}
              className="text-red-400 text-sm col-span-full"
            >
              {reposError}
            </motion.p>
          )}

          {!isLoadingRepos &&
            !reposError &&
            repos.map((repo) => (
              <ProjectCard
                key={repo.id}
                title={repo.name}
                description={
                  repo.description ?? "Repositorio sin descripción todavía."
                }
                tech={
                  repo.language
                    ? `${repo.language} · ⭐ ${repo.stargazers_count}`
                    : `⭐ ${repo.stargazers_count}`
                }
                url={repo.html_url}
              />
            ))}
        </motion.div>
      </motion.section>

      {/* =============================================
            CONTACTO (centrado)
          ============================================= */}
      <motion.section
        id="contacto"
        className="w-full max-w-6xl mx-auto px-4 py-14 text-center border-t border-slate-800/60"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-semibold flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <span className="text-sky-400">/</span> Contacto
        </motion.h2>

        <motion.p
          className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mt-2"
          variants={itemVariants}
        >
          ¿Quieres trabajar conmigo, colaborar en un proyecto o simplemente
          conversar? Estoy abierto a nuevas oportunidades y desafíos.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-6 text-sm md:text-base"
          variants={listVariants}
        >
          <motion.a
            href="mailto:joel.matamala48@gmail.com"
            className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 transition"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            📧 Enviar correo
          </motion.a>
          <motion.a
            href="https://github.com/joelmg19"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full border border-slate-600 hover:border-sky-400 transition"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            💻 GitHub
          </motion.a>
          <motion.a
            href="https://cl.linkedin.com/in/joel-francisco-matamala-gonzalez-176587224"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full border border-slate-600 hover:border-sky-400 transition"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            🔗 LinkedIn
          </motion.a>
        </motion.div>

        <motion.p
          className="text-xs text-slate-500 mt-6"
          variants={itemVariants}
        >
          Última actualización: {new Date().getFullYear()}
        </motion.p>
      </motion.section>
    </main>
  );
}

/* ===========================
   Componentes reutilizables
   =========================== */

function SkillCard({ title, items }: SkillCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-5 rounded-2xl bg-slate-900/30 border border-slate-700/60 backdrop-blur-md shadow-lg shadow-black/20"
    >
      <h3 className="font-semibold text-slate-100 flex items-center gap-2">
        {title}
      </h3>
      <ul className="text-slate-300 mt-2 space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.icon && (
              <span className="text-sky-400 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function ProjectCard({ title, description, tech, url }: ProjectCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-5 rounded-2xl block bg-slate-900/30 border border-slate-700/60 backdrop-blur-md shadow-lg shadow-black/20 hover:border-sky-500/60"
    >
      <h3 className="font-semibold text-slate-100">{title}</h3>
      <p className="text-slate-300 text-sm mt-1">{description}</p>
      <p className="text-sky-400 text-xs font-mono mt-2">{tech}</p>
    </motion.a>
  );
}

function SkeletonProjectCard() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-700/60 backdrop-blur-md shadow-lg shadow-black/20 animate-pulse space-y-3">
      <div className="h-4 w-1/3 bg-slate-700 rounded" />
      <div className="h-3 w-full bg-slate-800 rounded" />
      <div className="h-3 w-2/3 bg-slate-800 rounded" />
    </div>
  );
}
