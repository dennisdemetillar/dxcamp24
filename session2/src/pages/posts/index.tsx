import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/header"
import Loader from "../components/loader";
import Image from "next/image";

interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
}

const Posts = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([]);

    const handlePostClick = (id: string) => {
        router.push(`/posts/${id}`)
    }

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/post/get');
            return res.json();
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    };

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    if (!posts) {
        return (
            <Loader />
        )
    }
    return (
        <div className="my-4">
            <Header />
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-10 my-5 bg-black rounded-2xl">
                {posts?.map((post) => (
                    <div
                        key={post?.id}
                        onClick={() => handlePostClick(post?.id)}
                        className="relative rounded-2xl overflow-hidden shadow-lg mx-5 border border-slate-500 cursor-pointer"
                    >
                        <Image
                            src={post?.image}
                            height={400}
                            width={400}
                            alt={post?.title}
                            layout="responsive"
                        />
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full">
                            <h2 className="text-2xl font-bold">{post?.title}</h2>
                            <p className="mt-2">{post?.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts