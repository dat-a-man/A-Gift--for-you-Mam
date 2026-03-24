import { ContactForm } from "@/components/organisms/contact-form";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Reflections.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-12">
      <main className="container max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">Contact</h1>
        <p className="text-gray-600 mb-10">
          Have a question or want to say hello? Send me a message.
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <ContactForm hideHeader />
        </div>
      </main>
    </div>
  );
}
