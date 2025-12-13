import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAllPortfolioIds, getPortfolioById, getProfile } from "../../lib/portfolios";
import { Portfolio, Profile } from "../../@types/portfolio.types";

interface PortfolioPageProps {
  portfolio: Portfolio;
  profile: Profile;
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({ portfolio, profile }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  // Dynamic tab icons
  const tabIcons = ["🎯", "🔧", "⚡", "🎮", "💡", "🛠️", "📊", "🎨", "🔄", "📦"];

  // Generate tabs dynamically from portfolio sections
  const tabData = portfolio.sections?.map((section: any, idx: number) => ({
    id: section.title.toLowerCase().replace(/\s+/g, '-'),
    icon: tabIcons[idx % tabIcons.length],
    label: section.title
  })) || [];

  return (
    <>
      <Head>
        <title>{portfolio.title} - 포트폴리오</title>
        <meta name="description" content={portfolio.summary} />
      </Head>

      <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-white shadow-lg py-3" : "bg-white/95 backdrop-blur-sm py-4"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            {/* Back Button */}
            <Link href="/">
              <a className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">돌아가기</span>
              </a>
            </Link>

            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="text-2xl">🎮</span>
              <span>{portfolio.title.split("(")[0].trim()}</span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6">
              <li>
                <button onClick={() => scrollToSection("hero")} className="text-gray-600 hover:text-red-500 transition-colors">
                  홈
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("overview")} className="text-gray-600 hover:text-red-500 transition-colors">
                  개요
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("features")} className="text-gray-600 hover:text-red-500 transition-colors">
                  핵심 기능
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("tech")} className="text-gray-600 hover:text-red-500 transition-colors">
                  기술 스택
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("patterns")} className="text-gray-600 hover:text-red-500 transition-colors">
                  디자인 패턴
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("achievements")} className="text-gray-600 hover:text-red-500 transition-colors">
                  성과
                </button>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t mt-2 py-4 px-4">
              <ul className="flex flex-col gap-4">
                {["hero", "overview", "features", "tech", "patterns", "achievements"].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-gray-600 hover:text-red-500 transition-colors capitalize"
                    >
                      {section === "hero" ? "홈" : section === "overview" ? "개요" : section === "features" ? "핵심 기능" : section === "tech" ? "기술 스택" : section === "patterns" ? "디자인 패턴" : "성과"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  {portfolio.engine} | {portfolio.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {portfolio.title.split("(")[0]}
                  <br />
                  <span className="text-yellow-300">{portfolio.title.includes("(") ? portfolio.title.split("(")[1]?.replace(")", "") : ""}</span>
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  {portfolio.summary}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {(portfolio as any).hero?.stats?.map((stat: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                      <span className="text-2xl">{stat.icon}</span>
                      <div>
                        <h3 className="font-bold">{stat.label}</h3>
                        <p className="text-sm text-white/70">{stat.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection("overview")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    ▶️ 프로젝트 보기
                  </button>
                  {portfolio.links.video && (
                    <a
                      href={portfolio.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-800 transition-all"
                    >
                      📺 플레이 영상
                    </a>
                  )}
                  {portfolio.links.github && (
                    <a
                      href={portfolio.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-800 transition-all"
                    >
                      💻 GitHub
                    </a>
                  )}
                  {(portfolio.links as any).paper && (
                    <a
                      href={`${router.basePath}${(portfolio.links as any).paper}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-800 transition-all"
                    >
                      📄 논문 PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Game Preview */}
              <div className="hidden md:block">
                <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 ${(portfolio as any).info?.platform?.includes("Mobile") ? "max-w-xs mx-auto" : ""}`}>
                  <div className={`${(portfolio as any).info?.platform?.includes("Mobile") ? "aspect-[9/16]" : "aspect-video"} bg-gray-800/50 rounded-xl overflow-hidden`}>
                    <img
                      src={`${router.basePath}${(portfolio as any).hero?.titleImage || portfolio.thumbnail}`}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-center text-white/60 h-full flex items-center justify-center">
                      <div>
                        <span className="text-6xl mb-4 block">🖼️</span>
                        <p>게임 스크린샷</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto mb-2 flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
            </div>
            <p className="text-sm">스크롤 하세요</p>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Project Overview</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">게임 개요</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                {portfolio.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 min-h-[280px]">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  🎮
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">핵심 게임플레이</h3>
                <ul className="space-y-3 text-gray-600">
                  {portfolio.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 min-h-[280px]">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  🛠️
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">개발 환경</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span><strong>엔진:</strong> {(portfolio as any).info?.engine || portfolio.engine}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span><strong>기간:</strong> {(portfolio as any).info?.duration || (portfolio as any).duration || portfolio.periodDisplay}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span><strong>플랫폼:</strong> {(portfolio as any).info?.platform || portfolio.platform}</span>
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 min-h-[280px]">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  🏆
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">개발 성과</h3>
                <ul className="space-y-3 text-gray-600">
                  {portfolio.achievements.slice(0, 3).map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - Dynamic */}
        <section id="tech" className="py-20 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Technology Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">기술 스택</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                {portfolio.summary?.split('.')[0] || '프로젝트에 사용된 핵심 기술'}
              </p>
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min((portfolio as any).techStackGroups?.length || 4, 4)} gap-6`}>
              {(portfolio as any).techStackGroups?.map((group: any, groupIdx: number) => {
                const gradients = [
                  "from-cyan-500 to-blue-500",
                  "from-purple-500 to-pink-500",
                  "from-red-500 to-yellow-500",
                  "from-green-500 to-teal-500"
                ];
                return (
                  <div key={groupIdx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                      <span>{group.icon}</span> {group.title}
                    </h3>
                    <div className="space-y-3">
                      {group.items?.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className={`w-10 h-10 bg-gradient-to-br ${gradients[groupIdx % gradients.length]} rounded-lg flex items-center justify-center font-bold text-xs`}>
                            {item.abbr}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Core Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">핵심 기능 구현</h2>
              <p className="text-gray-600 mt-4">{portfolio.sections?.length || 0}가지 주요 시스템과 기술적 구현 상세</p>
            </div>

            {/* Feature Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabData.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {portfolio.sections && portfolio.sections[activeTab] && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Code Block */}
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                      <span className="text-gray-400 text-sm">
                        {(portfolio.sections[activeTab] as any).codeFile || `${portfolio.sections[activeTab].title}.cs`}
                      </span>
                      <span className="text-xs text-cyan-400">C#</span>
                    </div>
                    <pre className="p-4 text-sm text-gray-300 overflow-x-auto" style={{ maxHeight: "500px", fontFamily: "'Fira Code', monospace" }}>
                      <code>{(portfolio.sections[activeTab] as any).code || `// ${portfolio.sections[activeTab].title} 구현 코드`}</code>
                    </pre>
                  </div>

                  {/* Feature Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {activeTab + 1}. {portfolio.sections[activeTab].title}
                    </h3>
                    <div className="prose prose-gray">
                      {portfolio.sections[activeTab].content.split("\n").map((line, idx) => {
                        if (line.startsWith("###") || line.startsWith("####")) {
                          return (
                            <h4 key={idx} className="text-lg font-semibold text-red-500 mt-4 mb-2 flex items-center gap-2">
                              <span>→</span> {line.replace(/^#+\s*/, "")}
                            </h4>
                          );
                        }
                        if (line.startsWith("-")) {
                          return (
                            <p key={idx} className="flex items-start gap-2 text-gray-600 mb-1 ml-4">
                              <span className="text-cyan-500">•</span>
                              {line.replace("-", "").trim()}
                            </p>
                          );
                        }
                        if (line.trim()) {
                          return (
                            <p key={idx} className="text-gray-600 mb-2">
                              {line}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Design Patterns Section */}
        <section id="patterns" className="py-20 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Design Patterns</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">디자인 패턴</h2>
              <p className="text-gray-400 mt-4">확장 가능하고 유지보수하기 쉬운 코드 아키텍처</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolio.designPatterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto">
                    {idx === 0 ? "👑" : idx === 1 ? "👁️" : idx === 2 ? "📊" : "♻️"}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{pattern.pattern}</h3>
                  <p className="text-gray-400 text-center text-sm mb-4">{pattern.usage}</p>
                  <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
                    <span>✓</span>
                    <span>적용 완료</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Achievements</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">주요 성과</h2>
              <p className="text-gray-400 mt-4">프로젝트를 통해 달성한 기술적 성과와 학습 내용</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 기술적 성과 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                  🚀
                </div>
                <h3 className="text-xl font-bold mb-4">기술적 성과</h3>
                <ul className="space-y-3">
                  {portfolio.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-400">★</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 배운점 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                  📚
                </div>
                <h3 className="text-xl font-bold mb-4">배운점</h3>
                <ul className="space-y-3 text-gray-300">
                  {(portfolio as any).lessonsLearned?.map((lesson: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-400">★</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Screenshots & Videos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">게임 미디어</h2>
              <p className="text-gray-600 mt-4">게임 플레이 스크린샷과 영상</p>
            </div>

            {/* Screenshots - 모바일 게임은 세로형, 나머지는 가로형 */}
            {(portfolio as any).info?.platform?.includes("Mobile") ? (
              // 모바일 게임 (세로형 이미지) - History
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {(portfolio as any).hero?.media?.images?.map((imgSrc: string, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 w-48 sm:w-56">
                    <div className="aspect-[9/16] bg-gray-100 overflow-hidden">
                      <img
                        src={`${router.basePath}${imgSrc}`}
                        alt={`스크린샷 ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden text-center text-gray-400 h-full flex items-center justify-center">
                        <div>
                          <span className="text-4xl block mb-2">🖼️</span>
                          <p className="font-medium">스크린샷 {idx + 1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // PC 게임 (가로형 이미지)
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-8">
                {(portfolio as any).hero?.media?.images?.map((imgSrc: string, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 w-full max-w-sm">
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={`${router.basePath}${imgSrc}`}
                        alt={`스크린샷 ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden text-center text-gray-400 h-full flex items-center justify-center">
                        <div>
                          <span className="text-4xl block mb-2">🖼️</span>
                          <p className="font-medium">스크린샷 {idx + 1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* YouTube Video - 가운데 정렬 */}
            {portfolio.links.video && (
              <div className="flex justify-center">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 w-full max-w-3xl">
                  <div className="aspect-video bg-gray-900 overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${portfolio.links.video.includes('youtu.be')
                        ? portfolio.links.video.split('youtu.be/')[1]?.split('?')[0]
                        : portfolio.links.video.split('v=')[1]?.split('&')[0]}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="플레이 영상"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🎮</span> {portfolio.title}
                </h3>
                <p className="text-gray-400">{portfolio.engine}로 개발한 {portfolio.subtitle} 포트폴리오</p>
                <p className="text-gray-500 mt-4">© {portfolio.period} All Rights Reserved</p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">프로젝트 링크</h4>
                <ul className="space-y-2">
                  {portfolio.links.github && (
                    <li>
                      <a href={portfolio.links.github} className="text-gray-400 hover:text-white flex items-center gap-2">
                        💻 GitHub Repository
                      </a>
                    </li>
                  )}
                  {portfolio.links.video && (
                    <li>
                      <a href={portfolio.links.video} className="text-gray-400 hover:text-white flex items-center gap-2">
                        📺 Play Video
                      </a>
                    </li>
                  )}
                  {(portfolio.links as any).paper && (
                    <li>
                      <a href={`${router.basePath}${(portfolio.links as any).paper}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2">
                        📄 논문 PDF
                      </a>
                    </li>
                  )}
                  <li>
                    <Link href="/">
                      <a className="text-gray-400 hover:text-white flex items-center gap-2">
                        🏠 홈으로 돌아가기
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
            scrolled ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          ↑
        </button>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllPortfolioIds();
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const portfolio = getPortfolioById(params?.id as string);
  const profile = getProfile();

  if (!portfolio) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      portfolio,
      profile,
    },
  };
};

export default PortfolioPage;
