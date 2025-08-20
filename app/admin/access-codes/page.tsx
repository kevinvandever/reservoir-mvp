'use client'

import { useState, useEffect } from 'react'
import { AccessCodeService } from '@/lib/access/access-code-service'
import type { AccessCode } from '@/lib/access/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Copy, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  User,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Ban
} from 'lucide-react'

export default function AccessCodeManagement() {
  const [codes, setCodes] = useState<AccessCode[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [analytics, setAnalytics] = useState<any>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [newCode, setNewCode] = useState({
    member_name: '',
    member_email: '',
    source: 'direct',
    max_uses: 1,
    expires_in_days: 30
  })

  const accessService = new AccessCodeService()

  useEffect(() => {
    loadCodes()
    loadAnalytics()
  }, [])

  const loadCodes = async () => {
    setLoading(true)
    try {
      const fetchedCodes = await accessService.getAllCodes()
      setCodes(fetchedCodes)
    } catch (error) {
      console.error('Error loading access codes:', error)
      showMessage('error', 'Failed to load access codes')
    } finally {
      setLoading(false)
    }
  }

  const loadAnalytics = async () => {
    try {
      const data = await accessService.getAccessAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
  }

  const generateCode = async () => {
    setGenerating(true)
    try {
      const result = await accessService.generateCode(newCode)
      
      if (result.error) {
        showMessage('error', result.error)
      } else {
        showMessage('success', `Access code generated: ${result.code}`)
        setNewCode({
          member_name: '',
          member_email: '',
          source: 'direct',
          max_uses: 1,
          expires_in_days: 30
        })
        
        // Refresh the codes list
        await loadCodes()
        await loadAnalytics()
        
        // Copy to clipboard
        await navigator.clipboard.writeText(result.code)
        showMessage('success', `Code ${result.code} generated and copied to clipboard!`)
      }
    } catch (error) {
      console.error('Error generating code:', error)
      showMessage('error', 'Failed to generate access code')
    } finally {
      setGenerating(false)
    }
  }

  const updateCodeStatus = async (codeId: string, status: 'active' | 'disabled') => {
    try {
      const success = await accessService.updateCodeStatus(codeId, status)
      
      if (success) {
        showMessage('success', `Code status updated to ${status}`)
        await loadCodes()
        await loadAnalytics()
      } else {
        showMessage('error', 'Failed to update code status')
      }
    } catch (error) {
      console.error('Error updating code status:', error)
      showMessage('error', 'Failed to update code status')
    }
  }

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      showMessage('success', 'Code copied to clipboard')
    } catch (error) {
      showMessage('error', 'Failed to copy code')
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const filteredCodes = codes.filter(code => {
    const matchesSearch = !searchTerm || 
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.member_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.member_email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || code.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'used': return <Shield className="h-4 w-4 text-blue-600" />
      case 'expired': return <Clock className="h-4 w-4 text-orange-600" />
      case 'disabled': return <Ban className="h-4 w-4 text-red-600" />
      default: return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'used': return 'bg-blue-100 text-blue-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      case 'disabled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Access Code Management</h1>
          <p className="text-muted-foreground">Manage premium access codes for ClockworkCoaching members</p>
        </div>
      </div>

      {message && (
        <Alert className={message.type === 'success' ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Analytics Dashboard */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Codes</p>
                  <p className="text-2xl font-bold">{analytics.total_codes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Codes</p>
                  <p className="text-2xl font-bold">{analytics.active_codes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Uses</p>
                  <p className="text-2xl font-bold">{analytics.total_uses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Used Codes</p>
                  <p className="text-2xl font-bold">{analytics.used_codes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generate New Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Generate New Access Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <Input
              placeholder="Member Name"
              value={newCode.member_name}
              onChange={(e) => setNewCode({...newCode, member_name: e.target.value})}
            />
            <Input
              placeholder="Member Email"
              type="email"
              value={newCode.member_email}
              onChange={(e) => setNewCode({...newCode, member_email: e.target.value})}
            />
            <Select value={newCode.source} onValueChange={(value) => setNewCode({...newCode, source: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="clockwork_coaching">ClockworkCoaching</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Max Uses"
              value={newCode.max_uses}
              onChange={(e) => setNewCode({...newCode, max_uses: parseInt(e.target.value) || 1})}
              min={1}
              max={100}
            />
            <Input
              type="number"
              placeholder="Expires (days)"
              value={newCode.expires_in_days}
              onChange={(e) => setNewCode({...newCode, expires_in_days: parseInt(e.target.value) || 30})}
              min={1}
              max={365}
            />
          </div>
          <Button onClick={generateCode} disabled={generating}>
            {generating ? 'Generating...' : 'Generate Code'}
          </Button>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search codes, names, emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Codes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Access Codes ({filteredCodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-mono">
                    <div className="flex items-center space-x-2">
                      <span>{code.code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(code.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{code.member_name || 'Anonymous'}</p>
                      <p className="text-sm text-muted-foreground">{code.member_email}</p>
                      <Badge variant="outline" className="text-xs">{code.source}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(code.status)}
                      <Badge className={getStatusColor(code.status)}>
                        {code.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{code.current_uses}</span>
                      <span className="text-muted-foreground">/{code.max_uses}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(code.expires_at).toLocaleDateString()}
                      {code.last_used_at && (
                        <div className="text-xs text-muted-foreground">
                          Last used: {new Date(code.last_used_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {code.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCodeStatus(code.id, 'disabled')}
                        >
                          Disable
                        </Button>
                      )}
                      {code.status === 'disabled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCodeStatus(code.id, 'active')}
                        >
                          Enable
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}