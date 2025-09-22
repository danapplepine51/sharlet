import React, { Fragment, use, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import axios from "axios";

interface AddTransactionModalProps {
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

// Utility to convert DD/MM/YYYY to YYYY-MM-DD
function toInputDateFormat(dateStr: string) {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr; // already correct
  const [dd, mm, yyyy] = dateStr.split("/");
  if (yyyy && mm && dd) return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  return dateStr;
}

const AddTransactionCard: React.FC<AddTransactionModalProps> = ({
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

  // Update state if initial values change (e.g. when opening modal for a different transaction)
  React.useEffect(() => {
    if (isOpen) {
      setAmount(initialAmount);
      setTransactionType(initialTransactionType);
      setDate(toInputDateFormat(initialDate));
      setDescription(initialDescription);
    }
  }, [isOpen, initialAmount, initialTransactionType, initialDate, initialDescription]);


  const handleClose = () => {
    // setName("");
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
      axios.put(`http://192.168.1.151:5002/api/v1/transactions/${editId}`, newTransaction, { withCredentials: true })
        .then(response => {
          if (onAdd) onAdd();
          handleClose();
        })
        .catch(error => {
          setError("Error occurred while editing transaction");
          setTimeout(() => setError(""), 2000);
          handleClose();
        });
    } else {
      axios.post('http://192.168.1.151:5002/api/v1/transactions', newTransaction, { withCredentials: true })
        .then(response => {
          console.log('Transactions added:', response.data);
          if (onAdd) onAdd();
          handleClose();
        })
        .catch(error => {
          setError("Error occurred while adding transaction");
          console.log('Error occurred:', error);
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

export default AddTransactionCard;