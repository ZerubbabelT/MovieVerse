const Footer = () => {
  return (
    <footer className="w-full py-6 border-t text-center text-muted-foreground text-sm">
      <p>
        © {new Date().getFullYear()} Created by{" "}
        <span className="font-semibold text-primary">Zerubbabel</span>
      </p>
    </footer>
  );
};

export default Footer;
