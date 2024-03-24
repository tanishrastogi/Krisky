import { useEffect, useState } from "react";
import { totalActiveUsers } from "../../../../api/admin.api";

const Analytics = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const getActiveUsers = async () => {
    const response = await totalActiveUsers();
    const count = response.data;
    setActiveUsers(count);
  };
  useEffect(() => {
    getActiveUsers();
  }, []);

  return (
    <div>
      <div>Total active users : {activeUsers}</div>
    </div>
  );
};

export default Analytics;
