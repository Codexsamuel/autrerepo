import { useState, useEffect } from "react";
import { Plus, Trash2, Copy, Eye, Download, Share2, Lock, Unlock } from "lucide-react";

'use client';


interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  isPublic: boolean;
  publicLink?: string;
  submissions: number;
  createdAt: Date;
}

export default function IntelligentForms() {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newForm, setNewForm] = useState<Partial<Form>>({
    title: '',
    description: '',
    fields: [],
    isPublic: false
  });

  const fieldTypes = [
    { value: 'text', label: 'Texte court' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Nombre' },
    { value: 'select', label: 'Sélection' },
    { value: 'textarea', label: 'Zone de texte' },
    { value: 'date', label: 'Date' },
    { value: 'checkbox', label: 'Case à cocher' }
  ];

  const addField = () => {
    const field: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: '',
      required: false
    };
    setNewForm(prev => ({
      ...prev,
      fields: [...(prev.fields || []), field]
    }));
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    setNewForm(prev => ({
      ...prev,
      fields: prev.fields?.map((field, i) => 
        i === index ? { ...field, ...updates } : field
      ) || []
    }));
  };

  const removeField = (index: number) => {
    setNewForm(prev => ({
      ...prev,
      fields: prev.fields?.filter((_, i) => i !== index) || []
    }));
  };

  const createForm = () => {
    if (!newForm.title || !newForm.fields?.length) return;

    const form: Form = {
      id: `form_${Date.now()}`,
      title: newForm.title,
      description: newForm.description || '',
      fields: newForm.fields || [],
      isPublic: newForm.isPublic || false,
      publicLink: newForm.isPublic ? `https://forms.example.com/${Date.now()}` : undefined,
      submissions: 0,
      createdAt: new Date()
    };

    setForms(prev => [form, ...prev]);
    setNewForm({ title: '', description: '', fields: [], isPublic: false });
    setIsCreating(false);
  };

  const togglePublicAccess = (formId: string) => {
    setForms(prev => prev.map(form => {
      if (form.id === formId) {
        const isPublic = !form.isPublic;
        return {
          ...form,
          isPublic,
          publicLink: isPublic ? `https://forms.example.com/${formId}` : undefined
        };
      }
      return form;
    }));
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // Show toast notification
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Formulaires Intelligents</h2>
          <p className="text-gray-600">Créez et gérez des formulaires dynamiques avec accès public sécurisé</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau formulaire
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Créer un nouveau formulaire</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du formulaire
              </label>
              <input
                type="text"
                value={newForm.title}
                onChange={(e) => setNewForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Demande de congés"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newForm.description}
                onChange={(e) => setNewForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Description du formulaire..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={newForm.isPublic}
                onChange={(e) => setNewForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                Accès public (lien partageable)
              </label>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Champs du formulaire</h4>
                <button
                  onClick={addField}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Ajouter un champ
                </button>
              </div>

              <div className="space-y-3">
                {newForm.fields?.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <select
                      value={field.type}
                      onChange={(e) => updateField(index, { type: e.target.value as FormField['type'] })}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      {fieldTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(index, { label: e.target.value })}
                      placeholder="Label du champ"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />

                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(index, { required: e.target.checked })}
                      className="rounded"
                    />

                    <button
                      onClick={() => removeField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={createForm}
                disabled={!newForm.title || !newForm.fields?.length}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Créer le formulaire
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form: any) => (
          <div
            key={form.id}
            className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{form.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{form.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {form.isPublic ? (
                  <Unlock className="w-4 h-4 text-green-500" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{form.fields.length}</span> champs
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{form.submissions}</span> réponses
              </div>
              <div className="text-sm text-gray-600">
                Créé le {form.createdAt.toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedForm(form)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Voir
              </button>

              {form.isPublic && form.publicLink && (
                <button
                  onClick={() => copyLink(form.publicLink!)}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => togglePublicAccess(form.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  form.isPublic
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {form.isPublic ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {forms.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Share2 className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun formulaire créé</h3>
          <p className="text-gray-600 mb-4">Commencez par créer votre premier formulaire intelligent</p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer un formulaire
          </button>
        </div>
      )}
    </div>
  );
} 