import Link from "next/link";
import { getCategoriesWithCount } from "@/lib/sanity.queries";

export async function Sidebar() {
  const categories = await getCategoriesWithCount();

  return (
    <aside className="w-full md:w-80 space-y-8 flex-shrink-0">
      {/* Bio Section */}
      <div className="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
          So here I am...
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          ...also known as Reflections. I've travelled the world, seen the changes, and lived to tell the tale. Now I'm blogging about the fun and nonsense of being ancient in a modern world and experiencing everyday life in all its glory!
        </p>
        <Link href="/about" className="text-sm font-medium text-gray-900 hover:underline">
          Read more about me →
        </Link>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 font-serif">
          Want something else?
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link 
                href={`/categories/${cat.slug}`}
                className="text-sm text-gray-700 hover:text-gray-900 hover:underline flex items-center justify-between group"
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Subscribe */}
      <div className="rounded-lg bg-gray-900 text-white p-6">
        <h3 className="text-xl font-bold mb-3 font-serif">Subscribe to Blog via Email</h3>
        <p className="text-sm mb-4 text-gray-300">
          Enter your email address to subscribe to this blog and receive notifications of new posts by email.
        </p>
        <form className="space-y-3" action="#">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-400"
            required
          />
          <button type="button" className="w-full bg-white text-gray-900 font-bold py-2 rounded text-sm hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}