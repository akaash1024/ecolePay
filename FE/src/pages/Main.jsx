import { useSelector } from "react-redux";
import Login from "../component/Login";
import Profile from "../component/Profile";
import ActionCard from "../component/ActionCard";
import SchoolCard from "../component/SchoolCard";

export const Main = () => {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <main className="min-h-screen bg-white">
      {/* hero section */}
      <div className="relative overflow-hidden">
        {/* main content */}
        <div className="px-6 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center px-10">
              {/* left item */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
                  No More Lines, Just Online <br />
                  $end, Pay, Done.. .
                </h1>
                <h2>Seamless Fee Payments for Every School</h2>
              </div>

              {/* right item */}
              <div className="relative flex justify-center lg:justify-center">
                {/* Main Box */}
                <div className="relative w-64 p-2 h-86 md:w-2xl lg:w-7xl bg-gray-100 rounded-3xl shadow-2xl sm:p-4 overflow-hidden z-10">
                  {currentUser ? (
                    <div className="space-y-4">
                      <Profile />
                      <SchoolCard />
                      <ActionCard />
                    </div>
                  ) : (
                    <Login />
                  )}
                </div>

                {/* green Card Behind Box */}
                <div className="absolute -bottom-8 -right-8 w-64 h-40 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl shadow-xl transform rotate-12 z-0">
                  <div className="p-6 text-white">
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-12 h-2 bg-white bg-opacity-50 rounded"></div>
                      <div className="w-16 h-2 bg-white bg-opacity-50 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Blurred Circles */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-12 left-8 w-24 h-24 bg-green-300 rounded-full opacity-30 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* black section */}
      <div className="bg-black text-white px-6 py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                School fees, simplified for everyone.
              </h2>
              <p className="text-gray-300 text-lg">
                Parents pay in seconds. Schools collect instantly. Secure,
                reliable, and built for India.
              </p>
            </div>

            {/* Right Content - Payment Mockup */}
            <div className="relative flex justify-center lg:justify-end pr-14">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-72 h-[600px] bg-white rounded-[3rem] shadow-2xl p-2 relative z-10">
                  {/* Screen */}
                  <div className="w-full h-full bg-gray-50 rounded-[2.5rem] p-6 relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-black font-medium">ÉcolePay</span>
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>

                    {/* Fee Balance */}
                    <div className="mb-8">
                      <p className="text-gray-500 text-sm mb-1">Pending Fees</p>
                      <h3 className="text-black text-4xl font-bold">₹12,000</h3>
                      <p className="text-gray-400 text-xs">Due: 25 Sept 2025</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-8">
                      <button className="flex-1 bg-green-500 rounded-xl py-3 px-4 text-white font-medium hover:bg-green-600 transition">
                        Pay Now
                      </button>
                      <button className="flex-1 bg-white border border-gray-200 rounded-xl py-3 px-4 text-black font-medium">
                        Share Link
                      </button>
                    </div>

                    {/* Transactions */}
                    <div className="bg-white rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-black font-medium">
                          Tuition - Paid
                        </span>
                      </div>
                    </div>

                    {/* Upcoming */}
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-gray-500 text-sm mb-1">Next Term</p>
                      <h4 className="text-black text-2xl font-bold">₹15,000</h4>
                      <p className="text-gray-400 text-xs">Due in 30 days</p>
                    </div>
                  </div>
                </div>

                {/* Green Card Behind Phone */}
                <div className="absolute -bottom-8 -right-8 w-64 h-40 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl shadow-xl transform rotate-12 z-0">
                  <div className="p-6 text-white">
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-12 h-2 bg-white bg-opacity-50 rounded"></div>
                      <div className="w-16 h-2 bg-white bg-opacity-50 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-12 left-8 w-24 h-24 bg-green-300 rounded-full opacity-30 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
