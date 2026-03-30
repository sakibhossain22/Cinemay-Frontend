import { Monitor, Smartphone, Download, ShieldCheck } from "lucide-react";

export const FeatureHighlights = () => {
  const features = [
    {
      title: "Watch Anywhere",
      desc: "Stream on your TV, laptop, tablet, or phone without extra cost.",
      icon: <Monitor className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Offline Viewing",
      desc: "Download your favorite movies and watch them without internet.",
      icon: <Download className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Ad-Free Experience",
      desc: "Enjoy uninterrupted streaming with our premium ad-free plans.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-20 bg-emerald-500/5 rounded-3xl my-16 border border-emerald-500/10">
      <div className="grid md:grid-cols-3 gap-10 px-10">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 bg-black/40 rounded-2xl group-hover:bg-emerald-500/20 transition-all border border-white/5">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};