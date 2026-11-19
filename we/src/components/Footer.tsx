export default function Footer() {
  return (
    <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-40 flex justify-center px-3 text-[10px]">
      <span className="pointer-events-auto rounded-full border border-white/10 bg-[#060b14]/80 px-3 py-1 text-stone-300 backdrop-blur-sm">
        © {new Date().getFullYear()} WE ARE GABÈS · Conçu et développé par{" "}
        <a
          href="https://portfolio-hamza-pied.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-2 hover:text-[#5eead4]"
        >
          Hamza Adouani
        </a>
      </span>
    </div>
  );
}