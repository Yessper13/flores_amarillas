import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { GalleryItem } from '../types';
import { Spinner } from '../components/spinners/Spinner';
import { Upload, Trash2, Play } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { addGalleryItem, showNotification, spinnerConfig } = useAppStore();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await api.getGalleryItems();
      if (data && Array.isArray(data)) {
        setItems(data);
      }
    } catch (error) {
      showNotification('Error al cargar la galería', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: FileList) {
    if (!files.length) return;

    setUploading(true);
    const successCount = await Promise.all(
      Array.from(files).map(async (file) => {
        try {
          const data = await api.uploadGalleryItem(file);
          const newItem: GalleryItem = {
            id: data.id || Math.random().toString(36),
            imageUrl: data.imageUrl || URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
            type: file.type.startsWith('video/') ? 'video' : 'photo',
          };
          addGalleryItem(newItem);
          setItems((prev) => [newItem, ...prev]);
          return true;
        } catch (error) {
          showNotification(`Error al subir ${file.name}`, 'error');
          return false;
        }
      })
    );

    const uploaded = successCount.filter(Boolean).length;
    if (uploaded > 0) {
      showNotification(`${uploaded} archivo(s) subido(s) correctamente`, 'success');
    }
    setUploading(false);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteGalleryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showNotification('Foto eliminada', 'success');
    } catch (error) {
      showNotification('Error al eliminar la foto', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-color-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-color-text mb-2">📷 Galería</h1>
          <p className="text-color-text-muted">
            Sube tus fotos y videos favoritos
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center mb-8 transition-all ${
            dragActive
              ? 'border-color-primary bg-color-primary/10'
              : 'border-color-border hover:border-color-primary/50'
          }`}
        >
          <Upload className="mx-auto mb-4 text-color-primary" size={40} />
          <h3 className="text-color-text font-bold mb-2">
            Arrastra archivos aquí o haz clic
          </h3>
          <p className="text-color-text-muted mb-4">
            Soporta imágenes (JPG, PNG, GIF) y videos (MP4, WebM)
          </p>
          <label className="inline-block">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleUpload(e.target.files!)}
              className="hidden"
              disabled={uploading}
            />
            <span className="bg-color-primary hover:bg-color-primary-dark text-color-background font-bold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block disabled:opacity-50">
              {uploading ? 'Subiendo...' : 'Seleccionar archivos'}
            </span>
          </label>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner type={spinnerConfig.type} size={60} color={spinnerConfig.color} />
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-color-text-muted">No hay fotos aún. ¡Sube la primera!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-color-surface rounded-lg overflow-hidden border border-color-border hover:border-color-primary transition-colors"
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.imageUrl}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt="Gallery item"
                      className="w-full aspect-square object-cover"
                    />
                  )}

                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {new Date(item.uploadedAt).toLocaleDateString('es-ES')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
