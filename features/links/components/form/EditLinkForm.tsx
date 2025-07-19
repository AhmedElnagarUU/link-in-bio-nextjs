

export default function EditLinkForm(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Edit Link</h1>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                    <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Save Changes
                </button>
            </form>
        </div>
    )
}