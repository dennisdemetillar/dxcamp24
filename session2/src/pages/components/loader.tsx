import Image from "next/image";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Image src="/loading.gif" width={100} height={100} alt="Loading..." />
                <div className="text-sm">loading...</div>
            </div>
        </div>
    );
};

export default Loader;
