import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlarmClock, Timer, PieChart, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Check, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

// Mock data for demonstration
const mockTasks = [
  {
    id: 1,
    title: "Website Development",
    category: "Work",
    timeSpent: 12600, // In seconds (3.5 hours)
    color: "blue",
  },
  {
    id: 2,
    title: "Client Meeting",
    category: "Work",
    timeSpent: 5400, // In seconds (1.5 hours)
    color: "blue",
  },
  {
    id: 3,
    title: "Gym Workout",
    category: "Health",
    timeSpent: 3600, // In seconds (1 hour)
    color: "green",
  },
  {
    id: 4,
    title: "Reading",
    category: "Personal",
    timeSpent: 7200, // In seconds (2 hours)
    color: "purple",
  },
  {
    id: 5,
    title: "Language Learning",
    category: "Education",
    timeSpent: 1800, // In seconds (0.5 hours)
    color: "yellow",
  },
];

const mockReminders = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    days: ["Monday", "Wednesday", "Friday"],
    isActive: true,
  },
  {
    id: 2,
    title: "Take Medication",
    time: "08:00 AM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    isActive: true,
  },
  {
    id: 3,
    title: "Gym Time",
    time: "06:00 PM",
    days: ["Monday", "Wednesday", "Friday"],
    isActive: false,
  },
];

const mockSchedule = [
  {
    id: 1,
    title: "Project Meeting",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    date: new Date(),
    category: "Work",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 2,
    title: "Lunch with Client",
    startTime: "12:30 PM",
    endTime: "01:30 PM",
    date: new Date(),
    category: "Work",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 3,
    title: "Gym Session",
    startTime: "05:30 PM",
    endTime: "06:30 PM",
    date: new Date(),
    category: "Health",
    color: "bg-green-100 border-green-300 text-green-800",
  },
];

function TimeSystem() {
  const [activeTab, setActiveTab] = useState('timer');
  const [tasks, setTasks] = useState(mockTasks);
  const [reminders, setReminders] = useState(mockReminders);
  const [selectedTask, setSelectedTask] = useState<typeof mockTasks[0] | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(mockSchedule);

  // Timer functionality
  useEffect(() => {
    let interval: number | null = null;
    
    if (timerRunning && selectedTask) {
      interval = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timerRunning, selectedTask]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeHoursMinutes = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const startTimer = () => {
    if (selectedTask) {
      setTimerRunning(true);
    }
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const stopTimer = () => {
    if (selectedTask) {
      // Update the task with new time
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id 
            ? { ...task, timeSpent: task.timeSpent + elapsedTime } 
            : task
        )
      );
      
      setTimerRunning(false);
      setElapsedTime(0);
      setSelectedTask(null);
    }
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setTimerRunning(false);
  };

  const selectTask = (task: typeof mockTasks[0]) => {
    if (timerRunning) {
      // Save current task progress before switching
      stopTimer();
    }
    
    setSelectedTask(task);
    setElapsedTime(0);
  };

  const toggleReminderActive = (reminderId: number) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, isActive: !reminder.isActive } 
          : reminder
      )
    );
  };

  // Calendar helpers
  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate)
  });

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.date), day)
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'health':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'personal':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'education':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Time System" 
        icon={<Clock className="h-8 w-8 text-teal-500" />}
        description="Track your time, set reminders, and manage your schedule."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('timer')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'timer'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-2" />
                Time Tracker
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'reminders'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <AlarmClock className="h-4 w-4 mr-2" />
                Reminders
              </div>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'schedule'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'stats'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Statistics
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'timer' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Timer Section */}
              <div className="md:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Time Tracker</h2>
                    <p className="text-sm text-gray-600">
                      {selectedTask 
                        ? `Tracking time for: ${selectedTask.title}` 
                        : 'Select a task to start tracking time'}
                    </p>
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className="text-center">
                      <div className="text-6xl font-mono font-bold text-gray-900 mb-4">
                        {formatTime(elapsedTime)}
                      </div>
                      <div className="flex justify-center space-x-3">
                        {!timerRunning ? (
                          <button
                            onClick={startTimer}
                            disabled={!selectedTask}
                            className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Play className="h-6 w-6" />
                          </button>
                        ) : (
                          <button
                            onClick={pauseTimer}
                            className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <Pause className="h-6 w-6" />
                          </button>
                        )}
                        <button
                          onClick={resetTimer}
                          disabled={!selectedTask}
                          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RotateCcw className="h-6 w-6" />
                        </button>
                        <button
                          onClick={stopTimer}
                          disabled={!selectedTask}
                          className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Check className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Today's Progress</h3>
                    <div className="space-y-3">
                      {tasks.slice(0, 3).map(task => (
                        <div key={task.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                              <p className="text-xs text-gray-500">{task.category}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatTimeHoursMinutes(task.timeSpent)}
                            </div>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-${task.color}-500`}
                              style={{ width: `${Math.min(100, (task.timeSpent / 28800) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Section */}
              <div className="md:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
                    <button className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-full">
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div 
                        key={task.id}
                        onClick={() => selectTask(task)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTask?.id === task.id 
                            ? 'bg-teal-50 border-teal-300' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                            <p className="text-xs text-gray-500">{task.category}</p>
                          </div>
                          <span className={`inline-block w-3 h-3 rounded-full bg-${task.color}-500`}></span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          Total: {formatTimeHoursMinutes(task.timeSpent)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reminders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Reminders</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Reminder
                </button>
              </div>

              <div className="space-y-4">
                {reminders.map(reminder => (
                  <div key={reminder.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{reminder.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {reminder.time} • {reminder.days.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleReminderActive(reminder.id)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            reminder.isActive ? 'bg-teal-500' : 'bg-gray-200'
                          }`}
                        >
                          <span 
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              reminder.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></span>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-full">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {reminders.length === 0 && (
                <div className="text-center py-12">
                  <AlarmClock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No reminders</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a reminder to get notifications at specific times.
                  </p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reminder
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Weekly Schedule</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Event
                </button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={goToPreviousWeek}
                  className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-base font-medium text-gray-900">
                  {format(startOfWeek(currentDate), 'MMM d')} - {format(endOfWeek(currentDate), 'MMM d, yyyy')}
                </h3>
                <button 
                  onClick={goToNextWeek}
                  className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {weekDays.map((day, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      {format(day, 'E')}
                    </div>
                    <div 
                      className={`text-sm font-semibold rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                        isSameDay(day, new Date()) 
                          ? 'bg-teal-500 text-white' 
                          : 'text-gray-900'
                      }`}
                    >
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}

                {/* Events grid */}
                {weekDays.map((day, i) => (
                  <div key={`events-${i}`} className="min-h-[150px] border border-gray-200 rounded-md p-1">
                    <div className="h-full space-y-1">
                      {getEventsForDay(day).map(event => (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 rounded-md border ${event.color}`}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div>{event.startTime} - {event.endTime}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900 mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  {events.map(event => (
                    <div 
                      key={event.id}
                      className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className={`w-4 h-4 rounded-full ${event.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-500">
                          {format(new Date(event.date), 'MMM d')} • {event.startTime} - {event.endTime}
                        </p>
                      </div>
                      <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                        {event.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Time Statistics</h2>
                <div className="relative">
                  <select className="appearance-none pl-3 pr-8 py-1.5 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Custom Range</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Total Time Tracked</h3>
                    <p className="text-3xl font-bold text-teal-600 mt-2">
                      {formatTimeHoursMinutes(tasks.reduce((acc, task) => acc + task.timeSpent, 0))}
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Most Time Spent</h3>
                    <p className="text-xl font-medium text-gray-900 mt-2">Work</p>
                    <p className="text-sm text-gray-500">
                      {formatTimeHoursMinutes(tasks
                        .filter(task => task.category === 'Work')
                        .reduce((acc, task) => acc + task.timeSpent, 0)
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Top Task</h3>
                    <p className="text-xl font-medium text-gray-900 mt-2">Website Development</p>
                    <p className="text-sm text-gray-500">
                      {formatTimeHoursMinutes(12600)} 
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Time by Category</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="mx-auto h-16 w-16 text-gray-300" />
                    <p className="mt-2">Chart visualization would be displayed here</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-700">Work (53%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-700">Health (12%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-700">Personal (24%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-700">Education (11%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Activity</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart className="mx-auto h-16 w-16 text-gray-300" />
                    <p className="mt-2">Chart visualization would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeSystem;