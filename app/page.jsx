import { Spin } from "antd";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";


const App = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spin size="large">
        <div className="content"></div>
      </Spin>
    </div>
  );
};

export default App;
