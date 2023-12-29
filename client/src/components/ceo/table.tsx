"use client";
import { useState, useRef } from "react";
import useTable from "@/hooks/useTable";
import TableFooter from "../staff/table/tableFooter";
import Image from "next/image";
import AccountModal from "./accountModal";
import useAccount from "@/hooks/useAccount";
import useWarehouses, { useAllWarehouses } from "@/hooks/useSystem";
import SystemModal from "./systemModal";

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
    const componentRef = useRef<HTMLDivElement>(null);
    const [openDetail, setOpenDetail] = useState<number | null>(null);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { transactionAccount } = useAccount(openDetail!);

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
                                {slice.map((item) => (
                                    <tr className={styles.tableRowItems} key={item.id}>
                                        <td className={styles.tableCell}>{item.id}</td>
                                        <td className={styles.tableCell}>{item.fullname}</td>
                                        <td className={styles.tableCell}>{item.date_of_birth}</td>
                                        <td className={styles.tableCell}>{item.warehouses_id}</td>
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
                        Chưa có tài khoản nào tại đây!
                    </div>
                )}
            </div>
            {openDetail && (
                <AccountModal
                    setOpenDetail={setOpenDetail}
                    componentRef={componentRef}
                    transactionAccount={transactionAccount}
                />
            )}
        </div>
    );
}


export const TableSystem = ({
    title,
    headers,
    data,
    rowsPerPage,
}: {
    title: string,
    headers: any[];
    data: any;
    rowsPerPage: number;
}) => {
    const [page, setPage] = useState(1);
    const componentRef = useRef<HTMLDivElement>(null);
    const [openDetail, setOpenDetail] = useState<number | null>(null);
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
                                {slice.map((item) => (
                                    <tr className={styles.tableRowItems} key={item.id}>
                                        <td className={styles.tableCell}>{item.id}</td>
                                        <td className={styles.tableCell}>{item.address}</td>
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
}
