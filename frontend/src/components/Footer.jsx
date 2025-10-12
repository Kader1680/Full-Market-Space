export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h2 className="font-bold text-lg mb-3">SHOP.CO</h2>
          <p className="text-gray-400">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex gap-3 mt-3">
            <i className="ri-facebook-fill text-xl"></i>
            <i className="ri-instagram-fill text-xl"></i>
            <i className="ri-twitter-fill text-xl"></i>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Stay Updated</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full rounded-l bg-gray-800 border border-gray-700"
            />
            <button className="bg-white text-black px-4 rounded-r font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs mt-8">
        © 2025 SHOP.CO. All rights reserved.
      </p>
    </footer>
  );
}
