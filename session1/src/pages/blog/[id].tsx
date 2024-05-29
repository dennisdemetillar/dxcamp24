import { useRouter } from "next/router";

const BlogDetails = () => {
  const router = useRouter();

  return (
    <div>
      <div>Blog Details {router.query.id}</div>
    </div>
  );
};
export default BlogDetails;
