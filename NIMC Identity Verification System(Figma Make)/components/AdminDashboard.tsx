import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { VerificationBadge } from "./VerificationBadge";
import { Search, Filter, Eye, Download, RefreshCw } from "lucide-react";

interface VerificationRequest {
  id: string;
  username: string;
  email: string;
  status: "verified" | "pending" | "failed";
  submittedAt: string;
  processedAt?: string;
  failureReason?: string;
}

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock data - in real app this would come from API
  const mockRequests: VerificationRequest[] = [
    {
      id: "req_001",
      username: "john_doe",
      email: "john@example.com",
      status: "verified",
      submittedAt: "2025-01-06T10:30:00Z",
      processedAt: "2025-01-06T10:35:00Z"
    },
    {
      id: "req_002", 
      username: "jane_smith",
      email: "jane@example.com",
      status: "pending",
      submittedAt: "2025-01-06T11:15:00Z"
    },
    {
      id: "req_003",
      username: "mike_wilson",
      email: "mike@example.com", 
      status: "failed",
      submittedAt: "2025-01-06T09:45:00Z",
      processedAt: "2025-01-06T09:50:00Z",
      failureReason: "NIN not found in NIMC database"
    },
    {
      id: "req_004",
      username: "sarah_jones",
      email: "sarah@example.com",
      status: "verified",
      submittedAt: "2025-01-05T16:20:00Z",
      processedAt: "2025-01-05T16:25:00Z"
    },
    {
      id: "req_005",
      username: "david_brown",
      email: "david@example.com",
      status: "pending",
      submittedAt: "2025-01-06T12:00:00Z"
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockRequests.length,
    verified: mockRequests.filter(r => r.status === "verified").length,
    pending: mockRequests.filter(r => r.status === "pending").length,
    failed: mockRequests.filter(r => r.status === "failed").length
  };

  const handleViewDetails = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[var(--nimc-dark)]">NIMC Verification Dashboard</h1>
            <p className="text-[var(--nimc-text)]">Manage identity verification requests</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl text-[var(--nimc-dark)]">{stats.total}</p>
                <p className="text-sm text-[var(--nimc-text)]">Total Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl text-green-600">{stats.verified}</p>
                <p className="text-sm text-[var(--nimc-text)]">Verified</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-[var(--nimc-text)]">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl text-red-600">{stats.failed}</p>
                <p className="text-sm text-[var(--nimc-text)]">Failed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[var(--nimc-dark)]">Verification Requests</CardTitle>
            <CardDescription className="text-[var(--nimc-text)]">
              Monitor and manage identity verification requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--nimc-text)] w-4 h-4" />
                  <Input
                    placeholder="Search by username or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Processed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-[var(--nimc-text)]">
                        No verification requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="text-[var(--nimc-dark)]">{request.username}</p>
                            <p className="text-sm text-[var(--nimc-text)]">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <VerificationBadge status={request.status} size="sm" />
                        </TableCell>
                        <TableCell className="text-[var(--nimc-text)]">
                          {formatDate(request.submittedAt)}
                        </TableCell>
                        <TableCell className="text-[var(--nimc-text)]">
                          {request.processedAt ? formatDate(request.processedAt) : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-md">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-[var(--nimc-dark)]">Verification Details</DialogTitle>
                  <DialogDescription className="text-[var(--nimc-text)]">
                    Request ID: {selectedRequest.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">Username</p>
                      <p className="text-[var(--nimc-dark)]">{selectedRequest.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">Status</p>
                      <VerificationBadge status={selectedRequest.status} size="sm" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--nimc-text)]">Email</p>
                    <p className="text-[var(--nimc-dark)]">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--nimc-text)]">Submitted At</p>
                    <p className="text-[var(--nimc-dark)]">{formatDate(selectedRequest.submittedAt)}</p>
                  </div>
                  {selectedRequest.processedAt && (
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">Processed At</p>
                      <p className="text-[var(--nimc-dark)]">{formatDate(selectedRequest.processedAt)}</p>
                    </div>
                  )}
                  {selectedRequest.failureReason && (
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">Failure Reason</p>
                      <p className="text-red-600">{selectedRequest.failureReason}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}