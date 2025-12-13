import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "../Misc/Icons.collection";
import { Profile } from "../../@types/portfolio.types";

interface AboutProps {
  profile: Profile;
}

const About = ({ profile }: AboutProps) => {
  return (
    <div className="my-8 flex flex-row items-center justify-between px-3 font-sen">
      <div>
        <p className="text-3xl font-bold text-white">{profile.name}</p>
        <p className="mt-1 text-lg text-gray-300">{profile.title}</p>

        <p className="mt-4 text-gray-400">{profile.description}</p>

        {profile.links.github && (
          <Link href={profile.links.github} passHref>
            <a
              className="mt-4 flex cursor-pointer flex-row items-center gap-1 font-jost text-xl text-gray-400 duration-100 hover:ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        )}

        {profile.links.blog && (
          <Link href={profile.links.blog} passHref>
            <a
              className="mt-2 flex cursor-pointer flex-row items-center gap-1 font-jost text-xl text-gray-400 duration-100 hover:ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        )}

        {profile.links.email && (
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.links.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex cursor-pointer flex-row items-center gap-1 font-jost text-xl text-gray-400 duration-100 hover:ml-2"
          >
            Contact
            <HiOutlineArrowNarrowRight />
          </a>
        )}
      </div>

      <div className="hidden custom:block">
        <Image
          src={profile.avatar || "/assets/avatar.png"}
          width="112"
          height="112"
          className="rounded-full"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default About;
