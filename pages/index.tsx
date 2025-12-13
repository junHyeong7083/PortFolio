import type { GetStaticProps, NextPage } from "next";
import { Header, Contact } from "../components";
import About from "../components/Sections/About.section";
import Skills from "../components/Sections/Skills.section";
import Projects from "../components/Sections/Projects.section";
import { getProfile, getAllPortfolios } from "../lib/portfolios";
import { Profile, Portfolio } from "../@types/portfolio.types";

interface HomeProps {
  profile: Profile;
  portfolios: Portfolio[];
}

const Home: NextPage<HomeProps> = ({ profile, portfolios }) => {
  return (
    <div className="px-2 sm:px-8 md:px-24 lg:px-48 xl:px-72">
      <Header />
      <About profile={profile} />
      <Skills profile={profile} />
      <Projects portfolios={portfolios} />
      <Contact />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const profile = getProfile();
  const portfolios = getAllPortfolios();

  return {
    props: {
      profile,
      portfolios,
    },
  };
};

export default Home;
