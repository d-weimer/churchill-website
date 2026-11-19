import { useEffect, useState } from "react";
import ContentSection from "../ContentSection/ContentSection";
import ContentCard from "../ContentCard/ContentCard";
import "./MostRecent.css";
import { postsApi, POSTS_UPDATED_EVENT } from "../../data/postsData";

export default function MostRecent() {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadRecent = async () => {
      const allPosts = await postsApi.getPosts();
      if (!isMounted) return;

      const published = (Array.isArray(allPosts) ? allPosts : [])
        .filter(
          (post) => String(post.status || "").toLowerCase() === "published",
        )
        .sort((a, b) => {
          const dateA = Date.parse(a.date || "") || 0;
          const dateB = Date.parse(b.date || "") || 0;
          if (dateB !== dateA) return dateB - dateA;
          return String(b.id).localeCompare(String(a.id));
        });

      setRecentPosts(published);
    };

    loadRecent();
    window.addEventListener(POSTS_UPDATED_EVENT, loadRecent);
    window.addEventListener("storage", loadRecent);

    return () => {
      isMounted = false;
      window.removeEventListener(POSTS_UPDATED_EVENT, loadRecent);
      window.removeEventListener("storage", loadRecent);
    };
  }, []);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <div className="most-recent-wrapper">
      <ContentSection title="Most Recent">
        {recentPosts.map((post, idx) => (
          <ContentCard
            key={post.id}
            title={post.title}
            description={post.category || post.platform || ""}
            mediaClass={`placeholder-${(idx % 4) + 1}`}
            link={post.url || undefined}
          />
        ))}
      </ContentSection>
    </div>
  );
}
