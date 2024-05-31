import { useState, ChangeEvent, FormEvent } from "react";
import Header from "../components/header";
import Loader from "../components/loader";
import { useRouter } from "next/router";

interface Post {
    title: string;
    content: string;
    image: string;
}

const AddPost = () => {
    const router = useRouter()
    const [post, setPost] = useState<Post>({
        title: "",
        content: "",
        image: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            if (response.ok) {
                console.log("Post created successfully!");
                setPost({
                    title: "",
                    content: "",
                    image: "",
                });
                router.push("/")
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
        }));
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="my-4">
            <Header />
            <div className="mx-auto max-w-md my-10">
                <h1 className="text-3xl font-bold mb-4">Add Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={post.image}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
