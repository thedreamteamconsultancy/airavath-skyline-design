import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
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
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    document.title = "AIRAVATH Newsroom | Latest Updates";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Latest updates, announcements, and developments from AIRAVATH.");

    const q = query(collection(db, "news_articles"), orderBy("publish_date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)));
    });
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <img src={heroSkyline} alt="City skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="relative z-10 text-center container-airavath">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-[40px] md:text-[56px] font-semibold text-foreground tracking-futuristic mb-4"
          >
            AIRAVATH Newsroom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-[18px] text-titanium max-w-[600px] mx-auto"
          >
            Latest updates, announcements, and developments from AIRAVATH.
          </motion.p>
        </div>
      </section>

      {/* Back to home */}
      <div className="container-airavath pt-8">
        <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sub text-sm">
          <ArrowLeft size={16} /> Back to Home
        </a>
      </div>

      {/* Articles Grid */}
      <section className="container-airavath py-16 md:py-24">
        {articles.length === 0 ? (
          <p className="text-center text-titanium font-body text-lg">No articles published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <ScrollReveal key={article.id} delay={0.12 * i} duration={0.6}>
                <Link to={`/newsroom/${article.id}`} className="group block h-full">
                  <div className="bg-card border border-border rounded-[12px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] transition-all duration-500 h-[320px] flex flex-col">
                    <div className="relative h-[180px] overflow-hidden flex-shrink-0">
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-sub text-[16px] font-medium text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="font-body text-[13px] text-titanium leading-relaxed line-clamp-2 flex-1">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                          <Calendar size={12} /> {article.publish_date}
                        </span>
                        <span className="text-primary text-[12px] font-sub group-hover:underline">Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Newsroom;
