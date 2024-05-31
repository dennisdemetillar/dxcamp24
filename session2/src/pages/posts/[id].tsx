import { useRouter } from "next/router";
import Header from "../components/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { OctagonAlert, Pen, Trash } from "lucide-react";
import Link from "next/link";

interface Post {
    title: string;
    content: string;
    image: string;
}

const PostDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post>();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [postNotFound, setPostNotFound] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        try {
            await fetch(`/api/post/delete?id=${id}`, {
                method: "DELETE",
            });
            router.push("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleUpdateClick = () => {
        router.push(`/posts/update-post?id=${id}`);
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getById?id=${id}`);
                if (res.status === 404) {
                    setPostNotFound(true);
                    return;
                }
                const post = await res.json();
                setPost({ ...post });
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (postNotFound) {
        return (
            <div className="flex-1">
                <div className="my-4">
                    <Header />
                </div>
                <div className="flex justify-center items-center h-[50vh] flex-col gap-y-5">
                    <OctagonAlert size={40} color="red" />
                    <div>Post not found</div>
                    <Link href={"/"} className="underline text-blue-300">Go back to home</Link>
                </div>
            </div>
        );
    }

    if (!post || loading) {
        return <Loader />
    }

    return (
        <div className="my-4">
            <Header />
            <div className="flex flex-col my-10 gap-y-5 mx-5">
                <div className="flex justify-end items-center gap-x-5 mr-16">
                    <div className="cursor-pointer" onClick={handleUpdateClick}>
                        <Pen color="blue" />
                    </div>
                    <div className="cursor-pointer" onClick={() => setShowConfirmation(true)}>
                        <Trash color="red" />
                    </div>
                </div>
                <div className="items-center flex flex-col gap-y-4 ">
                    <div className="text-3xl font-semibold">{post.title}</div>
                    <Image src={String(post.image)} width={700} height={500} alt={post.title} className="rounded-2xl" />
                </div>
                <div className="my-4 p-10 rounded-2xl">
                    <div className="text-lg">{post.content}</div>
                </div>
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="mb-4">Are you sure you want to delete this post?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md" onClick={handleDelete}>
                                Delete
                            </button>
                            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;
