import { DocumentCategory, DocumentItem } from '../types';

export const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  pdf: ['application/pdf'],
  jpg: ['image/jpeg', 'image/jpg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 Megabytes

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  normalizedExtension?: string;
}

export function validateUploadedFile(file: { name: string; size: number; type: string }): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file selected.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the 10MB limit (selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB).`,
    };
  }

  if (file.size === 0) {
    return { isValid: false, error: 'The selected file is empty (0 bytes).' };
  }

  const nameParts = file.name.split('.');
  if (nameParts.length < 2) {
    return { isValid: false, error: 'File must have a valid extension (.pdf, .jpg, .png, .doc, .docx).' };
  }

  const extension = nameParts.pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: `Unsupported file extension .${extension}. Only PDF, JPG, PNG, DOC, and DOCX are permitted.`,
    };
  }

  return { isValid: true, normalizedExtension: extension };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function filterDocuments(
  docs: DocumentItem[],
  searchTerm: string,
  selectedCategory: string
): DocumentItem[] {
  return docs.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'All' || doc.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchTerm.trim() ||
      doc.document_name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      doc.file_type.toLowerCase().includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });
}
