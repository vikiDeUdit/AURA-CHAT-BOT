import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0 footer footer-center text-gray-400 text-xs p-1 md:p-2 md:text-md">
        <aside>
          <Link to="https://viki.ai" target="_blank">
            &copy; {new Date().getFullYear()} - A product from{" "}
            <b className="mx-1">Viki.ai Pvt. Ltd.</b>
          </Link>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
