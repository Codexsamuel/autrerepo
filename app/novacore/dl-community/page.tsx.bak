"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/components/ui/notification-provider"
import { Input } from '@/components/ui/input'
import { Users, MessageSquare, Calendar, Group, Activity, Search, Plus, Edit, Eye, Trash2, Download, Star, CheckCircle, AlertTriangle } from 'lucide-react'

interface Member {
  id: string;
  name: string;
  email: string;
  status: 'actif' | 'inactif';
  joinedAt: string;
  groups: string[];
}

interface GroupType {
  id: string;
  name: string;
  members: number;
  createdAt: string;
}

interface Post {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
}

export default function DLCommunityPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<GroupType[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { showNotification } = useNotification()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setMembers([
      { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', status: 'actif', joinedAt: '2023-10-01', groups: ['Développeurs', 'Designers'] },
      { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', status: 'actif', joinedAt: '2023-11-15', groups: ['Marketing'] },
      { id: '3', name: 'Pierre Durand', email: 'pierre.durand@email.com', status: 'inactif', joinedAt: '2023-09-20', groups: ['Développeurs'] }
    ])
    setGroups([
      { id: '1', name: 'Développeurs', members: 12, createdAt: '2023-01-10' },
      { id: '2', name: 'Designers', members: 8, createdAt: '2023-02-15' },
      { id: '3', name: 'Marketing', members: 5, createdAt: '2023-03-20' }
    ])
    setPosts([
      { id: '1', author: 'Jean Dupont', content: 'Bienvenue à tous dans la communauté !', date: '2024-02-10', likes: 5, comments: 2 },
      { id: '2', author: 'Marie Martin', content: 'Nouveau projet lancé 🚀', date: '2024-02-12', likes: 8, comments: 3 }
    ])
    setEvents([
      { id: '1', title: 'Meetup Dev', date: '2024-03-01', location: 'Yaoundé', participants: 20 },
      { id: '2', title: 'Atelier Design', date: '2024-03-10', location: 'Douala', participants: 15 }
    ])
    setLoading(false)
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM community...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Community CRM</h1>
            <p className="text-gray-600">Gestion des membres, groupes et événements communautaires</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Membres</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Group className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Groupes</p>
                <p className="text-2xl font-bold">{groups.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Événements</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Membres
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau membre
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <Badge className={member.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {member.status === 'actif' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Rejoint le {member.joinedAt}</p>
                    <Badge>{member.groups.join(', ')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Group className="mr-2 h-5 w-5" />
              Groupes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{group.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-xs text-gray-600">Créé le {group.createdAt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{group.members} membres</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Posts récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-800">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{post.author}</p>
                    <p className="text-xs text-gray-600">{post.content}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{post.likes} likes</p>
                  <p className="text-xs text-gray-500">{post.comments} commentaires</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Événements à venir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-orange-100 text-orange-800">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{event.participants} participants</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 