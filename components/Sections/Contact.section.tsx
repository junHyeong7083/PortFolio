import type { NextComponentType } from "next";

import {
  MdEmail,
  AiOutlineGithub,
} from "../Misc/Icons.collection";

import { Icon } from "../Misc/Icon.component";

const Contact: NextComponentType = () => {
  return (
    <div className="px-3 font-sen" id="contact">
      <p className="text-3xl font-bold text-white">Get in touch</p>

      <div className="my-8 flex flex-row justify-center gap-x-4">
        <Icon icon={<AiOutlineGithub />} url="https://github.com/junHyeong7083" />

        <Icon icon={<MdEmail />} url="https://mail.google.com/mail/?view=cm&fs=1&to=parkjunhyeong0902@gmail.com" />
      </div>
    </div>
  );
};

export default Contact;
