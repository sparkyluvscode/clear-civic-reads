export default function SectionDivider() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      {/* Glass transition layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Subtle bubble elements */}
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <div 
          className="w-2 h-2 rounded-full bg-primary/20 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="w-1.5 h-1.5 rounded-full bg-primary/15 animate-float"
          style={{ animationDelay: '0.2s' }}
        />
        <div 
          className="w-3 h-3 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: '0.4s' }}
        />
        <div 
          className="w-1.5 h-1.5 rounded-full bg-primary/15 animate-float"
          style={{ animationDelay: '0.6s' }}
        />
        <div 
          className="w-2 h-2 rounded-full bg-primary/20 animate-float"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* Frosted line accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}

