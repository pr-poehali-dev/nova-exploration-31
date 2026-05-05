import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-[#FFD700] text-xl"
            animate={isActive ? { rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            ⚡
          </motion.span>
          {subtitle}
        </motion.div>
      )}

      {/* Яркая линия-акцент */}
      <motion.div
        className="mb-6 h-[3px] w-0 rounded-full"
        style={{ background: 'linear-gradient(90deg, #FFD700, #FF8C00, transparent)' }}
        animate={isActive ? { width: '120px' } : { width: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />

      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl"
        style={{
          background: 'linear-gradient(135deg, #ffffff 60%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-300"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="relative text-black bg-[#FFD700] border-[#FFD700] hover:bg-[#FFA500] hover:border-[#FFA500] transition-all font-semibold shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,165,0,0.6)]"
            onClick={() => {
              if (id === 'contact') {
                window.location.href = 'mailto:ftkm@mail.ru?subject=Заявка%20с%20сайта&body=Добрый%20день!%20Хочу%20обсудить%20проект.';
              }
            }}
          >
            {buttonText}
          </Button>
        </motion.div>
      )}

      {/* Угловой акцент */}
      <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-2 opacity-40">
        <div className="w-8 h-[1px] bg-[#FFD700]" />
        <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
      </div>
    </section>
  )
}