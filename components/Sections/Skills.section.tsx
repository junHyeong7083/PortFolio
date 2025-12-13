import { BsArrowRightShort } from "../Misc/Icons.collection";
import { Profile } from "../../@types/portfolio.types";

interface SkillsProps {
  profile: Profile;
}

const Skills = ({ profile }: SkillsProps) => {
  return (
    <div className="my-16 px-3 font-sen text-white" id="skills">
      <p className="text-3xl font-bold text-white">Skills</p>

      <div className="my-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((skillGroup) => (
          <div key={skillGroup.category} className="rounded-lg border border-gray-700 p-4">
            <p className="mb-3 text-lg font-semibold text-white">
              {skillGroup.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
