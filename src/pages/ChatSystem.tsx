import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Smile, Paperclip, Search, User, Phone, Video, MoreHorizontal, Image } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "online",
    lastSeen: "now",
    unread: 2,
  },
  {
    id: 2,
    name: "Michael Smith",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "offline",
    lastSeen: "2h ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Jessica Williams",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "online",
    lastSeen: "now",
    unread: 0,
  },
  {
    id: 4,
    name: "David Miller",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "online",
    lastSeen: "now",
    unread: 1,
  },
  {
    id: 5,
    name: "Emma Davis",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "offline",
    lastSeen: "1d ago",
    unread: 0,
  },
];

// Init conversation with first user
const initialMessages = [
  {
    id: 1,
    sender: 1, // Sarah Johnson
    text: "Hi there! How are you doing today?",
    timestamp: "2023-04-15T10:30:00Z",
    isRead: true,
  },
  {
    id: 2,
    sender: "me",
    text: "Hey Sarah! I'm doing well, thanks for asking. Just finishing up some work. How about you?",
    timestamp: "2023-04-15T10:32:00Z",
    isRead: true,
  },
  {
    id: 3,
    sender: 1,
    text: "I'm good too! Just preparing for our meeting tomorrow. Did you get a chance to look at the proposal I sent?",
    timestamp: "2023-04-15T10:35:00Z",
    isRead: true,
  },
  {
    id: 4,
    sender: "me",
    text: "Yes, I did! It looks really good. I have a few suggestions that we can discuss tomorrow.",
    timestamp: "2023-04-15T10:40:00Z",
    isRead: true,
  },
  {
    id: 5,
    sender: 1,
    text: "Great! Looking forward to hearing your thoughts. Is 10am still good for you?",
    timestamp: "2023-04-15T10:45:00Z",
    isRead: false,
  },
];

function ChatSystem() {
  const [contacts, setContacts] = useState(mockContacts);
  const [currentContact, setCurrentContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (lastSeen: string) => {
    if (lastSeen === 'now') return 'Online';
    return `Last seen ${lastSeen}`;
  };

  const handleContactSelect = (contact: typeof contacts[0]) => {
    // Update the unread count for the selected contact
    setContacts(contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    ));
    
    setCurrentContact(contact);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a reply after a short delay
    if (currentContact.id === 1) {
      setTimeout(() => {
        const replyMsg = {
          id: messages.length + 2,
          sender: currentContact.id,
          text: "Sure, 10am works for me. See you then!",
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        
        setMessages(msgs => [...msgs, replyMsg]);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chat System" 
        icon={<MessageSquare className="h-8 w-8 text-sky-500" />}
        description="Chat with your contacts in real-time."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden flex h-[calc(100vh-16rem)]">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <li key={contact.id}>
                  <button
                    onClick={() => handleContactSelect(contact)}
                    className={`w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${
                      currentContact.id === contact.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 flex justify-between items-center min-w-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {contact.status === 'online' ? 'Online' : `Last seen ${contact.lastSeen}`}
                        </p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-sky-500 text-xs font-medium text-white">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex md:flex-1 flex-col">
          {currentContact ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={currentContact.avatar} 
                    alt={currentContact.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{currentContact.name}</h3>
                    <p className="text-xs text-gray-500">
                      {formatLastSeen(currentContact.status === 'online' ? 'now' : currentContact.lastSeen)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isFromMe = message.sender === "me";
                    const senderContact = !isFromMe 
                      ? contacts.find(c => c.id === message.sender) 
                      : null;
                    
                    return (
                      <div 
                        key={message.id}
                        className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isFromMe && (
                          <img 
                            src={senderContact?.avatar} 
                            alt={senderContact?.name} 
                            className="h-8 w-8 rounded-full mr-2 object-cover self-end"
                          />
                        )}
                        <div 
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            isFromMe 
                              ? 'bg-sky-500 text-white' 
                              : 'bg-white border border-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p 
                            className={`text-xs mt-1 text-right ${
                              isFromMe ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            {formatMessageTime(message.timestamp)}
                            {isFromMe && (
                              <span className="ml-1">
                                {message.isRead ? (
                                  <svg className="inline-block h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="inline-block h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="px-4 py-3 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 mx-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No contact selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a contact to start chatting
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: No contact selected message */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 md:hidden">
          <div className="text-center p-6">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your Messages</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a contact to start chatting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSystem;