import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, ArrowRight, Newspaper, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import heroSkyline from "@/assets/hero-skyline.jpg";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  publish_date: string;
}

const Newsroom = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "AIRAVATH Newsroom | Latest Updates";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Latest updates, announcements, and developments from AIRAVATH.");
    const l = (window as any).__lenis;
    if (l) l.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);

    const q = query(collection(db, "news_articles"), orderBy("publish_date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)));
    });
    return unsub;
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroSkyline} alt="AIRAVATH Newsroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </div>

        {/* Scan lines overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }}
        />

        <div className="relative z-10 container-airavath pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="font-sub text-[13px] text-primary uppercase tracking-[0.15em]">Latest Updates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[44px] md:text-[64px] lg:text-[76px] font-semibold text-foreground tracking-futuristic leading-[1.05] mb-6"
          >
            AIRAVATH<br />
            <span className="text-gradient-blue">Newsroom</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-[17px] md:text-[19px] text-titanium max-w-[520px] leading-relaxed"
          >
            Announcements, developments, and milestones shaping the future of urban air mobility.
          </motion.p>
        </div>
      </section>

      {/* Back + Search Bar */}
      <div className="container-airavath pt-10 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="relative w-full sm:w-[320px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] rounded-[8px] border border-border bg-card pl-11 pr-10 text-foreground placeholder:text-muted-foreground font-body text-[14px] focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_hsl(189_100%_50%/0.1)] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container-airavath py-12 md:py-20">
        {filtered.length === 0 ? (
          /* Premium empty state */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-full border border-border bg-card flex items-center justify-center mb-6">
              <Newspaper size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-sub text-[20px] text-foreground mb-2">
              {searchQuery ? "No articles found" : "No articles published yet"}
            </h3>
            <p className="font-body text-[14px] text-titanium max-w-[360px] text-center">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : "We're working on exciting updates. Check back soon for the latest from AIRAVATH."
              }
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Article */}
            {featured && (
              <ScrollReveal duration={0.7}>
                <Link to={`/newsroom/${featured.id}`} className="group block">
                  <div className="relative rounded-[16px] overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-[0_0_40px_hsl(189_100%_50%/0.12)] transition-all duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image */}
                      <div className="relative h-[280px] lg:h-[420px] overflow-hidden">
                        {featured.image_url ? (
                          <img
                            src={featured.image_url}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Newspaper size={48} className="text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:hidden" />

                        {/* Featured badge */}
                        <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
                          <span className="font-sub text-[11px] text-primary uppercase tracking-[0.12em]">Featured</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground text-[13px] mb-4">
                          <Calendar size={13} />
                          <span>{featured.publish_date}</span>
                        </div>
                        <h2 className="font-heading text-[24px] md:text-[32px] font-semibold text-foreground tracking-futuristic mb-4 leading-[1.2] group-hover:text-primary transition-colors duration-500">
                          {featured.title}
                        </h2>
                        <p className="font-body text-[15px] text-titanium leading-[1.7] line-clamp-3 mb-8">
                          {featured.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-sub text-[13px] uppercase tracking-[0.08em] group-hover:gap-4 transition-all duration-500">
                          <span>Read Full Article</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Articles Grid */}
            {rest.length > 0 && (
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-[1px] w-8 bg-primary" />
                    <h3 className="font-sub text-[14px] text-primary uppercase tracking-[0.12em]">All Articles</h3>
                    <div className="h-[1px] flex-1 bg-border" />
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {rest.map((article, i) => (
                    <ScrollReveal key={article.id} delay={0.08 * i} duration={0.6}>
                      <Link to={`/newsroom/${article.id}`} className="group block h-full">
                        <div
                          className="relative h-full rounded-[14px] overflow-hidden border border-border bg-card transition-all duration-600"
                          style={{ perspective: "1000px" }}
                        >
                          <div className="transition-transform duration-600 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_hsl(189_100%_50%/0.1)]">
                            {/* Image */}
                            <div className="relative h-[200px] overflow-hidden">
                              {article.image_url ? (
                                <img
                                  src={article.image_url}
                                  alt={article.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                  <Newspaper size={32} className="text-muted-foreground/20" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col">
                              <div className="flex items-center gap-2 text-muted-foreground text-[12px] mb-3">
                                <Calendar size={12} />
                                <span>{article.publish_date}</span>
                              </div>
                              <h3 className="font-sub text-[17px] font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-400 leading-[1.35]">
                                {article.title}
                              </h3>
                              <p className="font-body text-[13px] text-titanium leading-relaxed line-clamp-2 flex-1 mb-4">
                                {article.description}
                              </p>
                              <div className="flex items-center gap-2 text-primary text-[12px] font-sub uppercase tracking-[0.06em] group-hover:gap-3 transition-all duration-400">
                                <span>Read more</span>
                                <ArrowRight size={12} />
                              </div>
                            </div>

                            {/* Bottom glow on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700" />
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <FooterSection />
    </div>
  );
};

export default Newsroom;
