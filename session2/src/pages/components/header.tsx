import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
    const router = useRouter()
    const { pathname } = router

    return (
        <div className="mx-[5%]">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold cursor-pointer italic" onClick={() => router.push("/")}>keiblog</div>
                {pathname !== "/posts/add-post" && pathname !== "/posts/update-post" && (
                    <Link href="/posts/add-post" className="border rounded-full p-3 bg-black text-white">Create Post</Link>
                )}
            </div>
            <div className="border-t border-gray-300 mt-4" />
        </div>
    )
}

export default Header
