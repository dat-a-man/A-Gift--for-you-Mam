export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#faf9f6] py-8">
      <div className="container max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Reflections
        </p>
      </div>
    </footer>
  );
}
