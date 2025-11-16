export default function SocialProof() {

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-orb-silver opacity-25 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="liquid-glass-strong rounded-3xl p-12 text-center shadow-glass-strong relative overflow-hidden">
          {/* Inner highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <div className="relative z-10">
            <div>
              <p className="text-sm text-muted-light mb-6">AS FEATURED IN</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                {['TechCrunch', 'The Verge', 'Wired', 'Axios'].map((pub, idx) => (
                  <div 
                    key={idx}
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {pub}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-light mt-4">(Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
