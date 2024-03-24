import { useEffect, useState } from "react";
import { getSellers } from "../../../../../api/admin.api";
import Pagination from "../../../../../components/Pagination/Pagination";
import style from "./ListSeller.module.css";
import { UserDashboardCard } from "../../../../../components";

const ListSeller = () => {
  const [sellerList, setSellerList] = useState([]);
  const [page, setPage] = useState();
  const [sellerCount, setSellerCount] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getSellers();
      if (response.statusCode === 200) {
        setSellerList(response.data.sellers);
        setPage(response.data.currentPage);
      }
    })();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.sectionTitle}>
          <div className={style.status}>Store Name</div>
          <div className={style.name}>Name</div>
          <div className={style.phone}>Phone Number</div>
          <div className={style.role}>Email</div>
        </div>
        {sellerList.map((seller, index) => {
          return (
            <div key={index}>
              <UserDashboardCard data={seller} />
            </div>
          );
        })}
        <div className={style.pagination}>
          <Pagination
            count={Math.ceil(sellerCount / 10)}
            page={page}
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListSeller;
