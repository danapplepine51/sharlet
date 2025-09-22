// import AddTransactionCard from "./AddTransactionCard";
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";
import API from "../services/API";

type TransactionRow = {
  id: string; // Assuming id is of type string, change if necessary
  amount: string;
  name: string;
  transaction_type: string;
  date: string;
  description: string;
};

interface TransactionProps {
  user: string | null;
}

export default function Transaction({ user }: TransactionProps) {
  // Get current year and month as default
  const now = new Date();
  const defaultYear = String(now.getFullYear());
  const defaultMonth = String(now.getMonth() + 1).padStart(2, '0');

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [deleteRow, setDeleteRow] = useState<TransactionRow | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editRow, setEditRow] = useState<TransactionRow | null>(null);

  const handleDelete = (row: TransactionRow) => {
    API.delete(`/api/v1/transactions/${row.id}`)
      .then(() => {
        setTransactions(transactions.filter(t => t !== row));
        setIsDeleteModalOpen(false);
        setDeleteRow(null);
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
        setIsDeleteModalOpen(false);
        setDeleteRow(null);
      });
  };

  // Fetch transactions from backend with year and month
  const fetchTransactions = () => {
    const params = [];
    if (selectedYear) params.push(`year=${selectedYear}`);
    if (selectedMonth) params.push(`month=${selectedMonth}`);
    const url = params.length > 0
      ? `/api/v1/transactions/all?${params.join('&')}`
      : '/api/v1/transactions/all';
    API.get(url)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [selectedYear, selectedMonth]);

  // For display (M/D/YYYY, no leading zeros)
  function toDateFormat(dateStr: string): string {
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 overflow-scroll">
      <div className="mb-4 flex gap-4 items-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
          onClick={() => {
            setModalMode('add');
            setEditRow(null);
            setIsAddModalOpen(true);
          }}
          aria-label="Add Transaction"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        {/* Year/Month Picker */}
        <input
          type="month"
          value={`${selectedYear}-${selectedMonth}`}
          onChange={e => {
            const [year, month] = e.target.value.split('-');
            setSelectedYear(year);
            setSelectedMonth(month);
          }}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Name{" "}
              </p>
            </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Amount{" "}
              </p>
            </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Category{" "}
              </p>
            </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Date{" "}
              </p>
            </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Description{" "}
              </p>
            </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((row, index) => (
            <tr key={index} onClick={() => {
              setModalMode('edit');
              setEditRow(row);
              setIsAddModalOpen(true);
            }} className="cursor-pointer hover:bg-gray-100">
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{row.name}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">${row.amount}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{row.transaction_type}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex flex-col">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{row.date}</p>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="w-max">
                  <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${row.description} py-1 px-2 text-xs rounded-md`}>
                    <span className="">{row.description}</span>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Delete"
                  onClick={e => {
                    e.stopPropagation();
                    setDeleteRow(row);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  {/* Trash can icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V19a2 2 0 002 2h8a2 2 0 002-2V7.5M9.75 11.25v4.5m4.5-4.5v4.5M4.5 7.5h15m-10.125 0V5.25A1.5 1.5 0 0110.875 3.75h2.25a1.5 1.5 0 011.5 1.5V7.5" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TransactionCard
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        user_id={user || ""}
        onAdd={fetchTransactions}
        initialAmount={modalMode === 'edit' && editRow ? editRow.amount : ''}
        initialTransactionType={modalMode === 'edit' && editRow ? editRow.transaction_type : ''}
        initialDate={modalMode === 'edit' && editRow ? toDateFormat(editRow.date) : ''}
        initialDescription={modalMode === 'edit' && editRow ? editRow.description : ''}
        mode={modalMode}
        editId={modalMode === 'edit' && editRow ? editRow.id : undefined}
      />
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => { setIsDeleteModalOpen(false); setDeleteRow(null); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => deleteRow && handleDelete(deleteRow)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}