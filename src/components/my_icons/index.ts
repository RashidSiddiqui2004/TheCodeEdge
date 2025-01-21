
import { SiLeetcode } from "react-icons/si";
import { SiCodechef } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export const my_icons = {
    SiLeetcode, SiCodechef, SiCodeforces, CiLinkedin, FaGithub
};

export const PlatformIconMap: Record<string, React.ElementType> = {
    "github": FaGithub,
    "linkedin": CiLinkedin,
    "leetcode": SiLeetcode,
    "codechef": SiCodechef,
    "codeforces": SiCodeforces,
};