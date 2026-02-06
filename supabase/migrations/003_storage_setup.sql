-- Create storage bucket for submission images
INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-images', 'submission-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS: Authenticated users can upload submission images
CREATE POLICY "Authenticated users can upload submission images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'submission-images' AND auth.role() = 'authenticated'
);

-- RLS: Public read access for submission images
CREATE POLICY "Anyone can view submission images"
ON storage.objects FOR SELECT
USING (bucket_id = 'submission-images');

-- RLS: Admins can delete submission images
CREATE POLICY "Admins can delete submission images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'submission-images' AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS: Allow users to update their own uploaded images
CREATE POLICY "Users can update own submission images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'submission-images' AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'submission-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
