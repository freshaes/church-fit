import { motion } from 'motion/react';
import { Heart, BookOpen, Award, TrendingUp, LogIn } from 'lucide-react';

export function LogoutScreen({ onBackToLogin }) {
  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        {/* Main Card */}
        <div className="bg-white rounded-3xl border-2 border-[#3A4A46] shadow-[0_8px_0_0_rgba(58,74,70,0.1)] p-8 text-center">
          {/* Animated Wave Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
              repeat: 1,
              delay: 0.2,
            }}
            className="text-6xl mb-6"
          >
            👋
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-3"
          >
            See You Soon!
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#6B7B77] mb-8"
          >
            Thanks for investing in your leadership journey today. Keep growing!
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {/* Lessons Card */}
            <div className="bg-[#7A9B70]/10 rounded-2xl border-2 border-[#7A9B70] p-4">
              <BookOpen className="w-6 h-6 text-[#3A4A46] mx-auto mb-2" />
              <p className="text-[#3A4A46]">
                Keep Learning
              </p>
            </div>

            {/* Growth Card */}
            <div className="bg-[#7A9B70]/10 rounded-2xl border-2 border-[#7A9B70] p-4">
              <TrendingUp className="w-6 h-6 text-[#3A4A46] mx-auto mb-2" />
              <p className="text-[#3A4A46]">
                Keep Growing
              </p>
            </div>

            {/* Community Card */}
            <div className="bg-[#7A9B70]/10 rounded-2xl border-2 border-[#7A9B70] p-4">
              <Heart className="w-6 h-6 text-[#3A4A46] mx-auto mb-2" />
              <p className="text-[#3A4A46]">
                Keep Serving
              </p>
            </div>

            {/* Achievement Card */}
            <div className="bg-[#7A9B70]/10 rounded-2xl border-2 border-[#7A9B70] p-4">
              <Award className="w-6 h-6 text-[#3A4A46] mx-auto mb-2" />
              <p className="text-[#3A4A46]">
                Keep Achieving
              </p>
            </div>
          </motion.div>

          {/* Encouragement Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#FDD6A1]/40 rounded-2xl border-2 border-[#3A4A46] p-4 mb-6"
          >
            <p className="text-[#3A4A46]">
              💡 <span className="italic">"Leadership is not about being in charge. It's about taking care of those in your charge."</span>
            </p>
          </motion.div>

          {/* Back to Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onBackToLogin}
            className="w-full bg-[#7A9B70] hover:bg-[#6B8A61] text-white rounded-2xl border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.2)] active:shadow-none active:translate-y-[2px] transition-all py-3 px-6 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Back to Login
          </motion.button>
        </div>

        {/* Footer Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-[#6B7B77] mt-6"
        >
          Your progress is saved. Come back anytime! 🙏
        </motion.p>
      </motion.div>
    </div>
  );
}
