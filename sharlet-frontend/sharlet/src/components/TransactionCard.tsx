import React, { Fragment, useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import API from "../services/API";

interface TransactionCardProps {
  isOpen: boolean;
  onClose: () => void;
  user_id: string;
  onAdd?: () => void;
  initialAmount?: string;
  initialTransactionType?: string;
  initialDate?: string;
  initialDescription?: string;
  mode?: 'add' | 'edit';
  editId?: string;
}

// Utility to convert DD/MM/YYYY or Date string to YYYY-MM-DD
function toInputDateFormat(dateStr: string) {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr; // already correct
  if (/^[A-Za-z]{3},/.test(dateStr)) {
    // Handle 'Sun, 25 May 2025 00:00:00 GMT' and similar
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().slice(0, 10);
    }
  }
  const [dd, mm, yyyy] = dateStr.split("/");
  if (yyyy && mm && dd) return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  return dateStr;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  isOpen,
  onClose,
  user_id,
  onAdd,
  initialAmount = "",
  initialTransactionType = "",
  initialDate = "",
  initialDescription = "",
  mode = 'add',
  editId
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [transaction_type, setTransactionType] = useState(initialTransactionType);
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAmount(initialAmount);
      setTransactionType(initialTransactionType);
      setDate(toInputDateFormat(initialDate));
      setDescription(initialDescription);
    }
  }, [isOpen, initialAmount, initialTransactionType, initialDate, initialDescription]);

  const handleClose = () => {
    setAmount("");
    setTransactionType("");
    setDate("");
    setDescription("");
    onClose();
  };

  const handleSubmit = () => {
    if (!amount || !transaction_type || !date || !description) {
      setError("All fields are required.");
      setTimeout(() => setError(""), 2000);
      handleClose();
      return;
    }
    const newTransaction = { amount, transaction_type, date, description, user_id };
    if (mode === 'edit' && editId) {
      API.put(`/api/v1/transactions/${editId}`, newTransaction)
        .then(() => {
          if (onAdd) onAdd();
          handleClose();
        })
        .catch(() => {
          setError("Error occurred while editing transaction");
          setTimeout(() => setError(""), 2000);
          handleClose();
        });
    } else {
      API.post('/api/v1/transactions', newTransaction)
        .then(() => {
          if (onAdd) onAdd();
          handleClose();
        })
        .catch(() => {
          setError("Error occurred while adding transaction");
          setTimeout(() => setError(""), 2000);
          handleClose();
        });
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow z-50 transition-all">
          {error}
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {mode === 'edit' ? 'Edit Transaction' : 'Add New Transaction'}
                  </DialogTitle>
                  <div className="mt-4 flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Amount"
                      className="border rounded px-3 py-2"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      className="border rounded px-3 py-2"
                      value={transaction_type}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <input
                      type="date"
                      placeholder="Date"
                      className="border rounded px-3 py-2"
                      value={toInputDateFormat(date)}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      className="border rounded px-3 py-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 ${mode === 'edit' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded`}
                      onClick={handleSubmit}
                    >
                      {mode === 'edit' ? 'Edit' : 'Add'}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TransactionCard;
