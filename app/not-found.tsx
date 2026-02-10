'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const Player = dynamic(() => import('react-lottie-player/dist/LottiePlayerLight'), { ssr: false });

export default function NotFound() {
  const router = useRouter();
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
    }
  }, [countdown, router]);

  const text = {
    title: isArabic ? 'عذراً، الصفحة غير موجودة' : 'Page Not Found',
    subtitle: isArabic ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها' : 'The page you are looking for does not exist or has been moved',
    button: isArabic ? 'العودة للرئيسية' : 'Back to Home',
    redirect: isArabic ? `سيتم التوجيه تلقائياً خلال ${countdown} ثانية` : `Redirecting in ${countdown} seconds`
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl -mt-48"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Player
            loop
            animationData={{
              v: "5.7.4",
              fr: 30,
              ip: 0,
              op: 90,
              w: 500,
              h: 500,
              nm: "404",
              ddd: 0,
              assets: [],
              layers: [
                {
                  ddd: 0,
                  ind: 1,
                  ty: 4,
                  nm: "4",
                  sr: 1,
                  ks: {
                    o: { a: 0, k: 100 },
                    r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 90 }] },
                    p: { a: 0, k: [150, 250, 0] },
                    a: { a: 0, k: [0, 0, 0] },
                    s: { a: 0, k: [100, 100, 100] }
                  },
                  ao: 0,
                  shapes: [
                    {
                      ty: "gr",
                      it: [
                        {
                          ty: "tx",
                          p: { a: 0, k: [0, 0] },
                          a: { a: 0, k: [0, 0] },
                          s: { a: 0, k: [100, 100] },
                          r: { a: 0, k: 0 },
                          o: { a: 0, k: 100 },
                          sk: { a: 0, k: 0 },
                          sa: { a: 0, k: 0 },
                          nm: "4"
                        }
                      ],
                      nm: "4",
                      np: 2,
                      cix: 2,
                      bm: 0,
                      ix: 1,
                      mn: "ADBE Vector Group",
                      hd: false
                    }
                  ],
                  ip: 0,
                  op: 90,
                  st: 0,
                  bm: 0
                }
              ]
            }}
            play
            style={{ width: 300, height: 300, margin: '0 auto' }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold mb-4"
          style={{ color: isDarkMode ? '#ededed' : '#171717' }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold mb-4"
          style={{ color: isDarkMode ? '#ededed' : '#171717' }}
        >
          {text.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg mb-8 opacity-70"
          style={{ color: isDarkMode ? '#ededed' : '#171717' }}
        >
          {text.subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="px-8 py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: isDarkMode ? '#ededed' : '#171717',
            color: isDarkMode ? '#0a0a0a' : '#ffffff'
          }}
        >
          {text.button}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-sm opacity-60"
          style={{ color: isDarkMode ? '#ededed' : '#171717' }}
        >
          {text.redirect}
        </motion.p>
      </motion.div>
    </div>
  );
}
