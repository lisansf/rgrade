'use client';

import DashboardMenu from "@/app/Components/Dashboard/Dashboardmenu";
import MyPosts from "../Components/Dashboard/MyPosts";
import AddPost from "../Components/Dashboard/AddPost";

function CDashboard() {
    return (
        <div className="flex flex-col gap-2 pt-4">
            <div className="bg-gray-100 shadow-md">
                <div className="flex justify-between items-center py-1">
                    <h1 className="text-4xl pl-6 font-bold">Dashboard</h1>
                    <DashboardMenu /> {/* Menu berada di sebelah judul */}
                </div>
            </div>
            <div id="addpost">
                <AddPost />
            </div>
            <div id="posts" className="mt-4">
                <h1>My Post</h1>
                <MyPosts />
            </div>
        </div>
    );
}

export default CDashboard;