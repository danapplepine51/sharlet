import { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";


const TransactionCard = ({ row, onClose }: { row: any, onClose: () => void }) => {
  return (
    <Transition appear show={!!row} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Row Details
                </Dialog.Title>
                <div className="mt-2">
                  <p><strong>Name:</strong> {row?.name}</p>
                  <p><strong>Category:</strong> {row?.category}</p>
                  <p><strong>Date:</strong> {row?.date}</p>
                  <p><strong>Description:</strong> {row?.description}</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => alert('Edit functionality')}
                  >
                    Edit
                  </button>
                  {/* <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => alert('Delete functionality')}
                  >
                    Delete
                  </button> */}
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransactionCard;