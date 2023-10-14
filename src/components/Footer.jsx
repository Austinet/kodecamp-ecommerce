import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-center py-4 md:py-5 ">
      <p className="text-white">
        <Link
          to={"https://Austinet.github.io/portfolio"}
          className="hover:text-blue-400"
        >
          &copy; 2023 Kodecamp Ecommerce
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
