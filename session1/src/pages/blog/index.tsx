import Layout from "./_layout";
import FirstPost from "./first-post";

const Blog = () => {
  return (
    <Layout>
      <div>This is Blog</div>
      <FirstPost
        title="BLOG 1"
        date={{ month: "May", day: 25 }}
        newPost={false}
      />
    </Layout>
  );
};

export default Blog;
