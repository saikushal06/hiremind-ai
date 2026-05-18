import { useState } from "react";
import { analyzeResume } from "./gemini";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);

  const handleAnalyze = async () => {

  if (!file) {
    alert("Please upload a resume PDF.");
    return;
  }

  setLoading(true);

  try {

    const fileReader = new FileReader();

    fileReader.onload = async function () {

      try {

        const typedArray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument({
          data: typedArray,
        }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {

          const page = await pdf.getPage(i);

          const content = await page.getTextContent();

          const strings = content.items.map((item) => item.str);

          text += strings.join(" ");
        }

        const prompt = `
        Analyze this resume for placement preparation.

        Resume Content:
        ${text}

        Give:
        1. ATS Score
        2. Missing Skills
        3. Interview Suggestions
        4. Improvement Tips

        Make the response professional and structured.
        `;

        const result = await analyzeResume(prompt);

        setResponse(result);

      } catch (error) {

        console.error("Resume analysis error:", error);

        setResponse(
  "Gemini API quota is temporarily exhausted. Please wait a few minutes and try again. The resume upload, PDF extraction, and AI request pipeline are working correctly."
);

      } finally {

        setLoading(false);
      }
    };

    fileReader.readAsArrayBuffer(file);

  } catch (error) {

    console.error(error);

    setResponse("Something went wrong.");

    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-400">
          HireMind AI
        </h1>

        <button
  onClick={() =>
    document
      .getElementById("resume-section")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl transition"
>
  Get Started
</button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-4">

        <h1 className="text-6xl font-extrabold leading-tight max-w-5xl">
          From Resume to Offer Letter —
          <span className="text-blue-400"> Guided by AI.</span>
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl">
          HireMind AI helps students analyze resumes,
          prepare for interviews, identify skill gaps,
          and become placement ready using AI agents.
        </p>

        <div className="flex gap-6 mt-10">
          <button
  onClick={() =>
    document
      .getElementById("resume-section")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold transition"
>
  Try Now
</button>

          <button className="border border-gray-600 hover:border-blue-400 px-8 py-4 rounded-2xl text-lg transition">
            Watch Demo
          </button>
        </div>

      </section>
{/* Features Section */}
<section
  id="resume-section"
  className="px-10 py-24"
>

  <h2 className="text-5xl font-bold text-center mb-16">
    Powerful AI Features
  </h2>

  <div className="grid md:grid-cols-3 gap-10">

    {/* Card 1 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 hover:border-blue-500 transition">

      <div className="text-5xl mb-6">📄</div>

      <h3 className="text-2xl font-bold mb-4">
        Resume Analyzer
      </h3>

      <p className="text-gray-400 leading-7">
        Upload resumes and receive ATS scores,
        improvement suggestions, and AI-powered
        feedback instantly.
      </p>

    </div>

    {/* Card 2 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 hover:border-blue-500 transition">

      <div className="text-5xl mb-6">🎤</div>

      <h3 className="text-2xl font-bold mb-4">
        AI Interview Coach
      </h3>

      <p className="text-gray-400 leading-7">
        Generate HR, technical, and behavioral
        interview questions tailored to your
        target role and company.
      </p>

    </div>

    {/* Card 3 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 hover:border-blue-500 transition">

      <div className="text-5xl mb-6">📈</div>

      <h3 className="text-2xl font-bold mb-4">
        Skill Gap Detection
      </h3>

      <p className="text-gray-400 leading-7">
        Discover missing skills, get learning
        roadmaps, and track your placement
        readiness with AI insights.
      </p>

    </div>

  </div>

</section>
{/* AI Workflow Section */}
<section className="px-10 py-24">

  <h2 className="text-5xl font-bold text-center mb-20">
    How HireMind AI Works
  </h2>

  <div className="flex flex-col md:flex-row items-center justify-center gap-8">

    {/* Step 1 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl text-center w-64 border border-gray-800">

      <div className="text-5xl mb-4">📄</div>

      <h3 className="text-2xl font-bold mb-3">
        Upload Resume
      </h3>

      <p className="text-gray-400">
        Upload your resume securely to begin AI analysis.
      </p>

    </div>

    <div className="text-4xl text-blue-400">→</div>

    {/* Step 2 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl text-center w-64 border border-gray-800">

      <div className="text-5xl mb-4">🤖</div>

      <h3 className="text-2xl font-bold mb-3">
        AI Analysis
      </h3>

      <p className="text-gray-400">
        AI identifies strengths, weaknesses, and missing skills.
      </p>

    </div>

    <div className="text-4xl text-blue-400">→</div>

    {/* Step 3 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl text-center w-64 border border-gray-800">

      <div className="text-5xl mb-4">🎯</div>

      <h3 className="text-2xl font-bold mb-3">
        Interview Prep
      </h3>

      <p className="text-gray-400">
        Get role-specific interview questions and AI guidance.
      </p>

    </div>

    <div className="text-4xl text-blue-400">→</div>

    {/* Step 4 */}
    <div className="bg-[#0f172a] p-8 rounded-3xl text-center w-64 border border-gray-800">

      <div className="text-5xl mb-4">🏆</div>

      <h3 className="text-2xl font-bold mb-3">
        Get Hired
      </h3>

      <p className="text-gray-400">
        Track placement readiness and improve career success.
      </p>

    </div>

  </div>

</section>
{/* Stats Section */}
<section className="px-10 py-24">

  <div className="bg-[#0f172a] rounded-[40px] p-16 border border-gray-800">

    <div className="grid md:grid-cols-4 gap-10 text-center">

      {/* Stat 1 */}
      <div>
        <h1 className="text-5xl font-extrabold text-blue-400">
          10K+
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Resumes Analyzed
        </p>
      </div>

      {/* Stat 2 */}
      <div>
        <h1 className="text-5xl font-extrabold text-blue-400">
          5K+
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Interview Sessions
        </p>
      </div>

      {/* Stat 3 */}
      <div>
        <h1 className="text-5xl font-extrabold text-blue-400">
          92%
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Placement Readiness
        </p>
      </div>

      {/* Stat 4 */}
      <div>
        <h1 className="text-5xl font-extrabold text-blue-400">
          24/7
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          AI Career Guidance
        </p>
      </div>

    </div>

  </div>

</section>
{/* Dashboard Preview Section */}
<section className="px-10 py-24">

  <h2 className="text-5xl font-bold text-center mb-20">
    AI Career Dashboard
  </h2>

  <div className="bg-[#0f172a] border border-gray-800 rounded-[40px] p-10">

    <div className="grid md:grid-cols-2 gap-10">

      {/* Left Side */}
      <div className="space-y-6">

        {/* Resume Score */}
        <div className="bg-[#111827] p-6 rounded-3xl">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">
              Resume Score
            </h3>

            <span className="text-blue-400 text-3xl font-bold">
              88%
            </span>
          </div>

          <div className="w-full bg-gray-700 h-4 rounded-full">

            <div className="bg-blue-500 h-4 rounded-full w-[88%]"></div>

          </div>

        </div>

        {/* Skill Gaps */}
        <div className="bg-[#111827] p-6 rounded-3xl">

          <h3 className="text-2xl font-bold mb-6">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-4">

            <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full">
              System Design
            </span>

            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
              DSA
            </span>

            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
              SQL
            </span>

            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              Communication
            </span>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="bg-[#111827] p-8 rounded-3xl">

        <h3 className="text-2xl font-bold mb-6">
          AI Suggestions
        </h3>

        <div className="space-y-5">

          <div className="border border-gray-700 rounded-2xl p-5">
            ✅ Improve project descriptions using action verbs.
          </div>

          <div className="border border-gray-700 rounded-2xl p-5">
            ✅ Add SQL and DBMS skills for better ATS ranking.
          </div>

          <div className="border border-gray-700 rounded-2xl p-5">
            ✅ Practice behavioral interview questions regularly.
          </div>

          <div className="border border-gray-700 rounded-2xl p-5">
            ✅ Build one strong full-stack project to stand out.
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* Resume Upload Section */}
<section className="px-10 py-24">

  <h2 className="text-5xl font-bold text-center mb-16">
    Analyze Your Resume
  </h2>

  <div className="max-w-4xl mx-auto bg-[#0f172a] border border-gray-800 rounded-[40px] p-12 text-center">

    <div className="text-7xl mb-8">
      📄
    </div>

    <h3 className="text-3xl font-bold mb-6">
      Upload Resume for AI Analysis
    </h3>

    <p className="text-gray-400 text-lg mb-10">
      Get ATS scores, missing skills, interview guidance,
      and personalized AI suggestions instantly.
    </p>

    <input
  type="file"
  accept=".pdf"
  onChange={(e) => setFile(e.target.files[0])}
  className="mb-8 block mx-auto text-gray-400"
/>

    <button
  onClick={handleAnalyze}
  disabled={loading}
  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 px-10 py-4 rounded-2xl text-lg font-semibold transition flex items-center justify-center gap-3 mx-auto"
>
  {loading && (
    <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
  )}

  {loading ? "AI is analyzing..." : "Analyze Resume"}
</button>
{response && (

  <div className="mt-10 bg-[#111827] p-8 rounded-3xl text-left border border-gray-700">

    <h3 className="text-2xl font-bold mb-6 text-blue-400">
      AI Analysis Result
    </h3>

    <div className="text-gray-300 whitespace-pre-line leading-8 space-y-4">

  {response.split("\n").map((line, index) => (

    <div
      key={index}
      className={`p-3 rounded-xl ${
        line.includes("ATS Score")
          ? "bg-blue-500/10 border border-blue-500/20"
          : line.includes("Missing Skills")
          ? "bg-red-500/10 border border-red-500/20"
          : line.includes("Interview Suggestions")
          ? "bg-yellow-500/10 border border-yellow-500/20"
          : line.includes("Improvement Tips")
          ? "bg-green-500/10 border border-green-500/20"
          : ""
      }`}
    >
      {line}
    </div>

  ))}

</div>
  </div>

)}

  </div>

</section>
{/* Footer */}
<footer className="px-10 py-10 border-t border-gray-800 text-center">

  <h2 className="text-2xl font-bold text-blue-400 mb-3">
    HireMind AI
  </h2>

  <p className="text-gray-400 mb-4">
    From Resume to Offer Letter — Guided by AI.
  </p>

  <p className="text-gray-500 text-sm">
    © 2026 HireMind AI. Built for AI Hackathon.
  </p>

</footer>
    </div>
  )
}
export default App