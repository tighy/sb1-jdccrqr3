import React, { useState } from 'react';
import { BarChart2, Plus, Check, Edit2, Trash2, ThumbsUp, ThumbsDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const initialPolls = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 42 },
      { id: 2, text: "Python", votes: 37 },
      { id: 3, text: "Java", votes: 15 },
      { id: 4, text: "C#", votes: 22 },
    ],
    totalVotes: 116,
    createdAt: "2023-04-15T10:30:00Z",
    isActive: true,
  },
  {
    id: 2,
    question: "Which frontend framework do you prefer?",
    options: [
      { id: 1, text: "React", votes: 56 },
      { id: 2, text: "Vue", votes: 28 },
      { id: 3, text: "Angular", votes: 18 },
      { id: 4, text: "Svelte", votes: 12 },
    ],
    totalVotes: 114,
    createdAt: "2023-04-12T14:45:00Z",
    isActive: true,
  },
  {
    id: 3,
    question: "How many hours do you code per day?",
    options: [
      { id: 1, text: "Less than 2", votes: 8 },
      { id: 2, text: "2-4", votes: 24 },
      { id: 3, text: "4-6", votes: 32 },
      { id: 4, text: "6+", votes: 16 },
    ],
    totalVotes: 80,
    createdAt: "2023-04-10T09:15:00Z",
    isActive: false,
  },
];

function PollSystem() {
  const [polls, setPolls] = useState(initialPolls);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '', '']);
  const [editingPollId, setEditingPollId] = useState<number | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, number>>({});

  const calculatePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const addOption = () => {
    setNewPollOptions([...newPollOptions, '']);
  };

  const removeOption = (index: number) => {
    if (newPollOptions.length <= 2) return;
    setNewPollOptions(newPollOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newPollOptions];
    updatedOptions[index] = value;
    setNewPollOptions(updatedOptions);
  };

  const createPoll = () => {
    if (!newPollQuestion.trim() || newPollOptions.some(opt => !opt.trim())) {
      alert('Please fill in all fields');
      return;
    }

    const filteredOptions = newPollOptions.filter(opt => opt.trim());
    if (filteredOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    const newPoll = {
      id: Math.max(0, ...polls.map(p => p.id)) + 1,
      question: newPollQuestion,
      options: filteredOptions.map((text, index) => ({
        id: index + 1,
        text,
        votes: 0,
      })),
      totalVotes: 0,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    setPolls([newPoll, ...polls]);
    setShowCreateForm(false);
    setNewPollQuestion('');
    setNewPollOptions(['', '', '']);
  };

  const vote = (pollId: number, optionId: number) => {
    if (userVotes[pollId] !== undefined) return;

    setPolls(
      polls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(opt => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );

    setUserVotes({ ...userVotes, [pollId]: optionId });
  };

  const togglePollStatus = (pollId: number) => {
    setPolls(
      polls.map(poll => {
        if (poll.id === pollId) {
          return { ...poll, isActive: !poll.isActive };
        }
        return poll;
      })
    );
  };

  const deletePoll = (pollId: number) => {
    if (confirm('Are you sure you want to delete this poll?')) {
      setPolls(polls.filter(poll => poll.id !== pollId));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Poll System" 
        icon={<BarChart2 className="h-8 w-8 text-blue-500" />}
        description="Create polls and collect votes from users."
        action={
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </button>
        }
      />

      {/* Create Poll Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Poll</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                id="question"
                value={newPollQuestion}
                onChange={(e) => setNewPollQuestion(e.target.value)}
                placeholder="Enter your question"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options
              </label>
              {newPollOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {index > 1 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Remove option"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </button>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={createPoll}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polls List */}
      <div className="space-y-6">
        {polls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No polls yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new poll.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
              </button>
            </div>
          </div>
        ) : (
          polls.map((poll) => (
            <div key={poll.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{poll.question}</h3>
                    <p className="text-sm text-gray-500">
                      Created on {formatDate(poll.createdAt)} • {poll.totalVotes} votes
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => togglePollStatus(poll.id)}
                      className={`p-1.5 rounded-md ${
                        poll.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                      title={poll.isActive ? 'Mark as inactive' : 'Mark as active'}
                    >
                      {poll.isActive ? (
                        <ThumbsUp className="h-5 w-5" />
                      ) : (
                        <ThumbsDown className="h-5 w-5" />
                      )}
                    </button>
                    {editingPollId !== poll.id && (
                      <>
                        <button
                          onClick={() => setEditingPollId(poll.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Edit poll"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deletePoll(poll.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          title="Delete poll"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={`px-5 pb-5 ${!poll.isActive ? 'opacity-75' : ''}`}>
                <div className="space-y-3">
                  {poll.options.map((option) => {
                    const percentage = calculatePercentage(option.votes, poll.totalVotes);
                    const hasVoted = userVotes[poll.id] === option.id;
                    
                    return (
                      <div key={option.id} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <button
                            onClick={() => poll.isActive && vote(poll.id, option.id)}
                            disabled={!poll.isActive || userVotes[poll.id] !== undefined}
                            className={`flex items-center text-sm font-medium ${
                              hasVoted ? 'text-blue-600' : 'text-gray-700'
                            } ${
                              poll.isActive && userVotes[poll.id] === undefined 
                                ? 'hover:text-blue-600' 
                                : ''
                            }`}
                          >
                            {hasVoted && <Check className="h-4 w-4 mr-1.5 text-blue-600" />}
                            {option.text}
                          </button>
                          <span className="text-sm font-medium text-gray-500">
                            {percentage}% ({option.votes})
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              hasVoted ? 'bg-blue-600' : 'bg-gray-400'
                            } transition-all duration-500 ease-out`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!poll.isActive && (
                  <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                    <span className="mr-1">•</span> Poll closed
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PollSystem;