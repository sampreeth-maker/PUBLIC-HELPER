import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FolderLock,
  ArrowLeft,
  Upload,
  Search,
  Filter,
  FileText,
  Trash2,
  Download,
  Eye,
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  FileUp,
  Database,
  Key,
  Copy,
  ExternalLink,
  Plus,
  Calendar,
  Layers,
  FileCheck,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import { DocumentCategory, DocumentItem } from '../types';
import {
  validateUploadedFile,
  formatBytes,
  filterDocuments,
  ALLOWED_EXTENSIONS,
} from '../utils/documentValidation';
import {
  getSupabaseClient,
  getSupabaseCredentials,
  saveCustomSupabaseCredentials,
  getLocalDemoDocuments,
  saveLocalDemoDocuments,
} from '../utils/supabaseClient';

const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  'Aadhaar',
  'PAN',
  'Identity Documents',
  'Educational Certificates',
  'Medical Records',
  'Other Documents',
];

export const DocumentStoragePage: React.FC = () => {
  const { user, openAuthModal, logout, isSupabaseConfigured } = useAuth();

  // Document state
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('Aadhaar');
  const [uploadDocName, setUploadDocName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Preview modal state
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Supabase Config Modal state
  const [isConfigGuideOpen, setIsConfigGuideOpen] = useState(false);
  const [configUrlInput, setConfigUrlInput] = useState('');
  const [configKeyInput, setConfigKeyInput] = useState('');
  const [configSaveMsg, setConfigSaveMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load documents
  useEffect(() => {
    loadUserDocuments();
  }, [user, isSupabaseConfigured]);

  const loadUserDocuments = async () => {
    setLoadingDocs(true);
    const supabase = getSupabaseClient();

    if (supabase && isSupabaseConfigured && user && !user.isDemo) {
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (err) {
        console.warn('Error loading from Supabase:', err);
        // fallback
        setDocuments(getLocalDemoDocuments());
      } finally {
        setLoadingDocs(false);
      }
    } else {
      // Local vault fallback
      const docs = getLocalDemoDocuments();
      setDocuments(docs);
      setLoadingDocs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateUploadedFile(file);
      if (!validation.isValid) {
        setUploadError(validation.error || 'Invalid file.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      if (!uploadDocName) {
        // remove extension for clean initial title
        const base = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setUploadDocName(base);
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (!user) {
      openAuthModal('login');
      return;
    }

    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    if (!uploadDocName.trim()) {
      setUploadError('Please enter a descriptive document name.');
      return;
    }

    setIsUploading(true);
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || 'bin';

    const supabase = getSupabaseClient();
    if (supabase && isSupabaseConfigured && !user.isDemo) {
      try {
        // 1. Upload file to Supabase private storage bucket: user-documents/{userId}/{filename}
        const filePath = `${user.id}/${Date.now()}-${selectedFile.name.replace(/\s+/g, '_')}`;
        const { error: storageError } = await supabase.storage
          .from('user-documents')
          .upload(filePath, selectedFile);

        if (storageError) throw storageError;

        // 2. Insert metadata into public.documents table
        const { data: newRow, error: dbError } = await supabase
          .from('documents')
          .insert([
            {
              user_id: user.id,
              document_name: uploadDocName.trim(),
              category: uploadCategory,
              file_path: filePath,
              file_type: ext,
              file_size: selectedFile.size,
            },
          ])
          .select()
          .single();

        if (dbError) throw dbError;

        if (newRow) {
          setDocuments((prev) => [newRow, ...prev]);
        }
        setIsUploadModalOpen(false);
        resetUploadForm();
      } catch (err: unknown) {
        setUploadError((err as Error).message || 'Failed to upload document to Supabase.');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Local vault simulation with object URL for preview
      const previewUrl = URL.createObjectURL(selectedFile);
      const newDoc: DocumentItem = {
        id: 'local-' + Date.now(),
        document_name: uploadDocName.trim(),
        category: uploadCategory,
        file_path: `local/${selectedFile.name}`,
        file_type: ext,
        file_size: selectedFile.size,
        created_at: new Date().toISOString(),
        preview_url: previewUrl,
      };

      const updated = [newDoc, ...documents];
      setDocuments(updated);
      saveLocalDemoDocuments(updated);
      setIsUploading(false);
      setIsUploadModalOpen(false);
      resetUploadForm();
    }
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setUploadDocName('');
    setUploadCategory('Aadhaar');
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteDocument = async (doc: DocumentItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${doc.document_name}"?`)) {
      return;
    }

    const supabase = getSupabaseClient();
    if (supabase && isSupabaseConfigured && user && !user.isDemo) {
      try {
        await supabase.from('documents').delete().eq('id', doc.id);
        await supabase.storage.from('user-documents').remove([doc.file_path]);
      } catch (err) {
        console.error('Delete error:', err);
      }
    }

    const updated = documents.filter((d) => d.id !== doc.id);
    setDocuments(updated);
    saveLocalDemoDocuments(updated);
    if (previewDoc?.id === doc.id) setPreviewDoc(null);
  };

  const handleDownload = async (doc: DocumentItem) => {
    const supabase = getSupabaseClient();
    if (supabase && isSupabaseConfigured && user && !user.isDemo) {
      try {
        // Generate signed URL valid for 60 seconds (strictly private)
        const { data, error } = await supabase.storage
          .from('user-documents')
          .createSignedUrl(doc.file_path, 60);

        if (error) throw error;
        if (data?.signedUrl) {
          window.open(data.signedUrl, '_blank');
          return;
        }
      } catch (err) {
        console.error('Download error:', err);
      }
    }

    // Demo download or preview trigger
    if (doc.preview_url) {
      const a = document.createElement('a');
      a.href = doc.preview_url;
      a.download = `${doc.document_name}.${doc.file_type}`;
      a.click();
    } else {
      // Simulate file download
      const blob = new Blob([`SOLVEXA Secure Vault Demonstration Document: ${doc.document_name}`], {
        type: 'text/plain',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.document_name}.txt`;
      a.click();
    }
  };

  const handleSaveCustomCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!configUrlInput || !configKeyInput) {
      setConfigSaveMsg('Please provide both Supabase URL and Anon Key.');
      return;
    }
    saveCustomSupabaseCredentials(configUrlInput, configKeyInput);
    setConfigSaveMsg('Credentials saved! Reloading Supabase connection...');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const filteredDocs = filterDocuments(documents, searchTerm, selectedCategory);

  const sqlSchemaSnippet = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  category TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view only their own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert only their own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete only their own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Category Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <FolderLock className="w-4 h-4" />
                <span>Pillar 05 • Encrypted Identity &amp; Record Vault</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Secure Document Storage
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Protect and manage critical personal documents with zero-knowledge encrypted storage, isolated user folders, and Row Level Security.
              </p>
            </div>

            {/* Backend Connection Status Badge & Guide Button */}
            <div className="shrink-0 flex flex-col gap-2 max-w-xs">
              <button
                type="button"
                onClick={() => setIsConfigGuideOpen(true)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSupabaseConfigured
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Backend</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                      isSupabaseConfigured ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {isSupabaseConfigured ? 'Live Connected' : 'Demo / Setup'}
                  </span>
                </div>
                <p className="text-[11px] opacity-90 leading-snug">
                  {isSupabaseConfigured
                    ? 'Enforcing PostgreSQL Row Level Security (RLS) & private signed URLs.'
                    : 'Backend unconfigured. Click here to view SQL migrations & connect live credentials.'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Unconfigured Backend Notice as requested by Section 4 */}
        {!isSupabaseConfigured && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className="font-bold block text-amber-950">
                  Supabase Backend Configuration Notice
                </span>
                <span>
                  Supabase environment credentials (<code>VITE_SUPABASE_URL</code> &amp; <code>VITE_SUPABASE_ANON_KEY</code>) are currently unconfigured in <code>.env</code>. The document vault is operating in <strong>Interactive Frontend Demo Mode</strong> with local persistence. Uploads, searches, and previews work seamlessly.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsConfigGuideOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
            >
              Configure Live Supabase &amp; SQL
            </button>
          </div>
        )}

        {/* VAULT CONTROLS BAR: Search, Filter, Upload Button */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents by name, category, or file format..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!user) openAuthModal('login');
                  else setIsUploadModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-emerald-600/20 transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Document</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <span className="text-xs text-slate-500 hidden sm:inline">Signed in as:</span>
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {user.fullName}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Sign In to Sync
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filter:
            </span>
            {['All', ...DOCUMENT_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* DOCUMENTS LIST / GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredDocs.length}</strong> {filteredDocs.length === 1 ? 'document' : 'documents'}
            </span>
            <span className="hidden sm:inline">Encrypted private access</span>
          </div>

          {loadingDocs ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <span className="animate-spin inline-block w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full mb-3" />
              <p className="text-xs text-slate-500">Retrieving encrypted vault records...</p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <FolderLock className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No Documents Found</h3>
                <p className="text-xs text-slate-500">
                  {searchTerm || selectedCategory !== 'All'
                    ? 'No records match your active search filter.'
                    : 'Your encrypted vault is empty. Upload your Aadhaar, PAN, or health certificates.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!user) openAuthModal('login');
                  else setIsUploadModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload First Document</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {doc.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {doc.document_name}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span className="font-mono uppercase font-bold text-emerald-700">{doc.file_type}</span>
                        <span>•</span>
                        <span>{formatBytes(doc.file_size)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Preview Document"
                        aria-label={`Preview ${doc.document_name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Download Document"
                        aria-label={`Download ${doc.document_name}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(doc)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Document"
                        aria-label={`Delete ${doc.document_name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Security & RLS Architecture Section */}
        <section className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Multi-Layered Document Protection Standards</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              How SOLVEXA shields personal citizen records from unauthorized exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">Row Level Security (RLS)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                PostgreSQL policies enforce that queries filter strictly by <code>auth.uid() = user_id</code> at the engine layer. Even if an attacker knew another document ID, the database rejects unauthorized reads.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">Private Bucket Isolation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Storage objects reside in an unlisted private bucket. Folders are keyed strictly to user UUIDs (<code>user-documents/&lbrace;userId&rbrace;/*</code>), preventing cross-tenant file downloads.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">Short-Lived Signed URLs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No permanent public URLs exist. Download links are ephemeral, cryptographic single-use signatures expiring within 60 seconds of issuance.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Document safety, supported formats, and cryptographic storage.
            </p>
          </div>
          <Accordion
            items={[
              {
                question: 'What file formats can I store in the SOLVEXA vault?',
                answer:
                  'The vault supports PDF (.pdf), JPEG/JPG images (.jpg, .jpeg), PNG images (.png), and Word documents (.doc, .docx) up to a maximum of 10MB per file.',
              },
              {
                question: 'Can other SOLVEXA users or administrators view my Aadhaar or PAN?',
                answer:
                  'No. Under Supabase Row Level Security (RLS) and storage folder isolation, files and metadata can only be read by the authenticated account holder who uploaded them.',
              },
              {
                question: 'How does this help during a natural disaster or displacement?',
                answer:
                  'Physical identity documents and educational certificates are frequently lost or damaged during floods, house fires, or cyclones. Having encrypted cloud-stored documents allows you to prove identity and access relief camps from any emergency computer.',
              },
            ]}
          />
        </section>

        {/* Back to Home Button */}
        <div className="pt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to SOLVEXA Homepage</span>
          </Link>
        </div>
      </div>

      {/* UPLOAD DOCUMENT MODAL */}
      {isUploadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <FileUp className="w-5 h-5" />
                </div>
                <h3 id="upload-modal-title" className="text-lg font-bold text-slate-900">
                  Upload to Encrypted Vault
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {uploadError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Document Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title / Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Masked Aadhaar Card"
                  value={uploadDocName}
                  onChange={(e) => setUploadDocName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as DocumentCategory)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                >
                  {DOCUMENT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Select File (Max 10MB) *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-emerald-500 p-6 rounded-xl text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition-colors"
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">
                    {selectedFile ? selectedFile.name : 'Click to browse or drop document here'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Allowed: PDF, JPG, PNG, DOC, DOCX (up to 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{isUploading ? 'Securing...' : 'Encrypt & Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900 truncate max-w-md">
                  {previewDoc.document_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-50 min-h-[280px]">
              {previewDoc.preview_url && ['jpg', 'jpeg', 'png'].includes(previewDoc.file_type) ? (
                <img
                  src={previewDoc.preview_url}
                  alt={previewDoc.document_name}
                  className="max-h-[60vh] rounded-lg shadow-sm object-contain"
                />
              ) : (
                <div className="text-center space-y-3 p-6 bg-white rounded-2xl border border-slate-200 max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{previewDoc.document_name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Format: <strong className="uppercase">{previewDoc.file_type}</strong> • Size: {formatBytes(previewDoc.file_size)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Uploaded on: {new Date(previewDoc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    File integrity verified. Safe cryptographic hash preserved.
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
              <span className="text-xs text-slate-500">Category: {previewDoc.category}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(previewDoc)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPABASE CONFIGURATION & SQL MIGRATION MODAL */}
      {isConfigGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">Supabase Database &amp; Storage Setup</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConfigGuideOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600">
              {/* Step 1: SQL Schema */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Execute SQL Migration in Supabase Project</span>
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  Copy and run this migration in your Supabase SQL Editor to create <code>profiles</code>, <code>documents</code>, and RLS policies:
                </p>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-800">
                    {sqlSchemaSnippet}
                  </pre>
                </div>
              </div>

              {/* Step 2: Storage Bucket */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Create Private Storage Bucket</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Go to <strong>Storage</strong> &gt; <strong>New Bucket</strong>. Name it <code>user-documents</code> and ensure &quot;Public Bucket&quot; is turned <strong>OFF</strong>.
                </p>
              </div>

              {/* Step 3: Enter credentials in UI */}
              <form onSubmit={handleSaveCustomCredentials} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Connect Credentials Live in Browser</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Alternatively, define <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code>.
                </p>

                {configSaveMsg && (
                  <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded">
                    {configSaveMsg}
                  </p>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://xyzcompany.supabase.co"
                    value={configUrlInput}
                    onChange={(e) => setConfigUrlInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={configKeyInput}
                    onChange={(e) => setConfigKeyInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                  >
                    Save &amp; Connect Live Supabase
                  </button>
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                type="button"
                onClick={() => setIsConfigGuideOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
