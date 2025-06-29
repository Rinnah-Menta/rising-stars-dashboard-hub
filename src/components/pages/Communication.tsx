import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedInView from '@/components/AnimatedInView';
import { useCommunicationData, Message, Contact } from '@/hooks/useCommunicationData';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Edit, 
  Trash2, 
  Users, 
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  UserPlus
} from 'lucide-react';

export const Communication = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    messages, 
    contacts, 
    addMessage, 
    updateMessage, 
    deleteMessage, 
    addContact, 
    updateContact, 
    deleteContact 
  } = useCommunicationData();
  
  const [activeTab, setActiveTab] = useState<'messages' | 'contacts'>('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: 'delete' as 'delete',
    title: '',
    description: '',
    onConfirm: () => {}
  });

  const [newMessage, setNewMessage] = useState<Partial<Message>>({
    type: 'message',
    title: '',
    content: '',
    recipients: [],
    status: 'draft',
    priority: 'medium',
    sender: user?.role === 'admin' ? 'Admin Office' : `${user?.role} Office`
  });

  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    department: '',
    status: 'active'
  });

  const canManageCommunication = user?.role === 'admin' || user?.role === 'teacher';

  const handleDeleteMessage = (message: Message) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      title: 'Delete Message',
      description: `Are you sure you want to delete "${message.title}"? This action cannot be undone.`,
      onConfirm: () => {
        deleteMessage(message.id);
        toast({
          title: 'Message Deleted',
          description: 'The message has been permanently removed.',
          variant: 'destructive'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleDeleteContact = (contact: Contact) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      title: 'Delete Contact',
      description: `Are you sure you want to delete ${contact.name}? This action cannot be undone.`,
      onConfirm: () => {
        deleteContact(contact.id);
        toast({
          title: 'Contact Deleted',
          description: 'The contact has been permanently removed.',
          variant: 'destructive'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleSaveMessage = () => {
    if (!newMessage.title || !newMessage.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingMessage) {
      updateMessage(editingMessage.id, newMessage);
      toast({
        title: 'Message Updated',
        description: 'The message has been successfully updated.'
      });
    } else {
      addMessage(newMessage as Omit<Message, 'id' | 'date'>);
      toast({
        title: 'Message Created',
        description: 'The message has been successfully created.'
      });
    }

    resetMessageForm();
  };

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingContact) {
      updateContact(editingContact.id, newContact);
      toast({
        title: 'Contact Updated',
        description: 'The contact has been successfully updated.'
      });
    } else {
      addContact(newContact as Omit<Contact, 'id'>);
      toast({
        title: 'Contact Added',
        description: 'The contact has been successfully added.'
      });
    }

    resetContactForm();
  };

  const resetMessageForm = () => {
    setNewMessage({
      type: 'message',
      title: '',
      content: '',
      recipients: [],
      status: 'draft',
      priority: 'medium',
      sender: user?.role === 'admin' ? 'Admin Office' : `${user?.role} Office`
    });
    setEditingMessage(null);
    setIsMessageDialogOpen(false);
  };

  const resetContactForm = () => {
    setNewContact({
      name: '',
      role: '',
      email: '',
      phone: '',
      department: '',
      status: 'active'
    });
    setEditingContact(null);
    setIsContactDialogOpen(false);
  };

  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedInView>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Communication Center</h1>
            <p className="text-gray-600">Manage messages, announcements, and contacts</p>
          </div>
          {canManageCommunication && (
            <div className="flex gap-2">
              <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingMessage(null)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingMessage ? 'Edit Message' : 'Create New Message'}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newMessage.title || ''}
                        onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={newMessage.type} 
                        onValueChange={(value) => setNewMessage({...newMessage, type: value as Message['type']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="message">Message</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="urgent">Urgent Notice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={newMessage.content || ''}
                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={newMessage.priority} 
                        onValueChange={(value) => setNewMessage({...newMessage, priority: value as Message['priority']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={newMessage.status} 
                        onValueChange={(value) => setNewMessage({...newMessage, status: value as Message['status']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="sent">Send Now</SelectItem>
                          <SelectItem value="scheduled">Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button onClick={handleSaveMessage}>
                        {editingMessage ? 'Update' : 'Create'} Message
                      </Button>
                      <Button variant="outline" onClick={resetMessageForm}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setEditingContact(null)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newContact.name || ''}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newContact.email || ''}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newContact.phone || ''}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={newContact.role || ''}
                        onChange={(e) => setNewContact({...newContact, role: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button onClick={handleSaveContact}>
                        {editingContact ? 'Update' : 'Add'} Contact
                      </Button>
                      <Button variant="outline" onClick={resetContactForm}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </AnimatedInView>

      {/* Tabs */}
      <AnimatedInView>
        <div className="flex space-x-4 border-b">
          <button
            className={`pb-2 px-1 ${activeTab === 'messages' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages & Announcements
          </button>
          <button
            className={`pb-2 px-1 ${activeTab === 'contacts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
        </div>
      </AnimatedInView>

      {/* Search */}
      <AnimatedInView>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </AnimatedInView>

      {/* Content based on active tab */}
      {activeTab === 'messages' && (
        <AnimatedInView>
          <Card>
            <CardHeader>
              <CardTitle>Messages & Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    {canManageCommunication && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.title}</TableCell>
                      <TableCell className="capitalize">{message.type}</TableCell>
                      <TableCell>
                        <Badge variant={message.status === 'sent' ? 'default' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={message.priority === 'high' ? 'destructive' : message.priority === 'medium' ? 'default' : 'secondary'}>
                          {message.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                      {canManageCommunication && (
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setEditingMessage(message);
                                setNewMessage(message);
                                setIsMessageDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteMessage(message)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedInView>
      )}

      {activeTab === 'contacts' && (
        <AnimatedInView>
          <Card>
            <CardHeader>
              <CardTitle>Contact Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    {canManageCommunication && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                      </TableCell>
                      <TableCell>{contact.department}</TableCell>
                      <TableCell>
                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      {canManageCommunication && (
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setEditingContact(contact);
                                setNewContact(contact);
                                setIsContactDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteContact(contact)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedInView>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDialog.onConfirm}
        variant="destructive"
        type="delete"
      />
    </div>
  );
};
