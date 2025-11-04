import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Search,
  Filter,
  Download,
  UserX,
  Shield,
  Mail,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@church.org',
    role: 'Senior Pastor',
    status: 'active',
    points: 2450,
    pathsCompleted: 5,
    joinedDate: '2024-01-15',
    lastActive: '2 hours ago',
    isAdmin: false
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.c@church.org',
    role: 'Youth Minister',
    status: 'active',
    points: 1980,
    pathsCompleted: 4,
    joinedDate: '2024-01-20',
    lastActive: '1 day ago',
    isAdmin: false
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@church.org',
    role: 'Worship Leader',
    status: 'active',
    points: 3125,
    pathsCompleted: 6,
    joinedDate: '2024-01-10',
    lastActive: '3 hours ago',
    isAdmin: true
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.k@church.org',
    role: 'Admin Team',
    status: 'active',
    points: 1650,
    pathsCompleted: 3,
    joinedDate: '2024-02-01',
    lastActive: '5 hours ago',
    isAdmin: false
  },
  {
    id: 5,
    name: 'Jessica Thompson',
    email: 'jessica.t@church.org',
    role: 'Volunteer Leader',
    status: 'inactive',
    points: 890,
    pathsCompleted: 2,
    joinedDate: '2024-02-15',
    lastActive: '2 weeks ago',
    isAdmin: false
  }
];

const UserActionsMenu = ({ user, onToggleAdmin }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="shadow-lg">
        <DropdownMenuItem>
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleAdmin(user.id)}>
          <Shield className="w-4 h-4 mr-2" />
          {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <UserX className="w-4 h-4 mr-2" />
          Deactivate User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function UserManager() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleExportUsers = () => {
    const csv = users.map(u => 
      `${u.id},${u.name},${u.email},${u.role},${u.status},${u.points},${u.pathsCompleted}`
    ).join('\n');
    const blob = new Blob([`ID,Name,Email,Role,Status,Points,Paths Completed\n${csv}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  const toggleAdminStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u
    ));
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 shadow-sm"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[180px] shadow-sm">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Senior Pastor">Senior Pastor</SelectItem>
                <SelectItem value="Youth Minister">Youth Minister</SelectItem>
                <SelectItem value="Worship Leader">Worship Leader</SelectItem>
                <SelectItem value="Admin Team">Admin Team</SelectItem>
                <SelectItem value="Volunteer Leader">Volunteer Leader</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] shadow-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportUsers} className="shadow-sm hover:shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">Users ({filteredUsers.length})</CardTitle>
          <CardDescription className="text-[var(--text-secondary)]">Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-[var(--text-primary)]">User</TableHead>
                  <TableHead className="text-[var(--text-primary)]">Role</TableHead>
                  <TableHead className="text-[var(--text-primary)]">Status</TableHead>
                  <TableHead className="text-right text-[var(--text-primary)]">Points</TableHead>
                  <TableHead className="text-right text-[var(--text-primary)]">Completed</TableHead>
                  <TableHead className="text-[var(--text-primary)]">Last Active</TableHead>
                  <TableHead className="text-right text-[var(--text-primary)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-b border-gray-100">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="shadow-sm">
                          <AvatarFallback className="bg-purple-100 text-purple-700">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[var(--text-primary)]">{user.name}</p>
                            {user.isAdmin && (
                              <Shield className="w-3 h-3 text-purple-600" />
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[var(--text-primary)]">{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="shadow-sm">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[var(--text-primary)]">{user.points}</TableCell>
                    <TableCell className="text-right text-[var(--text-primary)]">{user.pathsCompleted}</TableCell>
                    <TableCell className="text-sm text-[var(--text-secondary)]">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <UserActionsMenu user={user} onToggleAdmin={toggleAdminStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
