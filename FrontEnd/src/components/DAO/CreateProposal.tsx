/** @format */

import { useState } from "react";
import { createProposal } from "../../Flow/GovernanceActions";

interface Props {
  onSubmit: (
    title: string,
    description: string,
    options: string[],
    startAt: Date,
    endAt: Date,
    minHoldedGVTAmount: number
  ) => void;
}

export default function CreateProposal({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [minHoldedGVTAmount, setMinHoldedGVTAmount] = useState(0.0);


  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const start = (startAt.getTime() / 1000).toFixed(2);
      const end = (endAt.getTime() / 1000).toFixed(2);

      const proposalId = await createProposal(
        title,
        description,
        options,
        start,
        end,
        minHoldedGVTAmount.toFixed(2)
      );

      onSubmit(title, description, options, startAt, endAt, minHoldedGVTAmount);
      console.log(`Proposal ${proposalId} created`);
    } catch (err) {
      console.error(`Error creating proposal: ${err} startAt: ${typeof startAt} endAt: ${typeof endAt}`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-start mt-10'>
      <div className='py-5 text-white'>
        <form
          className='max-w-3xl mx-auto p-2'
          onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block mb-2 font-bold'>
              Title
            </label>
            <input
              type='text'
              id='title'
              className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block mb-2 font-bold'>
              Description
            </label>
            <textarea
              id='description'
              className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className='mb-4'>
            <div className='mb-4 flex items-center'>
              <label
                htmlFor='options'
                className='block mb-2 font-bold'>
                Options
              </label>
              <button
                type='button'
                className='ml-2 px-3 py-1 bg-green-700  text-white rounded-full'
                onClick={handleAddOption}>
                +
              </button>
            </div>
            {options.map((option, index) => (
              <div
                key={index}
                className='mb-2'>
                <input
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='startAt'
              className='block mb-2 font-bold'>
              Start At
            </label>
            <input
              type='date'
              id='startAt'
              pattern='\d{4}-\d{2}-\d{2}'
              className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={startAt.toISOString().slice(0, 10)}
              onChange={(e) => {
                const dateValue = e.target.value;
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                  setStartAt(date);
                }
              }}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='endAt'
              className='block mb-2 font-bold'>
              End At
            </label>
            <input
              type='date'
              id='endAt'
              pattern='\d{4}-\d{2}-\d{2}'
              className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={endAt.toISOString().slice(0, 10)}
              onChange={(e) => {
                const EndDateValue = e.target.value;
                const EndDate = new Date(EndDateValue);
                if (!isNaN(EndDate.getTime())) {
                  setEndAt(EndDate);
                }
              }}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='minHoldedGVTAmount'
              className='block mb-2 font-bold'>
              Minimum Governance Token Amount
            </label>
            <input
              type='number'
              id='minHoldedGVTAmount'
              className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={minHoldedGVTAmount}
              onChange={(e) => setMinHoldedGVTAmount(parseInt(e.target.value))}
            />
          </div>
          <div className='mb-4'>
            <button
              type='submit'
              className='w-full px-3 py-1 bg-green-700 text-white rounded-md'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
