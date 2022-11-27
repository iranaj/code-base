import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Image
            src="/dioLogo.svg"
            alt="dio logo"
            width={100}
            height={100}
            layout="fixed"
          />
        </div>
        <div className="footer__links">
          <ul>
            <li>
              <a href="https://diosf.com/">Home</a>
            </li>
            <li>
              <a href="https://diosf.com/about">About</a>
            </li>
            <li>
              <a href="https://diosf.com/contact">Contact</a>
            </li>
            <li>
              <a href="https://diosf.com/privacy">Privacy</a>
            </li>
            <li>
              <a href="https://diosf.com/terms">Terms</a>
            </li>
          </ul>
        </div>
        <div className="footer__social">
          <ul>
            <li>
              <a href="https://www.facebook.com/diosf">
                <Image
                  src="/facebook.svg"
                  alt="facebook"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/diosf">
                <Image
                  src="/instagram.svg"
                  alt="instagram"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/diosf">
                <Image
                  src="/linkedin.svg"
                  alt="linkedin"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UC3q3f3l3oQ2Jl1GjK9X9cIw">
                <Image
                  src="/youtube.svg"
                  alt="youtube"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
