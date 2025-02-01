import CTA from "@/components/custom/CTA";
import Footer from "@/components/custom/Footer";
import Heading from "@/components/custom/Heading";
import Navbar from "@/components/custom/Navbar";
import TopContributors from "@/components/custom/TopContributors";
import LazyLoadedEmbeddedEditorial from "@/components/custom/LazyLoadedEmbeddedEditorial";
import Sponsors from "@/components/custom/Sponsors";

export default function Home() {
  return (
    <div className="items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-slate-800">
      <Navbar />
      <Heading />
      <CTA />
      <div className="sm:grid sm:grid-cols-12 mt-32 mr-2">
        <LazyLoadedEmbeddedEditorial />
        <div className="col-span-4 flex flex-col gap-2 flex-grow h-full">
          <TopContributors /> 
          <Sponsors/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
