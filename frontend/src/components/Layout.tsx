export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-zinc-950/95" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}