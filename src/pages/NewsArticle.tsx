import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

interface Article {
  title: string;
  description: string;
  content: string;
  image_url: string;
  publish_date: string;
}

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!article) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-2xl text-foreground mb-4">Article not found</h1>
        <Link to="/newsroom" className="text-primary hover:underline">← Back to Newsroom</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero image */}
      {article.image_url && (
        <div className="relative h-[400px] overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      <div className="container-airavath py-12 max-w-[800px]">
        <Link to="/newsroom" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sub text-sm mb-8">
          <ArrowLeft size={16} /> Back to Newsroom
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-heading text-[32px] md:text-[44px] font-semibold text-foreground tracking-futuristic mb-4 leading-[1.15]">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-10">
            <Calendar size={14} /> {article.publish_date}
          </div>
          <div className="prose prose-invert max-w-none font-body text-[17px] leading-[1.8] text-titanium">
            {article.content.split("\n").map((para, i) => (
              <p key={i} className="mb-5">{para}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsArticle;
