import { useEffect, useState } from "react";
import ContentSection from "../ContentSection/ContentSection";
import ContentCard from "../ContentCard/ContentCard";
import "./FeaturedWorks.css";
import { postsApi, POSTS_UPDATED_EVENT } from "../../data/postsData";

export default function FeaturedWorks() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadFeatured = async () => {
      const allPosts = await postsApi.getPosts();
      if (!isMounted) return;

      const starred = (Array.isArray(allPosts) ? allPosts : []).filter(
        (post) =>
          String(post.status || "").toLowerCase() === "published" &&
          Boolean(post.isFeatured),
      );
      setFeaturedPosts(starred);
    };

    loadFeatured();
    window.addEventListener(POSTS_UPDATED_EVENT, loadFeatured);
    window.addEventListener("storage", loadFeatured);

    return () => {
      isMounted = false;
      window.removeEventListener(POSTS_UPDATED_EVENT, loadFeatured);
      window.removeEventListener("storage", loadFeatured);
    };
  }, []);

  return (
    <div className="featured-works-wrapper">
      <ContentSection title="Featured Works">
        {featuredPosts.length === 0 ? (
          <p className="featured-works__empty">No featured content yet...</p>
        ) : (
          featuredPosts.map((post, idx) => (
            <ContentCard
              key={post.id}
              title={post.title}
              description={post.category || post.platform || ""}
              mediaClass={`placeholder-${(idx % 4) + 1}`}
              link={post.url || undefined}
            />
          ))
        )}
      </ContentSection>
    </div>
  );
}
