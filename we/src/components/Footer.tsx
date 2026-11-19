export default function Footer() {
  return (
    <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-40 text-center text-[10px] text-white/50">
      <span className="pointer-events-auto">
        © {new Date().getFullYear()} WE ARE GABÈS · Conçu et développé par{" "}
        <a
          href="https://portfolio-hamza-pied.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          Hamza Adouani
        </a>
      </span>
    </div>
  );
}