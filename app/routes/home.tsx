import type { Route } from "./+types/home";
import Navbar from "../components/Navbar"
import { ArrowRight,Layers } from "lucide-react";
import Button from "~/components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
   <div className="home">
    <Navbar/>
   <section className="hero">
    <div className="announce">
      <div className="dot">
        <div className="pulse"></div>
      </div>
      <p>Introducing Roomify 2.0</p>
    </div>
    <h1>Build beautiful spaces at the speed of throught with Roomify</h1>
 <p className="subtitle">
   Roomify is an Ai-first design environment that helps you visualize, render, and ship architecturalprojects faster than ever.
 </p>
 <div className="actions">
  <a href="#upload" className="cta">
    Start Building <ArrowRight
     className="icon"/>
  </a>
  <Button variant="secondary" size="lg" className="demo">
    Watch Demo
  </Button>
 </div>
 <div id="upload" className="upload-shell">
  <div className="grid-overlay"/>
  <div className="upload-card">
    <div className="upload-head">
      <div className="upload-icon">
      <Layers className="icons"/>
      </div>

      <h3>Upload your floor plan</h3>
      <p>Support JPG,PNG, formates up to 10MB</p>
    </div>
    <p>Upload images</p>
  </div>

 </div>
   </section>
   </div>
  )
}
