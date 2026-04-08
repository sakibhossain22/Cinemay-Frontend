import { Monitor, Download, ShieldCheck } from "lucide-react";

export const FeatureHighlights = () => {
  const features = [
    {
      title: "Watch Anywhere",
      desc: "Stream on your TV, laptop, tablet, or phone without extra cost.",
      icon: <Monitor className="w-8 h-8" />,
    },
    {
      title: "Offline Viewing",
      desc: "Download your favorite movies and watch them without internet.",
      icon: <Download className="w-8 h-8" />,
    },
    {
      title: "Ad-Free Experience",
      desc: "Enjoy uninterrupted streaming with our premium ad-free plans.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 my-16 transition-colors duration-300">
      <div className="grid md:grid-cols-3 gap-8 px-6 lg:px-12 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center text-center space-y-6 group p-10 bg-white dark:bg-zinc-900/20 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-emerald-500/30 transition-all duration-500"
          >
            {/* Icon Container */}
            <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl group-hover:bg-emerald-500/10 transition-colors duration-500 border border-zinc-100 dark:border-white/5 text-emerald-600 dark:text-emerald-500 shadow-inner">
              {f.icon}
            </div>
            
            {/* Content Adjustment */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                {f.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-[250px]">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};