import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useToast } from "@/hooks/use-toast";

interface Article {
  title: string;
  description: string;
  content: string;
  image_url: string;
  publish_date: string;
}

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "news_articles", id), (snap) => {
      if (snap.exists()) {
        setArticle(snap.data() as Article);
        document.title = `${(snap.data() as Article).title} | AIRAVATH Newsroom`;
      }
      setLoading(false);
    });
    return unsub;
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "Article URL copied to clipboard." });
    } catch {
      toast({ title: "Share", description: window.location.href });
    }
  };

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!article) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-[28px] text-foreground mb-4">Article Not Found</h1>
        <p className="font-body text-titanium text-[14px] mb-6">This article may have been removed or doesn't exist.</p>
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero Image */}
      {article.image_url ? (
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

          {/* Scan lines */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }}
          />
        </section>
      ) : (
        <div className="h-24" />
      )}

      {/* Article Content */}
      <div className="container-airavath py-12 md:py-16">
        <div className="max-w-[780px] mx-auto">
          {/* Back + Share */}
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300 font-sub text-[12px]">
              <Share2 size={13} /> Share
            </button>
          </div>

          <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-primary" />
              <span className="flex items-center gap-2 text-muted-foreground text-[13px]">
                <Calendar size={13} /> {article.publish_date}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-[32px] md:text-[44px] lg:text-[52px] font-semibold text-foreground tracking-futuristic leading-[1.1] mb-6">
              {article.title}
            </h1>

            {/* Description as lead */}
            {article.description && (
              <p className="font-body text-[18px] md:text-[20px] text-titanium leading-[1.7] mb-10 border-l-2 border-primary/30 pl-6">
                {article.description}
              </p>
            )}

            {/* Divider */}
            <div className="h-[1px] w-full bg-border mb-10" />

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              {article.content.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="font-body text-[16px] md:text-[17px] text-titanium leading-[1.85] mb-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 pt-10 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-sub text-[14px] text-muted-foreground mb-1">Continue reading</p>
                  <Link to="/newsroom" className="inline-flex items-center gap-2 text-primary hover:text-foreground font-sub text-[14px] transition-colors">
                    Back to Newsroom <ArrowRight size={14} />
                  </Link>
                </div>
                <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-all font-sub text-[13px]">
                  <Share2 size={14} /> Share Article
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default NewsArticle;
