export const metadata = {
  title: "Press & Features",
  description: "Press mentions and features for Reflections.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-12">
      <main className="container max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          Press & Features
        </h1>
        <p className="text-gray-600 mb-10">
          Media mentions, interviews, and features.
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <p className="text-gray-600">
            No press features yet. Check back soon!
          </p>
        </div>
      </main>
    </div>
  );
}
