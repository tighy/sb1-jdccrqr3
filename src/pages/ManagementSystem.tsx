import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Clock, FileText, BarChart, Settings, Plus, Edit, Trash } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with modern UI/UX",
    status: "In Progress",
    deadline: "2023-05-15",
    progress: 65,
    team: [
      { id: 1, name: "John Doe", role: "UI Designer" },
      { id: 2, name: "Sarah Smith", role: "Front-end Developer" },
      { id: 3, name: "Mike Johnson", role: "Project Manager" },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android",
    status: "Planning",
    deadline: "2023-06-30",
    progress: 15,
    team: [
      { id: 2, name: "Sarah Smith", role: "Front-end Developer" },
      { id: 4, name: "Jessica Taylor", role: "Mobile Developer" },
      { id: 5, name: "Kevin Brown", role: "Back-end Developer" },
    ],
  },
  {
    id: 3,
    name: "Content Management System",
    description: "Create a custom CMS for the marketing team",
    status: "Completed",
    deadline: "2023-04-10",
    progress: 100,
    team: [
      { id: 3, name: "Mike Johnson", role: "Project Manager" },
      { id: 5, name: "Kevin Brown", role: "Back-end Developer" },
      { id: 6, name: "Lisa Wang", role: "QA Engineer" },
    ],
  },
];

const mockTasks = [
  {
    id: 1,
    title: "Design homepage wireframes",
    description: "Create wireframes for the new website homepage",
    status: "Completed",
    priority: "High",
    dueDate: "2023-04-18",
    projectId: 1,
    assignee: { id: 1, name: "John Doe" },
  },
  {
    id: 2,
    title: "Set up React project structure",
    description: "Initialize the React project and set up the folder structure",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-04-20",
    projectId: 1,
    assignee: { id: 2, name: "Sarah Smith" },
  },
  {
    id: 3,
    title: "API endpoint design",
    description: "Design the API endpoints for the mobile app",
    status: "To Do",
    priority: "High",
    dueDate: "2023-04-25",
    projectId: 2,
    assignee: { id: 5, name: "Kevin Brown" },
  },
  {
    id: 4,
    title: "Create test cases",
    description: "Write test cases for the CMS functionality",
    status: "Completed",
    priority: "Medium",
    dueDate: "2023-04-08",
    projectId: 3,
    assignee: { id: 6, name: "Lisa Wang" },
  },
  {
    id: 5,
    title: "Configure CI/CD pipeline",
    description: "Set up automated deployment pipeline for the website",
    status: "To Do",
    priority: "Low",
    dueDate: "2023-04-30",
    projectId: 1,
    assignee: { id: 5, name: "Kevin Brown" },
  },
];

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  deadline: string;
  progress: number;
  team: { id: number; name: string; role: string }[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: number;
  assignee: { id: number; name: string };
}

function ManagementSystem() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-indigo-100 text-indigo-800';
      case 'to do':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectById = (id: number) => {
    return projects.find(project => project.id === id);
  };

  const getTasksByProjectId = (projectId: number) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const handleTaskEdit = (task: Task) => {
    setCurrentTask(task);
    setShowTaskModal(true);
  };

  const handleTaskDelete = (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('tasks');
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Management System" 
        icon={<LayoutDashboard className="h-8 w-8 text-purple-500" />}
        description="Manage your projects, tasks, and resources efficiently."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'projects'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Projects
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'tasks'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Tasks
              </div>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'calendar'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </div>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'team'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'reports'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Reports
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Projects</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member) => (
                            <div 
                              key={member.id}
                              className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800"
                              title={`${member.name} (${member.role})`}
                            >
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(project.deadline)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
                  {selectedProject && (
                    <p className="text-sm text-gray-500">
                      Filtered by project: <span className="font-medium">{selectedProject.name}</span>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        (Clear)
                      </button>
                    </p>
                  )}
                </div>
                <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </button>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {(selectedProject 
                    ? getTasksByProjectId(selectedProject.id) 
                    : tasks
                  ).map((task) => (
                    <li key={task.id}>
                      <div 
                        className="px-4 py-4 flex items-center hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTaskSelect(task)}
                      >
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0 w-4 h-4 rounded-full border border-gray-300 bg-white mr-4"></div>
                          <div className="min-w-0 flex-1 px-4">
                            <div>
                              <p className="text-sm font-medium text-purple-600 truncate">{task.title}</p>
                              <p className="mt-1 text-sm text-gray-500 truncate">{task.description}</p>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500 mr-6">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <span>{formatDate(task.dueDate)}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <span>{task.assignee.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)} mr-2`}>
                            {task.status}
                          </span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)} mr-4`}>
                            {task.priority}
                          </span>
                          <div className="flex space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskEdit(task);
                              }} 
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskDelete(task.id);
                              }} 
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Calendar View</h3>
              <p className="mt-1 text-sm text-gray-500">
                Calendar functionality coming soon.
              </p>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Team Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                Team management functionality coming soon.
              </p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <BarChart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Reports</h3>
              <p className="mt-1 text-sm text-gray-500">
                Reporting functionality coming soon.
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                System settings coming soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Task</h3>
                    <div className="mt-4">
                      {/* Form fields would go here */}
                      <p className="text-sm text-gray-500">Task editing UI coming soon.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button type="button" onClick={() => setShowTaskModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagementSystem;