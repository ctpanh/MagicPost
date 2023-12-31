"use client";
import { useState, useRef } from "react";
import useTable from "@/hooks/useTable";
import TableFooter from "../staff/table/tableFooter";
import Image from "next/image";
import AccountModal from "./accountModal";
import useWarehouses from "@/hooks/useSystem";
import SystemModal from "./systemModal";
import { ModalDetail } from "../staff/modalDetails";
import useReceipt from "@/hooks/useReceipt";

const styles = {
  table: "border-collapse w-full table-fixed",
  tableRowHeader: "transition text-left",
  tableRowItems: "cursor-auto",
  tableHeader: "border-b border-stone-600 p-3 text-sm",
  tableCell: "p-3 text-sm",
  tableCellDetail: "p-3 text-sm text-stone-600 cursor-pointer",
};

export const TableAccount = ({
  headers,
  data,
  rowsPerPage,
}: {
  headers: any[];
  data: any;
  rowsPerPage: number;
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {slice.length ? (
          <>
            <table className={styles.table}>
              <thead className={styles.tableRowHeader}>
                <tr>
                  {headers.map((item, index) => (
                    <th key={index} className={styles.tableHeader}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((item, index) => (
                  <tr key={index} className={styles.tableRowItems}>
                    <td className={styles.tableCell}>{index + 1}</td>
                    <td className={styles.tableCell}>{item.user.fullname}</td>
                    <td className={styles.tableCell}>
                      {item.user.date_of_birth}
                    </td>
                    <td className={styles.tableCell}>
                      {item.location.ward.name}, {item.location.district.name},{" "}
                      {item.location.division.name}
                    </td>
                    <td
                      className={styles.tableCellDetail}
                      onClick={() => {
                        setOpenDetail(item.user.id);
                      }}
                    >
                      Chi tiết
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
            <Image
              src={"/deliveryMan.png"}
              alt="delivery-man"
              width={500}
              height={500}
            />
            Chưa có tài khoản nào tại đây!
          </div>
        )}
      </div>
      {openDetail && (
        <AccountModal openDetail={openDetail} setOpenDetail={setOpenDetail} />
      )}
    </div>
  );
};

export const TableSystem = ({
  title,
  headers,
  data,
  rowsPerPage,
}: {
  title: string;
  headers: any[];
  data: any;
  rowsPerPage: number;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { warehouse } = useWarehouses(openDetail!);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {slice.length ? (
          <>
            <table className={styles.table}>
              <thead className={styles.tableRowHeader}>
                <tr>
                  {headers.map((item, index) => (
                    <th key={index} className={styles.tableHeader}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((item, index) => (
                  <tr className={styles.tableRowItems} key={item.id}>
                    <td className={styles.tableCell}>{index + 1}</td>
                    <td className={styles.tableCell}>
                      {item.ward.name}, {item.district.name},{" "}
                      {item.division.name}
                    </td>
                    <td
                      className={styles.tableCellDetail}
                      onClick={() => setOpenDetail(item.id)}
                    >
                      Chi tiết
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
            <Image
              src={"/deliveryMan.png"}
              alt="delivery-man"
              width={500}
              height={500}
            />
            Chưa có điểm {title} nào tại đây!
          </div>
        )}
      </div>
      {openDetail && (
        <SystemModal
          title="giao dịch"
          setOpenDetail={setOpenDetail}
          componentRef={componentRef}
          systemPoint={warehouse}
        />
      )}
    </div>
  );
};
export const TableTransaction = ({
  title,
  headers,
  data,
  rowsPerPage,
}: {
  title: string;
  headers: any[];
  data: any;
  rowsPerPage: number;
}) => {
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { transactions, locationReceiver, locationSender } = useReceipt(
    openDetail!
  );
  return (
    <div>
      <div className="flex flex-col gap-4">
        {slice.length ? (
          <>
            <table className={styles.table}>
              <thead className={styles.tableRowHeader}>
                <tr>
                  {headers.map((item, index) => (
                    <th key={index} className={styles.tableHeader}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((item, index) => (
                  <tr className={styles.tableRowItems} key={item.id}>
                    <td className={styles.tableCell}>{index + 1}</td>
                    <td className={styles.tableCell}>{item.code}</td>
                    <td className={styles.tableCell}>{item.status}</td>
                    <td className={styles.tableCell}>
                      {item.transaction_receive_date}
                    </td>
                    <td
                      className={styles.tableCellDetail}
                      onClick={() => setOpenDetail(item.id)}
                    >
                      Chi tiết
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
            <Image
              src={"/deliveryMan.png"}
              alt="delivery-man"
              width={500}
              height={500}
            />
            Chưa có đơn hàng nào tại đây!
          </div>
        )}
      </div>
      {openDetail && (
        <ModalDetail
          setOpenDetail={setOpenDetail}
          transactions={transactions}
          locationSender={locationSender}
          locationReceiver={locationReceiver}
          componentRef={undefined}
        />
      )}
    </div>
  );
};
