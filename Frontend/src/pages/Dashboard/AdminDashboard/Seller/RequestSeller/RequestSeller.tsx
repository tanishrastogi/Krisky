import { useEffect, useState } from "react";
import { getSellerRequests } from "../../../../../api/admin.api";
import RequestCard from "../../../../../components/RequestCard/RequestCard";
import { UserDashboardCard } from "../../../../../components";

const RequestSeller = () => {
  const [requestList, setRequestList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getSellerRequests();
      if (response.statusCode === 200) {
        setRequestList(response.data.requests);
        setPage(response.data.page);
      }
    })();
  }, []);

  return (
    <div>
      {requestList.length === 0 ? (
        <div>No request found!</div>
      ) : (
        requestList.map((request, index) => {
          return (
            <div key={index}>
              <UserDashboardCard data={request} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default RequestSeller;
