import CTA from "@/components/custom/CTA";
import Footer from "@/components/custom/Footer";
import Heading from "@/components/custom/Heading";
import Navbar from "@/components/custom/Navbar";
import TopContributors from "@/components/custom/TopContributors"; 
import LazyLoadedEmbeddedEditorial from "@/components/custom/LazyLoadedEmbeddedEditorial";

export default function Home() {
  return (
    <div className="items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-slate-800">
      <Navbar />
      <Heading />
      <CTA />
      <div className="sm:grid sm:grid-cols-12 mt-32">
        <LazyLoadedEmbeddedEditorial />
        <TopContributors />
      </div>
      <Footer />
    </div>
  );
}
