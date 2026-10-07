import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Wifi } from 'lucide-react'
import { FadeUp } from '../ui/Motion'

export default function CtaSection() {
  return (
    <section className="section bg-white">
      <div className="container-lg">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-night border border-white/5 p-12 md:p-16 text-center shadow-[0_30px_80px_rgba(3,7,18,0.35)]">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-night pointer-events-none" />
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-[76px] md:top-[92px] -ml-12 -mt-12 w-24 h-24 rounded-full border-2 border-cyan-400/30 pointer-events-none"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeOut' }}
              />
            ))}

            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,211,238,0.45)]">
                <Wifi className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Ready to share your <span className="gradient-text-light">WiFi?</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">
                Join 50,000+ users. Get your hotspot live in under 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary px-8 py-3.5">
                  Get started <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 text-white font-semibold px-8 py-3.5 rounded-2xl border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-200 backdrop-blur-sm"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
