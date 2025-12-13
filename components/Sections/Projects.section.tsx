import Link from "next/link";
import { Portfolio } from "../../@types/portfolio.types";

interface ProjectsProps {
  portfolios: Portfolio[];
}

const Projects = ({ portfolios }: ProjectsProps) => {
  const sortedPortfolios = [...portfolios].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="my-16 px-3 font-sen" id="projects">
      <p className="text-3xl font-bold text-white">Portfolios</p>
      <div className="my-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPortfolios.map((portfolio, index) => (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`} passHref>
            <a className="group cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-gray-900 transition-all duration-200 hover:border-gray-500 hover:shadow-lg">
              <div
                className="relative h-32 w-full"
                style={{
                  background: `linear-gradient(135deg, ${portfolio.gradient[0]}, ${portfolio.gradient[1] || portfolio.gradient[0]}, ${portfolio.gradient[2] || portfolio.gradient[0]})`,
                }}
              >
                <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-sm font-bold text-white">
                  #{index + 1}
                </span>
                <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-xs text-gray-200">
                  {portfolio.periodDisplay}
                </span>
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-white group-hover:text-gray-200">
                  {portfolio.title}
                </p>
                <p className="mt-1 text-sm text-gray-400">{portfolio.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {portfolio.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
