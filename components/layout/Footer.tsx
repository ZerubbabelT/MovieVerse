import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react"; // modern arrow icon

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t text-center text-muted-foreground text-sm flex flex justify-center items-center gap-2">
      <p>
        © {new Date().getFullYear()} Created by{" "}
        <a
          href="https://github.com/ZerubbabelT/MovieVerse"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          Zerubbabel
        </a>
      </p>

      <a
        href="https://github.com/ZerubbabelT/MovieVerse"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-1 text-foreground hover:text-primary transition-colors"
      >
        <FaGithub className="w-5 h-5" />
        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
      </a>
    </footer>
  );
};

export default Footer;
