import Footer from "./footer";
import NavBar from "./navbar";

interface PageContinerProps {
  children: React.ReactNode;
}

const PageContiner = ({ children }: PageContinerProps) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default PageContiner;
