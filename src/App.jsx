import React, { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function useTypewriter(words = [], speed = 100, pause = 1200) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    if (words.length === 0) return

    if (subIndex === words[index].length + 1 && !deleting) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting, words, speed, pause])

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500)
    return () => clearInterval(blinkInterval)
  }, [])

  const text = useMemo(() => words[index]?.substring(0, subIndex) || '', [index, subIndex, words])
  return { text, cursorVisible: blink }
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-lime-300/60 shadow-[0_0_40px_rgba(163,230,53,0.25)]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white ring-2 ring-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.65)]" />
              <span className="text-xl font-semibold tracking-tight text-gray-900">Erthaloka</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-gray-700">
              <a href="#ecosystem" className="hover:text-gray-900 transition-colors">Ecosystem</a>
              <a href="#dao" className="hover:text-gray-900 transition-colors">DAO</a>
              <a href="#innovation" className="hover:text-gray-900 transition-colors">Innovation</a>
              <a href="#connect" className="hover:text-gray-900 transition-colors">Connect</a>
            </nav>
            <a href="#community" className="relative group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <span className="absolute inset-0 rounded-full bg-lime-300 blur-lg opacity-60 group-hover:opacity-80 transition" />
              <span className="relative rounded-full bg-black text-white px-4 py-2 shadow-[0_0_25px_rgba(163,230,53,0.7)] ring-1 ring-lime-300/80">Join</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function Announcement() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-full p-[2px]">
        {/* Animated gradient border */}
        <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgba(163,230,53,0.4),rgba(34,197,94,0.4),rgba(163,230,53,0.4))]" />
        <div className="relative rounded-full bg-white/80 backdrop-blur-xl ring-1 ring-lime-300/60 px-5 py-2 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            <span className="mr-2 inline-flex items-center rounded-full bg-lime-100 px-2 py-0.5 text-lime-700 ring-1 ring-lime-300">New</span>
            Introducing Erthaloka Wallet!
          </div>
          <a href="#community" className="text-sm font-semibold text-gray-900 hover:text-black transition-colors">Learn more →</a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const { text, cursorVisible } = useTypewriter([
    'Regenerative finance for planet-positive outcomes',
    'Tools that align people, planet, and purpose',
    'Open protocols for a circular, equitable future',
  ], 26, 1400)

  return (
    <section className="relative min-h-[92vh] pt-28">
      {/* Spline cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vi0ijCQQJTRFc8LA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft white overlay to keep the theme bright and readable */}
      <div className="pointer-events-none absolute inset-0 bg-white/70" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          <Announcement />
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Sustainability x Technology x Community
          </h1>
          <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl">
            {text}
            <span className={`ml-1 inline-block w-2 align-baseline ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
          </p>

          <div className="relative mt-4">
            <a href="#community" className="group inline-flex items-center gap-3 rounded-full px-7 py-3">
              <span className="absolute inset-0 rounded-full bg-lime-300 blur-2xl opacity-70 group-hover:opacity-90 transition" />
              <span className="relative rounded-full bg-black text-white px-7 py-3 text-base font-semibold shadow-[0_0_40px_rgba(163,230,53,0.75)] ring-1 ring-lime-300/80">
                Join the Community
              </span>
            </a>
          </div>

          {/* Neon framed card */}
          <div className="mt-10 w-full max-w-4xl rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-lime-300/60 shadow-[0_0_60px_rgba(163,230,53,0.35)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-lime-200/60">
              {[
                { title: 'Low Impact', desc: 'Optimized, energy-aware protocols' },
                { title: 'Open & Fair', desc: 'Community-first governance' },
                { title: 'Future-Ready', desc: 'Composable, modular tooling' },
              ].map((item) => (
                <div key={item.title} className="p-6">
                  <p className="text-sm uppercase tracking-wider text-lime-700/80">{item.title}</p>
                  <p className="mt-1 text-gray-800 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* soft vignette edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
    </section>
  )
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>}
        </div>
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-lime-300/60 shadow-[0_0_50px_rgba(163,230,53,0.25)]">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-lime-200 selection:text-gray-900">
      <Header />
      <Hero />

      <Section
        id="ecosystem"
        title="Ecosystem"
        subtitle="A network of regenerative tools, protocols, and partners unlocking circular value flows."
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { h: 'Green Identity', p: 'Verifiable climate credentials for people and orgs.' },
            { h: 'Impact Oracles', p: 'On-chain data bridges for real-world outcomes.' },
            { h: 'Climate Markets', p: 'Transparent, programmable impact assets.' },
          ].map((card) => (
            <li key={card.h} className="group rounded-2xl p-5 ring-1 ring-lime-300/70 bg-white/70 shadow-[0_0_30px_rgba(163,230,53,0.20)] hover:shadow-[0_0_50px_rgba(163,230,53,0.35)] transition">
              <h3 className="font-semibold text-gray-900">{card.h}</h3>
              <p className="mt-1 text-gray-700">{card.p}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="dao" title="DAO" subtitle="Transparent governance that centers community wisdom and shared stewardship.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { h: 'Proposals', p: 'Open, deliberative pathways for resource allocation.' },
            { h: 'Quadratic Voting', p: 'Amplify signals, reduce capture.' },
            { h: 'Treasury', p: 'Regenerative flywheel for public-good innovation.' },
          ].map((c) => (
            <div key={c.h} className="rounded-2xl ring-1 ring-lime-300/70 bg-white/70 p-6">
              <h4 className="font-semibold">{c.h}</h4>
              <p className="mt-1 text-gray-700">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="innovation" title="Innovation" subtitle="Where nature-inspired design meets modern cryptography and open tooling.">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl ring-1 ring-lime-300/70 bg-white/70 p-6">
            <p className="text-gray-700">
              From ZK attestations to energy-aware consensus, the stack is built for
              efficiency, interoperability, and real-world verifiability. Build with
              SDKs, templates, and APIs that make climate-positive products faster.
            </p>
          </div>
        </div>
      </Section>

      <Section id="connect" title="Connect" subtitle="Come build with us—researchers, creators, communities.">
        <div id="community" className="flex flex-col sm:flex-row items-center gap-6">
          <input
            type="email"
            placeholder="you@planet.xyz"
            className="w-full sm:w-auto flex-1 rounded-full border border-lime-300/80 bg-white/70 px-5 py-3 outline-none focus:ring-2 focus:ring-lime-400/80"
          />
          <button className="relative group inline-flex items-center gap-2 rounded-full px-6 py-3">
            <span className="absolute inset-0 rounded-full bg-lime-300 blur-2xl opacity-70 group-hover:opacity-90 transition" />
            <span className="relative rounded-full bg-black text-white px-6 py-3 font-semibold ring-1 ring-lime-300/80 shadow-[0_0_30px_rgba(163,230,53,0.7)]">
              Join the Community
            </span>
          </button>
        </div>
      </Section>

      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Erthaloka — for people, planet, and purpose.
          </div>
        </div>
      </footer>
    </div>
  )
}
